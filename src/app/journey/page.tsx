"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Navigation from "@/components/ui/Navigation";

// ─── Data ─────────────────────────────────────────────────────────────────────

const CHAPTERS = [
  {
    year: "2003",
    location: "Kathmandu, Nepal",
    tag: "ORIGIN",
    color: "#10B981",
    title: "Born in the shadow of Himalaya",
    body: `Kathmandu. Dust and marigolds. The smell of butter lamps and diesel fumes in the same breath. I grew up watching buildings — crumbling brick walls next to concrete apartment blocks that seemed impossibly tall. I didn't know it yet, but I was already asking the question: what holds things together?`,
    learned: "That home is both a place and a question you spend your whole life answering.",
    ledTo: "A childhood fascination with why things stand.",
  },
  {
    year: "2015",
    location: "Kathmandu, Nepal",
    tag: "TURNING POINT",
    color: "#EF4444",
    title: "The day the earth decided",
    body: `April 25th, 2015. I was in class. 7.8 on the Richter scale. What I remember most is not the shaking — it's the silence after. Then the smoke. Then the numbers: 9,000 lives, 500,000 homes, 8,800 temples damaged or destroyed. Dharahara, a 62-metre tower I'd climbed as a kid, collapsed completely. That day I stopped wondering what I would do with my life. It told me.`,
    learned: "Engineering is not abstract. It is the reason some families go home and some don't.",
    ledTo: "The decision, at 12, to build better.",
  },
  {
    year: "2018",
    location: "Kathmandu, Nepal",
    tag: "COMMITMENT",
    color: "#F59E0B",
    title: "Choosing civil when everyone said don't",
    body: `Choosing civil engineering in Nepal in 2018 felt like choosing a hard road. Everyone said: go for computer science, go abroad, do something that pays. But I kept coming back to the images from 2015 — the collapsed houses, the rubble where schools had been. Pre-code masonry construction. Zero structural health monitoring. Three thousand bridges with no inspection protocol. The numbers were a call, not a warning.`,
    learned: "A hard problem with a real answer is better than an easy problem with a comfortable one.",
    ledTo: "Earning a seat at NIT Rourkela — one of India's finest civil engineering programs.",
  },
  {
    year: "2021",
    location: "Rourkela, Odisha, India",
    tag: "ACCELERATION",
    color: "#3B82F6",
    title: "1,500 km from home and finding ABAQUS",
    body: `NIT Rourkela. A steel-town university two time zones and one country away from everything I knew. The first semester was disorienting — food, language, heat I had never felt. Then I found ABAQUS. Finite element simulation: a world where you could watch a plate buckle, see a stress concentration form, run 200 parametric variations in a single Python script. I was immediately, completely lost in it.`,
    learned: "Distance from home is not the same as distance from purpose. Sometimes it's closer.",
    ledTo: "Launching my undergraduate thesis on FG-GRC composite plates.",
  },
  {
    year: "2023",
    location: "Rourkela, India",
    tag: "UNEXPECTED TURN",
    color: "#8B5CF6",
    title: "The cricket problem that wouldn't leave me alone",
    body: `I have watched cricket my whole life. Then I started running the numbers. Phase-weighted batting impact. Death bowling undervalued everywhere. I built an XGBoost model on IPL 2024 data — 17.3 percentage points above baseline. It turned out engineering and cricket analysis are the same activity: identify variables, build a model, validate it against reality. The boundary between structural analysis and sports data dissolved for me that year.`,
    learned: "A domain is just a set of constraints. The thinking underneath is universal.",
    ledTo: "The Cricket Codex. A new way to watch the game.",
  },
  {
    year: "2024",
    location: "NIT Rourkela, India",
    tag: "THESIS",
    color: "#F59E0B",
    title: "200 simulations and a +30% discovery",
    body: `My B.Tech thesis: buckling analysis of functionally graded graphene-reinforced composite (FG-GRC) plates. The idea — gradient the graphene concentration from base plate to surface, match the reinforcement to the stress distribution. Two hundred ABAQUS runs. A Python automation pipeline. Twelve independent variables. Result: 30% improvement in critical buckling load over uniform distribution. The math worked. The insight was always the same: put the resource exactly where the load is.`,
    learned: "The best engineering solutions feel obvious in retrospect and impossible until they work.",
    ledTo: "The Research Vault. A thesis defence. Something to take home.",
  },
  {
    year: "2025",
    location: "Rourkela → Kathmandu",
    tag: "NOW",
    color: "#10B981",
    title: "Building a website that thinks like a structure",
    body: `I built this. Not just a portfolio — a website that works like a structure. Load paths are navigation paths. The Codex is the restricted floor no one is supposed to reach but engineers always do. The Lab has real tools. The Failures page is the most important page on the site. I am graduating in 2025. Then I go home. Kathmandu is waiting with 3,000 bridges and no SHM protocol. I have a Python pipeline and a degree. Let's see what holds.`,
    learned: "You are always building something. Make it load-bearing.",
    ledTo: "????",
  },
  {
    year: "????",
    location: "Kathmandu, Nepal",
    tag: "COMING SOON",
    color: "#444444",
    title: "Going back with tools Nepal doesn't have yet",
    body: `I don't know what 2026 looks like. But I know it looks like Bagmati River on a clear day. It looks like fieldwork outside the ring road. It looks like structural health monitoring on bridges that have never been inspected. It looks like teaching the next class of engineering students that the math they're learning has addresses — real places, real structures, real stakes. I'm going home. I just need to be useful when I get there.`,
    learned: "—",
    ledTo: "This chapter is being written.",
  },
];

// ─── Single chapter card ───────────────────────────────────────────────────────

function Chapter({ chapter, index }: { chapter: typeof CHAPTERS[0]; index: number }) {
  const isLast = index === CHAPTERS.length - 1;
  const isRight = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex gap-0 ${isRight ? "md:flex-row" : "md:flex-row-reverse"}`}
    >
      {/* Timeline spine connector */}
      <div className="hidden md:flex flex-col items-center w-16 shrink-0 relative">
        {/* Line above */}
        {index !== 0 && (
          <div className="w-px h-8 shrink-0" style={{ background: `linear-gradient(to bottom, transparent, ${chapter.color}30)` }} />
        )}
        {/* Node */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 z-10"
          style={{ borderColor: chapter.color, background: `${chapter.color}15` }}
        >
          <div className="w-2 h-2 rounded-full" style={{ background: chapter.color }} />
        </motion.div>
        {/* Line below */}
        {!isLast && (
          <div className="w-px flex-1 mt-1" style={{ background: `${chapter.color}20` }} />
        )}
      </div>

      {/* Card */}
      <div className={`flex-1 pb-16 ${isRight ? "md:pr-12" : "md:pl-12"} md:max-w-none`}>
        {/* Mobile node */}
        <div className="md:hidden flex items-center gap-3 mb-4">
          <div className="w-3 h-3 rounded-full" style={{ background: chapter.color }} />
          <div className="h-px flex-1" style={{ background: `${chapter.color}20` }} />
        </div>

        <div
          className="rounded-2xl border p-7 relative overflow-hidden group transition-all duration-500 hover:border-opacity-40"
          style={{ borderColor: `${chapter.color}18`, background: `${chapter.color}04` }}
        >
          {/* Top accent */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${chapter.color}60, transparent)` }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />

          {/* Tag + year row */}
          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-[9px] font-mono tracking-[0.3em] px-2 py-1 rounded"
              style={{ color: chapter.color, background: `${chapter.color}12`, border: `1px solid ${chapter.color}20` }}
            >
              {chapter.tag}
            </span>
            <span className="text-[#222] text-xs font-mono">{chapter.location}</span>
          </div>

          {/* Year */}
          <div
            className="text-6xl font-black mb-2 opacity-[0.07] absolute top-5 right-7 select-none pointer-events-none"
            style={{ color: chapter.color, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.04em" }}
          >
            {chapter.year}
          </div>

          {/* Title */}
          <h2 className="text-[#E5E5E5] font-bold text-xl mb-4 leading-tight pr-16" style={{ letterSpacing: "-0.02em" }}>
            {chapter.title}
          </h2>

          {/* Body */}
          <p className="text-[#4A4A4A] text-sm leading-relaxed mb-6">
            {chapter.body}
          </p>

          {/* Learned + Led to */}
          <div className="grid sm:grid-cols-2 gap-4 pt-5 border-t" style={{ borderColor: `${chapter.color}10` }}>
            <div>
              <div className="text-[10px] font-mono tracking-widest mb-2" style={{ color: `${chapter.color}50` }}>
                WHAT I LEARNED
              </div>
              <p className="text-xs text-[#3A3A3A] leading-relaxed italic">
                {chapter.learned}
              </p>
            </div>
            <div>
              <div className="text-[10px] font-mono tracking-widest mb-2" style={{ color: `${chapter.color}50` }}>
                LED TO
              </div>
              <p className="text-xs text-[#3A3A3A] leading-relaxed">
                {chapter.ledTo}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function JourneyPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <main className="min-h-screen bg-[#010101]" ref={containerRef}>
      <Navigation />

      {/* Header */}
      <section className="max-w-3xl mx-auto px-6 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#F59E0B]/40" />
            <span className="text-[#F59E0B] text-[9px] font-mono tracking-[0.5em]">EIGHT CHAPTERS</span>
          </div>
          <h1 className="text-[#F5F5F5] font-black text-5xl sm:text-6xl mb-6" style={{ letterSpacing: "-0.03em", lineHeight: 1.05 }}>
            The long road<br />
            <span className="text-[#333]">from Kathmandu</span><br />
            <span style={{ color: "#F59E0B" }}>to wherever this goes.</span>
          </h1>
          <p className="text-[#444] text-sm leading-relaxed max-w-lg">
            Not a CV. A map of what happened, what I learned, and how one earthquake in 2015 shaped every decision I&apos;ve made since. Start at the beginning or jump to where you are.
          </p>
        </motion.div>

        {/* Year quick-nav */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap gap-2 mt-10"
        >
          {CHAPTERS.map((c) => (
            <a
              key={c.year}
              href={`#chapter-${c.year}`}
              className="text-[10px] font-mono px-2.5 py-1 rounded border transition-all"
              style={{ color: c.color, borderColor: `${c.color}25`, background: `${c.color}06` }}
            >
              {c.year}
            </a>
          ))}
        </motion.div>
      </section>

      {/* Timeline */}
      <section className="max-w-3xl mx-auto px-6 pb-24 relative">
        {/* Progress line (desktop, left side) */}
        <div className="hidden md:block absolute left-[calc(1.5rem+2rem)] top-0 bottom-0 w-px bg-[#111]">
          <motion.div className="w-full bg-[#F59E0B]/20 origin-top" style={{ height: lineHeight }} />
        </div>

        {CHAPTERS.map((chapter, i) => (
          <div key={chapter.year} id={`chapter-${chapter.year}`}>
            <Chapter chapter={chapter} index={i} />
          </div>
        ))}
      </section>

      {/* Footer note */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-[#0d0d0d] p-8 text-center"
        >
          <div className="text-3xl mb-4 text-[#F59E0B]">△</div>
          <p className="text-[#444] text-sm leading-relaxed max-w-md mx-auto mb-6">
            8,848 metres. The reason I&apos;m still here, still building, still heading home.
            There&apos;s infrastructure that needs engineers who understand it personally.
          </p>
          <div className="flex justify-center gap-6">
            <Link href="/mind" className="text-xs font-mono text-[#333] hover:text-[#F59E0B] transition-colors">
              See the world map →
            </Link>
            <Link href="/codex/nepal" className="text-xs font-mono text-[#333] hover:text-[#10B981] transition-colors">
              Nepal Files →
            </Link>
            <Link href="/" className="text-xs font-mono text-[#333] hover:text-[#F5F5F5] transition-colors">
              ← Back to home
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
