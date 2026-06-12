"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";

const GithubIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const STACK_COLORS: Record<string, string> = {
  "Next.js": "#F5F5F5",
  Python: "#3B82F6",
  "React": "#61DAFB",
  "ABAQUS": "#F59E0B",
  MATLAB: "#e2431e",
  "Tailwind": "#06B6D4",
  "D3.js": "#F97316",
  "Three.js": "#8B5CF6",
  "PostgreSQL": "#336791",
  "TypeScript": "#3178C6",
  "FastAPI": "#009688",
  "YouTube": "#FF0000",
  "Education": "#10B981",
  "Recharts": "#22B5BF",
};

const PROJECTS = [
  {
    id: "shm",
    title: "SHM Dashboard",
    tagline: "Structural Health Monitoring — real-time sensor data viz",
    description:
      "Dashboard for monitoring structural health of civil infrastructure. Real-time sensor visualization and anomaly detection — currently running on simulated sensor data while the full pipeline is built.",
    stack: ["Next.js", "TypeScript", "Recharts"],
    impact: "Prototype",
    impactSub: "Sample data running",
    status: "IN DEVELOPMENT · SAMPLE DATA LIVE",
    live: "#",
    github: "#",
    color: "#3B82F6",
    emoji: "📡",
  },
  {
    id: "fggrc",
    title: "FG-GRC Simulator",
    tagline: "Interactive FEM plate buckling calculator",
    description:
      "Web-based simulator that computes nondimensional buckling loads and natural frequencies for FG-GRC plates. Input GPL distribution, geometry, and boundary conditions — get instant results.",
    stack: ["React", "Python", "MATLAB", "FastAPI"],
    impact: "Target: 500ms",
    impactSub: "vs hours in ABAQUS",
    status: "IN DEVELOPMENT",
    live: "#",
    github: "#",
    color: "#F59E0B",
    emoji: "🧮",
  },
  {
    id: "frp",
    title: "FRP Analyzer",
    tagline: "Fiber-reinforced polymer section analysis tool",
    description:
      "Structural analysis tool for FRP-reinforced concrete sections. Computes moment-curvature relationships, cracking loads, and deflection profiles per IS and ACI code.",
    stack: ["Python", "React", "Tailwind"],
    impact: "ACI + IS",
    impactSub: "Dual code compliance",
    status: "IN DEVELOPMENT",
    live: "#",
    github: "#",
    color: "#10B981",
    emoji: "🏗️",
  },
  {
    id: "curry",
    title: "Curry House",
    tagline: "Restaurant discovery platform for Kathmandu",
    description:
      "Full-stack restaurant discovery and review platform built for the Kathmandu food scene. Search by cuisine, price, location. Ratings, photos, and menu previews.",
    stack: ["Next.js", "TypeScript", "Tailwind", "PostgreSQL"],
    impact: "200+",
    impactSub: "Restaurants listed",
    status: "",
    live: "#",
    github: "#",
    color: "#F97316",
    emoji: "🍛",
  },
  {
    id: "election",
    title: "Nepal Election Tracker",
    tagline: "Live results visualization — 2022 general election",
    description:
      "Real-time election results dashboard for Nepal's 2022 general election. Constituency maps, party seat projections, vote share charts — all updating live.",
    stack: ["React", "D3.js", "TypeScript"],
    impact: "14K+",
    impactSub: "Views on election day",
    status: "",
    live: "#",
    github: "#",
    color: "#EF4444",
    emoji: "🗳️",
  },
  {
    id: "learners-club",
    title: "Learners Club",
    tagline: "YouTube channel — high school science, explained simply",
    description:
      "Co-founded during the COVID-19 lockdown with two school friends. 300+ videos teaching physics, chemistry, and maths to high school students across Nepal — free, in a language they understand.",
    stack: ["YouTube", "Education"],
    impact: "300+",
    impactSub: "Videos · 3,000+ subscribers",
    status: "",
    live: "https://www.youtube.com/@learnersclub5910",
    github: "#",
    color: "#8B5CF6",
    emoji: "📺",
  },
];

function ProjectCard({ project, index }: { project: (typeof PROJECTS)[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className="relative shrink-0 w-[340px] md:w-[400px] rounded-2xl overflow-hidden border border-[#1a1a1a] bg-surface flex flex-col"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -8, borderColor: `${project.color}44` }}
      style={{ boxShadow: hovered ? `0 20px 60px ${project.color}20` : "0 4px 40px rgba(0,0,0,0.6)" }}
    >
      {/* Top band */}
      <div
        className="h-40 flex items-center justify-center relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${project.color}12 0%, ${project.color}05 100%)` }}
      >
        <motion.span
          className="text-7xl"
          animate={hovered ? { scale: 1.15 } : { scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {project.emoji}
        </motion.span>

        {/* Impact badge */}
        <div
          className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-bold"
          style={{ background: `${project.color}20`, color: project.color, border: `1px solid ${project.color}40` }}
        >
          {project.impact}
          <span className="text-[10px] font-normal ml-1 opacity-70">{project.impactSub}</span>
        </div>

        {/* Animated glow on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: hovered ? 1 : 0 }}
          style={{ background: `radial-gradient(ellipse at center, ${project.color}15 0%, transparent 70%)` }}
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {project.status && (
          <span className="inline-flex items-center gap-1.5 self-start mb-2.5 px-2.5 py-1 rounded-full text-[9px] font-mono font-bold tracking-widest bg-[#F59E0B]/10 border border-[#F59E0B]/25 text-[#F59E0B]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
            {project.status}
          </span>
        )}
        <h3 className="text-[#F5F5F5] font-bold text-lg mb-1">{project.title}</h3>
        <p className="text-[#525252] text-xs font-mono mb-3">{project.tagline}</p>
        <p className="text-[#A3A3A3] text-sm leading-relaxed flex-1">{project.description}</p>

        {/* Stack pills */}
        <div className="flex flex-wrap gap-1.5 mt-4 mb-5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="text-[10px] px-2 py-0.5 rounded-full font-mono"
              style={{
                color: STACK_COLORS[tech] ?? "#A3A3A3",
                background: `${STACK_COLORS[tech] ?? "#A3A3A3"}15`,
                border: `1px solid ${STACK_COLORS[tech] ?? "#A3A3A3"}30`,
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links — only shown once a real URL replaces the "#" placeholder */}
        {(project.live !== "#" || project.github !== "#") && (
          <div className="flex gap-3 mt-auto">
            {project.live !== "#" && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-[#F5F5F5] hover:text-[#F59E0B] transition-colors font-medium"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Live
              </a>
            )}
            {project.github !== "#" && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors"
              >
                <GithubIcon />
                GitHub
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <section id="projects" ref={ref} className="py-24 bg-ink overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex items-end justify-between"
        >
          <div>
            <span className="section-label mb-4 inline-flex">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
              Projects
            </span>
            <h2 className="text-headline text-[#F5F5F5] mt-4">
              Things I&apos;ve{" "}
              <span className="text-[#F59E0B]">Built</span>
            </h2>
          </div>
          <motion.a
            href="https://github.com/hitrog469-cmyk"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 text-[#525252] hover:text-[#F59E0B] text-sm transition-colors"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            More on GitHub <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={trackRef}
        className="flex gap-5 overflow-x-auto px-6 md:px-12 pb-6 scroll-smooth"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}

        {/* GitHub CTA card */}
        <motion.a
          href="https://github.com/hitrog469-cmyk"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 w-[240px] rounded-2xl border border-dashed border-[#222] flex flex-col items-center justify-center gap-3 p-8 group hover:border-[#F59E0B]/40 transition-all"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
        >
          <svg className="w-8 h-8 text-[#333] group-hover:text-[#F59E0B] transition-colors" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
          <p className="text-[#333] group-hover:text-[#A3A3A3] text-sm text-center transition-colors">
            More projects on GitHub
          </p>
          <ArrowRight className="w-4 h-4 text-[#333] group-hover:text-[#F59E0B] transition-colors" />
        </motion.a>
      </div>

      {/* Scroll hint */}
      <div className="flex justify-center mt-4">
        <span className="text-[#333] text-xs font-mono tracking-widest">
          ← scroll horizontally →
        </span>
      </div>
    </section>
  );
}
