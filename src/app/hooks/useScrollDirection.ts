import { useEffect, useRef } from "react";

export function useScrollDirection(index: number) {
  // Track the previous index and direction
  const prevIndex = useRef(index);
  const prevIndexForReturn = useRef(index);
  const dir = useRef<"up" | "down" | null>(null);

  useEffect(() => {
    if (index > prevIndex.current) {
      dir.current = "down";
      prevIndexForReturn.current = prevIndex.current;
    } else if (index < prevIndex.current) {
      dir.current = "up";
      prevIndexForReturn.current = prevIndex.current;
    }
    prevIndex.current = index;
  }, [index]);

  // Always return the previous index that triggered the direction change
  return { direction: dir.current, prevIndex: prevIndexForReturn.current };
}
