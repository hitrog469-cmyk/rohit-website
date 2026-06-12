"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageCurtain() {
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Fast count 0→100 over ~1.6s
    let frame: number;
    const start = performance.now();
    const duration = 1600;

    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setCount(Math.floor(p * 100));
      if (p < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setVisible(false), 300);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9000] flex flex-col items-center justify-center bg-void"
          exit={{ clipPath: "inset(0 0 100% 0)", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
          {/* Name mark */}
          <motion.div
            className="text-[#F59E0B] font-mono text-sm tracking-[0.3em] uppercase mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Rohit Acharya
          </motion.div>

          {/* Counter */}
          <div className="text-[#F5F5F5] font-black text-8xl md:text-[10rem] leading-none tabular-nums">
            {String(count).padStart(2, "0")}
          </div>

          {/* Loading bar */}
          <div className="mt-10 w-48 h-px bg-[#1a1a1a] rounded overflow-hidden">
            <motion.div
              className="h-full bg-[#F59E0B]"
              initial={{ width: 0 }}
              animate={{ width: `${count}%` }}
            />
          </div>

          {/* Tagline fades in near end */}
          <motion.p
            className="mt-6 text-[#333] text-xs font-mono tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: count > 70 ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          >
            structural engineer · researcher · builder
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
