import type { ComponentType } from 'react'
import { Link } from 'react-router-dom'
import InstallPrompt from '../components/InstallPrompt'
import { BookIcon, BulbIcon, ChevronRightIcon, GearIcon, SearchIcon } from '../components/icons'
import { useProgress } from '../lib/storage'

const ROWS: { to: string; title: string; subtitle: string; Icon: ComponentType<{ size?: number }>; tint: string }[] = [
  { to: '/openings', title: 'Openings', subtitle: 'Study and drill 16 openings', Icon: BookIcon, tint: '#5fb85f' },
  { to: '/handbook', title: 'Tips & Traps', subtitle: 'Rules of thumb and opening traps', Icon: BulbIcon, tint: '#f0a83a' },
  { to: '/analysis', title: 'Analysis board', subtitle: 'Explore any position with Stockfish', Icon: SearchIcon, tint: '#5aa7e0' },
  { to: '/settings', title: 'Settings', subtitle: 'AI coach, board, sounds, progress', Icon: GearIcon, tint: '#a39b91' },
]

export default function More() {
  const progress = useProgress()
  const drilled = Object.keys(progress.drills).length
  return (
    <div className="mx-auto max-w-xl space-y-5">
      <div className="overflow-hidden rounded-2xl border border-line bg-panel">
        {ROWS.map(({ to, title, subtitle, Icon, tint }, i) => (
          <Link key={to} to={to} className={`flex items-center gap-3 px-4 py-3.5 active:bg-panel-2 ${i ? 'border-t border-line/70' : ''}`}>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl text-white" style={{ background: tint }}>
              <Icon size={20} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-medium">{title}</span>
              <span className="block truncate text-sm text-muted">{to === '/openings' && drilled ? `${drilled} lines drilled` : subtitle}</span>
            </span>
            <ChevronRightIcon size={18} className="text-muted" />
          </Link>
        ))}
      </div>
      <InstallPrompt dismissible={false} />
      <p className="text-center text-xs text-muted">Chess Master · from your first move to grandmaster</p>
    </div>
  )
}
