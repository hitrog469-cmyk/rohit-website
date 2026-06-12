"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/ui/Footer";

type Tool = {
  name: string;
  version?: string;
  use: string;
  note: string;
  level: "expert" | "proficient" | "learning";
  years?: string;
};

const STACK: Record<string, Tool[]> = {
  "Engineering": [
    { name: "ABAQUS", version: "2021", use: "FEM simulation & parametric studies", note: "Ran 200+ models for my thesis. Python scripting to automate parametric combinations. It crashes at the worst times and I still love it.", level: "expert", years: "2 yrs" },
    { name: "SAP2000", use: "Structural analysis & design", note: "Go-to for building frame analysis. Cleaner interface than ABAQUS, less powerful for research purposes.", level: "proficient", years: "3 yrs" },
    { name: "MATLAB", use: "Numerical methods + data analysis", note: "Used heavily for deriving governing equations and validating analytical results against FEM.", level: "proficient", years: "3 yrs" },
    { name: "AutoCAD", use: "Structural drawings & detailing", note: "Standard. Every civil engineering student knows it. I'm faster than average, slower than a draftsman.", level: "proficient", years: "3 yrs" },
    { name: "Python (NumPy/Pandas)", use: "FEM automation + data pipelines", note: "ABAQUS scripting, data analysis, IPL analytics model. The bridge between engineering software and real analysis.", level: "expert", years: "2 yrs" },
  ],
  "Development": [
    { name: "Next.js 14", use: "Full-stack web apps (App Router)", note: "Built this entire site in it. Server components, client components, MDX blogs — the whole stack.", level: "proficient", years: "1 yr" },
    { name: "TypeScript", use: "Type-safe JavaScript everywhere", note: "Once you go typed you never go back. The compiler catches mistakes I wouldn't have caught for hours.", level: "proficient", years: "1 yr" },
    { name: "React", use: "UI component architecture", note: "The mental model makes sense to me as an engineer — components are like structural assemblies.", level: "proficient", years: "1.5 yrs" },
    { name: "Three.js / R3F", use: "3D graphics + WebGL", note: "Used for the 3D hero section on this site. Building 3D things in the browser feels close to building physical things.", level: "learning", years: "6 mo" },
    { name: "Framer Motion", use: "Animations + micro-interactions", note: "Every smooth animation on this site. Physics-based motion makes UIs feel real.", level: "proficient", years: "1 yr" },
    { name: "Tailwind CSS", use: "Utility-first styling", note: "Converts design thinking directly to markup. Faster than writing CSS from scratch for every component.", level: "expert", years: "1.5 yrs" },
  ],
  "Learning": [
    { name: "Rust", use: "Systems programming", note: "Just started. The borrow checker is humbling — and I think that humbling is good for me.", level: "learning" },
    { name: "Machine Learning", use: "XGBoost, scikit-learn, model training", note: "Applying to cricket prediction and infrastructure monitoring use cases. Self-taught via courses + projects.", level: "learning", years: "1 yr" },
    { name: "WebGL / GLSL", use: "Custom shaders + GPU rendering", note: "Want to build generative structural-pattern visualizations. The math overlaps with my engineering background.", level: "learning" },
    { name: "Structural Health Monitoring", use: "Sensor networks + signal processing", note: "Not a dev tool — but a field I'm actively studying to apply to Nepal's infrastructure problems.", level: "learning" },
  ],
  "Setup": [
    { name: "VS Code", use: "Primary editor", note: "One Dark Pro theme. JetBrains Mono font. The Vim motions extension that I use maybe 20% correctly.", level: "expert" },
    { name: "Windows Terminal + Git Bash", use: "Terminal", note: "WSL2 for anything Linux-specific. Git Bash for quick commands. Yes, I use Windows and I've accepted this.", level: "expert" },
    { name: "Figma", use: "UI design + prototyping", note: "Designed this site's layout in Figma first. Better to move pixels than rethink component trees.", level: "proficient" },
    { name: "Notion", use: "Research notes + project tracking", note: "Entire thesis structured in Notion. All simulation results logged there. It's not perfect but it's mine.", level: "proficient" },
  ],
};

const LEVEL_STYLE: Record<Tool["level"], { label: string; color: string }> = {
  expert: { label: "Expert", color: "#F59E0B" },
  proficient: { label: "Proficient", color: "#10B981" },
  learning: { label: "Learning", color: "#8B5CF6" },
};

const TABS = Object.keys(STACK);

export default function StackPage() {
  const [activeTab, setActiveTab] = useState("Engineering");
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-[#050505]">
      <Navigation />

      <div className="max-w-4xl mx-auto px-6 pt-28 pb-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#F59E0B]/40" />
            <span className="text-[#F59E0B] text-[10px] font-mono tracking-[0.5em]">TOOLS OF THE TRADE</span>
          </div>
          <h1
            className="text-[#F5F5F5] font-black mb-4"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", letterSpacing: "-0.03em" }}
          >
            Stack.
          </h1>
          <p className="text-[#525252] text-base leading-relaxed max-w-xl">
            The tools I use — honestly. What I&apos;m good at, what I&apos;m still learning, and what I think about each one.
            Two stacks: engineering software I use for research, and dev tools I use to build.
          </p>
          <div className="h-px bg-gradient-to-r from-[#F59E0B]/25 via-[#F59E0B]/8 to-transparent mt-6" />
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 mb-10 p-1 rounded-xl bg-[#0a0a0a] border border-[#111] w-fit">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setExpanded(null); }}
              className="px-4 py-2 rounded-lg text-xs font-mono transition-all duration-200 relative"
              style={{
                color: activeTab === tab ? "#F5F5F5" : "#444",
                background: activeTab === tab ? "#141414" : "transparent",
              }}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute inset-0 rounded-lg border border-[#1a1a1a]"
                  transition={{ duration: 0.2 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Tools list */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-3"
          >
            {STACK[activeTab].map((tool, i) => {
              const levelStyle = LEVEL_STYLE[tool.level];
              const isExpanded = expanded === tool.name;
              return (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <button
                    onClick={() => setExpanded(isExpanded ? null : tool.name)}
                    className="w-full text-left p-5 rounded-xl border transition-all duration-200 group"
                    style={{
                      borderColor: isExpanded ? "#1d1d1d" : "#111",
                      background: isExpanded ? "#0d0d0d" : "#0a0a0a",
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 flex-wrap mb-1">
                          <span className="text-[#F5F5F5] font-semibold text-sm">{tool.name}</span>
                          {tool.version && (
                            <span className="text-[#333] text-[10px] font-mono">{tool.version}</span>
                          )}
                          {tool.years && (
                            <span className="text-[#2a2a2a] text-[10px] font-mono">{tool.years}</span>
                          )}
                        </div>
                        <div className="text-[#444] text-xs mb-1">{tool.use}</div>
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <p className="text-[#525252] text-xs leading-relaxed mt-2 pt-2 border-t border-[#111] italic">
                                &ldquo;{tool.note}&rdquo;
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span
                          className="text-[10px] font-mono px-2 py-1 rounded border"
                          style={{ color: levelStyle.color, borderColor: `${levelStyle.color}25`, background: `${levelStyle.color}08` }}
                        >
                          {levelStyle.label}
                        </span>
                        <span
                          className="text-[#333] text-xs transition-transform duration-200 group-hover:text-[#555]"
                          style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}
                        >
                          ↓
                        </span>
                      </div>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Legend */}
        <div className="flex items-center gap-6 mt-10 pt-6 border-t border-[#111]">
          <span className="text-[#333] text-xs font-mono">Level:</span>
          {Object.entries(LEVEL_STYLE).map(([key, val]) => (
            <div key={key} className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: val.color }} />
              <span className="text-[#333] text-xs font-mono">{val.label}</span>
            </div>
          ))}
        </div>

        {/* Click to expand note */}
        <p className="text-[#1a1a1a] text-xs font-mono mt-2">click any tool for a personal note</p>

        {/* Nav */}
        <div className="mt-16 flex items-center justify-center gap-6 text-xs font-mono">
          <Link href="/" className="text-[#333] hover:text-[#F59E0B] transition-colors">← Home</Link>
          <Link href="/now" className="text-[#333] hover:text-[#F59E0B] transition-colors">Now</Link>
          <Link href="/blog" className="text-[#333] hover:text-[#F59E0B] transition-colors">Blog</Link>
          <Link href="/codex" className="text-[#F59E0B]/40 hover:text-[#F59E0B] transition-colors">◈ Codex</Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
