"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { MapPin, ChevronDown } from "lucide-react";

const EVENTS = [
  {
    year: "2020",
    role: "Co-founder — Learners Club",
    org: "Learners Club — YouTube",
    location: "Baglung / Remote",
    type: "creative",
    color: "#10B981",
    desc: "COVID lockdown. Three school friends decided to do something useful. Built a YouTube channel teaching high school physics, chemistry and maths. 300+ videos. 3,000+ subscribers. Kept going until NIT made time impossible.",
    highlights: ["300+ videos", "3,000+ subscribers", "Physics · Chemistry · Maths"],
  },
  {
    year: "2021",
    role: "B.Tech Student — Civil Engineering",
    org: "NIT Rourkela",
    location: "Rourkela, India",
    type: "education",
    color: "#F59E0B",
    desc: "Joined one of India's premier NITs — 1,500km from home. Started with mechanics, materials, and the fundamentals of how structures hold up and fail.",
    highlights: ["Structural Analysis", "Concrete Technology", "Geotechnical Eng."],
  },
  {
    year: "2022",
    role: "Research Intern — Structural Lab",
    org: "NIT Rourkela",
    location: "Rourkela, India",
    type: "research",
    color: "#3B82F6",
    desc: "Assisted in experimental testing of RC beams. First exposure to ABAQUS. Started asking questions no textbook had answers to.",
    highlights: ["ABAQUS basics", "RC beam testing", "Load-deflection curves"],
  },
  {
    year: "2023",
    role: "Thesis Research Begins",
    org: "Dept. of Civil Engineering, NIT Rourkela",
    location: "Rourkela, India",
    type: "research",
    color: "#8B5CF6",
    desc: "Chose FG-GRC plates as thesis topic. Spent months in the literature, deriving equations, running ABAQUS parametrics. This is where the obsession started.",
    highlights: ["FEM modeling", "MATLAB scripting", "Classical Plate Theory"],
  },
  {
    year: "2025",
    role: "B.Tech Graduate",
    org: "NIT Rourkela",
    location: "Rourkela, India",
    type: "education",
    color: "#F59E0B",
    desc: "Graduated with thesis on buckling and vibration of FG-GRC plates under thermomechanical loading. CGPA 8.0/10. Returned to Kathmandu carrying four years of fire.",
    highlights: ["Thesis defended", "CGPA 8.0 / 10", "FG-GRC research"],
  },
  {
    year: "2025–26",
    role: "Working · Researching · Building",
    org: "Kathmandu, Nepal",
    location: "Kathmandu, Nepal",
    type: "current",
    color: "#F59E0B",
    desc: "Full-time job while looking for the right research opportunity. Building this website, working on structural projects, and keeping the hunger alive. Earning matters. So does the next chapter.",
    highlights: ["Full-time work", "Research hunt", "Building in public"],
  },
  {
    year: "2026/27",
    role: "MSc / PhD — Structural Engineering",
    org: "TBD — KAUST · NUS · TU Munich",
    location: "???",
    type: "future",
    color: "#525252",
    desc: "The next chapter. Wherever the research takes me. The boundary conditions are still unknown — but the loading is clear.",
    highlights: ["Research continuation", "International exposure", "?"],
  },
];

function TimelineNode({
  event,
  index,
  isLast,
}: {
  event: (typeof EVENTS)[0];
  index: number;
  isLast: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isFuture = event.type === "future";
  const isCurrent = event.type === "current";

  return (
    <motion.div
      ref={ref}
      className="relative flex gap-6 md:gap-10"
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
    >
      {/* Center line + node */}
      <div className="flex flex-col items-center shrink-0 w-8">
        <motion.div
          className="relative w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 z-10"
          style={{
            borderColor: event.color,
            backgroundColor: isFuture ? "transparent" : `${event.color}15`,
          }}
          animate={
            isCurrent
              ? { boxShadow: [`0 0 0 0 ${event.color}50`, `0 0 0 12px ${event.color}00`] }
              : {}
          }
          transition={{ duration: 1.5, repeat: Infinity }}
          whileHover={{ scale: 1.2 }}
        >
          {isFuture ? (
            <motion.span
              className="text-[#525252] font-bold text-xs"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ?
            </motion.span>
          ) : (
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: event.color }}
            />
          )}
        </motion.div>

        {/* Connecting line */}
        {!isLast && (
          <motion.div
            className="w-px flex-1 mt-1"
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            style={{
              transformOrigin: "top",
              background: isFuture
                ? "repeating-linear-gradient(to bottom, #333 0, #333 4px, transparent 4px, transparent 8px)"
                : `linear-gradient(to bottom, ${event.color}40, ${EVENTS[index + 1]?.color ?? event.color}20)`,
            }}
          />
        )}
      </div>

      {/* Content */}
      <div className="pb-10 flex-1 cursor-pointer" onClick={() => setOpen(!open)}>
        {/* Year chip */}
        <div
          className="inline-block text-[10px] font-mono px-2 py-0.5 rounded mb-2"
          style={{ color: event.color, background: `${event.color}15`, border: `1px solid ${event.color}30` }}
        >
          {event.year}
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <h3
              className={`font-bold text-base ${isFuture ? "text-[#525252]" : "text-[#F5F5F5]"}`}
            >
              {event.role}
            </h3>
            <p className={`text-sm mt-0.5 ${isFuture ? "text-[#333]" : "text-[#A3A3A3]"}`}>
              {event.org}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3 text-[#333]" />
              <span className="text-[11px] text-[#333] font-mono">{event.location}</span>
            </div>
          </div>
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            className="text-[#333] mt-1 shrink-0"
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: "hidden" }}
            >
              <p className="text-[#A3A3A3] text-sm leading-relaxed mt-3 mb-3">
                {event.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {event.highlights.map((h) => (
                  <span
                    key={h}
                    className="text-xs px-2.5 py-0.5 rounded-full"
                    style={{
                      color: event.color,
                      background: `${event.color}10`,
                      border: `1px solid ${event.color}25`,
                    }}
                  >
                    {h}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function Timeline() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" ref={ref} className="section-padding bg-void relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{ backgroundImage: "radial-gradient(circle, #F59E0B 1px, transparent 1px)", backgroundSize: "40px 40px" }}
      />

      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16"
        >
          <span className="section-label mb-4 inline-flex">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
            Journey
          </span>
          <h2 className="text-headline text-[#F5F5F5] mt-4">
            The <span className="text-[#F59E0B]">Road</span> So Far
          </h2>
          <p className="text-[#525252] mt-3 text-base">Click any node to expand.</p>
        </motion.div>

        <div>
          {EVENTS.map((event, i) => (
            <TimelineNode
              key={event.year}
              event={event}
              index={i}
              isLast={i === EVENTS.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
