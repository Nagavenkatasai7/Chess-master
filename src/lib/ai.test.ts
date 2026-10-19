import { afterEach, describe, expect, it, vi } from 'vitest'
import { listFreeModels, streamChat } from './ai'
import { DEFAULT_MODEL, updateSettings } from './storage'

const MODELS = {
  data: [
    { id: 'paid/model', name: 'Paid', context_length: 1000, pricing: { prompt: '0.000001', completion: '0.000002' } },
    { id: 'other/free-model:free', name: 'Other free', context_length: 32000, pricing: { prompt: '0', completion: '0' } },
    { id: DEFAULT_MODEL, name: 'Nemotron 3 Ultra (free)', context_length: 1000000, pricing: { prompt: '0', completion: '0' } },
    { id: 'thinkingmachines/inkling:free', name: 'Inkling (free)', context_length: 1000000, pricing: { prompt: '0', completion: '0' } },
  ],
}

function sse(chunks: string[]): Response {
  const body = chunks.map((c) => `data: ${JSON.stringify({ choices: [{ delta: { content: c } }] })}\n\n`).join('') + 'data: [DONE]\n\n'
  return new Response(body, { status: 200 })
}

afterEach(() => vi.unstubAllGlobals())

describe('OpenRouter client', () => {
  it('lists only usable free models, recommended first', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify(MODELS))))
    const models = await listFreeModels(true)
    expect(models.map((m) => m.id)).toEqual([DEFAULT_MODEL, 'other/free-model:free'])
  })

  it('streams tokens and falls back when the chosen model is rate limited', async () => {
    vi.stubGlobal('window', { location: { origin: 'http://localhost' } })
    updateSettings({ apiKey: 'sk-or-test', model: DEFAULT_MODEL })
    const calls: string[] = []
    vi.stubGlobal(
      'fetch',
      vi.fn(async (url: string, init?: RequestInit) => {
        if (url.endsWith('/models')) return new Response(JSON.stringify(MODELS))
        const model = JSON.parse(String(init?.body)).model as string
        calls.push(model)
        expect((init?.headers as Record<string, string> | undefined)?.Authorization).toBe('Bearer sk-or-test')
        return model === DEFAULT_MODEL ? new Response('rate limited', { status: 429 }) : sse(['Develop ', 'your ', 'pieces!'])
      }),
    )
    let text = ''
    const { model } = await streamChat([{ role: 'user', content: 'tip?' }], (t) => (text += t))
    expect(calls).toEqual([DEFAULT_MODEL, 'other/free-model:free'])
    expect(model).toBe('other/free-model:free')
    expect(text).toBe('Develop your pieces!')
  })

  it('explains a missing key instead of calling the API', async () => {
    updateSettings({ apiKey: '' })
    await expect(streamChat([{ role: 'user', content: 'hi' }], () => {})).rejects.toThrow(/API key/)
  })
})

describe('shared coach proxy', () => {
  it('uses /api/chat without exposing a key when the site provides one', async () => {
    vi.resetModules()
    const ai = await import('./ai')
    const storage = await import('./storage')
    storage.updateSettings({ apiKey: '', model: storage.DEFAULT_MODEL })
    const requests: { url: string; auth?: string; model?: string }[] = []
    vi.stubGlobal(
      'fetch',
      vi.fn(async (url: string, init?: RequestInit) => {
        if (url === '/api/chat' && !init) return new Response(JSON.stringify({ configured: true }))
        if (url.endsWith('/models')) return new Response(JSON.stringify(MODELS))
        const body = JSON.parse(String(init?.body))
        expect(body.reasoning).toEqual({ effort: 'low' })
        requests.push({ url, auth: (init?.headers as Record<string, string> | undefined)?.Authorization, model: body.model })
        return sse(['Castle ', 'early.'])
      }),
    )
    let text = ''
    const { model } = await ai.streamChat([{ role: 'user', content: 'tip?' }], (t) => (text += t))
    expect(text).toBe('Castle early.')
    expect(model).toBe(storage.DEFAULT_MODEL)
    expect(requests).toEqual([{ url: '/api/chat', auth: undefined, model: storage.DEFAULT_MODEL }])
  })
})
