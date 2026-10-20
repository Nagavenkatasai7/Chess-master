import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Card, PageHeader, ProgressBar } from '../components/ui'
import { allLessons, curriculum } from '../data/curriculum/index'
import { LEVELS } from '../data/types'
import { levelCompletion } from '../lib/rating'
import { useProgress } from '../lib/storage'

export default function Learn() {
  const progress = useProgress()
  const completion = levelCompletion(progress)
  const nextId = allLessons.find((e) => !progress.lessons[e.lesson.id])?.lesson.id
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' })
  }, [hash])

  return (
    <div>
      <PageHeader
        title="Learn"
        subtitle="Six levels take you from never having played to master-level understanding. Work through them in order — each lesson builds on the last — and come back to review any time."
      />
      <div className="space-y-10">
        {LEVELS.map((level) => {
          const modules = curriculum.filter((m) => m.level === level.level)
          return (
            <section key={level.level} id={`level-${level.level}`} className="scroll-mt-20">
              <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-accent">
                    Level {level.level} · Rating {level.rating}
                  </p>
                  <h2 className="text-xl font-bold">{level.name}</h2>
                  <p className="text-sm text-muted">{level.blurb}</p>
                </div>
                <div className="w-40">
                  <p className="mb-1 text-right text-xs text-muted">{Math.round(completion[level.level] * 100)}% complete</p>
                  <ProgressBar value={completion[level.level]} />
                </div>
              </div>
              {modules.length === 0 && <p className="text-sm text-muted">Lessons for this level are coming soon.</p>}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {modules.map((mod) => {
                  const done = mod.lessons.filter((l) => progress.lessons[l.id]).length
                  return (
                    <Card key={mod.id}>
                      <div className="mb-1 flex items-start justify-between gap-2">
                        <h3 className="font-semibold">{mod.title}</h3>
                        <span className="shrink-0 text-xs text-muted">
                          {done}/{mod.lessons.length}
                        </span>
                      </div>
                      <p className="mb-3 text-sm text-muted">{mod.description}</p>
                      <ol className="space-y-1">
                        {mod.lessons.map((lesson) => {
                          const complete = !!progress.lessons[lesson.id]
                          const isNext = lesson.id === nextId
                          return (
                            <li key={lesson.id}>
                              <Link
                                to={`/learn/${lesson.id}`}
                                className={`flex items-center gap-3 rounded-lg px-2 py-1.5 text-sm hover:bg-panel-2 ${isNext ? 'bg-accent/10 ring-1 ring-accent/40' : ''}`}
                              >
                                <span
                                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] ${complete ? 'bg-good text-white' : 'border border-line text-muted'}`}
                                >
                                  {complete ? '✓' : ''}
                                </span>
                                <span className="flex-1">{lesson.title}</span>
                                {isNext && <span className="text-xs font-semibold text-accent">Up next</span>}
                                <span className="text-xs text-muted">{lesson.estMinutes} min</span>
                              </Link>
                            </li>
                          )
                        })}
                      </ol>
                    </Card>
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
