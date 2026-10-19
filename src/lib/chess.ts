// Chess helpers shared across pages: move conversion, evaluation maths,
// move classification and a text rendering of positions for the AI coach.
import { Chess, type Move, type Square } from 'chess.js'
import type { Score } from './engine'

export const START_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

export interface MoveInput {
  from: string
  to: string
  promotion?: string
}

export function parseUci(uci: string): MoveInput {
  return { from: uci.slice(0, 2), to: uci.slice(2, 4), promotion: uci.length > 4 ? uci[4] : undefined }
}

export function moveToUci(m: { from: string; to: string; promotion?: string }): string {
  return m.from + m.to + (m.promotion ?? '')
}

/** Plays a move on a copy of `fen`; returns null when illegal. */
export function tryMove(fen: string, move: MoveInput | string, skipValidation = false): { chess: Chess; move: Move } | null {
  const chess = new Chess(fen, { skipValidation })
  try {
    const played = typeof move === 'string' ? chess.move(move) : chess.move(move)
    return { chess, move: played }
  } catch {
    return null
  }
}

export function uciToSan(fen: string, uci: string): string {
  return tryMove(fen, parseUci(uci))?.move.san ?? uci
}

export function sanToUci(fen: string, san: string): string | null {
  const r = tryMove(fen, san)
  return r ? moveToUci(r.move) : null
}

/** Converts an engine principal variation to SAN, stopping at the first bad move. */
export function pvToSan(fen: string, pv: string[], max = 12): string[] {
  const chess = new Chess(fen)
  const out: string[] = []
  for (const uci of pv.slice(0, max)) {
    try {
      out.push(chess.move(parseUci(uci)).san)
    } catch {
      break
    }
  }
  return out
}

/** "1. e4 e5 2. Nf3" style numbering for a SAN list starting at `fen`. */
export function formatLine(fen: string, sans: string[]): string {
  const [, turn, , , , full] = fen.split(' ')
  let moveNo = Number(full) || 1
  let white = turn === 'w'
  const parts: string[] = []
  sans.forEach((san, i) => {
    if (white) parts.push(`${moveNo}. ${san}`)
    else parts.push(i === 0 ? `${moveNo}... ${san}` : san)
    if (!white) moveNo++
    white = !white
  })
  return parts.join(' ')
}

const MATE_CP = 10000

/** A score as centipawns (mates are mapped to ±10000 minus distance). */
export function scoreToCp(s: Score): number {
  if (s.mate !== undefined) return s.mate > 0 ? MATE_CP - s.mate * 10 : s.mate < 0 ? -MATE_CP - s.mate * 10 : -MATE_CP
  return s.cp ?? 0
}

/** Converts a side-to-move score to White's point of view. */
export function whiteScore(s: Score, turn: 'w' | 'b'): Score {
  if (turn === 'w') return s
  return s.mate !== undefined ? { mate: -s.mate } : { cp: -(s.cp ?? 0) }
}

export function formatScore(s: Score): string {
  if (s.mate !== undefined) return s.mate === 0 ? '#' : `${s.mate > 0 ? '' : '-'}M${Math.abs(s.mate)}`
  const v = (s.cp ?? 0) / 100
  return `${v > 0 ? '+' : ''}${v.toFixed(1)}`
}

/** Lichess win-probability model: 0–100 for the side the score belongs to. */
export function winPercent(s: Score): number {
  const cp = Math.max(-1000, Math.min(1000, scoreToCp(s)))
  return 50 + 50 * (2 / (1 + Math.exp(-0.00368208 * cp)) - 1)
}

export type Classification = 'book' | 'best' | 'excellent' | 'good' | 'inaccuracy' | 'mistake' | 'blunder'

export const CLASSIFICATION_META: Record<Classification, { label: string; color: string; symbol: string }> = {
  book: { label: 'Book move', color: '#a88b6a', symbol: '📖' },
  best: { label: 'Best move', color: '#5fb85f', symbol: '★' },
  excellent: { label: 'Excellent', color: '#7cc47c', symbol: '!' },
  good: { label: 'Good', color: '#9fbf8f', symbol: '✓' },
  inaccuracy: { label: 'Inaccuracy', color: '#e8b13a', symbol: '?!' },
  mistake: { label: 'Mistake', color: '#e8833a', symbol: '?' },
  blunder: { label: 'Blunder', color: '#e2574c', symbol: '??' },
}

/** Classifies a move by how much winning chance it gave away (0–100 scale). */
export function classify(winLoss: number, isBest: boolean): Classification {
  if (isBest || winLoss < 1) return 'best'
  if (winLoss < 4) return 'excellent'
  if (winLoss < 10) return 'good'
  if (winLoss < 20) return 'inaccuracy'
  if (winLoss < 30) return 'mistake'
  return 'blunder'
}

/** Lichess per-move accuracy from win-probability loss. */
export function moveAccuracy(winLoss: number): number {
  return Math.max(0, Math.min(100, 103.1668 * Math.exp(-0.04354 * Math.max(0, winLoss)) - 3.1669))
}

const VALUES: Record<string, number> = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 }
const NAMES: Record<string, string> = { p: 'pawn', n: 'knight', b: 'bishop', r: 'rook', q: 'queen', k: 'king' }

export function material(fen: string): { white: number; black: number } {
  const board = new Chess(fen, { skipValidation: true }).board().flat()
  let white = 0
  let black = 0
  for (const p of board) {
    if (!p) continue
    if (p.color === 'w') white += VALUES[p.type]
    else black += VALUES[p.type]
  }
  return { white, black }
}

/** Piece lists per side, e.g. "White: Kg1, Qd1, Ra1 ...". LLMs read these far better than FEN. */
export function describePosition(fen: string): string {
  const chess = new Chess(fen, { skipValidation: true })
  const list = (color: 'w' | 'b') =>
    chess
      .board()
      .flat()
      .filter((p) => p && p.color === color)
      .sort((a, b) => VALUES[b!.type] - VALUES[a!.type] || (a!.type === 'k' ? -1 : 1))
      .map((p) => `${p!.type === 'p' ? '' : p!.type.toUpperCase()}${p!.square}`)
      .join(', ')
  const rows: string[] = []
  const board = chess.board()
  for (let r = 0; r < 8; r++) {
    rows.push(`${8 - r} ` + board[r].map((p) => (p ? (p.color === 'w' ? p.type.toUpperCase() : p.type) : '.')).join(' '))
  }
  rows.push('  a b c d e f g h')
  const mat = material(fen)
  return [
    `White pieces: ${list('w')}`,
    `Black pieces: ${list('b')}`,
    `Material: White ${mat.white}, Black ${mat.black} (pawn=1, knight/bishop=3, rook=5, queen=9)`,
    `Side to move: ${chess.turn() === 'w' ? 'White' : 'Black'}${chess.isCheck() ? ' (in check)' : ''}`,
    'Board (uppercase = White, rank 8 at top):',
    rows.join('\n'),
  ].join('\n')
}

export function pieceName(type: string) {
  return NAMES[type] ?? type
}

export function kingSquare(chess: Chess, color: 'w' | 'b'): Square | undefined {
  for (const row of chess.board()) for (const p of row) if (p && p.type === 'k' && p.color === color) return p.square
  return undefined
}

/** The outcome of a finished game in plain words. */
export function gameOverReason(chess: Chess): string | null {
  if (chess.isCheckmate()) return `Checkmate — ${chess.turn() === 'w' ? 'Black' : 'White'} wins`
  if (chess.isStalemate()) return 'Draw by stalemate'
  if (chess.isInsufficientMaterial()) return 'Draw — insufficient material'
  if (chess.isThreefoldRepetition()) return 'Draw by threefold repetition'
  if (chess.isDrawByFiftyMoves()) return 'Draw by the 50-move rule'
  if (chess.isDraw()) return 'Draw'
  return null
}

export interface Step {
  fen: string
  san: string
  from: string
  to: string
}

export function buildSteps(startFen: string, moves: string[]): Step[] {
  const chess = new Chess(startFen)
  const steps: Step[] = []
  for (const san of moves) {
    try {
      const m = chess.move(san)
      steps.push({ fen: chess.fen(), san: m.san, from: m.from, to: m.to })
    } catch {
      break
    }
  }
  return steps
}
