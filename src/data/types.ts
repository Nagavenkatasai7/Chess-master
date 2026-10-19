// Shared content schema for lessons, openings, the handbook and puzzles.
// Every FEN and move in content files is checked by src/data/content.test.ts
// (legality) and scripts/verify-content.ts (engine soundness).

/** 1 Foundations · 2 Novice · 3 Intermediate · 4 Advanced · 5 Expert · 6 Master & GM path */
export type Level = 1 | 2 | 3 | 4 | 5 | 6

export const LEVELS: { level: Level; name: string; rating: string; blurb: string }[] = [
  { level: 1, name: 'Foundations', rating: '0–600', blurb: 'The board, how every piece moves, check, checkmate and the special rules.' },
  { level: 2, name: 'Novice', rating: '600–1000', blurb: 'Opening principles, not hanging pieces, basic checkmates and your first tactics.' },
  { level: 3, name: 'Intermediate', rating: '1000–1400', blurb: 'The full tactical toolbox, mating patterns and essential endgames.' },
  { level: 4, name: 'Advanced', rating: '1400–1800', blurb: 'Positional chess: pawn structure, piece activity, weak squares and planning.' },
  { level: 5, name: 'Expert', rating: '1800–2200', blurb: 'Calculation technique, dynamic play, sacrifices and theoretical endgames.' },
  { level: 6, name: 'Master & GM path', rating: '2200+', blurb: 'Deep strategy, studying the classics, preparation, psychology and training plans.' },
]

/**
 * An interactive exercise on a board. The side to move in `fen` is the learner.
 *
 * - `line` (default): the learner must play `solution[0]`, the app replies with
 *   `solution[1]`, the learner plays `solution[2]`, and so on (SAN moves).
 * - `mate`: like `line`, but on the learner's final move ANY checkmating move is
 *   accepted. `solution` must still contain one correct mating line.
 * - `stars`: only the learner's pieces move (the opponent never replies).
 *   Visit every square in `stars` within `maxMoves` moves. Kings may be absent.
 * - `capture-all`: only the learner's pieces move; capture every opponent piece
 *   within `maxMoves` moves. The opponent pieces never move. Kings may be absent.
 */
export interface Exercise {
  id: string
  prompt: string
  fen: string
  goal?: 'line' | 'mate' | 'stars' | 'capture-all'
  solution?: string[]
  stars?: string[]
  maxMoves?: number
  hint?: string
  /** Shown after the exercise is solved. Explain WHY the move works. */
  explanation?: string
}

export type LessonBlock =
  /** Paragraphs in a small markdown subset: **bold**, *italic*, `code`, "- " lists, "1. " lists, "### " headings. */
  | { type: 'text'; md: string }
  /** A highlighted callout ("Pro tip", "Remember", "Common mistake"). */
  | { type: 'tip'; title?: string; md: string }
  /** A static diagram. arrows are [from, to] pairs; highlights are squares. */
  | { type: 'board'; fen: string; caption?: string; arrows?: [string, string][]; highlights?: string[] }
  /**
   * A move sequence the learner steps through. `fen` defaults to the start position.
   * notes[n] is shown after the n-th move (1-based ply index).
   */
  | { type: 'line'; fen?: string; moves: string[]; caption?: string; notes?: Record<number, string> }
  | { type: 'exercise'; exercise: Exercise }

export interface Lesson {
  id: string
  title: string
  summary: string
  estMinutes: number
  blocks: LessonBlock[]
}

export interface Module {
  id: string
  level: Level
  title: string
  description: string
  lessons: Lesson[]
}

export interface OpeningLine {
  name: string
  /** SAN moves from the initial position. */
  moves: string[]
  /** notes[n] is shown after the n-th move (1-based ply index). */
  notes?: Record<number, string>
}

export interface Opening {
  id: string
  name: string
  eco: string
  /** The side the learner plays when drilling this opening. */
  side: 'white' | 'black'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  summary: string
  /** Key plans and ideas, one sentence each. */
  ideas: string[]
  /** Typical mistakes or traps to know, one sentence each. */
  pitfalls: string[]
  /** Main line first. Each line is drilled separately. */
  lines: OpeningLine[]
}

export interface TipSection {
  id: string
  title: string
  level: Level
  tips: { title: string; md: string; fen?: string; moves?: string[] }[]
}

export interface Trap {
  id: string
  name: string
  opening: string
  /** The side that springs the trap. */
  side: 'white' | 'black'
  level: Level
  summary: string
  /** SAN moves from the initial position, ending when the trap has worked. */
  moves: string[]
  notes?: Record<number, string>
}

/**
 * Lichess puzzle format: `fen` is the position BEFORE the opponent's move,
 * moves[0] (UCI) is that opponent move, then the solver's moves alternate with
 * the opponent's replies. The solver is the side NOT to move in `fen`.
 */
export interface Puzzle {
  id: string
  fen: string
  moves: string[]
  rating: number
  themes: string[]
}
