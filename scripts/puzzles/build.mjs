// Build src/data/puzzles.json from the raw candidate cache:
// validate -> tag themes -> rate -> dedupe -> balance the rating distribution -> write.
// Puzzles already in puzzles.json keep their ids; puzzles in puzzles.json that are not
// in the cache (e.g. the cache was deleted) are kept as they are.
//
//   node scripts/puzzles/build.mjs [--max=2500] [--stats]
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { Chess } from 'chess.js'
import { tagPuzzle, VOCAB } from './themes.mjs'
import { ratePuzzle } from './rating.mjs'

const here = (p) => fileURLToPath(new URL(p, import.meta.url))
export const CANDIDATES = here('./cache/candidates.jsonl')
export const REJECTS = here('./cache/rejected.jsonl')
export const OUT = here('../../src/data/puzzles.json')

// Target share of each rating band (the learner is a beginner).
const BANDS = [
  { lo: 0, hi: 1000, share: 0.35 },
  { lo: 1000, hi: 1600, share: 0.35 },
  { lo: 1600, hi: 2000, share: 0.2 },
  { lo: 2000, hi: 9999, share: 0.1 },
]
// Themes that are rarer / more instructive get priority when a band must be thinned.
const PRIORITY = {
  pin: 3, skewer: 3, discoveredAttack: 3, doubleCheck: 3, trappedPiece: 3, smotheredMate: 4,
  backRankMate: 2, promotion: 2, fork: 2, sacrifice: 2, endgame: 2, defensiveMove: 1,
  quietMove: 1, mateIn2: 1, mateIn3: 1, mateIn4: 1, queensideAttack: 1, kingsideAttack: 1,
}

function hash01(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return ((h >>> 0) % 1000003) / 1000003
}

export function readJsonl(path) {
  if (!existsSync(path)) return []
  return readFileSync(path, 'utf8')
    .split('\n')
    .filter(Boolean)
    .map((l) => JSON.parse(l))
}

const keyOf = (p) => `${p.fen}|${p.moves.join(' ')}`
const boardKey = (fen) => fen.split(' ').slice(0, 4).join(' ')

/** Replays a puzzle; returns the start-position key and a near-duplicate signature, or an error. */
function inspect(fen, moves) {
  if (moves.length < 2 || moves.length % 2) return { error: 'odd length' }
  const c = new Chess(fen)
  let p1 = null
  const touched = new Set()
  for (let i = 0; i < moves.length; i++) {
    const u = moves[i]
    try {
      c.move({ from: u.slice(0, 2), to: u.slice(2, 4), promotion: u[4] })
    } catch {
      return { error: `illegal move ${u}` }
    }
    if (i === 0) p1 = new Chess(c.fen())
    else {
      touched.add(u.slice(0, 2))
      touched.add(u.slice(2, 4))
    }
  }
  // near-duplicate signature: the solution line plus what stands on the squares it uses and the kings
  const kings = []
  const content = [...touched]
    .sort()
    .map((s) => `${s}${p1.get(s) ? p1.get(s).color + p1.get(s).type : '-'}`)
  for (const row of p1.board()) for (const pc of row) if (pc?.type === 'k') kings.push(pc.color + pc.square)
  return { p1key: boardKey(p1.fen()), sig: `${moves.slice(1).join(' ')}|${content.join(',')}|${kings.sort().join(',')}`, mated: c.isCheckmate() }
}

function cpOf(score) {
  if (score.mate !== undefined) return score.mate > 0 ? 100000 : -100000
  return score.cp
}

/**
 * Drop a trailing solver move that is merely forced (the only legal move, or a king
 * stepping out of check with at most one alternative): the tactic is already over.
 * Mate lines are never trimmed.
 */
export function trimForcedEnd(rec) {
  if (rec.kind === 'mate') return rec
  let { moves, steps } = rec
  while (steps.length >= 2) {
    const last = steps[steps.length - 1]
    const c = new Chess(rec.fen)
    for (const u of moves.slice(0, -1)) c.move({ from: u.slice(0, 2), to: u.slice(2, 4), promotion: u[4] })
    const lastMove = moves[moves.length - 1]
    const kingMove = c.get(lastMove.slice(0, 2))?.type === 'k'
    const forced = !last.second || last.legal <= 1 || (c.isCheck() && last.legal <= 2) || (c.isCheck() && kingMove && last.legal <= 3)
    if (!forced) break
    moves = moves.slice(0, -2)
    steps = steps.slice(0, -1)
  }
  return moves === rec.moves ? rec : { ...rec, moves, steps, trimmed: true }
}

export function processCandidates(raw) {
  const items = []
  const dropped = {}
  const drop = (why) => (dropped[why] = (dropped[why] ?? 0) + 1)
  for (const original of raw) {
    const rec = trimForcedEnd(original)
    if (rec !== original) drop('trimmed-forced-end(kept)')
    const info = inspect(rec.fen, rec.moves)
    if (info.error) {
      drop(info.error.split(' ')[0])
      continue
    }
    if (rec.kind === 'mate' && !info.mated) {
      drop('mate-not-mated')
      continue
    }
    const { tags, mainline } = tagPuzzle(rec.fen, rec.moves, cpOf(rec.steps[0].best))
    const rating = ratePuzzle(rec, tags, mainline)
    items.push({ rec, tags, rating, key: keyOf(rec), p1key: info.p1key, sig: info.sig })
  }
  return { items, dropped }
}

function priorityOf(item) {
  let pr = 0
  for (const t of item.tags) pr += PRIORITY[t] ?? 0
  // a lone recapture of the piece that just moved is the least interesting kind of puzzle
  if (item.tags.includes('oneMove') && item.rec.moves[1].slice(2, 4) === item.rec.moves[0].slice(2, 4)) pr -= 2
  return pr + hash01(item.key) * 1.5
}

/** Thin over-full rating bands toward BANDS' shares; keeps everything when no band is over-full. */
function balance(items, max) {
  const bandOf = (r) => BANDS.findIndex((b) => r >= b.lo && r < b.hi)
  const groups = BANDS.map(() => [])
  for (const it of items) groups[bandOf(it.rating)].push(it)
  const n = Math.min(max, items.length)
  // allocate: bands that are short keep everything, the rest share the remainder by target share
  const alloc = BANDS.map(() => 0)
  let open = BANDS.map((_, i) => i)
  let remaining = n
  while (open.length) {
    const shareSum = open.reduce((s, i) => s + BANDS[i].share, 0)
    const short = open.filter((i) => groups[i].length <= (remaining * BANDS[i].share) / shareSum)
    if (!short.length) {
      for (const i of open) alloc[i] = Math.floor((remaining * BANDS[i].share) / shareSum)
      break
    }
    for (const i of short) {
      alloc[i] = groups[i].length
      remaining -= groups[i].length
    }
    open = open.filter((i) => !short.includes(i))
  }
  const out = []
  groups.forEach((g, i) => {
    const locked = g.filter((it) => it.locked)
    const rest = g.filter((it) => !it.locked).sort((a, b) => priorityOf(b) - priorityOf(a))
    out.push(...locked, ...rest.slice(0, Math.max(0, alloc[i] - locked.length)))
  })
  return out
}

export function build({ max = 2500, quiet = false } = {}) {
  const log = quiet ? () => {} : console.log
  const raw = readJsonl(CANDIDATES)
  const rejected = new Set(readJsonl(REJECTS).map(keyOf))
  const existing = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')) : []
  const idByKey = new Map(existing.map((p) => [keyOf(p), p.id]))

  const { items, dropped } = processCandidates(raw.filter((r) => !rejected.has(keyOf(r))))
  if (rejected.size) dropped.reverified = raw.length - raw.filter((r) => !rejected.has(keyOf(r))).length

  // keep existing puzzles whose analysis is not in the cache
  const cachedKeys = new Set(items.map((it) => it.key))
  const lockedItems = existing
    .filter((p) => !cachedKeys.has(keyOf(p)) && !rejected.has(keyOf(p)))
    .map((p) => {
      const info = inspect(p.fen, p.moves)
      return { puzzle: p, tags: p.themes, rating: p.rating, key: keyOf(p), p1key: info.p1key, sig: info.sig, locked: true }
    })

  // dedupe: identical start positions or near-identical lines; already-published puzzles win
  const seenPos = new Set()
  const seenSig = new Set()
  const unique = []
  const ordered = [...lockedItems, ...items.filter((it) => idByKey.has(it.key)), ...items.filter((it) => !idByKey.has(it.key))]
  for (const it of ordered) {
    if (seenPos.has(it.p1key) || seenSig.has(it.sig)) {
      dropped.duplicate = (dropped.duplicate ?? 0) + 1
      continue
    }
    seenPos.add(it.p1key)
    seenSig.add(it.sig)
    unique.push(it)
  }

  const selected = balance(unique, max)
  if (selected.length < unique.length) dropped.balanced = unique.length - selected.length

  // ids: keep published ids, number new puzzles after the highest one (in discovery order)
  let next = existing.reduce((m, p) => Math.max(m, Number(/\d+/.exec(p.id)?.[0] ?? 0)), 0) + 1
  const discovery = new Map(raw.map((r, i) => [keyOf(r), i]))
  selected.sort((a, b) => (discovery.get(a.key) ?? -1) - (discovery.get(b.key) ?? -1))
  const puzzles = selected.map((it) => {
    if (it.locked) return it.puzzle
    const id = idByKey.get(it.key) ?? `p${String(next++).padStart(4, '0')}`
    const themes = it.tags.filter((t) => VOCAB.includes(t))
    return { id, fen: it.rec.fen, moves: it.rec.moves, rating: it.rating, themes }
  })
  puzzles.sort((a, b) => Number(/\d+/.exec(a.id)[0]) - Number(/\d+/.exec(b.id)[0]))

  const json = '[\n' + puzzles.map((p) => JSON.stringify(p)).join(',\n') + '\n]\n'
  writeFileSync(OUT, json)
  log(`build: ${raw.length} cached candidates -> ${puzzles.length} puzzles (${(json.length / 1024).toFixed(0)} KB)`)
  log('  dropped:', JSON.stringify(dropped))
  summarize(puzzles, log)
  return puzzles
}

export function summarize(puzzles, log = console.log) {
  const bands = [0, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600]
  const hist = bands.slice(0, -1).map((lo, i) => ({ lo, hi: bands[i + 1], n: 0 }))
  for (const p of puzzles) {
    const b = hist.find((h) => p.rating >= h.lo && (p.rating < h.hi || h.hi === 2600))
    if (b) b.n++
  }
  log('  rating histogram:')
  for (const h of hist) log(`    ${String(h.lo).padStart(4)}-${String(h.hi).padEnd(4)} ${String(h.n).padStart(5)}  ${'#'.repeat(Math.round((h.n / Math.max(1, puzzles.length)) * 200))}`)
  const share = (lo, hi) => ((100 * puzzles.filter((p) => p.rating >= lo && p.rating < hi).length) / Math.max(1, puzzles.length)).toFixed(0)
  log(`  bands: <1000 ${share(0, 1000)}% | 1000-1600 ${share(1000, 1600)}% | 1600-2000 ${share(1600, 2000)}% | 2000+ ${share(2000, 9999)}%`)
  const counts = {}
  for (const p of puzzles) for (const t of p.themes) counts[t] = (counts[t] ?? 0) + 1
  log('  themes:', VOCAB.filter((t) => counts[t]).map((t) => `${t} ${counts[t]}`).join(', '))
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const args = Object.fromEntries(process.argv.slice(2).map((a) => a.replace(/^--/, '').split('=')))
  build({ max: args.max ? Number(args.max) : undefined })
}
