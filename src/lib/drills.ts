// Spaced repetition for opening lines: each perfect run pushes the next review further out.
import type { Opening } from '../data/types'
import { updateProgress, type DrillStat, type Progress } from './storage'

const DAY = 24 * 60 * 60 * 1000
const INTERVALS = [0, 1, 3, 7, 14, 30, 60].map((d) => d * DAY)

export const drillKey = (openingId: string, lineIndex: number) => `${openingId}:${lineIndex}`

export function recordDrill(key: string, perfect: boolean) {
  updateProgress((p) => {
    const prev: DrillStat = p.drills[key] ?? { attempts: 0, perfect: 0, streak: 0, lastAt: 0, dueAt: 0 }
    const streak = perfect ? prev.streak + 1 : 0
    const now = Date.now()
    return {
      ...p,
      drills: {
        ...p.drills,
        [key]: { attempts: prev.attempts + 1, perfect: prev.perfect + (perfect ? 1 : 0), streak, lastAt: now, dueAt: now + INTERVALS[Math.min(streak, INTERVALS.length - 1)] },
      },
    }
  }, 'drills')
}

/** A line is "learned" after two perfect runs in a row. */
export function mastery(p: Progress, opening: Opening): number {
  const learned = opening.lines.filter((_, i) => (p.drills[drillKey(opening.id, i)]?.streak ?? 0) >= 2).length
  return opening.lines.length ? learned / opening.lines.length : 0
}

export function dueLines(p: Progress, openings: Opening[]) {
  const now = Date.now()
  return openings.flatMap((o) =>
    o.lines.flatMap((line, i) => {
      const stat = p.drills[drillKey(o.id, i)]
      return stat && stat.dueAt <= now ? [{ opening: o, line, index: i }] : []
    }),
  )
}
