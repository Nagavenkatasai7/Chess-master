import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Board from '../components/Board'
import CoachPanel from '../components/CoachPanel'
import { Badge, Button, Card, PageHeader } from '../components/ui'
import type { Puzzle } from '../data/types'
import { formatLine, moveToUci, parseUci, pvToSan, tryMove, type MoveInput } from '../lib/chess'
import { updatePuzzleRating } from '../lib/rating'
import { THEME_LABELS } from '../lib/themes'
import { useTimers } from '../lib/useTimers'
import { getProgress, updateProgress, useProgress } from '../lib/storage'

const PRACTICE_THEMES = ['mateIn1', 'mateIn2', 'mateIn3', 'fork', 'pin', 'skewer', 'discoveredAttack', 'hangingPiece', 'backRankMate', 'sacrifice', 'promotion', 'endgame']

type Status = 'loading' | 'playing' | 'solved' | 'failed'

function pickPuzzle(puzzles: Puzzle[], rating: number, theme: string | null, seen: Record<string, 0 | 1>, skip?: string): Puzzle | undefined {
  const pool = puzzles.filter((p) => p.id !== skip && (!theme || p.themes.includes(theme)))
  if (!pool.length) return undefined
  const unseen = pool.filter((p) => seen[p.id] === undefined)
  const source = unseen.length ? unseen : pool
  for (let window = 100; window <= 3000; window *= 2) {
    const near = source.filter((p) => Math.abs(p.rating - rating) <= window)
    if (near.length) return near[Math.floor(Math.random() * near.length)]
  }
  return source[Math.floor(Math.random() * source.length)]
}

export default function Puzzles() {
  const progress = useProgress()
  const [puzzles, setPuzzles] = useState<Puzzle[] | null>(null)
  const [theme, setTheme] = useState<string | null>(null)
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null)
  const [fen, setFen] = useState('')
  const [index, setIndex] = useState(0)
  const [status, setStatus] = useState<Status>('loading')
  const [lastMove, setLastMove] = useState<{ from: string; to: string } | null>(null)
  const [hint, setHint] = useState<string | null>(null)
  const [message, setMessage] = useState<string>('')
  const [delta, setDelta] = useState<number | null>(null)
  const [showCoach, setShowCoach] = useState(false)
  /** A retry of a puzzle that already counted: playable, but it never changes the rating again. */
  const [practice, setPractice] = useState(false)
  /** Whether the current attempt has already been scored. */
  const rated = useRef(false)
  const ratedIds = useRef(new Set<string>())
  const timers = useTimers()

  useEffect(() => {
    import('../data/puzzles.json').then((m) => setPuzzles(m.default as Puzzle[]))
  }, [])

  const start = useCallback(
    (p: Puzzle | undefined) => {
      timers.clear()
      setShowCoach(false)
      setHint(null)
      setDelta(null)
      if (!p) {
        rated.current = false
        setPractice(false)
        setPuzzle(null)
        setFen('')
        setLastMove(null)
        setMessage('')
        setStatus('loading')
        return
      }
      const retry = ratedIds.current.has(p.id)
      rated.current = retry
      setPractice(retry)
      setPuzzle(p)
      setFen(p.fen)
      setIndex(0)
      setLastMove(null)
      setStatus('playing')
      setMessage('')
      timers.schedule(() => {
        const r = tryMove(p.fen, parseUci(p.moves[0]))
        if (!r) return
        setFen(r.chess.fen())
        setLastMove({ from: r.move.from, to: r.move.to })
        setIndex(1)
        setMessage(`Your move — find the best move for ${r.chess.turn() === 'w' ? 'White' : 'Black'}.`)
      }, 700)
    },
    [timers],
  )

  const nextPuzzle = useCallback(
    (forTheme: string | null = theme) => {
      if (!puzzles) return
      const p = getProgress()
      start(pickPuzzle(puzzles, p.puzzle.rating, forTheme, p.puzzle.seen, puzzle?.id))
    },
    [puzzles, theme, puzzle, start],
  )

  // Switching theme loads a matching puzzle straight away. An attempt already
  // scored stays scored; an untouched puzzle is simply set aside without penalty.
  const chooseTheme = (next: string | null) => {
    setTheme(next)
    nextPuzzle(next)
  }

  useEffect(() => {
    if (puzzles && !puzzle) nextPuzzle()
    // Only when the dataset first loads.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [puzzles])

  const record = (solved: boolean) => {
    if (rated.current || !puzzle) return
    rated.current = true
    ratedIds.current.add(puzzle.id)
    const before = getProgress().puzzle.rating
    updateProgress((p) => {
      const played = p.puzzle.solved + p.puzzle.failed
      const rating = updatePuzzleRating(p.puzzle.rating, puzzle.rating, solved, played)
      const streak = solved ? p.puzzle.streak + 1 : 0
      return {
        ...p,
        puzzle: {
          ...p.puzzle,
          rating,
          solved: p.puzzle.solved + (solved ? 1 : 0),
          failed: p.puzzle.failed + (solved ? 0 : 1),
          streak,
          bestStreak: Math.max(p.puzzle.bestStreak, streak),
          history: [...p.puzzle.history, { t: Date.now(), r: rating }].slice(-300),
          seen: { ...p.puzzle.seen, [puzzle.id]: solved ? 1 : 0 },
        },
      }
    }, 'puzzles')
    setDelta(getProgress().puzzle.rating - before)
  }

  const onMove = (input: MoveInput): boolean => {
    if (!puzzle || status !== 'playing' || index % 2 === 0) return false
    const result = tryMove(fen, input)
    if (!result) return false
    const expected = puzzle.moves[index]
    const isLast = index === puzzle.moves.length - 1
    // Any checkmate is a full solution, even if it differs from the stored line.
    const correct = moveToUci(result.move) === expected || result.chess.isCheckmate()
    if (!correct) {
      record(false)
      setMessage(`${result.move.san} is not the best move. Try again, or view the solution.`)
      return false
    }
    setHint(null)
    setFen(result.chess.fen())
    setLastMove({ from: result.move.from, to: result.move.to })
    if (isLast || result.chess.isCheckmate()) {
      const firstTry = !rated.current
      if (firstTry) record(true)
      setStatus(firstTry || practice ? 'solved' : 'failed')
      setMessage(
        practice ? 'Solved! (Practice run: your rating is unchanged.)' : firstTry ? 'Correct! Puzzle solved. 🎉' : 'Solved, but it took more than one try. Keep practising!',
      )
      return true
    }
    setMessage(`${result.move.san} — correct! Keep going…`)
    const reply = puzzle.moves[index + 1]
    const afterFen = result.chess.fen()
    timers.schedule(() => {
      const r = tryMove(afterFen, parseUci(reply))
      if (!r) return
      setFen(r.chess.fen())
      setLastMove({ from: r.move.from, to: r.move.to })
      setIndex(index + 2)
    }, 450)
    return true
  }

  const showHint = () => {
    if (!puzzle) return
    record(false)
    setHint(puzzle.moves[index].slice(0, 2))
    setMessage('The highlighted piece is the one to move.')
  }

  const showSolution = () => {
    if (!puzzle) return
    record(false)
    setStatus('failed')
    timers.clear()
    let current = fen
    puzzle.moves.slice(index).forEach((uci, i) => {
      timers.schedule(() => {
        const r = tryMove(current, parseUci(uci))
        if (!r) return
        current = r.chess.fen()
        setFen(current)
        setLastMove({ from: r.move.from, to: r.move.to })
      }, 600 * (i + 1))
    })
    setMessage('Here is the solution. Study it, then try the next one.')
  }

  const solverColor = useMemo(() => (puzzle ? (puzzle.fen.split(' ')[1] === 'w' ? 'black' : 'white') : 'white'), [puzzle])
  const history = progress.puzzle.history

  return (
    <div>
      <PageHeader title="Puzzle trainer" subtitle="Tactics win games. Puzzles adapt to your rating — solve them on the first try to climb." subtitleOnPhone={false}>
        <div className="flex w-full items-baseline justify-between gap-3 md:block md:w-auto md:text-right">
          <p className="text-sm text-muted">Puzzle rating</p>
          <p className="text-2xl font-bold md:text-3xl">
            {progress.puzzle.rating}
            {delta !== null && delta !== 0 && <span className={`ml-2 text-base ${delta > 0 ? 'text-good' : 'text-bad'}`}>{delta > 0 ? `+${delta}` : delta}</span>}
          </p>
        </div>
      </PageHeader>

      <div className="no-scrollbar -mx-4 mb-3 flex gap-1.5 overflow-x-auto px-4 md:mx-0 md:mb-4 md:flex-wrap md:px-0">
        <ThemeChip active={theme === null} onClick={() => chooseTheme(null)}>
          🎯 Rated mix
        </ThemeChip>
        {PRACTICE_THEMES.map((t) => (
          <ThemeChip key={t} active={theme === t} onClick={() => chooseTheme(t)}>
            {THEME_LABELS[t]}
          </ThemeChip>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,560px)_1fr]">
        <div>
          {fen ? (
            <Board
              fen={fen}
              orientation={solverColor}
              movable={status === 'playing' && index % 2 === 1 ? (solverColor === 'white' ? 'w' : 'b') : false}
              onMove={onMove}
              lastMove={lastMove}
              highlights={hint ? { [hint]: 'rgba(95,184,95,0.65)' } : {}}
            />
          ) : (
            <Card className="flex aspect-square items-center justify-center p-6 text-center text-muted">
              {!puzzles ? 'Loading puzzles…' : theme ? `You've done every ${THEME_LABELS[theme] ?? theme} puzzle for now. Pick another theme to keep training.` : 'No puzzles available yet.'}
            </Card>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <Card>
            {puzzle && (
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="text-sm text-muted">Puzzle #{puzzle.id}</span>
                <Badge>Rating {status === 'playing' ? '?' : puzzle.rating}</Badge>
                <span className={`h-3 w-3 rounded-full ${solverColor === 'white' ? 'bg-white' : 'border border-line bg-black'}`} />
                <span className="text-sm">{solverColor === 'white' ? 'White' : 'Black'} to play</span>
              </div>
            )}
            <p
              className={`rounded-lg px-3 py-2 text-sm ${
                status === 'solved' ? 'bg-good/15 text-good' : status === 'failed' || message.includes('not the best') ? 'bg-bad/10 text-bad' : 'bg-panel-2'
              }`}
            >
              {puzzle ? message || 'Watch your opponent’s move…' : 'Pick a theme above to keep training.'}
            </p>
            {status !== 'playing' && puzzle && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {puzzle.themes.map((t) => (
                  <Badge key={t}>{THEME_LABELS[t] ?? t}</Badge>
                ))}
              </div>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
              {status === 'playing' ? (
                <>
                  <Button onClick={showHint} disabled={index % 2 === 0}>
                    💡 Hint
                  </Button>
                  <Button onClick={showSolution} disabled={index % 2 === 0}>
                    Show solution
                  </Button>
                  <Button variant="ghost" onClick={() => { record(false); nextPuzzle() }}>
                    Skip
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="primary" onClick={() => nextPuzzle()} disabled={!puzzles}>
                    Next puzzle →
                  </Button>
                  {puzzle && (
                    <>
                      <Button onClick={() => start(puzzle)}>↺ Retry</Button>
                      <Button variant="ghost" onClick={() => setShowCoach((s) => !s)}>
                        🤖 Explain
                      </Button>
                    </>
                  )}
                </>
              )}
            </div>
            <p className="mt-3 text-xs text-muted">
              {practice ? 'Practice run: this puzzle already counted, so your rating will not change.' : 'Hints, solutions and skips count as a miss for your rating.'}
            </p>
          </Card>

          {showCoach && puzzle && (
            <CoachPanel
              context={() => {
                // The puzzle starts after the opponent's move: give the coach that position and the solution in SAN.
                const setup = tryMove(puzzle.fen, parseUci(puzzle.moves[0]))
                const solverFen = setup ? setup.chess.fen() : puzzle.fen
                const solution = formatLine(solverFen, pvToSan(solverFen, puzzle.moves.slice(1), 20))
                return {
                  fen: solverFen,
                  activity: `Tactics puzzle rated ${puzzle.rating} (themes: ${puzzle.themes.map((t) => THEME_LABELS[t] ?? t).join(', ')}). The opponent has just played ${setup?.move.san ?? puzzle.moves[0]}. The winning solution for the side to move is: ${solution}. Explain the tactic in this solution.`,
                }
              }}
              suggestions={['Explain the solution', 'What pattern is this?', 'How can I spot this in my games?']}
            />
          )}

          <Card>
            <div className="grid grid-cols-3 gap-2 text-center">
              <Stat label="Solved" value={progress.puzzle.solved} />
              <Stat label="Streak" value={progress.puzzle.streak} />
              <Stat label="Best streak" value={progress.puzzle.bestStreak} />
            </div>
            {history.length > 1 && <Sparkline values={history.map((h) => h.r)} />}
          </Card>
        </div>
      </div>
    </div>
  )
}

function ThemeChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className={`shrink-0 whitespace-nowrap rounded-full border px-3 py-1 text-sm transition ${active ? 'border-accent bg-accent/20 text-accent' : 'border-line text-muted hover:text-ink'}`}>
      {children}
    </button>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-muted">{label}</p>
    </div>
  )
}

function Sparkline({ values }: { values: number[] }) {
  const recent = values.slice(-60)
  const min = Math.min(...recent) - 20
  const max = Math.max(...recent) + 20
  const points = recent.map((v, i) => `${(i / (recent.length - 1)) * 100},${40 - ((v - min) / (max - min)) * 40}`).join(' ')
  return (
    <div className="mt-4">
      <p className="mb-1 text-xs text-muted">Rating history (last {recent.length})</p>
      <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="h-16 w-full">
        <polyline points={points} fill="none" stroke="var(--color-accent)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  )
}
