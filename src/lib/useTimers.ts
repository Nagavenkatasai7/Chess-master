// Timeouts owned by a component. clear() cancels every pending one (not just
// the most recent), and they are all cancelled on unmount, so an animation
// from a previous puzzle or exercise can never play over the next one.
import { useCallback, useEffect, useMemo, useRef } from 'react'

export function useTimers() {
  const ids = useRef<number[]>([])
  const clear = useCallback(() => {
    ids.current.forEach((id) => window.clearTimeout(id))
    ids.current = []
  }, [])
  const schedule = useCallback((fn: () => void, ms: number) => {
    const id = window.setTimeout(() => {
      ids.current = ids.current.filter((x) => x !== id)
      fn()
    }, ms)
    ids.current.push(id)
  }, [])
  useEffect(() => clear, [clear])
  return useMemo(() => ({ schedule, clear }), [schedule, clear])
}
