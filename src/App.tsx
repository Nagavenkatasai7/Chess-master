import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState, type ComponentType } from 'react'
import { HashRouter, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { BackIcon, BookIcon, BulbIcon, GearIcon, HomeIcon, KnightIcon, LearnIcon, MoreIcon, PuzzleIcon, SearchIcon } from './components/icons'
import { unlockAudio } from './lib/sound'
import { isStandalone, ShellContext } from './lib/shell'
import { applyPendingUpdate } from './lib/update'
import Home from './pages/Home'

const loaders = {
  learn: () => import('./pages/Learn'),
  lesson: () => import('./pages/LessonPage'),
  puzzles: () => import('./pages/Puzzles'),
  play: () => import('./pages/Play'),
  openings: () => import('./pages/Openings'),
  opening: () => import('./pages/OpeningPage'),
  handbook: () => import('./pages/Handbook'),
  analysis: () => import('./pages/Analysis'),
  settings: () => import('./pages/Settings'),
  more: () => import('./pages/More'),
}

const Learn = lazy(loaders.learn)
const LessonPage = lazy(loaders.lesson)
const Puzzles = lazy(loaders.puzzles)
const Play = lazy(loaders.play)
const Openings = lazy(loaders.openings)
const OpeningPage = lazy(loaders.opening)
const Handbook = lazy(loaders.handbook)
const Analysis = lazy(loaders.analysis)
const SettingsPage = lazy(loaders.settings)
const More = lazy(loaders.more)

type NavItem = { to: string; label: string; Icon: ComponentType<{ size?: number }> }

/** Desktop sidebar. */
const SIDEBAR: NavItem[] = [
  { to: '/', label: 'Home', Icon: HomeIcon },
  { to: '/learn', label: 'Learn', Icon: LearnIcon },
  { to: '/puzzles', label: 'Puzzles', Icon: PuzzleIcon },
  { to: '/play', label: 'Play', Icon: KnightIcon },
  { to: '/openings', label: 'Openings', Icon: BookIcon },
  { to: '/handbook', label: 'Tips & Traps', Icon: BulbIcon },
  { to: '/analysis', label: 'Analysis', Icon: SearchIcon },
  { to: '/settings', label: 'Settings', Icon: GearIcon },
]

/** Phone tab bar: five tabs, like a native app. */
const TABS: NavItem[] = [
  { to: '/', label: 'Home', Icon: HomeIcon },
  { to: '/learn', label: 'Learn', Icon: LearnIcon },
  { to: '/puzzles', label: 'Puzzles', Icon: PuzzleIcon },
  { to: '/play', label: 'Play', Icon: KnightIcon },
  { to: '/more', label: 'More', Icon: MoreIcon },
]

const MORE_ROUTES = ['/more', '/openings', '/handbook', '/analysis', '/settings']

/** Mobile top-bar title and where "back" goes when there is no history. */
function routeMeta(pathname: string): { title: string; parent: string | null } {
  if (pathname === '/') return { title: 'Chess Master', parent: null }
  if (pathname === '/learn') return { title: 'Learn', parent: null }
  if (pathname.startsWith('/learn/')) return { title: 'Lesson', parent: '/learn' }
  if (pathname === '/puzzles') return { title: 'Puzzles', parent: null }
  if (pathname === '/play') return { title: 'Play', parent: null }
  if (pathname === '/more') return { title: 'More', parent: null }
  if (pathname === '/openings') return { title: 'Openings', parent: '/more' }
  if (pathname.startsWith('/openings/')) return { title: 'Opening', parent: '/openings' }
  if (pathname === '/handbook') return { title: 'Tips & Traps', parent: '/more' }
  if (pathname === '/analysis') return { title: 'Analysis', parent: '/more' }
  if (pathname === '/settings') return { title: 'Settings', parent: '/more' }
  return { title: 'Chess Master', parent: '/' }
}

function Shell() {
  const location = useLocation()
  const navigate = useNavigate()
  const [immersive, setImmersive] = useState(false)
  const [pageTitle, setPageTitle] = useState<string | null>(null)
  const meta = routeMeta(location.pathname)
  const title = pageTitle ?? meta.title
  const shell = useMemo(() => ({ setImmersive, setTitle: setPageTitle }), [])

  const goBack = useCallback(() => {
    const idx = (window.history.state as { idx?: number } | null)?.idx ?? 0
    if (idx > 0) navigate(-1)
    else navigate(meta.parent ?? '/')
  }, [navigate, meta.parent])

  useEffect(() => window.scrollTo(0, 0), [location.pathname])
  useEffect(applyPendingUpdate, [location.pathname])

  // Warm the other screens once the first one has painted, so switching tabs never shows a spinner.
  useEffect(() => {
    const warm = () => Object.values(loaders).forEach((load) => load())
    const id = window.setTimeout(warm, 1200)
    return () => window.clearTimeout(id)
  }, [])

  // iPhone home-screen apps have no browser back gesture: swipe right from the left edge to go back.
  const swipe = useRef<{ x: number; y: number } | null>(null)
  useEffect(() => {
    if (!isStandalone()) return
    const start = (e: TouchEvent) => {
      const t = e.touches[0]
      swipe.current = t.clientX < 22 ? { x: t.clientX, y: t.clientY } : null
    }
    const end = (e: TouchEvent) => {
      if (!swipe.current || !meta.parent) return
      const t = e.changedTouches[0]
      if (t.clientX - swipe.current.x > 80 && Math.abs(t.clientY - swipe.current.y) < 60) goBack()
      swipe.current = null
    }
    window.addEventListener('touchstart', start, { passive: true })
    window.addEventListener('touchend', end, { passive: true })
    return () => {
      window.removeEventListener('touchstart', start)
      window.removeEventListener('touchend', end)
    }
  }, [goBack, meta.parent])

  return (
    <ShellContext.Provider value={shell}>
      <div className="min-h-screen md:pl-56" onPointerDown={unlockAudio}>
        <aside className="fixed inset-y-0 left-0 z-30 hidden w-56 flex-col border-r border-line bg-panel md:flex">
          <NavLink to="/" className="flex items-center gap-2 px-5 py-5">
            <img src="icons/icon-192.png" alt="" className="h-8 w-8 rounded-lg" />
            <span className="text-lg font-bold tracking-tight">
              Chess <span className="text-accent">Master</span>
            </span>
          </NavLink>
          <nav className="flex flex-col gap-0.5 px-3">
            {SIDEBAR.map(({ to, label, Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${isActive ? 'bg-accent/15 font-semibold text-accent' : 'text-muted hover:bg-panel-2 hover:text-ink'}`
                }
              >
                <Icon size={19} />
                {label}
              </NavLink>
            ))}
          </nav>
          <p className="mt-auto px-5 py-4 text-xs text-muted">From your first move to grandmaster.</p>
        </aside>

        <header className="chrome sticky top-0 z-30 grid grid-cols-[3rem_1fr_3rem] items-center border-b border-line/70 bg-panel/90 px-2 pb-2 pt-[calc(env(safe-area-inset-top)+0.5rem)] backdrop-blur-xl md:hidden">
          {meta.parent ? (
            <button onClick={goBack} aria-label="Back" className="flex h-10 w-10 items-center justify-center rounded-full text-accent active:bg-panel-2">
              <BackIcon size={26} />
            </button>
          ) : (
            <img src="icons/icon-192.png" alt="" className="ml-2 h-7 w-7 rounded-md" />
          )}
          <h1 className="truncate text-center text-[17px] font-semibold">{title}</h1>
          <span />
        </header>

        <main
          key={location.pathname}
          className="page-enter mx-auto max-w-6xl px-4 pb-[calc(env(safe-area-inset-bottom)+5.5rem)] pt-4 sm:px-6 md:pb-10 md:pt-6"
        >
          <Suspense fallback={<div className="flex h-[50vh] items-center justify-center text-muted">Loading…</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/learn/:lessonId" element={<LessonPage />} />
              <Route path="/puzzles" element={<Puzzles />} />
              <Route path="/play" element={<Play />} />
              <Route path="/openings" element={<Openings />} />
              <Route path="/openings/:openingId" element={<OpeningPage />} />
              <Route path="/handbook" element={<Handbook />} />
              <Route path="/analysis" element={<Analysis />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/more" element={<More />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
        </main>

        {!immersive && (
          <nav className="chrome fixed inset-x-0 bottom-0 z-30 flex justify-around border-t border-line/70 bg-panel/90 pb-[calc(env(safe-area-inset-bottom)+0.25rem)] pt-1.5 backdrop-blur-xl md:hidden">
            {TABS.map(({ to, label, Icon }) => {
              const active = to === '/' ? location.pathname === '/' : to === '/more' ? MORE_ROUTES.some((r) => location.pathname.startsWith(r)) : location.pathname.startsWith(to)
              return (
                <NavLink key={to} to={to} className={`flex min-w-[3.75rem] flex-col items-center gap-0.5 py-0.5 text-[10.5px] font-medium ${active ? 'text-accent' : 'text-muted'}`}>
                  <Icon size={25} />
                  {label}
                </NavLink>
              )
            })}
          </nav>
        )}
      </div>
    </ShellContext.Provider>
  )
}

export default function App() {
  return (
    <HashRouter>
      <Shell />
    </HashRouter>
  )
}
