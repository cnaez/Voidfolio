import { useEffect } from 'react'
import { Sec } from '../types/index'

export function usePreloadBackgrounds({
  sections,
  currentIndex,
  isMobile,
}: {
  sections: Sec[]
  currentIndex: number
  isMobile: boolean
}) {
  useEffect(() => {
    const indicesToPreload = [currentIndex, currentIndex + 1, currentIndex - 1]

    indicesToPreload.forEach((idx) => {
      const section = sections[idx]
      if (!section) return

      if (section.type === 'image' && section.bg) {
        // preload image
        const img = new Image()
        img.src = section.bg
      }

      if (section.type === 'video' && section.bg) {
        // preload video
        const video = document.createElement('video')
        video.src = section.bg
        video.preload = 'auto'
      }

      // optionally preload poster for videos
      if (section.poster) {
        const posterImg = new Image()
        posterImg.src = section.poster
      }
    })
  }, [sections, currentIndex, isMobile])
}
