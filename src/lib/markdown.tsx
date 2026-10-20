// Tiny markdown renderer for lesson text: paragraphs, **bold**, *italic*,
// `code`, "- " and "1. " lists, "### " headings. Content is authored in-repo,
// and everything is rendered as React text nodes (no HTML injection).
import type { ReactNode } from 'react'

function inline(text: string, keyPrefix: string): ReactNode[] {
  const out: ReactNode[] = []
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g
  let last = 0
  let m: RegExpExecArray | null
  let i = 0
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index))
    const token = m[0]
    const key = `${keyPrefix}-${i++}`
    if (token.startsWith('**')) out.push(<strong key={key}>{token.slice(2, -2)}</strong>)
    else if (token.startsWith('`')) out.push(<code key={key}>{token.slice(1, -1)}</code>)
    else out.push(<em key={key}>{token.slice(1, -1)}</em>)
    last = m.index + token.length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

export function Markdown({ text, className = '' }: { text: string; className?: string }) {
  const blocks: ReactNode[] = []
  const lines = text.replace(/\r/g, '').split('\n')
  let para: string[] = []
  let list: { ordered: boolean; items: string[] } | null = null

  const flushPara = () => {
    if (para.length) blocks.push(<p key={blocks.length}>{inline(para.join(' '), `p${blocks.length}`)}</p>)
    para = []
  }
  const flushList = () => {
    if (!list) return
    const items = list.items.map((it, i) => <li key={i}>{inline(it, `l${blocks.length}-${i}`)}</li>)
    blocks.push(list.ordered ? <ol key={blocks.length}>{items}</ol> : <ul key={blocks.length}>{items}</ul>)
    list = null
  }

  for (const raw of lines) {
    const line = raw.trim()
    const bullet = /^[-*] (.*)$/.exec(line)
    const numbered = /^\d+[.)] (.*)$/.exec(line)
    if (!line) {
      flushPara()
      flushList()
    } else if (line.startsWith('### ') || line.startsWith('## ')) {
      flushPara()
      flushList()
      blocks.push(<h3 key={blocks.length}>{inline(line.replace(/^#+ /, ''), `h${blocks.length}`)}</h3>)
    } else if (bullet || numbered) {
      flushPara()
      const ordered = !!numbered
      if (list && list.ordered !== ordered) flushList()
      list ??= { ordered, items: [] }
      list.items.push((bullet ?? numbered)![1])
    } else if (list && raw.startsWith('  ')) {
      list.items[list.items.length - 1] += ' ' + line
    } else {
      flushList()
      para.push(line)
    }
  }
  flushPara()
  flushList()
  return <div className={`prose-chess ${className}`}>{blocks}</div>
}
