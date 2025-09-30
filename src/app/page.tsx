'use client'

import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import BackgroundManager from './components/BackgroundManager'
import {
  heroSection,
  horizontalSlides,
  verticalSections,
} from '@/data/sections'
import { Sec } from '@/types'

/* ---------- dynamic imports (ssr: false) ---------- */
const Header = dynamic(
  () => import('./components/Header').then((m) => m.default),
  { ssr: false }
)
const JelloCard = dynamic(
  () => import('./components/JelloCard').then((m) => m.JelloCard),
  { ssr: false }
)

/** ---------- Utility: observe visible section inside a scroll container ---------- */
function useContainerSectionObserver(
  sectionIds: string[],
  rootRef: React.RefObject<HTMLElement | null>
) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!sectionIds || sectionIds.length === 0) return
    const root = rootRef.current || null
    const obs = new IntersectionObserver(
      (entries) => {
        // choose the entry with highest intersectionRatio
        let best: IntersectionObserverEntry | null = null
        for (const e of entries) {
          if (!best) best = e
          else if (e.intersectionRatio > (best.intersectionRatio || 0)) best = e
        }
        if (best && best.isIntersecting) {
          const id = (best.target as HTMLElement).id
          const idx = sectionIds.indexOf(id)
          if (idx >= 0) setActiveIndex(idx)
        }
      },
      {
        root,
        threshold: [0.3, 0.5, 0.75],
      }
    )

    // attach
    requestAnimationFrame(() => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id)
        if (el) obs.observe(el)
      })
    })

    return () => obs.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds.join('|'), rootRef.current])

  return activeIndex
}

/** ---------- Main page component (uses BackgroundManager + JelloCard) ---------- */
const VoidCreativeStudioWithBackground: React.FC = () => {
  const scrollableMainRef = useRef<HTMLDivElement | null>(null)

  const bgSections = useMemo(() => {
    const arr: Sec[] = []
    arr.push(heroSection)
    arr.push(...verticalSections)
    arr.push({
      id: 'horizontal',
      title: 'Case Studies',
      desc: '',
      bg: horizontalSlides[0].bg,
      mode: horizontalSlides[0].mode,
      type: horizontalSlides[0].type,
      horizontal: true,
    })
    return arr
  }, [])

  const sectionIds = useMemo(
    () =>
      bgSections.map((s) =>
        s.id === 'hero'
          ? 'main-content'
          : s.id === 'horizontal'
          ? 'horizontal-section'
          : `section-${s.id}`
      ),
    [bgSections]
  )

  // active index (based on what is visible inside the scroll container)
  const activeIndex = useContainerSectionObserver(sectionIds, scrollableMainRef)
  const [currentIndex, setCurrentIndex] = useState(activeIndex)

  useEffect(() => {
    setCurrentIndex(activeIndex)
  }, [activeIndex])

  // onInView helper for fallback (if needed)
  const makeOnInView = useCallback(
    (index: number) => () => {
      setCurrentIndex(index)
    },
    []
  )

  // Horizontal carousel wheel handling (only when pointer is over it)
  const horizRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const el = horizRef.current
    if (!el) return

    let pointerOver = false
    let timer: number | null = null

    const onEnter = () => (pointerOver = true)
    const onLeave = () => (pointerOver = false)

    const onWheel = (e: WheelEvent) => {
      if (!pointerOver) return

      const deltaY = e.deltaY
      const maxLeft = el.scrollWidth - el.clientWidth
      const atLeft = el.scrollLeft <= 1
      const atRight = el.scrollLeft >= maxLeft - 1

      if ((atLeft && deltaY < 0) || (atRight && deltaY > 0)) return

      e.preventDefault()
      const multiplier = 1.6
      const raw =
        Math.sign(deltaY) * Math.min(900, Math.abs(deltaY) * multiplier)
      el.scrollBy({ left: raw, behavior: 'smooth' })

      // debounce
      if (timer !== null) clearTimeout(timer)
      timer = window.setTimeout(() => {
        setCurrentIndex(Math.round(el.scrollLeft / el.clientWidth))

        const focusEl = document.getElementById('horizontal-section') || el
        if (focusEl && typeof focusEl.focus === 'function') {
          focusEl.focus()
        }
      }, 140)
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('pointerenter', onEnter)
    el.addEventListener('pointerleave', onLeave)

    return () => {
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('pointerenter', onEnter)
      el.removeEventListener('pointerleave', onLeave)
      if (timer !== null) clearTimeout(timer)
    }
  }, [bgSections.length])

  return (
    <div className="relative w-full h-full">
      <Head>
        <title>Void Creative Studio</title>
        <meta
          name="description"
          content="Where ideas take shape — smooth native snap scrolling with managed backgrounds."
        />
      </Head>

      {/* Background manager lives behind content */}
      <BackgroundManager
        sections={bgSections}
        currentIndex={currentIndex}
        scrollableMainRef={scrollableMainRef}
      />

      <div className="relative z-10">
        <Header mode={bgSections[currentIndex]?.mode} />

        <main
          ref={scrollableMainRef}
          role="main"
          aria-label="Main content sections"
          tabIndex={-1}
          className="z-10 h-screen overflow-y-auto snap-y snap-mandatory"
          style={{ scrollBehavior: 'smooth' }}
        >
          {/* HERO */}
          <section
            id="main-content"
            className="min-h-screen snap-start flex items-center justify-center px-6"
            onFocus={makeOnInView(0)}
          >
            <div className="relative z-20 max-w-6xl text-center">
              <div className="mb-6">
                <span className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-semibold tracking-wide uppercase">
                  Void Creative Studio
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="block bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                  Where Ideas
                </span>
                <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
                  Take Shape
                </span>
                <span className="block text-white/80 text-xl md:text-2xl font-light mt-4">
                  in the Digital Void
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                We craft digital experiences that convert visitors into
                customers and ideas into{' '}
                <span className="text-purple-400 font-semibold">
                  profitable businesses
                </span>
                .
              </p>

              <div className="flex gap-4 justify-center">
                <a
                  href="/startProject"
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-full font-bold shadow-lg"
                >
                  Start Your Project
                </a>
                <button className="border border-white/20 px-6 py-3 rounded-full">
                  View Work
                </button>
              </div>
            </div>
          </section>

          {/* Vertical sections (render JelloCard) */}
          {verticalSections.map((sec, i) => {
            const idx = 1 + i // hero is index 0
            return (
              <section
                id={`section-${sec.id}`}
                key={sec.id}
                className="min-h-screen snap-start flex items-center justify-center px-6"
                onFocus={makeOnInView(idx)}
              >
                <div className="relative z-20 max-w-5xl w-full">
                  <JelloCard
                    className={`text-center mx-auto px-8 py-16 md:py-20 rounded-3xl ${
                      sec.mode === 'light'
                        ? 'bg-white/5 text-black border border-white/10'
                        : 'bg-black/10 text-white border border-white/10'
                    } shadow-2xl`}
                  >
                    <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6 leading-tight">
                      {sec.title}
                    </h2>
                    <div className="text-base md:text-xl leading-relaxed whitespace-pre-line">
                      {sec.desc}
                    </div>
                  </JelloCard>
                </div>
              </section>
            )
          })}

          {/* Horizontal case-studies wrapper (logical snap stop) */}
          <section
            id="horizontal-section"
            className="min-h-screen snap-start flex items-center justify-center py-28"
            onFocus={makeOnInView(bgSections.length - 1)}
          >
            <div className="relative z-20 w-full">
              <div className="mb-6 text-right text-white/80">
                {/* optional counter or controls */}
              </div>

              <div
                ref={horizRef}
                id="horizontal-carousel"
                tabIndex={0}
                className="relative flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide touch-pan-x"
              >
                {horizontalSlides.map((slide) => (
                  <div
                    key={slide.id}
                    className="min-w-[85%] md:min-w-[60%] flex-shrink-0 snap-start flex items-center justify-center"
                  >
                    <JelloCard
                      className={`p-8 md:p-16 rounded-3xl backdrop-blur-xl ${
                        slide.mode === 'light'
                          ? 'bg-white/5 text-white border border-white/20'
                          : 'bg-black/20 text-white border border-white/10'
                      } shadow-2xl max-w-3xl`}
                    >
                      <h3 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                        {slide.title}
                      </h3>
                      <div className="text-base md:text-lg leading-relaxed">
                        {slide.desc}
                      </div>
                      <div className="mt-8 flex gap-4 justify-center">
                        <a
                          href="/startProject"
                          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-full font-semibold"
                        >
                          Claim Strategy Call
                        </a>
                        <a
                          href={`/case/${slide.id}`}
                          className="border border-white/20 px-6 py-3 rounded-full"
                        >
                          View Case
                        </a>
                      </div>
                    </JelloCard>
                  </div>
                ))}
              </div>

              {/* horizontal nav */}
              <div className="mt-8 flex gap-3 justify-center">
                <button
                  onClick={() => {
                    if (!horizRef.current) return
                    horizRef.current.scrollBy({
                      left: -Math.min(
                        window.innerWidth * 0.7,
                        horizRef.current.clientWidth
                      ),
                      behavior: 'smooth',
                    })
                  }}
                  className="bg-white/8 px-4 py-2 rounded-full"
                >
                  Prev
                </button>
                <button
                  onClick={() => {
                    if (!horizRef.current) return
                    horizRef.current.scrollBy({
                      left: Math.min(
                        window.innerWidth * 0.7,
                        horizRef.current.clientWidth
                      ),
                      behavior: 'smooth',
                    })
                  }}
                  className="bg-white/8 px-4 py-2 rounded-full"
                >
                  Next
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        :focus {
          outline: 3px solid rgba(255, 255, 255, 0.12);
          outline-offset: 2px;
        }
        .touch-pan-x {
          touch-action: pan-y;
        } /* allow vertical pan except when horizontal actively panned */
      `}</style>
    </div>
  )
}

export default VoidCreativeStudioWithBackground
