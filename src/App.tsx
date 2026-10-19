import { lazy, Suspense, useEffect } from 'react'
import { HashRouter, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'

const Learn = lazy(() => import('./pages/Learn'))
const LessonPage = lazy(() => import('./pages/LessonPage'))
const Puzzles = lazy(() => import('./pages/Puzzles'))
const Play = lazy(() => import('./pages/Play'))
const Openings = lazy(() => import('./pages/Openings'))
const OpeningPage = lazy(() => import('./pages/OpeningPage'))
const Handbook = lazy(() => import('./pages/Handbook'))
const Analysis = lazy(() => import('./pages/Analysis'))
const SettingsPage = lazy(() => import('./pages/Settings'))

const NAV = [
  { to: '/', label: 'Home', icon: '🏠' },
  { to: '/learn', label: 'Learn', icon: '🎓' },
  { to: '/puzzles', label: 'Puzzles', icon: '🧩' },
  { to: '/play', label: 'Play', icon: '♟️' },
  { to: '/openings', label: 'Openings', icon: '📖' },
  { to: '/handbook', label: 'Tips & Traps', icon: '💡' },
  { to: '/analysis', label: 'Analysis', icon: '🔍' },
  { to: '/settings', label: 'Settings', icon: '⚙️' },
]

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])
  return null
}

function Shell() {
  return (
    <div className="min-h-screen md:pl-56">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-56 flex-col border-r border-line bg-panel md:flex">
        <NavLink to="/" className="flex items-center gap-2 px-5 py-5">
          <span className="text-2xl">♛</span>
          <span className="text-lg font-bold tracking-tight">
            Chess <span className="text-accent">Master</span>
          </span>
        </NavLink>
        <nav className="flex flex-col gap-0.5 px-3">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${isActive ? 'bg-accent/15 font-semibold text-accent' : 'text-muted hover:bg-panel-2 hover:text-ink'}`
              }
            >
              <span className="w-5 text-center">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <p className="mt-auto px-5 py-4 text-xs text-muted">From your first move to grandmaster.</p>
      </aside>

      <header className="sticky top-0 z-30 flex items-center gap-2 border-b border-line bg-panel/95 px-4 py-3 backdrop-blur md:hidden">
        <span className="text-xl">♛</span>
        <span className="font-bold">
          Chess <span className="text-accent">Master</span>
        </span>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-24 pt-6 sm:px-6 md:pb-10">
        <Suspense fallback={<p className="text-muted">Loading…</p>}>
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
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-30 flex justify-around border-t border-line bg-panel/95 py-1.5 backdrop-blur md:hidden">
        {NAV.filter((n) => ['/', '/learn', '/puzzles', '/play', '/openings', '/settings'].includes(n.to)).map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) => `flex flex-col items-center px-2 py-1 text-[11px] ${isActive ? 'text-accent' : 'text-muted'}`}
          >
            <span className="text-lg leading-none">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Shell />
    </HashRouter>
  )
}
