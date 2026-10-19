// Vercel Function: the AI coach's server-side proxy to OpenRouter.
//
// The site owner's OpenRouter key lives only in the OPENROUTER_API_KEY
// environment variable, never in the browser bundle. To keep that key safe
// on a public site, this proxy only forwards to FREE models (ids ending in
// ":free"), only accepts requests from this site's own pages, and caps the
// size of each conversation.
//
//   GET  /api/chat          -> { configured }            (is a shared key set?)
//   GET  /api/chat?check=1  -> also verifies the key and the default model
//   POST /api/chat          -> streams an OpenRouter chat completion

const OPENROUTER = 'https://openrouter.ai/api/v1'
const MAX_MESSAGES = 16
const MAX_CHARS = 60000
const ROLES = new Set(['system', 'user', 'assistant'])
const MODEL_ID = /^[\w.\-/]+:free$/

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  })
}

function sameOrigin(request) {
  const origin = request.headers.get('origin')
  if (!origin) return false
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host')
  try {
    return new URL(origin).host === host
  } catch {
    return false
  }
}

export async function GET(request) {
  const key = process.env.OPENROUTER_API_KEY
  const url = new URL(request.url, 'http://localhost')
  if (!url.searchParams.has('check')) return json(200, { configured: Boolean(key) })

  const model = url.searchParams.get('model') ?? ''
  const result = { configured: Boolean(key), keyValid: false, model, modelAvailable: null }
  if (key) {
    const res = await fetch(`${OPENROUTER}/key`, { headers: { Authorization: `Bearer ${key}` } }).catch(() => null)
    result.keyValid = Boolean(res?.ok)
  }
  if (MODEL_ID.test(model)) {
    const res = await fetch(`${OPENROUTER}/models`).catch(() => null)
    if (res?.ok) {
      const { data } = await res.json()
      result.modelAvailable = data.some((m) => m.id === model)
    }
  }
  return json(200, result)
}

export async function POST(request) {
  const key = process.env.OPENROUTER_API_KEY
  if (!key) return json(503, { error: { message: 'The shared AI coach is not configured on this site.' } })
  if (!sameOrigin(request)) return json(403, { error: { message: 'Requests must come from this site.' } })

  let body
  try {
    body = await request.json()
  } catch {
    return json(400, { error: { message: 'Invalid JSON.' } })
  }
  const { model, messages, temperature } = body ?? {}
  if (typeof model !== 'string' || !MODEL_ID.test(model)) {
    return json(400, { error: { message: 'Only free OpenRouter models (ids ending in ":free") can be used through the shared coach.' } })
  }
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES) {
    return json(400, { error: { message: `Send between 1 and ${MAX_MESSAGES} messages.` } })
  }
  let chars = 0
  for (const m of messages) {
    if (!m || !ROLES.has(m.role) || typeof m.content !== 'string') return json(400, { error: { message: 'Malformed message.' } })
    chars += m.content.length
  }
  if (chars > MAX_CHARS) return json(413, { error: { message: 'Conversation too long — clear the chat and ask again.' } })

  const upstream = await fetch(`${OPENROUTER}/chat/completions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': request.headers.get('origin') ?? 'https://chess-master.vercel.app',
      'X-Title': 'Chess Master',
    },
    body: JSON.stringify({
      model,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
      stream: true,
      temperature: typeof temperature === 'number' ? Math.min(1, Math.max(0, temperature)) : 0.4,
    }),
  })

  return new Response(upstream.body, {
    status: upstream.status,
    headers: {
      'Content-Type': upstream.headers.get('content-type') ?? 'text/event-stream',
      'Cache-Control': 'no-store',
    },
  })
}
