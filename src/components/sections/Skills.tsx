"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const SKILL_GROUPS = [
  {
    category: "Research",
    color: "#F59E0B",
    icon: "⬡",
    skills: [
      { name: "ABAQUS", level: 90, desc: "FEM modeling, parametric studies, composite materials" },
      { name: "MATLAB", level: 85, desc: "Numerical analysis, matrix operations, plate theory" },
      { name: "FEM Theory", level: 88, desc: "Classical plate theory, variational methods" },
      { name: "Classical Plate Theory", level: 85, desc: "CPT, FSDT, governing equations" },
      { name: "LaTeX", level: 80, desc: "Academic writing, thesis formatting" },
    ],
  },
  {
    category: "Code",
    color: "#3B82F6",
    icon: "◳",
    skills: [
      { name: "Python", level: 85, desc: "Scientific computing, FastAPI, data analysis" },
      { name: "Next.js", level: 80, desc: "Full-stack web apps, App Router, server components" },
      { name: "TypeScript", level: 78, desc: "Type-safe JavaScript, React ecosystem" },
      { name: "React", level: 82, desc: "Component architecture, hooks, state management" },
      { name: "D3.js", level: 70, desc: "Data visualization, force graphs, custom charts" },
      { name: "Three.js", level: 68, desc: "3D graphics, WebGL, particle systems" },
    ],
  },
  {
    category: "Civil Eng.",
    color: "#10B981",
    icon: "△",
    skills: [
      { name: "AutoCAD", level: 85, desc: "2D drafting, structural drawings" },
      { name: "STAAD.Pro", level: 78, desc: "Structural analysis, frame structures" },
      { name: "SAP2000", level: 72, desc: "Building analysis, seismic design" },
      { name: "Revit / BIM", level: 65, desc: "Building information modeling" },
      { name: "ETABS", level: 70, desc: "High-rise analysis, lateral loads" },
    ],
  },
  {
    category: "Create",
    color: "#8B5CF6",
    icon: "✦",
    skills: [
      { name: "Video Editing", level: 78, desc: "Premiere Pro, DaVinci — YouTube content" },
      { name: "Motion Graphics", level: 65, desc: "After Effects, explainer animations" },
      { name: "Figma", level: 72, desc: "UI/UX design, component systems" },
      { name: "Content Strategy", level: 80, desc: "Learners Club — science education" },
    ],
  },
];

function SkillBar({
  name,
  level,
  desc,
  color,
  delay,
}: {
  name: string;
  level: number;
  desc: string;
  color: string;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      className="group"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <div className="flex justify-between items-baseline mb-1.5">
        <span className="text-[#F5F5F5] text-sm font-medium">{name}</span>
        <span className="text-[10px] font-mono" style={{ color }}>{level}%</span>
      </div>

      {/* Track */}
      <div className="h-1.5 rounded-full bg-[#1a1a1a] overflow-hidden mb-1">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
        />
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
            The <span className="text-[#F59E0B]">Arsenal</span>
          </h2>
          <p className="text-[#525252] mt-3 text-base max-w-md">
            Hover any skill for context. Filter by domain below.
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

              <div className="space-y-4">
                {group.skills.map((skill, si) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    desc={skill.desc}
                    color={group.color}
                    delay={0.2 + si * 0.08}
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
