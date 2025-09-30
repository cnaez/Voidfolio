import { useEffect } from 'react'
import { Sec } from '@/types/index'

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

    const getKVUrl = (path?: string) => {
      if (!path) return ''
      if (path.startsWith('/api/video/')) return path
      const filename = path.split('/').pop()
      return filename ? `/api/video/${filename}` : path
    }

    indicesToPreload.forEach((idx) => {
      const section = sections[idx]
      if (!section) return

      if (section.type === 'image' && section.bg) {
        const img = new Image()
        img.src = section.bg.startsWith('/api/video/') ? section.bg : section.bg
      }

      if (section.type === 'video' && section.bg) {
        const video = document.createElement('video')
        video.src = getKVUrl(section.bg)
        video.preload = 'auto'
      }

      // if (section.poster) {
      //   const posterImg = new Image()
      //   posterImg.src = section.poster
      // }
    })
  }, [sections, currentIndex, isMobile])
}
