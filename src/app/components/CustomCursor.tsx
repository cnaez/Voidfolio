"use client";

import { useEffect } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  // track raw pointer coords
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // spring‑smooth them
  const springConfig = { damping: 30, stiffness: 300 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    document.addEventListener("mousemove", move);
    return () => document.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{
        translateX: cursorX,
        translateY: cursorY,
      }}
      className="
        pointer-events-none
        fixed top-0 left-0
        size-8
        rounded-full
        bg-white/10
        backdrop-blur-xs
        cardShadow
        transform -translate-x-1/2 -translate-y-1/2
        z-50
        mix-blend-normal
      "
    />
  );
}
