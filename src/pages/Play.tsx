import { Chess } from 'chess.js'
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import Board from '../components/Board'
import CoachPanel from '../components/CoachPanel'
import EvalBar from '../components/EvalBar'
import GameReview from '../components/GameReview'
import { BulbIcon, ChartIcon, ChatIcon, FlagIcon, FlipIcon, HandshakeIcon, UndoIcon } from '../components/icons'
import MoveList from '../components/MoveList'
import { Button, Card, Notice, PageHeader } from '../components/ui'
import { botMove, BOTS, type Bot } from '../lib/bots'
import { gameOverReason, material, parseUci, START_FEN, whiteScore, winPercent, type MoveInput } from '../lib/chess'
import { getAnalysisEngine, getPlayEngine, type Score } from '../lib/engine'
import { useImmersive } from '../lib/shell'
import { updateProgress, useProgress } from '../lib/storage'

interface GameSetup {
  id: number
  bot: Bot
  color: 'w' | 'b'
  startFen: string
  coachMode: boolean
  showEval: boolean
}

interface Played {
  san: string
  from: string
  to: string
  fen: string
}

type Phase = 'setup' | 'playing' | 'over' | 'review'

export default function Play() {
  const progress = useProgress()
  const [phase, setPhase] = useState<Phase>('setup')
  const [setup, setSetup] = useState<GameSetup | null>(null)
  const [botLevel, setBotLevel] = useState(() => {
    const lastWin = [...progress.games].reverse().find((g) => g.result === 'win')
    return lastWin ? Math.min(BOTS.length, lastWin.botLevel + 1) : 1
  })
  const [colorChoice, setColorChoice] = useState<'w' | 'b' | 'random'>('w')
  const [coachMode, setCoachMode] = useState(true)
  const [showEval, setShowEval] = useState(false)

  const startGame = (startFen = START_FEN, color?: 'w' | 'b') => {
    const bot = BOTS[botLevel - 1]
    const side = color ?? (colorChoice === 'random' ? (Math.random() < 0.5 ? 'w' : 'b') : colorChoice)
    setSetup({ id: Date.now(), bot, color: side, startFen, coachMode, showEval })
    setPhase('playing')
  }

  if (phase === 'setup' || !setup) {
    return (
      <div>
        <PageHeader title="Play vs computer" subtitle="Pick an opponent a little stronger than you. Beat them twice in a row, then move up a level." />
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {BOTS.map((bot) => {
              const record = progress.games.filter((g) => g.botLevel === bot.level)
              const wins = record.filter((g) => g.result === 'win').length
              return (
                <button
                  key={bot.level}
                  onClick={() => setBotLevel(bot.level)}
                  className={`rounded-xl border p-3 text-left transition ${botLevel === bot.level ? 'border-accent bg-accent/10' : 'border-line bg-panel hover:border-muted'}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{bot.avatar}</span>
                    <div>
                      <p className="font-semibold">
                        {bot.name} <span className="text-sm font-normal text-muted">· {bot.elo}</span>
                      </p>
                      <p className="text-xs text-muted">Level {bot.level}</p>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-muted">{bot.blurb}</p>
                  {record.length > 0 && (
                    <p className="mt-1 text-xs">
                      {wins}/{record.length} won {wins > 0 && '🏅'}
                    </p>
                  )}
                </button>
              )
            })}
          </div>
          <Card className="h-fit space-y-5 lg:sticky lg:top-6">
            <div>
              <p className="mb-2 text-sm font-semibold">Play as</p>
              <div className="grid grid-cols-3 gap-2">
                {(['w', 'random', 'b'] as const).map((c) => (
                  <Button key={c} variant={colorChoice === c ? 'primary' : 'secondary'} onClick={() => setColorChoice(c)}>
                    {c === 'w' ? '♔ White' : c === 'b' ? '♚ Black' : '🎲'}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-semibold">Training aids</p>
              <Toggle checked={coachMode} onChange={setCoachMode} label="Blunder alert" hint="Warns you after a big mistake and lets you take it back." />
              <Toggle checked={showEval} onChange={setShowEval} label="Show evaluation bar" hint="Shows who is better. Turn off for a real-game feel." />
            </div>
            <Button variant="primary" className="w-full py-3 text-base" onClick={() => startGame()}>
              Play {BOTS[botLevel - 1].name} ({BOTS[botLevel - 1].elo}) →
            </Button>
            <p className="text-xs text-muted">Hints and takebacks are always available — use them to learn, then try to win without them.</p>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <GameView
      key={setup.id}
      setup={setup}
      onNewGame={() => setPhase('setup')}
      onPlayFrom={(fen) => {
        setSetup({ ...setup, id: Date.now(), startFen: fen, color: fen.split(' ')[1] as 'w' | 'b' })
      }}
    />
  )
}

function Toggle({ checked, onChange, label, hint }: { checked: boolean; onChange: (v: boolean) => void; label: string; hint: string }) {
  return (
    <label className="flex cursor-pointer items-start gap-3">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="mt-1 h-4 w-4 accent-[var(--color-accent)]" />
      <span>
        <span className="block text-sm">{label}</span>
        <span className="block text-xs text-muted">{hint}</span>
      </span>
    </label>
  )
}

function GameView({ setup, onNewGame, onPlayFrom }: { setup: GameSetup; onNewGame: () => void; onPlayFrom: (fen: string) => void }) {
  const { bot, color, startFen } = setup
  const [moves, setMoves] = useState<Played[]>([])
  const [phase, setPhase] = useState<Phase>('playing')
  const [result, setResult] = useState<{ text: string; outcome: 'win' | 'loss' | 'draw' } | null>(null)
  const [orientation, setOrientation] = useState<'white' | 'black'>(color === 'w' ? 'white' : 'black')
  const [hintArrow, setHintArrow] = useState<MoveInput | null>(null)
  const [evalScore, setEvalScore] = useState<Score | null>(null)
  const [warning, setWarning] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [thinking, setThinking] = useState(false)
  const [showEval, setShowEval] = useState(setup.showEval)
  const [showCoach, setShowCoach] = useState(false)
  const recorded = useRef(false)
  const gameId = useRef(String(setup.id))
  const evalCache = useRef(new Map<string, Promise<Score | null>>())

  useImmersive(phase === 'playing')

  const fen = moves.length ? moves[moves.length - 1].fen : startFen
  const chess = useMemo(() => new Chess(fen), [fen])
  const turn = chess.turn()
  const sans = useMemo(() => moves.map((m) => m.san), [moves])
  const last = moves[moves.length - 1]

  const pgn = useCallback((outcome: 'win' | 'loss' | 'draw') => {
    const g = new Chess(startFen)
    for (const m of moves) g.move(m.san)
    g.setHeader('Event', 'Chess Master training game')
    g.setHeader('White', color === 'w' ? 'You' : `${bot.name} (${bot.elo})`)
    g.setHeader('Black', color === 'b' ? 'You' : `${bot.name} (${bot.elo})`)
    if (startFen !== START_FEN) {
      g.setHeader('SetUp', '1')
      g.setHeader('FEN', startFen)
    }
    const whiteWon = (outcome === 'win') === (color === 'w')
    g.setHeader('Result', outcome === 'draw' ? '1/2-1/2' : whiteWon ? '1-0' : '0-1')
    return g.pgn()
  }, [moves, startFen, color, bot])

  const finish = useCallback(
    (text: string, outcome: 'win' | 'loss' | 'draw') => {
      setResult({ text, outcome })
      setPhase('over')
      if (recorded.current) return
      recorded.current = true
      updateProgress(
        (p) => ({
          ...p,
          games: [...p.games, { id: gameId.current, date: Date.now(), botLevel: bot.level, botElo: bot.elo, color: color === 'w' ? ('white' as const) : ('black' as const), result: outcome, pgn: pgn(outcome) }].slice(-200),
        }),
        'games',
      )
    },
    [bot, color, pgn],
  )

  // Detect game end after every move.
  useEffect(() => {
    if (phase !== 'playing') return
    const reason = gameOverReason(chess)
    if (!reason) return
    const outcome = chess.isCheckmate() ? (chess.turn() === color ? 'loss' : 'win') : 'draw'
    finish(reason, outcome)
  }, [chess, phase, color, finish])

  // Evaluate positions (for the eval bar and blunder alerts).
  // Shared per position, so the eval bar and the blunder alert never race each other.
  const evaluate = useCallback((position: string): Promise<Score | null> => {
    const cached = evalCache.current.get(position)
    if (cached) return cached
    const c = new Chess(position)
    if (c.isGameOver()) return Promise.resolve(null)
    const job = getAnalysisEngine()
      .analyse(position, { depth: 11 })
      .then((res) => {
        const line = res.lines[0]
        if (!line || line.depth < 8) {
          // Interrupted search: allow a retry later.
          evalCache.current.delete(position)
          return null
        }
        return whiteScore(line.score, c.turn())
      })
    evalCache.current.set(position, job)
    return job
  }, [])

  useEffect(() => {
    if (!showEval && !setup.coachMode) return
    let live = true
    evaluate(fen).then((s) => live && s && setEvalScore(s))
    return () => {
      live = false
    }
  }, [fen, showEval, setup.coachMode, evaluate])

  // The bot moves when it is its turn (and no blunder alert is waiting).
  useEffect(() => {
    if (phase !== 'playing' || turn === color || warning) return
    let live = true
    setThinking(true)
    const started = Date.now()
    botMove(getPlayEngine(), bot, fen).then((uci) => {
      const delay = Math.max(0, 450 - (Date.now() - started))
      window.setTimeout(() => {
        if (!live || !uci) return
        const c = new Chess(fen)
        try {
          const m = c.move(parseUci(uci))
          setMoves((prev) => [...prev, { san: m.san, from: m.from, to: m.to, fen: c.fen() }])
        } catch {
          // Engine returned an unexpected move; ignore.
        }
        setThinking(false)
      }, delay)
    })
    return () => {
      live = false
    }
  }, [fen, turn, color, phase, bot, warning])

  const onMove = (input: MoveInput): boolean => {
    if (phase !== 'playing' || turn !== color || warning) return false
    const c = new Chess(fen)
    let m
    try {
      m = c.move(input)
    } catch {
      return false
    }
    const before = fen
    const after = c.fen()
    setHintArrow(null)
    setNotice(null)
    if (setup.coachMode && !c.isGameOver()) {
      // Hold the bot until we know whether this move was a blunder.
      setWarning('checking')
      Promise.all([evaluate(before), evaluate(after)]).then(([sb, sa]) => {
        if (sb && sa) {
          const mover = (s: Score) => (color === 'w' ? s : s.mate !== undefined ? { mate: -s.mate } : { cp: -(s.cp ?? 0) })
          const loss = winPercent(mover(sb)) - winPercent(mover(sa))
          if (loss >= 25) {
            const lostMaterial = material(before)[color === 'w' ? 'white' : 'black'] - material(after)[color === 'w' ? 'white' : 'black']
            setWarning(
              `⚠️ ${m.san} looks like a ${loss >= 35 ? 'blunder' : 'mistake'}${lostMaterial > 0 ? '' : ' — your opponent may have a strong reply'}. Check what your opponent can do now (checks, captures, threats). Take it back and find something better?`,
            )
            return
          }
        }
        setWarning(null)
      })
    }
    setMoves((prev) => [...prev, { san: m.san, from: m.from, to: m.to, fen: after }])
    return true
  }

  const takeBack = () => {
    setWarning(null)
    setHintArrow(null)
    setMoves((prev) => {
      if (!prev.length) return prev
      // Undo back to the learner's turn.
      const lastFen = (list: Played[]) => (list.length ? list[list.length - 1].fen : startFen)
      let next = prev.slice(0, -1)
      while (next.length && new Chess(lastFen(next)).turn() !== color) next = next.slice(0, -1)
      if (new Chess(lastFen(next)).turn() !== color) return prev
      return next
    })
  }

  const hint = async () => {
    const res = await getAnalysisEngine().analyse(fen, { depth: 14, interrupt: true })
    if (res.fen === fen && res.bestMove) setHintArrow(parseUci(res.bestMove))
  }

  const resign = () => finish('You resigned', 'loss')
  const offerDraw = async () => {
    const s = await evaluate(fen)
    const forBot = s ? (color === 'w' ? -(s.cp ?? 0) : s.cp ?? 0) : 0
    if (moves.length >= 30 && s && s.mate === undefined && forBot <= 30) finish('Draw agreed', 'draw')
    else setNotice(`${bot.name} declines the draw offer — there is still play left in this position.`)
  }

  const captured = useMemo(() => {
    const m = material(fen)
    return { white: m.white - m.black, black: m.black - m.white }
  }, [fen])

  if (phase === 'review') {
    return (
      <div>
        <PageHeader title="Game review" subtitle={`You vs ${bot.name} (${bot.elo}) — ${result?.text ?? ''}`}>
          <div className="flex gap-2">
            <Button onClick={() => setPhase('over')}>← Back to game</Button>
            <Button variant="primary" onClick={onNewGame}>
              New game
            </Button>
          </div>
        </PageHeader>
        <GameReview
          startFen={startFen}
          sans={sans}
          playerColor={color}
          opponent={`${bot.name} (${bot.elo})`}
          onAccuracy={(accuracy) =>
            updateProgress((p) => ({ ...p, games: p.games.map((g) => (g.id === gameId.current ? { ...g, accuracy } : g)) }))
          }
          onPlayFrom={onPlayFrom}
        />
      </div>
    )
  }

  const player = (side: 'w' | 'b') => {
    const isBot = side !== color
    const diff = side === 'w' ? captured.white : captured.black
    return (
      <div className="flex items-center justify-between rounded-lg bg-panel px-3 py-1.5 md:py-2">
        <div className="flex items-center gap-2">
          <span className="text-lg md:text-xl">{isBot ? bot.avatar : '🧑'}</span>
          <span className="text-sm font-semibold md:text-base">{isBot ? `${bot.name} (${bot.elo})` : 'You'}</span>
          {isBot && thinking && <span className="animate-pulse text-xs text-muted">thinking…</span>}
        </div>
        {diff > 0 && <span className="text-sm text-muted">+{diff}</span>}
      </div>
    )
  }
  const top = orientation === 'white' ? 'b' : 'w'
  const flip = () => setOrientation((o) => (o === 'white' ? 'black' : 'white'))

  return (
    <div className="grid gap-4 md:gap-6 lg:grid-cols-[minmax(0,600px)_1fr]">
      <div className="space-y-1.5 md:space-y-2">
        <MoveStrip sans={sans} startFen={startFen} />
        {player(top)}
        <div className="flex gap-2">
          {showEval && <EvalBar score={evalScore} orientation={orientation} />}
          <div className="min-w-0 flex-1">
            <Board
              fen={fen}
              orientation={orientation}
              movable={phase === 'playing' && !warning ? color : false}
              onMove={onMove}
              lastMove={last ? { from: last.from, to: last.to } : null}
              arrows={hintArrow ? [{ from: hintArrow.from, to: hintArrow.to, color: 'rgba(95,184,95,0.85)' }] : []}
            />
          </div>
        </div>
        {player(top === 'w' ? 'b' : 'w')}
      </div>

      <div className="flex min-w-0 flex-col gap-4">
        {result && (
          <Card className={result.outcome === 'win' ? 'border-good/60' : result.outcome === 'loss' ? 'border-bad/60' : ''}>
            <p className="text-xl font-bold">{result.outcome === 'win' ? '🏆 You won!' : result.outcome === 'loss' ? 'Game over' : '🤝 Draw'}</p>
            <p className="text-muted">{result.text}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button variant="primary" onClick={() => setPhase('review')}>
                🔍 Review game
              </Button>
              <Button onClick={onNewGame}>New game</Button>
            </div>
            <p className="mt-3 text-xs text-muted">Always review your games — it is the fastest way to improve.</p>
          </Card>
        )}

        {warning && warning !== 'checking' && phase === 'playing' && (
          <Notice kind="warn">
            <p>{warning}</p>
            <div className="mt-2 flex gap-2">
              <Button variant="primary" onClick={takeBack}>
                ↶ Take it back
              </Button>
              <Button onClick={() => setWarning(null)}>Keep my move</Button>
            </div>
          </Notice>
        )}
        {notice && phase === 'playing' && <Notice>{notice}</Notice>}

        {phase === 'playing' && (
          <Card className="hidden p-4 md:block">
            <p className="mb-3 text-sm text-muted">{turn === color ? 'Your move.' : `${bot.name} is thinking…`}</p>
            <div className="flex flex-wrap gap-2">
              <Button onClick={hint} disabled={turn !== color || !!warning}>
                💡 Hint
              </Button>
              <Button onClick={takeBack} disabled={!moves.length || warning === 'checking'}>
                ↶ Takeback
              </Button>
              <Button onClick={flip}>⇅ Flip</Button>
              <Button onClick={() => setShowEval((s) => !s)}>{showEval ? 'Hide eval' : 'Show eval'}</Button>
              <Button onClick={offerDraw}>½ Draw</Button>
              <Button variant="danger" onClick={resign}>
                Resign
              </Button>
            </div>
          </Card>
        )}

        <Card className="hidden max-h-72 overflow-y-auto p-3 md:block">
          {moves.length ? (
            <MoveList moves={sans} current={moves.length - 1} startMoveNumber={Number(startFen.split(' ')[5]) || 1} blackFirst={startFen.split(' ')[1] === 'b'} />
          ) : (
            <p className="text-sm text-muted">{color === 'w' ? 'You have White — make the first move. Tip: start with a centre pawn (e4 or d4).' : `${bot.name} has White and moves first.`}</p>
          )}
        </Card>
        {!moves.length && (
          <p className="text-center text-sm text-muted md:hidden">
            {color === 'w' ? 'You have White: make the first move. Tip: start with a centre pawn (e4 or d4).' : `${bot.name} has White and moves first.`}
          </p>
        )}

        <div>
          {/* Phones use the Coach button in the game toolbar instead. */}
          <div className="hidden md:block">
            <Button variant="ghost" onClick={() => setShowCoach((s) => !s)}>
              🤖 {showCoach ? 'Hide coach' : 'Ask the coach about this position'}
            </Button>
          </div>
          {showCoach && (
            <div className="md:mt-2">
              <CoachPanel
                compact
                context={() => ({
                  fen,
                  activity: `Playing a game as ${color === 'w' ? 'White' : 'Black'} against a ${bot.elo}-rated computer opponent. Help the student think, but do not simply give away the best move unless asked.`,
                  history: sans,
                  startFen,
                })}
                suggestions={['What should I be thinking about?', 'Is anything of mine in danger?', 'What is my opponent planning?']}
              />
            </div>
          )}
        </div>
      </div>

      {/* Phone game toolbar, in place of the tab bar while a game is on. */}
      {phase === 'playing' && (
        <nav className="chrome fixed inset-x-0 bottom-0 z-30 flex justify-around border-t border-line/70 bg-panel/90 pb-[calc(env(safe-area-inset-bottom)+0.25rem)] pt-1.5 backdrop-blur-xl md:hidden">
          <ToolButton label="Hint" onClick={hint} disabled={turn !== color || !!warning}>
            <BulbIcon />
          </ToolButton>
          <ToolButton label="Undo" onClick={takeBack} disabled={!moves.length || warning === 'checking'}>
            <UndoIcon />
          </ToolButton>
          <ToolButton label="Flip" onClick={flip}>
            <FlipIcon />
          </ToolButton>
          <ToolButton label="Eval" onClick={() => setShowEval((s) => !s)} active={showEval}>
            <ChartIcon />
          </ToolButton>
          <ToolButton label="Coach" onClick={() => setShowCoach((s) => !s)} active={showCoach}>
            <ChatIcon />
          </ToolButton>
          <ToolButton label="Draw" onClick={offerDraw}>
            <HandshakeIcon />
          </ToolButton>
          <ToolButton label="Resign" onClick={() => window.confirm('Resign this game?') && resign()} danger>
            <FlagIcon />
          </ToolButton>
        </nav>
      )}
    </div>
  )
}

function ToolButton({
  label,
  onClick,
  disabled,
  active,
  danger,
  children,
}: {
  label: string
  onClick: () => void
  disabled?: boolean
  active?: boolean
  danger?: boolean
  children: ReactNode
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex min-w-[2.75rem] flex-col items-center gap-0.5 rounded-lg px-1 py-0.5 text-[10.5px] font-medium transition active:scale-95 disabled:opacity-35 ${
        active ? 'text-accent' : danger ? 'text-bad' : 'text-muted'
      }`}
    >
      {children}
      {label}
    </button>
  )
}

/** Phone move list: one swipeable row that follows the latest move. */
function MoveStrip({ sans, startFen }: { sans: string[]; startFen: string }) {
  const strip = useRef<HTMLDivElement>(null)
  useEffect(() => {
    strip.current?.scrollTo({ left: strip.current.scrollWidth, behavior: 'smooth' })
  }, [sans.length])
  if (!sans.length) return null
  const startNo = Number(startFen.split(' ')[5]) || 1
  const offset = startFen.split(' ')[1] === 'b' ? 1 : 0
  return (
    <div ref={strip} className="no-scrollbar flex gap-1 overflow-x-auto whitespace-nowrap px-1 font-mono text-[13px] md:hidden">
      {sans.map((san, i) => {
        const white = (i + offset) % 2 === 0
        const no = startNo + Math.floor((i + offset) / 2)
        const last = i === sans.length - 1
        return (
          <span key={i} className={`rounded px-1.5 py-0.5 ${last ? 'bg-accent/25 text-ink' : 'text-muted'}`}>
            {white ? `${no}.` : i === 0 ? `${no}…` : ''}
            {san}
          </span>
        )
      })}
    </div>
  )
}
