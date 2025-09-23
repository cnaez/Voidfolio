import React, { useEffect, useState } from "react";
import { throttle } from "lodash";

export function useMobileBgDarken(
  isMobile: boolean,
  currentIndex: number,
  scrollableMainRef: React.RefObject<HTMLDivElement>
): [number, React.ReactNode] {
  const [mobileBgDarken, setMobileBgDarken] = useState(1);

  useEffect(() => {
    if (!isMobile) return;

    let ignoreScroll = false;
    let ignoreTimeout: ReturnType<typeof setTimeout> | null = null;

    const handleScroll = throttle(() => {
      if (ignoreScroll) return;
      const scrollableElement = scrollableMainRef.current;
      if (!scrollableElement) return;
      const scrollTop = scrollableElement.scrollTop;
      const sectionHeight = scrollableElement.clientHeight;
      const sectionStart = Math.pow(currentIndex, 1.25) * sectionHeight;
      // Make scrolling feel slower by increasing the virtual section height
      const virtualSectionHeight = sectionHeight * 1.7; // 1.7x slower, adjust as needed
      const progress = Math.min(
        1,
        Math.max(0, (scrollTop - sectionStart) / virtualSectionHeight)
      );
      // Optionally, apply a non-linear curve for even smoother feel
      // const curvedProgress = Math.pow(progress, 0.7);
      // const darkenValue = 1 - curvedProgress * 0.5;
      const darkenValue = 1 - progress * 0.5; // Darken from 1 to 0.5
      setMobileBgDarken(darkenValue);
    }, 33); // ~30fps

    const scrollableElement = scrollableMainRef.current;
    if (scrollableElement) {
      scrollableElement.addEventListener("scroll", handleScroll);
    }

    setMobileBgDarken(1);
    ignoreScroll = true;
    if (ignoreTimeout) clearTimeout(ignoreTimeout);
    ignoreTimeout = setTimeout(() => {
      ignoreScroll = false;
    }, 100);

    return () => {
      if (scrollableElement) {
        scrollableElement.removeEventListener("scroll", handleScroll);
      }
      handleScroll.cancel();
      if (ignoreTimeout) clearTimeout(ignoreTimeout);
    };
  }, [isMobile, currentIndex, scrollableMainRef]);

  const DarkenOverlay = isMobile
    ? React.createElement("div", {
        style: {
          position: "fixed",
          inset: 0,
          zIndex: 11,
          backgroundColor: "#000",
          opacity: 1 - mobileBgDarken,
          transition: "opacity 0.15s ease-out",
          pointerEvents: "none",
        },
        "aria-hidden": true,
      })
    : null;

  return [mobileBgDarken, DarkenOverlay];
}
