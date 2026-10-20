// Heuristic puzzle-rating estimate (Glicko-like scale, clamped to 400-2600).
//
// Lichess rates puzzles from thousands of attempts; we have none, so we combine
// the features that best predict difficulty:
//   - solution length (each extra solver move is a lot harder)
//   - the nature of the key move: recapturing / taking a free piece and checks are
//     natural; quiet moves are hard
//   - search difficulty: the first depth from which Stockfish keeps choosing the
//     key move (a move it finds at depth 1-2 is obvious, depth 10+ is deep)
//   - motifs that humans find harder (sacrifice, quiet move, defensive move)
//   - board complexity (number of legal moves)
import { attacksFrom } from './themes.mjs'

const VALUES = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 }

function hash01(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return ((h >>> 0) % 100000) / 100000
}

const clamp = (x, lo, hi) => Math.max(lo, Math.min(hi, x))

/** Does the piece that just moved attack an enemy piece worth at least 3 (a direct threat)? */
function threatens(node) {
  const board = node.after
  const me = board.get(node.move.to)
  return attacksFrom(board, node.move.to).some((s) => {
    const p = board.get(s)
    return p && p.color !== me.color && p.type !== 'k' && VALUES[p.type] >= 3
  })
}

export function puzzleFeatures(rec, tags, mainline) {
  const n = rec.moves.length / 2
  const first = mainline.nodes[1]
  const blunder = mainline.nodes[0]
  const capture = Boolean(first.move.captured)
  const check = first.after.isCheck()
  const depths = rec.steps.map((s) => Math.min(s.findDepth, 20))
  // later solver moves that are quiet (no capture, no check) are much harder to foresee
  let laterQuiet = 0
  for (let i = 3; i < mainline.nodes.length; i += 2) {
    const node = mainline.nodes[i]
    if (!node.move.captured && !node.after.isCheck()) laterQuiet++
  }
  return {
    n,
    mate: tags.includes('mate'),
    capture,
    check,
    recapture: capture && first.move.to === blunder.move.to,
    hanging: tags.includes('hangingPiece'),
    quiet: !capture && !check,
    threat: !capture && !check && threatens(first),
    laterQuiet,
    d1: depths[0],
    dMax: Math.max(...depths),
    legal: rec.steps[0].legal,
    multiMate1: n === 1 && rec.steps[0].second?.mate === 1,
  }
}

const BASE_MATE = [0, 650, 1150, 1550, 1850, 2050, 2200]
const BASE_ADV = [0, 760, 1150, 1450, 1700, 1900, 2050]

export function ratePuzzle(rec, tags, mainline) {
  const f = puzzleFeatures(rec, tags, mainline)
  let r = (f.mate ? BASE_MATE : BASE_ADV)[Math.min(f.n, 6)]
  if (f.recapture) r -= f.n === 1 ? 250 : 120
  else if (f.hanging) r -= f.n === 1 ? 150 : 80
  else if (f.capture) r -= 40
  if (f.mate) {
    if (f.n > 1 && !f.check) r += 200 // a quiet move that forces mate
  } else if (f.check) r -= 50
  if (f.quiet) r += f.threat ? 110 : 200
  r += f.laterQuiet * 100
  r += 30 * (clamp(f.d1, 1, 16) - 1)
  r += 10 * clamp(f.dMax - f.d1, 0, 12)
  if (tags.includes('sacrifice')) r += 180
  if (tags.includes('defensiveMove')) r += 150
  if (f.multiMate1) r -= 100
  r += clamp(f.legal - 30, -20, 20) * 3
  r += (hash01(rec.fen + rec.moves.join('')) - 0.5) * 140
  return Math.round(clamp(r, 400, 2600))
}
