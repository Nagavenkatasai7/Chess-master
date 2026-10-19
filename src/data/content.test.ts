import { describe, expect, it } from 'vitest'
import { curriculum } from './curriculum/index.ts'
import { tipSections } from './handbook/tips.ts'
import { traps } from './handbook/traps.ts'
import { openings } from './openings/index.ts'
import puzzles from './puzzles.json'
import type { Puzzle } from './types.ts'
import { validateHandbook, validateModules, validateOpenings, validatePuzzles } from './validate.ts'

describe('content legality', () => {
  it('curriculum: every FEN, line and exercise is legal', () => {
    expect(validateModules(curriculum)).toEqual([])
  })
  it('openings: every line is legal and ends on the learner move', () => {
    expect(validateOpenings(openings)).toEqual([])
  })
  it('handbook: tips and traps are legal', () => {
    expect(validateHandbook(tipSections, traps)).toEqual([])
  })
  it('puzzles: every solution is legal', () => {
    expect(validatePuzzles(puzzles as Puzzle[])).toEqual([])
  })
})
