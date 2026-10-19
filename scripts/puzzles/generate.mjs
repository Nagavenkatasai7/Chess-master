// Tactics-puzzle generator (Lichess-style, fully local).
//
//   npm run puzzles:generate -- [options]
//   node scripts/puzzles/generate.mjs [options]
//
// Mines puzzles from Stockfish self-play games in parallel worker processes,
// appends every raw puzzle (with its analysis) to scripts/puzzles/cache/candidates.jsonl,
// then builds src/data/puzzles.json (dedupe, themes, ratings, distribution balance).
// Runs are incremental: new candidates are appended to the cache, and puzzles
// already in puzzles.json keep their ids.
//
// Options:
//   --workers=N      worker processes (default 3; keep one core free)
//   --minutes=M      stop mining after M minutes (default 30)
//   --target=N       stop once the cache holds N raw candidates
//   --build-only     skip mining; rebuild puzzles.json from the cache
//   --no-build       mine only, do not rebuild puzzles.json
//   --max=N          cap the number of puzzles written (default 2500)
import { fork } from 'node:child_process'
import { appendFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, '').split('=')
    return [k, v ?? 'true']
  }),
)
const here = (p) => fileURLToPath(new URL(p, import.meta.url))
const CACHE_DIR = here('./cache/')
const CANDIDATES = here('./cache/candidates.jsonl')

function countCandidates() {
  if (!existsSync(CANDIDATES)) return 0
  return readFileSync(CANDIDATES, 'utf8').split('\n').filter(Boolean).length
}

async function mine() {
  const workers = Math.max(1, Math.min(3, Number(args.workers ?? 3)))
  const minutes = Number(args.minutes ?? 30)
  const target = args.target ? Number(args.target) : Infinity
  mkdirSync(CACHE_DIR, { recursive: true })
  let total = countCandidates()
  const startTotal = total
  const t0 = Date.now()
  console.log(`mining with ${workers} workers for up to ${minutes} min (cache has ${total} candidates)`)

  const stats = new Map()
  const children = []
  let stopping = false
  const stopAll = () => {
    if (stopping) return
    stopping = true
    console.log('stopping workers (finishing current puzzle)...')
    for (const c of children) if (c.connected) c.send({ type: 'stop' })
  }
  process.on('SIGINT', stopAll)
  process.on('SIGTERM', stopAll)

  const done = []
  for (let i = 0; i < workers; i++) {
    const child = fork(here('./worker.mjs'), [], { stdio: ['ignore', 'inherit', 'inherit', 'ipc'] })
    children.push(child)
    child.on('message', (msg) => {
      if (msg.type === 'puzzle') {
        appendFileSync(CANDIDATES, JSON.stringify(msg.puzzle) + '\n')
        total++
        if (total >= target) stopAll()
      } else if (msg.type === 'stats') {
        stats.set(i, msg.stats)
      }
    })
    done.push(new Promise((resolve) => child.on('exit', resolve)))
  }

  const report = () => {
    const agg = { games: 0, plies: 0, scans: 0, candidates: 0, puzzles: 0, msScan: 0, msCook: 0, msPlay: 0, reject: {}, byProfile: {}, gamesByProfile: {}, msByProfile: {} }
    for (const s of stats.values()) {
      for (const k of ['games', 'plies', 'scans', 'candidates', 'puzzles', 'msScan', 'msCook', 'msPlay']) agg[k] += s[k]
      for (const key of ['reject', 'byProfile', 'gamesByProfile', 'msByProfile'])
        for (const [k, v] of Object.entries(s[key] ?? {})) agg[key][k] = (agg[key][k] ?? 0) + v
    }
    const min = (Date.now() - t0) / 60000
    console.log(
      `[${min.toFixed(1)} min] games ${agg.games}, candidates ${agg.candidates}, new puzzles ${total - startTotal} ` +
        `(${((total - startTotal) / Math.max(min, 0.01)).toFixed(1)}/min), cache ${total} | ` +
        `scan ${(agg.msScan / 1000).toFixed(0)}s cook ${(agg.msCook / 1000).toFixed(0)}s play ${(agg.msPlay / 1000).toFixed(0)}s`,
    )
    return agg
  }
  const timer = setInterval(report, 60000)
  const deadline = setTimeout(stopAll, minutes * 60000)
  await Promise.all(done)
  clearInterval(timer)
  clearTimeout(deadline)
  const agg = report()
  console.log('rejections:', JSON.stringify(agg.reject))
  console.log('puzzles by profile:', JSON.stringify(agg.byProfile), 'games by profile:', JSON.stringify(agg.gamesByProfile), 'sec by profile:', JSON.stringify(Object.fromEntries(Object.entries(agg.msByProfile).map(([k, v]) => [k, Math.round(v / 1000)]))))
  process.removeListener('SIGINT', stopAll)
  process.removeListener('SIGTERM', stopAll)
}

if (args['build-only'] !== 'true') await mine()
if (args['no-build'] !== 'true') {
  const { build } = await import('./build.mjs')
  build({ max: args.max ? Number(args.max) : undefined })
}
