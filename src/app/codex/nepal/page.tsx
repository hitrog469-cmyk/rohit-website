"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/ui/Footer";
import CipherLock from "@/components/ui/CipherLock";

const INFRASTRUCTURE_GAPS = [
  { issue: "Bridge Maintenance", stat: "~3,000", unit: "bridges with no SHM system", severity: 0.9, color: "#EF4444" },
  { issue: "Road Quality Index", stat: "43%", unit: "of SRN roads in poor condition (2023)", severity: 0.75, color: "#F59E0B" },
  { issue: "Earthquake Vulnerability", stat: "60%+", unit: "Kathmandu buildings pre-1988 code", severity: 0.95, color: "#EF4444" },
  { issue: "Flood-Prone Zones", stat: "2M+", unit: "people in high-risk flood corridors", severity: 0.8, color: "#F97316" },
  { issue: "Engineers per capita", stat: "0.4", unit: "civil engineers per 1000 people (vs India 1.2)", severity: 0.6, color: "#8B5CF6" },
];

const MEMORIES = [
  { place: "Bagmati River, 2015", note: "The river I grew up near was a sewer. Then the cleanup campaign started — 3000+ volunteers, every weekend. 8 years later, kingfishers are back.", icon: "〰" },
  { place: "Thapathali Bridge", note: "The bridge I crossed every day to school. Built 1967, no sensors, no SHM. It just holds. The hope terrifies me as an engineer now.", icon: "⬡" },
  { place: "Dharahara, 2015", note: "The tower fell in 15 seconds. 180 lives. I was in class when the 7.8 hit. The ground moved, the buildings didn't — ours were lucky. Others weren't.", icon: "◈" },
  { place: "NIT Rourkela, 2021", note: "Left Nepal, landed in Odisha. First time realizing how far behind Nepal's engineering education was — and how much we needed builders who also coded.", icon: "◉" },
];

const WHAT_NEPAL_NEEDS = [
  { need: "Structural Health Monitoring", why: "Real-time sensor networks on critical bridges. Costs less than one bridge reconstruction. Saves lives before collapse.", tag: "SHM" },
  { need: "Engineers Who Code", why: "FEM + Python. Automation of parametric studies. Data pipelines for site monitoring. This combination doesn't exist enough in Nepal.", tag: "Tech" },
  { need: "Open Data Infrastructure", why: "Geological survey data, flood models, bridge inspection records — all siloed in government PDFs. We need APIs.", tag: "Data" },
  { need: "Post-Earthquake Code Enforcement", why: "Nepal updated its building code after 2015. Enforcement is the problem. Software tools that help inspectors verify compliance at scale.", tag: "Compliance" },
];

export default function NepalFiles() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {!unlocked ? (
        <motion.div key="lock" exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.4 }}>
          <CipherLock
            chamberCode="03"
            chamberName="THE NEPAL FILES"
            question="What is the name of the world's highest peak, located in Nepal?"
            hint="8,848.86 meters above sea level"
            correctAnswers={["everest", "mount everest", "mt everest", "sagarmatha", "chomolungma", "qomolangma", "8848", "8849", "8848.86"]}
            extraEggs={{
              nepal: "HOME COUNTRY RECOGNIZED. GRANTED.",
              kathmandu: "CAPITAL CITY INVOKED. GRANTED.",
              himalaya: "MOUNTAIN RANGE IDENTIFIED. GRANTED.",
              namaste: "NEPALI GREETING DETECTED. नमस्ते। GRANTED.",
              tharu: "INDIGENOUS WISDOM. GRANTED.",
              bagmati: "RIVER OF KATHMANDU. GRANTED.",
              dharahara: "2015 EARTHQUAKE MEMORIAL. SOLEMN GRANT.",
              "2015": "GORKHA EARTHQUAKE. WE REMEMBER. GRANTED.",
            }}
            onUnlock={() => setUnlocked(true)}
          />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <main className="min-h-screen bg-[#050505]">
            <Navigation />

            <div className="max-w-4xl mx-auto px-6 pt-28 pb-24">
              <Link href="/codex" className="inline-flex items-center gap-2 text-[#525252] hover:text-[#10B981] text-sm font-mono transition-colors mb-10">
                ← Back to Codex
              </Link>

              <div className="mb-14">
                <span className="text-[#10B981] text-[10px] font-mono tracking-[0.5em]">CHAMBER 03 — UNLOCKED</span>
                <h1 className="text-[#F5F5F5] font-black mt-3 mb-4" style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}>
                  The Nepal <span className="text-[#10B981]">Files</span>
                </h1>
                <p className="text-[#525252] text-base leading-relaxed max-w-2xl">
                  Growing up in Kathmandu as someone who would become a structural engineer. The infrastructure gaps that shaped my worldview, and what I think Nepal actually needs from its engineers.
                </p>
                <div className="h-px bg-gradient-to-r from-[#10B981]/40 via-[#10B981]/10 to-transparent mt-6" />
              </div>

              {/* Memory cards */}
              <section className="mb-16">
                <h2 className="text-[#F5F5F5] text-xl font-bold mb-6 flex items-center gap-3">
                  <span className="text-[#10B981] font-mono text-sm">01.</span> Places That Made Me
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {MEMORIES.map((m, i) => (
                    <motion.div
                      key={m.place}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] p-5 relative overflow-hidden"
                    >
                      <div className="absolute top-3 right-4 text-3xl text-[#10B981]/10 font-mono">{m.icon}</div>
                      <div className="text-[#10B981] text-xs font-mono mb-3">{m.place}</div>
                      <p className="text-[#525252] text-xs leading-relaxed">{m.note}</p>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Infrastructure gaps */}
              <section className="mb-16">
                <h2 className="text-[#F5F5F5] text-xl font-bold mb-2 flex items-center gap-3">
                  <span className="text-[#10B981] font-mono text-sm">02.</span> The Infrastructure Reality
                </h2>
                <p className="text-[#525252] text-sm mb-6">Numbers I find myself thinking about at 2am.</p>

                <div className="rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] p-6 space-y-5">
                  {INFRASTRUCTURE_GAPS.map((g, i) => (
                    <motion.div
                      key={g.issue}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-[#A3A3A3]">{g.issue}</span>
                        <span style={{ color: g.color }} className="font-bold">{g.stat} <span className="font-normal text-[#444]">{g.unit}</span></span>
                      </div>
                      <div className="h-1.5 bg-[#111] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${g.severity * 100}%` }}
                          transition={{ delay: i * 0.1 + 0.4, duration: 0.8, ease: "easeOut" }}
                          className="h-full rounded-full"
                          style={{ background: g.color }}
                        />
                      </div>
                    </motion.div>
                  ))}
                  <p className="text-[#222] text-[10px] font-mono pt-2">* compiled from DoR Nepal, DUDBC reports, and World Bank Nepal infrastructure assessments</p>
                </div>
              </section>

              {/* The Bagmati section */}
              <section className="mb-16">
                <h2 className="text-[#F5F5F5] text-xl font-bold mb-6 flex items-center gap-3">
                  <span className="text-[#10B981] font-mono text-sm">03.</span> The Bagmati: A Story About Possibility
                </h2>
                <div className="rounded-xl border border-[#10B981]/20 bg-[#0a0a0a] p-6 space-y-4">
                  <p className="text-[#A3A3A3] text-sm leading-relaxed">
                    The Bagmati River runs through Kathmandu. For decades, it was the city&apos;s open sewer — black water, solid waste, zero aquatic life. Sacred river reduced to drainage.
                  </p>
                  <p className="text-[#A3A3A3] text-sm leading-relaxed">
                    In 2012, a cleanup campaign started. Not government-led. Community-led. Every Saturday morning, thousands of volunteers. No tech, no funding, just people with gloves and the idea that their river could be sacred again.
                  </p>
                  <p className="text-[#F5F5F5] text-sm leading-relaxed font-semibold">
                    Ten years later: water quality improved by 60%. Fish returned. Kingfishers nesting on the banks. The river isn&apos;t fully restored — but it&apos;s alive.
                  </p>
                  <p className="text-[#525252] text-sm leading-relaxed">
                    What the Bagmati taught me: the biggest infrastructure problems in Nepal aren&apos;t technical. They&apos;re organizational. The technical solutions exist. What we lack is systematic application, data infrastructure, and engineers who can bridge the gap between research and community action.
                  </p>
                </div>
              </section>

              {/* What Nepal needs */}
              <section className="mb-16">
                <h2 className="text-[#F5F5F5] text-xl font-bold mb-6 flex items-center gap-3">
                  <span className="text-[#10B981] font-mono text-sm">04.</span> What Nepal&apos;s Engineering Needs
                </h2>
                <div className="space-y-4">
                  {WHAT_NEPAL_NEEDS.map((item, i) => (
                    <motion.div
                      key={item.need}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-4 p-5 rounded-xl border border-[#1a1a1a] bg-[#0a0a0a]"
                    >
                      <span className="text-[#10B981] text-xs font-mono border border-[#10B981]/30 px-2 py-1 rounded h-fit shrink-0">{item.tag}</span>
                      <div>
                        <h4 className="text-[#F5F5F5] font-bold text-sm mb-1">{item.need}</h4>
                        <p className="text-[#525252] text-xs leading-relaxed">{item.why}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Closing reflection */}
              <section className="mb-16">
                <div className="rounded-xl border border-[#10B981]/15 bg-[#10B981]/5 p-6">
                  <p className="text-[#A3A3A3] text-sm leading-relaxed">
                    I left Nepal to study structural engineering in Rourkela. I&apos;ll go back with tools Nepal doesn&apos;t have yet: FEM automation, SHM system design experience, and the ability to build the software that makes structural data actually usable by the people who need it.
                  </p>
                  <p className="text-[#F5F5F5] text-sm font-semibold mt-4">
                    That&apos;s not a plan. That&apos;s a debt I owe the country that made me.
                  </p>
                  <p className="text-[#10B981] font-mono text-sm mt-4">— Rohit Acharya, Kathmandu native, structural engineer in training.</p>
                </div>
              </section>

              <div className="border-t border-[#1a1a1a] pt-10 text-center">
                <p className="text-[#333] font-mono text-xs">— Chamber 03 complete · नेपाल जिन्दाबाद · हर हर महादेव</p>
                <Link href="/codex" className="inline-flex items-center gap-2 text-[#10B981] text-sm font-mono mt-4 hover:gap-3 transition-all">
                  ← Return to Codex
                </Link>
              </div>
            </div>

            <Footer />
          </main>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
