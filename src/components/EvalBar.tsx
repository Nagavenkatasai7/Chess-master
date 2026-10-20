// Vertical evaluation bar (White's share grows from the bottom when White is better).
import { formatScore, winPercent } from '../lib/chess'
import type { Score } from '../lib/engine'

export default function EvalBar({ score, orientation = 'white' }: { score: Score | null; orientation?: 'white' | 'black' }) {
  const white = score ? winPercent(score) : 50
  const label = score ? formatScore(score) : '…'
  const flipped = orientation === 'black'
  return (
    <div
      className={`relative flex w-6 shrink-0 overflow-hidden rounded-md bg-[#403d39] sm:w-7 ${flipped ? 'flex-col' : 'flex-col-reverse'}`}
      title={`Evaluation ${label} (White's view)`}
    >
      <div className="bg-[#f0eee9] transition-all duration-500" style={{ height: `${white}%` }} />
      <span
        className={`absolute left-0 right-0 text-center text-[10px] font-bold ${
          (white >= 50) !== flipped ? 'bottom-1 text-[#403d39]' : 'top-1 text-[#f0eee9]'
        }`}
      >
        {label.replace('+', '')}
      </span>
    </div>
  )
}
