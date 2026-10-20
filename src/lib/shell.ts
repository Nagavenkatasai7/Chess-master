// Lets pages talk to the app frame: hide the tab bar during a game
// ("immersive" mode) and set the mobile top-bar title.
import { createContext, useContext, useEffect } from 'react'

export interface ShellApi {
  setImmersive: (on: boolean) => void
  setTitle: (title: string | null) => void
}

export const ShellContext = createContext<ShellApi>({ setImmersive: () => {}, setTitle: () => {} })

export function useImmersive(on: boolean) {
  const { setImmersive } = useContext(ShellContext)
  useEffect(() => {
    setImmersive(on)
    return () => setImmersive(false)
  }, [on, setImmersive])
}

export function usePageTitle(title: string | null) {
  const { setTitle } = useContext(ShellContext)
  useEffect(() => {
    setTitle(title)
    return () => setTitle(null)
  }, [title, setTitle])
}

/** True when running as an installed app (home-screen / standalone window). */
export function isStandalone(): boolean {
  return window.matchMedia('(display-mode: standalone)').matches || (navigator as Navigator & { standalone?: boolean }).standalone === true
}
