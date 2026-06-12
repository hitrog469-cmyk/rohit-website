"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/ui/Footer";
import CipherLock from "@/components/ui/CipherLock";

const BATTING_METRICS = [
  { player: "V. Kohli", impact: 94, avg: 36.2, sr: 131, color: "#F59E0B" },
  { player: "R. Sharma", impact: 88, avg: 31.5, sr: 137, color: "#3B82F6" },
  { player: "S. Gill", impact: 85, avg: 38.1, sr: 148, color: "#10B981" },
  { player: "K.L. Rahul", impact: 79, avg: 34.8, sr: 136, color: "#8B5CF6" },
  { player: "D. Padikkal", impact: 72, avg: 28.3, sr: 143, color: "#F97316" },
];

const PHASES = [
  { name: "Powerplay", overs: "1–6", focus: "Strike rate matters most. Top order dominates here.", weight: 0.35 },
  { name: "Middle Overs", overs: "7–15", focus: "Partnership building + acceleration. Rotation vs boundary balance.", weight: 0.4 },
  { name: "Death", overs: "16–20", focus: "Pure explosiveness. Finisher impact is highest per-ball here.", weight: 0.25 },
];

const MODEL_FEATURES = [
  "Team batting average (last 5 matches)",
  "Venue-specific run rate deviation",
  "Toss result × venue advantage",
  "Head-to-head win rate (last 3 years)",
  "Top-3 batters' form index",
  "Bowling economy (powerplay + death)",
  "Weather index (pitch + humidity proxy)",
  "Home crowd advantage coefficient",
];

export default function CricketCodex() {
  const [unlocked, setUnlocked] = useState(false);
  const [activePhase, setActivePhase] = useState(0);

  return (
    <AnimatePresence mode="wait">
      {!unlocked ? (
        <motion.div key="lock" exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.4 }}>
          <CipherLock
            chamberCode="02"
            chamberName="THE CRICKET CODEX"
            question="How many wickets must fall to end an innings in cricket?"
            hint="maximum wickets possible in one innings"
            correctAnswers={["10", "ten"]}
            extraEggs={{
              cricket: "DOMAIN KNOWLEDGE CONFIRMED. GRANTED.",
              ipl: "IPL INSIDER DETECTED. WELCOME.",
              virat: "KING KOHLI INVOKED. GRANTED.",
              dhoni: "CAPTAIN COOL RECOGNIZED. GRANTED.",
              rohit: "HITMAN INVOKED. GRANTED.",
              six: "MAXIMUM. GRANTED.",
              four: "BOUNDARY. CLOSE ENOUGH. GRANTED.",
              yorker: "LETHAL DELIVERY. ACCESS GRANTED.",
              innings: "CORRECT CONTEXT. GRANTED.",
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
              <Link href="/codex" className="inline-flex items-center gap-2 text-[#525252] hover:text-[#3B82F6] text-sm font-mono transition-colors mb-10">
                ← Back to Codex
              </Link>

              <div className="mb-14">
                <span className="text-[#3B82F6] text-[10px] font-mono tracking-[0.5em]">CHAMBER 02 — UNLOCKED</span>
                <h1 className="text-[#F5F5F5] font-black mt-3 mb-4" style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}>
                  The Cricket <span className="text-[#3B82F6]">Codex</span>
                </h1>
                <p className="text-[#525252] text-base leading-relaxed max-w-2xl">
                  How I stopped watching cricket with vibes and started watching it with data. IPL analytics, a match prediction model, and why XGBoost explains T20 better than commentators do.
                </p>
                <div className="h-px bg-gradient-to-r from-[#3B82F6]/40 via-[#3B82F6]/10 to-transparent mt-6" />
              </div>

              {/* Phase analysis */}
              <section className="mb-16">
                <h2 className="text-[#F5F5F5] text-xl font-bold mb-2 flex items-center gap-3">
                  <span className="text-[#3B82F6] font-mono text-sm">01.</span> Phase-Weighted Impact Framework
                </h2>
                <p className="text-[#525252] text-sm mb-6">Not all overs are equal. I weight player contributions by match phase.</p>

                <div className="flex gap-3 mb-6">
                  {PHASES.map((p, i) => (
                    <button
                      key={p.name}
                      onClick={() => setActivePhase(i)}
                      className="flex-1 rounded-xl border p-4 text-left transition-all duration-300"
                      style={{
                        borderColor: activePhase === i ? "#3B82F680" : "#1a1a1a",
                        background: activePhase === i ? "#3B82F610" : "#0a0a0a",
                      }}
                    >
                      <div className="text-[#3B82F6] text-xs font-mono mb-1">{p.overs}</div>
                      <div className="text-[#F5F5F5] text-sm font-bold">{p.name}</div>
                      <div className="text-[#F59E0B] text-xs font-mono mt-2">weight: {p.weight}</div>
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePhase}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] p-5"
                  >
                    <p className="text-[#A3A3A3] text-sm">{PHASES[activePhase].focus}</p>
                    <div className="mt-3 text-xs font-mono text-[#333]">
                      Impact contribution = runs × {PHASES[activePhase].weight} × (SR/100) × wicket_penalty_factor
                    </div>
                  </motion.div>
                </AnimatePresence>
              </section>

              {/* Batting impact scores */}
              <section className="mb-16">
                <h2 className="text-[#F5F5F5] text-xl font-bold mb-2 flex items-center gap-3">
                  <span className="text-[#3B82F6] font-mono text-sm">02.</span> Batting Impact Scores (IPL 2024 Sample)
                </h2>
                <p className="text-[#525252] text-sm mb-6">Custom metric: weighted average × strike rate coefficient × phase contribution.</p>

                <div className="rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] p-6 space-y-4">
                  {BATTING_METRICS.map((batter, i) => (
                    <motion.div
                      key={batter.player}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                        <span className="text-[#A3A3A3]">{batter.player}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-[#444]">avg {batter.avg}</span>
                          <span className="text-[#444]">sr {batter.sr}</span>
                          <span style={{ color: batter.color }} className="font-bold">impact {batter.impact}</span>
                        </div>
                      </div>
                      <div className="h-1.5 bg-[#111] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${batter.impact}%` }}
                          transition={{ delay: i * 0.1 + 0.3, duration: 0.8, ease: "easeOut" }}
                          className="h-full rounded-full"
                          style={{ background: batter.color }}
                        />
                      </div>
                    </motion.div>
                  ))}
                  <p className="text-[#222] text-[10px] font-mono pt-2">* illustrative sample — real model uses full IPL dataset</p>
                </div>
              </section>

              {/* XGBoost model */}
              <section className="mb-16">
                <h2 className="text-[#F5F5F5] text-xl font-bold mb-6 flex items-center gap-3">
                  <span className="text-[#3B82F6] font-mono text-sm">03.</span> The Match Prediction Model
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] p-5">
                    <h4 className="text-[#F5F5F5] font-bold mb-4 text-sm">Model Architecture</h4>
                    <div className="space-y-2 font-mono text-xs">
                      <div className="flex justify-between text-[#444]"><span>Algorithm</span><span className="text-[#3B82F6]">XGBoost Classifier</span></div>
                      <div className="flex justify-between text-[#444]"><span>Training Data</span><span className="text-[#3B82F6]">IPL 2013–2023</span></div>
                      <div className="flex justify-between text-[#444]"><span>Features</span><span className="text-[#3B82F6]">8 engineered</span></div>
                      <div className="flex justify-between text-[#444]"><span>Validation</span><span className="text-[#3B82F6]">IPL 2024</span></div>
                      <div className="flex justify-between text-[#444]"><span>Accuracy</span><span className="text-[#10B981] font-bold">67.3%</span></div>
                      <div className="flex justify-between text-[#444]"><span>Baseline (coin flip)</span><span className="text-[#525252]">50.0%</span></div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] p-5">
                    <h4 className="text-[#F5F5F5] font-bold mb-4 text-sm">Feature Importance</h4>
                    <div className="space-y-2">
                      {MODEL_FEATURES.slice(0, 5).map((f, i) => (
                        <div key={f} className="flex items-center gap-3 text-xs font-mono">
                          <span className="text-[#3B82F6]/50 w-5">#{i + 1}</span>
                          <div className="flex-1 h-1.5 bg-[#111] rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${100 - i * 15}%` }}
                              transition={{ delay: i * 0.08 + 0.3, duration: 0.6 }}
                              className="h-full bg-[#3B82F6] rounded-full"
                            />
                          </div>
                          <span className="text-[#444] w-40 truncate text-right">{f.split("(")[0].trim()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Philosophy */}
              <section className="mb-16">
                <h2 className="text-[#F5F5F5] text-xl font-bold mb-6 flex items-center gap-3">
                  <span className="text-[#3B82F6] font-mono text-sm">04.</span> How Data Changed Everything
                </h2>
                <div className="space-y-4 text-[#525252] text-sm leading-relaxed">
                  <p>Before the data: I watched cricket like everyone else — vibes, nostalgia, who looked confident at the crease. Kohli was king because he <em>felt</em> like king.</p>
                  <p>After the data: I watch pressure indices, phase-adjusted contributions, and venue-specific wicket correlations. Kohli is still king — but now I can quantify exactly why he&rsquo;s 40% more impactful in pressure chases than his aggregate numbers suggest.</p>
                  <p className="text-[#F5F5F5] font-semibold">The model taught me something the game already knew: in T20 cricket, death bowling is undervalued and powerplay wickets are overvalued by casual fans. The data says the middle overs — boring, overlooked — decide 40% of outcomes.</p>
                  <p>Same is true in structural engineering. The critical failure modes aren&rsquo;t always the dramatic ones. FG-GRC plates don&rsquo;t fail at the surface — they fail when the middle-layer distribution breaks down. The boring middle matters everywhere.</p>
                </div>
              </section>

              <div className="border-t border-[#1a1a1a] pt-10 text-center">
                <p className="text-[#333] font-mono text-xs">— Chamber 02 complete · bat straight · हर हर महादेव</p>
                <Link href="/codex" className="inline-flex items-center gap-2 text-[#3B82F6] text-sm font-mono mt-4 hover:gap-3 transition-all">
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
