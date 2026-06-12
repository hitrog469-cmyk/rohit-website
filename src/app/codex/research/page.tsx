"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/ui/Footer";
import CipherLock from "@/components/ui/CipherLock";

const PARAMS = [
  { label: "FG-X (Surface-Rich)", value: 130, color: "#F59E0B", note: "+30% vs uniform" },
  { label: "FG-O (Core-Rich)", value: 78, color: "#EF4444", note: "-22% vs uniform" },
  { label: "Uniform (UD)", value: 100, color: "#525252", note: "Baseline" },
  { label: "FG-A (Asymmetric)", value: 112, color: "#8B5CF6", note: "+12% vs uniform" },
  { label: "FG-V (Gradient)", value: 108, color: "#3B82F6", note: "+8% vs uniform" },
];

const VARIABLES = [
  { name: "GPL Weight Fraction", symbol: "W_GPL", range: "0.1% → 1.0%", impact: "Primary driver of buckling resistance" },
  { name: "Aspect Ratio", symbol: "a/b", range: "0.5 → 2.0", impact: "Controls mode shape and critical load" },
  { name: "Temperature Rise", symbol: "ΔT", range: "0 → 300°C", impact: "Reduces buckling load via thermal softening" },
  { name: "Thickness Ratio", symbol: "a/h", range: "10 → 50", impact: "Thin plates buckle earlier, shear dominates thick" },
  { name: "Boundary Conditions", symbol: "BC", range: "SSSS → CCCC", impact: "Clamped edges give ~4x higher critical load" },
];

const FINDINGS = [
  { icon: "⬡", title: "FG-X Distribution Wins", desc: "Graphene concentrated at surfaces — where bending stresses peak — delivers 30% more buckling resistance than uniform distribution.", value: "+30%", color: "#F59E0B" },
  { icon: "◈", title: "Temperature is the Enemy", desc: "A 300°C rise reduces critical buckling load by up to 18% in steel-graphene composites. Thermal management is not optional.", value: "-18%", color: "#EF4444" },
  { icon: "◉", title: "Boundary Conditions Dominate", desc: "Switching from simply-supported (SSSS) to fully-clamped (CCCC) edges increases buckling resistance by a factor of 3.8–4.2.", value: "4×", color: "#10B981" },
  { icon: "◫", title: "GPL Weight Fraction Saturates", desc: "Beyond 0.7% GPL weight fraction, marginal gains plateau. Optimal is 0.5–0.7% — more graphene doesn't proportionally help.", value: "0.6%", color: "#8B5CF6" },
];

function StatBar({ label, value, color, note, delay }: { label: string; value: number; color: string; note: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="space-y-1"
    >
      <div className="flex items-center justify-between text-xs font-mono">
        <span className="text-[#A3A3A3]">{label}</span>
        <span style={{ color }}>{note}</span>
      </div>
      <div className="h-2 bg-[#111] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ delay: delay + 0.3, duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
    </motion.div>
  );
}

export default function ResearchVault() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {!unlocked ? (
        <motion.div key="lock" exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.4 }}>
          <CipherLock
            chamberCode="01"
            chamberName="THE RESEARCH VAULT"
            question="In FG-GRC plates, which graphene distribution maximizes critical buckling load?"
            hint="think about where bending stresses are highest"
            correctAnswers={["fg-x", "fgx", "x", "fg x", "surface", "funtionally graded x"]}
            extraEggs={{
              buckling: "CORRECT DOMAIN. FG-X IS THE ANSWER. GRANTED.",
              graphene: "MATERIAL KNOWLEDGE DETECTED. GRANTED.",
              abaqus: "SIMULATION SOFTWARE RECOGNIZED. INSIDER ACCESS.",
              composite: "COMPOSITE MATERIAL AWARENESS. GRANTED.",
              nitr: "ALMA MATER DETECTED. GRANTED.",
              rourkela: "NIT ROURKELA PRIDE. GRANTED.",
              thesis: "ACADEMIC CREDENTIAL INVOKED. GRANTED.",
            }}
            onUnlock={() => setUnlocked(true)}
          />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <main className="min-h-screen bg-[#050505]">
            <Navigation />

            <div className="max-w-4xl mx-auto px-6 pt-28 pb-24">
              {/* Back */}
              <Link href="/codex" className="inline-flex items-center gap-2 text-[#525252] hover:text-[#F59E0B] text-sm font-mono transition-colors mb-10">
                ← Back to Codex
              </Link>

              {/* Header */}
              <div className="mb-14">
                <span className="text-[#F59E0B] text-[10px] font-mono tracking-[0.5em]">CHAMBER 01 — UNLOCKED</span>
                <h1 className="text-[#F5F5F5] font-black mt-3 mb-4" style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}>
                  The Research <span className="text-[#F59E0B]">Vault</span>
                </h1>
                <p className="text-[#525252] text-base leading-relaxed max-w-2xl">
                  Everything about my B.Tech thesis on Functionally Graded Graphene Reinforced Composite plates — the methodology, the data, the 200+ ABAQUS simulation runs, and what it all means.
                </p>
                <div className="h-px bg-gradient-to-r from-[#F59E0B]/40 via-[#F59E0B]/10 to-transparent mt-6" />
              </div>

              {/* What is FG-GRC */}
              <section className="mb-16">
                <h2 className="text-[#F5F5F5] text-xl font-bold mb-6 flex items-center gap-3">
                  <span className="text-[#F59E0B] font-mono text-sm">01.</span> What is FG-GRC?
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { term: "FG", full: "Functionally Graded", desc: "Material properties vary continuously through the thickness — not uniform, not layered. Gradient." },
                    { term: "GRC", full: "Graphene Reinforced Composite", desc: "A matrix material (usually polymer/metal) reinforced with Graphene Platelets (GPLs) — the strongest known material." },
                    { term: "Plate", full: "Thin Structural Element", desc: "2D structural member where thickness is much smaller than other dimensions. Think: floors, walls, aircraft panels." },
                    { term: "Buckling", full: "Sudden Lateral Deflection", desc: "When a compressed plate suddenly deforms sideways. Not fracture — deformation. The critical load is what we calculate." },
                  ].map((item, i) => (
                    <motion.div
                      key={item.term}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] p-5"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[#F59E0B] font-black text-lg font-mono">{item.term}</span>
                        <span className="text-[#333] text-xs">= {item.full}</span>
                      </div>
                      <p className="text-[#525252] text-xs leading-relaxed">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Distribution comparison */}
              <section className="mb-16">
                <h2 className="text-[#F5F5F5] text-xl font-bold mb-2 flex items-center gap-3">
                  <span className="text-[#F59E0B] font-mono text-sm">02.</span> Distribution Patterns vs Buckling Load
                </h2>
                <p className="text-[#525252] text-sm mb-8">Relative critical buckling load (uniform = 100%). FG-X wins because it puts material where stresses are highest.</p>
                <div className="rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] p-6 space-y-5">
                  {PARAMS.map((p, i) => (
                    <StatBar key={p.label} {...p} delay={i * 0.12} />
                  ))}
                </div>
              </section>

              {/* Variables studied */}
              <section className="mb-16">
                <h2 className="text-[#F5F5F5] text-xl font-bold mb-6 flex items-center gap-3">
                  <span className="text-[#F59E0B] font-mono text-sm">03.</span> Parametric Variables
                </h2>
                <div className="space-y-3">
                  {VARIABLES.map((v, i) => (
                    <motion.div
                      key={v.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-start gap-4 p-4 rounded-xl border border-[#1a1a1a] bg-[#0a0a0a]"
                    >
                      <span className="text-[#F59E0B] font-mono text-sm w-20 shrink-0 pt-0.5">{v.symbol}</span>
                      <div>
                        <div className="text-[#F5F5F5] text-sm font-semibold mb-0.5">{v.name}</div>
                        <div className="text-[#333] text-xs font-mono mb-1">Range: {v.range}</div>
                        <div className="text-[#525252] text-xs">{v.impact}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Key findings */}
              <section className="mb-16">
                <h2 className="text-[#F5F5F5] text-xl font-bold mb-6 flex items-center gap-3">
                  <span className="text-[#F59E0B] font-mono text-sm">04.</span> Key Findings
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {FINDINGS.map((f, i) => (
                    <motion.div
                      key={f.title}
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="rounded-xl border bg-[#0a0a0a] p-5"
                      style={{ borderColor: `${f.color}20` }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-2xl opacity-40" style={{ color: f.color }}>{f.icon}</span>
                        <span className="font-black text-xl font-mono" style={{ color: f.color }}>{f.value}</span>
                      </div>
                      <h4 className="text-[#F5F5F5] font-bold text-sm mb-2">{f.title}</h4>
                      <p className="text-[#525252] text-xs leading-relaxed">{f.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Methodology */}
              <section className="mb-16">
                <h2 className="text-[#F5F5F5] text-xl font-bold mb-6 flex items-center gap-3">
                  <span className="text-[#F59E0B] font-mono text-sm">05.</span> How I Did It
                </h2>
                <div className="rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] p-6 font-mono text-xs space-y-3">
                  {[
                    { step: "01", label: "Governing Equations", detail: "Derived buckling equations using Reddy's Third Order Shear Deformation Theory (TSDT) for thick plates." },
                    { step: "02", label: "Material Modeling", detail: "Applied Halpin-Tsai micromechanics model to compute effective properties of GPL-reinforced composites." },
                    { step: "03", label: "ABAQUS FEM", detail: "Built parametric Python scripts to auto-generate 200+ ABAQUS models across all variable combinations." },
                    { step: "04", label: "Validation", detail: "Compared against published analytical results for SSSS plates. Max deviation: 2.1%." },
                    { step: "05", label: "Analysis", detail: "Extracted critical loads, plotted trends, identified optimal distributions and parameter combinations." },
                  ].map((s, i) => (
                    <motion.div
                      key={s.step}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-4 items-start"
                    >
                      <span className="text-[#F59E0B]/50 w-8 shrink-0">{s.step}</span>
                      <div>
                        <span className="text-[#F5F5F5]">{s.label}</span>
                        <span className="text-[#444] ml-2">— {s.detail}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Closing */}
              <div className="border-t border-[#1a1a1a] pt-10 text-center">
                <p className="text-[#333] font-mono text-xs">— Chamber 01 complete · FG-X forever · हर हर महादेव</p>
                <Link href="/codex" className="inline-flex items-center gap-2 text-[#F59E0B] text-sm font-mono mt-4 hover:gap-3 transition-all">
                  ← Return to Codex
                </Link>
              </div>
            </div>

            <Footer />
          </main>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
