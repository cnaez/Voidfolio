'use client'

import { useEffect, useState } from 'react'

/**
 * Given a list of section ids (strings like "section-3"), returns the index
 * of the section that's most visible (threshold 0.5). Use this in your page
 * to compute currentIndex to pass into BackgroundManager.
 */
export function useActiveSection(sectionIds: string[]) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!sectionIds || sectionIds.length === 0) return
    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        // pick entry with largest intersectionRatio
        let best: IntersectionObserverEntry | null = null
        for (const e of entries) {
          if (!best || e.intersectionRatio > best.intersectionRatio) best = e
        }
        if (best && best.target && best.isIntersecting) {
          const idx = sectionIds.indexOf((best.target as HTMLElement).id)
          if (idx >= 0) setActiveIndex(idx)
        }
      },
      { threshold: [0.25, 0.5, 0.75] }
    )
    els.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [sectionIds.join('|')])

  return activeIndex
}
