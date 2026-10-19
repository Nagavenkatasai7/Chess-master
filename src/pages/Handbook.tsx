import { useState } from 'react'
import Board from '../components/Board'
import LineViewer from '../components/LineViewer'
import { Badge, Card, PageHeader } from '../components/ui'
import { tipSections } from '../data/handbook/tips'
import { traps } from '../data/handbook/traps'
import { LEVELS } from '../data/types'
import { Markdown } from '../lib/markdown'

export default function Handbook() {
  const [tab, setTab] = useState<'tips' | 'traps'>('tips')
  const [section, setSection] = useState(tipSections[0]?.id ?? '')
  const [openTip, setOpenTip] = useState<string | null>(null)
  const [trapId, setTrapId] = useState(traps[0]?.id ?? '')
  const current = tipSections.find((s) => s.id === section) ?? tipSections[0]
  const trap = traps.find((t) => t.id === trapId) ?? traps[0]

  return (
    <div>
      <PageHeader title="Tips & Traps" subtitle="The practical wisdom strong players rely on, plus the opening traps you must know — to spring them and to avoid them." />
      <div className="mb-5 flex gap-2">
        <Tab active={tab === 'tips'} onClick={() => setTab('tips')}>
          💡 Tips & tricks
        </Tab>
        <Tab active={tab === 'traps'} onClick={() => setTab('traps')}>
          🪤 Opening traps ({traps.length})
        </Tab>
      </div>

      {tab === 'tips' && (
        <div className="grid gap-6 md:grid-cols-[220px_1fr]">
          <nav className="flex gap-1.5 overflow-x-auto md:flex-col">
            {tipSections.map((s) => (
              <button
                key={s.id}
                onClick={() => setSection(s.id)}
                className={`shrink-0 rounded-lg px-3 py-2 text-left text-sm ${s.id === current?.id ? 'bg-accent/15 font-semibold text-accent' : 'text-muted hover:bg-panel-2 hover:text-ink'}`}
              >
                {s.title}
              </button>
            ))}
          </nav>
          {current ? (
            <div>
              <div className="mb-4 flex items-center gap-2">
                <h2 className="text-xl font-bold">{current.title}</h2>
                <Badge>
                  Level {current.level}: {LEVELS[current.level - 1].name}
                </Badge>
              </div>
              <div className="grid gap-3 lg:grid-cols-2">
                {current.tips.map((tip, i) => {
                  const key = `${current.id}-${i}`
                  const hasBoard = !!tip.fen || !!tip.moves
                  const open = openTip === key
                  return (
                    <Card key={key} className={`p-4 ${open ? 'lg:col-span-2' : ''}`}>
                      <p className="font-semibold">
                        {i + 1}. {tip.title}
                      </p>
                      <Markdown text={tip.md} className="mt-1 text-sm text-muted" />
                      {hasBoard && (
                        <button className="mt-2 text-sm text-accent hover:underline" onClick={() => setOpenTip(open ? null : key)}>
                          {open ? 'Hide board' : 'Show on board →'}
                        </button>
                      )}
                      {open && (
                        <div className="mt-3">
                          {tip.moves ? <LineViewer fen={tip.fen} moves={tip.moves} /> : <div className="max-w-sm"><Board fen={tip.fen!} skipValidation /></div>}
                        </div>
                      )}
                    </Card>
                  )
                })}
              </div>
            </div>
          ) : (
            <p className="text-muted">Tips are being added.</p>
          )}
        </div>
      )}

      {tab === 'traps' && (
        <div className="grid gap-6 md:grid-cols-[260px_1fr]">
          <nav className="flex max-h-[70vh] gap-1.5 overflow-auto md:flex-col">
            {traps.map((t) => (
              <button
                key={t.id}
                onClick={() => setTrapId(t.id)}
                className={`shrink-0 rounded-lg px-3 py-2 text-left text-sm ${t.id === trap?.id ? 'bg-accent/15 text-accent' : 'text-muted hover:bg-panel-2 hover:text-ink'}`}
              >
                <span className="block font-medium">{t.name}</span>
                <span className="block text-xs opacity-75">{t.opening}</span>
              </button>
            ))}
          </nav>
          {trap ? (
            <Card className="p-4">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-bold">{trap.name}</h2>
                <Badge>{trap.opening}</Badge>
                <Badge>Sprung by {trap.side === 'white' ? 'White' : 'Black'}</Badge>
              </div>
              <Markdown text={trap.summary} className="mb-4 text-sm text-muted" />
              <LineViewer key={trap.id} moves={trap.moves} notes={trap.notes} orientation={trap.side} />
            </Card>
          ) : (
            <p className="text-muted">Traps are being added.</p>
          )}
        </div>
      )}
    </div>
  )
}

function Tab({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className={`rounded-lg px-4 py-2 text-sm ${active ? 'bg-accent font-semibold text-accent-ink' : 'bg-panel-2 text-muted hover:text-ink'}`}>
      {children}
    </button>
  )
}
