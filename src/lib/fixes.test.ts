import { describe, expect, it } from 'vitest'
import { engineSummary } from './coach'
import type { AnalysisResult, Engine } from './engine'
import { analyseGame } from './review'

describe('coach engine summary', () => {
  it('only reports "game over" when the position really is over', () => {
    const live = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1'
    expect(engineSummary(live, [])).toMatch(/unavailable/)
    const mated = 'rnb1kbnr/pppp1ppp/8/4p3/6Pq/5P2/PPPPP2P/RNBQKBNR w KQkq - 1 3'
    expect(engineSummary(mated, [])).toMatch(/game is over/i)
  })
})

describe('game review analysis', () => {
  it('stops analysing as soon as the review is closed', async () => {
    let searches = 0
    const engine = {
      analyse: async (fen: string): Promise<AnalysisResult> => {
        searches++
        return { fen, bestMove: 'e2e4', lines: [{ multipv: 1, depth: 12, score: { cp: 20 }, pv: ['e2e4'] }] }
      },
    } as unknown as Engine
    let cancelled = false
    const sans = ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'a6', 'Ba4', 'Nf6']
    const result = await analyseGame(engine, 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', sans, 12, (done) => {
      if (done === 3) cancelled = true
    }, () => cancelled)
    expect(searches).toBe(3)
    expect(result).toHaveLength(3)
  })
})
