"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronDown, FlaskConical, GitBranch, Layers, Microscope } from "lucide-react";

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
        FG-GRC Cross-Section · Graphene Distribution
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
    title: "ABAQUS parametric study across 12+ variables",
    desc: "Varied GPL weight fraction (0–1%), aspect ratio, plate geometry (a/h: 10–50), boundary conditions (SSSS, CCCC), temperature (300K–500K).",
  },
  {
    icon: <Layers className="w-4 h-4" />,
    phase: "Results",
    title: "Distribution pattern and thermal exposure both dominate",
    desc: "Critical buckling load rose about 30% as GNP volume fraction went from 5% to 25%; exposure from 300K to 500K cost about 15% of capacity. Benchmarked against Li et al. (2018), Feng et al. (2017) and Song et al. (2017). B.Tech thesis, NIT Rourkela.",
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
          Most of my working days go to large capital projects, establishing what was
          actually built from 360-degree capture, drone survey and 3D scans, reading that
          against the model, and forecasting where the schedule goes next. Before that my
          thesis asked what happens to a plate that is not quite flat when you heat it and
          load it at the same time. Small departures from the ideal geometry move the
          critical buckling load, so the ABAQUS campaign varied imperfection amplitude
          alongside gradient index, aspect ratio, boundary conditions and temperature, with
          the runs processed in Python and MATLAB. Before either of those I spent a
          semester on site, supervising execution across industrial structures and preparing
          bills of quantities from my own field measurements, which is where I learned how
          far a drawing can sit from the thing that gets built.
          <span className="text-[#F59E0B]"> B.Tech thesis, NIT Rourkela, 2025.</span>
        </motion.p>

        {/* Open questions, what I want to pursue next */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-[#F5F5F5] font-semibold text-lg mb-2">Questions I haven&apos;t answered yet</h3>
          <p className="text-[#525252] text-sm mb-6 max-w-2xl">
            The honest list. A few came out of the thesis. Most came from standing on a
            site, watching people build something, then looking hard at the data that was
            supposed to describe both.
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              {
                q: "When an automated progress result is wrong, where did it actually break?",
                note: "A disputed result can start in the capture, in the 3D or model review, in how an activity was configured, in the dependency logic, or in the inference itself. By the time it surfaces in a delay forecast it has already propagated through the network. I trace these by hand, one link at a time. There should be a principled way to localise the fault.",
              },
              {
                q: "Why do two crews with the same scope produce different rates?",
                note: "Same drawings, same sequence, same headcount, and the line of balance still comes out with different slopes. Nothing in my data accounts for the gap. Physiological and mental state are real inputs to production, heat, fatigue, sleep, how long the commute was, whether the foreman is trusted, what happened at home that morning, and none of them appear in any schedule I have worked with. Wearables and site sensing could measure some of it. I do not know yet which parts you should measure, or where measuring turns a site into surveillance, and that is most of why the question interests me.",
              },
              {
                q: "Where should the human sit in an automated progress loop?",
                note: "Automated inference is fast and consistent. People are slower and better at knowing when something on a site does not add up. Right now that boundary is drawn by habit and by whoever is available. I would like to know where the handover actually belongs, and what it costs to put it in the wrong place.",
              },
              {
                q: "Can production rates be read the way traffic flow is read?",
                note: "Line of balance plans a project as crews moving through locations at a rate, against a fixed capacity. Roads have a mature theory for the same shape of problem. I have run enough pace-variation and line-of-balance reviews to want to know how far that borrowing goes.",
              },
              {
                q: "Can dataset review be made measurable rather than judged?",
                note: "I write domain review standards for annotated construction imagery, and they work, but they rest on experience rather than on anything I can put a number against. Annotation reliability in this setting should be measurable. I have notes and no framework yet.",
              },
              {
                q: "How large a geometric deviation stops being noise?",
                note: "In the thesis, imperfection sensitivity was a curve I could plot. On site, deviation is a number in a report with a pass or fail next to it. The threshold that separates a cosmetic deviation from a structural one is set mostly by convention, and the two ways of thinking have never been properly introduced.",
              },
              {
                q: "What is a sensor network telling you before it tells you anything?",
                note: "My monitoring dashboard flags anomalies with a rolling z-score across accelerometer, strain and temperature channels. It is a blunt instrument. The interesting failures are slow, and a slow enough drift looks like a new baseline. Separating instrument drift from real change on limited history is still open for me.",
              },
            ].map((item) => (
              <div key={item.q} className="rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] p-5">
                <p className="text-[#F5F5F5] text-sm font-semibold mb-2 leading-snug">{item.q}</p>
                <p className="text-[#525252] text-xs leading-relaxed">{item.note}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* What I am looking for next */}
        <motion.div
          className="rounded-xl border border-[#F59E0B]/20 bg-[#F59E0B]/5 p-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.65 }}
        >
          <p className="text-[10px] font-mono tracking-widest text-[#F59E0B] uppercase mb-2">
            What I am looking for next
          </p>
          <p className="text-[#A3A3A3] text-sm leading-relaxed max-w-3xl">
            The right lab, and the right supervisor. I have done enough self directed work to
            know where it stops. The thesis went as far as a workstation and a reading list
            could take it, and the questions above are past what I can answer alone. What I
            want now is a group where some of this is already being argued about, and someone
            whose standards are higher than mine, who will tell me plainly when I am wrong.
            I am not looking for a place to be comfortable. I am looking for the people who
            will make me considerably better at this than I currently am.
          </p>
        </motion.div>

        {/* Two-column: plate viz + timeline */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          <div>
            <motion.h3
              className="text-[#F5F5F5] font-semibold text-lg mb-6"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              FG-GRC Plate · Graphene Architecture
            </motion.h3>
            <PlateVisualizer />
            <motion.p
              className="text-[#333] text-xs font-mono mt-6 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
            >
              FG-X distributes graphene nanoplatelets with maximum concentration at the
              surfaces, where bending stresses are highest, producing superior
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

        {/* Second study, FRP seminar work */}
        <motion.div
          className="rounded-xl border border-[#222] bg-surface p-6 mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[10px] font-mono tracking-widest text-[#F59E0B] uppercase">Also: Seminar Study, 2024</span>
          </div>
          <h3 className="text-[#F5F5F5] font-semibold text-lg mb-2">
            FRP Strengthening of Aging Reinforced Concrete
          </h3>
          <p className="text-[#A3A3A3] text-sm leading-relaxed max-w-3xl mb-3">
            Before the thesis, I spent a semester reviewing how CFRP, GFRP, and BFRP retrofitting
            restores capacity in aging concrete structures, comparing externally bonded and
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


        {/* Artifacts */}
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <motion.a
            href="https://fg-grc-calculator.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#F59E0B] text-black text-sm font-bold hover:bg-[#FBBF24] transition-all"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
          >
            Run the buckling simulator →
          </motion.a>
        </div>
      </div>
    </section>
  );
}
