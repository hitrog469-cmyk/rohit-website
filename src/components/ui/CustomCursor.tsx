"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const trailX = useMotionValue(-100);
  const trailY = useMotionValue(-100);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [finePointer, setFinePointer] = useState(false);

  const springX = useSpring(cursorX, { damping: 25, stiffness: 350, mass: 0.4 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 350, mass: 0.4 });
  const trailSpringX = useSpring(trailX, { damping: 45, stiffness: 120, mass: 1 });
  const trailSpringY = useSpring(trailY, { damping: 45, stiffness: 120, mass: 1 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setFinePointer(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setFinePointer(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!visible) setVisible(true);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      trailX.set(e.clientX);
      trailY.set(e.clientY);
    };

    const checkTarget = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHovered(!!target.closest("a, button, [data-cursor-hover]"));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", checkTarget);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", checkTarget);
    };
  }, [cursorX, cursorY, trailX, trailY, visible]);

  if (!finePointer) return null;

  return (
    <>
      {/* Outer ring — lags behind */}
      <motion.div
        animate={{
          width: hovered ? 48 : 36,
          height: hovered ? 48 : 36,
          opacity: visible ? 1 : 0,
          borderColor: hovered ? "rgba(245,158,11,0.9)" : "rgba(245,158,11,0.4)",
        }}
        transition={{ duration: 0.2 }}
        style={{
          x: trailSpringX,
          y: trailSpringY,
          translateX: "-50%",
          translateY: "-50%",
          borderRadius: "50%",
          border: "1px solid rgba(245,158,11,0.4)",
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 9998,
        }}
      />

      {/* Core dot — snappy */}
      <motion.div
        animate={{
          width: hovered ? 10 : 6,
          height: hovered ? 10 : 6,
          opacity: visible ? 1 : 0,
          boxShadow: hovered
            ? "0 0 20px rgba(245,158,11,1)"
            : "0 0 8px rgba(245,158,11,0.7)",
        }}
        transition={{ duration: 0.15 }}
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          borderRadius: "50%",
          backgroundColor: "#F59E0B",
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />
    </>
  );
}
