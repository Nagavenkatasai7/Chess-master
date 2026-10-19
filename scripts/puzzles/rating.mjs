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

function hash01(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return ((h >>> 0) % 100000) / 100000
}

const clamp = (x, lo, hi) => Math.max(lo, Math.min(hi, x))

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
    if (!node.move.captured && !node.after.isCheck() && !node.after.isCheckmate()) laterQuiet++
  }
  return {
    n,
    mate: tags.includes('mate'),
    capture,
    check,
    recapture: capture && first.move.to === blunder.move.to,
    hanging: tags.includes('hangingPiece'),
    quiet: !capture && !check,
    laterQuiet,
    d1: depths[0],
    dMax: Math.max(...depths),
    legal: rec.steps[0].legal,
    multiMate1: n === 1 && rec.steps[0].second?.mate === 1,
    king: first.move.piece === 'k',
  }
}

export function ratePuzzle(rec, tags, mainline) {
  const f = puzzleFeatures(rec, tags, mainline)
  let r = f.mate ? 620 : 720
  r += (f.n - 1) * (f.mate ? 330 : 270)
  if (f.recapture) r -= 220
  else if (f.hanging) r -= 140
  else if (f.capture) r -= 30
  if (f.check) r -= 50
  if (f.quiet) r += 230
  r += f.laterQuiet * 120
  r += 34 * clamp(f.d1 - 2, 0, 14)
  r += 14 * clamp(f.dMax - f.d1, 0, 12)
  if (tags.includes('sacrifice')) r += 170
  if (tags.includes('quietMove')) r += 80
  if (tags.includes('defensiveMove')) r += 140
  if (tags.includes('discoveredAttack') || tags.includes('skewer') || tags.includes('pin')) r += 40
  if (tags.includes('promotion')) r -= 40
  if (f.multiMate1) r -= 90
  if (f.king) r += 60
  r += clamp(f.legal - 30, -15, 25) * 4
  r += (hash01(rec.fen + rec.moves.join('')) - 0.5) * 140
  return Math.round(clamp(r, 400, 2600))
}
