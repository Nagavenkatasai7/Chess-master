// Legality checks for every piece of chess content. Each function returns a
// list of human-readable problems; an empty list means the content is valid.
import { Chess, validateFen, type Square } from 'chess.js'
import type { Exercise, Module, Opening, Puzzle, TipSection, Trap } from './types.ts'

const SQUARE = /^[a-h][1-8]$/

function playLine(fen: string | undefined, moves: string[], where: string): string[] {
  let chess: Chess
  try {
    chess = new Chess(fen)
  } catch (e) {
    return [`${where}: invalid FEN "${fen}" (${(e as Error).message})`]
  }
  for (let i = 0; i < moves.length; i++) {
    try {
      chess.move(moves[i])
    } catch {
      return [`${where}: illegal move #${i + 1} "${moves[i]}" in position ${chess.fen()}`]
    }
  }
  return []
}

function checkNotes(notes: Record<number, string> | undefined, length: number, where: string): string[] {
  if (!notes) return []
  return Object.keys(notes)
    .map(Number)
    .filter((ply) => !Number.isInteger(ply) || ply < 1 || ply > length)
    .map((ply) => `${where}: note index ${ply} is outside 1..${length}`)
}

export function validateExercise(ex: Exercise, where: string): string[] {
  const at = `${where} exercise "${ex.id}"`
  const goal = ex.goal ?? 'line'
  if (goal === 'stars' || goal === 'capture-all') {
    const errors: string[] = []
    let chess: Chess
    try {
      chess = new Chess(ex.fen, { skipValidation: true })
    } catch (e) {
      return [`${at}: invalid FEN (${(e as Error).message})`]
    }
    if (!ex.maxMoves || ex.maxMoves < 1) errors.push(`${at}: needs maxMoves`)
    if (goal === 'stars') {
      if (!ex.stars?.length) errors.push(`${at}: needs stars`)
      for (const s of ex.stars ?? []) {
        if (!SQUARE.test(s)) errors.push(`${at}: bad star square "${s}"`)
        else if (chess.get(s as Square)) errors.push(`${at}: star ${s} is on an occupied square`)
      }
    } else {
      const enemy = chess.turn() === 'w' ? 'b' : 'w'
      const targets = chess.board().flat().filter((p) => p && p.color === enemy && p.type !== 'k')
      if (targets.length === 0) errors.push(`${at}: capture-all needs enemy pieces`)
    }
    if (errors.length === 0 && !solvableSoloPuzzle(ex)) {
      errors.push(`${at}: cannot be completed within ${ex.maxMoves} moves`)
    }
    return errors
  }

  const errors: string[] = []
  const fenCheck = validateFen(ex.fen)
  if (!fenCheck.ok) return [`${at}: invalid FEN "${ex.fen}" (${fenCheck.error})`]
  if (!ex.solution?.length) return [`${at}: needs a solution`]
  if (ex.solution.length % 2 === 0) errors.push(`${at}: solution must end with the learner's move (odd length)`)
  errors.push(...playLine(ex.fen, ex.solution, at))
  if (errors.length === 0 && goal === 'mate') {
    const chess = new Chess(ex.fen)
    ex.solution.forEach((m) => chess.move(m))
    if (!chess.isCheckmate()) errors.push(`${at}: goal is mate but the solution does not end in checkmate`)
  }
  return errors
}

/** Breadth-first search over the learner's own moves (the opponent never moves). */
export function solvableSoloPuzzle(ex: Exercise): boolean {
  const goal = ex.goal
  const max = ex.maxMoves ?? 0
  const start = new Chess(ex.fen, { skipValidation: true })
  const me = start.turn()
  const targetStars = new Set(ex.stars ?? [])
  const key = (fen: string, done: string) => fen.split(' ')[0] + '|' + done
  const doneKey = (visited: Set<string>) => [...visited].sort().join(',')
  type Node = { fen: string; visited: Set<string>; depth: number }
  const isDone = (fen: string, visited: Set<string>) => {
    if (goal === 'stars') return [...targetStars].every((s) => visited.has(s))
    const board = new Chess(fen, { skipValidation: true }).board().flat()
    return !board.some((p) => p && p.color !== me && p.type !== 'k')
  }
  let frontier: Node[] = [{ fen: start.fen(), visited: new Set(), depth: 0 }]
  const seen = new Set([key(start.fen(), '')])
  while (frontier.length) {
    const next: Node[] = []
    for (const node of frontier) {
      if (isDone(node.fen, node.visited)) return true
      if (node.depth >= max) continue
      const chess = new Chess(node.fen, { skipValidation: true })
      for (const move of chess.moves({ verbose: true })) {
        const after = new Chess(node.fen, { skipValidation: true })
        after.move(move.san)
        const parts = after.fen().split(' ')
        parts[1] = me
        parts[3] = '-'
        const fen = parts.join(' ')
        const visited = new Set(node.visited)
        if (targetStars.has(move.to)) visited.add(move.to)
        const k = key(fen, doneKey(visited))
        if (seen.has(k)) continue
        seen.add(k)
        next.push({ fen, visited, depth: node.depth + 1 })
      }
    }
    frontier = next
    if (seen.size > 200_000) return true // search too large to finish; assume solvable
  }
  return false
}

export function validateModules(modules: Module[]): string[] {
  const errors: string[] = []
  const ids = new Set<string>()
  const unique = (id: string, what: string) => {
    if (ids.has(id)) errors.push(`duplicate ${what} id "${id}"`)
    ids.add(id)
  }
  for (const mod of modules) {
    unique(mod.id, 'module')
    if (!mod.lessons.length) errors.push(`module "${mod.id}" has no lessons`)
    for (const lesson of mod.lessons) {
      unique(lesson.id, 'lesson')
      const where = `lesson "${lesson.id}"`
      if (!lesson.blocks.length) errors.push(`${where}: has no blocks`)
      lesson.blocks.forEach((block, i) => {
        const at = `${where} block ${i}`
        if (block.type === 'board') {
          const res = validateFen(block.fen)
          if (!res.ok) {
            // Diagrams may omit kings to show a single piece.
            try {
              new Chess(block.fen, { skipValidation: true })
            } catch {
              errors.push(`${at}: invalid FEN "${block.fen}"`)
            }
          }
          for (const [from, to] of block.arrows ?? []) {
            if (!SQUARE.test(from) || !SQUARE.test(to)) errors.push(`${at}: bad arrow ${from}-${to}`)
          }
          for (const sq of block.highlights ?? []) {
            if (!SQUARE.test(sq)) errors.push(`${at}: bad highlight ${sq}`)
          }
        } else if (block.type === 'line') {
          errors.push(...playLine(block.fen, block.moves, at))
          errors.push(...checkNotes(block.notes, block.moves.length, at))
        } else if (block.type === 'exercise') {
          unique(block.exercise.id, 'exercise')
          errors.push(...validateExercise(block.exercise, at))
        }
      })
    }
  }
  return errors
}

export function validateOpenings(openings: Opening[]): string[] {
  const errors: string[] = []
  const ids = new Set<string>()
  for (const op of openings) {
    if (ids.has(op.id)) errors.push(`duplicate opening id "${op.id}"`)
    ids.add(op.id)
    if (!op.lines.length) errors.push(`opening "${op.id}" has no lines`)
    for (const line of op.lines) {
      const at = `opening "${op.id}" line "${line.name}"`
      errors.push(...playLine(undefined, line.moves, at))
      errors.push(...checkNotes(line.notes, line.moves.length, at))
      // A drill must end on the learner's move.
      const endsOnWhite = line.moves.length % 2 === 1
      if ((op.side === 'white') !== endsOnWhite) errors.push(`${at}: line should end with a ${op.side} move`)
    }
  }
  return errors
}

export function validateHandbook(sections: TipSection[], traps: Trap[]): string[] {
  const errors: string[] = []
  const ids = new Set<string>()
  for (const s of sections) {
    if (ids.has(s.id)) errors.push(`duplicate tip section "${s.id}"`)
    ids.add(s.id)
    s.tips.forEach((tip, i) => {
      const at = `tip section "${s.id}" tip ${i}`
      if (tip.moves) errors.push(...playLine(tip.fen, tip.moves, at))
      else if (tip.fen) {
        try {
          new Chess(tip.fen, { skipValidation: true })
        } catch {
          errors.push(`${at}: invalid FEN`)
        }
      }
    })
  }
  for (const trap of traps) {
    if (ids.has(trap.id)) errors.push(`duplicate trap id "${trap.id}"`)
    ids.add(trap.id)
    errors.push(...playLine(undefined, trap.moves, `trap "${trap.id}"`))
    errors.push(...checkNotes(trap.notes, trap.moves.length, `trap "${trap.id}"`))
  }
  return errors
}

export function validatePuzzles(puzzles: Puzzle[]): string[] {
  const errors: string[] = []
  const ids = new Set<string>()
  for (const p of puzzles) {
    if (ids.has(p.id)) errors.push(`duplicate puzzle id "${p.id}"`)
    ids.add(p.id)
    const at = `puzzle "${p.id}"`
    if (p.moves.length < 2 || p.moves.length % 2 !== 0) {
      errors.push(`${at}: moves must be [opponent move, solver move, ...] ending with a solver move`)
      continue
    }
    try {
      const chess = new Chess(p.fen)
      for (const uci of p.moves) {
        chess.move({ from: uci.slice(0, 2), to: uci.slice(2, 4), promotion: uci[4] })
      }
      if (p.themes.some((t) => t.startsWith('mateIn')) && !chess.isCheckmate()) {
        errors.push(`${at}: tagged mate but does not end in checkmate`)
      }
    } catch (e) {
      errors.push(`${at}: ${(e as Error).message}`)
    }
  }
  return errors
}
