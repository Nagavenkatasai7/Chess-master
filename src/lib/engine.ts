// Stockfish 19 (lite, single-threaded WASM) running in a Web Worker.
// Searches are queued; `interrupt` stops the running search so the newest
// request (e.g. the position the learner just reached) is served first.

export interface Score {
  cp?: number
  mate?: number
}

export interface EngineLine {
  multipv: number
  depth: number
  /** From the side to move's point of view. */
  score: Score
  pv: string[]
}

export interface AnalysisResult {
  fen: string
  bestMove: string
  lines: EngineLine[]
}

export interface SearchOptions {
  depth?: number
  movetime?: number
  multipv?: number
  /** Extra UCI options, e.g. { 'Skill Level': 3 }. */
  options?: Record<string, string | number | boolean>
  searchmoves?: string[]
  /** Stop the running search and drop queued ones; this request is served next. */
  interrupt?: boolean
  onUpdate?: (lines: EngineLine[]) => void
}

const ENGINE_URL = `${import.meta.env.BASE_URL}engine/stockfish-19-lite-single.js`

const DEFAULT_OPTIONS: Record<string, string | number | boolean> = {
  'Skill Level': 20,
  UCI_LimitStrength: false,
  UCI_Elo: 1320,
}

export class Engine {
  private worker: Worker
  private listeners = new Set<(line: string) => void>()
  private ready: Promise<void>
  private chain: Promise<unknown> = Promise.resolve()
  private searching = false
  private pending = 0
  /** Bumped by interrupting requests; queued jobs from an older epoch are skipped. */
  private epoch = 0
  private applied: Record<string, string> = {}

  constructor() {
    this.worker = new Worker(ENGINE_URL)
    this.worker.onmessage = (e: MessageEvent<string>) => {
      const line = typeof e.data === 'string' ? e.data : String(e.data)
      this.listeners.forEach((l) => l(line))
    }
    this.ready = this.waitFor('uci', 'uciok').then(() => {
      this.send('setoption name Hash value 32')
      return this.waitFor('isready', 'readyok')
    })
  }

  private send(cmd: string) {
    this.worker.postMessage(cmd)
  }

  private waitFor(cmd: string, token: string): Promise<void> {
    return new Promise((resolve) => {
      const listener = (line: string) => {
        if (line.startsWith(token)) {
          this.listeners.delete(listener)
          resolve()
        }
      }
      this.listeners.add(listener)
      this.send(cmd)
    })
  }

  stop() {
    if (this.searching) this.send('stop')
  }

  analyse(fen: string, opts: SearchOptions = {}): Promise<AnalysisResult> {
    if (opts.interrupt) {
      this.epoch++
      this.stop()
    }
    const epoch = this.epoch
    this.pending++
    const job = this.chain
      .then(() => (epoch === this.epoch ? this.run(fen, opts) : { fen, bestMove: '', lines: [] }))
      .finally(() => this.pending--)
    this.chain = job.catch(() => undefined)
    return job
  }

  /** True while searches are running or queued. */
  get busy() {
    return this.pending > 0
  }

  private async run(fen: string, opts: SearchOptions): Promise<AnalysisResult> {
    await this.ready
    const options = { ...DEFAULT_OPTIONS, MultiPV: opts.multipv ?? 1, ...opts.options }
    for (const [name, value] of Object.entries(options)) {
      const v = String(value)
      if (this.applied[name] !== v) {
        this.send(`setoption name ${name} value ${v}`)
        this.applied[name] = v
      }
    }
    return new Promise((resolve) => {
      const lines = new Map<number, EngineLine>()
      const listener = (line: string) => {
        if (line.startsWith('info') && line.includes(' pv ')) {
          if (/ (lowerbound|upperbound)/.test(line)) return
          const multipv = Number(/ multipv (\d+)/.exec(line)?.[1] ?? 1)
          const depth = Number(/ depth (\d+)/.exec(line)?.[1] ?? 0)
          const mate = / score mate (-?\d+)/.exec(line)
          const cp = / score cp (-?\d+)/.exec(line)
          lines.set(multipv, {
            multipv,
            depth,
            score: mate ? { mate: Number(mate[1]) } : { cp: Number(cp?.[1] ?? 0) },
            pv: line.split(' pv ')[1].trim().split(/\s+/),
          })
          opts.onUpdate?.(sorted(lines))
        } else if (line.startsWith('bestmove')) {
          this.listeners.delete(listener)
          this.searching = false
          const bestMove = line.split(/\s+/)[1] ?? ''
          resolve({ fen, bestMove: bestMove === '(none)' ? '' : bestMove, lines: sorted(lines) })
        }
      }
      this.listeners.add(listener)
      this.searching = true
      this.send(`position fen ${fen}`)
      let go = 'go'
      if (opts.depth) go += ` depth ${opts.depth}`
      if (opts.movetime) go += ` movetime ${opts.movetime}`
      if (!opts.depth && !opts.movetime) go += ' depth 14'
      if (opts.searchmoves?.length) go += ` searchmoves ${opts.searchmoves.join(' ')}`
      this.send(go)
    })
  }

  terminate() {
    this.worker.terminate()
  }
}

function sorted(lines: Map<number, EngineLine>): EngineLine[] {
  return [...lines.values()].sort((a, b) => a.multipv - b.multipv)
}

let analysisEngine: Engine | null = null
let playEngine: Engine | null = null

/** Shared engine for evaluations, hints and game review. */
export function getAnalysisEngine(): Engine {
  analysisEngine ??= new Engine()
  return analysisEngine
}

/** Separate engine for the computer opponent so analysis never blocks its moves. */
export function getPlayEngine(): Engine {
  playEngine ??= new Engine()
  return playEngine
}
