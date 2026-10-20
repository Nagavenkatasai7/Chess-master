/// <reference types="vite-plugin-pwa/client" />
// Keeps the installed app on the latest version. iPhone home-screen apps
// resume instead of relaunching, so the browser rarely looks for a new
// service worker on its own: check whenever the app comes back to the
// foreground, then switch to the new version on the next screen change
// (never in the middle of a game or a review).
import { registerSW } from 'virtual:pwa-register'

let updateReady = false

export function startUpdates() {
  registerSW({
    immediate: true,
    onNeedReload() {
      updateReady = true
    },
    onRegisteredSW(_url, registration) {
      if (!registration) return
      const check = () => registration.update().catch(() => {})
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') check()
      })
      window.setInterval(check, 60 * 60 * 1000)
    },
  })
}

/** Called on every route change: reload into the new version if one is waiting. */
export function applyPendingUpdate() {
  if (updateReady) window.location.reload()
}
