// Builds the grounded context the AI coach receives with every question.
import { describePosition, formatLine, formatScore, pvToSan, whiteScore } from './chess'
import { getAnalysisEngine, type EngineLine } from './engine'

export interface CoachContext {
  fen: string
  /** What the student is doing, e.g. "Puzzle (rated 900), theme: fork". */
  activity: string
  /** SAN moves that led to `fen`, from `startFen`. */
  history?: string[]
  startFen?: string
  /** Extra facts, e.g. the lesson topic or how the student's last move was classified. */
  notes?: string[]
}

export function engineSummary(fen: string, lines: EngineLine[]): string {
  const turn = fen.split(' ')[1] as 'w' | 'b'
  if (!lines.length) return 'Engine: no legal moves (game over).'
  return lines
    .map((l, i) => {
      const sans = pvToSan(fen, l.pv, 8)
      return `${i + 1}. ${formatScore(whiteScore(l.score, turn))} (White's view): ${formatLine(fen, sans)}`
    })
    .join('\n')
}

/** Runs a quick multi-line analysis and formats everything the coach needs. */
export async function buildCoachPrompt(ctx: CoachContext, question: string, studentRating: number): Promise<string> {
  let engineText = 'Engine analysis unavailable.'
  try {
    const result = await getAnalysisEngine().analyse(ctx.fen, { depth: 14, multipv: 3, interrupt: true })
    engineText = engineSummary(ctx.fen, result.lines)
  } catch {
    // Coach can still answer from the position alone.
  }
  const parts = [
    `Student's approximate rating: ${studentRating}.`,
    `Activity: ${ctx.activity}`,
    ctx.history?.length ? `Moves so far: ${formatLine(ctx.startFen ?? 'x w - - 0 1', ctx.history)}` : '',
    ...(ctx.notes ?? []),
    `FEN: ${ctx.fen}`,
    describePosition(ctx.fen),
    `Stockfish (depth 14), best lines first:\n${engineText}`,
    `Student's question: ${question}`,
  ]
  return parts.filter(Boolean).join('\n\n')
}
