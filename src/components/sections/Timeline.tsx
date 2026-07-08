"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { MapPin, ChevronDown, ExternalLink } from "lucide-react";

const EVENTS = [
  {
    year: "2018",
    role: "SEE — District Topper",
    org: "Baglung, Nepal",
    location: "Baglung → Kathmandu",
    type: "education",
    color: "#F59E0B",
    desc: "Topped the district in the School Leaving Examination. 3.95 / 4.0. Packed everything up and moved to Kathmandu for the science stream. First time living away from home, first bet placed entirely on myself. Didn't look back.",
    highlights: ["3.95 / 4.0 GPA", "District Topper · Baglung", "Baglung → Kathmandu"],
  },
  {
    year: "2020",
    role: "Co-founder — Learners Club",
    org: "YouTube",
    location: "Kathmandu (Remote)",
    type: "creative",
    color: "#10B981",
    desc: "COVID hit. Schools shut. Three school friends saw a gap and filled it. Built a YouTube channel teaching high school physics, chemistry and maths to students who suddenly had no access to teachers. No funding, no studio, just knowledge and time. 300+ videos. 3,000+ subscribers. Students actually learning.",
    highlights: ["300+ videos", "3,000+ subs", "Physics · Chemistry · Maths", "COVID impact"],
  },
  {
    year: "2021",
    role: "B.Tech — Civil Engineering",
    org: "India",
    location: "Rourkela, Odisha, India",
    type: "education",
    color: "#3B82F6",
    desc: "1,500km from home. Said yes to everything from day one. Class Representative. Branch Representative. Mentor at Institute Counselling Services, helping fellow students navigate academic and personal pressures. Represented the institute in football at inter-collegiate level. If a role meant contributing more, I took it. Four years of being uncomfortable on purpose.",
    highlights: ["Class Representative", "Branch Representative", "Institute Counselling Mentor", "Football — Inter-collegiate"],
  },
  {
    year: "2024 · Summer",
    role: "Quality Assurance Intern",
    org: "Government of India Subsidiary",
    location: "India",
    type: "work",
    color: "#8B5CF6",
    desc: "Summer internship at an organisation operating under the Government of India. Got a ground-level view of how quality systems work inside large public infrastructure projects: the scale, the process, the people. Left with a completely different understanding of how India operates as an economy. Changed my plans. Before this, I was in a hurry to leave for higher studies. After this, I wanted to understand more first.",
    highlights: ["Quality Assurance", "Govt. of India subsidiary", "Infrastructure scale", "Shifted my perspective"],
  },
  {
    year: "2024 · Aug",
    role: "Thesis Research — FG-GRC Plates",
    org: "Dept. of Civil Engineering",
    location: "Rourkela, India",
    type: "research",
    color: "#A855F7",
    desc: "Officially began thesis research in August 2024, but the questions had been building with my supervisor much earlier. Buckling and free vibration of Functionally Graded Graphene Reinforced Composite plates under combined thermomechanical loading. Months in the literature, Classical Plate Theory derivations, ABAQUS parametric studies, MATLAB scripting. Primarily computational: the lab was my workstation. Built a live web simulator for the plate analysis tool so anyone can run the calculations.",
    highlights: ["FG-GRC · ABAQUS · MATLAB", "Thermomechanical loading", "Buckling & Vibration", "Live web tool ↗"],
    link: "https://fg-grc-calculator.vercel.app/",
    linkLabel: "Open FG-GRC Simulator →",
  },
  {
    year: "2024–25",
    role: "Final Year — Placements · Research · One More Internship",
    org: "Engineering Institute",
    location: "Rourkela, India",
    type: "education",
    color: "#F59E0B",
    desc: "Final year running three things at once: finishing the thesis, sitting for campus placements (curious what the industry looked like post-internship), and taking one more internship in the last semester to keep expanding what I knew. The internship experience had given me appetite for the non-traditional side of construction — the technology layer, the systems thinking. Wanted to understand where the field was actually heading.",
    highlights: ["Thesis completion", "Campus placements", "Final semester internship", "Technology in construction"],
  },
  {
    year: "2025",
    role: "Construction Analyst",
    org: "CloudFactory (Buildots)",
    location: "Lalitpur, Nepal · Jul 2025 – Present",
    type: "current",
    color: "#EF4444",
    desc: "Working on Buildots, an AI platform that monitors construction progress by comparing 360° site walkthrough imagery against BIM models and schedules. My job is making sure the AI doesn't lie: verifying progress claims, auditing annotated datasets, catching sequencing and scope deviations, and writing the domain review standards that keep the computer-vision models honest. Got in through a written exam and two interview rounds.",
    highlights: ["CloudFactory · Buildots", "BIM vs 360° Site Imagery", "CV-based Progress Monitoring", "Construction × AI"],
  },
  {
    year: "Now",
    role: "Building the next chapter",
    org: "Kathmandu → Wherever",
    location: "Kathmandu, Nepal",
    type: "current",
    color: "#F59E0B",
    desc: "Back home in Kathmandu after four years away, and the city looks different when you've spent a degree learning why buildings fail. The research, the CloudFactory work, the Learners Club years are all starting to point at the same thing, and I'm figuring out what to build next and who to build it with. Applying to graduate programs in parallel, because the thesis questions won't leave me alone.",
    highlights: ["Research + Industry", "Grad school applications", "Building with a team"],
  },
  {
    year: "→ MS / PhD",
    role: "Graduate Research",
    org: "TBD",
    location: "Somewhere with the right lab",
    type: "future",
    color: "#525252",
    desc: "The questions I care about now sit between AI and infrastructure: how machines read construction sites, how data changes the way we assess and maintain what we build. Answering them properly needs a real lab, the right supervisor, and time to go deep. The next academic chapter is a matter of timing and the right door.",
    highlights: ["AI × infrastructure", "International research", "?"],
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
      {/* Node + line */}
      <div className="flex flex-col items-center shrink-0 w-8">
        <motion.div
          className="relative w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 z-10"
          style={{
            borderColor: event.color,
            backgroundColor: isFuture ? "transparent" : `${event.color}15`,
          }}
          animate={
            isCurrent
              ? { boxShadow: [`0 0 0 0 ${event.color}50`, `0 0 0 14px ${event.color}00`] }
              : {}
          }
          transition={{ duration: 1.6, repeat: Infinity }}
          whileHover={{ scale: 1.2 }}
        >
          {isFuture ? (
            <motion.span
              className="font-bold text-xs"
              style={{ color: "#525252" }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ?
            </motion.span>
          ) : (
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: event.color }} />
          )}
        </motion.div>

        {!isLast && (
          <motion.div
            className="w-px flex-1 mt-1"
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            style={{
              transformOrigin: "top",
              background: isFuture
                ? "repeating-linear-gradient(to bottom, #2a2a2a 0, #2a2a2a 4px, transparent 4px, transparent 8px)"
                : `linear-gradient(to bottom, ${event.color}40, ${EVENTS[index + 1]?.color ?? event.color}15)`,
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
            <h3 className={`font-bold text-base leading-snug ${isFuture ? "text-[#404040]" : "text-[#F5F5F5]"}`}>
              {event.role}
            </h3>
            <p className={`text-sm mt-0.5 ${isFuture ? "text-[#2a2a2a]" : "text-[#525252]"}`}>
              {event.org}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3 text-[#2a2a2a]" />
              <span className="text-[11px] text-[#2a2a2a] font-mono">{event.location}</span>
            </div>
          </div>
          <motion.div animate={{ rotate: open ? 180 : 0 }} className="text-[#333] mt-1 shrink-0">
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
              <p className="text-[#737373] text-sm leading-[1.85] mt-3 mb-4">
                {event.desc}
              </p>

              <div className="flex flex-wrap gap-2 mb-3">
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

              {"link" in event && event.link && (
                <a
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-2 mt-1 text-xs font-mono px-3 py-1.5 rounded-lg transition-all duration-200"
                  style={{
                    color: event.color,
                    background: `${event.color}12`,
                    border: `1px solid ${event.color}35`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = `${event.color}22`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = `${event.color}12`;
                  }}
                >
                  <ExternalLink className="w-3 h-3" />
                  {"linkLabel" in event ? String(event.linkLabel) : "Open →"}
                </a>
              )}
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
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
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
          <p className="text-[#525252] mt-3 text-base">
            From Baglung to wherever this is going. Click any node.
          </p>
        </motion.div>

        <div>
          {EVENTS.map((event, i) => (
            <TimelineNode
              key={`${event.year}-${i}`}
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
