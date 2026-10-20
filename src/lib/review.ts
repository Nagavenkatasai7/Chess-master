// Post-game review: evaluates every position with Stockfish, then classifies
// each move by how much winning chance it gave away (Lichess-style).
import { Chess } from 'chess.js'
import { openings } from '../data/openings/index'
import { classify, moveAccuracy, pvToSan, START_FEN, uciToSan, whiteScore, winPercent, type Classification } from './chess'
import type { Engine, Score } from './engine'

export interface PositionEval {
  fen: string
  /** White's point of view. */
  score: Score
  bestMove: string
  pv: string[]
}

export interface ReviewedMove {
  ply: number
  san: string
  uci: string
  color: 'w' | 'b'
  classification: Classification
  winLoss: number
  accuracy: number
  bestSan: string
  bestLine: string[]
  before: Score
  after: Score
}

function terminalScore(chess: Chess): Score | null {
  // The side to move is mated: hugely negative for them, from White's view.
  if (chess.isCheckmate()) return { mate: chess.turn() === 'w' ? -1 : 1 }
  if (chess.isDraw() || chess.isStalemate()) return { cp: 0 }
  return null
}

export async function analyseGame(
  engine: Engine,
  startFen: string,
  sans: string[],
  depth: number,
  onProgress: (done: number, total: number) => void,
  isCancelled: () => boolean = () => false,
): Promise<PositionEval[]> {
  const chess = new Chess(startFen)
  const fens = [chess.fen()]
  for (const san of sans) {
    chess.move(san)
    fens.push(chess.fen())
  }
  const out: PositionEval[] = []
  for (let i = 0; i < fens.length; i++) {
    if (isCancelled()) break
    const fen = fens[i]
    const pos = new Chess(fen)
    const terminal = terminalScore(pos)
    if (terminal) {
      out.push({ fen, score: terminal, bestMove: '', pv: [] })
    } else {
      // A search can be dropped if another feature interrupts the engine; retry it.
      let result = await engine.analyse(fen, { depth })
      for (let attempt = 0; attempt < 3 && !result.lines.length; attempt++) result = await engine.analyse(fen, { depth })
      const line = result.lines[0]
      const turn = pos.turn()
      out.push({ fen, score: line ? whiteScore(line.score, turn) : { cp: 0 }, bestMove: result.bestMove, pv: line?.pv ?? [] })
    }
    onProgress(i + 1, fens.length)
  }
  return out
}

/** Number of leading plies of the game that follow a line from the opening library. */
export function bookPlies(startFen: string, sans: string[]): number {
  if (startFen.split(' ').slice(0, 4).join(' ') !== START_FEN.split(' ').slice(0, 4).join(' ')) return 0
  let best = 0
  for (const op of openings) {
    for (const line of op.lines) {
      let n = 0
      while (n < sans.length && n < line.moves.length && line.moves[n] === sans[n]) n++
      best = Math.max(best, n)
    }
  }
  return best
}

const forMover = (s: Score, color: 'w' | 'b'): Score => (color === 'w' ? s : s.mate !== undefined ? { mate: -s.mate } : { cp: -(s.cp ?? 0) })

export function reviewGame(startFen: string, sans: string[], evals: PositionEval[]): ReviewedMove[] {
  const book = bookPlies(startFen, sans)
  const chess = new Chess(startFen)
  return sans.map((san, i) => {
    const color = chess.turn()
    const fenBefore = chess.fen()
    const move = chess.move(san)
    const uci = move.from + move.to + (move.promotion ?? '')
    const before = evals[i].score
    const after = evals[i + 1].score
    const winLoss = Math.max(0, winPercent(forMover(before, color)) - winPercent(forMover(after, color)))
    const isBest = evals[i].bestMove === uci
    const classification: Classification = i < book ? 'book' : classify(winLoss, isBest)
    return {
      ply: i,
      san: move.san,
      uci,
      color,
      classification,
      winLoss,
      accuracy: moveAccuracy(winLoss),
      bestSan: evals[i].bestMove ? uciToSan(fenBefore, evals[i].bestMove) : '',
      bestLine: pvToSan(fenBefore, evals[i].pv, 6),
      before,
      after,
    }
  })
}

export function sideAccuracy(moves: ReviewedMove[], color: 'w' | 'b'): number {
  const mine = moves.filter((m) => m.color === color && m.classification !== 'book')
  if (!mine.length) return 100
  return Math.round(mine.reduce((s, m) => s + m.accuracy, 0) / mine.length)
}
