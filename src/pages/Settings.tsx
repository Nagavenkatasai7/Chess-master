import { useEffect, useRef, useState } from 'react'
import { Button, Card, Notice, PageHeader } from '../components/ui'
import { AiError, listFreeModels, PREFERRED_FREE_MODELS, streamChat, type ModelInfo } from '../lib/ai'
import { DEFAULT_MODEL, exportProgress, importProgress, resetProgress, updateSettings, useSettings, type Settings as SettingsType } from '../lib/storage'

const THEMES: { id: SettingsType['boardTheme']; label: string; light: string; dark: string }[] = [
  { id: 'green', label: 'Tournament green', light: '#ebecd0', dark: '#739552' },
  { id: 'brown', label: 'Classic wood', light: '#f0d9b5', dark: '#b58863' },
  { id: 'blue', label: 'Ice blue', light: '#dee3e6', dark: '#8ca2ad' },
  { id: 'purple', label: 'Lavender', light: '#e8e3f2', dark: '#9580b5' },
]

export default function Settings() {
  const settings = useSettings()
  const [keyInput, setKeyInput] = useState(settings.apiKey)
  const [showKey, setShowKey] = useState(false)
  const [models, setModels] = useState<ModelInfo[] | null>(null)
  const [modelError, setModelError] = useState('')
  const [test, setTest] = useState<{ kind: 'good' | 'bad' | 'info'; text: string } | null>(null)
  const [dataMessage, setDataMessage] = useState('')
  const fileInput = useRef<HTMLInputElement>(null)

  const loadModels = (force = false) => {
    setModelError('')
    listFreeModels(force)
      .then(setModels)
      .catch((e: Error) => setModelError(e.message))
  }

  useEffect(() => loadModels(), [])

  const saveKey = () => {
    updateSettings({ apiKey: keyInput.trim() })
    setTest({ kind: 'good', text: 'API key saved in this browser.' })
  }

  const runTest = async () => {
    updateSettings({ apiKey: keyInput.trim() })
    setTest({ kind: 'info', text: 'Asking the coach a test question…' })
    let reply = ''
    try {
      const { model } = await streamChat([{ role: 'user', content: 'In one short sentence, give a beginner your single best chess tip.' }], (t) => (reply += t))
      setTest({ kind: 'good', text: `Working! ${model} says: “${reply.trim().slice(0, 240)}”` })
    } catch (e) {
      setTest({ kind: 'bad', text: e instanceof AiError ? e.message : `Could not reach OpenRouter: ${(e as Error).message}` })
    }
  }

  const exportData = () => {
    const blob = new Blob([exportProgress()], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `chess-master-progress-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const importData = async (file: File) => {
    try {
      importProgress(await file.text())
      setDataMessage('Progress imported.')
    } catch (e) {
      setDataMessage((e as Error).message)
    }
  }

  const modelOptions = models ?? []
  const selectedKnown = modelOptions.some((m) => m.id === settings.model)

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <PageHeader title="Settings" />

      <Card>
        <h2 className="text-lg font-semibold">🤖 AI coach (OpenRouter)</h2>
        <p className="mt-1 text-sm text-muted">
          The coach explains positions in plain English using a <strong className="text-ink">free</strong> AI model on OpenRouter. Stockfish's analysis is sent along with
          every question, so the explanations are grounded in accurate chess.
        </p>
        <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-muted">
          <li>
            Create a free account at{' '}
            <a href="https://openrouter.ai" target="_blank" rel="noreferrer" className="text-accent underline">
              openrouter.ai
            </a>
            .
          </li>
          <li>
            Open{' '}
            <a href="https://openrouter.ai/settings/keys" target="_blank" rel="noreferrer" className="text-accent underline">
              Settings → API Keys
            </a>{' '}
            and create a key. Free models need no credits.
          </li>
          <li>Paste it below and press “Test”.</li>
        </ol>

        <label className="mt-4 block text-sm font-semibold" htmlFor="api-key">
          API key
        </label>
        <div className="mt-1 flex gap-2">
          <input
            id="api-key"
            type={showKey ? 'text' : 'password'}
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            placeholder="sk-or-v1-…"
            autoComplete="off"
            className="min-w-0 flex-1 rounded-lg border border-line bg-panel-2 px-3 py-2 font-mono text-sm outline-none focus:border-accent"
          />
          <Button variant="ghost" onClick={() => setShowKey((s) => !s)}>
            {showKey ? 'Hide' : 'Show'}
          </Button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          <Button variant="primary" onClick={saveKey} disabled={keyInput.trim() === settings.apiKey}>
            Save key
          </Button>
          <Button onClick={runTest} disabled={!keyInput.trim()}>
            Test
          </Button>
          {settings.apiKey && (
            <Button
              variant="ghost"
              onClick={() => {
                setKeyInput('')
                updateSettings({ apiKey: '' })
                setTest(null)
              }}
            >
              Remove key
            </Button>
          )}
        </div>
        <p className="mt-2 text-xs text-muted">Your key is stored only in this browser (localStorage) and is sent only to openrouter.ai. It is never included in progress exports.</p>
        {test && (
          <div className="mt-3">
            <Notice kind={test.kind}>{test.text}</Notice>
          </div>
        )}

        <label className="mt-5 block text-sm font-semibold" htmlFor="model">
          Model
        </label>
        <div className="mt-1 flex gap-2">
          <select
            id="model"
            value={settings.model}
            onChange={(e) => updateSettings({ model: e.target.value })}
            className="min-w-0 flex-1 rounded-lg border border-line bg-panel-2 px-3 py-2 text-sm outline-none focus:border-accent"
          >
            {!selectedKnown && <option value={settings.model}>{settings.model}</option>}
            {modelOptions.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
                {m.id === DEFAULT_MODEL ? ' — recommended' : PREFERRED_FREE_MODELS.includes(m.id) ? ' — good choice' : ''}
              </option>
            ))}
          </select>
          <Button variant="ghost" onClick={() => loadModels(true)}>
            ↻
          </Button>
        </div>
        <p className="mt-2 text-xs text-muted">
          {models ? `${models.length} free models available right now. ` : 'Loading the live list of free models… '}
          Recommended: <span className="font-mono">{DEFAULT_MODEL}</span> (NVIDIA Nemotron 3 Ultra, strong multi-step reasoning). If a free model is busy or rate-limited the coach
          automatically tries the next one. Free models have daily request limits.
        </p>
        {modelError && (
          <div className="mt-2">
            <Notice kind="warn">{modelError}</Notice>
          </div>
        )}
      </Card>

      <Card>
        <h2 className="text-lg font-semibold">♟️ Board</h2>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => updateSettings({ boardTheme: t.id })}
              className={`rounded-xl border p-2 text-left text-xs ${settings.boardTheme === t.id ? 'border-accent' : 'border-line'}`}
            >
              <div className="mb-2 grid grid-cols-4 overflow-hidden rounded">
                {Array.from({ length: 8 }, (_, i) => (
                  <div key={i} className="aspect-square" style={{ background: (i + Math.floor(i / 4)) % 2 ? t.dark : t.light }} />
                ))}
              </div>
              {t.label}
            </button>
          ))}
        </div>
        <label className="mt-4 flex items-center gap-2 text-sm">
          <input type="checkbox" checked={settings.showCoordinates} onChange={(e) => updateSettings({ showCoordinates: e.target.checked })} className="accent-[var(--color-accent)]" />
          Show coordinates (a–h, 1–8) on the board
        </label>
        <label className="mt-4 block text-sm font-semibold" htmlFor="name">
          Your name
        </label>
        <input
          id="name"
          value={settings.playerName}
          onChange={(e) => updateSettings({ playerName: e.target.value })}
          placeholder="Optional"
          className="mt-1 w-full max-w-xs rounded-lg border border-line bg-panel-2 px-3 py-2 text-sm outline-none focus:border-accent"
        />
      </Card>

      <Card>
        <h2 className="text-lg font-semibold">💾 Your progress</h2>
        <p className="mt-1 text-sm text-muted">Progress is saved automatically in this browser. Export it to back it up or move it to another device.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button onClick={exportData}>Export progress</Button>
          <Button onClick={() => fileInput.current?.click()}>Import progress</Button>
          <Button
            variant="danger"
            onClick={() => {
              if (window.confirm('Reset ALL progress (lessons, puzzles, games, openings)? This cannot be undone.')) {
                resetProgress()
                setDataMessage('Progress reset.')
              }
            }}
          >
            Reset progress
          </Button>
          <input ref={fileInput} type="file" accept="application/json" className="hidden" onChange={(e) => e.target.files?.[0] && importData(e.target.files[0])} />
        </div>
        {dataMessage && <p className="mt-2 text-sm text-muted">{dataMessage}</p>}
      </Card>
    </div>
  )
}
