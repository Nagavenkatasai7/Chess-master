// Evaluation-over-time chart for game review; click to jump to a move.
import { winPercent } from '../lib/chess'
import type { Score } from '../lib/engine'

export default function EvalGraph({ scores, current, onSelect, marks = {} }: { scores: Score[]; current: number; onSelect: (ply: number) => void; marks?: Record<number, string> }) {
  if (scores.length < 2) return null
  const w = 100
  const h = 40
  const x = (i: number) => (i / (scores.length - 1)) * w
  const y = (s: Score) => h - (winPercent(s) / 100) * h
  const line = scores.map((s, i) => `${x(i)},${y(s)}`).join(' ')
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className="h-24 w-full cursor-pointer rounded-lg bg-[#403d39]"
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const ply = Math.round(((e.clientX - rect.left) / rect.width) * (scores.length - 1))
        onSelect(Math.max(0, Math.min(scores.length - 1, ply)))
      }}
    >
      <polygon points={`0,${h} ${line} ${w},${h}`} fill="#f0eee9" />
      <line x1="0" y1={h / 2} x2={w} y2={h / 2} stroke="#888" strokeWidth="0.3" vectorEffect="non-scaling-stroke" strokeDasharray="2 2" />
      {Object.entries(marks).map(([ply, color]) => (
        <line key={ply} x1={x(Number(ply))} x2={x(Number(ply))} y1={y(scores[Number(ply)]) - 3} y2={y(scores[Number(ply)]) + 3} stroke={color} strokeWidth="4" vectorEffect="non-scaling-stroke" />
      ))}
      <line x1={x(current)} y1="0" x2={x(current)} y2={h} stroke="var(--color-accent)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}
