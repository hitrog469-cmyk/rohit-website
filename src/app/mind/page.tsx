"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion"; // AnimatePresence used for child nodes
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navigation from "@/components/ui/Navigation";

// ─── Data ─────────────────────────────────────────────────────────────────────

type NodeId = string;

interface MindNode {
  id: NodeId;
  label: string;
  x: number; // 0-800
  y: number; // 0-600
  r: number;
  color: string;
  href?: string;
  parentId?: NodeId;
  desc?: string;
  sublabel?: string;
}

const CENTER: MindNode = {
  id: "rohit", label: "ROHIT", sublabel: "ACHARYA",
  x: 400, y: 295, r: 26, color: "#F59E0B",
};

const DOMAINS: MindNode[] = [
  { id: "engineering", label: "Engineering", x: 185, y: 125, r: 20, color: "#F59E0B", href: "/lab",
    desc: "FEM simulation, composite plates, structural analysis. The technical core." },
  { id: "nepal",       label: "Nepal",       x: 595, y: 105, r: 20, color: "#10B981", href: "/codex/nepal",
    desc: "Home country, infrastructure challenges, identity. The reason any of this matters." },
  { id: "cricket",     label: "Cricket",     x: 660, y: 375, r: 20, color: "#3B82F6", href: "/codex/cricket",
    desc: "IPL analytics, match prediction, data as a second language for sport." },
  { id: "code",        label: "Code",        x: 145, y: 450, r: 20, color: "#8B5CF6", href: "/stack",
    desc: "Next.js, Python, Three.js, TypeScript. Engineering and software are the same activity." },
  { id: "ideas",       label: "Ideas",       x: 415, y: 510, r: 20, color: "#F97316", href: "/structures",
    desc: "Why structures fail. How systems behave. Gradient thinking everywhere." },
];

const CHILDREN: MindNode[] = [
  // Engineering
  { id: "fggrc",    parentId: "engineering", label: "FG-GRC",     x: 58,  y: 45,  r: 11, color: "#F59E0B", href: "/codex/research",
    desc: "Functionally graded graphene composite plates. 200+ ABAQUS runs. +30% buckling resistance." },
  { id: "buckling", parentId: "engineering", label: "Buckling",   x: 38,  y: 165, r: 11, color: "#F59E0B", href: "/lab/beam",
    desc: "Critical load analysis. Euler-Bernoulli beams. Interactive calculator." },
  { id: "abaqus",   parentId: "engineering", label: "ABAQUS",     x: 98,  y: 258, r: 11, color: "#F59E0B", href: "/stack",
    desc: "FEM software. Python-automated parametric studies." },
  { id: "failures", parentId: "engineering", label: "Failures",   x: 185, y: 288, r: 11, color: "#F59E0B", href: "/failures",
    desc: "Tacoma Narrows, Ronan Point, Dharahara — what collapsed and why." },
  // Nepal
  { id: "kathmandu",      parentId: "nepal", label: "Kathmandu",      x: 685, y: 42,  r: 11, color: "#10B981", href: "/journey",
    desc: "City of temples, old masonry, monsoon rain and poor infrastructure data." },
  { id: "bagmati",        parentId: "nepal", label: "Bagmati River",   x: 740, y: 155, r: 11, color: "#10B981", href: "/codex/nepal",
    desc: "The river I grew up near. 10 years of cleanup. Kingfishers are back." },
  { id: "dharahara",      parentId: "nepal", label: "Dharahara",       x: 690, y: 248, r: 11, color: "#10B981", href: "/failures",
    desc: "The tower that fell in 2015. The failure that chose my career." },
  { id: "infrastructure", parentId: "nepal", label: "Infrastructure",  x: 620, y: 230, r: 11, color: "#10B981", href: "/structures",
    desc: "3,000 bridges with no SHM. 60% pre-code buildings. The numbers I think about at 2am." },
  // Cricket
  { id: "ipl",      parentId: "cricket", label: "IPL Data",   x: 762, y: 320, r: 11, color: "#3B82F6", href: "/codex/cricket",
    desc: "Phase-weighted batting impact. Death bowling undervalued everywhere." },
  { id: "xgboost",  parentId: "cricket", label: "XGBoost",   x: 768, y: 430, r: 11, color: "#3B82F6", href: "/codex/cricket",
    desc: "67.3% match prediction accuracy on IPL 2024. 17.3pp above baseline." },
  { id: "phases",   parentId: "cricket", label: "Phase Theory", x: 658, y: 465, r: 11, color: "#3B82F6", href: "/codex/cricket",
    desc: "Powerplay 35%, middle overs 40%, death 25%. The boring middle decides outcomes." },
  // Code
  { id: "nextjs",   parentId: "code", label: "Next.js",   x: 38,  y: 385, r: 11, color: "#8B5CF6", href: "/stack",
    desc: "This entire site. App Router, server components, MDX blog." },
  { id: "python",   parentId: "code", label: "Python",    x: 28,  y: 488, r: 11, color: "#8B5CF6", href: "/stack",
    desc: "ABAQUS automation, FEM pipelines, cricket ML model." },
  { id: "threejs",  parentId: "code", label: "Three.js",  x: 90,  y: 540, r: 11, color: "#8B5CF6", href: "/stack",
    desc: "3D on the web. The hero section. The closest I get to building visible things." },
  // Ideas
  { id: "systems",     parentId: "ideas", label: "Systems",    x: 290, y: 572, r: 11, color: "#F97316", href: "/structures",
    desc: "How trusses, frames, plates and cables each carry load differently." },
  { id: "gradients",   parentId: "ideas", label: "Gradients",  x: 415, y: 585, r: 11, color: "#F97316", href: "/codex/research",
    desc: "FG materials, gradient thinking, putting the resource where the stress is." },
  { id: "whythings",   parentId: "ideas", label: "Why Things Fail", x: 530, y: 572, r: 11, color: "#F97316", href: "/failures",
    desc: "Six collapses. Six lessons. Engineering knowledge lives in its failures." },
];

// ─── Info panel content ────────────────────────────────────────────────────────

const DOMAIN_INFO: Record<string, { title: string; lines: string[]; cta: string; ctaHref: string }> = {
  engineering: {
    title: "Engineering",
    lines: [
      "B.Tech Civil Engineering, NIT Rourkela.",
      "Thesis: buckling of FG-GRC plates — graphene composites.",
      "200+ ABAQUS parametric runs. Python automation pipeline.",
      "Beam calculator, column buckling, structural systems.",
    ],
    cta: "Open The Lab →",
    ctaHref: "/lab",
  },
  nepal: {
    title: "Nepal",
    lines: [
      "Grew up in Kathmandu. Left in 2021 for NIT Rourkela.",
      "The 2015 earthquake chose my career — structures that hold vs. ones that don't.",
      "3,000 bridges with no structural health monitoring.",
      "Going back with tools Nepal doesn't have yet.",
    ],
    cta: "Open Nepal Files →",
    ctaHref: "/codex/nepal",
  },
  cricket: {
    title: "Cricket",
    lines: [
      "Watched cricket. Then ran the numbers. Couldn't go back.",
      "IPL analytics: phase-weighted impact framework.",
      "XGBoost match prediction: 67.3% accuracy (baseline 50%).",
      "The middle overs decide 40% of outcomes. Underrated everywhere.",
    ],
    cta: "Open Cricket Codex →",
    ctaHref: "/codex/cricket",
  },
  code: {
    title: "Code",
    lines: [
      "Started to automate ABAQUS parametric studies in Python.",
      "Then built tools. Then built this website.",
      "Next.js, TypeScript, Three.js, Framer Motion, Tailwind.",
      "Engineering and software are the same activity: load path thinking.",
    ],
    cta: "See My Stack →",
    ctaHref: "/stack",
  },
  ideas: {
    title: "Ideas",
    lines: [
      "Six structural typologies. Each carries load a different way.",
      "Gradient thinking: put the resource where the stress is.",
      "Six structural failures. The lessons you can't learn any other way.",
      "Systems, not components — the insight is always at the connection.",
    ],
    cta: "Structural Systems →",
    ctaHref: "/structures",
  },
};

// ─── Animated line ─────────────────────────────────────────────────────────────

function AnimLine({ x1, y1, x2, y2, color, dim }: { x1: number; y1: number; x2: number; y2: number; color: string; dim?: boolean }) {
  const len = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  return (
    <motion.line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={color}
      strokeWidth={dim ? 0.8 : 1.4}
      strokeOpacity={dim ? 0.12 : 0.35}
      strokeDasharray={len}
      initial={{ strokeDashoffset: len }}
      animate={{ strokeDashoffset: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    />
  );
}

// ─── Node component ───────────────────────────────────────────────────────────

function NodeCircle({
  node, active, faded, onClick
}: { node: MindNode; active: boolean; faded: boolean; onClick: () => void }) {
  const isCenter = node.id === "rohit";
  return (
    <g onClick={onClick} style={{ cursor: node.href || !isCenter ? "pointer" : "default" }}>
      {/* Glow ring */}
      {active && (
        <motion.circle
          cx={node.x} cy={node.y} r={node.r + 10}
          fill="none" stroke={node.color} strokeWidth="1"
          strokeOpacity="0.3"
          initial={{ r: node.r, opacity: 0 }}
          animate={{ r: node.r + 14, opacity: [0.3, 0.1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
      {/* Outer ring for center */}
      {isCenter && (
        <motion.circle
          cx={node.x} cy={node.y} r={node.r + 6}
          fill="none" stroke={node.color} strokeWidth="0.8" strokeOpacity="0.25"
          animate={{ r: [node.r + 6, node.r + 10, node.r + 6] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      {/* Main circle */}
      <motion.circle
        cx={node.x} cy={node.y} r={node.r}
        fill={`${node.color}18`}
        stroke={node.color}
        strokeWidth={active ? 2 : 1.2}
        strokeOpacity={faded ? 0.15 : active ? 1 : 0.6}
        animate={{ fillOpacity: active ? 0.25 : 0.1 }}
        whileHover={{ r: node.r + 2 }}
        transition={{ duration: 0.2 }}
      />
      {/* Label */}
      <text
        x={node.x} y={node.y + (node.sublabel ? -3 : 4)}
        textAnchor="middle" fontSize={node.r > 15 ? 9 : 7.5}
        fill={node.color}
        fillOpacity={faded ? 0.2 : 1}
        fontFamily="monospace" fontWeight="700" letterSpacing="0.05em"
        style={{ pointerEvents: "none", userSelect: "none" }}
      >
        {node.label}
      </text>
      {node.sublabel && (
        <text
          x={node.x} y={node.y + 9}
          textAnchor="middle" fontSize={7}
          fill={node.color} fillOpacity={faded ? 0.2 : 0.6}
          fontFamily="monospace" letterSpacing="0.08em"
          style={{ pointerEvents: "none", userSelect: "none" }}
        >
          {node.sublabel}
        </text>
      )}
    </g>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MindPage() {
  const [activeDomain, setActiveDomain] = useState<string | null>(null);
  const router = useRouter();

  const handleDomainClick = useCallback((id: string) => {
    setActiveDomain((prev) => (prev === id ? null : id));
  }, []);

  const handleChildClick = useCallback((node: MindNode) => {
    if (node.href) router.push(node.href);
  }, [router]);

  const activeChildren = CHILDREN.filter((c) => c.parentId === activeDomain);
  const activeInfo = activeDomain ? DOMAIN_INFO[activeDomain] : null;
  const activeDomainNode = DOMAINS.find((d) => d.id === activeDomain);

  // Stars (static for performance)
  const STARS = Array.from({ length: 60 }, (_, i) => ({
    cx: (i * 137.5) % 800,
    cy: (i * 97.3) % 600,
    r: i % 3 === 0 ? 1 : 0.5,
  }));

  return (
    <main className="min-h-screen bg-[#010101] flex flex-col">
      <Navigation />

      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl mx-auto w-full px-4 pt-20 pb-8 gap-6">

        {/* Left: header + info panel */}
        <div className="lg:w-80 shrink-0 flex flex-col gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-px w-6 bg-[#F59E0B]/40" />
              <span className="text-[#F59E0B] text-[9px] font-mono tracking-[0.5em]">THE WORLD MAP</span>
            </div>
            <h1 className="text-[#F5F5F5] font-black text-3xl mb-2" style={{ letterSpacing: "-0.02em" }}>
              Everything,<br />connected.
            </h1>
            <p className="text-[#444] text-xs leading-relaxed">
              Five domains. Forty-five connections. One person who doesn&apos;t think these are separate subjects.
            </p>
            <p className="text-[#333] text-[10px] font-mono mt-3">
              Click any domain to explore. Click sub-nodes to dive deep.
            </p>
          </motion.div>

          {/* Info panel */}
          <AnimatePresence mode="wait">
            {activeInfo && activeDomainNode ? (
              <motion.div
                key={activeDomain}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border p-5 relative overflow-hidden"
                style={{ borderColor: `${activeDomainNode.color}25`, background: `${activeDomainNode.color}06` }}
              >
                <div className="absolute top-0 left-0 right-0 h-0.5"
                  style={{ background: `linear-gradient(90deg, transparent, ${activeDomainNode.color}, transparent)` }} />
                <div className="text-[10px] font-mono mb-3 tracking-widest" style={{ color: `${activeDomainNode.color}70` }}>
                  DOMAIN — {activeInfo.title.toUpperCase()}
                </div>
                <ul className="space-y-2 mb-5">
                  {activeInfo.lines.map((line, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="text-xs text-[#525252] leading-relaxed flex gap-2"
                    >
                      <span style={{ color: `${activeDomainNode.color}50` }} className="shrink-0">▸</span>
                      {line}
                    </motion.li>
                  ))}
                </ul>
                <Link
                  href={activeInfo.ctaHref}
                  className="inline-flex items-center gap-2 text-xs font-mono transition-all"
                  style={{ color: activeDomainNode.color }}
                >
                  <span>{activeInfo.cta}</span>
                  <motion.span animate={{ x: [0, 3, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-2xl border border-[#0d0d0d] p-5"
              >
                <div className="text-[#1a1a1a] text-[10px] font-mono tracking-widest mb-3">SELECT A DOMAIN</div>
                <div className="space-y-2">
                  {DOMAINS.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => setActiveDomain(d.id)}
                      className="flex items-center gap-2 text-xs w-full text-left group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: d.color, opacity: 0.6 }} />
                      <span className="text-[#333] group-hover:text-[#A3A3A3] transition-colors font-mono">{d.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation bottom */}
          <div className="mt-auto flex gap-4 text-[10px] font-mono">
            <Link href="/" className="text-[#222] hover:text-[#F59E0B] transition-colors">← Home</Link>
            <Link href="/journey" className="text-[#222] hover:text-[#F59E0B] transition-colors">Journey →</Link>
          </div>
        </div>

        {/* Right: the constellation */}
        <div className="flex-1 relative">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full rounded-2xl border border-[#0d0d0d] overflow-hidden"
            style={{ background: "#020202", aspectRatio: "4/3", maxHeight: "calc(100vh - 140px)" }}
          >
            <svg
              viewBox="0 0 800 600"
              className="w-full h-full"
              onClick={() => setActiveDomain(null)}
              style={{ cursor: "default" }}
            >
              {/* Stars */}
              <g opacity="0.4">
                {STARS.map((s, i) => (
                  <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="#F5F5F5" opacity={0.3} />
                ))}
              </g>

              {/* Center → domain lines (always visible) */}
              {DOMAINS.map((d) => (
                <AnimLine key={`center-${d.id}`} x1={CENTER.x} y1={CENTER.y} x2={d.x} y2={d.y} color={d.color} dim />
              ))}

              {/* Domain → children lines (only when active) */}
              <AnimatePresence>
                {activeDomain && activeChildren.map((child) => {
                  const parent = DOMAINS.find((d) => d.id === activeDomain)!;
                  return (
                    <AnimLine key={`line-${child.id}`} x1={parent.x} y1={parent.y} x2={child.x} y2={child.y} color={child.color} />
                  );
                })}
              </AnimatePresence>

              {/* Domain nodes */}
              {DOMAINS.map((d) => (
                <NodeCircle
                  key={d.id}
                  node={d}
                  active={activeDomain === d.id}
                  faded={!!activeDomain && activeDomain !== d.id}
                  onClick={() => { handleDomainClick(d.id); }}
                />
              ))}

              {/* Child nodes (animated in) */}
              <AnimatePresence>
                {activeChildren.map((child, i) => (
                  <motion.g
                    key={child.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                    style={{ transformOrigin: `${child.x}px ${child.y}px` }}
                    onClick={(e) => { e.stopPropagation(); handleChildClick(child); }}
                  >
                    <circle
                      cx={child.x} cy={child.y} r={child.r + 10}
                      fill="transparent"
                      style={{ cursor: "pointer" }}
                    />
                    <circle
                      cx={child.x} cy={child.y} r={child.r}
                      fill={`${child.color}15`}
                      stroke={child.color} strokeWidth="1.2" strokeOpacity="0.7"
                    />
                    <text
                      x={child.x} y={child.y + 4}
                      textAnchor="middle" fontSize="6.5"
                      fill={child.color} fillOpacity="0.9"
                      fontFamily="monospace" fontWeight="600"
                      style={{ pointerEvents: "none", userSelect: "none" }}
                    >
                      {child.label}
                    </text>
                  </motion.g>
                ))}
              </AnimatePresence>

              {/* Center node (on top) */}
              <NodeCircle
                node={CENTER}
                active={false}
                faded={false}
                onClick={() => { }}
              />

              {/* Tooltip for hovered child */}
              {/* (omitted for performance — info is in panel) */}

              {/* Hint text */}
              <text x="400" y="590" textAnchor="middle" fontSize="8.5" fill="#1a1a1a" fontFamily="monospace">
                {activeDomain ? `${activeChildren.length} connections — click any node to go deeper` : "click a domain to expand"}
              </text>
            </svg>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
