// AI coach via OpenRouter. Requests go either straight to openrouter.ai with
// the learner's own key (kept in their browser), or through this site's
// /api/chat proxy, which holds the site owner's key server-side and only
// allows free models. Stockfish analysis is passed in as ground truth,
// because language models cannot calculate chess reliably on their own.
import { useEffect, useState } from 'react'
import { DEFAULT_MODEL, getSettings, useSettings } from './storage'

const API = 'https://openrouter.ai/api/v1'
const PROXY = '/api/chat'

export interface ModelInfo {
  id: string
  name: string
  contextLength: number
  description: string
}

/**
 * Free models we prefer, best first, for explaining chess positions (strong
 * reasoning, generous context). The live list from OpenRouter decides what is
 * actually offered; IDs missing from it are skipped.
 */
export const PREFERRED_FREE_MODELS = [
  DEFAULT_MODEL,
  'minimax/minimax-m3:free',
  'nvidia/nemotron-3-ultra-550b-a55b:free',
  'nvidia/nemotron-3-super-120b-a12b:free',
  'openai/gpt-oss-120b:free',
  'google/gemma-4-31b-it:free',
  'deepseek/deepseek-chat-v3.1:free',
  'qwen/qwen3-235b-a22b:free',
  'meta-llama/llama-3.3-70b-instruct:free',
]

/**
 * Free endpoints that are restricted to agent tools or that keep prompts for
 * training are left out of the picker.
 */
const EXCLUDED_PREFIXES = ['thinkingmachines/inkling', 'openrouter/']

let modelCache: ModelInfo[] | null = null
let proxyCheck: Promise<boolean> | null = null

/** Whether this site has a shared key configured (the /api/chat proxy). */
export function sharedCoachAvailable(): Promise<boolean> {
  proxyCheck ??= fetch(PROXY)
    .then((res) => (res.ok ? res.json() : { configured: false }))
    .then((json: { configured?: boolean }) => json.configured === true)
    .catch(() => false)
    .then((ok) => {
      // Only remember a positive answer: a failed check (e.g. the app was opened offline) is retried next time.
      if (!ok) proxyCheck = null
      return ok
    })
  return proxyCheck
}

/** True when the coach can answer: the learner has a key, or the site provides one. */
export function useCoachAvailable(): { available: boolean; shared: boolean; ownKey: boolean } {
  const ownKey = Boolean(useSettings().apiKey)
  const [shared, setShared] = useState(false)
  useEffect(() => {
    let live = true
    sharedCoachAvailable().then((ok) => live && setShared(ok))
    return () => {
      live = false
    }
  }, [])
  return { available: ownKey || shared, shared, ownKey }
}

export async function listFreeModels(force = false): Promise<ModelInfo[]> {
  if (modelCache && !force) return modelCache
  const res = await fetch(`${API}/models`)
  if (!res.ok) throw new Error(`Could not load models from OpenRouter (HTTP ${res.status}).`)
  const json = (await res.json()) as {
    data: { id: string; name: string; context_length: number; description?: string; pricing?: { prompt: string; completion: string } }[]
  }
  const free = json.data
    .filter((m) => m.id.endsWith(':free') || (m.pricing && Number(m.pricing.prompt) === 0 && Number(m.pricing.completion) === 0))
    .filter((m) => !EXCLUDED_PREFIXES.some((p) => m.id.startsWith(p)))
    .map((m) => ({ id: m.id, name: m.name, contextLength: m.context_length, description: m.description ?? '' }))
  const rank = (id: string) => {
    const i = PREFERRED_FREE_MODELS.indexOf(id)
    return i === -1 ? PREFERRED_FREE_MODELS.length : i
  }
  modelCache = free.sort((a, b) => rank(a.id) - rank(b.id) || b.contextLength - a.contextLength)
  return modelCache
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export const COACH_SYSTEM_PROMPT = `You are "Coach", a warm, encouraging chess coach inside the Chess Master app. Your student began as a total beginner and is working toward grandmaster level.

Rules:
- Treat the Stockfish analysis you are given as the truth. Never invent moves or evaluations; if you mention a move, it must be legal in the given position, written in standard algebraic notation (e.g. Nf3, exd5, O-O).
- Explain ideas, plans and the reason behind moves in plain English: threats, piece activity, king safety, pawn structure, tactics (forks, pins, skewers...). Name the tactical or strategic pattern when there is one.
- Match the student's level: avoid jargon for beginners, or define it in a few words.
- Be concise: usually 80–180 words, short paragraphs or bullets. End with one practical takeaway the student can remember.
- If the question is not about chess, gently steer back to chess.`

export class AiError extends Error {}

/**
 * Streams a chat completion. If the chosen free model is rate limited or
 * unavailable, falls back to the next free model so the student still gets an answer.
 */
export async function streamChat(
  messages: ChatMessage[],
  onToken: (text: string) => void,
  signal?: AbortSignal,
): Promise<{ model: string }> {
  const { apiKey, model, coachEffort } = getSettings()
  const viaProxy = !apiKey && (await sharedCoachAvailable())
  if (!apiKey && !viaProxy) throw new AiError('Add your free OpenRouter API key in Settings to use the AI coach.')

  let candidates = [model || DEFAULT_MODEL]
  try {
    const free = await listFreeModels()
    candidates = [...new Set([model || DEFAULT_MODEL, ...free.map((m) => m.id)])].slice(0, 4)
  } catch {
    // Model list unavailable: just try the configured model.
  }

  let lastError = ''
  // The shared proxy only serves free models.
  if (viaProxy) candidates = candidates.filter((id) => id.endsWith(':free'))
  for (const candidate of candidates) {
    const res = await fetch(viaProxy ? PROXY : `${API}/chat/completions`, {
      method: 'POST',
      signal,
      headers: viaProxy
        ? { 'Content-Type': 'application/json' }
        : {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': window.location.origin,
            'X-Title': 'Chess Master',
          },
      body: JSON.stringify({ model: candidate, messages, stream: true, temperature: 0.4, reasoning: { effort: coachEffort } }),
    })
    if (res.status === 401) {
      throw new AiError(viaProxy ? "The site's shared AI key was rejected by OpenRouter. Add your own free key in Settings." : 'OpenRouter rejected the API key. Check it in Settings.')
    }
    if (!res.ok || !res.body) {
      lastError = `${candidate}: HTTP ${res.status} ${(await res.text().catch(() => '')).slice(0, 200)}`
      if ([402, 404, 408, 429, 500, 502, 503].includes(res.status)) continue
      throw new AiError(`The AI coach request failed (${lastError}).`)
    }
    const { produced, error } = await readStream(res.body, onToken)
    if (error && produced) throw new AiError(`The model stopped with an error: ${error}`)
    if (produced) return { model: candidate }
    // Upstream rate limits and provider failures often arrive as an error event in a 200 stream.
    lastError = `${candidate}: ${error ?? 'empty response'}`
  }
  throw new AiError(
    `All free models are busy or rate limited right now (${lastError}). Free models allow a limited number of requests per day — try again later or pick another model in Settings.`,
  )
}

async function readStream(body: ReadableStream<Uint8Array>, onToken: (text: string) => void): Promise<{ produced: boolean; error?: string }> {
  const reader = body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  let produced = false
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })
    let nl: number
    while ((nl = buffer.indexOf('\n')) !== -1) {
      const line = buffer.slice(0, nl).trim()
      buffer = buffer.slice(nl + 1)
      if (!line.startsWith('data:')) continue
      const data = line.slice(5).trim()
      if (data === '[DONE]') return { produced }
      let json: { error?: { message?: string }; choices?: { delta?: { content?: string } }[] }
      try {
        json = JSON.parse(data)
      } catch {
        continue
      }
      if (json.error) {
        void reader.cancel()
        return { produced, error: json.error.message ?? 'The model returned an error.' }
      }
      const text = json.choices?.[0]?.delta?.content
      if (text) {
        produced = true
        onToken(text)
      }
    }
  }
  return { produced }
}
