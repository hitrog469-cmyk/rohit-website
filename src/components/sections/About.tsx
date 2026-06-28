"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const DETAIL_CARDS = [
  { icon: "◈", label: "NIT Rourkela", sub: "B.Tech Civil · 8.0 CGPA" },
  { icon: "△", label: "Baglung → Kathmandu", sub: "Nepal" },
  { icon: "◉", label: "Bayern Munich", sub: "Joshua Kimmich fan" },
  { icon: "▤", label: "Learners Club", sub: "300+ videos · 3k+ subs" },
];

const STORY_SHORT =
  "I grew up in Baglung, a small hilly district in western Nepal near Dhaulagiri. My father spent his prime years working in Bahrain, Saudi Arabia and Dubai so his children wouldn't have to. I was district topper in school. I got into NIT Rourkela. I don't take any of that lightly. Civil engineer, researcher, builder. Someone who hasn't forgotten where the journey started.";

const STORY_FULL =
  "My father never really got to live his own life. He worked security in the Gulf for years, sent money home, came back when his health needed it, and picked up whatever work he could find. For a stretch he was walking streets in Baglung selling phone recharge cards so there'd be money for the next day. He never complained once. That's what drives me more than any grade ever could.\n\nI graduated with a B.Tech in Civil Engineering and an 8.0 CGPA, having spent four years obsessing over why structures fail and how to make them not. My thesis on Functionally Graded Graphene Reinforced Composite (FG-GRC) plates wasn't just academic work. It was personal. I watched the 2015 earthquake devastate Kathmandu from a phone screen in Baglung, terrified and completely helpless. I chose structures because of that afternoon.\n\nDuring COVID lockdown I co-founded Learners Club with two school friends. A YouTube channel, 300+ videos, 3,000+ subscribers, teaching high school physics, chemistry and maths to students who needed it. That mission isn't finished.\n\nI'm back in Kathmandu now. Working full time at CloudFactory as a Construction Data Analyst, sitting at the intersection of civil engineering and AI-driven data operations: reviewing site walkthrough visual data, verifying build progress against BIM models, running quality checks on annotated construction datasets. Researching. Building in public. The goal was never just a degree. It was to become someone useful to the world I came from.";

function FloatingCard({
  icon,
  label,
  sub,
  delay,
}: {
  icon: string;
  label: string;
  sub: string;
  delay: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="glass amber-border rounded-xl p-4 flex items-center gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, borderColor: "rgba(245,158,11,0.5)" }}
    >
      <span className="text-2xl">{icon}</span>
      <div>
        <p className="text-[#F5F5F5] text-sm font-semibold">{label}</p>
        <p className="text-[#525252] text-xs">{sub}</p>
      </div>
    </motion.div>
  );
}

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="about" ref={ref} className="section-padding bg-ink relative overflow-hidden">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#F59E0B 1px, transparent 1px), linear-gradient(90deg, #F59E0B 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="section-label">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
            About
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — photo placeholder + detail cards */}
          <div className="relative">
            {/* Photo frame */}
            <motion.div
              className="relative w-full max-w-sm mx-auto lg:mx-0"
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="aspect-[4/5] rounded-2xl overflow-hidden relative"
                style={{
                  background:
                    "linear-gradient(135deg, #1a1a1a 0%, #111111 100%)",
                  border: "1px solid #222222",
                }}
              >
                {/* Initials fallback — visible until /rohit.jpg is added */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="w-20 h-20 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/20 flex items-center justify-center">
                    <span className="text-2xl font-black tracking-tight text-[#F59E0B]">RA</span>
                  </div>
                  <p className="text-[#333333] text-xs font-mono tracking-widest uppercase">
                    Kathmandu · Nepal
                  </p>
                </div>

                {/* Real photo — auto-appears once public/rohit.jpg exists */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/rohit.jpg"
                  alt="Rohit Acharya"
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />

                {/* Glitch overlay effect */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{
                    opacity: [0, 0.04, 0, 0.02, 0],
                    x: [0, -2, 2, -1, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatDelay: 6,
                  }}
                  style={{
                    background:
                      "linear-gradient(transparent 40%, rgba(245,158,11,0.15) 50%, transparent 60%)",
                  }}
                />

                {/* Amber corner accent */}
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#F59E0B]/40 rounded-tr-sm" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#F59E0B]/40 rounded-bl-sm" />
              </div>

              {/* Glow behind photo */}
              <div
                className="absolute -inset-4 rounded-3xl pointer-events-none -z-10"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(245,158,11,0.08) 0%, transparent 70%)",
                }}
              />
            </motion.div>

            {/* Detail cards */}
            <div className="grid grid-cols-2 gap-3 mt-6 max-w-sm mx-auto lg:mx-0">
              {DETAIL_CARDS.map((card, i) => (
                <FloatingCard key={card.label} {...card} delay={0.3 + i * 0.1} />
              ))}
            </div>
          </div>

          {/* Right — story */}
          <div className="flex flex-col justify-center">
            <motion.h2
              className="text-headline text-[#F5F5F5] mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              The Human{" "}
              <span className="text-[#F59E0B]">Behind</span>
              <br />
              The Work
            </motion.h2>

            <motion.p
              className="text-[#A3A3A3] text-base leading-relaxed mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.6 }}
            >
              {STORY_SHORT}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.45, duration: 0.6 }}
            >
              {expanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.4 }}
                >
                  {STORY_FULL.split("\n\n").map((para, i) => (
                    <p key={i} className="text-[#A3A3A3] text-base leading-relaxed mb-4">
                      {para}
                    </p>
                  ))}
                </motion.div>
              )}

              <button
                onClick={() => setExpanded(!expanded)}
                className="text-[#F59E0B] text-sm font-mono tracking-wider hover:text-white transition-colors mt-2"
              >
                {expanded ? "[ show less ]" : "[ read more ]"}
              </button>
            </motion.div>

            {/* Quote */}
            <motion.blockquote
              className="mt-10 pl-4 border-l-2 border-[#F59E0B]/40"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <p className="text-[#525252] text-sm italic leading-relaxed">
                &ldquo;My father sold phone recharge cards on a street in Baglung so I could study.
                Everything I build is for him, and for every kid in a small town who doesn&apos;t
                know yet that they&apos;re capable of something large.&rdquo;
              </p>
              <footer className="mt-2 text-[#333333] text-xs font-mono">
                / why I do any of this
              </footer>
            </motion.blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
