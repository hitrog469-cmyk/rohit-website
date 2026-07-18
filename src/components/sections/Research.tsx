"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useCounter } from "@/hooks/useCounter";
import { ChevronDown, Download, FlaskConical, GitBranch, Layers, Microscope } from "lucide-react";

/* ── Animated stat counter ─────────────────────────────────────── */
function StatCard({
  prefix = "",
  value,
  suffix = "",
  label,
  delay,
}: {
  prefix?: string;
  value: number;
  suffix?: string;
  label: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { count, start } = useCounter(value, 1600);
  const started = useRef(false);

  if (inView && !started.current) {
    started.current = true;
    setTimeout(start, delay);
  }

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center text-center p-6 rounded-2xl glass amber-border relative overflow-hidden group"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: delay / 1000, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.03 }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "radial-gradient(ellipse at center, rgba(245,158,11,0.06) 0%, transparent 70%)" }}
      />
      <div className="text-4xl md:text-5xl font-black amber-glow-text mb-2">
        {prefix}{count}{suffix}
      </div>
      <div className="text-[#A3A3A3] text-sm leading-snug max-w-[140px]">{label}</div>
    </motion.div>
  );
}

/* ── FG-GRC plate visualizer ────────────────────────────────────── */
function PlateVisualizer() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const layers = [
    { label: "Graphene-rich top layer", opacity: 1, color: "#F59E0B" },
    { label: "Gradient transition zone", opacity: 0.65, color: "#D97706" },
    { label: "Gradient transition zone", opacity: 0.4, color: "#B45309" },
    { label: "Matrix-rich bottom layer", opacity: 0.15, color: "#78350F" },
  ];

  return (
    <div ref={ref} className="relative w-full max-w-lg mx-auto">
      <p className="text-[#525252] text-xs font-mono tracking-widest text-center mb-4 uppercase">
        FG-GRC Cross-Section — Graphene Distribution
      </p>
      <div className="relative rounded-xl overflow-hidden border border-[#222]">
        {layers.map((layer, i) => (
          <motion.div
            key={i}
            className="h-14 md:h-16 flex items-center px-5 relative"
            style={{ backgroundColor: `rgba(245,158,11,${layer.opacity * 0.12})` }}
            initial={{ x: -80, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ delay: 0.2 + i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Graphene density bar */}
            <motion.div
              className="absolute left-0 top-0 bottom-0"
              style={{ backgroundColor: layer.color }}
              initial={{ width: 0 }}
              animate={inView ? { width: `${(4 - i) * 20}%` } : {}}
              transition={{ delay: 0.5 + i * 0.15, duration: 1, ease: "easeOut" }}
            />
            <span
              className="relative z-10 text-xs font-mono ml-2 px-2 py-0.5 rounded"
              style={{ background: "rgba(255,255,255,0.82)", color: "#1C1917" }}
            >
              {i === 0 ? "▲ " : i === 3 ? "▼ " : "  "}
              {layer.label}
            </span>
            {/* Graphene particle dots */}
            <div className="absolute right-4 flex gap-1">
              {Array.from({ length: 4 - i }).map((_, j) => (
                <motion.div
                  key={j}
                  className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]"
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: 0.8 + i * 0.1 + j * 0.05 }}
                />
              ))}
            </div>
          </motion.div>
        ))}
        {/* Axis label */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-mono text-[#737373] tracking-widest">
          THICKNESS (h)
        </div>
      </div>
      <div className="flex justify-between mt-2 px-1">
        <span className="text-[10px] font-mono text-[#737373]">W_GPL = 1.0%</span>
        <span className="text-[10px] font-mono text-[#F59E0B]">FG-X Distribution</span>
        <span className="text-[10px] font-mono text-[#737373]">W_GPL = 0%</span>
      </div>
    </div>
  );
}

/* ── Research timeline ──────────────────────────────────────────── */
const TIMELINE = [
  {
    icon: <Microscope className="w-4 h-4" />,
    phase: "Problem",
    title: "Why do composite plates fail under thermomechanical loads?",
    desc: "Identified gap: no unified study on FG-GRC plates under combined thermal + mechanical loading with CPT.",
  },
  {
    icon: <GitBranch className="w-4 h-4" />,
    phase: "Formulation",
    title: "Classical Plate Theory + Graphene gradient model",
    desc: "Derived governing equations using CPT, Hamilton's principle, Halpin-Tsai micromechanics for FG-X, FG-O, FG-V, UD distributions.",
  },
  {
    icon: <FlaskConical className="w-4 h-4" />,
    phase: "Simulation",
    title: "ABAQUS parametric study — 12+ variables",
    desc: "Varied GPL weight fraction (0–1%), aspect ratio, plate geometry (a/h: 10–50), boundary conditions (SSSS, CCCC), temperature (300K–500K).",
  },
  {
    icon: <Layers className="w-4 h-4" />,
    phase: "Results",
    title: "FG-X outperforms all distributions",
    desc: "+30% buckling load enhancement. Validated against published benchmarks. Results submitted as part of B.Tech thesis, NIT Rourkela.",
  },
];

function ResearchTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="relative">
      {/* Vertical line */}
      <motion.div
        className="absolute left-4 md:left-6 top-0 w-px bg-gradient-to-b from-[#F59E0B] via-[#F59E0B]/40 to-transparent"
        initial={{ height: 0 }}
        animate={inView ? { height: "100%" } : {}}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
      />
      <div className="space-y-8">
        {TIMELINE.map((item, i) => (
          <motion.div
            key={i}
            className="flex gap-6 md:gap-8 pl-12 md:pl-16 relative"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 + i * 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Node */}
            <div className="absolute left-0 top-1 w-8 h-8 md:w-12 md:h-12 rounded-full bg-[#111] border border-[#F59E0B]/60 flex items-center justify-center text-[#F59E0B] shrink-0">
              {item.icon}
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#F59E0B] uppercase">
                {item.phase}
              </span>
              <h4 className="text-[#F5F5F5] font-semibold text-sm md:text-base mt-0.5 mb-1.5">
                {item.title}
              </h4>
              <p className="text-[#525252] text-sm leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── Expandable methodology card ─────────────────────────────────── */
function MethodCard({
  title,
  summary,
  detail,
}: {
  title: string;
  summary: string;
  detail: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      className="rounded-xl border border-[#222] bg-surface overflow-hidden cursor-pointer"
      onClick={() => setOpen(!open)}
      whileHover={{ borderColor: "rgba(245,158,11,0.3)" }}
      layout
    >
      <div className="flex items-center justify-between p-5">
        <div>
          <p className="text-[#F5F5F5] font-semibold text-sm">{title}</p>
          <p className="text-[#525252] text-xs mt-0.5">{summary}</p>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-[#F59E0B] shrink-0 ml-4"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </div>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{ overflow: "hidden" }}
      >
        <div className="px-5 pb-5 text-[#A3A3A3] text-sm leading-relaxed border-t border-[#1a1a1a] pt-4">
          {detail}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Main section ───────────────────────────────────────────────── */
export default function Research() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="research"
      ref={ref}
      className="section-padding relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, var(--bg-ink) 0%, var(--bg-page) 100%)" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(245,158,11,0.06) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-6"
        >
          <span className="section-label">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
            Research
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          className="text-headline text-[#F5F5F5] mb-4 max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.7 }}
        >
          Research,{" "}
          <span className="text-[#F59E0B]">so far</span>
        </motion.h2>
        <motion.p
          className="text-[#525252] text-base mb-16 max-w-xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          Artificial intelligence and computational methods for construction and structural engineering: computer vision and BIM-based construction progress monitoring, digital twins, and data-driven infrastructure assessment. Built on a foundation in computational structural mechanics — buckling and stability of advanced composite and functionally graded plates under thermomechanical loading.
          <span className="text-[#F59E0B]"> B.Tech thesis — NIT Rourkela, 2025.</span>
        </motion.p>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          <StatCard prefix="+" value={30} suffix="%" label="Buckling load enhancement (FG-X vs UD)" delay={0} />
          <StatCard prefix="-" value={15} suffix="%" label="Natural frequency reduction at 500K" delay={150} />
          <StatCard value={12} suffix="+" label="Parametric variables studied" delay={300} />
          <StatCard value={4} label="GPL distribution patterns compared" delay={450} />
        </div>

        {/* Two-column: plate viz + timeline */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          <div>
            <motion.h3
              className="text-[#F5F5F5] font-semibold text-lg mb-6"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              FG-GRC Plate — Graphene Architecture
            </motion.h3>
            <PlateVisualizer />
            <motion.p
              className="text-[#333] text-xs font-mono mt-6 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
            >
              FG-X distributes graphene nanoplatelets with maximum concentration at the
              surfaces — where bending stresses are highest — producing superior
              buckling resistance compared to uniform distribution.
            </motion.p>
          </div>

          <div>
            <motion.h3
              className="text-[#F5F5F5] font-semibold text-lg mb-6"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              Research Process
            </motion.h3>
            <ResearchTimeline />
          </div>
        </div>

        {/* Methodology cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-[#F5F5F5] font-semibold text-lg mb-5">Methodology Deep-Dive</h3>
          <div className="grid md:grid-cols-2 gap-3 mb-10">
            <MethodCard
              title="Classical Plate Theory (CPT)"
              summary="Governing equations for thin plate behaviour"
              detail="Applied Kirchhoff's Classical Plate Theory to model the structural behaviour. Hamilton's principle was used to derive equations of motion. The constitutive relations incorporated temperature-dependent material properties via Halpin-Tsai micromechanics model, accurately capturing the anisotropic behaviour of the GPL-reinforced matrix."
            />
            <MethodCard
              title="Halpin-Tsai Micromechanics"
              summary="Effective material property prediction"
              detail="Used Halpin-Tsai equations to estimate the effective Young's modulus and Poisson's ratio of the GPL/epoxy composite as a function of GPL geometry (length, width, thickness), weight fraction, and distribution pattern. GPL aspect ratios from 1 to 1000 were investigated."
            />
            <MethodCard
              title="ABAQUS FEM Validation"
              summary="12+ parametric variables, 200+ simulation runs"
              detail="Built parametric ABAQUS models with solid elements (C3D20R) to validate the analytical results. Boundary conditions (SSSS, CCCC, CSCS), plate aspect ratios (a/b: 1–2), slenderness ratios (a/h: 10–50), and temperature fields (ΔT: 0–200K) were systematically varied."
            />
            <MethodCard
              title="Nondimensional Analysis"
              summary="Universal applicability beyond specific materials"
              detail="Results expressed as nondimensional critical buckling load (λ_cr) and nondimensional natural frequency (Ω) to allow comparison with any material system. Benchmarked against Li et al. (2018), Feng et al. (2017), and Song et al. (2017) with <2% error."
            />
          </div>
        </motion.div>

        {/* Second study — FRP seminar work */}
        <motion.div
          className="rounded-xl border border-[#222] bg-surface p-6 mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[10px] font-mono tracking-widest text-[#F59E0B] uppercase">Also — Seminar Study, 2024</span>
          </div>
          <h3 className="text-[#F5F5F5] font-semibold text-lg mb-2">
            FRP Strengthening of Aging Reinforced Concrete
          </h3>
          <p className="text-[#A3A3A3] text-sm leading-relaxed max-w-3xl mb-3">
            Before the thesis, I spent a semester reviewing how CFRP, GFRP, and BFRP retrofitting
            restores capacity in aging concrete structures — comparing externally bonded and
            near-surface-mounted systems, and deriving the analytical formulations for flexural
            capacity, shear contribution, and axial confinement. Reported gains in the literature:
            60–85% in flexure, up to 200% in shear, 50–60% axial. That review later became the basis
            for the FRP-RC section analyzer I built and shipped.
          </p>
          <a
            href="https://frp-analyzer.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#F59E0B] text-sm font-mono hover:text-[#FBBF24] transition-colors"
          >
            → The tool that came out of it
          </a>
        </motion.div>

        {/* Open questions — what I want to pursue next */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-[#F5F5F5] font-semibold text-lg mb-2">Questions I haven&apos;t answered yet</h3>
          <p className="text-[#525252] text-sm mb-6 max-w-2xl">
            The honest list. These are the problems I want to take into graduate research —
            some grew out of the thesis, some out of watching AI meet real construction sites every day.
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              {
                q: "Can construction-progress AI learn structural context?",
                note: "Current CV models see surfaces, not load paths. A model that knows a wall is shear-critical should flag it differently. Nobody's built that yet.",
              },
              {
                q: "How far can nondimensional buckling results stretch?",
                note: "My thesis results hold for the studied parameter space. Nonlinear post-buckling, nano-scale effects, and FSDT for thicker plates are all open — and experimental validation most of all.",
              },
              {
                q: "What does a digital twin mean for a country like Nepal?",
                note: "Digital twins assume rich sensor data and clean BIM. Most Nepali infrastructure has neither. What's the minimum-data version that still saves lives in the next earthquake?",
              },
              {
                q: "Can dataset QA be formalized for construction CV?",
                note: "At CloudFactory I write review standards by judgment. There should be a measurable framework for annotation reliability in construction imagery. I have notes.",
              },
            ].map((item) => (
              <div key={item.q} className="rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] p-5">
                <p className="text-[#F5F5F5] text-sm font-semibold mb-2 leading-snug">{item.q}</p>
                <p className="text-[#525252] text-xs leading-relaxed">{item.note}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Artifacts */}
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <motion.a
            href="/thesis.pdf"
            download
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#F59E0B] text-black text-sm font-bold hover:bg-[#FBBF24] transition-all hover:shadow-amber"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.03 }}
          >
            <Download className="w-4 h-4" />
            Read the Thesis (PDF)
          </motion.a>
          <motion.a
            href="https://fg-grc-calculator.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full glass amber-border text-[#F59E0B] text-sm font-mono hover:bg-[#F59E0B]/10 transition-all"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7 }}
          >
            Run the buckling simulator →
          </motion.a>
        </div>
      </div>
    </section>
  );
}
