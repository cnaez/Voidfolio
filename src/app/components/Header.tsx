"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY.current && currentY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const variants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 130,
        damping: 30,
      },
    },
    hidden: {
      y: -100,
      opacity: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 50,
      },
    },
  };

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.header
          key="header"
          initial="visible"
          animate="visible"
          exit="hidden"
          variants={variants}
          className="fixed inset-x-0 top-0 z-40 flex justify-between items-center px-6 py-4 backdrop-blur-sm bg-transparent shadow-md"
        >
          <div className="text-xl font-bold">
            <Link href="/" className='font-casual'>Shift/Dev</Link>
          </div>
          <nav className="space-x-6">
            <Link href="#about" className="hover:underline">
              About
            </Link>
            <Link href="#projects" className="hover:underline">
              Projects
            </Link>
            <Link href="#contact" className="hover:underline">
              Contact
            </Link>
          </nav>
        </motion.header>
      )}
    </AnimatePresence>
  );
}