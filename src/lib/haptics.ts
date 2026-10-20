// Haptic feedback. Android supports navigator.vibrate; iPhone (iOS 18+) has no
// vibration API, but toggling a native switch control produces the system
// haptic tap, so a hidden switch is clicked instead.
import { getSettings } from './storage'

let iosSwitch: HTMLLabelElement | null = null

function tapIos() {
  if (!iosSwitch) {
    const input = document.createElement('input')
    input.type = 'checkbox'
    input.setAttribute('switch', '')
    iosSwitch = document.createElement('label')
    iosSwitch.setAttribute('aria-hidden', 'true')
    iosSwitch.style.display = 'none'
    iosSwitch.appendChild(input)
    document.body.appendChild(iosSwitch)
  }
  iosSwitch.click()
}

export function haptic(kind: 'tap' | 'error' = 'tap') {
  if (!getSettings().haptics) return
  if (typeof navigator.vibrate === 'function') {
    navigator.vibrate(kind === 'error' ? [25, 60, 25] : 10)
    return
  }
  tapIos()
  if (kind === 'error') window.setTimeout(tapIos, 110)
}
