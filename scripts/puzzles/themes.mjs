// Theme tagging for generated puzzles. A port of the Lichess puzzle tagger
// heuristics (lichess-org/lichess-puzzler, tagger/cook.py) to chess.js, restricted
// to the app's theme vocabulary.
import { Chess } from 'chess.js'

export const VOCAB = [
  'mateIn1', 'mateIn2', 'mateIn3', 'mateIn4', 'mate', 'oneMove', 'short', 'long',
  'fork', 'pin', 'skewer', 'discoveredAttack', 'doubleCheck', 'hangingPiece', 'trappedPiece',
  'backRankMate', 'smotheredMate', 'promotion', 'sacrifice', 'crushing', 'advantage',
  'opening', 'middlegame', 'endgame', 'kingsideAttack', 'queensideAttack', 'defensiveMove',
  'quietMove', 'equality',
]

export const VALUES = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 }
const KING_VALUES = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 99 }
const RAY_TYPES = new Set(['b', 'r', 'q'])
const other = (c) => (c === 'w' ? 'b' : 'w')

// --- square geometry -------------------------------------------------------
const fileOf = (sq) => sq.charCodeAt(0) - 97
const rankOf = (sq) => sq.charCodeAt(1) - 49
const sqName = (f, r) => (f >= 0 && f < 8 && r >= 0 && r < 8 ? String.fromCharCode(97 + f) + (r + 1) : null)
const distance = (a, b) => Math.max(Math.abs(fileOf(a) - fileOf(b)), Math.abs(rankOf(a) - rankOf(b)))
const ORTHO = [[1, 0], [-1, 0], [0, 1], [0, -1]]
const DIAG = [[1, 1], [1, -1], [-1, 1], [-1, -1]]
const KNIGHT = [[1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2]]
export const ALL_SQUARES = []
for (let r = 0; r < 8; r++) for (let f = 0; f < 8; f++) ALL_SQUARES.push(sqName(f, r))

/** Squares strictly between a and b if they share a line, else empty. */
export function between(a, b) {
  const df = fileOf(b) - fileOf(a)
  const dr = rankOf(b) - rankOf(a)
  const out = new Set()
  if (!(df === 0 || dr === 0 || Math.abs(df) === Math.abs(dr))) return out
  const sf = Math.sign(df)
  const sr = Math.sign(dr)
  let f = fileOf(a) + sf
  let r = rankOf(a) + sr
  while (f !== fileOf(b) || r !== rankOf(b)) {
    out.add(sqName(f, r))
    f += sf
    r += sr
  }
  return out
}

/** Squares attacked by the piece standing on `square`. */
export function attacksFrom(chess, square) {
  const piece = chess.get(square)
  if (!piece) return []
  const f0 = fileOf(square)
  const r0 = rankOf(square)
  const out = []
  const step = (dirs, slide) => {
    for (const [df, dr] of dirs) {
      let f = f0 + df
      let r = r0 + dr
      while (true) {
        const s = sqName(f, r)
        if (!s) break
        out.push(s)
        if (!slide || chess.get(s)) break
        f += df
        r += dr
      }
    }
  }
  switch (piece.type) {
    case 'p': {
      const dir = piece.color === 'w' ? 1 : -1
      for (const df of [-1, 1]) {
        const s = sqName(f0 + df, r0 + dir)
        if (s) out.push(s)
      }
      break
    }
    case 'n':
      step(KNIGHT, false)
      break
    case 'k':
      step([...ORTHO, ...DIAG], false)
      break
    case 'b':
      step(DIAG, true)
      break
    case 'r':
      step(ORTHO, true)
      break
    case 'q':
      step([...ORTHO, ...DIAG], true)
      break
  }
  return out
}

function kingSquare(chess, color) {
  for (const s of ALL_SQUARES) {
    const p = chess.get(s)
    if (p && p.type === 'k' && p.color === color) return s
  }
  return null
}

/** If the `color` piece on `square` is absolutely pinned, the full line through king and pinner; else null. */
export function pinRay(chess, color, square) {
  const king = kingSquare(chess, color)
  if (!king || king === square) return null
  const df = fileOf(square) - fileOf(king)
  const dr = rankOf(square) - rankOf(king)
  if (!(df === 0 || dr === 0 || Math.abs(df) === Math.abs(dr))) return null
  const sf = Math.sign(df)
  const sr = Math.sign(dr)
  const diagonal = sf !== 0 && sr !== 0
  let f = fileOf(king) + sf
  let r = rankOf(king) + sr
  let passed = false
  while (true) {
    const s = sqName(f, r)
    if (!s) return null
    const p = chess.get(s)
    if (s === square) passed = true
    else if (p) {
      if (!passed) return null
      if (p.color === color) return null
      const ok = diagonal ? p.type === 'b' || p.type === 'q' : p.type === 'r' || p.type === 'q'
      if (!ok) return null
      break
    }
    f += sf
    r += sr
  }
  const ray = new Set([king])
  for (const sign of [1, -1]) {
    let ff = fileOf(king) + sf * sign
    let rr = rankOf(king) + sr * sign
    let s
    while ((s = sqName(ff, rr))) {
      ray.add(s)
      ff += sf * sign
      rr += sr * sign
    }
  }
  return ray
}

export function isDefended(chess, square) {
  const piece = chess.get(square)
  if (chess.attackers(square, piece.color).length) return true
  // x-ray defence through an attacking slider
  for (const a of chess.attackers(square, other(piece.color))) {
    const ap = chess.get(a)
    if (RAY_TYPES.has(ap.type)) {
      const copy = new Chess(chess.fen(), { skipValidation: true })
      copy.remove(a)
      if (copy.attackers(square, piece.color).length) return true
    }
  }
  return false
}
export const isHanging = (chess, square) => !isDefended(chess, square)

function canBeTakenByLowerPiece(chess, square) {
  const piece = chess.get(square)
  return chess.attackers(square, other(piece.color)).some((a) => {
    const ap = chess.get(a)
    return ap.type !== 'k' && VALUES[ap.type] < VALUES[piece.type]
  })
}

export function isInBadSpot(chess, square) {
  const piece = chess.get(square)
  if (!piece) return false
  return chess.attackers(square, other(piece.color)).length > 0 && (isHanging(chess, square) || canBeTakenByLowerPiece(chess, square))
}

/** `chess` must have the trapped piece's side to move. */
function isTrapped(chess, square) {
  const piece = chess.get(square)
  if (!piece || piece.color !== chess.turn()) return false
  if (chess.isCheck() || pinRay(chess, piece.color, square)) return false
  if (piece.type === 'p' || piece.type === 'k') return false
  if (!isInBadSpot(chess, square)) return false
  for (const m of chess.moves({ square, verbose: true })) {
    if (m.captured && VALUES[m.captured] >= VALUES[piece.type]) return false
    chess.move(m)
    const bad = isInBadSpot(chess, m.to)
    chess.undo()
    if (!bad) return false
  }
  return true
}

export function materialDiff(chess, color) {
  let d = 0
  for (const row of chess.board()) for (const p of row) if (p) d += (p.color === color ? 1 : -1) * VALUES[p.type]
  return d
}

export function nonPawnMaterial(chess) {
  let n = 0
  for (const row of chess.board()) for (const p of row) if (p && p.type !== 'p') n += VALUES[p.type]
  return n
}

function attackedOpponentSquares(chess, from, pov) {
  const out = []
  for (const s of attacksFrom(chess, from)) {
    const p = chess.get(s)
    if (p && p.color !== pov) out.push([p, s])
  }
  return out
}

const checkers = (chess) => {
  if (!chess.isCheck()) return []
  const k = kingSquare(chess, chess.turn())
  return chess.attackers(k, other(chess.turn()))
}

// --- puzzle model ----------------------------------------------------------

/**
 * Lichess-style mainline: nodes[i] is the position after moves[i]; nodes[0] is the
 * puzzle start (after the opponent's blunder); solver moves are at odd indices.
 */
export function buildMainline(fen, moves) {
  const c = new Chess(fen)
  const root = new Chess(fen)
  const nodes = []
  for (let i = 0; i < moves.length; i++) {
    const uci = moves[i]
    const before = new Chess(c.fen())
    const move = c.move({ from: uci.slice(0, 2), to: uci.slice(2, 4), promotion: uci[4] })
    const after = new Chess(c.fen())
    nodes.push({ i, uci, move, before, after })
  }
  for (let i = 0; i < nodes.length; i++) {
    nodes[i].prev = nodes[i - 1] ?? null
    nodes[i].next = nodes[i + 1] ?? null
  }
  return { root, nodes, pov: nodes[0].after.turn() }
}

const movedType = (node) => node.after.get(node.move.to).type
const isCapture = (node) => Boolean(node.move.captured)
const solverNodes = (p) => p.nodes.filter((n) => n.i % 2 === 1)
const opponentNodes = (p) => p.nodes.filter((n) => n.i % 2 === 0)
const isEnd = (p, node) => node.i === p.nodes.length - 1

function isAdvancedPawnMove(node) {
  if (node.move.promotion) return true
  if (node.move.piece !== 'p') return false
  const r = rankOf(node.move.to)
  return node.move.color === 'w' ? r > 4 : r < 3
}

// --- themes ----------------------------------------------------------------

function mateIn(p) {
  const end = p.nodes[p.nodes.length - 1].after
  if (!end.isCheckmate()) return null
  return Math.floor(p.nodes.length / 2)
}

function smotheredMate(p) {
  const board = p.nodes[p.nodes.length - 1].after
  const king = kingSquare(board, other(p.pov))
  for (const c of checkers(board)) {
    if (board.get(c).type === 'n') {
      for (const s of ALL_SQUARES) {
        if (distance(s, king) !== 1) continue
        const b = board.get(s)
        if (!b || b.color === p.pov) return false
      }
      return true
    }
  }
  return false
}

function backRankMate(p) {
  const board = p.nodes[p.nodes.length - 1].after
  if (!board.isCheckmate()) return false
  const king = kingSquare(board, other(p.pov))
  const backRank = p.pov === 'w' ? 7 : 0
  if (rankOf(king) !== backRank) return false
  const dir = p.pov === 'w' ? -1 : 1
  const squares = [sqName(fileOf(king), backRank + dir), sqName(fileOf(king) - 1, backRank + dir), sqName(fileOf(king) + 1, backRank + dir)].filter(Boolean)
  for (const s of squares) {
    const piece = board.get(s)
    if (!piece || piece.color === p.pov || board.attackers(s, p.pov).length) return false
  }
  return checkers(board).some((c) => rankOf(c) === backRank)
}

function fork(p) {
  const sn = solverNodes(p)
  for (const node of sn.slice(0, -1)) {
    if (movedType(node) === 'k') continue
    const board = node.after
    if (isInBadSpot(board, node.move.to)) continue
    const mover = board.get(node.move.to)
    let nb = 0
    for (const [piece, square] of attackedOpponentSquares(board, node.move.to, p.pov)) {
      if (piece.type === 'p') continue
      if (
        KING_VALUES[piece.type] > KING_VALUES[mover.type] ||
        (piece.type !== 'k' && isHanging(board, square) && !board.attackers(node.move.to, other(p.pov)).includes(square))
      )
        nb++
    }
    if (nb > 1) return true
  }
  return false
}

function hangingPiece(p) {
  const start = p.nodes[0].after
  const first = p.nodes[1]
  const to = first.move.to
  const captured = start.get(to)
  if (start.isCheck() && (!captured || captured.type === 'p')) return false
  if (captured && captured.type !== 'p') {
    if (isHanging(start, to)) {
      const op = p.nodes[0].move
      if (op.captured && VALUES[op.captured] >= VALUES[captured.type] && op.to === to) return false
      if (p.nodes.length < 4) return true
      if (materialDiff(p.nodes[3].after, p.pov) >= materialDiff(p.nodes[1].after, p.pov)) return true
    }
  }
  return false
}

function pinPreventsAttack(p) {
  for (const node of solverNodes(p)) {
    const board = node.after
    for (const square of ALL_SQUARES) {
      const piece = board.get(square)
      if (!piece || piece.color === p.pov || piece.type === 'k') continue
      const ray = pinRay(board, piece.color, square)
      if (!ray) continue
      for (const a of attacksFrom(board, square)) {
        const attacked = board.get(a)
        if (attacked && attacked.color === p.pov && attacked.type !== 'k' && !ray.has(a) &&
          (VALUES[attacked.type] > VALUES[piece.type] || isHanging(board, a))) return true
      }
    }
  }
  return false
}

/** A solver move attacks an absolutely pinned piece with a cheaper piece (or the pinned piece is undefended). */
function pinnedPieceAttacked(p) {
  for (const node of solverNodes(p)) {
    const board = node.after
    const mover = board.get(node.move.to)
    if (mover.type === 'k') continue
    for (const [piece, square] of attackedOpponentSquares(board, node.move.to, p.pov)) {
      if (piece.type === 'k' || piece.type === 'p') continue
      if (!pinRay(board, piece.color, square)) continue
      if (VALUES[piece.type] > VALUES[mover.type] || isHanging(board, square)) {
        if (!board.attackers(node.move.to, other(p.pov)).includes(square)) return true
      }
    }
  }
  return false
}

function pseudoTargetsOffRay(board, square, ray) {
  const piece = board.get(square)
  if (piece.type === 'p') {
    const dir = piece.color === 'w' ? 1 : -1
    const push = sqName(fileOf(square), rankOf(square) + dir)
    if (push && !board.get(push) && !ray.has(push)) return true
    return attacksFrom(board, square).some((s) => board.get(s)?.color === other(piece.color) && !ray.has(s))
  }
  return attacksFrom(board, square).some((s) => board.get(s)?.color !== piece.color && !ray.has(s))
}

function pinPreventsEscape(p) {
  for (const node of solverNodes(p)) {
    const board = node.after
    for (const sq of ALL_SQUARES) {
      const pinned = board.get(sq)
      if (!pinned || pinned.color === p.pov || pinned.type === 'k') continue
      const ray = pinRay(board, pinned.color, sq)
      if (!ray) continue
      for (const a of board.attackers(sq, p.pov)) {
        if (!ray.has(a)) continue
        const attacker = board.get(a)
        if (VALUES[pinned.type] > VALUES[attacker.type]) return true
        if (isHanging(board, sq) && !board.attackers(a, other(p.pov)).includes(sq) && pseudoTargetsOffRay(board, sq, ray)) return true
      }
    }
  }
  return false
}

function skewer(p) {
  for (const node of solverNodes(p).slice(1)) {
    const prev = node.prev
    const capture = prev.after.get(node.move.to)
    if (capture && RAY_TYPES.has(movedType(node)) && !node.after.isCheckmate()) {
      const btw = between(node.move.from, node.move.to)
      const op = prev.move
      if (op.to === node.move.to || !btw.has(op.from)) continue
      if (KING_VALUES[movedType(prev)] > KING_VALUES[capture.type] && isInBadSpot(prev.after, node.move.to)) return true
    }
  }
  return false
}

function discoveredCheck(p) {
  for (const node of solverNodes(p)) {
    const cs = checkers(node.after)
    if (cs.length && !cs.includes(node.move.to)) return true
  }
  return false
}

function discoveredAttack(p) {
  if (discoveredCheck(p)) return true
  for (const node of solverNodes(p).slice(1)) {
    if (!isCapture(node)) continue
    const btw = between(node.move.from, node.move.to)
    if (node.prev.move.to === node.move.to) return false
    const prev2 = node.prev.prev
    const castle = prev2.move.flags.includes('k') || prev2.move.flags.includes('q')
    if (btw.has(prev2.move.from) && node.move.to !== prev2.move.to && node.move.from !== prev2.move.to && !castle) return true
  }
  return false
}

const doubleCheck = (p) => solverNodes(p).some((n) => checkers(n.after).length > 1)
const promotion = (p) => solverNodes(p).some((n) => Boolean(n.move.promotion))

function sacrifice(p) {
  const diffs = p.nodes.map((n) => materialDiff(n.after, p.pov))
  const initial = diffs[0]
  for (let i = 3; i < diffs.length; i += 2) {
    if (diffs[i] - initial <= -2) return !opponentNodes(p).slice(1).some((n) => n.move.promotion)
  }
  return false
}

function trappedPiece(p) {
  for (const node of solverNodes(p).slice(1)) {
    let square = node.move.to
    const captured = node.prev.after.get(square)
    if (captured && captured.type !== 'p') {
      const prev = node.prev
      if (prev.move.to === square) square = prev.move.from
      const board = new Chess(prev.before.fen())
      if (isTrapped(board, square)) return true
    }
  }
  return false
}

function quietMove(p) {
  for (const node of solverNodes(p)) {
    if (isEnd(p, node)) continue
    if (node.after.isCheck() || node.before.isCheck()) continue
    if (isCapture(node)) continue
    if (attackedOpponentSquares(node.after, node.move.to, p.pov).length) continue
    if (isAdvancedPawnMove(node)) continue
    if (movedType(node) === 'k') continue
    return true
  }
  return false
}

function defensiveMove(p) {
  const last = p.nodes[p.nodes.length - 1]
  if (last.before.moves().length < 3) return false
  if (last.after.isCheck() || isCapture(last)) return false
  if (attackedOpponentSquares(last.after, last.move.to, p.pov).length) return false
  return !last.move.promotion && !isAdvancedPawnMove(last)
}

function checkEscape(p) {
  for (const node of solverNodes(p)) {
    if (node.after.isCheck() || isCapture(node)) return false
    if (node.before.moves().length < 3) return false
    if (node.before.isCheck()) return true
  }
  return false
}

function sideAttack(p, cornerFile, kingFiles, nbPieces) {
  const backRank = p.pov === 'w' ? 7 : 0
  const init = p.nodes[0].after
  const king = kingSquare(init, other(p.pov))
  if (!king || rankOf(king) !== backRank || !kingFiles.includes(fileOf(king)) || p.nodes.length < 5) return false
  if (!solverNodes(p).some((n) => n.after.isCheck())) return false
  if (p.nodes[p.nodes.length - 1].after.isCheckmate()) return true
  let score = 0
  const corner = sqName(cornerFile, backRank)
  for (const node of solverNodes(p)) {
    const d = distance(corner, node.move.to)
    if (node.after.isCheck()) score++
    if (isCapture(node) && d <= 3) score++
    else if (d >= 5) score--
  }
  return score >= nbPieces
}

/** Game phase of the puzzle start position. */
export function phase(p) {
  const start = p.nodes[0].after
  const npm = nonPawnMaterial(start)
  if (npm <= 26) return 'endgame'
  const fullmove = Number(start.fen().split(' ')[5])
  return fullmove <= 12 ? 'opening' : 'middlegame'
}

/**
 * @param {string} fen      position before the opponent's move
 * @param {string[]} moves  [opponent move, solver, opponent, ..., solver] (UCI)
 * @param {number} cp       solver's eval (centipawns) at the puzzle start, for non-mate puzzles
 */
export function tagPuzzle(fen, moves, cp) {
  const p = buildMainline(fen, moves)
  const tags = []
  const m = mateIn(p)
  if (m) {
    if (m <= 4) tags.push(`mateIn${m}`)
    tags.push('mate')
    if (smotheredMate(p)) tags.push('smotheredMate')
    else if (backRankMate(p)) tags.push('backRankMate')
  } else if (cp >= 300) tags.push('crushing')
  else if (cp >= 150) tags.push('advantage')
  else tags.push('equality')
  if (doubleCheck(p)) tags.push('doubleCheck')
  if (quietMove(p)) tags.push('quietMove')
  if (!m && (defensiveMove(p) || checkEscape(p))) tags.push('defensiveMove')
  if (sacrifice(p)) tags.push('sacrifice')
  if (fork(p)) tags.push('fork')
  if (hangingPiece(p)) tags.push('hangingPiece')
  if (trappedPiece(p)) tags.push('trappedPiece')
  if (discoveredAttack(p)) tags.push('discoveredAttack')
  if (skewer(p)) tags.push('skewer')
  if (pinPreventsAttack(p) || pinPreventsEscape(p) || pinnedPieceAttacked(p)) tags.push('pin')
  if (promotion(p)) tags.push('promotion')
  if (sideAttack(p, 7, [6, 7], 2)) tags.push('kingsideAttack')
  else if (sideAttack(p, 0, [0, 1, 2], 2)) tags.push('queensideAttack')
  tags.push(phase(p))
  const n = p.nodes.length
  tags.push(n === 2 ? 'oneMove' : n === 4 ? 'short' : 'long')
  return { tags, mainline: p }
}
