'use client'

import React, { JSX, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { Menu, X, Phone, User, Briefcase, Mail } from 'lucide-react'
import Logo from './Logo'

type HeaderProps = {
  mode?: 'dark' | 'light'
}

export default function Header({ mode }: HeaderProps): JSX.Element {
  const [hidden, setHidden] = useState<boolean>(false)
  const [mobileOpen, setMobileOpen] = useState<boolean>(false)
  const [scrolled, setScrolled] = useState<boolean>(false)
  const lastY = useRef<number>(0)

  // Scroll hide/show
  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      const y = window.scrollY
      if (!ticking) {
        ticking = true
        window.requestAnimationFrame(() => {
          setHidden(y > lastY.current && y > 80)
          setScrolled(y > 40)
          lastY.current = y
          ticking = false
        })
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  const headerAnim = useMemo<Variants>(
    () => ({
      hidden: {
        y: -84,
        opacity: 0,
        transition: { duration: prefersReducedMotion ? 0 : 0.28 },
      },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          duration: prefersReducedMotion ? 0 : 0.36,
          ease: [0.22, 1, 0.36, 1],
        },
      },
    }),
    [prefersReducedMotion]
  )

  const menuAnim = useMemo<Variants>(
    () => ({
      closed: { height: 0, opacity: 0, transition: { duration: 0.24 } },
      open: { height: 'auto', opacity: 1, transition: { duration: 0.26 } },
    }),
    []
  )

  const navLinks = useMemo(
    () => [
      { href: '#about', label: 'About', Icon: User },
      { href: '#projects', label: 'Projects', Icon: Briefcase },
      { href: '#contact', label: 'Contact', Icon: Mail },
    ],
    []
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) setMobileOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mobileOpen])

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.header
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={headerAnim}
          className={`fixed inset-x-0 top-0 z-50 pointer-events-auto transition-all duration-300
            ${
              scrolled
                ? 'backdrop-blur-xl bg-white/7 border-b border-white/8 shadow-lg'
                : 'bg-white/3 backdrop-blur-md'
            }
          `}
        >
          <div className="max-w-7xl mx-auto px-4 py-2.5">
            <div className="flex items-center justify-between gap-4">
              {/* Logo */}
              <Link
                href="/"
                className="flex items-center gap-3 mr-2"
                aria-label="Home"
              >
                <div
                  className={`bg-white/10 backdrop-blur-sm rounded-full p-1 shadow-md`}
                >
                  <Logo />
                </div>
                <div className="hidden sm:flex flex-col leading-tight">
                  <span className="text-sm font-semibold text-white/95">
                    Void<span className="text-purple-300 ml-1">Studio</span>
                  </span>
                  <span className="text-[10px] text-white/50">
                    Design & Motion
                  </span>
                </div>
              </Link>

              {/* Desktop nav */}
              <nav className="hidden md:flex items-center gap-6 ml-auto">
                {navLinks.map(({ href, label, Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className="group flex items-center gap-2 px-2 py-1 rounded-md transition-transform transform-gpu will-change-transform"
                  >
                    <Icon
                      className={`w-4 h-4 ${
                        mode === 'dark'
                          ? 'text-white/70 group-hover:text-white'
                          : 'text-black/70 group-hover:text-black'
                      } transition-colors`}
                    />
                    <span
                      className={`text-sm ${
                        mode === 'dark'
                          ? 'text-white/80 group-hover:text-white'
                          : 'text-black/80 group-hover:text-black'
                      }`}
                    >
                      {label}
                    </span>
                  </Link>
                ))}
                <Link
                  href="/startProject"
                  className="ml-4 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 shadow-md hover:shadow-lg active:scale-95 transition transform-gpu"
                >
                  <Phone className="w-4 h-4" />
                  <span>Start</span>
                </Link>
              </nav>

              {/* Mobile button */}
              <div className="md:hidden ml-auto">
                <button
                  aria-label="Toggle menu"
                  aria-expanded={mobileOpen}
                  onClick={() => setMobileOpen((s) => !s)}
                  className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/6 backdrop-blur-sm border border-white/8 hover:bg-white/10 transition focus:outline-none"
                >
                  <AnimatePresence mode="wait">
                    {mobileOpen ? (
                      <motion.span
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.18 }}
                      >
                        <X className="w-5 h-5 text-white" />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="open"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.18 }}
                      >
                        <Menu className="w-5 h-5 text-white" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
              {mobileOpen && (
                <motion.div
                  variants={menuAnim}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="md:hidden overflow-hidden mt-3 rounded-lg"
                >
                  <div className="bg-white/6 backdrop-blur-xl border border-white/10 p-4">
                    <nav className="flex flex-col gap-3">
                      {navLinks.map(({ href, label, Icon }) => (
                        <Link
                          key={href}
                          href={href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 transition"
                        >
                          <Icon className="w-5 h-5 text-purple-300" />
                          <span className="font-medium text-white/90">
                            {label}
                          </span>
                        </Link>
                      ))}
                      <Link
                        href="/startProject"
                        onClick={() => setMobileOpen(false)}
                        className="mt-2 inline-flex items-center justify-center gap-2 p-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 font-semibold"
                      >
                        <Phone className="w-5 h-5" />
                        <span>Start Your Project</span>
                      </Link>
                    </nav>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  )
}
