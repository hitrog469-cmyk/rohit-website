"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t pt-14 pb-8 px-6 md:px-12"
      style={{ background: "var(--bg-page)", borderColor: "var(--border-subtle)" }}>
      <div className="max-w-7xl mx-auto">

        {/* Top row */}
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Identity */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <svg width="18" height="18" viewBox="0 0 22 22" fill="none" aria-hidden>
                <rect x="1" y="1" width="20" height="5" rx="1.2" fill="var(--amber)" />
                <rect x="9" y="6" width="4" height="10" fill="var(--amber)" />
                <rect x="1" y="16" width="20" height="5" rx="1.2" fill="var(--amber)" />
              </svg>
              <div className="leading-none">
                <div className="font-bold text-xs tracking-tight" style={{ color: "var(--text-primary)" }}>ROHIT</div>
                <div className="font-mono text-[8px] tracking-[0.25em]" style={{ color: "var(--amber)" }}>ACHARYA</div>
              </div>
            </div>
            <p className="text-xs leading-relaxed max-w-[200px]" style={{ color: "var(--text-dim)" }}>
              Civil engineer working on AI and computational methods for construction and structures. NIT Rourkela.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div className="text-[10px] font-mono tracking-widest mb-4" style={{ color: "var(--text-faint)" }}>PAGES</div>
            <div className="space-y-2.5">
              {[
                { label: "Home",    href: "/" },
                { label: "Blog",    href: "/blog" },
                { label: "Now",     href: "/now" },
                { label: "Stack",   href: "/stack" },
                { label: "The Lab", href: "/lab" },
                { label: "Journey", href: "/journey" },
                { label: "World Map", href: "/mind" },
              ].map(({ label, href }) => (
                <Link key={href} href={href}
                  className="block text-xs font-mono transition-colors duration-200"
                  style={{ color: "var(--text-dim)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--amber)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--text-dim)")}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Codex */}
          <div>
            <div className="text-[10px] font-mono tracking-widest mb-4" style={{ color: "var(--text-faint)" }}>◈ RESTRICTED</div>
            <Link
              href="/codex"
              className="group block p-4 rounded-xl transition-all duration-300"
              style={{ border: "1px solid rgba(var(--amber), 0.1)" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <motion.span
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                  style={{ color: "var(--amber)" }}
                  className="text-sm"
                >◈</motion.span>
                <span className="text-xs font-mono transition-colors" style={{ color: "var(--amber)", opacity: 0.5 }}>THE CODEX</span>
              </div>
              <p className="text-[10px] leading-relaxed transition-colors" style={{ color: "var(--text-ghost)" }}>
                Three cipher-locked chambers. Research, cricket, Nepal. Each with a question at the door.
              </p>
              <div className="flex gap-2 mt-2 flex-wrap">
                {["Research Vault", "Cricket Codex", "Nepal Files"].map((c) => (
                  <span key={c} className="text-[8px] font-mono transition-colors" style={{ color: "var(--text-ghost)" }}>{c}</span>
                ))}
              </div>
            </Link>
          </div>
        </div>

        {/* Title block — like the stamp box on a structural drawing sheet */}
        <div
          className="mb-8 grid grid-cols-2 md:grid-cols-5 font-mono text-[9px] tracking-wider uppercase"
          style={{ border: "1px solid var(--border-default)" }}
        >
          {[
            { k: "PROJECT", v: "PERSONAL SITE — REV 2026" },
            { k: "DRAWN BY", v: "R. ACHARYA" },
            { k: "CHECKED BY", v: "R. ACHARYA (NOBODY ELSE VOLUNTEERED)" },
            { k: "SCALE", v: "1:1 — NO EXAGGERATION" },
            { k: "LOCATION", v: "28.27°N 83.59°E → 27.72°N 85.32°E" },
          ].map(({ k, v }) => (
            <div key={k} className="p-3" style={{ borderRight: "1px solid var(--border-default)", borderTop: "1px solid var(--border-default)", marginTop: "-1px" }}>
              <div style={{ color: "var(--text-faint)" }}>{k}</div>
              <div className="mt-1 normal-case tracking-normal" style={{ color: "var(--text-tertiary)" }}>{v}</div>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono" style={{ color: "var(--text-faint)" }}>
              © {new Date().getFullYear()} Rohit Acharya
            </span>
            <span className="text-xs" style={{ color: "var(--border-default)" }}>·</span>
            <span className="text-xs font-mono" style={{ color: "var(--text-faint)" }}>हर हर महादेव</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono" style={{ color: "var(--border-default)" }}>Built with</span>
            <span className="text-xs font-mono" style={{ color: "var(--text-faint)" }}>Next.js · Three.js · Framer Motion</span>
          </div>

          <div className="text-xs font-mono" style={{ color: "var(--border-default)" }}>
            Press{" "}
            <kbd className="px-1 py-0.5 rounded text-[9px]"
              style={{ border: "1px solid var(--border-default)", color: "var(--text-faint)" }}>K</kbd>
            {" "}to navigate anywhere
          </div>
        </div>
      </div>

      {/* Bottom amber line */}
      <div className="mt-6 amber-line" />
    </footer>
  );
}
