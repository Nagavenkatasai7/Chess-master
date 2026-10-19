// All learner state lives in localStorage, split in two keys so exporting
// progress never leaks the OpenRouter API key kept in settings.
import { useSyncExternalStore } from 'react'

export interface GameRecord {
  id: string
  date: number
  botLevel: number
  botElo: number
  color: 'white' | 'black'
  result: 'win' | 'loss' | 'draw'
  pgn: string
  accuracy?: number
}

export interface DrillStat {
  attempts: number
  perfect: number
  /** Consecutive perfect runs; drives the spaced-repetition interval. */
  streak: number
  lastAt: number
  dueAt: number
}

export interface Progress {
  version: 1
  lessons: Record<string, number>
  exercises: Record<string, number>
  puzzle: {
    rating: number
    solved: number
    failed: number
    streak: number
    bestStreak: number
    history: { t: number; r: number }[]
    seen: Record<string, 1 | 0>
  }
  games: GameRecord[]
  drills: Record<string, DrillStat>
  daily: { date: string; lessons: number; puzzles: number; games: number; drills: number }
  activeDays: string[]
}

export interface Settings {
  apiKey: string
  model: string
  boardTheme: 'green' | 'brown' | 'blue' | 'purple'
  showCoordinates: boolean
  playerName: string
}

const PROGRESS_KEY = 'chessmaster.progress.v1'
const SETTINGS_KEY = 'chessmaster.settings.v1'

export const DEFAULT_MODEL = 'nvidia/nemotron-3-ultra-550b-a55b:free'

export function today(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function freshProgress(): Progress {
  return {
    version: 1,
    lessons: {},
    exercises: {},
    puzzle: { rating: 700, solved: 0, failed: 0, streak: 0, bestStreak: 0, history: [], seen: {} },
    games: [],
    drills: {},
    daily: { date: today(), lessons: 0, puzzles: 0, games: 0, drills: 0 },
    activeDays: [],
  }
}

const defaultSettings: Settings = {
  apiKey: '',
  model: DEFAULT_MODEL,
  boardTheme: 'green',
  showCoordinates: true,
  playerName: '',
}

function read<T>(key: string, fallback: () => T): T {
  try {
    const raw = localStorage.getItem(key)
    if (raw) return { ...fallback(), ...JSON.parse(raw) }
  } catch {
    // Storage blocked or corrupt: start fresh in memory.
  }
  return fallback()
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage full or blocked: keep the in-memory copy.
  }
}

function createStore<T>(key: string, fallback: () => T) {
  let state = read(key, fallback)
  const listeners = new Set<() => void>()
  return {
    get: () => state,
    set(next: T) {
      state = next
      write(key, state)
      listeners.forEach((l) => l())
    },
    subscribe(listener: () => void) {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
  }
}

const progressStore = createStore(PROGRESS_KEY, freshProgress)
const settingsStore = createStore(SETTINGS_KEY, () => defaultSettings)

export function useProgress(): Progress {
  return useSyncExternalStore(progressStore.subscribe, progressStore.get)
}

export function useSettings(): Settings {
  return useSyncExternalStore(settingsStore.subscribe, settingsStore.get)
}

export function getProgress() {
  return progressStore.get()
}

export function getSettings() {
  return settingsStore.get()
}

export function updateSettings(patch: Partial<Settings>) {
  settingsStore.set({ ...settingsStore.get(), ...patch })
}

type DailyKey = 'lessons' | 'puzzles' | 'games' | 'drills'

/** Applies a change to progress and records today's activity for the daily plan and streak. */
export function updateProgress(fn: (p: Progress) => Progress, activity?: DailyKey) {
  let next = fn(structuredClone(progressStore.get()))
  if (activity) {
    const day = today()
    const daily = next.daily.date === day ? next.daily : { date: day, lessons: 0, puzzles: 0, games: 0, drills: 0 }
    next = {
      ...next,
      daily: { ...daily, [activity]: daily[activity] + 1 },
      activeDays: next.activeDays.includes(day) ? next.activeDays : [...next.activeDays, day].slice(-400),
    }
  }
  progressStore.set(next)
}

export function dailyCounts(p: Progress) {
  return p.daily.date === today() ? p.daily : { date: today(), lessons: 0, puzzles: 0, games: 0, drills: 0 }
}

/** Consecutive days with any activity, ending today or yesterday. */
export function dayStreak(p: Progress): number {
  const days = new Set(p.activeDays)
  const d = new Date()
  if (!days.has(today())) d.setDate(d.getDate() - 1)
  let count = 0
  for (;;) {
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    if (!days.has(key)) return count
    count++
    d.setDate(d.getDate() - 1)
  }
}

export function exportProgress(): string {
  return JSON.stringify(progressStore.get(), null, 2)
}

export function importProgress(json: string) {
  const parsed = JSON.parse(json) as Progress
  if (parsed.version !== 1 || typeof parsed.lessons !== 'object') throw new Error('This file is not a Chess Master progress export.')
  progressStore.set({ ...freshProgress(), ...parsed })
}

export function resetProgress() {
  progressStore.set(freshProgress())
}
