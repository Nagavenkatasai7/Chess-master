// Computer opponents from "never played before" to full Stockfish strength.
// Weak bots pick among the engine's top moves with a softmax over the score,
// so they make human-like mistakes instead of random nonsense; stronger bots
// use Stockfish's own UCI_Elo limiter.
import { scoreToCp } from './chess'
import type { Engine } from './engine'

export interface Bot {
  level: number
  name: string
  elo: number
  blurb: string
  avatar: string
  depth?: number
  multipv?: number
  /** Softmax temperature in centipawns: higher = more random. */
  temperature?: number
  uciElo?: number
  movetime?: number
}

export const BOTS: Bot[] = [
  { level: 1, name: 'Pip', elo: 250, avatar: '🐣', blurb: 'Just learned the moves. Hangs pieces all the time.', depth: 1, multipv: 12, temperature: 500 },
  { level: 2, name: 'Rosa', elo: 400, avatar: '🌱', blurb: 'Knows how pieces move, often misses threats.', depth: 2, multipv: 10, temperature: 260 },
  { level: 3, name: 'Theo', elo: 550, avatar: '🧢', blurb: 'Grabs free material but forgets about defence.', depth: 3, multipv: 8, temperature: 160 },
  { level: 4, name: 'Mia', elo: 700, avatar: '🎒', blurb: 'Plays sensible moves but blunders under pressure.', depth: 4, multipv: 6, temperature: 100 },
  { level: 5, name: 'Omar', elo: 850, avatar: '☕', blurb: 'A casual club newcomer. Spots simple tactics.', depth: 5, multipv: 5, temperature: 60 },
  { level: 6, name: 'Lena', elo: 1000, avatar: '📚', blurb: 'Knows opening principles and basic tactics.', depth: 6, multipv: 4, temperature: 36 },
  { level: 7, name: 'Viktor', elo: 1200, avatar: '♟️', blurb: 'Solid club player. Punishes loose pieces.', depth: 8, multipv: 3, temperature: 20 },
  { level: 8, name: 'Asha', elo: 1400, avatar: '🎯', blurb: 'Tactically sharp, plays for the initiative.', uciElo: 1400, movetime: 300 },
  { level: 9, name: 'Diego', elo: 1600, avatar: '🔥', blurb: 'Strong club player with good positional sense.', uciElo: 1600, movetime: 400 },
  { level: 10, name: 'Ingrid', elo: 1800, avatar: '❄️', blurb: 'Expert-level technique. Rarely blunders.', uciElo: 1800, movetime: 500 },
  { level: 11, name: 'Kenji', elo: 2000, avatar: '🗡️', blurb: 'Candidate-master strength.', uciElo: 2000, movetime: 600 },
  { level: 12, name: 'Sofia', elo: 2200, avatar: '👑', blurb: 'Master strength. Converts every advantage.', uciElo: 2200, movetime: 700 },
  { level: 13, name: 'Magnus-bot', elo: 2500, avatar: '🏆', blurb: 'Grandmaster strength.', uciElo: 2500, movetime: 900 },
  { level: 14, name: 'Stockfish', elo: 3000, avatar: '🤖', blurb: 'Full engine strength. Good luck!', movetime: 1500 },
]

export async function botMove(engine: Engine, bot: Bot, fen: string): Promise<string> {
  if (bot.temperature !== undefined) {
    const result = await engine.analyse(fen, { depth: bot.depth, multipv: bot.multipv })
    const lines = result.lines.filter((l) => l.pv.length)
    if (!lines.length) return result.bestMove
    const best = Math.max(...lines.map((l) => scoreToCp(l.score)))
    const weights = lines.map((l) => Math.exp((scoreToCp(l.score) - best) / bot.temperature!))
    let r = Math.random() * weights.reduce((a, b) => a + b, 0)
    for (let i = 0; i < lines.length; i++) {
      r -= weights[i]
      if (r <= 0) return lines[i].pv[0]
    }
    return lines[0].pv[0]
  }
  const result = await engine.analyse(fen, {
    movetime: bot.movetime,
    options: bot.uciElo ? { UCI_LimitStrength: true, UCI_Elo: bot.uciElo } : {},
  })
  return result.bestMove
}
