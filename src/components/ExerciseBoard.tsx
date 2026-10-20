// Runs a lesson exercise: find-the-move lines, mates, "collect the stars" and
// "capture everything" piece-movement drills.
import { Chess } from 'chess.js'
import { useEffect, useState } from 'react'
import type { Exercise } from '../data/types'
import { moveToUci, sanToUci, tryMove, type MoveInput } from '../lib/chess'
import { Markdown } from '../lib/markdown'
import { useTimers } from '../lib/useTimers'
import Board from './Board'
import CoachPanel from './CoachPanel'
import { Button } from './ui'

type Status = 'playing' | 'solved' | 'failed'

function soloFen(fen: string, turn: string) {
  const parts = fen.split(' ')
  parts[1] = turn
  parts[3] = '-'
  return parts.join(' ')
}

function enemyCount(fen: string, me: string) {
  return new Chess(fen, { skipValidation: true })
    .board()
    .flat()
    .filter((p) => p && p.color !== me && p.type !== 'k').length
}

export default function ExerciseBoard({ exercise, onSolved, solvedBefore }: { exercise: Exercise; onSolved?: (id: string) => void; solvedBefore?: boolean }) {
  const goal = exercise.goal ?? 'line'
  const solo = goal === 'stars' || goal === 'capture-all'
  const me = exercise.fen.split(' ')[1] as 'w' | 'b'
  const [fen, setFen] = useState(exercise.fen)
  const [step, setStep] = useState(0)
  const [moves, setMoves] = useState(0)
  const [visited, setVisited] = useState<string[]>([])
  const [status, setStatus] = useState<Status>('playing')
  const [message, setMessage] = useState<{ kind: 'good' | 'bad' | 'info'; text: string } | null>(null)
  const [mistakes, setMistakes] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [lastMove, setLastMove] = useState<{ from: string; to: string } | null>(null)
  const [showCoach, setShowCoach] = useState(false)
  const timers = useTimers()

  const reset = () => {
    timers.clear()
    setFen(exercise.fen)
    setStep(0)
    setMoves(0)
    setVisited([])
    setStatus('playing')
    setMessage(null)
    setLastMove(null)
    setShowHint(false)
  }

  useEffect(() => {
    reset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exercise.id])

  const solve = (text?: string) => {
    setStatus('solved')
    setMessage({ kind: 'good', text: text ?? 'Correct! Well done.' })
    onSolved?.(exercise.id)
  }

  const onMove = (input: MoveInput): boolean => {
    if (status !== 'playing') return false
    if (solo) {
      const result = tryMove(fen, input, true)
      if (!result) return false
      const next = soloFen(result.chess.fen(), me)
      const used = moves + 1
      setFen(next)
      setMoves(used)
      setLastMove({ from: result.move.from, to: result.move.to })
      if (goal === 'stars') {
        const nowVisited = exercise.stars!.includes(result.move.to) && !visited.includes(result.move.to) ? [...visited, result.move.to] : visited
        setVisited(nowVisited)
        if (nowVisited.length === exercise.stars!.length) solve(`All stars collected in ${used} move${used === 1 ? '' : 's'}!`)
        else if (used >= exercise.maxMoves!) {
          setStatus('failed')
          setMessage({ kind: 'bad', text: 'Out of moves. Try a shorter route!' })
        }
      } else {
        if (enemyCount(next, me) === 0) solve(`Everything captured in ${used} move${used === 1 ? '' : 's'}!`)
        else if (used >= exercise.maxMoves!) {
          setStatus('failed')
          setMessage({ kind: 'bad', text: 'Out of moves. Look for a more efficient order!' })
        }
      }
      return true
    }

    const result = tryMove(fen, input)
    if (!result) return false
    const solution = exercise.solution!
    const expected = sanToUci(fen, solution[step])
    const played = moveToUci(result.move)
    const isMate = result.chess.isCheckmate()
    if (played !== expected && !isMate) {
      const count = mistakes + 1
      setMistakes(count)
      if (count >= 2) setShowHint(true)
      setMessage({ kind: 'bad', text: `${result.move.san} isn't it. Try again!` })
      return false
    }
    setFen(result.chess.fen())
    setLastMove({ from: result.move.from, to: result.move.to })
    if (isMate || step + 1 >= solution.length) {
      solve(isMate ? 'Checkmate! Brilliant.' : undefined)
      return true
    }
    setMessage({ kind: 'good', text: `${result.move.san} — good! Keep going…` })
    const reply = solution[step + 1]
    const afterFen = result.chess.fen()
    timers.schedule(() => {
      const r = tryMove(afterFen, reply)
      if (!r) return
      setFen(r.chess.fen())
      setLastMove({ from: r.move.from, to: r.move.to })
      setStep(step + 2)
      setMessage({ kind: 'info', text: `Opponent replies ${r.move.san}. Your move.` })
    }, 550)
    return true
  }

  const showSolution = () => {
    reset()
    setStatus('failed')
    const solution = exercise.solution ?? []
    let current = exercise.fen
    solution.forEach((san, i) => {
      timers.schedule(() => {
        const r = tryMove(current, san)
        if (!r) return
        current = r.chess.fen()
        setFen(current)
        setLastMove({ from: r.move.from, to: r.move.to })
        if (i === solution.length - 1) setMessage({ kind: 'info', text: `Solution: ${solution.join(' ')}` })
      }, 650 * (i + 1))
    })
  }

  const remainingStars = goal === 'stars' ? exercise.stars!.filter((s) => !visited.includes(s)) : []
  const counter = solo ? `Moves: ${moves}/${exercise.maxMoves}` : null

  return (
    <div className="grid gap-4 md:grid-cols-[minmax(0,420px)_1fr]">
      <div>
        <Board
          fen={fen}
          orientation={me === 'w' ? 'white' : 'black'}
          movable={status === 'playing' ? me : false}
          onMove={onMove}
          lastMove={lastMove}
          stars={remainingStars}
          skipValidation={solo}
        />
      </div>
      <div className="flex min-w-0 flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <p className="font-semibold">
            {solvedBefore && status === 'playing' && <span className="mr-2 text-good">✓</span>}
            {exercise.prompt}
          </p>
          {counter && <span className="shrink-0 rounded-full bg-panel-2 px-2.5 py-0.5 text-xs text-muted">{counter}</span>}
        </div>
        {!solo && status === 'playing' && step === 0 && (
          <p className="text-sm text-muted">
            {me === 'w' ? 'White' : 'Black'} to move{goal === 'mate' ? ` — checkmate in ${Math.ceil(exercise.solution!.length / 2)}` : ''}.
          </p>
        )}
        {message && (
          <p className={`rounded-lg px-3 py-2 text-sm ${message.kind === 'good' ? 'bg-good/15 text-good' : message.kind === 'bad' ? 'bg-bad/15 text-bad' : 'bg-info/15 text-info'}`}>
            {message.text}
          </p>
        )}
        {showHint && exercise.hint && status === 'playing' && (
          <div className="rounded-lg border border-warn/40 bg-warn/10 px-3 py-2 text-sm">
            <span className="font-semibold text-warn">Hint: </span>
            {exercise.hint}
          </div>
        )}
        {status !== 'playing' && exercise.explanation && (
          <div className="rounded-lg border border-line bg-panel-2/50 p-3 text-sm">
            <Markdown text={exercise.explanation} />
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          {status === 'playing' && exercise.hint && !showHint && <Button onClick={() => setShowHint(true)}>💡 Hint</Button>}
          {status === 'playing' && !solo && mistakes > 0 && <Button onClick={showSolution}>Show solution</Button>}
          {(status !== 'playing' || moves > 0 || step > 0) && <Button onClick={reset}>↺ Try again</Button>}
          {!solo && (
            <Button variant="ghost" onClick={() => setShowCoach((s) => !s)}>
              🤖 {showCoach ? 'Hide coach' : 'Ask coach'}
            </Button>
          )}
        </div>
        {showCoach && !solo && (
          <CoachPanel
            compact
            context={() => ({
              fen,
              activity: `Lesson exercise: "${exercise.prompt}". The student must find the move(s) themselves — give hints, not the answer, unless they ask for it.`,
            })}
            suggestions={['Give me a hint', 'What should I look for?', 'Explain why the solution works']}
          />
        )}
      </div>
    </div>
  )
}
