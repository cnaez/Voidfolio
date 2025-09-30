import { useEffect, useState } from 'react'

export function useIsMobile(breakpoint = 769) {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    // SSR-safe: check if window exists
    if (typeof window === 'undefined') return false
    return window.matchMedia(`(max-width: ${breakpoint}px)`).matches
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const media = window.matchMedia(`(max-width: ${breakpoint}px)`)

    // update state in case it changed since initial render
    setIsMobile(media.matches)

    const listener = (event: MediaQueryListEvent) => setIsMobile(event.matches)
    media.addEventListener('change', listener)

    return () => media.removeEventListener('change', listener)
  }, [breakpoint])

  return isMobile
}
