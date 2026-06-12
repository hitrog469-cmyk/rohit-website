"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Magnetic from "@/components/ui/Magnetic";

const HeroMesh = dynamic(() => import("@/components/three/HeroMesh"), {
  ssr: false,
});

const FIRST_NAME = "ROHIT";
const LAST_NAME = "ACHARYA";

const ROLES = [
  "Structural Engineer",
  "FG-GRC Researcher",
  "FEM · ABAQUS · MATLAB",
  "Engineering Educator",
  "Builder of Things",
  "From Baglung, Nepal",
];

function LetterReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="inline-flex">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 60, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.06,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block"
          style={{ transformOrigin: "bottom center" }}
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </span>
  );
}

function RoleRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROLES.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-8 md:h-10 overflow-hidden relative">
      <AnimatePresence mode="wait">
        <motion.span
          key={ROLES[index]}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center text-[#F59E0B] font-mono text-sm md:text-base tracking-widest"
        >
          {ROLES[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

function ScrollArrow() {
  return (
    <motion.div
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 3.5, duration: 1 }}
    >
      <span className="text-[#525252] text-xs tracking-widest font-mono uppercase">
        scroll
      </span>
      <motion.div
        className="w-px h-12 bg-gradient-to-b from-[#F59E0B]/60 to-transparent"
        animate={{ scaleY: [1, 0.4, 1], opacity: [0.8, 0.3, 0.8] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "top" }}
      />
    </motion.div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-void"
    >
      {/* Three.js background */}
      <div className="absolute inset-0 z-0">
        <HeroMesh />
      </div>

      {/* Radial amber glow at center */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(245,158,11,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-void to-transparent z-10 pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 select-none">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="section-label mb-10"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse-slow" />
          Based in Kathmandu, Nepal
        </motion.div>

        {/* Name — the hero */}
        <div
          className="text-display font-black text-[#F5F5F5] tracking-tight mb-2 overflow-hidden"
          style={{ perspective: "1000px" }}
        >
          <LetterReveal text={FIRST_NAME} delay={0.5} />
        </div>
        <div
          className="text-display font-black tracking-tight mb-8 overflow-hidden"
          style={{
            perspective: "1000px",
            WebkitTextStroke: "1px rgba(245,158,11,0.4)",
            color: "transparent",
          }}
        >
          <LetterReveal text={LAST_NAME} delay={0.85} />
        </div>

        {/* Rotating role */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.5 }}
        >
          <RoleRotator />
        </motion.div>

        {/* Tagline — the full human */}
        <motion.div
          className="flex flex-col items-center gap-2 mt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.7 }}
        >
          <p className="text-[#525252] text-xs md:text-sm font-mono tracking-widest max-w-md text-center leading-relaxed">
            Engineer &nbsp;·&nbsp; Researcher &nbsp;·&nbsp; Educator
          </p>
          <p className="text-[#333] text-xs font-mono tracking-wider">
            Kathmandu &nbsp;·&nbsp; NIT Rourkela &nbsp;·&nbsp; Learners Club
          </p>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-wrap gap-4 mt-10 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.7 }}
        >
          <Magnetic>
            <button
              onClick={() => {
                document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-6 py-3 rounded-full bg-[#F59E0B] text-black text-sm font-bold tracking-wide hover:bg-[#FBBF24] transition-all duration-200 hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]"
            >
              Who I Am →
            </button>
          </Magnetic>
          <Magnetic>
            <button
              onClick={() => {
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-6 py-3 rounded-full border border-[#333333] text-[#A3A3A3] text-sm font-medium tracking-wide hover:border-[#F59E0B]/40 hover:text-[#F5F5F5] transition-all duration-200"
            >
              Get In Touch
            </button>
          </Magnetic>
        </motion.div>
      </div>

      <ScrollArrow />
    </section>
  );
}
