// Steps through a sequence of moves with optional notes after each ply.
// Give it a new `key` to restart from the first move.
import { useMemo, useState } from 'react'
import { buildSteps, START_FEN } from '../lib/chess'
import { Markdown } from '../lib/markdown'
import Board from './Board'
import MoveList from './MoveList'
import { Button } from './ui'

export default function LineViewer({
  fen = START_FEN,
  moves,
  notes,
  caption,
  orientation,
}: {
  fen?: string
  moves: string[]
  notes?: Record<number, string>
  caption?: string
  orientation?: 'white' | 'black'
}) {
  const steps = useMemo(() => buildSteps(fen, moves), [fen, moves])
  const [ply, setPly] = useState(0)
  const last = ply === 0 ? null : (steps[ply - 1] ?? null)
  const current = last?.fen ?? fen
  const startTurn = fen.split(' ')[1]
  const startNo = Number(fen.split(' ')[5]) || 1
  const note = notes?.[ply]

  return (
    <div className="grid gap-4 md:grid-cols-[minmax(0,420px)_1fr]">
      <div>
        <Board fen={current} orientation={orientation ?? (startTurn === 'b' ? 'black' : 'white')} lastMove={last} />
        <div className="mt-3 flex items-center justify-center gap-2">
          <Button onClick={() => setPly(0)} disabled={ply === 0} aria-label="First move">
            ⏮
          </Button>
          <Button onClick={() => setPly((p) => Math.max(0, p - 1))} disabled={ply === 0} aria-label="Previous move">
            ◀
          </Button>
          <span className="w-16 text-center text-sm text-muted">
            {ply}/{steps.length}
          </span>
          <Button variant="primary" onClick={() => setPly((p) => Math.min(steps.length, p + 1))} disabled={ply === steps.length} aria-label="Next move">
            ▶
          </Button>
          <Button onClick={() => setPly(steps.length)} disabled={ply === steps.length} aria-label="Last move">
            ⏭
          </Button>
        </div>
      </div>
      <div className="flex min-w-0 flex-col gap-3">
        {caption && <p className="font-medium">{caption}</p>}
        <div className="max-h-56 overflow-y-auto rounded-lg bg-panel-2/50 p-2">
          <MoveList moves={steps.map((s) => s.san)} current={ply - 1} onSelect={(i) => setPly(i + 1)} startMoveNumber={startNo} blackFirst={startTurn === 'b'} />
        </div>
        <div className="min-h-16 rounded-lg border border-line bg-panel-2/40 p-3 text-sm">
          {note ? <Markdown text={note} /> : <span className="text-muted">{ply === 0 ? 'Press ▶ to step through the moves.' : ply === steps.length ? 'End of line.' : ''}</span>}
        </div>
      </div>
    </div>
  )
}
