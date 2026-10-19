import { Link, useParams, useSearchParams } from 'react-router-dom'
import LineViewer from '../components/LineViewer'
import OpeningDrill from '../components/OpeningDrill'
import { Badge, Button, Card } from '../components/ui'
import { openings } from '../data/openings/index'
import { drillKey, mastery, recordDrill } from '../lib/drills'
import { useProgress } from '../lib/storage'

export default function OpeningPage() {
  const { openingId } = useParams()
  const [params, setParams] = useSearchParams()
  const progress = useProgress()
  const opening = openings.find((o) => o.id === openingId)

  if (!opening) {
    return (
      <Card>
        <p>Opening not found.</p>
        <Link to="/openings" className="text-accent underline">
          All openings
        </Link>
      </Card>
    )
  }

  const lineIndex = Math.min(Number(params.get('line') ?? 0) || 0, opening.lines.length - 1)
  const mode = params.get('mode') === 'drill' ? 'drill' : 'learn'
  const line = opening.lines[lineIndex]
  const set = (patch: Record<string, string>) => setParams({ line: String(lineIndex), mode, ...patch }, { replace: true })

  return (
    <div>
      <Link to="/openings" className="text-sm text-muted hover:text-ink">
        ← All openings
      </Link>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{opening.name}</h1>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted">
            <span>{opening.eco}</span>·<span>You play {opening.side === 'white' ? 'White ♔' : 'Black ♚'}</span>·<Badge>{opening.difficulty}</Badge>·
            <span>{Math.round(mastery(progress, opening) * 100)}% learned</span>
          </div>
        </div>
      </div>
      <p className="mt-3 max-w-3xl text-muted">{opening.summary}</p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <Card className="p-4">
          <p className="mb-2 font-semibold">🎯 Key ideas</p>
          <ul className="list-disc space-y-1 pl-5 text-sm text-muted">
            {opening.ideas.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </Card>
        <Card className="p-4">
          <p className="mb-2 font-semibold">⚠️ Watch out for</p>
          <ul className="list-disc space-y-1 pl-5 text-sm text-muted">
            {opening.pitfalls.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {opening.lines.map((l, i) => {
          const stat = progress.drills[drillKey(opening.id, i)]
          return (
            <button
              key={l.name}
              onClick={() => set({ line: String(i) })}
              className={`rounded-full border px-3 py-1 text-sm ${i === lineIndex ? 'border-accent bg-accent/20 text-accent' : 'border-line text-muted hover:text-ink'}`}
            >
              {(stat?.streak ?? 0) >= 2 && '✓ '}
              {l.name}
            </button>
          )
        })}
      </div>

      <Card className="mt-4 p-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <p className="font-semibold">{line.name}</p>
          <div className="flex gap-2">
            <Button variant={mode === 'learn' ? 'primary' : 'secondary'} onClick={() => set({ mode: 'learn' })}>
              📖 Study
            </Button>
            <Button variant={mode === 'drill' ? 'primary' : 'secondary'} onClick={() => set({ mode: 'drill' })}>
              🧠 Drill from memory
            </Button>
          </div>
        </div>
        {mode === 'learn' ? (
          <LineViewer key={lineIndex} moves={line.moves} notes={line.notes} orientation={opening.side} />
        ) : (
          <OpeningDrill opening={opening} line={line} onComplete={(perfect) => recordDrill(drillKey(opening.id, lineIndex), perfect)} />
        )}
      </Card>
    </div>
  )
}
