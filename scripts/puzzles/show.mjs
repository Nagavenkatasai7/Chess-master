// Print cached puzzle candidates for hand inspection.
//   node scripts/puzzles/show.mjs [--n=20] [--theme=fork] [--min=1600] [--max=2000] [--last] [--seed=1]
import { Chess } from 'chess.js'
import { CANDIDATES, processCandidates, readJsonl } from './build.mjs'
import { puzzleFeatures } from './rating.mjs'
import { fmtScore } from './engine.mjs'

const args = Object.fromEntries(process.argv.slice(2).map((a) => a.replace(/^--/, '').split('=')))
const { items } = processCandidates(readJsonl(CANDIDATES))
let list = items
if (args.theme) list = list.filter((it) => it.tags.includes(args.theme))
if (args.min) list = list.filter((it) => it.rating >= Number(args.min))
if (args.max) list = list.filter((it) => it.rating < Number(args.max))
const n = Number(args.n ?? 20)
if (args.last) list = list.slice(-n)
else {
  let s = Number(args.seed ?? 1)
  const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647)
  list = list
    .map((it) => [rnd(), it])
    .sort((a, b) => a[0] - b[0])
    .map((x) => x[1])
    .slice(0, n)
}

for (const it of list) {
  const { rec, tags, rating } = it
  const c = new Chess(rec.fen)
  const sans = []
  for (const u of rec.moves) sans.push(c.move({ from: u.slice(0, 2), to: u.slice(2, 4), promotion: u[4] }).san)
  const start = new Chess(rec.fen)
  start.move({ from: rec.moves[0].slice(0, 2), to: rec.moves[0].slice(2, 4), promotion: rec.moves[0][4] })
  const f = puzzleFeatures(rec, tags, { nodes: buildNodes(rec) })
  console.log('='.repeat(72))
  console.log(`rating ${rating}  [${tags.join(', ')}]  ${rec.game.profile} ply ${rec.game.ply}`)
  console.log(`start ${start.fen()}   (${start.turn() === 'w' ? 'White' : 'Black'} to move)`)
  console.log(start.ascii())
  console.log(`blunder ${sans[0]}  solution: ${sans.slice(1).join(' ')}`)
  console.log(
    `before ${fmtScore(rec.e0)} | steps: ` +
      rec.steps.map((s) => `${s.move} ${fmtScore(s.best)} (2nd ${s.alt ?? '-'} ${s.second ? fmtScore(s.second) : '-'}) d${s.findDepth} L${s.legal}`).join(' ; '),
  )
  console.log(`features ${JSON.stringify(f)} end=${rec.endReason}`)
}

function buildNodes(rec) {
  const c = new Chess(rec.fen)
  return rec.moves.map((u, i) => {
    const move = c.move({ from: u.slice(0, 2), to: u.slice(2, 4), promotion: u[4] })
    return { i, move, after: new Chess(c.fen()) }
  })
}
