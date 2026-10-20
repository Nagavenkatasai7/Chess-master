// Helps the learner install Chess Master as an app: step-by-step "Add to Home
// Screen" instructions on iPhone/iPad, and the native install button on
// Chrome/Edge/Android.
import { useState } from 'react'
import { useInstallEvent } from '../lib/install'
import { Button, Card } from './ui'

const DISMISS_KEY = 'chessmaster.installHintDismissed'

function isIos() {
  return /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
}

function isInstalled() {
  return window.matchMedia('(display-mode: standalone)').matches || (navigator as Navigator & { standalone?: boolean }).standalone === true
}

function readDismissed() {
  try {
    return localStorage.getItem(DISMISS_KEY) === '1'
  } catch {
    return false
  }
}

export default function InstallPrompt({ dismissible = true }: { dismissible?: boolean }) {
  const installEvent = useInstallEvent()
  const [dismissed, setDismissed] = useState(() => dismissible && readDismissed())
  const installed = isInstalled()
  const ios = isIos()

  if (dismissed) return null
  if (installed) {
    return dismissible ? null : <p className="text-sm text-good">✓ Chess Master is installed as an app on this device.</p>
  }
  if (!ios && !installEvent) {
    return dismissible ? null : (
      <p className="text-sm text-muted">
        Open this site in Safari on iPhone/iPad, or in Chrome/Edge on Android or desktop, to install it as an app.
      </p>
    )
  }

  const dismiss = () => {
    setDismissed(true)
    try {
      localStorage.setItem(DISMISS_KEY, '1')
    } catch {
      // Storage blocked: hide for this session only.
    }
  }

  return (
    <Card className="border-info/40 bg-info/5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold">📲 Install Chess Master on your {ios ? (navigator.userAgent.includes('iPad') ? 'iPad' : 'iPhone') : 'device'}</p>
          <p className="mt-1 text-sm text-muted">It opens full-screen from your home screen and works offline — lessons, puzzles and games against the computer need no internet.</p>
        </div>
        {dismissible && (
          <button onClick={dismiss} aria-label="Dismiss" className="text-muted hover:text-ink">
            ✕
          </button>
        )}
      </div>
      {ios ? (
        <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm">
          <li>
            Open this page in <strong>Safari</strong>.
          </li>
          <li>
            Tap the <strong>Share</strong> button <span aria-hidden>(the square with an arrow ⬆️)</span>.
          </li>
          <li>
            Scroll down and tap <strong>Add to Home Screen</strong>, then <strong>Add</strong>.
          </li>
        </ol>
      ) : (
        <Button variant="primary" className="mt-3" onClick={() => installEvent?.prompt()}>
          Install app
        </Button>
      )}
    </Card>
  )
}
