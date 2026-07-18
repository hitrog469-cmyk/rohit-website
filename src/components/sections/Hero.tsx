"use client";

import { motion } from "framer-motion";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
});

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden"
      style={{ background: "var(--bg-page)" }}
    >
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 md:px-10 pt-28 pb-16">
        {/* Kicker */}
        <motion.p
          {...fade(0.1)}
          className="font-mono text-xs tracking-[0.25em] uppercase mb-8"
          style={{ color: "var(--text-tertiary)" }}
        >
          Kathmandu, Nepal — Civil Engineer
        </motion.p>

        {/* Name */}
        <motion.h1 {...fade(0.2)} className="text-display mb-4" style={{ color: "var(--text-primary)" }}>
          Rohit Acharya
        </motion.h1>

        {/* Dimension line under the name — measured like a beam on a drawing */}
        <motion.div {...fade(0.35)} className="flex items-center max-w-md mb-10 select-none" aria-hidden>
          <div className="w-px h-3" style={{ background: "var(--amber)", opacity: 0.5 }} />
          <svg width="9" height="7" viewBox="0 0 9 7" className="shrink-0 -ml-px">
            <path d="M9 3.5 L1.5 3.5 M1.5 3.5 L6 1 M1.5 3.5 L6 6" stroke="var(--amber)" strokeOpacity="0.55" strokeWidth="1" fill="none" />
          </svg>
          <div className="flex-1 h-px" style={{ background: "var(--amber)", opacity: 0.35 }} />
          <span className="px-3 text-[9px] md:text-[10px] font-mono tracking-[0.3em]" style={{ color: "var(--amber)", opacity: 0.75 }}>
            EST. 2003 · BAGLUNG 28.27°N 83.59°E
          </span>
          <div className="flex-1 h-px" style={{ background: "var(--amber)", opacity: 0.35 }} />
          <svg width="9" height="7" viewBox="0 0 9 7" className="shrink-0 -mr-px">
            <path d="M0 3.5 L7.5 3.5 M7.5 3.5 L3 1 M7.5 3.5 L3 6" stroke="var(--amber)" strokeOpacity="0.55" strokeWidth="1" fill="none" />
          </svg>
          <div className="w-px h-3" style={{ background: "var(--amber)", opacity: 0.5 }} />
        </motion.div>

        {/* Introduction — written, not designed */}
        <motion.div {...fade(0.45)} className="max-w-2xl space-y-5">
          <p className="text-lg md:text-xl leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            I spend my days at{" "}
            <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>CloudFactory</span>{" "}
            checking what an AI thinks a construction site looks like against what it
            actually looks like — 360° site imagery versus BIM models, on the Buildots
            platform. Evenings go to research and to building engineering tools nobody
            asked me to build.
          </p>
          <p className="text-base leading-relaxed" style={{ color: "var(--text-tertiary)" }}>
            Before this: a B.Tech in civil engineering at NIT Rourkela, a thesis on the
            buckling of graphene-reinforced composite plates, and a childhood in Baglung
            that explains everything else. Currently applying to graduate programs in
            AI and computational methods for the built environment.
          </p>
        </motion.div>

        {/* Plain links, not glowing buttons */}
        <motion.div {...fade(0.6)} className="flex flex-wrap gap-x-8 gap-y-3 mt-10 font-mono text-sm">
          <button
            onClick={() => document.getElementById("research")?.scrollIntoView({ behavior: "smooth" })}
            className="transition-colors hover:opacity-70"
            style={{ color: "var(--amber)" }}
          >
            Research ↓
          </button>
          <button
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="transition-colors hover:opacity-70"
            style={{ color: "var(--amber)" }}
          >
            Things I&apos;ve built ↓
          </button>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="transition-colors hover:opacity-70"
            style={{ color: "var(--amber)" }}
          >
            Write to me ↓
          </button>
          <a
            href="/cv.pdf"
            className="transition-colors hover:opacity-70"
            style={{ color: "var(--text-tertiary)" }}
          >
            CV (PDF)
          </a>
        </motion.div>
      </div>
    </section>
  );
}
