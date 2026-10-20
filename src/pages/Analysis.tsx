import { Chess } from 'chess.js'
import { useEffect, useMemo, useState } from 'react'
import Board from '../components/Board'
import CoachPanel from '../components/CoachPanel'
import EvalBar from '../components/EvalBar'
import MoveList from '../components/MoveList'
import { Button, Card, Notice, PageHeader } from '../components/ui'
import { formatLine, formatScore, gameOverReason, parseUci, pvToSan, START_FEN, whiteScore, type MoveInput } from '../lib/chess'
import { getAnalysisEngine, type EngineLine } from '../lib/engine'

interface Node {
  san: string
  from: string
  to: string
  fen: string
}

export default function Analysis() {
  const [startFen, setStartFen] = useState(START_FEN)
  const [moves, setMoves] = useState<Node[]>([])
  const [cursor, setCursor] = useState(0)
  const [orientation, setOrientation] = useState<'white' | 'black'>('white')
  const [analysis, setAnalysis] = useState<{ fen: string; lines: EngineLine[] }>({ fen: '', lines: [] })
  const [engineOn, setEngineOn] = useState(true)
  const [input, setInput] = useState('')
  const [error, setError] = useState('')

  const fen = cursor === 0 ? startFen : moves[cursor - 1].fen
  const turn = fen.split(' ')[1] as 'w' | 'b'
  const over = useMemo(() => gameOverReason(new Chess(fen)), [fen])

  useEffect(() => {
    if (!engineOn || over) return
    const engine = getAnalysisEngine()
    let live = true
    engine.analyse(fen, { depth: 18, multipv: 3, interrupt: true, onUpdate: (lines) => live && setAnalysis({ fen, lines }) })
    return () => {
      live = false
      engine.stop()
    }
  }, [fen, engineOn, over])

  const onMove = (m: MoveInput) => {
    const c = new Chess(fen)
    try {
      const played = c.move(m)
      const node = { san: played.san, from: played.from, to: played.to, fen: c.fen() }
      setMoves((prev) => [...prev.slice(0, cursor), node])
      setCursor(cursor + 1)
      return true
    } catch {
      return false
    }
  }

  const load = () => {
    const text = input.trim()
    setError('')
    if (!text) return
    try {
      const c = new Chess(text)
      setStartFen(c.fen())
      setMoves([])
      setCursor(0)
      return
    } catch {
      // Not a FEN; try PGN below.
    }
    try {
      const c = new Chess()
      c.loadPgn(text)
      const history = c.history({ verbose: true })
      const replay = new Chess(c.getHeaders().FEN ?? START_FEN)
      const start = replay.fen()
      const nodes = history.map((h) => {
        replay.move(h.san)
        return { san: h.san, from: h.from, to: h.to, fen: replay.fen() }
      })
      setStartFen(start)
      setMoves(nodes)
      setCursor(nodes.length)
    } catch {
      setError('That is not a valid FEN or PGN.')
    }
  }

  const lines = analysis.fen === fen ? analysis.lines : []
  const top = lines[0]
  const score = top ? whiteScore(top.score, turn) : null

  return (
    <div>
      <PageHeader title="Analysis board" subtitle="Play out any idea, load a position or a game, and see what Stockfish thinks. Ask the coach to explain it in plain English." />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,600px)_1fr]">
        <div>
          <div className="flex gap-2">
            {engineOn && <EvalBar score={score} orientation={orientation} />}
            <div className="min-w-0 flex-1">
              <Board
                fen={fen}
                orientation={orientation}
                movable="both"
                onMove={onMove}
                lastMove={cursor > 0 ? moves[cursor - 1] : null}
                arrows={engineOn && top?.pv[0] ? [{ ...parseUci(top.pv[0]), color: 'rgba(90,167,224,0.8)' }] : []}
              />
            </div>
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            <Button onClick={() => setCursor(0)} disabled={cursor === 0} aria-label="Start">
              ⏮
            </Button>
            <Button onClick={() => setCursor((c) => Math.max(0, c - 1))} disabled={cursor === 0} aria-label="Back">
              ◀
            </Button>
            <Button onClick={() => setCursor((c) => Math.min(moves.length, c + 1))} disabled={cursor === moves.length} aria-label="Forward">
              ▶
            </Button>
            <Button onClick={() => setCursor(moves.length)} disabled={cursor === moves.length} aria-label="End">
              ⏭
            </Button>
            <Button onClick={() => setOrientation((o) => (o === 'white' ? 'black' : 'white'))}>⇅ Flip</Button>
            <Button
              onClick={() => {
                setStartFen(START_FEN)
                setMoves([])
                setCursor(0)
              }}
            >
              Reset
            </Button>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-4">
          <Card className="p-4">
            <div className="mb-2 flex items-center justify-between">
              <p className="font-semibold">Stockfish 19</p>
              <label className="flex items-center gap-2 text-sm text-muted">
                <input type="checkbox" checked={engineOn} onChange={(e) => setEngineOn(e.target.checked)} className="accent-[var(--color-accent)]" />
                Engine
              </label>
            </div>
            {over ? (
              <p className="text-sm">{over}</p>
            ) : engineOn ? (
              <div className="space-y-1.5">
                {lines.length === 0 && <p className="text-sm text-muted">Thinking…</p>}
                {lines.map((l) => (
                  <p key={l.multipv} className="truncate font-mono text-sm">
                    <span className="mr-2 inline-block w-12 font-bold">{formatScore(whiteScore(l.score, turn))}</span>
                    <span className="text-muted">{formatLine(fen, pvToSan(fen, l.pv, 10))}</span>
                  </p>
                ))}
                {top && <p className="text-xs text-muted">Depth {top.depth}</p>}
              </div>
            ) : (
              <p className="text-sm text-muted">Engine off — try to evaluate the position yourself first!</p>
            )}
          </Card>

          <Card className="max-h-56 overflow-y-auto p-3">
            {moves.length ? (
              <MoveList moves={moves.map((m) => m.san)} current={cursor - 1} onSelect={(i) => setCursor(i + 1)} startMoveNumber={Number(startFen.split(' ')[5]) || 1} blackFirst={startFen.split(' ')[1] === 'b'} />
            ) : (
              <p className="text-sm text-muted">Move pieces for either side to explore.</p>
            )}
          </Card>

          <Card className="p-4">
            <p className="mb-2 text-sm font-semibold">Load a position (FEN) or game (PGN)</p>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={3}
              placeholder="Paste a FEN or PGN…"
              className="w-full rounded-lg border border-line bg-panel-2 p-2 font-mono text-xs outline-none focus:border-accent"
            />
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Button onClick={load}>Load</Button>
              <Button variant="ghost" onClick={() => navigator.clipboard?.writeText(fen)}>
                Copy FEN
              </Button>
            </div>
            {error && (
              <div className="mt-2">
                <Notice kind="bad">{error}</Notice>
              </div>
            )}
          </Card>

          <CoachPanel
            context={() => ({ fen, activity: 'Free analysis on the analysis board.', history: moves.slice(0, cursor).map((m) => m.san), startFen })}
            suggestions={['Who is better and why?', 'What is the plan for the side to move?', 'Explain the engine’s top move']}
          />
        </div>
      </div>
    </div>
  )
}
