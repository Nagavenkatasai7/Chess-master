// Drill an opening line from memory: the learner plays their side's moves,
// the app answers with the book replies and shows the idea behind each move.
import { useEffect, useMemo, useRef, useState } from 'react'
import type { Opening, OpeningLine } from '../data/types'
import { buildSteps, moveToUci, parseUci, sanToUci, START_FEN, tryMove, type MoveInput } from '../lib/chess'
import { Markdown } from '../lib/markdown'
import Board from './Board'
import MoveList from './MoveList'
import { Button } from './ui'

export default function OpeningDrill({ opening, line, onComplete }: { opening: Opening; line: OpeningLine; onComplete: (perfect: boolean) => void }) {
  const learner = opening.side === 'white' ? 'w' : 'b'
  const steps = useMemo(() => buildSteps(START_FEN, line.moves), [line])
  const [ply, setPly] = useState(0)
  const [mistakes, setMistakes] = useState(0)
  const [wrongHere, setWrongHere] = useState(0)
  const [message, setMessage] = useState<{ kind: 'good' | 'bad' | 'info'; text: string } | null>(null)
  const [done, setDone] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  const last = ply === 0 ? null : (steps[ply - 1] ?? null)
  const fen = last?.fen ?? START_FEN
  const isLearnerTurn = !done && ply < steps.length && fen.split(' ')[1] === learner

  const restart = () => {
    window.clearTimeout(timer.current)
    setPly(0)
    setMistakes(0)
    setWrongHere(0)
    setDone(false)
    setMessage({ kind: 'info', text: `Play the ${opening.name} from memory as ${opening.side === 'white' ? 'White' : 'Black'}.` })
  }

  useEffect(() => {
    restart()
    return () => window.clearTimeout(timer.current)
    // Restart whenever a different line is chosen.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [line])

  // Opponent's book replies.
  useEffect(() => {
    if (done || ply >= steps.length || fen.split(' ')[1] === learner) return
    timer.current = window.setTimeout(() => setPly((p) => p + 1), 500)
    return () => window.clearTimeout(timer.current)
  }, [ply, fen, learner, done, steps.length])

  const onMove = (input: MoveInput): boolean => {
    if (!isLearnerTurn) return false
    const result = tryMove(fen, input)
    if (!result) return false
    const expected = sanToUci(fen, line.moves[ply])
    if (moveToUci(result.move) !== expected) {
      setMistakes((m) => m + 1)
      setWrongHere((w) => w + 1)
      setMessage({ kind: 'bad', text: `${result.move.san} is playable in some positions, but it isn't the book move here. Try again.` })
      return false
    }
    const nextPly = ply + 1
    setWrongHere(0)
    setPly(nextPly)
    if (nextPly >= steps.length) {
      setDone(true)
      const perfect = mistakes === 0
      setMessage({ kind: 'good', text: perfect ? 'Perfect! Line complete with no mistakes. 🎉' : `Line complete with ${mistakes} mistake${mistakes === 1 ? '' : 's'}. Drill it again to lock it in.` })
      onComplete(perfect)
    } else {
      setMessage({ kind: 'good', text: `${result.move.san} ✓` })
    }
    return true
  }

  const reveal = wrongHere >= 2 && isLearnerTurn ? parseUci(sanToUci(fen, line.moves[ply]) ?? '') : null
  const note = line.notes?.[ply]

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,460px)_1fr]">
      <Board
        fen={fen}
        orientation={opening.side}
        movable={isLearnerTurn ? learner : false}
        onMove={onMove}
        lastMove={last}
        arrows={reveal ? [{ from: reveal.from, to: reveal.to, color: 'rgba(95,184,95,0.85)' }] : []}
      />
      <div className="flex min-w-0 flex-col gap-3">
        {message && (
          <p className={`rounded-lg px-3 py-2 text-sm ${message.kind === 'good' ? 'bg-good/15 text-good' : message.kind === 'bad' ? 'bg-bad/15 text-bad' : 'bg-info/15 text-info'}`}>
            {message.text}
          </p>
        )}
        {reveal && <p className="text-sm text-muted">The green arrow shows the book move.</p>}
        {note && (
          <div className="rounded-lg border border-line bg-panel-2/50 p-3 text-sm">
            <Markdown text={note} />
          </div>
        )}
        <div className="max-h-52 overflow-y-auto rounded-lg bg-panel-2/40 p-2">
          <MoveList moves={steps.slice(0, ply).map((s) => s.san)} current={ply - 1} />
        </div>
        <div className="flex gap-2">
          <Button onClick={restart}>↺ Restart line</Button>
        </div>
      </div>
    </div>
  )
}
