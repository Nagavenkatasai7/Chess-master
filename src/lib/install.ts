// Chrome/Edge/Android fire `beforeinstallprompt` once, shortly after the page
// loads, often before the screen that shows the Install button exists. Capture
// it at startup and share it with whichever component renders later.
import { useSyncExternalStore } from 'react'

export interface InstallEvent extends Event {
  prompt: () => Promise<void>
}

let captured: InstallEvent | null = null
const listeners = new Set<() => void>()

export function captureInstallPrompt() {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    captured = e as InstallEvent
    listeners.forEach((l) => l())
  })
  window.addEventListener('appinstalled', () => {
    captured = null
    listeners.forEach((l) => l())
  })
}

export function useInstallEvent(): InstallEvent | null {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    () => captured,
  )
}
