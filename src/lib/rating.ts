// Puzzle rating (Elo with a K-factor that settles as you solve more) and the
// app's overall estimate of the learner's playing strength.
import { curriculum } from '../data/curriculum/index'
import { LEVELS } from '../data/types'
import type { Progress } from './storage'

export function updatePuzzleRating(rating: number, puzzleRating: number, solved: boolean, played: number): number {
  const expected = 1 / (1 + 10 ** ((puzzleRating - rating) / 400))
  const k = played < 20 ? 48 : played < 60 ? 32 : 20
  return Math.round(Math.max(100, rating + k * ((solved ? 1 : 0) - expected)))
}

export const RANKS = [
  { min: 0, title: 'Newcomer', icon: '🐣' },
  { min: 400, title: 'Beginner', icon: '♙' },
  { min: 700, title: 'Novice', icon: '♘' },
  { min: 1000, title: 'Club Player', icon: '♗' },
  { min: 1400, title: 'Intermediate', icon: '♖' },
  { min: 1700, title: 'Advanced', icon: '♕' },
  { min: 1900, title: 'Expert', icon: '♔' },
  { min: 2100, title: 'Candidate Master', icon: '🎖️' },
  { min: 2300, title: 'Master', icon: '🥇' },
  { min: 2400, title: 'International Master', icon: '🌟' },
  { min: 2500, title: 'Grandmaster', icon: '👑' },
]

export function rankFor(rating: number) {
  let current = RANKS[0]
  for (const r of RANKS) if (rating >= r.min) current = r
  const next = RANKS[RANKS.indexOf(current) + 1]
  return { current, next }
}

/** Fraction of lessons completed in each level. */
export function levelCompletion(p: Progress): Record<number, number> {
  const out: Record<number, number> = {}
  for (const { level } of LEVELS) {
    const lessons = curriculum.filter((m) => m.level === level).flatMap((m) => m.lessons)
    out[level] = lessons.length ? lessons.filter((l) => p.lessons[l.id]).length / lessons.length : 0
  }
  return out
}

/**
 * Blends the available signals: puzzle rating, performance against the bots
 * and how far through the curriculum the learner is. It is an app estimate,
 * not an official rating.
 */
export function estimateRating(p: Progress): { rating: number; signals: string[] } {
  const signals: { value: number; label: string }[] = []
  const played = p.puzzle.solved + p.puzzle.failed
  if (played >= 10) signals.push({ value: p.puzzle.rating, label: `puzzles ${p.puzzle.rating}` })

  const recent = p.games.slice(-12)
  if (recent.length >= 3) {
    const avgOpp = recent.reduce((s, g) => s + g.botElo, 0) / recent.length
    const score = recent.reduce((s, g) => s + (g.result === 'win' ? 1 : g.result === 'draw' ? 0 : -1), 0)
    const perf = Math.round(avgOpp + (400 * score) / recent.length)
    signals.push({ value: Math.max(100, perf), label: `games ${Math.max(100, perf)}` })
  }

  const completion = levelCompletion(p)
  const floors = [0, 0, 300, 700, 1100, 1500, 1900]
  let curriculumRating = 0
  for (const { level } of LEVELS) {
    if (completion[level] > 0) curriculumRating = Math.max(curriculumRating, floors[level] + Math.round(completion[level] * 400))
  }
  if (curriculumRating > 0) signals.push({ value: curriculumRating, label: `lessons ${curriculumRating}` })

  if (!signals.length) return { rating: 0, signals: [] }
  const rating = Math.round(signals.reduce((s, x) => s + x.value, 0) / signals.length)
  return { rating, signals: signals.map((s) => s.label) }
}
