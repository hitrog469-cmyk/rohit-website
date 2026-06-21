"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { GraduationCap, BookOpen, Award, ChevronDown } from "lucide-react";

const COURSES = [
  "Structural Analysis I & II",
  "Finite Element Methods",
  "Theory of Elasticity",
  "Advanced Concrete Design",
  "Geotechnical Engineering",
  "Structural Dynamics",
  "Earthquake Engineering",
  "Numerical Methods in Engineering",
  "Engineering Mathematics I–IV",
  "Composite Materials",
];

const BEYOND = [
  { icon: "◈", title: "How to learn anything fast", desc: "Four years of dense coursework forced me to build systems for rapid understanding. I can pick up any technical topic in days, not weeks." },
  { icon: "◎", title: "Collaboration under pressure", desc: "Lab work, group projects, night-before deadlines. Learned that the best solutions come from pulling everyone's strengths together." },
  { icon: "▶", title: "Teaching as the ultimate test", desc: "Tutored juniors, ran Learners Club sessions with 300+ videos. If you can't explain it simply, you don't understand it. This changed how I approach everything." },
  { icon: "▲", title: "Resilience", desc: "NIT Rourkela is hard. Not everyone who starts finishes. I learned that persistence matters more than talent in every measurable way." },
];

export default function Education() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [beyondOpen, setBeyondOpen] = useState(false);

  return (
    <section id="education" ref={ref} className="section-padding bg-void relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16"
        >
          <span className="section-label mb-4 inline-flex">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
            Education
          </span>
          <h2 className="text-headline text-[#F5F5F5] mt-4">
            Where It All <span className="text-[#F59E0B]">Began</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* NIT Card — premium */}
          <motion.div
            className="rounded-2xl relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, var(--bg-elevated) 0%, var(--bg-surface) 100%)",
              border: "1px solid rgba(245,158,11,0.2)",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7 }}
            whileHover={{ borderColor: "rgba(245,158,11,0.45)" }}
          >
            {/* Watermark */}
            <div className="absolute top-1/2 right-4 -translate-y-1/2 text-[120px] font-black opacity-[0.025] select-none pointer-events-none text-[#F59E0B]">
              NIT
            </div>

            <div className="p-8 relative z-10">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/20 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-6 h-6 text-[#F59E0B]" />
                </div>
                <div>
                  <h3 className="text-[#F5F5F5] font-bold text-xl">NIT Rourkela</h3>
                  <p className="text-[#A3A3A3] text-sm">National Institute of Technology</p>
                  <p className="text-[#525252] text-xs font-mono mt-0.5">Rourkela, Odisha, India</p>
                </div>
              </div>

              {/* Degree + dates */}
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20">
                  B.Tech Civil Engineering
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#1a1a1a] text-[#525252] border border-[#222]">
                  2021 – 2025
                </span>
              </div>

              {/* CGPA badge */}
              <div className="flex items-center gap-3 mb-6 p-4 rounded-xl bg-[#0a0a0a] border border-[#1a1a1a]">
                <Award className="w-5 h-5 text-[#F59E0B]" />
                <div>
                  <p className="text-[#F5F5F5] font-bold text-lg">CGPA — 8.0 / 10.0</p>
                  <p className="text-[#525252] text-xs">Cumulative Grade Point Average</p>
                </div>
              </div>

              {/* Thesis highlight */}
              <div className="p-4 rounded-xl border border-[#F59E0B]/15 bg-[#F59E0B]/5 mb-5">
                <p className="text-[10px] font-mono text-[#F59E0B] tracking-widest uppercase mb-1">Thesis</p>
                <p className="text-[#F5F5F5] text-sm font-medium leading-snug">
                  Buckling & Vibration of FG-GRC Plates Under Combined Thermomechanical Loading
                </p>
                <p className="text-[#525252] text-xs mt-1">Supervisor: [Prof. Name] · Dept. of Civil Engineering</p>
              </div>

              {/* Key courses */}
              <div>
                <p className="text-[#525252] text-xs font-mono tracking-wider uppercase mb-3">Key Courses</p>
                <div className="flex flex-wrap gap-2">
                  {COURSES.map((c) => (
                    <span key={c} className="text-[10px] px-2 py-0.5 rounded bg-[#1a1a1a] text-[#525252] border border-[#222]">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* High school card */}
          <motion.div
            className="rounded-2xl p-8"
            style={{ background: "var(--bg-ink)", border: "1px solid var(--border-default)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            whileHover={{ borderColor: "#333" }}
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center shrink-0">
                <BookOpen className="w-6 h-6 text-[#3B82F6]" />
              </div>
              <div>
                <h3 className="text-[#F5F5F5] font-bold text-xl">Kathmandu Bernhardt Secondary School</h3>
                <p className="text-[#A3A3A3] text-sm">+2 Science (Physics, Chemistry, Maths)</p>
                <p className="text-[#525252] text-xs font-mono mt-0.5">Balkhu, Kathmandu, Nepal</p>
              </div>
            </div>

            <div className="flex gap-2 mb-5">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/20">
                NEB — PCM
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#1a1a1a] text-[#525252] border border-[#222]">
                2018 – 2020
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#3B82F6]/5 border border-[#3B82F6]/10 mb-4">
              <p className="text-[#F5F5F5] font-bold text-lg">GPA 3.85 / 4.0</p>
              <p className="text-[#525252] text-xs mt-0.5">National Examination Board Nepal</p>
            </div>

            {/* 10th grade highlight */}
            <div className="p-3 rounded-xl bg-[#F59E0B]/5 border border-[#F59E0B]/15 mb-5">
              <p className="text-[9px] font-mono text-[#F59E0B] tracking-widest uppercase mb-1">Grade 10 · Garima Awasiya Secondary School, Baglung</p>
              <p className="text-[#F5F5F5] text-sm font-semibold">GPA 3.95 / 4.0 &nbsp;·&nbsp; <span className="text-[#F59E0B]">District Topper, Baglung</span></p>
              <p className="text-[#525252] text-xs mt-0.5">NEB Nepal · 2017/18</p>
            </div>

            <p className="text-[#A3A3A3] text-sm leading-relaxed">
              Left Baglung for Kathmandu to pursue science stream. First time living away from home. In a hostel, in a city I barely knew. The hunger to prove something started here.
            </p>
          </motion.div>
        </div>

        {/* Beyond classroom */}
        <motion.div
          className="rounded-2xl border border-[#1a1a1a] overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
        >
          <button
            className="w-full p-6 flex items-center justify-between text-left hover:bg-[#0f0f0f] transition-colors"
            onClick={() => setBeyondOpen(!beyondOpen)}
          >
            <div>
              <p className="text-[#F5F5F5] font-semibold">What I Learned Beyond the Classroom</p>
              <p className="text-[#525252] text-sm mt-0.5">The lessons no syllabus contains</p>
            </div>
            <motion.div animate={{ rotate: beyondOpen ? 180 : 0 }} className="text-[#F59E0B]">
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </button>

          <AnimatePresence>
            {beyondOpen && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                transition={{ duration: 0.4 }}
                style={{ overflow: "hidden" }}
              >
                <div className="grid sm:grid-cols-2 gap-4 p-6 pt-0 border-t border-[#1a1a1a]">
                  {BEYOND.map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex gap-3 p-4 rounded-xl bg-[#0a0a0a] border border-[#1a1a1a]"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 }}
                    >
                      <span className="text-2xl shrink-0">{item.icon}</span>
                      <div>
                        <p className="text-[#F5F5F5] font-semibold text-sm mb-1">{item.title}</p>
                        <p className="text-[#525252] text-xs leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
