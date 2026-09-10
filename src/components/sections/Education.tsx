"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { GraduationCap, BookOpen, Award, ChevronDown } from "lucide-react";

const COURSES = [
  "Construction Planning and Scheduling",
  "Transportation Engineering",
  "Highway Engineering Laboratory",
  "Finite Element Method",
  "Advanced Structural Analysis",
  "Mechanics of Solids",
  "Reinforced Concrete Design",
  "Foundation Engineering",
  "Numerical Analysis",
  "Fluid Mechanics",
  "Composite Materials",
];

const HONOURS = [
  { title: "National Astronomy Olympiad, Nepal", detail: "Finalist. Selected through the national rounds while in the science stream.", year: "" },
  { title: "COMPEX Scholarship", detail: "Government of India scholarship for Nepali students, awarded by national competitive examination.", year: "2021" },
  { title: "Aspire Institute Leadership Program Scholar", detail: "Selected for a competitive global leadership programme on decision making, social impact and cross cultural collaboration.", year: "2024" },
  { title: "District Topper, Baglung", detail: "Ranked among the highest performing students in the district in the Secondary Education Examination, GPA 3.95 / 4.0.", year: "2018" },
  { title: "Academic Distinction, Higher Secondary", detail: "CGPA 3.85 / 4.0 with A grades in physics, chemistry, maths and computer science.", year: "2020" },
];

const SERVICE = [
  { role: "Student Mentor", org: "Institute Counselling Services, NIT Rourkela", when: "2023 to 2025", detail: "Academic, personal and career guidance to junior students through the institute peer support programme." },
  { role: "Founder and Lead Educator", org: "Learners Club", when: "2020 to 2024", detail: "Free STEM education platform started during COVID for school students in Nepal. Physics, chemistry and maths, 300 videos, 20,000+ views." },
  { role: "Program Coordinator", org: "SDG Campus Club, NIT Rourkela", when: "2022 to 2025", detail: "Sustainability focused campus activities aligned with the UN Sustainable Development Goals. Event planning, logistics, outreach." },
  { role: "Class and Branch Representative", org: "Civil Engineering, NIT Rourkela", when: "2021 to 2025", detail: "Elected representative between the cohort and the department. Also played inter collegiate football for the institute." },
  { role: "Student Member", org: "American Society of Civil Engineers", when: "2021 to 2024", detail: "ASCE student membership through the undergraduate years." },
];

const CERTS = [
  "Python for Data Science, AI and Development, IBM",
  "Foundations: Data, Data, Everywhere, Google",
  "Introduction to Thermodynamics",
  "AWS S3 Basics",
];

const BEYOND = [
  { icon: "◈", title: "Reading a room full of stakeholders", desc: "Class representative, branch representative, counselling mentor. Three years of sitting between students who wanted something and faculty who had reasons to say no. That turns out to be most of what project work is." },
  { icon: "◎", title: "Working in a language that was not mine", desc: "I arrived in Rourkela from Nepal knowing no Odia and very little Hindi. Coursework, labs and group projects all happened anyway. I learned to ask better questions when I could not lean on fluency." },
  { icon: "▶", title: "Teaching as the real test", desc: "Tutored juniors, and made 300 videos for Learners Club during lockdown. If a concept survives being explained to a distracted sixteen year old, you understand it. Most of mine did not survive the first attempt." },
  { icon: "▲", title: "Finishing things that stop being interesting", desc: "A parametric campaign is exciting for about the first twenty runs. The remaining ones still have to be set up, checked and logged. Research is mostly this part." },
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
            Baglung to <span className="text-[#F59E0B]">Rourkela</span>
          </h2>
          <p className="text-[#525252] mt-3 text-base max-w-xl leading-relaxed">
            Three schools, two countries, one scholarship exam that decided the rest of it.
          </p>
        </motion.div>

        {/* Row 1: the school years, in order */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Garima, Baglung */}
          <motion.div
            className="rounded-2xl p-7"
            style={{ background: "var(--bg-ink)", border: "1px solid var(--border-default)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
            whileHover={{ borderColor: "#333" }}
          >
            <div className="flex items-start gap-4 mb-5">
              <div className="w-11 h-11 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/20 flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5 text-[#F59E0B]" />
              </div>
              <div>
                <h3 className="text-[#F5F5F5] font-bold text-lg leading-snug">Garima Awasiya Secondary School</h3>
                <p className="text-[#A3A3A3] text-sm">School education, up to Grade 10</p>
                <p className="text-[#525252] text-xs font-mono mt-0.5">Baglung, Nepal</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20">
                SEE, National Board
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#1a1a1a] text-[#525252] border border-[#222]">
                Until 2018
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#F59E0B]/5 border border-[#F59E0B]/15 mb-4">
              <p className="text-[#F5F5F5] font-bold text-lg">GPA 3.95 / 4.0</p>
              <p className="text-[#F59E0B] text-xs mt-0.5 font-medium">District Topper, Baglung</p>
            </div>

            <p className="text-[#A3A3A3] text-sm leading-relaxed">
              A hill district in western Nepal, in sight of Dhaulagiri. Everything after this
              involved leaving somewhere.
            </p>
          </motion.div>

          {/* Kathmandu Bernhardt */}
          <motion.div
            className="rounded-2xl p-7"
            style={{ background: "var(--bg-ink)", border: "1px solid var(--border-default)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            whileHover={{ borderColor: "#333" }}
          >
            <div className="flex items-start gap-4 mb-5">
              <div className="w-11 h-11 rounded-xl bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5 text-[#3B82F6]" />
              </div>
              <div>
                <h3 className="text-[#F5F5F5] font-bold text-lg leading-snug">Kathmandu Bernhardt Secondary School</h3>
                <p className="text-[#A3A3A3] text-sm">Higher secondary, science stream</p>
                <p className="text-[#525252] text-xs font-mono mt-0.5">Balkhu, Kathmandu, Nepal</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/20">
                NEB, Physics Chemistry Maths
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#1a1a1a] text-[#525252] border border-[#222]">
                2018 to 2020
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#3B82F6]/5 border border-[#3B82F6]/10 mb-4">
              <p className="text-[#F5F5F5] font-bold text-lg">CGPA 3.85 / 4.0</p>
              <p className="text-[#525252] text-xs mt-0.5">A grades in physics, chemistry, maths and computer science</p>
            </div>

            <p className="text-[#A3A3A3] text-sm leading-relaxed">
              Left Baglung for Kathmandu after Grade 10 to take the science stream. First time
              living away from home, in a city I barely knew.
            </p>
          </motion.div>
        </div>

        {/* Row 2: NIT Rourkela */}
        <motion.div
          className="rounded-2xl relative overflow-hidden mb-16"
          style={{
            background: "linear-gradient(135deg, var(--bg-elevated) 0%, var(--bg-surface) 100%)",
            border: "1px solid rgba(245,158,11,0.2)",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
          whileHover={{ borderColor: "rgba(245,158,11,0.45)" }}
        >
          <div className="absolute top-1/2 right-6 -translate-y-1/2 text-[150px] font-black opacity-[0.025] select-none pointer-events-none text-[#F59E0B]">
            NIT
          </div>

          <div className="p-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
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

                <div className="flex flex-wrap gap-2 mb-5">
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20">
                    B.Tech Civil Engineering
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#1a1a1a] text-[#525252] border border-[#222]">
                    2021 – 2025
                  </span>
                </div>

                <div className="flex items-start gap-3 mb-4 p-4 rounded-xl bg-[#10B981]/5 border border-[#10B981]/20">
                  <Award className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[#F5F5F5] font-semibold text-sm">COMPEX Scholarship</p>
                    <p className="text-[#525252] text-xs mt-0.5 leading-relaxed">
                      Government of India scholarship for Nepali students, awarded through a
                      national competitive examination. It is the reason I studied in India.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-xl bg-[#0a0a0a] border border-[#1a1a1a]">
                  <Award className="w-5 h-5 text-[#F59E0B] shrink-0" />
                  <div>
                    <p className="text-[#F5F5F5] font-bold text-lg">CGPA 7.96 / 10.0</p>
                    <p className="text-[#525252] text-xs">Cumulative grade point average</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="p-4 rounded-xl border border-[#F59E0B]/15 bg-[#F59E0B]/5 mb-5">
                  <p className="text-[10px] font-mono text-[#F59E0B] tracking-widest uppercase mb-1.5">Thesis</p>
                  <p className="text-[#F5F5F5] text-sm font-medium leading-snug">
                    Buckling Performance Evaluation of Functionally Graded Graphene Reinforced
                    Composite Plates under Thermal-Mechanical Loads
                  </p>
                  <p className="text-[#525252] text-xs mt-2">
                    Supervisor: Prof. Shishir Kumar Sahu, Department of Civil Engineering
                  </p>
                </div>

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
          </div>
        </motion.div>

        {/* Honours and service */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <motion.div
            className="rounded-2xl p-7"
            style={{ background: "var(--bg-ink)", border: "1px solid var(--border-default)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            <div className="flex items-center gap-2.5 mb-5">
              <Award className="w-5 h-5 text-[#F59E0B]" />
              <h3 className="text-[#F5F5F5] font-bold text-lg">Honours</h3>
            </div>
            <div className="space-y-4">
              {HONOURS.map((h) => (
                <div key={h.title} className="border-l-2 border-[#F59E0B]/25 pl-4">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="text-[#F5F5F5] text-sm font-semibold leading-snug">{h.title}</p>
                    {h.year && (
                      <span className="text-[10px] font-mono text-[#525252] shrink-0">{h.year}</span>
                    )}
                  </div>
                  <p className="text-[#525252] text-xs leading-relaxed mt-1">{h.detail}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="rounded-2xl p-7"
            style={{ background: "var(--bg-ink)", border: "1px solid var(--border-default)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45, duration: 0.6 }}
          >
            <div className="flex items-center gap-2.5 mb-5">
              <BookOpen className="w-5 h-5 text-[#3B82F6]" />
              <h3 className="text-[#F5F5F5] font-bold text-lg">Leadership and service</h3>
            </div>
            <div className="space-y-4">
              {SERVICE.map((v) => (
                <div key={v.role} className="border-l-2 border-[#3B82F6]/25 pl-4">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="text-[#F5F5F5] text-sm font-semibold leading-snug">{v.role}</p>
                    <span className="text-[10px] font-mono text-[#525252] shrink-0">{v.when}</span>
                  </div>
                  <p className="text-[#A3A3A3] text-xs mt-0.5">{v.org}</p>
                  <p className="text-[#525252] text-xs leading-relaxed mt-1">{v.detail}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="rounded-2xl p-6 mb-16"
          style={{ background: "var(--bg-ink)", border: "1px solid var(--border-default)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <p className="text-[#525252] text-xs font-mono tracking-wider uppercase mb-3">Certifications</p>
          <div className="flex flex-wrap gap-2">
            {CERTS.map((c) => (
              <span key={c} className="text-[10px] px-2.5 py-1 rounded bg-[#1a1a1a] text-[#A3A3A3] border border-[#222]">
                {c}
              </span>
            ))}
          </div>
        </motion.div>

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
              <p className="text-[#F5F5F5] font-semibold">What the degree taught me that the transcript does not show</p>
              <p className="text-[#525252] text-sm mt-0.5">Four things, honestly held</p>
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
