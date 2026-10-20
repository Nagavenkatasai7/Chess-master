// Re-verify published puzzles at a higher depth: every solver move must still be
// Stockfish's unique best move (for mate puzzles: the only mating move, except on the
// final move where any mate is accepted).
//
//   node scripts/puzzles/verify.mjs [--n=50] [--depth=20] [--workers=3] [--all] [--drop] [--seed=7]
//
// --drop appends failures to scripts/puzzles/cache/rejected.jsonl and rebuilds
// puzzles.json without them.
import { fork } from 'node:child_process'
import { appendFileSync, mkdirSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { Chess } from 'chess.js'
import { Engine, fmtScore, scoreValue, winChances } from './engine.mjs'

const here = (p) => fileURLToPath(new URL(p, import.meta.url))
const OUT = here('../../src/data/puzzles.json')
const REJECTS = here('./cache/rejected.jsonl')

async function verifyPuzzle(engine, p, depth) {
  const c = new Chess(p.fen)
  const mv = (u) => c.move({ from: u.slice(0, 2), to: u.slice(2, 4), promotion: u[4] })
  mv(p.moves[0])
  const isMate = p.themes.includes('mate')
  const notes = []
  for (let i = 1; i < p.moves.length; i += 2) {
    const last = i === p.moves.length - 1
    if (isMate && last) {
      mv(p.moves[i])
      if (!c.isCheckmate()) return { ok: false, notes: [...notes, `final move ${p.moves[i]} is not mate`] }
      break
    }
    const r = await engine.search(c.fen(), { depth, multipv: 2, newGame: true })
    const [best, second] = r.lines
    const expected = p.moves[i]
    const tag = `move ${(i + 1) / 2} ${expected}: best ${best.move} ${fmtScore(best.score)}, 2nd ${second?.move ?? '-'} ${second ? fmtScore(second.score) : '-'}`
    notes.push(tag)
    if (best.move !== expected) return { ok: false, notes }
    if (second) {
      const bMate = (best.score.mate ?? 0) > 0
      const sMate = (second.score.mate ?? 0) > 0
      if (bMate && sMate) return { ok: false, notes }
      if (!bMate) {
        // slightly looser than generation (evals drift with depth)
        const sb = scoreValue(best.score)
        const ss = scoreValue(second.score)
        if (sMate || sb < 150 || ss > Math.min(200, sb * 0.5) || winChances(best.score) - winChances(second.score) < 0.2) return { ok: false, notes }
      }
    }
    mv(expected)
    if (!last) mv(p.moves[i + 1])
  }
  return { ok: true, notes }
}

async function child() {
  const engine = new Engine({ hash: 64 })
  process.on('message', async (msg) => {
    if (msg.type === 'job') {
      const res = await verifyPuzzle(engine, msg.puzzle, msg.depth)
      process.send({ type: 'result', id: msg.puzzle.id, ...res })
    } else if (msg.type === 'stop') {
      engine.quit()
      process.exit(0)
    }
  })
  process.send({ type: 'ready' })
}

async function main() {
  const args = Object.fromEntries(
    process.argv.slice(2).map((a) => {
      const [k, v] = a.replace(/^--/, '').split('=')
      return [k, v ?? 'true']
    }),
  )
  const depth = Number(args.depth ?? 20)
  const workers = Math.max(1, Math.min(3, Number(args.workers ?? 3)))
  const puzzles = JSON.parse(readFileSync(OUT, 'utf8'))
  let seed = Number(args.seed ?? 7)
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647)
  const sample = args.all === 'true'
    ? puzzles
    : puzzles.map((p) => [rnd(), p]).sort((a, b) => a[0] - b[0]).map((x) => x[1]).slice(0, Number(args.n ?? 50))
  console.log(`re-verifying ${sample.length} of ${puzzles.length} puzzles at depth ${depth} with ${workers} workers`)
  const t0 = Date.now()
  const queue = [...sample]
  const results = []
  await Promise.all(
    Array.from({ length: workers }, () =>
      new Promise((resolve) => {
        const ch = fork(fileURLToPath(import.meta.url), ['--child'], { stdio: ['ignore', 'inherit', 'inherit', 'ipc'] })
        const next = () => {
          const p = queue.shift()
          if (!p) {
            ch.send({ type: 'stop' })
            return
          }
          ch.send({ type: 'job', puzzle: p, depth })
        }
        ch.on('message', (msg) => {
          if (msg.type === 'result') {
            results.push(msg)
            const p = sample.find((x) => x.id === msg.id)
            if (!msg.ok) console.log(`FAIL ${msg.id} (${p.rating}, ${p.themes.join(' ')}): ${msg.notes.join(' | ')}`)
          }
          if (msg.type === 'ready' || msg.type === 'result') next()
        })
        ch.on('exit', resolve)
      }),
    ),
  )
  const failed = results.filter((r) => !r.ok)
  const pass = results.length - failed.length
  console.log(`\npass ${pass}/${results.length} (${((100 * pass) / Math.max(1, results.length)).toFixed(1)}%) in ${((Date.now() - t0) / 1000).toFixed(0)}s`)
  if (args.drop === 'true' && failed.length) {
    mkdirSync(here('./cache/'), { recursive: true })
    for (const f of failed) {
      const p = puzzles.find((x) => x.id === f.id)
      appendFileSync(REJECTS, JSON.stringify({ fen: p.fen, moves: p.moves, id: p.id, notes: f.notes }) + '\n')
    }
    const { build } = await import('./build.mjs')
    build({ max: puzzles.length })
  }
}

if (process.argv.includes('--child')) child()
else main()
