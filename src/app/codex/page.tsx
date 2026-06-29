"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/ui/Footer";

const CHAMBERS = [
  {
    code: "01",
    href: "/codex/research",
    name: "The Research Vault",
    desc: "FG-GRC thesis deep dive. Parametric studies, ABAQUS methodology, and what 200+ simulations taught me.",
    tags: ["Buckling", "Composites", "FEM", "Graphene"],
    color: "#F59E0B",
    glyph: "⬡",
  },
  {
    code: "02",
    href: "/codex/cricket",
    name: "The Cricket Codex",
    desc: "IPL analytics, XGBoost match prediction, and how data transformed the way I watch cricket.",
    tags: ["XGBoost", "IPL", "Batting Impact", "Python"],
    color: "#3B82F6",
    glyph: "◈",
  },
  {
    code: "03",
    href: "/codex/nepal",
    name: "The Nepal Files",
    desc: "Infrastructure gaps, the Kathmandu I grew up in, and why Nepal desperately needs engineers who code.",
    tags: ["Infrastructure", "Kathmandu", "SHM", "Bridges"],
    color: "#10B981",
    glyph: "◉",
  },
];

export default function CodexPage() {
  return (
    <main className="min-h-screen bg-[#020202] relative overflow-hidden">
      <Navigation />

      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(245,158,11,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,158,11,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 20%, rgba(245,158,11,0.07) 0%, transparent 60%)" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-32 pb-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-[#F59E0B]/30" />
            <span className="text-[#F59E0B] text-[10px] font-mono tracking-[0.5em]">RESTRICTED ACCESS</span>
            <div className="h-px w-12 bg-[#F59E0B]/30" />
          </div>
          <h1 className="font-black text-[#F5F5F5] mb-4" style={{ fontSize: "clamp(3rem, 8vw, 5rem)", letterSpacing: "-0.02em" }}>
            THE <span className="text-[#F59E0B]">CODEX</span>
          </h1>
          <p className="text-[#525252] text-base max-w-lg mx-auto leading-relaxed font-mono">
            Three chambers. Each locked behind a question.
            <br />
            Wrong answer still grants entry — knowledge is its own key.
          </p>
          <div className="flex items-center justify-center gap-2 mt-6">
            <motion.div
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]"
            />
            <span className="text-[#333] text-xs font-mono">CIPHER LOCK ACTIVE ON ALL CHAMBERS</span>
          </div>
        </motion.div>

        {/* Chambers */}
        <div className="grid md:grid-cols-3 gap-6">
          {CHAMBERS.map((c, i) => (
            <motion.div
              key={c.code}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
            >
              <Link href={c.href} className="group block h-full">
                <div
                  className="h-full rounded-2xl border bg-[#0a0a0a] p-6 relative overflow-hidden transition-all duration-500 hover:-translate-y-1"
                  style={{
                    borderColor: `${c.color}20`,
                    boxShadow: `0 0 0 0 ${c.color}10`,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 40px ${c.color}12, 0 0 0 1px ${c.color}25`)}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 0 0 ${c.color}10`)}
                >
                  {/* Top accent */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl opacity-60"
                    style={{ background: `linear-gradient(90deg, transparent, ${c.color}, transparent)` }}
                  />

                  {/* Glyph + lock */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono tracking-[0.4em] mb-1" style={{ color: c.color }}>
                        CHAMBER {c.code}
                      </span>
                      <span className="text-4xl opacity-20" style={{ color: c.color }}>{c.glyph}</span>
                    </div>
                    {/* Padlock icon */}
                    <motion.div
                      className="w-9 h-9 rounded-lg border flex items-center justify-center"
                      style={{ borderColor: `${c.color}30`, background: `${c.color}08` }}
                      whileHover={{ rotate: [0, -5, 5, -3, 0] }}
                      transition={{ duration: 0.4 }}
                    >
                      <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
                        <path d="M4 8V5a4 4 0 0 1 8 0v3" stroke={c.color} strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
                        <rect x="1" y="8" width="14" height="10" rx="2" stroke={c.color} strokeWidth="1.5" opacity="0.7"/>
                        <circle cx="8" cy="13" r="1.5" fill={c.color} opacity="0.7"/>
                      </svg>
                    </motion.div>
                  </div>

                  <h3 className="text-[#F5F5F5] font-bold text-lg mb-3 leading-snug group-hover:text-white transition-colors">
                    {c.name}
                  </h3>
                  <p className="text-[#525252] text-xs leading-relaxed mb-5">
                    {c.desc}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {c.tags.map(t => (
                      <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
                        style={{ color: c.color, borderColor: `${c.color}25`, background: `${c.color}08` }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-xs font-mono" style={{ color: c.color }}>
                    <span>ATTEMPT ENTRY</span>
                    <motion.span
                      animate={{ x: [0, 3, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >→</motion.span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-center mt-16 text-[#222] text-xs font-mono"
        >
          The answer is in the research.
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
