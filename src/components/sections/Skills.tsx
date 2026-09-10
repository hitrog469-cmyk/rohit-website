"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const SKILL_GROUPS = [
  {
    category: "Construction",
    color: "#F59E0B",
    icon: "▤",
    skills: [
      { name: "Line of Balance", desc: "Rate based planning, crew flow through locations" },
      { name: "Pace Variation Analysis", desc: "Where production is drifting off the planned rate" },
      { name: "Delay Forecasting", desc: "Projecting schedule outcomes from current progress" },
      { name: "Work Plan Target Tracking", desc: "Committed versus achieved, week over week" },
      { name: "Activity & Dependency Logic", desc: "Configuring how progress is inferred and sequenced" },
      { name: "Root Cause Investigation", desc: "Tracing a disputed result back through the chain" },
      { name: "BOQ & Quantity Take-off", desc: "Bills of quantities from field measurement" },
      { name: "Site Execution Supervision", desc: "Industrial structures, running account billing" },
    ],
  },
  {
    category: "Reality Capture & BIM",
    color: "#3B82F6",
    icon: "◉",
    skills: [
      { name: "360 Walkthrough Capture", desc: "Site imagery registered against the model" },
      { name: "Drone Survey", desc: "Aerial capture for as-built status" },
      { name: "3D Scan Review", desc: "Point cloud against design geometry" },
      { name: "Revit / BIM", desc: "Model coordination, as-planned reference" },
      { name: "Navisworks", desc: "Model review, clash and sequence checking" },
      { name: "Dataset Quality Audit", desc: "Annotation review standards for construction imagery" },
    ],
  },
  {
    category: "Analysis & Research",
    color: "#A855F7",
    icon: "⬡",
    skills: [
      { name: "ABAQUS", desc: "FEM modeling, parametric studies, composite materials" },
      { name: "MATLAB", desc: "Numerical analysis, matrix operations, plate theory" },
      { name: "FEM Theory", desc: "Classical plate theory, variational methods" },
      { name: "Classical Plate Theory", desc: "CPT, FSDT, governing equations" },
      { name: "LaTeX", desc: "Academic writing, thesis formatting" },
    ],
  },
  {
    category: "Code",
    color: "#3B82F6",
    icon: "◳",
    skills: [
      { name: "Python", desc: "Scientific computing, FastAPI, data analysis" },
      { name: "Next.js", desc: "Full-stack web apps, App Router, server components" },
      { name: "TypeScript", desc: "Type-safe JavaScript, React ecosystem" },
      { name: "React", desc: "Component architecture, hooks, state management" },
      { name: "D3.js", desc: "Data visualization, force graphs, custom charts" },
      { name: "Three.js", desc: "3D graphics, WebGL, particle systems" },
    ],
  },
  {
    category: "Structural & Transport",
    color: "#10B981",
    icon: "△",
    skills: [
      { name: "AutoCAD", desc: "2D drafting, structural drawings" },
      { name: "STAAD.Pro", desc: "Structural analysis, frame structures" },
      { name: "SAP2000", desc: "Building analysis, seismic design" },
      { name: "ETABS", desc: "High-rise analysis, lateral loads" },
      { name: "IITPAVE", desc: "Flexible pavement design to IRC methods" },
    ],
  },
];

function SkillBar({
  name,
  desc,
  color,
}: {
  name: string;
  desc: string;
  color: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="group"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <div className="flex items-baseline gap-2 mb-1">
        <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: color }} />
        <span className="text-[#F5F5F5] text-sm font-medium">{name}</span>
      </div>

      {/* Tooltip */}
      <AnimatedDesc show={hovered} desc={desc} />
    </motion.div>
  );
}

function AnimatedDesc({ show, desc }: { show: boolean; desc: string }) {
  return (
    <motion.p
      className="text-[#525252] text-xs leading-snug overflow-hidden"
      animate={{ height: show ? "auto" : 0, opacity: show ? 1 : 0, marginBottom: show ? 8 : 0 }}
      initial={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {desc}
    </motion.p>
  );
}

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  const displayed = activeGroup
    ? SKILL_GROUPS.filter((g) => g.category === activeGroup)
    : SKILL_GROUPS;

  return (
    <section id="skills" ref={ref} className="section-padding bg-ink relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 120% 60% at 80% 50%, rgba(59,130,246,0.04) 0%, transparent 60%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-12"
        >
          <span className="section-label mb-4 inline-flex">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
            Skills
          </span>
          <h2 className="text-headline text-[#F5F5F5] mt-4">
            What I <span className="text-[#F59E0B]">Work With</span>
          </h2>
          <p className="text-[#525252] mt-3 text-base max-w-md">
            Hover any item for context. Filter by domain below.
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          className="flex flex-wrap gap-2 mb-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          <button
            onClick={() => setActiveGroup(null)}
            className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
              !activeGroup
                ? "bg-[#F59E0B] text-black font-bold"
                : "border border-[#222] text-[#525252] hover:border-[#F59E0B]/30 hover:text-[#F5F5F5]"
            }`}
          >
            All
          </button>
          {SKILL_GROUPS.map((g) => (
            <button
              key={g.category}
              onClick={() => setActiveGroup(activeGroup === g.category ? null : g.category)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 ${
                activeGroup === g.category
                  ? "text-black font-bold"
                  : "border border-[#222] text-[#525252] hover:text-[#F5F5F5]"
              }`}
              style={
                activeGroup === g.category
                  ? { backgroundColor: g.color, borderColor: g.color }
                  : {}
              }
            >
              {g.icon} {g.category}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {displayed.map((group, gi) => (
            <motion.div
              key={group.category}
              className="rounded-2xl glass p-6"
              style={{ borderColor: `${group.color}20` }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: gi * 0.1, duration: 0.6 }}
              layout
            >
              {/* Group header */}
              <div className="flex items-center gap-2.5 mb-6">
                <span className="text-xl">{group.icon}</span>
                <h3 className="font-bold text-[#F5F5F5]">{group.category}</h3>
                <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${group.color}40, transparent)` }} />
              </div>

              <div className="space-y-3">
                {group.skills.map((skill) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    desc={skill.desc}
                    color={group.color}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
