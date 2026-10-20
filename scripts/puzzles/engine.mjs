// Promise-based wrapper around the Stockfish 19 WASM build (lite-single) for Node.
// One instance = one engine = one CPU core. Searches are serialised.
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)

/** Collapse a UCI score (side-to-move POV) into one comparable number. Mates are huge. */
export function scoreValue(s) {
  if (s.mate !== undefined) {
    if (s.mate === 0) return -100000 // side to move is mated
    return s.mate > 0 ? 100000 - s.mate * 100 : -100000 - s.mate * 100
  }
  return s.cp
}

/** Lichess win-chance model in [-1, 1] (side-to-move POV). */
export function winChances(s) {
  if (s.mate !== undefined) return s.mate > 0 ? 1 : -1
  const cp = Math.max(-1000, Math.min(1000, s.cp))
  return 2 / (1 + Math.exp(-0.00368208 * cp)) - 1
}

export function negate(s) {
  return s.mate !== undefined ? { mate: -s.mate } : { cp: -s.cp }
}

export function fmtScore(s) {
  return s.mate !== undefined ? `#${s.mate}` : (s.cp / 100).toFixed(2)
}

export class Engine {
  constructor({ hash = 32 } = {}) {
    this.handler = null
    this.sf = require('stockfish')('lite-single', (line) => this.handler?.(line))
    this.sf.processCommand('uci')
    this.sf.processCommand(`setoption name Hash value ${hash}`)
    this.multipv = 1
    this.skill = 20
    this.queue = Promise.resolve()
  }

  _setOption(name, value) {
    this.sf.processCommand(`setoption name ${name} value ${value}`)
  }

  /**
   * Run one search. Returns
   *  - lines: final MultiPV lines [{move, score, pv, depth}] best first
   *  - byDepth: multipv-1 best move at each completed depth [{depth, move, score}]
   *  - bestmove: the move the engine actually plays (differs from lines[0] when Skill Level < 20)
   */
  search(fen, { depth, nodes, multipv = 1, searchmoves, newGame = false, skill = 20, moves } = {}) {
    const run = () =>
      new Promise((resolve) => {
        const lines = new Map()
        const byDepth = new Map()
        let totalNodes = 0
        this.handler = (line) => {
          if (line.startsWith('info') && line.includes(' pv ')) {
            if (/ (lowerbound|upperbound)/.test(line)) return
            const d = Number(/ depth (\d+)/.exec(line)?.[1] ?? 0)
            const mpv = Number(/ multipv (\d+)/.exec(line)?.[1] ?? 1)
            const mate = / score mate (-?\d+)/.exec(line)
            const cp = / score cp (-?\d+)/.exec(line)
            const n = / nodes (\d+)/.exec(line)
            if (n) totalNodes = Number(n[1])
            const pv = line.split(' pv ')[1].trim().split(/\s+/)
            const score = mate ? { mate: Number(mate[1]) } : { cp: Number(cp?.[1] ?? 0) }
            lines.set(mpv, { move: pv[0], score, pv, depth: d })
            if (mpv === 1) byDepth.set(d, { depth: d, move: pv[0], score })
          } else if (line.startsWith('bestmove')) {
            this.handler = null
            const bestmove = line.split(/\s+/)[1]
            resolve({
              lines: [...lines.entries()].sort((a, b) => a[0] - b[0]).map(([, l]) => l),
              byDepth: [...byDepth.values()].sort((a, b) => a.depth - b.depth),
              bestmove: bestmove === '(none)' ? null : bestmove,
              nodes: totalNodes,
            })
          }
        }
        if (newGame) this.sf.processCommand('ucinewgame')
        if (multipv !== this.multipv) {
          this._setOption('MultiPV', multipv)
          this.multipv = multipv
        }
        if (skill !== this.skill) {
          this._setOption('Skill Level', skill)
          this.skill = skill
        }
        this.sf.processCommand(`position fen ${fen}${moves?.length ? ' moves ' + moves.join(' ') : ''}`)
        let go = 'go'
        if (depth) go += ` depth ${depth}`
        if (nodes) go += ` nodes ${nodes}`
        if (searchmoves?.length) go += ` searchmoves ${searchmoves.join(' ')}`
        this.sf.processCommand(go)
      })
    const p = this.queue.then(run)
    this.queue = p.catch(() => {})
    return p
  }

  quit() {
    try {
      this.sf.terminate?.()
    } catch {
      /* ignore */
    }
  }
}
