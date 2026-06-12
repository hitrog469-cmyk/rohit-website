"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/ui/Footer";

const FAILURES = [
  {
    id: "tacoma",
    name: "Tacoma Narrows Bridge",
    year: 1940,
    location: "Washington, USA",
    type: "Suspension Bridge",
    cause: "Aeroelastic flutter",
    severity: "Collapse",
    color: "#EF4444",
    icon: "∿",
    summary: "The third-longest suspension bridge in the world at the time, it collapsed into Puget Sound just four months after opening. No one died (except a dog). The footage is legendary.",
    what_happened: [
      "The bridge was designed with solid plate girders for the stiffening trusses — elegant but aerodynamically problematic.",
      "In 40mph winds, the deck began twisting in a torsional oscillation. Wind was not pushing it down — wind was feeding energy into the natural resonant frequency of the bridge.",
      "The twisting motion created alternating vortices on the lee side of the deck (vortex shedding). These vortices synchronized with the bridge's natural torsional frequency.",
      "Once synchronized, each oscillation added energy to the system instead of dissipating it. Classic resonance.",
      "After 3 hours of violent twisting, a 183-metre section fell. The rest followed within the hour.",
    ],
    mechanism: "Aeroelastic flutter. Not resonance with wind frequency (a common misconception) — the bridge's motion itself created the aerodynamic forces that fed back into the motion. A self-reinforcing instability.",
    lesson: "Wind tunnel testing is now mandatory for long-span bridge design. Modern suspension bridges use open truss decks (not solid plates) and aerodynamic profiling. The deck of the Forth Road Bridge has been shaped specifically to prevent flutter.",
    misconception: "Most people think soldiers marching in step caused the collapse (that's Broughton Suspension Bridge, 1831). The Tacoma Narrows failure was aeroelastic flutter, not mechanical resonance with marching frequency.",
    rohit_note: "This is why aerodynamic analysis is now as important as structural analysis for long-span bridges. As a structural engineer, your loads come not just from gravity — they come from the shape of your structure interacting with the environment.",
    tags: ["Dynamics", "Aeroelasticity", "Wind Engineering", "Suspension Bridge"],
  },
  {
    id: "ronan",
    name: "Ronan Point",
    year: 1968,
    location: "London, UK",
    type: "Precast Concrete Tower Block",
    cause: "Progressive collapse",
    severity: "Partial collapse — 4 deaths",
    color: "#F97316",
    icon: "◫",
    summary: "A gas explosion in an 18th-floor flat blew out a load-bearing corner panel. The floor above lost support and collapsed onto the floor below. Each floor collapse triggered the next. A 23-storey building lost its entire southeast corner.",
    what_happened: [
      "The building used 'large panel system' (LPS) construction — precast concrete panels stacked and connected by mortar joints.",
      "A resident on the 18th floor connected a faulty gas fitting. An explosion of approximately 14 psi (just 1 bar) blew out the external wall panel.",
      "The floor above, now unsupported at one corner, collapsed. Its impact load on the floor below far exceeded what the joint connections could transfer.",
      "The connections failed in sequence — progressive collapse — down to the ground. The section above the explosion also fell as its support was removed from below.",
    ],
    mechanism: "Lack of structural continuity. The LPS system had no tie forces connecting elements together — no 'alternative load path'. When one element failed, there was no mechanism to redistribute load and the collapse propagated.",
    lesson: "Building codes now mandate 'tie force' requirements for robustness — steel reinforcement that threads through connections to create continuity. The idea: if one element fails, the structure should be able to 'hang' or 'bridge over' the failure without progressive collapse.",
    misconception: "People assume tall buildings collapse from the top when a lower floor fails. Ronan Point showed the opposite — collapse can go both up and down from the failure point, depending on load path and connection integrity.",
    rohit_note: "Progressive collapse design is particularly relevant for Nepal, where LPS-type construction using precast elements is common. The 2015 earthquake caused progressive collapse in several buildings that were not designed for robustness — not directly for seismic loads, but for alternative load paths.",
    tags: ["Progressive Collapse", "Robustness", "Precast Concrete", "Tie Forces"],
  },
  {
    id: "dharahara",
    name: "Dharahara Tower",
    year: 2015,
    location: "Kathmandu, Nepal",
    type: "Masonry Tower",
    cause: "Seismic excitation — torsional and bending failure",
    severity: "Complete collapse — 180+ deaths",
    color: "#8B5CF6",
    icon: "◈",
    summary: "The 19th-century nine-storey octagonal masonry tower collapsed in the 7.8 Mw Gorkha earthquake on April 25, 2015. I was in class when it happened. 180 people died, including tourists who had climbed it minutes before.",
    what_happened: [
      "The original Dharahara (1832) was partially destroyed in the 1934 Nepal-Bihar earthquake. The rebuilt tower (1935) was 62m tall — nine storeys of unreinforced brick masonry.",
      "Unreinforced masonry (URM) has virtually zero tensile capacity. Under lateral seismic forces, the mortar-brick interface fails in tension on the side being pulled.",
      "Octagonal towers are particularly vulnerable to torsional response — the irregular geometry concentrates stress at corners under lateral shaking.",
      "The ground motion from the 7.8 event contained long-period energy that matched the natural frequency of the tall, flexible tower.",
      "The tower fell in approximately 15 seconds. By the time the main shaking ended, it was rubble.",
    ],
    mechanism: "Unreinforced masonry failure under cyclic lateral loading. No ductility — no ability to deform and absorb energy. Combined with torsional amplification from the octagonal plan and height-to-width slenderness ratio exceeding safe limits for URM.",
    lesson: "Heritage masonry structures in seismic zones require seismic assessment and, where feasible, retrofitting. Options include: steel or FRP jacketing, internal reinforced concrete core insertion, base isolation for particularly valuable structures.",
    misconception: "The earthquake didn't 'destroy' Dharahara in the sense that it was unavoidable. The 1934 earthquake destroyed a similar tower. Engineers knew URM was seismically vulnerable. The failure was predicted by structural analysis — the question was always when, not if.",
    rohit_note: "I was in school that day. We evacuated onto the football ground. The buildings around us cracked but held — they were designed post-1994. Dharahara was built in 1935 to a colonial-era design with no seismic provision. The tragedy is that we knew, and the retrofit was repeatedly postponed. The new Dharahara (reopened 2021) has a concrete core. It will survive the next earthquake.",
    tags: ["Seismic", "Masonry", "Heritage", "Nepal", "Progressive Collapse"],
  },
  {
    id: "minneapolis",
    name: "I-35W Mississippi River Bridge",
    year: 2007,
    location: "Minneapolis, USA",
    type: "Deck truss bridge",
    cause: "Gusset plate undersized — design error",
    severity: "Collapse — 13 deaths",
    color: "#3B82F6",
    icon: "△",
    summary: "A critical gusset plate at the bridge's central span failed during rush hour, triggering the collapse of 300 metres of a heavily-used interstate bridge. The design error had been present since the bridge was built in 1967.",
    what_happened: [
      "The original 1967 design drawings specified a 1/2-inch (12.7mm) gusset plate at a critical node near the south end of the main span.",
      "Post-collapse analysis by NTSB showed the design calculation was incorrect — the required thickness was 1 inch (25.4mm).",
      "For 40 years, the undersized plates were loaded incrementally as the bridge was modified, resurfaced, and loaded with construction equipment.",
      "On August 1, 2007, during peak hour, with construction equipment and personnel on the bridge, the gusset plates at node U10 buckled and failed.",
      "The deck fell 30+ metres into the Mississippi River in 5 seconds.",
    ],
    mechanism: "Compressive buckling of undersized gusset plates at a critical node. The plates were so undersized that they failed before yielding — brittle compressive failure without warning.",
    lesson: "Bridge inspection must include load path analysis and member capacity checks, not just visual corrosion inspection. A gusset plate can look pristine but be critically overloaded. The I-35W collapse led to immediate inspection of all similar deck truss bridges in the USA.",
    misconception: "The bridge was rated 'structurally deficient' before collapse — which people assume means 'at risk of collapse'. In US bridge rating systems, 'structurally deficient' means it has elements that need attention, not that it's about to fall. The rating system failed to communicate actual risk.",
    rohit_note: "This is why structural health monitoring matters. If strain gauges had been installed at the critical nodes, the overload condition would have been detectable. The data exists — SHM systems are now standard on major new bridges. Retrofitting SHM to existing bridges is an underinvestment that Nepal, and most countries, cannot afford to defer much longer.",
    tags: ["Fatigue", "Gusset Plate", "Design Error", "Truss Bridge", "SHM"],
  },
  {
    id: "hyatt",
    name: "Hyatt Regency Walkway",
    year: 1981,
    location: "Kansas City, USA",
    type: "Suspended walkway",
    cause: "Design change in construction — connection capacity halved",
    severity: "Collapse — 114 deaths, 216 injured",
    color: "#F59E0B",
    icon: "─┬─",
    summary: "During a dance event, two suspended walkways in the Hyatt Regency atrium collapsed simultaneously onto the crowded lobby below. 114 people died. The cause: a design modification during construction that doubled the load on a single connection.",
    what_happened: [
      "The original design called for continuous tie rods running from the ceiling through the 4th floor walkway box beam and down through the 2nd floor walkway box beam.",
      "A fabrication concern led to a contractor change: the single rod was replaced by two separate rods — one from ceiling to 4th floor, one from 4th floor to 2nd floor.",
      "The critical difference: in the original design, the 4th floor connection supported only the 4th floor walkway. In the revised design, the 4th floor connection supported both the 4th floor AND the 2nd floor walkways — double the load.",
      "The revised design was never checked against the original structural drawings. The engineer of record reviewed the revised shop drawings but failed to identify the load doubling.",
      "During the dance, with hundreds of people on both walkways, the 4th floor box-beam connection failed. Both walkways fell.",
    ],
    mechanism: "Inadequate connection capacity — caused by an undocumented design change that doubled the connection load without any corresponding capacity check.",
    lesson: "Shop drawing review is a structural engineering responsibility, not just a contractor process. Any design change that affects load path must be reviewed against the original structural calculations. The tragedy was directly caused by a failure of engineering communication and review process.",
    misconception: "The contractor made the change — but the engineer of record reviewed and approved the revised shop drawings. Engineering responsibility does not end when drawings are issued for construction.",
    rohit_note: "The engineer was convicted of gross negligence and lost his licence. The structural engineering profession changed its standards for shop drawing review as a direct result. What makes this case deeply instructive is that the failure mechanism was simple enough to catch — but it was missed because the review process was perfunctory, not because the engineering was complex.",
    tags: ["Connection Design", "Shop Drawing Review", "Construction Error", "Load Path"],
  },
  {
    id: "wtc",
    name: "World Trade Center",
    year: 2001,
    location: "New York, USA",
    type: "Framed tube skyscraper",
    cause: "Structural fire — progressive collapse after aircraft impact",
    severity: "Collapse — 2,977 deaths",
    color: "#525252",
    icon: "◉",
    summary: "The most studied structural collapse in history. The Twin Towers survived aircraft impact — the structures were still standing after the planes hit. They collapsed due to fire-induced weakening of floor trusses and subsequent progressive collapse.",
    what_happened: [
      "The WTC towers used a 'framed tube' system: exterior columns (spaced 1.02m apart) acted as the primary lateral and vertical load-carrying system.",
      "Interior: a central core with elevator shafts and stairs, connected to the exterior tube by lightweight floor trusses spanning approximately 18 metres.",
      "Aircraft impact destroyed exterior columns and the central core over several floors but the structures remained standing — redistribution of load through the tube.",
      "Jet fuel fires ignited office materials. Steel begins to lose strength at approximately 300°C; by 600°C, steel retains only 40-50% of its room-temperature yield strength.",
      "Fire-weakened floor trusses sagged, pulling exterior columns inward. Once exterior columns buckled, the mass of the floors above could not be arrested by the damaged structure below.",
      "Progressive collapse followed — each floor impact loading the already-weakened floors below beyond their capacity.",
    ],
    mechanism: "Thermal weakening of structural steel followed by floor system failure and progressive collapse. Not aircraft impact — the structures survived impact. Fire was the final cause.",
    lesson: "Fire-resistant construction design must account for realistic fire scenarios, not just code-minimum protection. The floor-to-column connection details were particularly important — when floors fell, they peeled exterior columns inward. Modern high-rise design pays far more attention to floor-tie details and compartmentation.",
    misconception: "Many people believe aircraft impact destroyed the towers. Structurally, the impact was survivable — both towers stood for 56 and 102 minutes after being struck. Fire, not aircraft impact, was the proximate cause of structural failure.",
    rohit_note: "The WTC investigation produced some of the most detailed structural analysis reports ever published (NIST NCSTAR 1). Free to read online. If you're a structural engineer and you haven't read at least the executive summary, you should. The fire protection and progressive collapse sections alone are worth an entire university course.",
    tags: ["Fire Engineering", "Progressive Collapse", "Framed Tube", "High-Rise"],
  },
];

export default function FailuresPage() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-[#030303]">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-24 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#EF4444]/40" />
            <span className="text-[#EF4444] text-[10px] font-mono tracking-[0.5em]">STRUCTURAL FORENSICS</span>
          </div>
          <h1 className="text-[#F5F5F5] font-black mb-3" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.03em" }}>
            Failures Archive.
          </h1>
          <p className="text-[#525252] text-base leading-relaxed max-w-xl">
            Six structural failures — what went wrong, the mechanism, the lesson, and the misconception that everyone gets wrong.
            Engineering knowledge lives in its failures.
          </p>
          <p className="text-[#333] text-xs font-mono mt-3 max-w-lg">
            &ldquo;Structural engineering is the art of moulding materials we do not wholly understand into shapes we cannot precisely analyse, so as to withstand forces we cannot properly assess, in such a way that the public at large has no reason to suspect the extent of our ignorance.&rdquo; — Dykes
          </p>
          <div className="flex items-center gap-3 mt-5">
            <Link href="/lab" className="text-[#333] hover:text-[#F59E0B] text-xs font-mono transition-colors">← The Lab</Link>
            <span className="text-[#111]">·</span>
            <Link href="/structures" className="text-[#333] hover:text-[#F59E0B] text-xs font-mono transition-colors">Structural Systems</Link>
          </div>
        </motion.div>

        {/* Case cards */}
        <div className="space-y-3 mb-8">
          {FAILURES.map((f, i) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <button
                onClick={() => setActive(active === f.id ? null : f.id)}
                className="w-full text-left rounded-2xl border p-5 transition-all duration-300 group relative overflow-hidden"
                style={{
                  borderColor: active === f.id ? `${f.color}30` : "#111",
                  background: active === f.id ? `${f.color}06` : "#0a0a0a",
                }}
              >
                <div
                  className="absolute left-0 top-0 bottom-0 w-0.5 transition-opacity duration-300"
                  style={{ background: f.color, opacity: active === f.id ? 0.7 : 0.15 }}
                />

                <div className="flex items-start gap-5 ml-3">
                  <span className="font-mono text-2xl opacity-20 group-hover:opacity-40 transition-opacity shrink-0 mt-0.5" style={{ color: f.color }}>
                    {f.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 flex-wrap mb-0.5">
                          <span className="text-[#F5F5F5] font-bold text-base group-hover:text-white transition-colors">{f.name}</span>
                          <span className="text-[#333] text-xs font-mono">{f.year}</span>
                          <span className="text-xs font-mono px-2 py-0.5 rounded border" style={{ color: f.color, borderColor: `${f.color}25` }}>
                            {f.type}
                          </span>
                        </div>
                        <p className="text-[#444] text-xs mb-1 font-mono">Cause: {f.cause}</p>
                        <p className="text-[#525252] text-xs leading-relaxed line-clamp-1">{f.summary}</p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-[10px] font-mono hidden md:block" style={{ color: `${f.color}60` }}>{f.severity}</span>
                        <span
                          className="text-sm transition-transform duration-200"
                          style={{
                            color: f.color,
                            opacity: 0.4,
                            transform: active === f.id ? "rotate(180deg)" : "rotate(0deg)",
                          }}
                        >↓</span>
                      </div>
                    </div>
                  </div>
                </div>
              </button>

              {/* Expanded content */}
              <AnimatePresence>
                {active === f.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div
                      className="rounded-b-2xl border border-t-0 overflow-hidden"
                      style={{ borderColor: `${f.color}20`, background: "#050505" }}
                    >
                      <div className="grid md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-[#0d0d0d]">
                        {/* Left */}
                        <div className="p-6 space-y-5">
                          <div>
                            <div className="text-[10px] font-mono tracking-widest mb-3" style={{ color: `${f.color}60` }}>WHAT HAPPENED</div>
                            <ol className="space-y-2">
                              {f.what_happened.map((step, si) => (
                                <li key={si} className="flex gap-3 text-xs text-[#525252] leading-relaxed">
                                  <span className="text-[#1a1a1a] shrink-0 font-mono w-4">{si + 1}.</span>
                                  {step}
                                </li>
                              ))}
                            </ol>
                          </div>

                          <div className="rounded-xl border border-[#111] p-4">
                            <div className="text-[10px] font-mono tracking-widest mb-2" style={{ color: `${f.color}50` }}>MECHANISM</div>
                            <p className="text-[#A3A3A3] text-xs leading-relaxed">{f.mechanism}</p>
                          </div>
                        </div>

                        {/* Right */}
                        <div className="p-6 space-y-5">
                          <div className="rounded-xl border border-[#10B98120] bg-[#10B98108] p-4">
                            <div className="text-[#10B981]/60 text-[10px] font-mono mb-2 tracking-widest">THE LESSON</div>
                            <p className="text-[#A3A3A3] text-xs leading-relaxed">{f.lesson}</p>
                          </div>

                          <div className="rounded-xl border border-[#F59E0B20] bg-[#F59E0B06] p-4">
                            <div className="text-[#F59E0B]/50 text-[10px] font-mono mb-2 tracking-widest">THE MISCONCEPTION</div>
                            <p className="text-[#525252] text-xs leading-relaxed">{f.misconception}</p>
                          </div>

                          <div className="rounded-xl border p-4" style={{ borderColor: `${f.color}15`, background: `${f.color}05` }}>
                            <div className="text-[10px] font-mono mb-2 tracking-widest" style={{ color: `${f.color}50` }}>ROHIT&apos;S NOTE</div>
                            <p className="text-[#525252] text-xs leading-relaxed italic">&ldquo;{f.rohit_note}&rdquo;</p>
                          </div>

                          <div className="flex flex-wrap gap-1.5">
                            {f.tags.map((t) => (
                              <span key={t} className="text-[9px] font-mono px-2 py-0.5 rounded border border-[#111] text-[#333]">{t}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Footer quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center border-t border-[#0d0d0d] pt-10 mt-10"
        >
          <p className="text-[#1a1a1a] text-xs font-mono max-w-xl mx-auto">
            &ldquo;Every disaster is a failure of imagination — the failure to imagine that this particular, unprecedented event was possible.&rdquo;
          </p>
          <div className="flex items-center justify-center gap-6 mt-6 text-xs font-mono">
            <Link href="/structures" className="text-[#333] hover:text-[#F59E0B] transition-colors">← Structural Systems</Link>
            <Link href="/lab" className="text-[#333] hover:text-[#F59E0B] transition-colors">The Lab</Link>
            <Link href="/codex" className="text-[#F59E0B]/30 hover:text-[#F59E0B] transition-colors">◈ Codex</Link>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
