import { describe, expect, it } from 'vitest'
import { classify, formatLine, formatScore, pvToSan, scoreToCp, START_FEN, whiteScore, winPercent } from './chess'
import { updatePuzzleRating, rankFor } from './rating'
import { reviewGame, sideAccuracy, type PositionEval } from './review'

describe('evaluation maths', () => {
  it('maps mates beyond any centipawn score', () => {
    expect(scoreToCp({ mate: 1 })).toBeGreaterThan(scoreToCp({ mate: 5 }))
    expect(scoreToCp({ mate: 5 })).toBeGreaterThan(5000)
    expect(scoreToCp({ mate: -2 })).toBeLessThan(-5000)
  })
  it('win percent is 50 at equality and symmetric', () => {
    expect(winPercent({ cp: 0 })).toBeCloseTo(50)
    expect(winPercent({ cp: 300 }) + winPercent({ cp: -300 })).toBeCloseTo(100)
    expect(winPercent({ mate: 3 })).toBeGreaterThan(95)
  })
  it('flips scores to White’s point of view', () => {
    expect(whiteScore({ cp: 120 }, 'b')).toEqual({ cp: -120 })
    expect(whiteScore({ mate: 2 }, 'b')).toEqual({ mate: -2 })
    expect(formatScore({ cp: 135 })).toBe('+1.4')
    expect(formatScore({ mate: -3 })).toBe('-M3')
  })
  it('classifies by lost winning chances', () => {
    expect(classify(0, true)).toBe('best')
    expect(classify(2, false)).toBe('excellent')
    expect(classify(12, false)).toBe('inaccuracy')
    expect(classify(25, false)).toBe('mistake')
    expect(classify(45, false)).toBe('blunder')
  })
})

describe('notation helpers', () => {
  it('converts engine lines to SAN and numbers them', () => {
    const sans = pvToSan(START_FEN, ['e2e4', 'e7e5', 'g1f3'])
    expect(sans).toEqual(['e4', 'e5', 'Nf3'])
    expect(formatLine(START_FEN, sans)).toBe('1. e4 e5 2. Nf3')
    const blackToMove = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1'
    expect(formatLine(blackToMove, ['e5', 'Nf3'])).toBe('1... e5 2. Nf3')
  })
  it('stops converting at an illegal move', () => {
    expect(pvToSan(START_FEN, ['e2e4', 'e2e4'])).toEqual(['e4'])
  })
})

describe('ratings', () => {
  it('moves puzzle rating in the right direction', () => {
    expect(updatePuzzleRating(800, 800, true, 0)).toBeGreaterThan(800)
    expect(updatePuzzleRating(800, 800, false, 0)).toBeLessThan(800)
    // Beating a much harder puzzle gains more than beating an easy one.
    expect(updatePuzzleRating(800, 1400, true, 100) - 800).toBeGreaterThan(updatePuzzleRating(800, 400, true, 100) - 800)
  })
  it('maps ratings to ranks', () => {
    expect(rankFor(0).current.title).toBe('Newcomer')
    expect(rankFor(1450).current.title).toBe('Intermediate')
    expect(rankFor(2600).current.title).toBe('Grandmaster')
    expect(rankFor(2600).next).toBeUndefined()
  })
})

describe('game review', () => {
  it('flags a move that throws away a winning position as a blunder', () => {
    // 1. e4 e5 2. Qh5 Nc6 3. Bc4 Nf6?? 4. Qxf7#
    const sans = ['e4', 'e5', 'Qh5', 'Nc6', 'Bc4', 'Nf6', 'Qxf7#']
    const evals: PositionEval[] = [
      { cp: 30 }, { cp: 30 }, { cp: 20 }, { cp: -40 }, { cp: -30 }, { cp: 20 }, { mate: 1 }, { mate: 1 },
    ].map((score, i) => ({ fen: '', score, bestMove: i === 5 ? 'g7g6' : i === 6 ? 'h5f7' : '', pv: [] }))
    const reviewed = reviewGame('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 1', sans, evals)
    expect(reviewed[5].san).toBe('Nf6')
    expect(reviewed[5].classification).toBe('blunder')
    expect(reviewed[5].bestSan).toBe('g6')
    expect(reviewed[6].classification).toBe('best')
    expect(sideAccuracy(reviewed, 'w')).toBeGreaterThan(sideAccuracy(reviewed, 'b'))
  })
})
