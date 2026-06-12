"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/ui/Footer";

const SYSTEMS = [
  {
    id: "truss",
    name: "Trusses",
    tagline: "Forces through triangles",
    color: "#F59E0B",
    glyph: "△",
    summary: "Trusses work because triangles cannot deform without changing member length. Every member carries only axial force — pure tension or compression. No bending.",
    how: [
      "Load applied at joints (nodes)",
      "Members connected by pin joints (ideally)",
      "Each member: either in tension (being pulled) or compression (being squeezed)",
      "The geometry routes forces along member axes — bending is zero",
      "Method of Joints or Method of Sections for analysis",
    ],
    usedIn: ["Roof trusses", "Bridge trusses (Pratt, Warren, Howe)", "Tower cranes", "Transmission towers", "Space frames"],
    limitation: "Pin-joint assumption is idealized — real connections have some rigidity and introduce secondary bending.",
    examples: [
      { name: "Pratt Truss", note: "Verticals in compression, diagonals in tension — optimal for dead loads" },
      { name: "Warren Truss", note: "Alternating diagonals — no verticals, equal member lengths, popular for bridges" },
      { name: "K-Truss (Howe variant)", note: "Diagonals in compression, verticals in tension — reversed from Pratt" },
    ],
    insight: "The Eiffel Tower is essentially a giant lattice truss. Gustave Eiffel understood that by making steel open — more void than material — he could have structural efficiency with minimal wind load.",
  },
  {
    id: "frame",
    name: "Frames",
    tagline: "Rigidity through moment connections",
    color: "#3B82F6",
    glyph: "▢",
    summary: "Frames resist lateral loads through rigid joints. Unlike trusses, beams and columns carry bending moment. The key is the moment connection — the joint resists rotation.",
    how: [
      "Beams and columns connected with rigid (moment-resisting) joints",
      "Loads cause bending in both beams AND columns",
      "Portal frame: simplest rigid frame — one bay, one storey",
      "Lateral loads (wind, seismic) create portal action",
      "Sway deflection is the critical design check for tall frames",
    ],
    usedIn: ["Multi-storey buildings", "Industrial sheds (portal frames)", "Bridges with moment connections", "Aircraft fuselage frames"],
    limitation: "Bending-dominated systems use material less efficiently than trusses. Lateral stiffness decreases dramatically with height without bracing or core walls.",
    examples: [
      { name: "Portal Frame", note: "Single bay industrial shed — the most common steel structure on earth" },
      { name: "Moment Frame (SMF)", note: "Special moment frame for seismic zones — ductile joints absorb earthquake energy" },
      { name: "Braced Frame", note: "Frame + diagonal bracing = truss behavior for lateral loads + frame behavior for vertical" },
    ],
    insight: "Every multi-storey building you've ever entered is a frame. The columns carry gravity. The moment connections carry wind. This is why 'rigid connection detail' is the most important drawing in any structural set.",
  },
  {
    id: "plate",
    name: "Plates & Shells",
    tagline: "Curvature carries load",
    color: "#8B5CF6",
    glyph: "⌒",
    summary: "Plates carry load in two directions simultaneously through bending. Shells go further — curvature introduces membrane action, making them extraordinarily efficient. My thesis lives here.",
    how: [
      "Flat plates: load resisted by two-way bending (Kirchhoff plate theory for thin plates)",
      "Thick plates use Reissner-Mindlin theory (shear deformation matters)",
      "Shells add a crucial ingredient: membrane forces in the surface plane",
      "A dome carries load in pure compression — no bending at all (ideally)",
      "Buckling is the critical failure mode for thin plates under compression",
    ],
    usedIn: ["Floor slabs (RC flat plates)", "Aircraft fuselage skins", "Ship hulls", "Cooling tower shells", "FG-GRC composite panels (my research)"],
    limitation: "Thin plates buckle under much lower loads than they can carry in tension. The ratio of buckling load to yield load decreases with slenderness squared.",
    examples: [
      { name: "RC Flat Slab", note: "Two-way bending, column-supported — punching shear at columns is the critical check" },
      { name: "Cylindrical Shell", note: "Carries pressure loads in pure hoop tension — pressurised vessels, silos, tanks" },
      { name: "FG-GRC Plate (my thesis)", note: "Graphene-reinforced composite — functionally graded to put material where stress is highest" },
    ],
    insight: "The Sydney Opera House shells were so geometrically complex that Utzon's original form was unbuildable. Ove Arup's team had to rethink the geometry entirely — eventually resolving all shells as segments of a single sphere. Geometry solved the engineering.",
  },
  {
    id: "cable",
    name: "Cables & Suspension",
    tagline: "Pure tension, infinite efficiency",
    color: "#10B981",
    glyph: "∿",
    summary: "A cable can only pull, never push — which means it's always in tension. Tension members use their full cross-section efficiently. The catenary curve is nature's optimal funicular form.",
    how: [
      "Cables carry load entirely through tension — no bending capacity assumed",
      "Geometry changes under load — non-linear behaviour (the more it sags, the stiffer it gets)",
      "Catenary: the natural shape of a uniform cable under gravity",
      "Parabola: approximate shape under uniform horizontal load (close to catenary for small sag)",
      "Suspension bridges hang the deck from main cables via hangers (vertical cables)",
      "Cable-stayed bridges directly connect deck to tower via inclined stay cables",
    ],
    usedIn: ["Suspension bridges", "Cable-stayed bridges", "Tent structures", "Guyed masts", "Cable-net facades"],
    limitation: "Cables have no compressive capacity — they must be pretensioned to remain taut under all loading conditions. Aerodynamic instability (flutter, galloping) is the critical dynamic concern.",
    examples: [
      { name: "Golden Gate Bridge", note: "Suspension — main cable 92,000 km of wire. Catenary sag/span ratio ≈ 1/9" },
      { name: "Millau Viaduct", note: "Cable-stayed — tallest bridge piers on earth. Deck assembled on ground, slid into position" },
      { name: "Tacoma Narrows (failure)", note: "Aerodynamic flutter caused resonant oscillation and collapse — cables did not cause this, deck shape did" },
    ],
    insight: "Suspend a chain and you get the catenary — pure tension. Invert the catenary and you get the arch — pure compression. Gaudí understood this: he designed the Sagrada Família by hanging chain models from the ceiling, photographing them inverted.",
  },
  {
    id: "composite",
    name: "Composite Structures",
    tagline: "Materials that think together",
    color: "#F97316",
    glyph: "⬡",
    summary: "Composite structures combine two materials to get properties neither has alone. Steel + concrete. Fibre + matrix. Graphene + polymer. The interface between materials is where the engineering happens.",
    how: [
      "Composite action requires shear transfer at the interface (shear connectors, chemical bond)",
      "Steel-concrete composite: steel takes tension (what it's good at), concrete takes compression (what it's good at)",
      "Fibre-reinforced polymers (FRP): fibres carry load, matrix transfers load between fibres",
      "Functionally Graded Materials (FGM): properties vary continuously through thickness — no sharp interface stress concentrations",
      "Graphene-reinforced composites: even 0.3% GPL weight fraction increases stiffness by 30%+",
    ],
    usedIn: ["Steel-concrete composite beams (most modern buildings)", "CFRP aircraft skins", "FRP bridge decks", "FG-GRC plates (my research)", "Reinforced concrete (oldest composite)"],
    limitation: "Interface failure (delamination) is catastrophic and sudden. Design must ensure the composite acts monolithically throughout its service life.",
    examples: [
      { name: "Steel-Concrete Composite Beam", note: "Shear studs weld to steel top flange, concrete slab engages — neutral axis rises, moment capacity increases 30–50%" },
      { name: "CFRP Aircraft Panel", note: "Carbon fibre in epoxy — strength/weight ratio 5× steel. Boeing 787 is 50% CFRP by weight" },
      { name: "FG-X Graphene Plate (thesis)", note: "+30% critical buckling load by concentrating graphene at surfaces where bending stresses peak" },
    ],
    insight: "Reinforced concrete is humanity's most-used composite material by volume — invented by a French gardener named Joseph Monier who patented flowerpots reinforced with iron mesh in 1867. Structural engineers did the rest.",
  },
  {
    id: "seismic",
    name: "Seismic Systems",
    tagline: "Engineering against earthquakes",
    color: "#EF4444",
    glyph: "⌇",
    summary: "Seismic design is not about surviving the 'big one' without damage. It's about controlled damage — ensuring the structure absorbs energy ductilely so it doesn't collapse on people.",
    how: [
      "Seismic force = mass × spectral acceleration (F = ma applied to buildings)",
      "Ductility is more important than strength — a structure must deform without breaking",
      "Base isolation: separate the building from the ground motion using flexible bearings",
      "Shear walls: RC walls that carry lateral forces through shear action",
      "Moment frames: ductile joints that yield and absorb energy in controlled locations (plastic hinges)",
      "Nepal: 7.8 Mw Gorkha 2015 — poorly constructed masonry buildings collapsed; properly designed buildings survived",
    ],
    usedIn: ["All buildings in seismic zones", "Bridges (requiring isolation bearings)", "Nuclear facilities (extreme demands)", "Hospitals (must remain functional post-earthquake)"],
    limitation: "Earthquake ground motion is inherently unpredictable. The design spectrum is a probabilistic estimate — we design for a 475-year return period event, not the maximum possible.",
    examples: [
      { name: "Isolation-based (Taipei 101)", note: "Giant tuned mass damper (660 tonnes) reduces sway under typhoons and earthquakes" },
      { name: "Shear Wall Core", note: "RC core wall at building centre — carries lateral loads from all floors, transfers to foundation" },
      { name: "Buckling-Restrained Brace (BRB)", note: "Steel core inside a concrete-filled tube — yields in tension AND compression, absorbs seismic energy" },
    ],
    insight: "After the 2015 Nepal earthquake, engineers found that buildings built to 1994 code (or later) survived while pre-code masonry didn't. The lesson isn't that Nepal needs better materials — it's that Nepal needs better code enforcement and engineers who can check compliance at scale.",
  },
];

export default function StructuresPage() {
  const [active, setActive] = useState<string | null>(null);
  const activeSystem = SYSTEMS.find((s) => s.id === active);

  return (
    <main className="min-h-screen bg-[#030303]">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#F59E0B]/40" />
            <span className="text-[#F59E0B] text-[10px] font-mono tracking-[0.5em]">HOW STRUCTURES WORK</span>
          </div>
          <h1 className="text-[#F5F5F5] font-black mb-3" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.03em" }}>
            Structural Systems.
          </h1>
          <p className="text-[#525252] text-base leading-relaxed max-w-xl">
            Six structural typologies — how they carry load, where they fail, and the insight that makes each one click.
            Click any system to go deep.
          </p>
          <div className="flex items-center gap-3 mt-4">
            <Link href="/lab" className="text-[#333] hover:text-[#F59E0B] text-xs font-mono transition-colors">← The Lab</Link>
            <span className="text-[#111]">·</span>
            <Link href="/failures" className="text-[#333] hover:text-[#EF4444] text-xs font-mono transition-colors">→ Failures Archive</Link>
          </div>
        </motion.div>

        {/* Grid of system cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {SYSTEMS.map((sys, i) => (
            <motion.button
              key={sys.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              onClick={() => setActive(active === sys.id ? null : sys.id)}
              className="text-left rounded-2xl border p-6 relative overflow-hidden transition-all duration-300 group"
              style={{
                borderColor: active === sys.id ? `${sys.color}40` : "#111",
                background: active === sys.id ? `${sys.color}08` : "#0a0a0a",
                boxShadow: active === sys.id ? `0 0 40px ${sys.color}10` : "none",
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-0.5 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(90deg, transparent, ${sys.color}, transparent)`,
                  opacity: active === sys.id ? 0.8 : 0.2,
                }}
              />
              <div className="flex items-start justify-between mb-4">
                <span
                  className="font-mono text-3xl opacity-20 group-hover:opacity-50 transition-opacity duration-300"
                  style={{ color: sys.color }}
                >
                  {sys.glyph}
                </span>
                <span
                  className="text-xs font-mono transition-transform duration-200"
                  style={{
                    color: sys.color,
                    opacity: 0.5,
                    transform: active === sys.id ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  ↓
                </span>
              </div>
              <h3 className="text-[#F5F5F5] font-bold text-lg mb-1">{sys.name}</h3>
              <p style={{ color: `${sys.color}80` }} className="text-xs font-mono mb-3">{sys.tagline}</p>
              <p className="text-[#444] text-xs leading-relaxed line-clamp-2">{sys.summary}</p>
            </motion.button>
          ))}
        </div>

        {/* Expanded deep dive */}
        <AnimatePresence mode="wait">
          {activeSystem && (
            <motion.div
              key={activeSystem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl border overflow-hidden"
              style={{ borderColor: `${activeSystem.color}20`, background: "#060606" }}
            >
              {/* Header */}
              <div className="px-8 py-6 border-b" style={{ borderColor: `${activeSystem.color}15` }}>
                <div className="flex items-start justify-between">
                  <div>
                    <span
                      className="text-[10px] font-mono tracking-[0.4em]"
                      style={{ color: activeSystem.color }}
                    >
                      DEEP DIVE
                    </span>
                    <h2 className="text-[#F5F5F5] font-black text-2xl md:text-3xl mt-1" style={{ letterSpacing: "-0.02em" }}>
                      {activeSystem.name}
                    </h2>
                    <p className="text-[#525252] text-sm mt-1">{activeSystem.summary}</p>
                  </div>
                  <button
                    onClick={() => setActive(null)}
                    className="text-[#333] hover:text-[#F5F5F5] text-xl ml-6 transition-colors shrink-0"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x" style={{ borderColor: "#111" }}>
                {/* Left column */}
                <div className="p-6 space-y-6">
                  {/* How it works */}
                  <div>
                    <h3 className="text-[#F5F5F5] font-bold text-sm mb-3 flex items-center gap-2">
                      <span style={{ color: activeSystem.color }}>01.</span> How it works
                    </h3>
                    <ul className="space-y-2">
                      {activeSystem.how.map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.06 }}
                          className="flex gap-3 text-xs text-[#525252] leading-relaxed"
                        >
                          <span style={{ color: `${activeSystem.color}50` }} className="shrink-0 mt-0.5">▸</span>
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Used in */}
                  <div>
                    <h3 className="text-[#F5F5F5] font-bold text-sm mb-3 flex items-center gap-2">
                      <span style={{ color: activeSystem.color }}>02.</span> Where it&apos;s used
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {activeSystem.usedIn.map((u) => (
                        <span
                          key={u}
                          className="text-[10px] font-mono px-2 py-1 rounded border"
                          style={{ color: activeSystem.color, borderColor: `${activeSystem.color}25`, background: `${activeSystem.color}08` }}
                        >
                          {u}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Limitation */}
                  <div className="rounded-xl border p-4" style={{ borderColor: "#EF444420", background: "#EF444408" }}>
                    <div className="text-[#EF4444]/60 text-[10px] font-mono mb-1 tracking-widest">LIMITATION</div>
                    <p className="text-[#A3A3A3] text-xs leading-relaxed">{activeSystem.limitation}</p>
                  </div>
                </div>

                {/* Right column */}
                <div className="p-6 space-y-6">
                  {/* Examples */}
                  <div>
                    <h3 className="text-[#F5F5F5] font-bold text-sm mb-3 flex items-center gap-2">
                      <span style={{ color: activeSystem.color }}>03.</span> Notable examples
                    </h3>
                    <div className="space-y-3">
                      {activeSystem.examples.map((ex, i) => (
                        <motion.div
                          key={ex.name}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.08 }}
                          className="p-4 rounded-xl border border-[#111] bg-[#0a0a0a]"
                        >
                          <div className="text-[#F5F5F5] text-sm font-semibold mb-1">{ex.name}</div>
                          <div className="text-[#444] text-xs leading-relaxed">{ex.note}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* The Insight */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="rounded-xl border p-5 relative overflow-hidden"
                    style={{ borderColor: `${activeSystem.color}20`, background: `${activeSystem.color}06` }}
                  >
                    <div
                      className="text-[10px] font-mono tracking-widest mb-3"
                      style={{ color: `${activeSystem.color}60` }}
                    >
                      THE INSIGHT
                    </div>
                    <p className="text-[#D4D4D4] text-sm leading-relaxed italic">
                      &ldquo;{activeSystem.insight}&rdquo;
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom nav */}
        <div className="mt-14 flex items-center justify-center gap-8 text-xs font-mono border-t border-[#0d0d0d] pt-8">
          <Link href="/lab" className="text-[#333] hover:text-[#F59E0B] transition-colors">← The Lab</Link>
          <Link href="/lab/beam" className="text-[#333] hover:text-[#F59E0B] transition-colors">Beam Calculator</Link>
          <Link href="/failures" className="text-[#333] hover:text-[#EF4444] transition-colors">Failures Archive →</Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
