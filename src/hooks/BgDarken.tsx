import React, { useEffect, useState } from 'react'
import { Sec } from '../types/index'
import throttle from 'lodash/throttle'

interface BgDarkenProps {
  mode?: Sec['mode']
  zIndex?: number
  type?: 'image' | 'video'
  scrollContainerRef: React.RefObject<HTMLElement | null>
  currentSectionIndex: number
}

function getOverlayGradient(mode?: Sec['mode']): string | undefined {
  if (!mode) return undefined
  return mode === 'dark'
    ? `linear-gradient(0deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.4) 100%)`
    : `linear-gradient(0deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.4) 100%)`
}

/**
 * Renders a background overlay gradient div for image or video backgrounds.
 * Handles its own scroll progress and animates opacity accordingly.
 */
export const BgDarken: React.FC<BgDarkenProps> = ({
  mode,
  type,
  zIndex = 2,
  scrollContainerRef,
  currentSectionIndex,
}) => {
  const overlayGradient = getOverlayGradient(mode)
  const [amount, setAmount] = useState(1)

  useEffect(() => {
    const main = scrollContainerRef.current
    if (!main) return
    setAmount(1)
    const handleScroll = throttle(() => {
      const sections = Array.from(main.querySelectorAll('section.snap-start'))
      const section = sections[currentSectionIndex] as HTMLElement | undefined
      if (!section) return
      const sectionRect = section.getBoundingClientRect()
      const mainRect = main.getBoundingClientRect()
      const sectionTop = sectionRect.top - mainRect.top + main.scrollTop
      const sectionHeight = section.offsetHeight
      const scrollTop = main.scrollTop
      // Clamp progress between 0 and 1
      const progress = Math.min(
        Math.max((scrollTop - sectionTop) / sectionHeight, 0),
        1
      )
      // Use a power curve for faster fade (e.g., progress^0.5)
      const fastProgress = Math.pow(progress, 0.12)
      const target = 1 - fastProgress
      // If not in this section, keep previous value (do not jump)
      if (scrollTop < sectionTop || scrollTop > sectionTop + sectionHeight)
        return
      setAmount(target)
    }, 33)
    main.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => {
      main.removeEventListener('scroll', handleScroll)
      if (handleScroll.cancel) handleScroll.cancel()
    }
  }, [scrollContainerRef, currentSectionIndex])

  if (!overlayGradient) return null

  console.log('amount', amount)

  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        backgroundImage: overlayGradient,
        zIndex,
        opacity: amount,
        transition: 'opacity 0.25s ease-out',
      }}
      aria-hidden
      data-bg-type={type}
    />
  )
}
