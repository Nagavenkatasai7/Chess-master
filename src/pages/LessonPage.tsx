import { Link, useNavigate, useParams } from 'react-router-dom'
import ExerciseBoard from '../components/ExerciseBoard'
import LineViewer from '../components/LineViewer'
import Board from '../components/Board'
import { Button, Card } from '../components/ui'
import { allLessons, findLesson } from '../data/curriculum/index'
import { LEVELS, type LessonBlock } from '../data/types'
import { Markdown } from '../lib/markdown'
import { updateProgress, useProgress } from '../lib/storage'

export default function LessonPage() {
  const { lessonId = '' } = useParams()
  const navigate = useNavigate()
  const progress = useProgress()
  const entry = findLesson(lessonId)

  if (!entry) {
    return (
      <Card>
        <p>Lesson not found.</p>
        <Link to="/learn" className="text-accent underline">
          Back to all lessons
        </Link>
      </Card>
    )
  }

  const { lesson, module } = entry
  const index = allLessons.findIndex((e) => e.lesson.id === lesson.id)
  const prev = allLessons[index - 1]
  const next = allLessons[index + 1]
  const exercises = lesson.blocks.flatMap((b) => (b.type === 'exercise' ? [b.exercise.id] : []))
  const solvedCount = exercises.filter((id) => progress.exercises[id]).length
  const allSolved = solvedCount === exercises.length
  const complete = !!progress.lessons[lesson.id]

  const markSolved = (id: string) => {
    if (progress.exercises[id]) return
    updateProgress((p) => ({ ...p, exercises: { ...p.exercises, [id]: Date.now() } }))
  }

  const finish = () => {
    if (!complete) updateProgress((p) => ({ ...p, lessons: { ...p.lessons, [lesson.id]: Date.now() } }), 'lessons')
    if (next) navigate(`/learn/${next.lesson.id}`)
    else navigate('/learn')
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Link to={`/learn#level-${module.level}`} className="text-sm text-muted hover:text-ink">
        ← Level {module.level}: {LEVELS[module.level - 1].name} · {module.title}
      </Link>
      <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{lesson.title}</h1>
      <p className="mt-1 text-muted">
        {lesson.summary} · {lesson.estMinutes} min
      </p>

      <div className="mt-6 space-y-6">
        {lesson.blocks.map((block, i) => (
          <Block key={`${lesson.id}-${i}`} block={block} solved={block.type === 'exercise' ? !!progress.exercises[block.exercise.id] : false} onSolved={markSolved} />
        ))}
      </div>

      <Card className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <div>
          {exercises.length > 0 && (
            <p className="text-sm text-muted">
              Exercises solved: {solvedCount}/{exercises.length}
            </p>
          )}
          <p className="font-semibold">{complete ? '✓ Lesson complete' : allSolved ? 'Ready to finish this lesson!' : 'Solve the exercises to complete the lesson.'}</p>
        </div>
        <div className="flex gap-2">
          {prev && (
            <Button onClick={() => navigate(`/learn/${prev.lesson.id}`)} variant="ghost">
              ← Previous
            </Button>
          )}
          <Button variant="primary" onClick={finish} disabled={!allSolved && !complete}>
            {complete ? (next ? 'Next lesson →' : 'Back to lessons') : next ? 'Complete & continue →' : 'Complete lesson'}
          </Button>
        </div>
      </Card>
    </div>
  )
}

function Block({ block, solved, onSolved }: { block: LessonBlock; solved: boolean; onSolved: (id: string) => void }) {
  switch (block.type) {
    case 'text':
      return <Markdown text={block.md} className="text-[15px]" />
    case 'tip':
      return (
        <div className="rounded-xl border border-accent/40 bg-accent/10 px-4 py-3">
          <p className="mb-1 text-sm font-semibold text-accent">💡 {block.title ?? 'Tip'}</p>
          <Markdown text={block.md} className="text-sm" />
        </div>
      )
    case 'board':
      return (
        <figure className="mx-auto max-w-sm">
          <Board
            fen={block.fen}
            orientation={block.fen.split(' ')[1] === 'b' ? 'black' : 'white'}
            arrows={block.arrows?.map(([from, to]) => ({ from, to }))}
            highlights={Object.fromEntries((block.highlights ?? []).map((s) => [s, 'rgba(90,167,224,0.5)']))}
            skipValidation
          />
          {block.caption && <figcaption className="mt-2 text-center text-sm text-muted">{block.caption}</figcaption>}
        </figure>
      )
    case 'line':
      return (
        <Card className="p-4">
          <LineViewer fen={block.fen} moves={block.moves} notes={block.notes} caption={block.caption} />
        </Card>
      )
    case 'exercise':
      return (
        <Card className={`p-4 ${solved ? 'border-good/40' : 'border-accent/30'}`}>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-accent">Your turn</p>
          <ExerciseBoard exercise={block.exercise} onSolved={onSolved} solvedBefore={solved} />
        </Card>
      )
  }
}
