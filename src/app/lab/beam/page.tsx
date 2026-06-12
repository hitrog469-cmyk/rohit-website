"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/ui/Footer";

// ─── Types ────────────────────────────────────────────────────────────────────
type LoadType = "udl" | "point";
type BC = "ss" | "cantilever" | "fixed-fixed";

interface Inputs {
  L: number;       // m
  loadType: LoadType;
  w: number;       // kN/m
  P: number;       // kN
  aFrac: number;   // point load position as fraction of L (0–1)
  E: number;       // GPa
  I: number;       // cm⁴
  bc: BC;
}

interface Point { x: number; y: number; }

interface Results {
  deflPts: Point[];   // deflection SVG points
  bmdPts: Point[];    // BMD SVG points
  sfdPts: Point[];    // SFD SVG points
  deltaMax: number;   // mm
  deltaMaxX: number;  // m position
  Mmax: number;       // kN·m
  Mmin: number;       // kN·m (negative for hogging, e.g. fixed ends)
  Vmax: number;       // kN
  reactions: { RA: number; RB: number }; // kN
}

// ─── Beam solver (analytical closed-form) ─────────────────────────────────────
function solveBeam(inp: Inputs): Results {
  const { L, loadType, w: wKnm, P: Pkn, aFrac, E: Egpa, I: Icm4, bc } = inp;

  // Unit conversions → N, mm
  const Lmm = L * 1000;
  const wNmm = wKnm * 1;          // kN/m = N/mm ✓
  const Pn = Pkn * 1000;
  const aMm = aFrac * Lmm;
  const Empa = Egpa * 1000;       // GPa → MPa = N/mm²
  const Imm4 = Icm4 * 10000;     // cm⁴ → mm⁴
  const EI = Empa * Imm4;         // N·mm²

  const N = 200; // points along beam

  const deflFn: (x: number) => number = (() => {
    if (bc === "ss") {
      if (loadType === "udl") {
        return (x: number) => (wNmm * x * (Lmm ** 3 - 2 * Lmm * x ** 2 + x ** 3)) / (24 * EI);
      } else {
        // Point load at a = aFrac*L
        const a = aMm, b = Lmm - aMm;
        return (x: number) => {
          if (x <= a) return (Pn * b * x * (Lmm ** 2 - b ** 2 - x ** 2)) / (6 * EI * Lmm);
          return (Pn * a * (Lmm - x) * (2 * Lmm * x - x ** 2 - a ** 2)) / (6 * EI * Lmm);
        };
      }
    } else if (bc === "cantilever") {
      if (loadType === "udl") {
        // Fixed at x=0, free at x=L
        return (x: number) => (wNmm * x ** 2 * (6 * Lmm ** 2 - 4 * Lmm * x + x ** 2)) / (24 * EI);
      } else {
        // Point load at tip (x=L)
        return (x: number) => (Pn * x ** 2 * (3 * Lmm - x)) / (6 * EI);
      }
    } else {
      // Fixed-Fixed, UDL only for now
      return (x: number) => (wNmm * x ** 2 * (Lmm - x) ** 2) / (24 * EI);
    }
  })();

  const momentFn: (x: number) => number = (() => {
    if (bc === "ss") {
      if (loadType === "udl") {
        return (x: number) => (wNmm * x * (Lmm - x)) / 2;
      } else {
        const a = aMm, b = Lmm - aMm;
        const RA = (Pn * b) / Lmm;
        return (x: number) => (x <= a ? RA * x : RA * x - Pn * (x - a));
      }
    } else if (bc === "cantilever") {
      if (loadType === "udl") {
        return (x: number) => -wNmm * (Lmm - x) ** 2 / 2; // hogging → negative
      } else {
        return (x: number) => -Pn * (Lmm - x);
      }
    } else {
      // Fixed-Fixed UDL: M(x) = wL²/12 - wLx/2 + wx²/2 (Nmm)
      const MA = -wNmm * Lmm ** 2 / 12; // hogging
      return (x: number) => MA + wNmm * Lmm * x / 2 - wNmm * x ** 2 / 2;
    }
  })();

  const shearFn: (x: number) => number = (() => {
    if (bc === "ss") {
      if (loadType === "udl") {
        return (x: number) => wNmm * Lmm / 2 - wNmm * x;
      } else {
        const a = aMm, b = Lmm - aMm;
        const RA = (Pn * b) / Lmm;
        return (x: number) => (x < a ? RA : RA - Pn);
      }
    } else if (bc === "cantilever") {
      if (loadType === "udl") {
        return (x: number) => -wNmm * (Lmm - x);
      } else {
        return () => -Pn;
      }
    } else {
      return (x: number) => wNmm * Lmm / 2 - wNmm * x;
    }
  })();

  // Compute arrays
  const xs = Array.from({ length: N + 1 }, (_, i) => (i / N) * Lmm);
  const deflArr = xs.map((x) => deflFn(x));
  const mArr = xs.map((x) => momentFn(x));
  const vArr = xs.map((x) => shearFn(x));

  const deltaMaxMm = Math.max(...deflArr);
  const deltaMaxX = xs[deflArr.indexOf(deltaMaxMm)] / 1000;
  const Mmax_Nm = Math.max(...mArr);
  const Mmin_Nm = Math.min(...mArr);
  const Vmax_N = Math.max(...vArr.map(Math.abs));

  // Reactions
  let RA = 0, RB = 0;
  if (bc === "ss") {
    if (loadType === "udl") { RA = RB = wNmm * Lmm / 2; }
    else { const a = aMm; RB = (Pn * a) / Lmm; RA = Pn - RB; }
  } else if (bc === "cantilever") {
    RA = loadType === "udl" ? wNmm * Lmm : Pn;
    RB = 0;
  } else {
    RA = RB = loadType === "udl" ? wNmm * Lmm / 2 : Pn / 2;
  }

  // ─── SVG coordinate system ───────────────────────────────────────────────
  const SVG_W = 800;
  const SVG_H = 180;
  const PAD = 50;
  const beamW = SVG_W - PAD * 2;

  const toSvgX = (x: number) => PAD + (x / Lmm) * beamW;

  // Deflection diagram
  const deflScale = deltaMaxMm > 0 ? 60 / deltaMaxMm : 1;
  const deflPts = xs.map((x, i) => ({
    x: toSvgX(x),
    y: SVG_H / 2 + deflArr[i] * deflScale,
  }));

  // BMD — scale based on max absolute value
  const mAbsMax = Math.max(Math.abs(Mmax_Nm), Math.abs(Mmin_Nm), 1);
  const mScale = 60 / mAbsMax;
  const bmdPts = xs.map((x, i) => ({
    x: toSvgX(x),
    y: SVG_H / 2 - mArr[i] * mScale, // positive moment → below baseline
  }));

  // SFD
  const vAbsMax = Math.max(...vArr.map(Math.abs), 1);
  const vScale = 60 / vAbsMax;
  const sfdPts = xs.map((x, i) => ({
    x: toSvgX(x),
    y: SVG_H / 2 - vArr[i] * vScale,
  }));

  return {
    deflPts,
    bmdPts,
    sfdPts,
    deltaMax: deltaMaxMm,
    deltaMaxX,
    Mmax: Mmax_Nm / 1e6,      // N·mm → kN·m
    Mmin: Mmin_Nm / 1e6,
    Vmax: Vmax_N / 1000,       // N → kN
    reactions: { RA: RA / 1000, RB: RB / 1000 },
  };
}

// ─── SVG Diagram ─────────────────────────────────────────────────────────────
function DiagramSVG({
  pts,
  label,
  color,
  baseline,
}: {
  pts: Point[];
  label: string;
  color: string;
  baseline: number;
}) {
  const pathD = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
  // Fill area between baseline and curve
  const fillD =
    `M ${pts[0].x.toFixed(1)} ${baseline} ` +
    pathD.replace(/^M/, "L") +
    ` L ${pts[pts.length - 1].x.toFixed(1)} ${baseline} Z`;

  return (
    <div className="rounded-xl border border-[#111] bg-[#060606] overflow-hidden">
      <div className="px-4 pt-3 pb-1 flex items-center justify-between">
        <span className="text-[10px] font-mono text-[#333] tracking-widest">{label}</span>
        <span className="w-4 h-px inline-block" style={{ background: color }} />
      </div>
      <svg viewBox={`0 0 800 180`} className="w-full" style={{ height: "120px" }}>
        {/* Baseline */}
        <line x1="50" y1={baseline} x2="750" y2={baseline} stroke="#1a1a1a" strokeWidth="1" />
        {/* Grid lines */}
        {[0.25, 0.5, 0.75].map((f) => (
          <line key={f} x1={50 + f * 700} y1="20" x2={50 + f * 700} y2="160" stroke="#0f0f0f" strokeWidth="1" />
        ))}
        {/* Fill */}
        <path d={fillD} fill={color} fillOpacity="0.12" />
        {/* Curve */}
        <path d={pathD} fill="none" stroke={color} strokeWidth="2" />
        {/* Support markers */}
        <text x="50" y="170" fill="#333" fontSize="10" textAnchor="middle" fontFamily="monospace">0</text>
        <text x="750" y="170" fill="#333" fontSize="10" textAnchor="middle" fontFamily="monospace">L</text>
      </svg>
    </div>
  );
}

// ─── Beam Schematic ───────────────────────────────────────────────────────────
function BeamSchematic({ inp, deflPts }: { inp: Inputs; deflPts: Point[] }) {
  const PAD = 50, W = 800, baseline = 90;
  const pathD = deflPts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");

  // Load arrows
  const arrowXs = Array.from({ length: 9 }, (_, i) => PAD + ((i + 1) / 10) * (W - 2 * PAD));

  return (
    <div className="rounded-xl border border-[#1a1a1a] bg-[#060606] overflow-hidden">
      <div className="px-4 pt-3 pb-1">
        <span className="text-[10px] font-mono text-[#333] tracking-widest">BEAM SCHEMATIC + DEFLECTED SHAPE</span>
      </div>
      <svg viewBox="0 0 800 200" className="w-full" style={{ height: "130px" }}>
        {/* Neutral axis (undeflected) */}
        <line x1={PAD} y1={baseline} x2={W - PAD} y2={baseline} stroke="#1e1e1e" strokeWidth="1" strokeDasharray="4 4" />

        {/* Load arrows (UDL) */}
        {inp.loadType === "udl" &&
          arrowXs.map((ax, i) => (
            <g key={i}>
              <line x1={ax} y1={baseline - 40} x2={ax} y2={baseline - 18} stroke="#F59E0B" strokeWidth="1.5" opacity="0.5" />
              <polygon points={`${ax},${baseline - 14} ${ax - 4},${baseline - 22} ${ax + 4},${baseline - 22}`} fill="#F59E0B" opacity="0.5" />
            </g>
          ))}

        {/* UDL line */}
        {inp.loadType === "udl" && (
          <line x1={PAD} y1={baseline - 40} x2={W - PAD} y2={baseline - 40} stroke="#F59E0B" strokeWidth="1" opacity="0.3" />
        )}

        {/* Point load arrow */}
        {inp.loadType === "point" && (() => {
          const ax = PAD + inp.aFrac * (W - 2 * PAD);
          return (
            <g>
              <line x1={ax} y1={baseline - 60} x2={ax} y2={baseline - 14} stroke="#F59E0B" strokeWidth="2" />
              <polygon points={`${ax},${baseline - 8} ${ax - 6},${baseline - 22} ${ax + 6},${baseline - 22}`} fill="#F59E0B" />
              <text x={ax} y={baseline - 64} fill="#F59E0B" fontSize="10" textAnchor="middle" fontFamily="monospace">P</text>
            </g>
          );
        })()}

        {/* Beam body */}
        <rect x={PAD} y={baseline} width={W - 2 * PAD} height="6" fill="#2a2a2a" rx="1" />

        {/* Deflected shape */}
        <path d={pathD} fill="none" stroke="#F59E0B" strokeWidth="2" opacity="0.8" />

        {/* Supports */}
        {(inp.bc === "ss" || inp.bc === "fixed-fixed") && (
          <>
            {/* Left support - triangle */}
            <polygon points={`${PAD},${baseline + 6} ${PAD - 10},${baseline + 24} ${PAD + 10},${baseline + 24}`} fill="none" stroke="#A3A3A3" strokeWidth="1.5" />
            <line x1={PAD - 12} y1={baseline + 26} x2={PAD + 12} y2={baseline + 26} stroke="#A3A3A3" strokeWidth="1.5" />
            {/* Right support - roller (circle) */}
            <polygon points={`${W - PAD},${baseline + 6} ${W - PAD - 10},${baseline + 24} ${W - PAD + 10},${baseline + 24}`} fill="none" stroke="#A3A3A3" strokeWidth="1.5" />
            <circle cx={W - PAD} cy={baseline + 28} r="4" fill="none" stroke="#A3A3A3" strokeWidth="1.5" />
          </>
        )}
        {inp.bc === "cantilever" && (
          <>
            {/* Fixed support at left */}
            <line x1={PAD - 2} y1={baseline - 20} x2={PAD - 2} y2={baseline + 30} stroke="#A3A3A3" strokeWidth="3" />
            <line x1={PAD - 10} y1={baseline - 20} x2={PAD - 2} y2={baseline - 20} stroke="#525252" strokeWidth="1" />
            <line x1={PAD - 10} y1={baseline - 10} x2={PAD - 2} y2={baseline - 10} stroke="#525252" strokeWidth="1" />
            <line x1={PAD - 10} y1={baseline} x2={PAD - 2} y2={baseline} stroke="#525252" strokeWidth="1" />
            <line x1={PAD - 10} y1={baseline + 10} x2={PAD - 2} y2={baseline + 10} stroke="#525252" strokeWidth="1" />
            <line x1={PAD - 10} y1={baseline + 20} x2={PAD - 2} y2={baseline + 20} stroke="#525252" strokeWidth="1" />
          </>
        )}
        {inp.bc === "fixed-fixed" && (
          <>
            {/* Overwrite right support as fixed */}
            <line x1={W - PAD + 2} y1={baseline - 20} x2={W - PAD + 2} y2={baseline + 30} stroke="#A3A3A3" strokeWidth="3" />
          </>
        )}

        {/* Labels */}
        <text x={W / 2} y="180" fill="#333" fontSize="10" textAnchor="middle" fontFamily="monospace">
          L = {inp.L} m
        </text>
      </svg>
    </div>
  );
}

// ─── Number input ─────────────────────────────────────────────────────────────
function NumInput({
  label, unit, value, onChange, min, max, step
}: {
  label: string; unit: string; value: number;
  onChange: (v: number) => void; min?: number; max?: number; step?: number;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[#333] text-[10px] font-mono">{label}</label>
      <div className="flex items-center gap-1.5 bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg px-3 py-2 focus-within:border-[#F59E0B]/40 transition-colors">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          min={min}
          max={max}
          step={step ?? 1}
          className="bg-transparent text-[#F5F5F5] text-sm font-mono w-full outline-none"
        />
        <span className="text-[#444] text-xs font-mono shrink-0">{unit}</span>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
const BC_OPTIONS: { value: BC; label: string; short: string }[] = [
  { value: "ss", label: "Simply Supported", short: "SS" },
  { value: "cantilever", label: "Cantilever", short: "C" },
  { value: "fixed-fixed", label: "Fixed–Fixed", short: "FF" },
];

export default function BeamCalculatorPage() {
  const [inputs, setInputs] = useState<Inputs>({
    L: 6,
    loadType: "udl",
    w: 20,
    P: 100,
    aFrac: 0.5,
    E: 200,
    I: 10000,
    bc: "ss",
  });

  const set = useCallback(<K extends keyof Inputs>(key: K, val: Inputs[K]) => {
    setInputs((prev) => ({ ...prev, [key]: val }));
  }, []);

  const results = useMemo(() => {
    try { return solveBeam(inputs); }
    catch { return null; }
  }, [inputs]);

  const fmt = (n: number, d = 2) => isFinite(n) ? Math.abs(n).toFixed(d) : "—";

  return (
    <main className="min-h-screen bg-[#030303]">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-20">
        {/* Header */}
        <div className="mb-8">
          <Link href="/lab" className="text-[#444] hover:text-[#F59E0B] text-xs font-mono transition-colors mb-4 inline-flex items-center gap-2">
            ← The Lab
          </Link>
          <h1 className="text-[#F5F5F5] font-black text-3xl md:text-4xl mb-2" style={{ letterSpacing: "-0.02em" }}>
            Beam Calculator
          </h1>
          <p className="text-[#444] text-sm font-mono">
            Euler-Bernoulli beam theory · Analytical closed-form solutions · Real-time SVG diagrams
          </p>
        </div>

        <div className="grid lg:grid-cols-[320px_1fr] gap-6">
          {/* ── Input Panel ── */}
          <div className="space-y-5">
            {/* Boundary conditions */}
            <div className="rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] p-5">
              <div className="text-[#333] text-[10px] font-mono tracking-widest mb-3">BOUNDARY CONDITIONS</div>
              <div className="grid grid-cols-3 gap-1.5">
                {BC_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => set("bc", opt.value)}
                    className="py-2 px-1 rounded-lg text-xs font-mono transition-all duration-150 text-center border"
                    style={{
                      background: inputs.bc === opt.value ? "#F59E0B12" : "#050505",
                      borderColor: inputs.bc === opt.value ? "#F59E0B40" : "#111",
                      color: inputs.bc === opt.value ? "#F59E0B" : "#525252",
                    }}
                  >
                    <div className="font-black">{opt.short}</div>
                    <div className="text-[8px] opacity-70 mt-0.5 leading-tight">{opt.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Load type */}
            <div className="rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] p-5">
              <div className="text-[#333] text-[10px] font-mono tracking-widest mb-3">LOAD TYPE</div>
              <div className="grid grid-cols-2 gap-1.5 mb-4">
                {(["udl", "point"] as LoadType[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => set("loadType", t)}
                    className="py-2.5 rounded-lg text-xs font-mono border transition-all"
                    style={{
                      background: inputs.loadType === t ? "#F59E0B12" : "#050505",
                      borderColor: inputs.loadType === t ? "#F59E0B40" : "#111",
                      color: inputs.loadType === t ? "#F59E0B" : "#525252",
                    }}
                  >
                    {t === "udl" ? "Uniform (UDL)" : "Point Load"}
                  </button>
                ))}
              </div>
              {inputs.loadType === "udl" ? (
                <NumInput label="w — UDL" unit="kN/m" value={inputs.w} onChange={(v) => set("w", v)} min={0.1} step={1} />
              ) : (
                <div className="space-y-3">
                  <NumInput label="P — Point load" unit="kN" value={inputs.P} onChange={(v) => set("P", v)} min={1} step={10} />
                  <div className="flex flex-col gap-1">
                    <label className="text-[#333] text-[10px] font-mono">a/L — Position</label>
                    <input
                      type="range" min="0.1" max="0.9" step="0.05"
                      value={inputs.aFrac}
                      onChange={(e) => set("aFrac", Number(e.target.value))}
                      className="w-full accent-amber-400"
                    />
                    <div className="text-[#444] text-xs font-mono text-right">{(inputs.aFrac * 100).toFixed(0)}% of L = {(inputs.aFrac * inputs.L).toFixed(2)} m</div>
                  </div>
                </div>
              )}
            </div>

            {/* Geometry */}
            <div className="rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] p-5">
              <div className="text-[#333] text-[10px] font-mono tracking-widest mb-3">BEAM GEOMETRY & MATERIAL</div>
              <div className="space-y-3">
                <NumInput label="L — Span" unit="m" value={inputs.L} onChange={(v) => set("L", Math.max(0.5, v))} min={0.5} max={50} step={0.5} />
                <NumInput label="E — Elastic modulus" unit="GPa" value={inputs.E} onChange={(v) => set("E", Math.max(1, v))} min={1} max={500} step={10} />
                <NumInput label="I — Second moment of area" unit="cm⁴" value={inputs.I} onChange={(v) => set("I", Math.max(1, v))} min={1} step={1000} />
              </div>
            </div>

            {/* Quick section presets */}
            <div className="rounded-xl border border-[#111] bg-[#080808] p-4">
              <div className="text-[#222] text-[10px] font-mono tracking-widest mb-2">SECTION PRESETS</div>
              <div className="grid grid-cols-2 gap-1">
                {[
                  { label: "UC 203×203×46", I: 4570 },
                  { label: "UB 305×165×40", I: 8503 },
                  { label: "UB 457×191×74", I: 33300 },
                  { label: "UB 610×229×101", I: 75780 },
                ].map((s) => (
                  <button
                    key={s.label}
                    onClick={() => set("I", s.I)}
                    className="text-[9px] font-mono text-left p-2 rounded border border-[#111] text-[#333] hover:text-[#F59E0B] hover:border-[#F59E0B]/20 transition-all"
                  >
                    {s.label}
                    <span className="block text-[#222] mt-0.5">{s.I.toLocaleString()} cm⁴</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Output Panel ── */}
          {results && (
            <div className="space-y-4">
              {/* Results summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: "Max Deflection", val: fmt(results.deltaMax), unit: "mm", color: "#F59E0B", note: `@ x = ${results.deltaMaxX.toFixed(2)} m` },
                  { label: "Max Moment", val: fmt(results.Mmax), unit: "kN·m", color: "#10B981", note: results.Mmin < -0.01 ? `Hogging: ${fmt(results.Mmin)} kN·m` : "sagging" },
                  { label: "Max Shear", val: fmt(results.Vmax), unit: "kN", color: "#3B82F6", note: "" },
                  { label: "Reactions RA / RB", val: `${fmt(results.reactions.RA, 1)} / ${fmt(results.reactions.RB, 1)}`, unit: "kN", color: "#8B5CF6", note: "" },
                ].map((r) => (
                  <div key={r.label} className="rounded-xl border border-[#111] bg-[#0a0a0a] p-4">
                    <div className="text-[#333] text-[10px] font-mono mb-1">{r.label}</div>
                    <div className="font-black text-xl font-mono" style={{ color: r.color }}>{r.val}</div>
                    <div className="text-[#333] text-xs font-mono">{r.unit}</div>
                    {r.note && <div className="text-[#222] text-[9px] font-mono mt-1">{r.note}</div>}
                  </div>
                ))}
              </div>

              {/* Beam schematic */}
              <BeamSchematic inp={inputs} deflPts={results.deflPts} />

              {/* Deflection diagram */}
              <DiagramSVG
                pts={results.deflPts}
                label="DEFLECTION DIAGRAM   δ (mm)"
                color="#F59E0B"
                baseline={90}
              />

              {/* BMD */}
              <DiagramSVG
                pts={results.bmdPts}
                label="BENDING MOMENT DIAGRAM   M (kN·m)"
                color="#10B981"
                baseline={90}
              />

              {/* SFD */}
              <DiagramSVG
                pts={results.sfdPts}
                label="SHEAR FORCE DIAGRAM   V (kN)"
                color="#3B82F6"
                baseline={90}
              />

              {/* Assumptions */}
              <div className="rounded-xl border border-[#0d0d0d] p-4">
                <div className="text-[#1a1a1a] text-[10px] font-mono tracking-widest mb-2">ASSUMPTIONS</div>
                <div className="text-[#222] text-xs font-mono leading-relaxed space-y-1">
                  <p>· Euler-Bernoulli beam theory (plane sections remain plane, small deflections)</p>
                  <p>· Linear elastic material behaviour — no plasticity</p>
                  <p>· Prismatic cross-section — uniform E and I throughout</p>
                  <p>· No shear deformation (Bernoulli, not Timoshenko)</p>
                  {inputs.bc === "fixed-fixed" && inputs.loadType === "point" && (
                    <p className="text-[#F59E0B]/40">· Fixed-Fixed + Point load approximated as UDL for this release</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
