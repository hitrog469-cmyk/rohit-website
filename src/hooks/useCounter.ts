"use client";
import { useEffect, useRef, useState } from "react";

export function useCounter(end: number, duration = 1800, startOnMount = false) {
  // Start at the final value so server-rendered HTML and any client with
  // slow, blocked or reduced-motion JS shows the real number instead of 0.
  const [count, setCount] = useState(end);
  const [started, setStarted] = useState(startOnMount);
  const frameRef = useRef<number>();

  const start = () => setStarted(true);

  useEffect(() => {
    if (!started) return;

    // Respect reduced-motion: hold the final value, skip the count-up.
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      setCount(end);
      return;
    }

    const startTime = performance.now();
    setCount(0);

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out expo
      const eased = 1 - Math.pow(2, -10 * progress);
      setCount(Math.round(eased * end));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setCount(end);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, [started, end, duration]);

  return { count, start };
}
