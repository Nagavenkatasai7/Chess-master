// Move list in two columns; click a move to jump to that position.
import { CLASSIFICATION_META, type Classification } from '../lib/chess'

export default function MoveList({
  moves,
  current,
  onSelect,
  classes,
  startMoveNumber = 1,
  blackFirst = false,
}: {
  moves: string[]
  /** Index of the move currently shown (-1 = start position). */
  current: number
  onSelect?: (index: number) => void
  classes?: (Classification | undefined)[]
  startMoveNumber?: number
  blackFirst?: boolean
}) {
  const rows: { no: number; white?: number; black?: number }[] = []
  let i = 0
  let no = startMoveNumber
  if (blackFirst && moves.length) {
    rows.push({ no, black: 0 })
    i = 1
    no++
  }
  for (; i < moves.length; i += 2, no++) rows.push({ no, white: i, black: i + 1 < moves.length ? i + 1 : undefined })

  const cell = (idx?: number) => {
    if (idx === undefined) return <span />
    const cls = classes?.[idx]
    const meta = cls ? CLASSIFICATION_META[cls] : undefined
    return (
      <button
        onClick={() => onSelect?.(idx)}
        className={`flex items-center gap-1 rounded px-2 py-0.5 text-left font-mono text-sm ${idx === current ? 'bg-accent/25 text-ink' : 'hover:bg-panel-2'}`}
      >
        {moves[idx]}
        {meta && cls !== 'best' && cls !== 'excellent' && cls !== 'good' && (
          <span className="text-xs font-bold" style={{ color: meta.color }}>
            {meta.symbol}
          </span>
        )}
      </button>
    )
  }

  return (
    <div className="grid grid-cols-[2.2rem_1fr_1fr] gap-y-0.5 text-sm">
      {rows.map((r) => (
        <div key={r.no} className="contents">
          <span className="py-0.5 pr-1 text-right text-muted">{r.no}.</span>
          {cell(r.white)}
          {cell(r.black)}
        </div>
      ))}
    </div>
  )
}
