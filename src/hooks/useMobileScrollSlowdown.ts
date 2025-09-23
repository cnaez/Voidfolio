import { useEffect } from "react";

/**
 * Slows down scroll speed on mobile by intercepting touch events and applying a slowdown multiplier.
 * @param ref - React ref to the scrollable element
 * @param isMobile - Whether the device is mobile
 * @param slowdown - Multiplier for scroll speed (e.g., 0.6 for 60% speed)
 */

export function useMobileScrollSlowdown(
  ref: React.RefObject<HTMLElement>,
  isMobile: boolean,
  slowdown: number = 1
) {
  useEffect(() => {
    if (!isMobile || !ref.current) return;
    const main = ref.current;
    let lastY = 0;
    let isTouching = false;
    let scrollStart = 0;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      isTouching = true;
      lastY = e.touches[0].clientY;
      scrollStart = main.scrollTop;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isTouching || e.touches.length !== 1) return;
      e.preventDefault();
      const currentY = e.touches[0].clientY;
      const deltaY = lastY - currentY;
      main.scrollTop = scrollStart + deltaY * slowdown;
    };
    const onTouchEnd = () => {
      isTouching = false;
    };
    main.addEventListener("touchstart", onTouchStart, { passive: false });
    main.addEventListener("touchmove", onTouchMove, { passive: false });
    main.addEventListener("touchend", onTouchEnd);
    return () => {
      main.removeEventListener("touchstart", onTouchStart);
      main.removeEventListener("touchmove", onTouchMove);
      main.removeEventListener("touchend", onTouchEnd);
    };
  }, [isMobile, ref, slowdown]);
}
