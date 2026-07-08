"use client";
import { useEffect, useRef, useState } from "react";

export function useCounter(end: number, duration = 1800, startOnMount = false) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(startOnMount);
  const frameRef = useRef<number>();

  const start = () => setStarted(true);

  // Fallback: if the in-view trigger never fires (mobile, fast scroll,
  // reduced motion), show the real value instead of staying at 0.
  useEffect(() => {
    const fallback = setTimeout(() => {
      setCount((c) => (c === 0 ? end : c));
    }, 2500);
    return () => clearTimeout(fallback);
  }, [end]);

  useEffect(() => {
    if (!started) return;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out expo
      const eased = 1 - Math.pow(2, -10 * progress);
      setCount(Math.round(eased * end));
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, [started, end, duration]);

  return { count, start };
}
