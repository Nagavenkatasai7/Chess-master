// Engine soundness check for chess content (run with: npm run verify:engine).
//
// Legality is covered by `npm test`. This script asks Stockfish whether the
// content is actually *correct*:
//   - every learner move in a `line`/`mate` exercise is the best move (or within
//     a small tolerance), so lessons never teach a mistake;
//   - every scripted opponent reply is a reasonable defence;
//   - (with --openings) no opening line contains an outright blunder.
//
// Options:
//   --level=<n>     only load curriculum level n (1-6); default all levels
//   --only=<text>   only check exercises/openings whose id contains <text>
//   --openings      also check opening lines
//   --depth=<n>     search depth for exercises (default 18)
import { createRequire } from 'node:module'
import { Chess } from 'chess.js'
import type { Exercise, Module, Opening } from '../src/data/types.ts'

const require = createRequire(import.meta.url)
const args = new Map(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, '').split('=')
    return [k, v ?? 'true'] as const
  }),
)
const only = args.get('only')
const depth = Number(args.get('depth') ?? 18)

type Score = { mate?: number; cp?: number }
type PvLine = { move: string; score: Score; pv: string[] }

class Engine {
  private sf: { processCommand(cmd: string): void; terminate(): void }
  private listener: ((line: string) => void) | null = null

  constructor() {
    this.sf = require('stockfish')('lite-single', (line: string) => this.listener?.(line))
    this.sf.processCommand('uci')
    this.sf.processCommand('setoption name Hash value 64')
  }

  analyse(fen: string, opts: { depth: number; multipv?: number; searchmoves?: string[] }): Promise<PvLine[]> {
    return new Promise((resolve) => {
      const lines = new Map<number, PvLine>()
      this.listener = (line) => {
        if (line.startsWith('info') && line.includes(' pv ')) {
          const multipv = Number(/ multipv (\d+)/.exec(line)?.[1] ?? 1)
          const mate = /score mate (-?\d+)/.exec(line)
          const cp = /score cp (-?\d+)/.exec(line)
          const pv = line.split(' pv ')[1].trim().split(' ')
          if (/ (lowerbound|upperbound)/.test(line)) return
          lines.set(multipv, {
            move: pv[0],
            pv,
            score: mate ? { mate: Number(mate[1]) } : { cp: Number(cp?.[1] ?? 0) },
          })
        } else if (line.startsWith('bestmove')) {
          this.listener = null
          resolve([...lines.entries()].sort((a, b) => a[0] - b[0]).map(([, l]) => l))
        }
      }
      this.sf.processCommand('ucinewgame')
      this.sf.processCommand(`setoption name MultiPV value ${opts.multipv ?? 1}`)
      this.sf.processCommand(`position fen ${fen}`)
      const sm = opts.searchmoves?.length ? ` searchmoves ${opts.searchmoves.join(' ')}` : ''
      this.sf.processCommand(`go depth ${opts.depth}${sm}`)
    })
  }

  quit() {
    this.sf.terminate()
  }
}

/** Collapse a score to a single comparable number (mates are huge). */
function value(s: Score): number {
  if (s.mate !== undefined) return s.mate > 0 ? 100000 - s.mate * 100 : -100000 - s.mate * 100
  return s.cp ?? 0
}

function fmt(s: Score): string {
  return s.mate !== undefined ? `#${s.mate}` : `${((s.cp ?? 0) / 100).toFixed(2)}`
}

function toUci(chess: Chess, san: string): string {
  const m = new Chess(chess.fen()).move(san)
  return m.from + m.to + (m.promotion ?? '')
}

const errors: string[] = []
const warnings: string[] = []
const engine = new Engine()

async function checkExercise(ex: Exercise, where: string) {
  const goal = ex.goal ?? 'line'
  if (goal === 'stars' || goal === 'capture-all' || !ex.solution) return
  const chess = new Chess(ex.fen)
  for (let i = 0; i < ex.solution.length; i++) {
    const san = ex.solution[i]
    const uci = toUci(chess, san)
    const learner = i % 2 === 0
    const isFinalMate = goal === 'mate' && i === ex.solution.length - 1
    if (!isFinalMate) {
      const [best, second] = await engine.analyse(chess.fen(), { depth, multipv: 2 })
      if (best) {
        let played = best.move === uci ? best : second?.move === uci ? second : undefined
        if (!played) played = (await engine.analyse(chess.fen(), { depth, searchmoves: [uci] }))[0]
        const loss = value(best.score) - value(played.score)
        const label = `${where} "${ex.id}" move ${i + 1} (${san})`
        if (learner) {
          const winningEither = value(best.score) > 600 && value(played.score) > 600
          const mateMissed = best.score.mate !== undefined && best.score.mate > 0 && played.score.mate === undefined
          if (mateMissed && goal === 'mate') {
            errors.push(`${label}: engine finds mate (${fmt(best.score)}) with ${best.move}, but ${san} is ${fmt(played.score)}`)
          } else if (best.move !== uci && loss > 60 && !winningEither) {
            errors.push(`${label}: not the best move. ${san}=${fmt(played.score)}, best ${best.move}=${fmt(best.score)}`)
          } else if (best.move === uci && second && value(best.score) - value(second.score) < 40 && value(best.score) < 600) {
            warnings.push(`${label}: alternative ${second.move} is about as good (${fmt(second.score)} vs ${fmt(best.score)}); consider a clearer position`)
          }
        } else if (best.move !== uci && loss > 150 && value(best.score) > -600) {
          warnings.push(`${label}: opponent reply is weak. Better defence ${best.move}=${fmt(best.score)} vs ${san}=${fmt(played.score)}`)
        }
      }
    }
    chess.move(san)
  }
}

async function checkLine(moves: string[], where: string, lineDepth: number) {
  const chess = new Chess()
  for (let i = 0; i < moves.length; i++) {
    const uci = toUci(chess, moves[i])
    const [best] = await engine.analyse(chess.fen(), { depth: lineDepth })
    if (best && best.move !== uci) {
      const [played] = await engine.analyse(chess.fen(), { depth: lineDepth, searchmoves: [uci] })
      const loss = value(best.score) - value(played.score)
      if (loss > 150) warnings.push(`${where} move ${i + 1} (${moves[i]}): loses ${fmt({ cp: loss })} vs ${best.move}`)
    }
    chess.move(moves[i])
  }
}

const levelArg = args.get('level')
const levels = levelArg ? [Number(levelArg)] : [1, 2, 3, 4, 5, 6]
const curriculum: Module[] = []
for (const n of levels) {
  const mod = await import(`../src/data/curriculum/level${n}.ts`)
  curriculum.push(...(mod[`level${n}`] as Module[]))
}

let checked = 0
for (const mod of curriculum) {
  for (const lesson of mod.lessons) {
    for (const block of lesson.blocks) {
      if (block.type !== 'exercise') continue
      if (only && !block.exercise.id.includes(only) && !lesson.id.includes(only)) continue
      await checkExercise(block.exercise, `lesson "${lesson.id}" exercise`)
      checked++
    }
  }
}
if (args.has('openings')) {
  const { openings } = (await import('../src/data/openings/index.ts')) as { openings: Opening[] }
  for (const op of openings) {
    if (only && !op.id.includes(only)) continue
    for (const line of op.lines) await checkLine(line.moves, `opening "${op.id}" line "${line.name}"`, 12)
    checked++
  }
}
engine.quit()

for (const w of warnings) console.log(`WARN  ${w}`)
for (const e of errors) console.log(`ERROR ${e}`)
console.log(`\nChecked ${checked} items: ${errors.length} errors, ${warnings.length} warnings.`)
process.exit(errors.length ? 1 : 0)
