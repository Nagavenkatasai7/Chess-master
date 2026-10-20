// Board sounds, synthesised with Web Audio so there are no audio files to
// download or cache. iOS only lets audio start after a user gesture, so the
// app calls unlockAudio() on the first tap.
import { getSettings } from './storage'

let ctx: AudioContext | null = null

function audio(): AudioContext | null {
  if (typeof window === 'undefined' || !('AudioContext' in window)) return null
  ctx ??= new AudioContext()
  return ctx
}

export function unlockAudio() {
  const ac = audio()
  if (ac && ac.state === 'suspended') void ac.resume()
}

/** A short percussive "tock": filtered noise plus a quickly decaying tone. */
function knock(ac: AudioContext, at: number, freq: number, gain: number, length = 0.09) {
  const noise = ac.createBuffer(1, Math.floor(ac.sampleRate * length), ac.sampleRate)
  const data = noise.getChannelData(0)
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length) ** 3
  const src = ac.createBufferSource()
  src.buffer = noise
  const filter = ac.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.value = freq * 4
  filter.Q.value = 1.2
  const g = ac.createGain()
  g.gain.setValueAtTime(gain, at)
  g.gain.exponentialRampToValueAtTime(0.001, at + length)
  src.connect(filter).connect(g).connect(ac.destination)
  src.start(at)

  const osc = ac.createOscillator()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(freq, at)
  osc.frequency.exponentialRampToValueAtTime(freq * 0.6, at + length)
  const og = ac.createGain()
  og.gain.setValueAtTime(gain * 0.6, at)
  og.gain.exponentialRampToValueAtTime(0.001, at + length)
  osc.connect(og).connect(ac.destination)
  osc.start(at)
  osc.stop(at + length)
}

function tone(ac: AudioContext, at: number, freq: number, gain: number, length: number) {
  const osc = ac.createOscillator()
  osc.type = 'triangle'
  osc.frequency.value = freq
  const g = ac.createGain()
  g.gain.setValueAtTime(0.0001, at)
  g.gain.exponentialRampToValueAtTime(gain, at + 0.01)
  g.gain.exponentialRampToValueAtTime(0.0001, at + length)
  osc.connect(g).connect(ac.destination)
  osc.start(at)
  osc.stop(at + length)
}

export type BoardSound = 'move' | 'capture' | 'check' | 'mate' | 'error' | 'success'

export function playSound(kind: BoardSound) {
  if (!getSettings().sound) return
  const ac = audio()
  if (!ac || ac.state !== 'running') return
  const t = ac.currentTime + 0.005
  switch (kind) {
    case 'move':
      knock(ac, t, 260, 0.35)
      break
    case 'capture':
      knock(ac, t, 170, 0.55, 0.12)
      knock(ac, t + 0.05, 300, 0.25)
      break
    case 'check':
      knock(ac, t, 260, 0.35)
      tone(ac, t + 0.03, 880, 0.08, 0.18)
      break
    case 'mate':
      tone(ac, t, 523, 0.1, 0.4)
      tone(ac, t + 0.1, 659, 0.1, 0.4)
      tone(ac, t + 0.2, 784, 0.1, 0.6)
      break
    case 'success':
      tone(ac, t, 660, 0.08, 0.15)
      tone(ac, t + 0.09, 990, 0.08, 0.25)
      break
    case 'error':
      tone(ac, t, 180, 0.08, 0.18)
      break
  }
}
