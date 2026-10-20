// Full game review: accuracy, move classifications, key mistakes with the
// engine's better move, an evaluation graph and AI explanations.
import { useEffect, useMemo, useState } from 'react'
import { CLASSIFICATION_META, formatScore, parseUci, type Classification } from '../lib/chess'
import { getAnalysisEngine } from '../lib/engine'
import { analyseGame, reviewGame, sideAccuracy, type PositionEval, type ReviewedMove } from '../lib/review'
import Board from './Board'
import CoachPanel from './CoachPanel'
import EvalBar from './EvalBar'
import EvalGraph from './EvalGraph'
import MoveList from './MoveList'
import { Button, Card, ProgressBar } from './ui'

const COUNTED: Classification[] = ['best', 'excellent', 'good', 'book', 'inaccuracy', 'mistake', 'blunder']

export default function GameReview({
  startFen,
  sans,
  playerColor,
  opponent,
  onAccuracy,
  onPlayFrom,
}: {
  startFen: string
  sans: string[]
  playerColor: 'w' | 'b'
  opponent: string
  onAccuracy?: (accuracy: number) => void
  onPlayFrom?: (fen: string) => void
}) {
  const [evals, setEvals] = useState<PositionEval[] | null>(null)
  const [done, setDone] = useState(0)
  const [ply, setPly] = useState(0)

  useEffect(() => {
    let cancelled = false
    setEvals(null)
    analyseGame(getAnalysisEngine(), startFen, sans, 12, (d) => !cancelled && setDone(d), () => cancelled).then((result) => {
      if (cancelled) return
      setEvals(result)
      setPly(0)
    })
    return () => {
      cancelled = true
      getAnalysisEngine().stop()
    }
  }, [startFen, sans])

  const reviewed = useMemo(() => (evals ? reviewGame(startFen, sans, evals) : []), [evals, startFen, sans])
  const accuracy = useMemo(() => ({ w: sideAccuracy(reviewed, 'w'), b: sideAccuracy(reviewed, 'b') }), [reviewed])

  useEffect(() => {
    if (evals) onAccuracy?.(accuracy[playerColor])
    // Report once per finished analysis.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [evals])

  if (!evals) {
    return (
      <Card>
        <p className="font-semibold">Reviewing your game with Stockfish…</p>
        <p className="mb-3 text-sm text-muted">Every position is analysed to find your best moves and your mistakes.</p>
        <ProgressBar value={done / (sans.length + 1)} />
        <p className="mt-2 text-xs text-muted">
          {done}/{sans.length + 1} positions
        </p>
      </Card>
    )
  }

  const move: ReviewedMove | undefined = ply > 0 ? reviewed[ply - 1] : undefined
  const fen = evals[ply].fen
  const mine = reviewed.filter((m) => m.color === playerColor)
  const counts = Object.fromEntries(COUNTED.map((c) => [c, mine.filter((m) => m.classification === c).length])) as Record<Classification, number>
  const keyMoments = reviewed.filter((m) => m.color === playerColor && ['mistake', 'blunder', 'inaccuracy'].includes(m.classification))
  const marks = Object.fromEntries(
    reviewed.filter((m) => ['mistake', 'blunder'].includes(m.classification)).map((m) => [m.ply + 1, CLASSIFICATION_META[m.classification].color]),
  )
  const bestArrow = move && move.classification !== 'best' && move.classification !== 'book' && evals[ply - 1].bestMove ? parseUci(evals[ply - 1].bestMove) : null
  const startTurn = startFen.split(' ')[1]

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,560px)_1fr]">
      <div>
        <div className="flex gap-2">
          <EvalBar score={evals[ply].score} orientation={playerColor === 'w' ? 'white' : 'black'} />
          <div className="min-w-0 flex-1">
            <Board
              fen={fen}
              orientation={playerColor === 'w' ? 'white' : 'black'}
              lastMove={move ? parseUci(move.uci) : null}
              arrows={bestArrow ? [{ from: bestArrow.from, to: bestArrow.to, color: 'rgba(95,184,95,0.85)' }] : []}
            />
          </div>
        </div>
        <div className="mt-3 flex items-center justify-center gap-2">
          <Button onClick={() => setPly(0)} disabled={ply === 0} aria-label="Start">
            ⏮
          </Button>
          <Button onClick={() => setPly((p) => Math.max(0, p - 1))} disabled={ply === 0} aria-label="Previous">
            ◀
          </Button>
          <Button variant="primary" onClick={() => setPly((p) => Math.min(sans.length, p + 1))} disabled={ply === sans.length} aria-label="Next">
            ▶
          </Button>
          <Button onClick={() => setPly(sans.length)} disabled={ply === sans.length} aria-label="End">
            ⏭
          </Button>
        </div>
        <div className="mt-3">
          <EvalGraph scores={evals.map((e) => e.score)} current={ply} onSelect={setPly} marks={marks} />
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-4">
        <Card>
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className={playerColor === 'w' ? 'rounded-lg bg-accent/10 p-2' : 'p-2'}>
              <p className="text-xs text-muted">{playerColor === 'w' ? 'You' : opponent} (White)</p>
              <p className="text-3xl font-bold">{accuracy.w}%</p>
              <p className="text-xs text-muted">accuracy</p>
            </div>
            <div className={playerColor === 'b' ? 'rounded-lg bg-accent/10 p-2' : 'p-2'}>
              <p className="text-xs text-muted">{playerColor === 'b' ? 'You' : opponent} (Black)</p>
              <p className="text-3xl font-bold">{accuracy.b}%</p>
              <p className="text-xs text-muted">accuracy</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-4 gap-2 text-center text-xs sm:grid-cols-7">
            {COUNTED.map((c) => (
              <div key={c}>
                <p className="text-lg font-bold" style={{ color: CLASSIFICATION_META[c].color }}>
                  {counts[c]}
                </p>
                <p className="text-muted">{CLASSIFICATION_META[c].label}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          {move ? (
            <div className="space-y-1 text-sm">
              <p className="text-base font-semibold" style={{ color: CLASSIFICATION_META[move.classification].color }}>
                {CLASSIFICATION_META[move.classification].symbol} {move.san} — {CLASSIFICATION_META[move.classification].label}
              </p>
              <p className="text-muted">
                Evaluation {formatScore(move.before)} → {formatScore(move.after)} (White's view)
              </p>
              {move.classification !== 'best' && move.classification !== 'book' && move.bestSan && (
                <p>
                  Best was <span className="font-semibold text-good">{move.bestSan}</span>
                  {move.bestLine.length > 1 && <span className="text-muted"> — line: {move.bestLine.join(' ')}</span>}
                </p>
              )}
              {['mistake', 'blunder'].includes(move.classification) && move.color === playerColor && onPlayFrom && (
                <Button className="mt-2" onClick={() => onPlayFrom(evals[ply - 1].fen)}>
                  ↺ Retry from this position
                </Button>
              )}
            </div>
          ) : (
            <p className="text-sm text-muted">Step through the game or click a move. Green arrows show the engine's better move.</p>
          )}
        </Card>

        {keyMoments.length > 0 && (
          <Card className="p-4">
            <p className="mb-2 text-sm font-semibold">Your key moments</p>
            <div className="flex flex-wrap gap-1.5">
              {keyMoments.map((m) => (
                <button
                  key={m.ply}
                  onClick={() => setPly(m.ply + 1)}
                  className="rounded-full border px-2.5 py-1 text-xs hover:bg-panel-2"
                  style={{ borderColor: CLASSIFICATION_META[m.classification].color }}
                >
                  {Math.floor(m.ply / 2) + 1}
                  {m.color === 'w' ? '.' : '...'} {m.san} {CLASSIFICATION_META[m.classification].symbol}
                </button>
              ))}
            </div>
          </Card>
        )}

        <Card className="max-h-64 overflow-y-auto p-3">
          <MoveList
            moves={reviewed.map((m) => m.san)}
            classes={reviewed.map((m) => m.classification)}
            current={ply - 1}
            onSelect={(i) => setPly(i + 1)}
            startMoveNumber={Number(startFen.split(' ')[5]) || 1}
            blackFirst={startTurn === 'b'}
          />
        </Card>

        <CoachPanel
          context={() => ({
            fen: ply > 0 ? evals[ply - 1].fen : fen,
            activity: move
              ? `Reviewing a game against ${opponent}. In this position ${move.color === playerColor ? 'the student' : 'the opponent'} played ${move.san}, classified as "${CLASSIFICATION_META[move.classification].label}" (evaluation went from ${formatScore(move.before)} to ${formatScore(move.after)}, White's view). Stockfish preferred ${move.bestSan || 'the same move'}.`
              : `Reviewing a game against ${opponent}, at the starting position.`,
            history: sans.slice(0, Math.max(0, ply - 1)),
            startFen,
          })}
          suggestions={['Why was this move bad?', 'What was the idea behind the best move?', 'What should I learn from this game?']}
        />
      </div>
    </div>
  )
}
