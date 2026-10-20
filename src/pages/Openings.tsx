import { Link } from 'react-router-dom'
import { Badge, Card, PageHeader, ProgressBar } from '../components/ui'
import { openings } from '../data/openings/index'
import type { Opening } from '../data/types'
import { dueLines, mastery } from '../lib/drills'
import { useProgress } from '../lib/storage'

const DIFFICULTY_COLOR = { beginner: 'rgba(95,184,95,0.25)', intermediate: 'rgba(232,177,58,0.25)', advanced: 'rgba(226,87,76,0.25)' }

function group(o: Opening) {
  if (o.side === 'white') return 'As White'
  return o.lines[0]?.moves[0] === 'e4' ? 'As Black against 1.e4' : 'As Black against 1.d4 and others'
}

export default function Openings() {
  const progress = useProgress()
  const due = dueLines(progress, openings)
  const groups = ['As White', 'As Black against 1.e4', 'As Black against 1.d4 and others']

  return (
    <div>
      <PageHeader
        title="Opening trainer"
        subtitle="Learn the ideas behind the main openings, then drill the moves from memory. Lines come back for review just before you would forget them."
      />
      <Card className="mb-6 border-accent/30">
        <p className="font-semibold">🧭 Which openings should I learn?</p>
        <p className="mt-1 text-sm text-muted">
          Beginners: pick <strong className="text-ink">one opening as White</strong> (the Italian Game or London System), <strong className="text-ink">one answer to 1.e4</strong> (1…e5 or
          the Caro-Kann) and <strong className="text-ink">one answer to 1.d4</strong> (the Queen's Gambit Declined). Understand the ideas first — memorising long lines matters much later.
        </p>
        {due.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
            <span className="font-semibold text-accent">Due for review:</span>
            {due.slice(0, 8).map((d) => (
              <Link key={`${d.opening.id}-${d.index}`} to={`/openings/${d.opening.id}?line=${d.index}&mode=drill`} className="rounded-full border border-accent/50 px-2.5 py-0.5 hover:bg-accent/15">
                {d.opening.name}: {d.line.name}
              </Link>
            ))}
          </div>
        )}
      </Card>

      {openings.length === 0 && <p className="text-muted">Openings are being added.</p>}
      <div className="space-y-8">
        {groups.map((g) => {
          const list = openings.filter((o) => group(o) === g)
          if (!list.length) return null
          return (
            <section key={g}>
              <h2 className="mb-3 text-lg font-bold">{g}</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((o) => {
                  const m = mastery(progress, o)
                  return (
                    <Link key={o.id} to={`/openings/${o.id}`}>
                      <Card className="flex h-full flex-col transition hover:border-accent">
                        <div className="mb-2 flex items-start justify-between gap-2">
                          <h3 className="font-semibold">{o.name}</h3>
                          <span className="shrink-0 text-xs text-muted">{o.eco}</span>
                        </div>
                        <p className="mb-3 line-clamp-3 flex-1 text-sm text-muted">{o.summary}</p>
                        <div className="mb-2 flex items-center gap-2">
                          <Badge color={DIFFICULTY_COLOR[o.difficulty]}>{o.difficulty}</Badge>
                          <span className="text-xs text-muted">{o.lines.length} lines</span>
                        </div>
                        <ProgressBar value={m} color="var(--color-good)" />
                        <p className="mt-1 text-xs text-muted">{Math.round(m * 100)}% learned</p>
                      </Card>
                    </Link>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
