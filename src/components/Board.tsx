// Interactive chessboard: drag-and-drop or click-to-move, legal-move dots,
// last-move and check highlights, arrows, "star" targets and a promotion picker.
import { Chess, type Square } from 'chess.js'
import { useMemo, useState, type CSSProperties } from 'react'
import { Chessboard, defaultPieces, type Arrow } from 'react-chessboard'
import { kingSquare, type MoveInput } from '../lib/chess'
import { useSettings, type Settings } from '../lib/storage'

export interface BoardArrow {
  from: string
  to: string
  color?: string
}

export interface BoardProps {
  fen: string
  orientation?: 'white' | 'black'
  /** Which side the learner may move. Omit or false for a read-only board. */
  movable?: 'w' | 'b' | 'both' | false
  /** Return true if the move was accepted. */
  onMove?: (move: MoveInput) => boolean
  arrows?: BoardArrow[]
  highlights?: Record<string, string>
  lastMove?: { from: string; to: string } | null
  stars?: string[]
  /** Allow positions without kings (piece-movement exercises). */
  skipValidation?: boolean
  /** Treat the side to move as always `movable` (for exercises where the opponent never moves). */
  className?: string
}

const THEMES: Record<Settings['boardTheme'], { light: string; dark: string }> = {
  green: { light: '#ebecd0', dark: '#739552' },
  brown: { light: '#f0d9b5', dark: '#b58863' },
  blue: { light: '#dee3e6', dark: '#8ca2ad' },
  purple: { light: '#e8e3f2', dark: '#9580b5' },
}

const STAR = `url("data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#f5b301" stroke="#7a5200" stroke-width="0.8" d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z"/></svg>',
)}")`

function loadChess(fen: string, skipValidation?: boolean): Chess | null {
  try {
    return new Chess(fen, { skipValidation })
  } catch {
    return null
  }
}

export default function Board({
  fen,
  orientation = 'white',
  movable = false,
  onMove,
  arrows = [],
  highlights = {},
  lastMove,
  stars = [],
  skipValidation,
  className = '',
}: BoardProps) {
  const settings = useSettings()
  const theme = THEMES[settings.boardTheme] ?? THEMES.green
  const [selected, setSelected] = useState<string | null>(null)
  const [promotion, setPromotion] = useState<{ from: string; to: string; color: 'w' | 'b' } | null>(null)
  const chess = useMemo(() => loadChess(fen, skipValidation), [fen, skipValidation])

  const canMoveColor = (color: 'w' | 'b') => {
    if (!movable || !chess) return false
    if (movable === 'both') return chess.turn() === color
    return movable === color && chess.turn() === color
  }

  const legalTargets = useMemo(() => {
    if (!selected || !chess) return [] as { to: string; capture: boolean }[]
    return chess.moves({ square: selected as Square, verbose: true }).map((m) => ({ to: m.to, capture: !!m.captured }))
  }, [selected, chess])

  const attempt = (from: string, to: string): boolean => {
    if (!chess || !onMove) return false
    const piece = chess.get(from as Square)
    if (!piece || !canMoveColor(piece.color)) return false
    const legal = chess.moves({ square: from as Square, verbose: true }).filter((m) => m.to === to)
    if (!legal.length) return false
    setSelected(null)
    if (legal.some((m) => m.promotion)) {
      setPromotion({ from, to, color: piece.color })
      return true
    }
    return onMove({ from, to })
  }

  const onSquareClick = ({ square, piece }: { square: string; piece: { pieceType: string } | null }) => {
    if (promotion) return
    if (selected && selected !== square && legalTargets.some((t) => t.to === square)) {
      attempt(selected, square)
      return
    }
    if (piece && chess && canMoveColor(piece.pieceType[0] as 'w' | 'b')) {
      setSelected(selected === square ? null : square)
    } else {
      setSelected(null)
    }
  }

  const squareStyles: Record<string, CSSProperties> = {}
  const addLayer = (sq: string, style: CSSProperties) => {
    const prev = squareStyles[sq] ?? {}
    const images = [style.backgroundImage, prev.backgroundImage].filter(Boolean).join(', ')
    squareStyles[sq] = { ...prev, ...style, ...(images ? { backgroundImage: images } : {}) }
  }
  if (lastMove) {
    addLayer(lastMove.from, { backgroundColor: 'rgba(255, 214, 51, 0.42)' })
    addLayer(lastMove.to, { backgroundColor: 'rgba(255, 214, 51, 0.5)' })
  }
  for (const [sq, color] of Object.entries(highlights)) addLayer(sq, { backgroundColor: color })
  const king = chess ? kingSquare(chess, chess.turn()) : undefined
  if (chess && king && chess.isCheck()) {
    addLayer(king, { backgroundImage: 'radial-gradient(circle, rgba(255,40,40,0.9) 0%, rgba(230,20,20,0.5) 45%, transparent 75%)' })
  }
  for (const s of stars) {
    addLayer(s, { backgroundImage: STAR, backgroundSize: '62%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' })
  }
  if (selected) addLayer(selected, { backgroundColor: 'rgba(90, 167, 224, 0.55)' })
  for (const t of legalTargets) {
    addLayer(t.to, {
      backgroundImage: t.capture
        ? 'radial-gradient(circle, transparent 58%, rgba(20,20,20,0.32) 60%)'
        : 'radial-gradient(circle, rgba(20,20,20,0.3) 22%, transparent 24%)',
      backgroundSize: '100%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      cursor: 'pointer',
    })
  }

  const boardArrows: Arrow[] = arrows.map((a) => ({ startSquare: a.from, endSquare: a.to, color: a.color ?? 'rgba(240,168,58,0.85)' }))

  return (
    <div className={`relative w-full touch-none select-none ${className}`}>
      <Chessboard
        options={{
          position: fen,
          boardOrientation: orientation,
          squareStyles,
          arrows: boardArrows,
          allowDrawingArrows: true,
          clearArrowsOnPositionChange: true,
          showNotation: settings.showCoordinates,
          animationDurationInMs: 180,
          lightSquareStyle: { backgroundColor: theme.light },
          darkSquareStyle: { backgroundColor: theme.dark },
          lightSquareNotationStyle: { color: theme.dark },
          darkSquareNotationStyle: { color: theme.light },
          boardStyle: { borderRadius: '6px', overflow: 'hidden', boxShadow: '0 8px 30px rgba(0,0,0,0.45)' },
          allowDragging: !!movable,
          canDragPiece: ({ piece }) => canMoveColor(piece.pieceType[0] as 'w' | 'b'),
          onPieceDrop: ({ sourceSquare, targetSquare }) => (targetSquare ? attempt(sourceSquare, targetSquare) : false),
          onSquareClick,
        }}
      />
      {promotion && (
        <div className="absolute inset-0 z-20 flex items-center justify-center rounded-md bg-black/55">
          <div className="rounded-xl bg-panel p-4 shadow-2xl">
            <p className="mb-3 text-center text-sm text-muted">Promote to…</p>
            <div className="flex gap-2">
              {(['q', 'r', 'b', 'n'] as const).map((p) => {
                const key = `${promotion.color}${p.toUpperCase()}`
                return (
                  <button
                    key={p}
                    aria-label={`Promote to ${p}`}
                    className="h-16 w-16 rounded-lg bg-panel-2 p-1 hover:bg-accent/40"
                    onClick={() => {
                      const move = { from: promotion.from, to: promotion.to, promotion: p }
                      setPromotion(null)
                      onMove?.(move)
                    }}
                  >
                    {defaultPieces[key]?.()}
                  </button>
                )
              })}
            </div>
            <button className="mt-3 w-full text-sm text-muted hover:text-ink" onClick={() => setPromotion(null)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
