"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { value: 200, suffix: "+", label: "ABAQUS simulations", sublabel: "parametric study runs", color: "#F59E0B" },
  { value: 30, suffix: "%", prefix: "+", label: "buckling improvement", sublabel: "FG-X vs uniform distribution", color: "#F59E0B" },
  { value: 1500, suffix: " km", label: "from home", sublabel: "Kathmandu → Rourkela", color: "#A3A3A3" },
  { value: 4, suffix: " yrs", label: "at NIT Rourkela", sublabel: "B.Tech Civil Engineering", color: "#A3A3A3" },
  { value: 12, suffix: "+", label: "variables studied", sublabel: "across parametric space", color: "#F59E0B" },
  { value: 67, suffix: ".3%", label: "model accuracy", sublabel: "IPL match prediction (XGBoost)", color: "#3B82F6" },
  { value: 300, suffix: "+", label: "teaching videos", sublabel: "Learners Club · physics, chem, maths", color: "#8B5CF6" },
  { value: 8848, suffix: "m", label: "of reasons to go home", sublabel: "height of Sagarmatha", color: "#10B981" },
];

function AnimatedNumber({ value, prefix = "", suffix = "", inView }: { value: number; prefix?: string; suffix?: string; inView: boolean }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1400;
    const step = Math.ceil(value / 60);
    const interval = setInterval(() => {
      start += step;
      if (start >= value) { setDisplay(value); clearInterval(interval); }
      else setDisplay(start);
    }, duration / (value / step));
    return () => clearInterval(interval);
  }, [inView, value]);

  return (
    <span>
      {prefix}{display.toLocaleString()}{suffix}
    </span>
  );
}

export default function NumbersSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 px-6 md:px-12 bg-[#030303] relative overflow-hidden">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `linear-gradient(rgba(245,158,11,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.04) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-[#F59E0B]/40" />
            <span className="text-[#F59E0B] text-[10px] font-mono tracking-[0.5em]">BY THE NUMBERS</span>
          </div>
          <h2 className="text-[#F5F5F5] font-black text-3xl md:text-4xl" style={{ letterSpacing: "-0.02em" }}>
            The work, in figures.
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#111]">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className="bg-[#030303] p-6 md:p-8 group hover:bg-[#060606] transition-colors duration-300 relative overflow-hidden"
            >
              {/* Hover accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ background: `linear-gradient(90deg, ${stat.color}, transparent)` }}
              />

              <div
                className="text-3xl md:text-4xl font-black font-mono mb-2 tabular-nums"
                style={{ color: stat.color }}
              >
                <AnimatedNumber value={stat.value} prefix={stat.prefix} suffix={stat.suffix} inView={inView} />
              </div>
              <div className="text-[#F5F5F5] text-sm font-semibold mb-1">{stat.label}</div>
              <div className="text-[#333] text-xs font-mono leading-snug">{stat.sublabel}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
