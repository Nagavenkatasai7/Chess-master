// Small shared UI primitives.
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-accent text-accent-ink hover:brightness-110 font-semibold',
  secondary: 'bg-panel-2 text-ink hover:bg-line',
  ghost: 'text-muted hover:text-ink hover:bg-panel-2',
  danger: 'bg-bad/90 text-white hover:bg-bad',
}

export function Button({
  variant = 'secondary',
  className = '',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-3.5 py-2 text-sm transition disabled:cursor-not-allowed disabled:opacity-45 ${VARIANTS[variant]} ${className}`}
      {...props}
    />
  )
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-line bg-panel p-5 ${className}`}>{children}</div>
}

export function Badge({ children, color = 'var(--color-panel-2)', className = '' }: { children: ReactNode; color?: string; className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`} style={{ background: color }}>
      {children}
    </span>
  )
}

export function ProgressBar({ value, className = '', color = 'var(--color-accent)' }: { value: number; className?: string; color?: string }) {
  return (
    <div className={`h-2 w-full overflow-hidden rounded-full bg-panel-2 ${className}`}>
      <div className="h-full rounded-full transition-all" style={{ width: `${Math.round(Math.max(0, Math.min(1, value)) * 100)}%`, background: color }} />
    </div>
  )
}

export function PageHeader({ title, subtitle, children }: { title: string; subtitle?: string; children?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 max-w-2xl text-muted">{subtitle}</p>}
      </div>
      {children}
    </div>
  )
}

export function Notice({ kind = 'info', children }: { kind?: 'info' | 'good' | 'bad' | 'warn'; children: ReactNode }) {
  const colors = { info: 'border-info/50 bg-info/10', good: 'border-good/50 bg-good/10', bad: 'border-bad/50 bg-bad/10', warn: 'border-warn/50 bg-warn/10' }
  return <div className={`rounded-xl border px-4 py-3 text-sm ${colors[kind]}`}>{children}</div>
}
