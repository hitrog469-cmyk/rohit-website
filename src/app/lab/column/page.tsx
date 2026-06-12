"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/ui/Footer";

type EndCondition = "pin-pin" | "fixed-free" | "fixed-pin" | "fixed-fixed";

const END_CONDITIONS: {
  id: EndCondition;
  label: string;
  desc: string;
  K: number;
  svgTop: string;
  svgBot: string;
}[] = [
  {
    id: "pin-pin",
    label: "Pin–Pin",
    desc: "Both ends pinned. Classic Euler case.",
    K: 1.0,
    svgTop: "pin",
    svgBot: "pin",
  },
  {
    id: "fixed-free",
    label: "Fixed–Free",
    desc: "Fixed base, free top. Flagpole column.",
    K: 2.0,
    svgTop: "free",
    svgBot: "fixed",
  },
  {
    id: "fixed-pin",
    label: "Fixed–Pin",
    desc: "Fixed base, pinned top.",
    K: 0.7,
    svgTop: "pin",
    svgBot: "fixed",
  },
  {
    id: "fixed-fixed",
    label: "Fixed–Fixed",
    desc: "Both ends fully fixed against rotation.",
    K: 0.5,
    svgTop: "fixed",
    svgBot: "fixed",
  },
];

function computeBuckling(
  L: number,    // m
  E: number,    // GPa
  I: number,    // cm⁴
  A: number,    // cm²
  K: number
) {
  const Lmm = L * 1000;
  const Empa = E * 1000;    // N/mm²
  const Imm4 = I * 10000;  // mm⁴
  const Amm2 = A * 100;    // mm²

  const Le = K * Lmm;                    // effective length mm
  const Pcr = (Math.PI ** 2 * Empa * Imm4) / Le ** 2;  // N
  const r = Math.sqrt(Imm4 / Amm2);    // radius of gyration mm
  const slenderness = Le / r;           // Le/r
  const sigma_cr = Pcr / Amm2;         // N/mm² = MPa

  return {
    Pcr: Pcr / 1000,      // kN
    Le: Le / 1000,         // m
    r: r,                  // mm
    slenderness,
    sigma_cr,              // MPa
  };
}

function ColumnSVG({ condition }: { condition: EndCondition }) {
  const cond = END_CONDITIONS.find((c) => c.id === condition)!;
  const H = 200;
  const cx = 100;
  const top = 30;
  const bot = top + H;

  // Buckled shape (half sine wave, modified for end conditions)
  const N = 50;
  const amp = 22; // px amplitude

  const pts = Array.from({ length: N + 1 }, (_, i) => {
    const t = i / N;
    const y = top + t * H;
    let dx = 0;
    if (condition === "pin-pin") dx = amp * Math.sin(Math.PI * t);
    else if (condition === "fixed-free") dx = amp * (1 - Math.cos((Math.PI / 2) * t));
    else if (condition === "fixed-pin") dx = amp * Math.sin(Math.PI * t) * (1 - 0.3 * t);
    else dx = amp * Math.sin(2 * Math.PI * t) / 2;
    return { x: cx + dx, y };
  });

  const pathD = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const straightD = `M ${cx} ${top} L ${cx} ${bot}`;

  return (
    <svg viewBox="0 0 200 280" className="w-full" style={{ maxHeight: 200 }}>
      {/* Straight column (ghost) */}
      <path d={straightD} stroke="#1a1a1a" strokeWidth="3" fill="none" />
      {/* Buckled column */}
      <path d={pathD} stroke="#F59E0B" strokeWidth="3" fill="none" />

      {/* Top condition */}
      {cond.svgTop === "pin" && (
        <g>
          <circle cx={cx} cy={top} r="5" fill="none" stroke="#A3A3A3" strokeWidth="1.5" />
          <line x1={cx - 12} y1={top - 8} x2={cx + 12} y2={top - 8} stroke="#A3A3A3" strokeWidth="1.5" />
        </g>
      )}
      {cond.svgTop === "fixed" && (
        <rect x={cx - 16} y={top - 8} width="32" height="8" fill="#525252" rx="1" />
      )}
      {cond.svgTop === "free" && (
        <g>
          <line x1={cx - 12} y1={top} x2={cx + 12} y2={top} stroke="#F59E0B" strokeWidth="2" strokeDasharray="3 2" />
        </g>
      )}

      {/* Bottom condition */}
      {cond.svgBot === "pin" && (
        <g>
          <polygon
            points={`${cx},${bot} ${cx - 10},${bot + 16} ${cx + 10},${bot + 16}`}
            fill="none" stroke="#A3A3A3" strokeWidth="1.5"
          />
          <line x1={cx - 12} y1={bot + 18} x2={cx + 12} y2={bot + 18} stroke="#A3A3A3" strokeWidth="1.5" />
        </g>
      )}
      {cond.svgBot === "fixed" && (
        <g>
          <rect x={cx - 16} y={bot} width="32" height="8" fill="#525252" rx="1" />
          {[-8, -2, 4, 10].map((dx) => (
            <line key={dx} x1={cx + dx} y1={bot + 8} x2={cx + dx - 6} y2={bot + 16} stroke="#333" strokeWidth="1" />
          ))}
        </g>
      )}

      {/* Le annotation */}
      <line x1={cx + 36} y1={top} x2={cx + 36} y2={bot} stroke="#333" strokeWidth="1" strokeDasharray="3 2" />
      <text x={cx + 44} y={(top + bot) / 2} fill="#525252" fontSize="10" fontFamily="monospace" textAnchor="start">
        Le = {cond.K}L
      </text>

      {/* K factor */}
      <text x={cx} y="265" fill="#F59E0B" fontSize="12" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
        K = {cond.K}
      </text>
    </svg>
  );
}

export default function ColumnPage() {
  const [L, setL] = useState(4);
  const [E, setE] = useState(200);
  const [I, setI] = useState(4570);    // cm⁴ UC 203×203×46
  const [A, setA] = useState(58.7);   // cm² UC 203×203×46
  const [condition, setCondition] = useState<EndCondition>("pin-pin");

  const cond = END_CONDITIONS.find((c) => c.id === condition)!;
  const res = useMemo(() => computeBuckling(L, E, I, A, cond.K), [L, E, I, A, cond.K]);

  // Slenderness limit lines
  const slendernessData = END_CONDITIONS.map((c) => {
    const r = computeBuckling(L, E, I, A, c.K);
    return { label: c.label, K: c.K, Pcr: r.Pcr, Le: r.Le, sl: r.slenderness };
  });

  const isSlender = res.slenderness > 120;

  return (
    <main className="min-h-screen bg-[#030303]">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-24 pb-20">
        <div className="mb-8">
          <Link href="/lab" className="text-[#444] hover:text-[#F59E0B] text-xs font-mono transition-colors mb-4 inline-flex items-center gap-2">
            ← The Lab
          </Link>
          <h1 className="text-[#F5F5F5] font-black text-3xl md:text-4xl mb-2" style={{ letterSpacing: "-0.02em" }}>
            Column Buckling
          </h1>
          <p className="text-[#444] text-sm font-mono">
            Euler&apos;s critical load formula · Effective length factors · Slenderness ratio analysis
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_320px_280px] gap-6">
          {/* Inputs + results */}
          <div className="space-y-5">
            {/* End conditions selector */}
            <div className="rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] p-5">
              <div className="text-[#333] text-[10px] font-mono tracking-widest mb-3">END CONDITIONS</div>
              <div className="grid grid-cols-2 gap-2">
                {END_CONDITIONS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setCondition(c.id)}
                    className="p-3 rounded-xl border text-left transition-all duration-150"
                    style={{
                      borderColor: condition === c.id ? "#F59E0B40" : "#111",
                      background: condition === c.id ? "#F59E0B08" : "#050505",
                    }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[#F5F5F5] text-sm font-bold" style={{ color: condition === c.id ? "#F59E0B" : "#A3A3A3" }}>
                        {c.label}
                      </span>
                      <span className="text-[#F59E0B] text-xs font-mono font-black">K={c.K}</span>
                    </div>
                    <p className="text-[#333] text-[10px]">{c.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Input fields */}
            <div className="rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] p-5">
              <div className="text-[#333] text-[10px] font-mono tracking-widest mb-3">COLUMN PROPERTIES</div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "L — Length", unit: "m", val: L, set: setL, min: 0.5, step: 0.5 },
                  { label: "E — Modulus", unit: "GPa", val: E, set: setE, min: 1, step: 10 },
                  { label: "I — Min. MoI", unit: "cm⁴", val: I, set: setI, min: 1, step: 100 },
                  { label: "A — Area", unit: "cm²", val: A, set: setA, min: 1, step: 1 },
                ].map((f) => (
                  <div key={f.label} className="flex flex-col gap-1">
                    <label className="text-[#333] text-[10px] font-mono">{f.label}</label>
                    <div className="flex items-center gap-1.5 bg-[#060606] border border-[#1a1a1a] rounded-lg px-3 py-2 focus-within:border-[#F59E0B]/40 transition-colors">
                      <input
                        type="number" value={f.val}
                        onChange={(e) => f.set(Number(e.target.value))}
                        min={f.min} step={f.step}
                        className="bg-transparent text-[#F5F5F5] text-sm font-mono w-full outline-none"
                      />
                      <span className="text-[#444] text-xs font-mono shrink-0">{f.unit}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Section presets */}
              <div className="mt-4">
                <div className="text-[#1a1a1a] text-[9px] font-mono mb-2">SECTION PRESETS</div>
                <div className="grid grid-cols-2 gap-1">
                  {[
                    { label: "UC 152×152×23", I: 1263, A: 29.2 },
                    { label: "UC 203×203×46", I: 4570, A: 58.7 },
                    { label: "UC 254×254×73", I: 11400, A: 93.1 },
                    { label: "UC 305×305×97", I: 22200, A: 123 },
                  ].map((s) => (
                    <button
                      key={s.label}
                      onClick={() => { setI(s.I); setA(s.A); }}
                      className="text-[9px] font-mono text-left p-2 rounded border border-[#111] text-[#333] hover:text-[#F59E0B] hover:border-[#F59E0B]/20 transition-all"
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { label: "Critical Load Pcr", val: res.Pcr.toFixed(1), unit: "kN", color: "#F59E0B" },
                { label: "Effective Length Le", val: res.Le.toFixed(2), unit: "m", color: "#10B981" },
                { label: "Radius of Gyration r", val: res.r.toFixed(1), unit: "mm", color: "#3B82F6" },
                { label: "Slenderness Le/r", val: res.slenderness.toFixed(0), unit: "", color: isSlender ? "#EF4444" : "#A3A3A3" },
                { label: "σ_cr (Euler stress)", val: res.sigma_cr.toFixed(1), unit: "MPa", color: "#8B5CF6" },
                { label: "K factor", val: cond.K.toString(), unit: "(effective)", color: "#F59E0B" },
              ].map((r) => (
                <div key={r.label} className="rounded-xl border border-[#111] bg-[#0a0a0a] p-4">
                  <div className="text-[#333] text-[10px] font-mono mb-1">{r.label}</div>
                  <div className="font-black text-2xl font-mono" style={{ color: r.color }}>{r.val}</div>
                  <div className="text-[#333] text-xs font-mono">{r.unit}</div>
                </div>
              ))}
            </div>

            {isSlender && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-[#EF444430] bg-[#EF444408] p-4 text-sm text-[#EF4444]/80"
              >
                <span className="font-bold">⚠ High slenderness (Le/r = {res.slenderness.toFixed(0)}).</span>
                {" "}Euler&apos;s formula assumes elastic buckling. For Le/r &gt; 120, check inelastic buckling (Johnson or Perry-Robertson formula). Real design codes (BS 5950, Eurocode 3) apply reduction factors.
              </motion.div>
            )}

            {/* Comparison table */}
            <div className="rounded-xl border border-[#111] bg-[#0a0a0a] overflow-hidden">
              <div className="px-5 py-3 border-b border-[#111]">
                <div className="text-[#333] text-[10px] font-mono tracking-widest">COMPARISON ACROSS END CONDITIONS</div>
              </div>
              <div className="divide-y divide-[#0d0d0d]">
                {slendernessData.map((row) => (
                  <div
                    key={row.label}
                    className="px-5 py-3 flex items-center gap-4 text-xs font-mono"
                    style={{ background: row.label === cond.label ? "#F59E0B06" : "transparent" }}
                  >
                    <span className="text-[#F59E0B] w-6 shrink-0">K={row.K}</span>
                    <span className="text-[#A3A3A3] w-28 shrink-0">{row.label}</span>
                    <div className="flex-1 h-1.5 bg-[#111] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#F59E0B] transition-all duration-500"
                        style={{ width: `${Math.min(100, (row.Pcr / slendernessData[3].Pcr) * 100)}%` }}
                      />
                    </div>
                    <span className="text-[#F59E0B] w-20 text-right">{row.Pcr.toFixed(0)} kN</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Theory note */}
            <div className="rounded-xl border border-[#0d0d0d] p-4">
              <div className="text-[#1a1a1a] text-[9px] font-mono tracking-widest mb-2">EULER&apos;S FORMULA</div>
              <div className="font-mono text-sm text-[#333]">
                P<sub>cr</sub> = π²EI / (KL)²
              </div>
              <p className="text-[#222] text-xs mt-2 leading-relaxed">
                Valid for elastic buckling only. Assumes perfectly straight column, no initial imperfections, load applied axially at centroid. Real columns use Perry-Robertson (BS) or χ factors (Eurocode 3).
              </p>
            </div>
          </div>

          {/* Column visualizer */}
          <div className="hidden lg:block">
            <div className="sticky top-24 rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] p-5">
              <div className="text-[#333] text-[10px] font-mono tracking-widest mb-4">BUCKLED SHAPE — {cond.label.toUpperCase()}</div>
              <ColumnSVG condition={condition} />
            </div>
          </div>

          {/* Formula reference */}
          <div className="hidden lg:block">
            <div className="sticky top-24 space-y-3">
              <div className="rounded-xl border border-[#111] bg-[#0a0a0a] p-4">
                <div className="text-[#222] text-[9px] font-mono tracking-widest mb-3">K FACTOR REFERENCE</div>
                {END_CONDITIONS.map((c) => (
                  <div key={c.id} className="flex items-center justify-between py-2 border-b border-[#0d0d0d] last:border-0">
                    <span className="text-[#444] text-xs font-mono">{c.label}</span>
                    <span className="text-[#F59E0B] text-xs font-mono font-bold">K = {c.K}</span>
                  </div>
                ))}
              </div>
              <div className="rounded-xl border border-[#111] bg-[#0a0a0a] p-4">
                <div className="text-[#222] text-[9px] font-mono tracking-widest mb-3">SLENDERNESS LIMITS (STEEL)</div>
                {[
                  { label: "Stocky column", range: "< 50" },
                  { label: "Intermediate", range: "50–120" },
                  { label: "Slender (Euler)", range: "120–200" },
                  { label: "Very slender", range: "> 200" },
                ].map((s) => (
                  <div key={s.label} className="flex justify-between py-1.5 text-[10px] font-mono">
                    <span className="text-[#444]">{s.label}</span>
                    <span className="text-[#333]">Le/r {s.range}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
