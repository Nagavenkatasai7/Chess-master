import { Link } from 'react-router-dom'
import { Card, ProgressBar } from '../components/ui'
import { allLessons } from '../data/curriculum/index'
import { LEVELS } from '../data/types'
import { estimateRating, levelCompletion, rankFor, RANKS } from '../lib/rating'
import { dailyCounts, dayStreak, useProgress, useSettings } from '../lib/storage'

const PLAN = [
  { key: 'lessons', label: 'Complete a lesson', goal: 1, to: '/learn', icon: '🎓' },
  { key: 'puzzles', label: 'Solve 5 puzzles', goal: 5, to: '/puzzles', icon: '🧩' },
  { key: 'drills', label: 'Drill an opening', goal: 1, to: '/openings', icon: '📖' },
  { key: 'games', label: 'Play a game', goal: 1, to: '/play', icon: '♟️' },
] as const

export default function Home() {
  const progress = useProgress()
  const settings = useSettings()
  const { rating, signals } = estimateRating(progress)
  const { current, next } = rankFor(rating)
  const daily = dailyCounts(progress)
  const streak = dayStreak(progress)
  const nextLesson = allLessons.find((e) => !progress.lessons[e.lesson.id])
  const lessonsDone = allLessons.filter((e) => progress.lessons[e.lesson.id]).length
  const completion = levelCompletion(progress)
  const wins = progress.games.filter((g) => g.result === 'win').length
  const losses = progress.games.filter((g) => g.result === 'loss').length
  const draws = progress.games.length - wins - losses
  const isNew = lessonsDone === 0 && progress.puzzle.solved + progress.puzzle.failed === 0 && progress.games.length === 0
  const toNext = next ? (rating - current.min) / (next.min - current.min) : 1

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{settings.playerName ? `Welcome back, ${settings.playerName}` : 'Your road to grandmaster'}</h1>
        <p className="mt-1 text-muted">Learn the ideas, train tactics every day, play, review — repeat. Every grandmaster started exactly where you are.</p>
      </div>

      {isNew && (
        <Card className="border-accent/50 bg-gradient-to-br from-accent/15 to-transparent">
          <p className="text-lg font-semibold">👋 New to chess? Start here.</p>
          <p className="mt-1 text-muted">
            Your first lesson teaches the board and how each piece moves with quick interactive challenges. No experience needed.
          </p>
          {nextLesson && (
            <Link to={`/learn/${nextLesson.lesson.id}`} className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 font-semibold text-accent-ink hover:brightness-110">
              Start lesson 1: {nextLesson.lesson.title} →
            </Link>
          )}
        </Card>
      )}

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex flex-wrap items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-panel-2 text-4xl">{current.icon}</div>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-muted">Current rank</p>
              <p className="text-2xl font-bold">{current.title}</p>
              <p className="text-sm text-muted">
                {rating ? (
                  <>
                    Estimated strength <span className="font-semibold text-ink">{rating}</span>
                    {signals.length > 0 && <span> · based on {signals.join(', ')}</span>}
                  </>
                ) : (
                  'Solve puzzles, finish lessons and play games to get a strength estimate.'
                )}
              </p>
            </div>
          </div>
          {next && (
            <div className="mt-5">
              <div className="mb-1 flex justify-between text-xs text-muted">
                <span>{current.title}</span>
                <span>
                  Next: {next.icon} {next.title} ({next.min})
                </span>
              </div>
              <ProgressBar value={toNext} />
            </div>
          )}
          <div className="mt-5 flex gap-1 overflow-x-auto pb-1">
            {RANKS.map((r) => (
              <div
                key={r.title}
                title={`${r.title} (${r.min}+)`}
                className={`flex min-w-[4.5rem] flex-col items-center rounded-lg px-2 py-1.5 text-center text-[10px] ${
                  r === current ? 'bg-accent/20 text-accent' : rating >= r.min ? 'text-ink' : 'text-muted opacity-50'
                }`}
              >
                <span className="text-lg">{r.icon}</span>
                {r.title}
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <p className="font-semibold">Today's training</p>
            <span className="text-sm text-muted" title="Days in a row with training">
              🔥 {streak} day{streak === 1 ? '' : 's'}
            </span>
          </div>
          <ul className="mt-3 space-y-2">
            {PLAN.map((item) => {
              const count = daily[item.key]
              const done = count >= item.goal
              return (
                <li key={item.key}>
                  <Link to={item.to} className="flex items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-panel-2">
                    <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${done ? 'bg-good text-white' : 'border border-line'}`}>{done ? '✓' : ''}</span>
                    <span className={`flex-1 text-sm ${done ? 'text-muted line-through' : ''}`}>
                      {item.icon} {item.label}
                    </span>
                    <span className="text-xs text-muted">
                      {Math.min(count, item.goal)}/{item.goal}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </Card>
      </div>

      {nextLesson && !isNew && (
        <Link to={`/learn/${nextLesson.lesson.id}`} className="block">
          <Card className="flex flex-wrap items-center justify-between gap-3 transition hover:border-accent">
            <div>
              <p className="text-sm text-muted">
                Continue learning · Level {nextLesson.module.level}: {LEVELS[nextLesson.module.level - 1].name} · {nextLesson.module.title}
              </p>
              <p className="text-lg font-semibold">{nextLesson.lesson.title}</p>
              <p className="text-sm text-muted">{nextLesson.lesson.summary}</p>
            </div>
            <span className="rounded-lg bg-accent px-4 py-2 font-semibold text-accent-ink">Continue →</span>
          </Card>
        </Link>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Lessons" value={`${lessonsDone}/${allLessons.length}`} to="/learn" />
        <Stat label="Puzzle rating" value={String(progress.puzzle.rating)} hint={`${progress.puzzle.solved} solved · best streak ${progress.puzzle.bestStreak}`} to="/puzzles" />
        <Stat label="Games vs computer" value={`${wins}W ${draws}D ${losses}L`} to="/play" />
        <Stat label="Opening lines drilled" value={String(Object.keys(progress.drills).length)} to="/openings" />
      </div>

      <Card>
        <p className="mb-3 font-semibold">Curriculum progress</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {LEVELS.map((l) => (
            <Link key={l.level} to={`/learn#level-${l.level}`} className="rounded-lg p-2 hover:bg-panel-2">
              <div className="mb-1 flex justify-between text-sm">
                <span>
                  {l.level}. {l.name}
                </span>
                <span className="text-muted">{Math.round(completion[l.level] * 100)}%</span>
              </div>
              <ProgressBar value={completion[l.level]} />
              <p className="mt-1 text-xs text-muted">Rating {l.rating}</p>
            </Link>
          ))}
        </div>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <QuickLink to="/handbook" icon="💡" title="Tips & Traps" text="Golden rules, practical tricks and the opening traps every player must know." />
        <QuickLink to="/analysis" icon="🔍" title="Analysis board" text="Set up any position, see Stockfish's evaluation and ask the AI coach about it." />
        <QuickLink to="/settings" icon="🤖" title="AI coach setup" text="Connect a free OpenRouter model for plain-English explanations." />
      </div>
    </div>
  )
}

function Stat({ label, value, hint, to }: { label: string; value: string; hint?: string; to: string }) {
  return (
    <Link to={to}>
      <Card className="h-full transition hover:border-accent">
        <p className="text-sm text-muted">{label}</p>
        <p className="mt-1 text-2xl font-bold">{value}</p>
        {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
      </Card>
    </Link>
  )
}

function QuickLink({ to, icon, title, text }: { to: string; icon: string; title: string; text: string }) {
  return (
    <Link to={to}>
      <Card className="h-full transition hover:border-accent">
        <p className="font-semibold">
          {icon} {title}
        </p>
        <p className="mt-1 text-sm text-muted">{text}</p>
      </Card>
    </Link>
  )
}
