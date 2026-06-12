"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/ui/Footer";

const TOOLS = [
  {
    id: "beam",
    href: "/lab/beam",
    title: "Beam Calculator",
    subtitle: "Interactive deflection, BMD & SFD",
    desc: "Input span, load type, E and I. Get real-time deflection diagrams, bending moment diagrams, shear force diagrams, and critical values. Four boundary condition types.",
    tags: ["Statics", "FEM", "Euler-Bernoulli"],
    icon: "─┬─",
    color: "#F59E0B",
    status: "live",
  },
  {
    id: "column",
    href: "/lab/column",
    title: "Column Buckling",
    subtitle: "Euler critical load calculator",
    desc: "Critical buckling load using Euler's formula. Visualize effective length factors for all four end conditions. See how slenderness ratio affects stability.",
    tags: ["Buckling", "Stability", "K-factor"],
    icon: "╪",
    color: "#10B981",
    status: "live",
  },
  {
    id: "structures",
    href: "/structures",
    title: "Structural Systems",
    subtitle: "Explorer: trusses, frames, plates, cables",
    desc: "Six structural typologies — how they work, where they fail, famous examples. Interactive force-flow diagrams and real-world case studies.",
    tags: ["Typology", "Force Flow", "Design"],
    icon: "⬡",
    color: "#3B82F6",
    status: "live",
  },
  {
    id: "failures",
    href: "/failures",
    title: "Structural Failures",
    subtitle: "What went wrong — and what it taught us",
    desc: "Tacoma Narrows, Ronan Point, Dharahara 2015, and more. Each failure dissected: cause, mechanism, lessons. Engineering knowledge through catastrophe.",
    tags: ["Forensics", "Failures", "Case Study"],
    icon: "◈",
    color: "#EF4444",
    status: "live",
  },
  {
    id: "fg-grc",
    href: "/codex/research",
    title: "FG-GRC Research",
    subtitle: "Thesis deep-dive: graphene composite plates",
    desc: "The full parametric study on functionally graded graphene reinforced composite plates. Buckling analysis, ABAQUS methodology, results. This is the real research.",
    tags: ["Composites", "FEM", "Graphene"],
    icon: "⬡",
    color: "#8B5CF6",
    status: "live",
  },
  {
    id: "sections",
    href: "/lab/beam",
    title: "Section Properties",
    subtitle: "Coming soon",
    desc: "Choose a steel section (I-beam, hollow box, circular), input dimensions. Get second moment of area, section modulus, radius of gyration, plastic section modulus.",
    tags: ["Sections", "Properties", "Steel"],
    icon: "◫",
    color: "#525252",
    status: "soon",
  },
];

export default function LabPage() {
  return (
    <main className="min-h-screen bg-[#030303]">
      <Navigation />

      {/* Blueprint bg */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-60"
        style={{
          backgroundImage: `
            linear-gradient(rgba(245,158,11,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,158,11,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#F59E0B]/40" />
            <span className="text-[#F59E0B] text-[10px] font-mono tracking-[0.5em]">STRUCTURAL ENGINEERING</span>
          </div>
          <h1
            className="text-[#F5F5F5] font-black mb-4"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", letterSpacing: "-0.03em" }}
          >
            The Lab.
          </h1>
          <p className="text-[#525252] text-base leading-relaxed max-w-xl">
            Interactive tools, deep-dive explainers, and real structural engineering. Not textbook theory — live calculators, real failures, actual research.
          </p>
          <div className="flex items-center gap-4 mt-5 text-xs font-mono text-[#333]">
            <span>Euler-Bernoulli beam theory</span>
            <span className="text-[#1a1a1a]">·</span>
            <span>Euler column buckling</span>
            <span className="text-[#1a1a1a]">·</span>
            <span>ABAQUS FEM methodology</span>
          </div>
          <div className="h-px bg-gradient-to-r from-[#F59E0B]/25 via-[#F59E0B]/8 to-transparent mt-6" />
        </motion.div>

        {/* Tools grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TOOLS.map((tool, i) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <Link
                href={tool.href}
                className={`group block h-full rounded-2xl border bg-[#0a0a0a] p-6 relative overflow-hidden transition-all duration-400 ${
                  tool.status === "soon" ? "pointer-events-none opacity-40" : "hover:-translate-y-1"
                }`}
                style={{ borderColor: `${tool.color}15` }}
                onMouseEnter={(e) => {
                  if (tool.status !== "soon") {
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${tool.color}10, 0 0 0 1px ${tool.color}20`;
                    (e.currentTarget as HTMLElement).style.borderColor = `${tool.color}30`;
                  }
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "";
                  (e.currentTarget as HTMLElement).style.borderColor = `${tool.color}15`;
                }}
              >
                {/* Top accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 opacity-50 group-hover:opacity-100 transition-opacity"
                  style={{ background: `linear-gradient(90deg, transparent, ${tool.color}, transparent)` }}
                />

                {/* Icon */}
                <div className="flex items-start justify-between mb-5">
                  <span
                    className="font-mono text-2xl font-black opacity-25 group-hover:opacity-60 transition-opacity duration-300"
                    style={{ color: tool.color }}
                  >
                    {tool.icon}
                  </span>
                  <div className="flex items-center gap-2">
                    {tool.status === "live" ? (
                      <span className="flex items-center gap-1.5 text-[9px] font-mono text-[#10B981]">
                        <span className="w-1 h-1 rounded-full bg-[#10B981] inline-block" />
                        LIVE
                      </span>
                    ) : (
                      <span className="text-[9px] font-mono text-[#333]">SOON</span>
                    )}
                  </div>
                </div>

                <h3 className="text-[#F5F5F5] font-bold text-lg mb-1 leading-tight group-hover:text-white transition-colors">
                  {tool.title}
                </h3>
                <p className="text-[#333] text-xs font-mono mb-3" style={{ color: `${tool.color}60` }}>
                  {tool.subtitle}
                </p>
                <p className="text-[#444] text-xs leading-relaxed mb-5">
                  {tool.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {tool.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono px-2 py-0.5 rounded border"
                      style={{ color: tool.color, borderColor: `${tool.color}20`, background: `${tool.color}08` }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                {tool.status === "live" && (
                  <div className="flex items-center gap-2 text-xs font-mono" style={{ color: `${tool.color}80` }}>
                    <span>Open tool</span>
                    <motion.span
                      animate={{ x: [0, 3, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >→</motion.span>
                  </div>
                )}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Lab note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-14 pt-8 border-t border-[#0d0d0d]"
        >
          <p className="text-[#1a1a1a] text-xs font-mono text-center">
            All calculators use closed-form analytical solutions — no FEM approximation. Results are exact within beam theory assumptions.
          </p>
          <div className="flex items-center justify-center gap-6 mt-6 text-xs font-mono">
            <Link href="/" className="text-[#333] hover:text-[#F59E0B] transition-colors">← Home</Link>
            <Link href="/stack" className="text-[#333] hover:text-[#F59E0B] transition-colors">Stack</Link>
            <Link href="/codex" className="text-[#F59E0B]/40 hover:text-[#F59E0B] transition-colors">◈ Codex</Link>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
