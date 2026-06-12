"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const TABS = [
  {
    id: "mind",
    label: "World Map",
    icon: "◎",
    href: "/mind",
    tag: "INTERACTIVE",
    tagColor: "#F59E0B",
    headline: "Everything, connected.",
    sub: "Five domains. Forty-five nodes. Each one links somewhere real. Click to explore how engineering, Nepal, cricket, code, and ideas all live in the same mind.",
    cta: "Open the map →",
    preview: (
      <svg viewBox="0 0 340 220" className="w-full h-full" aria-hidden>
        <line x1="170" y1="110" x2="68"  y2="52"  stroke="#F59E0B" strokeWidth="0.8" strokeOpacity="0.35" />
        <line x1="170" y1="110" x2="272" y2="45"  stroke="#10B981" strokeWidth="0.8" strokeOpacity="0.35" />
        <line x1="170" y1="110" x2="290" y2="155" stroke="#3B82F6" strokeWidth="0.8" strokeOpacity="0.35" />
        <line x1="170" y1="110" x2="58"  y2="173" stroke="#8B5CF6" strokeWidth="0.8" strokeOpacity="0.35" />
        <line x1="170" y1="110" x2="178" y2="200" stroke="#F97316" strokeWidth="0.8" strokeOpacity="0.35" />
        <line x1="68"  y1="52"  x2="24" y2="22"  stroke="#F59E0B" strokeWidth="0.4" strokeOpacity="0.2" />
        <line x1="68"  y1="52"  x2="40" y2="80"  stroke="#F59E0B" strokeWidth="0.4" strokeOpacity="0.2" />
        <line x1="272" y1="45"  x2="310" y2="20" stroke="#10B981" strokeWidth="0.4" strokeOpacity="0.2" />
        <line x1="272" y1="45"  x2="318" y2="65" stroke="#10B981" strokeWidth="0.4" strokeOpacity="0.2" />
        <line x1="290" y1="155" x2="328" y2="135" stroke="#3B82F6" strokeWidth="0.4" strokeOpacity="0.2" />
        {[
          { cx: 68,  cy: 52,  c: "#F59E0B", l: "ENG"  },
          { cx: 272, cy: 45,  c: "#10B981", l: "NPL"  },
          { cx: 290, cy: 155, c: "#3B82F6", l: "CRK"  },
          { cx: 58,  cy: 173, c: "#8B5CF6", l: "CODE" },
          { cx: 178, cy: 200, c: "#F97316", l: "IDEAS" },
        ].map(({ cx, cy, c, l }) => (
          <g key={l}>
            <circle cx={cx} cy={cy} r="14" fill={c} fillOpacity="0.1" stroke={c} strokeWidth="1" strokeOpacity="0.6" />
            <text x={cx} y={cy + 4} textAnchor="middle" fontSize="6" fill={c} fillOpacity="0.9" fontFamily="monospace" fontWeight="700">{l}</text>
          </g>
        ))}
        {[[24,22,"#F59E0B"],[40,80,"#F59E0B"],[310,20,"#10B981"],[318,65,"#10B981"],[328,135,"#3B82F6"]].map(([cx, cy, c], i) => (
          <circle key={i} cx={cx as number} cy={cy as number} r="4" fill={c as string} fillOpacity="0.5" />
        ))}
        <circle cx="170" cy="110" r="20" fill="#F59E0B" fillOpacity="0.08" stroke="#F59E0B" strokeWidth="1.5" strokeOpacity="0.9" />
        <circle cx="170" cy="110" r="10" fill="#F59E0B" fillOpacity="0.18" />
        <text x="170" y="107" textAnchor="middle" fontSize="7" fill="#F59E0B" fontFamily="monospace" fontWeight="800">ROHIT</text>
        <text x="170" y="117" textAnchor="middle" fontSize="5.5" fill="#F59E0B" fontFamily="monospace" fillOpacity="0.6">ACHARYA</text>
      </svg>
    ),
  },
  {
    id: "journey",
    label: "The Journey",
    icon: "▷",
    href: "/journey",
    tag: "8 CHAPTERS",
    tagColor: "#10B981",
    headline: "From Kathmandu to wherever this goes.",
    sub: "2003 to ????. The earthquake that chose a career. The university 1,500km from home. The thesis. The website. The road back.",
    cta: "Read the story →",
    preview: (
      <div className="w-full h-full flex items-center justify-center px-6 py-4">
        <div className="w-full space-y-3">
          {[
            { year: "2003", label: "Born in Kathmandu", color: "#10B981" },
            { year: "2015", label: "The earthquake chose me", color: "#EF4444" },
            { year: "2021", label: "NIT Rourkela + ABAQUS", color: "#3B82F6" },
            { year: "2024", label: "+30% buckling improvement", color: "#F59E0B" },
            { year: "????", label: "Going home", color: "#6B7280" },
          ].map(({ year, label, color }, i) => (
            <motion.div
              key={year}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
              <span className="font-mono text-[10px] shrink-0" style={{ color, minWidth: "2.2rem" }}>{year}</span>
              <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>{label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "lab",
    label: "The Lab",
    icon: "⬡",
    href: "/lab",
    tag: "LIVE TOOLS",
    tagColor: "#3B82F6",
    headline: "Real tools. Real math.",
    sub: "Beam deflection solver, column buckling with Euler's formula, structural systems deep-dives. Not static diagrams — interactive calculators you can actually use.",
    cta: "Open the lab →",
    preview: (
      <div className="w-full h-full flex items-center justify-center px-6 py-4">
        <div className="w-full space-y-2">
          {[
            { label: "Beam Calculator",    tag: "LIVE", tagColor: "#10B981", desc: "Deflection · BMD · SFD" },
            { label: "Column Buckling",    tag: "LIVE", tagColor: "#10B981", desc: "Euler Pcr · K-factor" },
            { label: "Structural Systems", tag: "LIVE", tagColor: "#3B82F6", desc: "6 typologies deep-dive" },
            { label: "Failures Archive",   tag: "LIVE", tagColor: "#EF4444", desc: "Tacoma · Dharahara · WTC" },
          ].map(({ label, tag, tagColor, desc }) => (
            <div key={label} className="flex items-center justify-between rounded-lg px-3 py-2"
              style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}>
              <div>
                <div className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>{label}</div>
                <div className="text-[10px] font-mono" style={{ color: "var(--text-tertiary)" }}>{desc}</div>
              </div>
              <span className="text-[8px] font-mono px-1.5 py-0.5 rounded"
                style={{ color: tagColor, background: `${tagColor}18`, border: `1px solid ${tagColor}30` }}>
                {tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "failures",
    label: "Failures",
    icon: "◈",
    href: "/#beyond",
    tag: "PERSONAL",
    tagColor: "#EF4444",
    headline: "My failures are my credentials.",
    sub: "Botched simulations. Blanked presentations. Projects nobody used. Every one of them taught me something a textbook never could. Not a victim of these — built by them.",
    cta: "Read the honest part →",
    preview: (
      <div className="w-full h-full flex items-center justify-center px-6 py-4">
        <div className="w-full space-y-2">
          {[
            { num: "01", label: "Left everything I knew at 18",        color: "#F59E0B" },
            { num: "02", label: "First semester almost broke me",       color: "#EF4444" },
            { num: "03", label: "Watched the earthquake on a screen",   color: "#3B82F6" },
            { num: "04", label: "Lost a friend and handled it badly",   color: "#8B5CF6" },
            { num: "05", label: "Rejected from things I wanted badly",  color: "#10B981" },
            { num: "06", label: "A year of being lost and too busy",    color: "#F97316" },
          ].map(({ num, label, color }) => (
            <div key={num} className="flex items-center gap-3 rounded-lg px-3 py-1.5"
              style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}>
              <span className="font-black text-xs shrink-0 w-5" style={{ color: `${color}50` }}>{num}</span>
              <div className="w-1 h-1 rounded-full shrink-0" style={{ background: color }} />
              <div className="text-xs" style={{ color: "var(--text-secondary)" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

export default function ExploreTeaser() {
  const [active, setActive] = useState("mind");
  const tab = TABS.find(t => t.id === active)!;

  return (
    <section id="explore" className="py-24 px-6 max-w-6xl mx-auto">

      {/* ── Tab bar — FIRST, most prominent ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex gap-1 mb-10 p-1 rounded-2xl w-fit"
        style={{
          background: "var(--bg-elevated)",
          border: "1px solid var(--border-subtle)",
          boxShadow: "var(--shadow-card)",
        }}
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono transition-colors duration-150"
            style={{
              color: active === t.id ? "var(--text-primary)" : "var(--text-tertiary)",
            }}
          >
            {active === t.id && (
              <motion.div
                layoutId="tab-pill"
                className="absolute inset-0 rounded-xl"
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border-default)",
                  boxShadow: "var(--shadow-card)",
                }}
                transition={{ type: "spring", stiffness: 420, damping: 38 }}
              />
            )}
            <span className="relative z-10 text-sm">{t.icon}</span>
            <span className="relative z-10 hidden sm:inline tracking-wide">{t.label}</span>
          </button>
        ))}
      </motion.div>

      {/* ── Section label + heading ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.08 }}
        className="flex items-center gap-3 mb-4"
      >
        <div className="h-px w-8" style={{ background: "var(--amber)", opacity: 0.5 }} />
        <span className="text-[9px] font-mono tracking-[0.5em]" style={{ color: "var(--amber)" }}>GO DEEPER</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.14 }}
        className="font-black text-3xl sm:text-4xl mb-10"
        style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
      >
        There&apos;s more to explore.
      </motion.h2>

      {/* ── Tab content panel ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.28 }}
          className="grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden"
          style={{ border: "1px solid var(--border-default)", boxShadow: "var(--shadow-card)" }}
        >
          {/* Left: info */}
          <div className="p-8 flex flex-col justify-between" style={{ background: "var(--bg-surface)" }}>
            <div>
              <div className="flex items-center gap-2 mb-5">
                <span
                  className="text-[9px] font-mono tracking-widest px-2.5 py-1 rounded-full"
                  style={{ color: tab.tagColor, background: `${tab.tagColor}12`, border: `1px solid ${tab.tagColor}28` }}
                >
                  {tab.tag}
                </span>
              </div>
              <h3
                className="font-bold text-2xl mb-4 leading-tight"
                style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
              >
                {tab.headline}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {tab.sub}
              </p>
            </div>
            <Link
              href={tab.href}
              className="inline-flex items-center gap-2 mt-8 text-sm font-mono font-semibold transition-all group"
              style={{ color: tab.tagColor }}
            >
              <span className="group-hover:underline underline-offset-4">{tab.cta}</span>
              <motion.span animate={{ x: [0, 3, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>
            </Link>
          </div>

          {/* Right: visual preview */}
          <div
            className="min-h-[260px] flex items-center justify-center relative overflow-hidden"
            style={{ background: "var(--bg-elevated)", borderLeft: "1px solid var(--border-subtle)" }}
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.04]"
              style={{
                backgroundImage: "linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            <div className="relative w-full h-full">
              {tab.preview}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── Bottom quick links to other tabs ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="flex flex-wrap gap-5 mt-6 pt-4"
        style={{ borderTop: "1px solid var(--border-subtle)" }}
      >
        {TABS.filter(t => t.id !== active).map(t => (
          <Link
            key={t.id}
            href={t.href}
            className="flex items-center gap-1.5 text-xs font-mono hover:opacity-80 transition-opacity"
            style={{ color: "var(--text-quaternary)" }}
          >
            <span>{t.icon}</span>
            <span>{t.label} →</span>
          </Link>
        ))}
      </motion.div>
    </section>
  );
}
