import { useRef } from 'react'
import { motion, useSpring } from 'framer-motion'

interface JelloCardProps {
  children: React.ReactNode
  className?: string
}

export function JelloCard({ children, className = '' }: JelloCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  const rotX = useSpring(0, { damping: 20, stiffness: 150 })
  const rotY = useSpring(0, { damping: 20, stiffness: 150 })
  const scale = useSpring(1, { damping: 20, stiffness: 150 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const dx = (e.clientX - left) / width - 0.5
    const dy = (e.clientY - top) / height - 0.5

    rotX.set(dy * 20)
    rotY.set(-dx * 20)
    scale.set(1 + Math.hypot(dx, dy) * 0.15)
  }

  const handleMouseLeave = () => {
    rotX.set(0)
    rotY.set(0)
    scale.set(1)
  }
  const handleDragStart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {}) // Avoid promise error if autoplay is blocked
    }
  }

  return (
    <>
      <motion.div
        ref={ref}
        className={`${className} cursor-grab active:cursor-grabbing`}
        style={{
          rotateX: rotX,
          rotateY: rotY,
          scale,
          transformPerspective: 1000,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onDragStart={handleDragStart}
        drag
        dragElastic={0.18}
        dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      >
        {children}
      </motion.div>

      {/* <audio ref={audioRef} src="/sounds/pop.mp3" preload="auto" /> */}
    </>
  )
}
