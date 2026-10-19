// Puzzle-mining worker (one per core). Plays engine self-play games of varied,
// imperfect strength, scans every position for a sudden decisive opportunity
// (the previous move was a blunder), then "cooks" a Lichess-style puzzle line:
// every solver move must be the engine's unique best move.
//
// Run by generate.mjs via child_process.fork; it can also run standalone for
// debugging:  node scripts/puzzles/worker.mjs --games=3 --verbose
import os from 'node:os'
import { randomInt } from 'node:crypto'
import { Chess } from 'chess.js'
import { Engine, scoreValue, winChances, negate, fmtScore } from './engine.mjs'
import { OPENINGS } from './openings.mjs'

export const CFG = {
  scanNodes: 30000, // per-position scan (~depth 11-12)
  preDepth: 12, // quick uniqueness pre-check at the puzzle position
  beforeDepth: 14, // eval of the position before the blunder
  verifyDepth: 18, // MultiPV-2 verification of every solver move
  replyDepth: 16, // opponent's best reply
  maxPly: 150,
  minFirstAdv: 230, // solver's first move must win at least this (cp) ...
  minAdv: 200, // ... and keep at least this on later moves
  maxSecond: 150, // second-best move may be worth at most this (cp)
  maxBeforeAdv: 150, // position before the blunder: solver's eval at most this (non-mate puzzles)
  maxBeforeMate: 1000, // ... (mate puzzles; a blunder into mate when already worse is still a fine puzzle)
  maxMaterialUpAdv: 2, // solver may be at most this many pawns up at the puzzle start (non-mate)
  maxMaterialUpMate: 6,
  maxSolverMovesMate: 6,
  maxSolverMovesAdv: 5,
  maxPuzzlesPerGame: 5,
  maxBranches: 2,
}

const VALUES = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 }

// Game profiles: who is playing. Skill = Stockfish "Skill Level" (0-20).
// scanNodes: per-position scan budget (weak games have shallow tactics: scan cheaper)
const PROFILES = [
  { name: 'novice', weight: 28, skill: [0, 2], bookProb: 0.45, bookMax: 6, randomPlies: [0, 2], lapse: 0, scanNodes: 16000, branches: 3 },
  { name: 'casual', weight: 26, skill: [3, 7], bookProb: 0.75, bookMax: 10, randomPlies: [0, 4], lapse: 0.04, lapseSkill: [0, 2], scanNodes: 22000, branches: 3 },
  { name: 'club', weight: 26, skill: [9, 16], bookProb: 0.85, bookMax: 14, randomPlies: [1, 4], lapse: 0.12, lapseSkill: [0, 5], scanNodes: 30000, branches: 2 },
  {
    name: 'endgame',
    weight: 20,
    skill: [16, 20],
    bookProb: 0.85,
    bookMax: 14,
    randomPlies: [1, 4],
    lapse: 0.01,
    lapseSkill: [4, 9],
    switchNpm: 34, // switch to the late skill once total non-pawn material drops to this
    lateSkill: [0, 7],
    scanNodes: 30000,
    branches: 3,
  },
]

// ---------------------------------------------------------------------------
// helpers

function mulberry32(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
const irange = (rng, [lo, hi]) => lo + Math.floor(rng() * (hi - lo + 1))
const pick = (rng, arr) => arr[Math.floor(rng() * arr.length)]

export function uciOf(m) {
  return m.from + m.to + (m.promotion ?? '')
}
export function applyUci(chess, uci) {
  return chess.move({ from: uci.slice(0, 2), to: uci.slice(2, 4), promotion: uci[4] })
}
export function materialDiff(chess, color) {
  let d = 0
  for (const row of chess.board())
    for (const p of row) if (p) d += (p.color === color ? 1 : -1) * VALUES[p.type]
  return d
}
export function nonPawnMaterial(chess) {
  let n = 0
  for (const row of chess.board()) for (const p of row) if (p && p.type !== 'p') n += VALUES[p.type]
  return n
}
const fenKey = (fen) => fen.split(' ').slice(0, 4).join(' ')

/** Is the piece on `square` attacked and either undefended or attackable by a cheaper piece? */
function inBadSpot(chess, square) {
  const piece = chess.get(square)
  if (!piece) return false
  const enemy = piece.color === 'w' ? 'b' : 'w'
  const attackers = chess.attackers(square, enemy)
  if (!attackers.length) return false
  if (!chess.attackers(square, piece.color).length) return true
  return attackers.some((sq) => {
    const a = chess.get(sq)
    return a.type !== 'k' && VALUES[a.type] < VALUES[piece.type]
  })
}

/** First depth from which every later iteration picked `move` as best. */
function consistentDepth(byDepth, move) {
  let d = null
  for (let i = byDepth.length - 1; i >= 0; i--) {
    if (byDepth[i].move !== move) break
    d = byDepth[i].depth
  }
  return d ?? 99
}

function uniqueAdv(best, second) {
  if (!second) return true
  if (second.mate !== undefined && second.mate > 0) return false
  const sb = scoreValue(best)
  const ss = scoreValue(second)
  return ss <= Math.min(CFG.maxSecond, sb * 0.4) && winChances(best) - winChances(second) >= 0.3
}

// ---------------------------------------------------------------------------

export class Miner {
  constructor({ engine, verbose = false, onPuzzle = () => {}, shouldStop = () => false }) {
    this.engine = engine
    this.verbose = verbose
    this.onPuzzle = onPuzzle
    this.shouldStop = shouldStop
    this.stats = { games: 0, byProfile: {}, gamesByProfile: {}, msByProfile: {}, plies: 0, scans: 0, candidates: 0, puzzles: 0, reject: {}, msScan: 0, msCook: 0, msPlay: 0 }
  }

  log(...a) {
    if (this.verbose) console.log(...a)
  }

  reject(reason) {
    this.stats.reject[reason] = (this.stats.reject[reason] ?? 0) + 1
    this.log('   reject:', reason)
    return null
  }

  async pickMove(chess, skill) {
    const fen = chess.fen()
    if (skill >= 20) {
      const r = await this.engine.search(fen, { nodes: 8000 })
      return { move: r.bestmove, score: r.lines[0]?.score }
    }
    const r = await this.engine.search(fen, { depth: Math.min(skill + 1, 10), nodes: 25000, skill })
    return { move: r.bestmove, score: r.lines[0]?.score }
  }

  /** A random move among those within `margin` cp of the best (shallow MultiPV search). */
  async sensibleMove(chess, rng, exclude, margin = 50) {
    const r = await this.engine.search(chess.fen(), { depth: 8, multipv: 6 })
    const top = r.lines[0]
    if (!top) return null
    const ok = r.lines.filter((l) => l.move !== exclude && scoreValue(l.score) >= scoreValue(top.score) - margin)
    if (!ok.length) return r.lines.find((l) => l.move !== exclude)?.move ?? null
    return pick(rng, ok).move
  }

  async playGame(seed) {
    const rng = mulberry32(seed)
    const gameStart = Date.now()
    const total = PROFILES.reduce((n, p) => n + p.weight, 0)
    let roll = rng() * total
    const profile = PROFILES.find((p) => (roll -= p.weight) < 0) ?? PROFILES[0]
    const skills = { w: irange(rng, profile.skill), b: irange(rng, profile.skill) }
    const late = profile.lateSkill ? { w: irange(rng, profile.lateSkill), b: irange(rng, profile.lateSkill) } : null
    const book = rng() < profile.bookProb ? pick(rng, OPENINGS) : null
    const bookLen = book ? Math.min(book.length, 1 + Math.floor(rng() * profile.bookMax)) : 0
    const randomUntil = bookLen + irange(rng, profile.randomPlies)
    const game = { seed, profile: profile.name, skills, late, bookLen }
    this.log(`game ${seed} ${profile.name} W${skills.w} B${skills.b}${late ? ` late W${late.w} B${late.b}` : ''} book ${bookLen}`)

    const chess = new Chess()
    const plies = [] // { fen, scan, move, ply }
    const cooked = new Set()
    const recentFirst = [] // { ply, move }
    let found = 0
    let branches = 0
    let decided = 0
    let switched = !profile.switchNpm
    let forceAvoid = null
    let ply = 0

    while (ply < CFG.maxPly && !this.shouldStop()) {
      let over = chess.isGameOver()
      if (!over && decided >= 6) over = true
      if (over) {
        // Rewind to an earlier balanced position and try a different continuation.
        if (branches >= (profile.branches ?? CFG.maxBranches) || found >= CFG.maxPuzzlesPerGame) break
        const options = plies.filter(
          (p, i) => i >= 8 && i < plies.length - 6 && p.scan && Math.abs(scoreValue(p.scan)) <= 150 && p.move,
        )
        if (!options.length) break
        const back = pick(rng, options)
        const idx = plies.indexOf(back)
        forceAvoid = back.move
        plies.length = idx
        chess.load(back.fen)
        ply = back.ply
        decided = 0
        branches++
        this.log(`  branch ${branches} from ply ${ply}`)
        continue
      }
      const fen = chess.fen()
      if (!switched && nonPawnMaterial(chess) <= profile.switchNpm) switched = true
      const turn = chess.turn()
      const entry = { fen, scan: null, move: null, ply }
      plies.push(entry)

      // --- scan (skipped when the previous move followed the previous scan's PV: no blunder possible)
      const prev = plies[plies.length - 2]
      if (ply >= Math.max(3, bookLen) && switched) {
        if (prev?.scan && prev.pv?.length > 1 && prev.move === prev.pv[0] && (prev.estimated ?? 0) < 2) {
          entry.scan = negate(prev.scan)
          entry.pv = prev.pv.slice(1)
          entry.estimated = (prev.estimated ?? 0) + 1
        } else {
          const t = Date.now()
          const r = await this.engine.search(fen, { nodes: profile.scanNodes ?? CFG.scanNodes })
          this.stats.msScan += Date.now() - t
          this.stats.scans++
          entry.scan = r.lines[0]?.score ?? null
          entry.pv = r.lines[0]?.pv ?? []
          if (entry.scan && prev?.scan && prev.move && found < CFG.maxPuzzlesPerGame) {
            const e1 = entry.scan
            const e0 = negate(prev.scan)
            const mateCand = e1.mate !== undefined && e1.mate > 0 && !(e0.mate !== undefined && e0.mate > 0)
            const advCand =
              e1.mate === undefined &&
              scoreValue(e1) >= 180 &&
              scoreValue(e0) <= 200 &&
              winChances(e1) - winChances(e0) >= 0.25
            if ((mateCand || advCand) && !cooked.has(fenKey(fen))) {
              cooked.add(fenKey(fen))
              this.stats.candidates++
              this.log(`  ply ${ply} candidate ${fmtScore(e0)} -> ${fmtScore(e1)} after ${prev.move}`)
              const t2 = Date.now()
              const puzzle = await this.cook(prev.fen, prev.move, { ...game, ply: prev.ply, branch: branches }, recentFirst)
              this.stats.msCook += Date.now() - t2
              if (puzzle) {
                found++
                this.stats.puzzles++
                this.stats.byProfile[profile.name] = (this.stats.byProfile[profile.name] ?? 0) + 1
                recentFirst.push({ ply, move: puzzle.moves[1] })
                this.log(`  PUZZLE ${puzzle.kind} ${puzzle.moves.join(' ')}`)
                this.onPuzzle(puzzle)
              }
            }
          }
        }
        // keep playing lopsided positions for a while: the winning side's mating attacks make mate puzzles
        if (entry.scan && Math.abs(scoreValue(entry.scan)) >= 900) decided++
        else decided = 0
      }

      // --- move
      const t3 = Date.now()
      let move = null
      if (ply < bookLen && !forceAvoid) {
        try {
          const m = chess.move(book[ply])
          chess.undo()
          move = uciOf(m)
        } catch {
          move = null
        }
      }
      if (!move && (ply < randomUntil || forceAvoid)) move = await this.sensibleMove(chess, rng, forceAvoid)
      if (!move) {
        let skill = switched && late ? late[turn] : skills[turn]
        if (profile.lapse && rng() < profile.lapse) skill = irange(rng, profile.lapseSkill)
        const r = await this.pickMove(chess, skill)
        move = r.move
        if (!switched && r.score) {
          // no scans before the endgame switch: use the move search score to stop lopsided games
          if (Math.abs(scoreValue(r.score)) >= 900) decided++
          else decided = 0
        }
      }
      forceAvoid = null
      this.stats.msPlay += Date.now() - t3
      if (!move) break
      try {
        applyUci(chess, move)
      } catch {
        break
      }
      entry.move = move
      ply++
      this.stats.plies++
    }
    this.stats.games++
    this.stats.msByProfile[profile.name] = (this.stats.msByProfile[profile.name] ?? 0) + (Date.now() - gameStart)
    this.stats.gamesByProfile[profile.name] = (this.stats.gamesByProfile[profile.name] ?? 0) + 1
    return found
  }

  /** Try to build a puzzle where `m0` (played from `p0fen`) is the blunder. */
  async cook(p0fen, m0, game, recentFirst) {
    const e = this.engine
    const board0 = new Chess(p0fen)
    const board1 = new Chess(p0fen)
    applyUci(board1, m0)
    const p1fen = board1.fen()
    const solver = board1.turn()
    if (board1.moves().length < 2) return this.reject('forced-first')
    const md1 = materialDiff(board1, solver)

    // quick pre-check
    const pre = await e.search(p1fen, { depth: CFG.preDepth, multipv: 2, newGame: true })
    const [pb, ps] = pre.lines
    if (!pb) return this.reject('no-moves')
    const preMate = pb.score.mate !== undefined && pb.score.mate > 0
    if (!preMate && scoreValue(pb.score) < 170) return this.reject('pre-not-winning')
    if (ps) {
      if (preMate && pb.score.mate > 1 && ps.score.mate !== undefined && ps.score.mate > 0) return this.reject('pre-mate-not-unique')
      if (!preMate && ((ps.score.mate ?? 0) > 0 || winChances(pb.score) - winChances(ps.score) < 0.15))
        return this.reject('pre-not-unique')
    }
    if (recentFirst.some((r) => r.move === pb.move && game.ply - r.ply <= 10)) return this.reject('same-as-recent')
    if (md1 > (preMate ? CFG.maxMaterialUpMate : CFG.maxMaterialUpAdv)) return this.reject('already-up-material')

    // the position before the blunder must not already be decided for the solver
    const before = await e.search(p0fen, { depth: CFG.beforeDepth, newGame: true })
    if (!before.lines[0]) return this.reject('no-before')
    const e0 = negate(before.lines[0].score)
    if (e0.mate !== undefined && e0.mate > 0) return this.reject('already-mating')
    if (scoreValue(e0) > (preMate ? CFG.maxBeforeMate : CFG.maxBeforeAdv)) return this.reject('already-winning')

    // cook the line
    const moves = [m0]
    const steps = []
    const chess = new Chess(p1fen)
    let startMode = null
    let mode = null
    let failReason = null
    while (true) {
      const fen = chess.fen()
      const legal = chess.moves().length
      const r = await e.search(fen, { depth: CFG.verifyDepth, multipv: 2, newGame: true })
      const [best, second] = r.lines
      if (!best) {
        failReason = 'no-best'
        break
      }
      const bMate = best.score.mate !== undefined && best.score.mate > 0
      let ok
      if (bMate) ok = best.score.mate === 1 || !second || !(second.score.mate !== undefined && second.score.mate > 0)
      else if (mode === 'mate') ok = false
      else ok = scoreValue(best.score) >= (steps.length ? CFG.minAdv : CFG.minFirstAdv) && uniqueAdv(best.score, second?.score)
      if (!ok) {
        failReason = bMate || mode === 'mate' ? 'mate-not-unique' : steps.length ? 'end' : 'first-not-unique'
        break
      }
      if (!startMode) startMode = bMate ? 'mate' : 'adv'
      mode = bMate ? 'mate' : 'adv'
      const sMove = best.move
      steps.push({
        move: sMove,
        best: best.score,
        second: second?.score ?? null,
        alt: second?.move ?? null,
        findDepth: consistentDepth(r.byDepth, sMove),
        legal,
        pv: best.pv.slice(0, 8),
      })
      moves.push(sMove)
      let mv
      try {
        mv = applyUci(chess, sMove)
      } catch {
        failReason = 'illegal'
        break
      }
      if (chess.isCheckmate()) break
      if (chess.isGameOver()) {
        failReason = 'drawn'
        break
      }
      if (steps.length >= (mode === 'mate' ? CFG.maxSolverMovesMate : CFG.maxSolverMovesAdv)) {
        failReason = 'too-long'
        break
      }
      if (mode === 'adv') {
        // stop once the material gain is banked and the capturing piece is safe
        const gain = materialDiff(chess, solver) - materialDiff(board0, solver)
        if (gain >= 2 && !inBadSpot(chess, mv.to) && !chess.isCheck()) {
          failReason = 'resolved'
          break
        }
      }
      const rep = await e.search(chess.fen(), { depth: CFG.replyDepth })
      if (!rep.bestmove) {
        failReason = 'no-reply'
        break
      }
      applyUci(chess, rep.bestmove)
      moves.push(rep.bestmove)
    }
    if (moves.length % 2 === 1) moves.pop() // drop a trailing opponent reply
    if (!steps.length || moves.length < 2) return this.reject(failReason ?? 'empty')
    steps.length = moves.length / 2
    // replay to be sure where it ends
    const end = new Chess(p0fen)
    for (const m of moves) applyUci(end, m)
    const mated = end.isCheckmate()
    if (startMode === 'mate' && !mated) return this.reject(`mate-line-${failReason}`)
    const last = steps[steps.length - 1]
    if (!mated && scoreValue(last.best) < CFG.minAdv) return this.reject('weak-end')

    return {
      fen: p0fen,
      moves,
      kind: mated ? 'mate' : 'adv',
      e0,
      md1,
      steps,
      endReason: mated ? 'mate' : failReason,
      game,
    }
  }
}

// ---------------------------------------------------------------------------
// process entry points

async function runChild() {
  try {
    os.setPriority(10)
  } catch {
    /* ignore */
  }
  const engine = new Engine({ hash: 32 })
  let stop = false
  process.on('message', (msg) => {
    if (msg?.type === 'stop') stop = true
  })
  process.on('disconnect', () => {
    stop = true
  })
  const miner = new Miner({
    engine,
    onPuzzle: (p) => process.send?.({ type: 'puzzle', puzzle: p }),
    shouldStop: () => stop,
  })
  while (!stop) {
    const seed = randomInt(2 ** 31)
    await miner.playGame(seed)
    process.send?.({ type: 'stats', stats: miner.stats })
  }
  process.send?.({ type: 'stats', stats: miner.stats, final: true })
  engine.quit()
  process.exit(0)
}

async function runStandalone() {
  const args = Object.fromEntries(
    process.argv.slice(2).map((a) => {
      const [k, v] = a.replace(/^--/, '').split('=')
      return [k, v ?? 'true']
    }),
  )
  const engine = new Engine({ hash: 32 })
  const out = []
  const miner = new Miner({ engine, verbose: args.verbose === 'true', onPuzzle: (p) => out.push(p) })
  const games = Number(args.games ?? 2)
  const t0 = Date.now()
  for (let i = 0; i < games; i++) await miner.playGame(args.seed ? Number(args.seed) + i : randomInt(2 ** 31))
  console.log(JSON.stringify(miner.stats))
  console.log(`${out.length} puzzles in ${((Date.now() - t0) / 1000).toFixed(0)}s`)
  if (args.out) {
    const { appendFileSync } = await import('node:fs')
    for (const p of out) appendFileSync(args.out, JSON.stringify(p) + '\n')
  }
  engine.quit()
  process.exit(0)
}

if (process.send) runChild()
else if (import.meta.url === `file://${process.argv[1]}`) runStandalone()
