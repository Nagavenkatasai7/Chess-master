// Chat with the AI coach about the current position. Each question is sent
// together with the position and a fresh Stockfish analysis.
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AiError, COACH_SYSTEM_PROMPT, streamChat, useCoachAvailable, type ChatMessage } from '../lib/ai'
import { buildCoachPrompt, type CoachContext } from '../lib/coach'
import { Markdown } from '../lib/markdown'
import { estimateRating } from '../lib/rating'
import { getProgress } from '../lib/storage'
import { Button } from './ui'

interface Turn {
  question: string
  answer: string
  model?: string
  error?: string
}

export default function CoachPanel({
  context,
  suggestions = ['What is the best plan here?', 'Explain the last move', 'What are the threats?'],
  compact = false,
}: {
  context: () => CoachContext
  suggestions?: string[]
  compact?: boolean
}) {
  const { available } = useCoachAvailable()
  const [turns, setTurns] = useState<Turn[]>([])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const abort = useRef<AbortController | null>(null)
  const scroller = useRef<HTMLDivElement>(null)

  useEffect(() => () => abort.current?.abort(), [])
  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: 'smooth' })
  }, [turns])

  const ask = async (question: string) => {
    if (!question.trim() || busy) return
    setInput('')
    setBusy(true)
    const index = turns.length
    setTurns((t) => [...t, { question, answer: '' }])
    const controller = new AbortController()
    abort.current = controller
    try {
      const rating = estimateRating(getProgress()).rating || 400
      const prompt = await buildCoachPrompt(context(), question, rating)
      const history: ChatMessage[] = turns.slice(-4).flatMap((t) =>
        t.answer ? [{ role: 'user' as const, content: t.question }, { role: 'assistant' as const, content: t.answer }] : [],
      )
      const messages: ChatMessage[] = [{ role: 'system', content: COACH_SYSTEM_PROMPT }, ...history, { role: 'user', content: prompt }]
      const { model } = await streamChat(
        messages,
        (token) => setTurns((t) => t.map((turn, i) => (i === index ? { ...turn, answer: turn.answer + token } : turn))),
        controller.signal,
      )
      setTurns((t) => t.map((turn, i) => (i === index ? { ...turn, model } : turn)))
    } catch (e) {
      if (controller.signal.aborted) return
      const message = e instanceof AiError ? e.message : `Could not reach OpenRouter: ${(e as Error).message}`
      setTurns((t) => t.map((turn, i) => (i === index ? { ...turn, error: message } : turn)))
    } finally {
      setBusy(false)
    }
  }

  if (!available) {
    return (
      <div className="rounded-xl border border-line bg-panel-2/60 p-4 text-sm">
        <p className="font-semibold">🤖 AI Coach</p>
        <p className="mt-1 text-muted">
          Get plain-English explanations of any position from a free AI model. Add your free OpenRouter API key in{' '}
          <Link to="/settings" className="text-accent underline">
            Settings
          </Link>{' '}
          to turn it on.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col rounded-xl border border-line bg-panel-2/60">
      <div className="flex items-center justify-between border-b border-line px-4 py-2">
        <p className="text-sm font-semibold">🤖 AI Coach</p>
        {turns.length > 0 && (
          <button className="text-xs text-muted hover:text-ink" onClick={() => setTurns([])}>
            Clear
          </button>
        )}
      </div>
      <div ref={scroller} className={`space-y-4 overflow-y-auto px-4 py-3 ${compact ? 'max-h-64' : 'max-h-96'}`}>
        {turns.length === 0 && <p className="text-sm text-muted">Ask anything about this position. The coach sees the board and Stockfish's analysis.</p>}
        {turns.map((t, i) => (
          <div key={i} className="space-y-2">
            <p className="ml-auto w-fit max-w-[90%] rounded-xl rounded-br-sm bg-accent/20 px-3 py-2 text-sm">{t.question}</p>
            {t.error ? (
              <p className="rounded-xl bg-bad/15 px-3 py-2 text-sm text-bad">{t.error}</p>
            ) : (
              <div className="rounded-xl rounded-bl-sm bg-panel px-3 py-2 text-sm">
                {t.answer ? <Markdown text={t.answer} /> : <span className="animate-pulse text-muted">Thinking…</span>}
                {t.model && <p className="mt-2 text-[11px] text-muted">via {t.model}</p>}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-1.5 px-4 pb-2">
        {suggestions.map((s) => (
          <button
            key={s}
            disabled={busy}
            onClick={() => ask(s)}
            className="rounded-full border border-line px-2.5 py-1 text-xs text-muted hover:border-accent hover:text-ink disabled:opacity-40"
          >
            {s}
          </button>
        ))}
      </div>
      <form
        className="flex gap-2 border-t border-line p-3"
        onSubmit={(e) => {
          e.preventDefault()
          ask(input)
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask the coach…"
          className="min-w-0 flex-1 rounded-lg border border-line bg-panel px-3 py-2 text-sm outline-none focus:border-accent"
        />
        {busy ? (
          <Button type="button" onClick={() => abort.current?.abort()}>
            Stop
          </Button>
        ) : (
          <Button type="submit" variant="primary" disabled={!input.trim()}>
            Ask
          </Button>
        )}
      </form>
    </div>
  )
}
