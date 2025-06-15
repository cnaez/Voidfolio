"use client";

import { useEffect, useRef, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import Header from "./components/Header";
import CallIcon from "./components/CallIcon";
import { JelloCard } from "./components/JelloCard";

type Section = {
  id: number;
  title: string;
  desc: string;
  bg: string;
  poster: string;
  mode?: "dark" | "light";
};

const sectionsData: Section[] = [
  {
    id: 1,
    title: "We build digital products that don’t suck.",
    desc: "Modern dev studio. React, Next.js, Tailwind. Fast and clean.",
    bg: "/videos/bg1.mp4",
    poster: "/images/bg1-poster.jpg",
    mode: "dark",
  },
  {
    id: 2,
    title: "MVPs that launch in weeks, not quarters.",
    desc: "Pitch-ready products. Stripe, Auth, Dashboards, you name it.",
    bg: "/videos/bg2.mp4",
    poster: "/images/bg2-poster.jpg",
    mode: "light",
  },
  {
    id: 3,
    title: "Let’s build something remarkable.",
    desc: "If you want real outcomes—not just code—we’re your crew. We work with founders, startups, and teams that move fast.",
    bg: "/videos/bg3.mp4",
    poster: "/images/bg4-poster.jpg",
    mode: "dark",
  },
  {
    id: 4,
    title: "Words from the people who trust us.",
    desc: "“Shift/Dev delivers. Fast, reliable, and always clean. They’re the secret weapon behind our last 3 launches.” — Daniel, Product Lead",
    bg: "/videos/bg4.mp4",
    poster: "/images/bg3-poster.jpg",
    mode: "light",
  },
  {
    id: 5,
    title: "More Words from Clients",
    desc: "“I’m non-technical. Shift/Dev made it easy to go from idea to prototype—and users loved it.” — Jess, Founder @ RetailTech",
    bg: "/videos/bg5.mp4",
    poster: "/images/bg7-poster.jpg",
    mode: "dark",
  },
  {
    id: 6,
    title: "",
    desc: "",
    bg: "/videos/bg7.mp4",
    poster: "/images/project-bokeh-poster.jpg",
    mode: "light",
  },
  {
    id: 7,
    title: "Recent Projects",
    desc: "From fintech dashboards to creator platforms. See what we've built.",
    bg: "/videos/bg7.mp4",
    poster: "/images/project-bokeh-poster.jpg",
    mode: "light",
  },
  {
    id: 8,
    title: "How We Work",
    desc: "Weekly releases. Async by default. Loom updates. Figma to prod in days, not months.",
    bg: "/videos/bg8.mp4",
    poster: "/images/bg6-poster.jpg",
    mode: "light",
  },
  {
    id: 9,
    title: "You bring the vision.",
    desc: (
      <>
        <div className="text-lg md:text-xl mb-4 max-w-lg">
          We'll bring it to life—with purpose, speed, and care. We partner with
          people who move fast and think big.
        </div>
        <p className="text-sm text-gray-300 mb-6">
          Takes 2 minutes. No commitment.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="flex items-center gap-2 bg-white font-casual text-black px-6 py-3 rounded-full font-medium w-fit text-base transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
        >
          Schedule a Free Call
          <CallIcon />
        </motion.button>
      </>
    ),
    bg: "/videos/bg8.mp4",
    poster: "/images/bg6-poster.jpg",
    mode: "light",
  },
];

export default function Home() {
  const lenisRef = useRef<any>(null);
  const horizRef = useRef<HTMLDivElement>(null);
  const scrollSpeed = 0.1;

  useEffect(() => {
    let lenisInstance: any;
    (async () => {
      const { default: LenisModule } = await import("@studio-freight/lenis");
      lenisInstance = new LenisModule();
      lenisRef.current = lenisInstance;
      const raf = (time: number) => {
        lenisInstance.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    })();
    return () => lenisRef.current?.cancel();
  }, []);

  const sectionVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 80 },
      visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.2, duration: 0.7, ease: "easeOut" },
      }),
    }),
    []
  );

  const verticalSections = sectionsData.filter((sec) => sec.id < 6);
  const horizontalSections = sectionsData.filter((sec) => sec.id >= 6);

  const onWheel = useCallback((e: React.WheelEvent) => {
    if (horizRef.current) {
      e.preventDefault();
      horizRef.current.scrollBy({
        left: e.deltaY * scrollSpeed,
        behavior: "smooth",
      });
    }
  }, []);

  const renderSection = (sec: Section, idx: number) => {
    const isLight = sec.mode === "light";
    const overlayClass = isLight
      ? "absolute inset-0 bg-gradient-to-b from-white/40 to-white/10"
      : "absolute inset-0 bg-gradient-to-b from-black/50 to-black/20";
    const cardBg = isLight
      ? "bg-white/30 text-black cardShadow"
      : "bg-black/10 text-gray-300 cardShadow";

    return (
      <article
        key={sec.id}
        className="relative min-h-screen w-full flex-shrink-0 flex items-center justify-center px-4 md:px-8 text-center overflow-hidden snap-start"
        aria-labelledby={`section-${sec.id}-title`}
      >
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          src={sec.bg}
          poster={sec.poster}
          preload="metadata"
          autoPlay
          muted
          loop
          playsInline
          loading="lazy"
        />
        <div className={`${overlayClass} z-10`} />
        <JelloCard
          className={`relative z-20 max-w-3xl px-6 py-12 md:py-20 backdrop-blur-sm rounded-3xl ${cardBg}`}
        >
          <h2
            id={`section-${sec.id}-title`}
            className="font-heading text-3xl md:text-5xl font-bold mb-4 leading-tight"
          >
            {sec.title}
          </h2>
          <p className="text-base md:text-lg whitespace-pre-line">{sec.desc}</p>
        </JelloCard>
      </article>
    );
  };

  return (
    <main className="relative font-sans bg-black text-white">
      <Head>
        <title>Shift/Dev Studio</title>
      </Head>
      <Header />

      {/* Vertical Sections */}
      {verticalSections.map((sec, i) => renderSection(sec, i))}

      {/* Horizontal Section with Fixed Background Video */}
      <section className="relative min-h-screen w-full">
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          src={horizontalSections[0].bg}
          poster={horizontalSections[0].poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />

        <div className="absolute inset-0 bg-black/40 z-10" />
        <div
          ref={horizRef}
          onWheel={onWheel}
          className="relative z-20 flex overflow-x-auto snap-x snap-mandatory w-full min-h-screen"
        >
          {horizontalSections.map((sec, i) => (
            <div
              key={sec.id}
              className="min-w-full flex-shrink-0 flex items-center justify-start px-6 snap-start"
            >
              <div className="p-8 max-w-2xl">
                <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
                  {sec.title}
                </h2>
                <div className="text-lg whitespace-pre-line">{sec.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
