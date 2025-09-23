'use client'

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  CSSProperties,
} from 'react'
import { BgDarken } from '../../hooks/BgDarken'
import { Sec } from '../../types/index'
import { useResponsiveBgStyle } from '../../hooks/useResponsiveBgStyle'
import { usePreloadBackgrounds } from '../../hooks/usePreloadBackgrounds'
import { useScrollDirection } from '../../hooks/useScrollDirection'
import { useIsMobile } from '../../hooks/useIsMobile'

interface BackgroundManagerProps {
  sections: Sec[]
  currentIndex: number
  scrollableMainRef?: React.RefObject<HTMLElement | null>
  zIndex?: number
}

export const BackgroundManager: React.FC<BackgroundManagerProps> = ({
  sections,
  currentIndex,
  scrollableMainRef,
  zIndex = 0,
}) => {
  const isMobile = useIsMobile()
  const getBgStyle = useResponsiveBgStyle()
  const scroll = useScrollDirection(currentIndex)
  usePreloadBackgrounds({ sections, currentIndex, isMobile })

  const [currentBg, setCurrentBg] = useState<string>('')
  const [prevBg, setPrevBg] = useState<string>('')
  const [videoReady, setVideoReady] = useState(false)
  const overlayRef = useRef<HTMLElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const upKeyRef = useRef(0)

  // Load current bg
  useEffect(() => {
    const s = sections[currentIndex]
    if (!s) return
    setCurrentBg(s.bg ? (s.bg.startsWith('/') ? s.bg : '/' + s.bg) : '')
    setVideoReady(false)
  }, [currentIndex, sections])

  // Load previous bg for scroll-up overlay
  useEffect(() => {
    if (scroll.direction === 'up' && typeof scroll.prevIndex === 'number') {
      const s = sections[scroll.prevIndex]
      setPrevBg(s?.bg ? (s.bg.startsWith('/') ? s.bg : '/' + s.bg) : '')
    } else {
      setPrevBg('')
    }
  }, [scroll.direction, scroll.prevIndex, sections])

  // Increment overlay key on scroll up
  useEffect(() => {
    if (scroll.direction === 'up') upKeyRef.current += 1
  }, [scroll.direction, scroll.prevIndex])

  // Scroll-up overlay animation
  useEffect(() => {
    if (scroll.direction !== 'up' || !overlayRef.current) return
    const overlayEl = overlayRef.current as HTMLElement
    overlayEl.style.transform = 'translateY(0%)'
    let running = true
    const sectionHeight = window.innerHeight

    const update = () => {
      if (!running) return
      const scrollY = window.scrollY || window.pageYOffset
      const progress = Math.max(
        0,
        Math.min(1, (sectionHeight - (scrollY % sectionHeight)) / sectionHeight)
      )
      overlayEl.style.transform = `translateY(${progress * 100}%)`
      rafRef.current = requestAnimationFrame(update)
    }

    rafRef.current = requestAnimationFrame(update)

    return () => {
      running = false
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      overlayEl.style.transform = 'translateY(0%)'
    }
  }, [scroll.direction, upKeyRef.current])

  const currentSectionMode = sections[currentIndex]?.mode
  const prevSectionMode = sections[scroll.prevIndex]?.mode

  const getMergedStyle = useCallback(
    (
      mode: Sec['mode'] = 'dark',
      forceCenter?: boolean,
      extra?: CSSProperties
    ) => {
      const base = getBgStyle(mode || 'dark', !!forceCenter)
      return { ...base, ...(extra || {}) } as CSSProperties
    },
    [getBgStyle]
  )

  // ---------- Video + Image renderers ----------

  const renderImageBg = (
    url: string,
    keyVal?: string,
    mode?: Sec['mode'],
    style?: CSSProperties
  ) => {
    if (!url) return null
    return (
      <div
        key={keyVal || url}
        className="fixed inset-0 w-full h-full bg-cover bg-center transition-opacity duration-600"
        style={{
          backgroundImage: `url(${url})`,
          backgroundColor: '#0b0b0b',
          ...getMergedStyle(mode, false, style),
        }}
        aria-hidden="true"
      />
    )
  }

  const renderVideoBg = (
    url: string,
    keyVal?: string,
    mode?: Sec['mode'],
    style?: CSSProperties
  ) => {
    if (!url) return null
    return (
      <div
        key={keyVal || url}
        className="fixed inset-0 w-full h-full bg-black transition-opacity duration-300"
        style={{
          opacity: videoReady ? 1 : 0,
          ...getMergedStyle(mode, false, style),
        }}
        aria-hidden="true"
      >
        {/* Hidden preloader */}
        {!videoReady && (
          <video
            style={{ position: 'absolute', width: 0, height: 0, opacity: 0 }}
            src={url}
            preload="auto"
            onLoadedData={() => setVideoReady(true)}
          />
        )}

        {/* Visible video */}
        {videoReady && (
          <video
            key={`bgvideo-${keyVal || url}`}
            className="absolute inset-0 w-full h-full object-cover"
            src={url}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/images/bg4-poster.jpg" // optional, ensures fallback
          />
        )}
      </div>
    )
  }

  const renderBg = (
    bgUrl: string,
    type: 'image' | 'video',
    keyVal?: React.Key,
    mode?: Sec['mode'],
    style?: CSSProperties
  ) =>
    type === 'image'
      ? renderImageBg(bgUrl, String(keyVal), mode, style)
      : renderVideoBg(bgUrl, String(keyVal), mode, style)

  const renderOverlay = (
    bgUrl: string,
    type: 'image' | 'video',
    ref: React.RefObject<HTMLElement | null>,
    keyVal: React.Key,
    mode?: Sec['mode'],
    style?: CSSProperties
  ) => {
    const merged = getMergedStyle(mode, false, style)
    if (type === 'image') {
      return (
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          key={keyVal}
          className="absolute inset-0 w-full h-full bg-cover bg-center z-10"
          style={{
            backgroundImage: bgUrl ? `url(${bgUrl})` : undefined,
            transform: 'translateY(0%)',
            transition: 'transform 0.75s cubic-bezier(0.22,1,0.36,1)',
            ...merged,
          }}
          aria-hidden="true"
        />
      )
    }

    return (
      <video
        ref={ref as React.RefObject<HTMLVideoElement>}
        key={keyVal}
        className="absolute inset-0 w-full h-full object-cover z-10"
        src={bgUrl || undefined}
        autoPlay
        loop
        muted
        playsInline
        style={{
          transform: 'translateY(0%)',
          transition: 'transform 0.75s cubic-bezier(0.22,1,0.36,1)',
          ...merged,
        }}
        aria-hidden="true"
      />
    )
  }

  // ---------- Render main ----------

  if (scroll.direction === 'up') {
    return (
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex }}
        aria-hidden="true"
      >
        {renderBg(
          currentBg,
          sections[currentIndex]?.type as 'image' | 'video',
          currentBg,
          currentSectionMode
        )}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 21 }}
        >
          {renderOverlay(
            prevBg,
            sections[scroll.prevIndex]?.type as 'image' | 'video',
            overlayRef,
            `overlay-${upKeyRef.current}`,
            prevSectionMode
          )}
        </div>
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 22 }}
        >
          <BgDarken
            mode={currentSectionMode}
            type={sections[currentIndex]?.type as 'image' | 'video'}
            currentSectionIndex={currentIndex}
            scrollContainerRef={
              scrollableMainRef as React.RefObject<HTMLElement>
            }
          />
        </div>
      </div>
    )
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex }}
      aria-hidden="true"
    >
      {renderBg(
        currentBg,
        sections[currentIndex]?.type as 'image' | 'video',
        currentBg,
        currentSectionMode
      )}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 22 }}
      >
        <BgDarken
          mode={currentSectionMode}
          type={sections[currentIndex]?.type as 'image' | 'video'}
          currentSectionIndex={currentIndex}
          scrollContainerRef={scrollableMainRef as React.RefObject<HTMLElement>}
        />
      </div>
    </div>
  )
}

export default BackgroundManager
