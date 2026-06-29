"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const CHAMBERS = [
  { code: "01", name: "Research Vault", color: "#F59E0B", glyph: "⬡", hint: "200+ simulations" },
  { code: "02", name: "Cricket Codex", color: "#3B82F6", glyph: "◉", hint: "XGBoost model" },
  { code: "03", name: "Nepal Files", color: "#10B981", glyph: "◎", hint: "Home country" },
];

export default function CodexTeaser() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="py-24 px-6 md:px-12 relative overflow-hidden" style={{ background: "var(--bg-page)" }}>
      {/* Blueprint grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(245,158,11,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,158,11,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(245,158,11,0.05) 0%, transparent 65%)" }}
      />

      <div ref={ref} className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          {/* Pulsing glyph */}
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="text-5xl mb-6 inline-block"
          >
            ◈
          </motion.div>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-[#F59E0B]/25" />
            <span className="text-[#F59E0B] text-[10px] font-mono tracking-[0.6em]">RESTRICTED ACCESS</span>
            <div className="h-px w-10 bg-[#F59E0B]/25" />
          </div>
          <h2
            className="font-black text-[#F5F5F5] mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.02em" }}
          >
            There&apos;s more to this website<br />
            <span className="text-[#F59E0B]">than you can see.</span>
          </h2>
          <p className="text-[#444] text-base max-w-md mx-auto leading-relaxed font-mono">
            Three chambers. Each locked behind a question.
            Wrong answer still gets you in — knowledge is its own key.
          </p>
        </motion.div>

        {/* Chamber cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {CHAMBERS.map((c, i) => (
            <motion.div
              key={c.code}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
            >
              <Link
                href={`/codex/${c.code === "01" ? "research" : c.code === "02" ? "cricket" : "nepal"}`}
                onMouseEnter={() => setHovered(c.code)}
                onMouseLeave={() => setHovered(null)}
                className="block p-5 rounded-xl border transition-all duration-300 relative overflow-hidden group"
                style={{
                  borderColor: hovered === c.code ? `${c.color}30` : "#111",
                  background: hovered === c.code ? `${c.color}08` : "#0a0a0a",
                  boxShadow: hovered === c.code ? `0 0 30px ${c.color}08` : "none",
                }}
              >
                {/* Top accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${c.color}, transparent)`,
                    opacity: hovered === c.code ? 0.7 : 0.2,
                  }}
                />
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl opacity-30 transition-opacity group-hover:opacity-60 duration-300" style={{ color: c.color }}>
                    {c.glyph}
                  </span>
                  <div className="w-6 h-6 flex items-center justify-center">
                    <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
                      <path d="M3 6V4a3 3 0 0 1 6 0v2" stroke={c.color} strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
                      <rect x="0.6" y="6" width="10.8" height="7.4" rx="1.6" stroke={c.color} strokeWidth="1.2" opacity="0.5"/>
                    </svg>
                  </div>
                </div>
                <span className="text-[9px] font-mono tracking-[0.4em] mb-1 block" style={{ color: c.color }}>
                  CHAMBER {c.code}
                </span>
                <div className="text-[#F5F5F5] font-semibold text-sm mb-1">{c.name}</div>
                <div className="text-[#333] text-xs font-mono">{c.hint}</div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <Link
            href="/codex"
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-[#F59E0B]/25 text-[#F59E0B] text-sm font-mono hover:bg-[#F59E0B]/8 hover:border-[#F59E0B]/50 transition-all duration-300 group"
          >
            <span>ENTER THE CODEX</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
            >→</motion.span>
          </Link>
          <p className="text-[#1a1a1a] text-[10px] font-mono mt-4 tracking-widest">
            The answer is in the research.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
