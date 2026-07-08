"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const NAV_LINKS = [
  { label: "About", href: "about", page: false },
  { label: "Research", href: "research", page: false },
  { label: "Projects", href: "projects", page: false },
  { label: "Skills", href: "skills", page: false },
  { label: "Blog", href: "/blog", page: true },
  { label: "Collaborate", href: "work-with-me", page: false },
  { label: "Contact", href: "contact", page: false },
];

const EXPLORE_LINKS = [
  { icon: "◎", label: "World Map",   href: "/mind",     desc: "How everything connects" },
  { icon: "▷", label: "The Journey", href: "/journey",  desc: "8 chapters, Kathmandu to now" },
  { icon: "⬡", label: "The Lab",     href: "/lab",      desc: "Live structural tools" },
  { icon: "◈", label: "Failures",    href: "/failures", desc: "When structures fail — case studies" },
];

// Structural H-section cross-section — the universal structural engineering symbol
function StructuralMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      {/* Top flange */}
      <rect x="1" y="1" width="20" height="5" rx="1.2" fill="#F59E0B" />
      {/* Web */}
      <rect x="9" y="6" width="4" height="10" fill="#F59E0B" />
      {/* Bottom flange */}
      <rect x="1" y="16" width="20" height="5" rx="1.2" fill="#F59E0B" />
    </svg>
  );
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const [exploreOpen, setExploreOpen] = useState(false);
  const exploreRef = useRef<HTMLDivElement>(null);

  const scrollTo = useCallback((id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = window.__lenis;
    if (lenis) {
      lenis.scrollTo(el, { offset: -80, duration: 1.4, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    NAV_LINKS.forEach(({ href }) => {
      const el = document.getElementById(href);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (window.innerWidth >= 768 && menuOpen) setMenuOpen(false);
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [menuOpen]);

  // Close explore dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (exploreRef.current && !exploreRef.current.contains(e.target as Node)) {
        setExploreOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // K key triggers command palette
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      const isInput = tag === "INPUT" || tag === "TEXTAREA" || (e.target as HTMLElement).isContentEditable;
      if ((e.key === "k" || e.key === "K") && !isInput) {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent("open-command-palette"));
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent("open-command-palette"));
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className={`transition-all duration-500 ${
            scrolled ? "backdrop-blur-xl border-b border-[var(--border-default)]" : "bg-transparent"
          }`}
          style={scrolled ? { backgroundColor: "var(--nav-bg)" } : {}}
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">

            {/* Logo — structural H-section + ROHIT ACHARYA wordmark → always goes home */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group"
              aria-label="Home"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="opacity-90 group-hover:opacity-100 transition-opacity"
              >
                <StructuralMark />
              </motion.div>
              <div className="flex flex-col leading-none">
                <span className="text-[var(--text-primary)] font-bold text-sm tracking-tight transition-colors">
                  ROHIT
                </span>
                <span className="text-[var(--amber)] font-mono text-[9px] tracking-[0.25em] group-hover:tracking-[0.3em] transition-all duration-300">
                  ACHARYA
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-7">
              {NAV_LINKS.map(({ label, href, page }) =>
                page ? (
                  <Link
                    key={href}
                    href={href}
                    className="text-sm font-medium transition-all duration-200 hover:text-[var(--amber)] text-[var(--text-tertiary)] relative group"
                  >
                    {label}
                    <span className="absolute -bottom-0.5 left-0 h-px bg-[var(--amber)] w-0 group-hover:w-full transition-all duration-300" />
                  </Link>
                ) : (
                  <button
                    key={href}
                    onClick={() => scrollTo(href)}
                    className={`text-sm font-medium transition-all duration-200 hover:text-[var(--amber)] relative group ${
                      active === href ? "text-[var(--amber)]" : "text-[var(--text-tertiary)]"
                    }`}
                  >
                    {label}
                    <span
                      className="absolute -bottom-0.5 left-0 h-px bg-[var(--amber)] transition-all duration-300 group-hover:w-full"
                      style={{ width: active === href ? "100%" : "0%" }}
                    />
                  </button>
                )
              )}

              {/* Explore dropdown */}
              <div ref={exploreRef} className="relative">
                <button
                  onClick={() => setExploreOpen(!exploreOpen)}
                  className={`flex items-center gap-1 text-sm font-medium transition-all duration-200 hover:text-[var(--amber)] ${
                    exploreOpen ? "text-[var(--amber)]" : "text-[var(--text-tertiary)]"
                  }`}
                >
                  Explore
                  <motion.span
                    animate={{ rotate: exploreOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-[10px] mt-px"
                  >
                    ▾
                  </motion.span>
                </button>

                <AnimatePresence>
                  {exploreOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -4, scale: 0.97 }}
                      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute top-full right-0 mt-3 w-56 rounded-xl overflow-hidden z-50"
                      style={{
                        background: "var(--nav-bg)",
                        border: "1px solid var(--border-default)",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                        backdropFilter: "blur(20px)",
                      }}
                    >
                      {EXPLORE_LINKS.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setExploreOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 group transition-colors"
                          style={{ borderBottom: "1px solid var(--border-subtle)" }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-hover)")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                        >
                          <span className="text-sm shrink-0" style={{ color: "var(--amber)" }}>{item.icon}</span>
                          <div>
                            <div className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>{item.label}</div>
                            <div className="text-[10px] font-mono" style={{ color: "var(--text-tertiary)" }}>{item.desc}</div>
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Codex — prominent nav entry */}
              <Link
                href="/codex"
                className="flex items-center gap-1.5 text-sm font-mono text-[#F59E0B]/50 hover:text-[#F59E0B] transition-all duration-200 group"
              >
                <motion.span
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                >
                  ◈
                </motion.span>
                <span className="text-xs tracking-wider">Codex</span>
              </Link>
            </nav>

            <div className="hidden md:flex items-center gap-3">
              {/* Command palette trigger */}
              <button
                onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[var(--border-default)] text-[var(--text-dim)] hover:text-[var(--amber)] hover:border-[var(--amber)]/20 transition-all duration-200 text-xs font-mono group"
                title="Command palette (K)"
              >
                <span className="text-xs">⌕</span>
                <kbd className="text-[9px] border border-[var(--border-default)] px-1 py-0.5 rounded text-[var(--text-faint)] group-hover:border-[var(--amber)]/20 group-hover:text-[var(--amber)]/40 transition-all">K</kbd>
              </button>

              <a
                href="/cv.pdf"
                download
                className="text-xs font-bold px-4 py-2 rounded-full border border-[#F59E0B]/40 text-[#F59E0B] hover:bg-[#F59E0B]/10 hover:border-[#F59E0B] transition-all duration-200 tracking-wide"
              >
                CV ↓
              </a>
            </div>

            {/* Hamburger */}
            <button
              className="md:hidden p-2 flex flex-col gap-1.5 relative z-[60]"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="block w-5 h-px bg-[var(--text-primary)] origin-center"
                  animate={
                    i === 0
                      ? menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }
                      : i === 1
                      ? menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }
                      : menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.25 }}
                />
              ))}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center"
            style={{ background: "var(--nav-bg)", backdropFilter: "blur(20px)" }}
            initial={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 2.5rem) 2rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2rem)" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="flex flex-col items-center gap-8">
              {NAV_LINKS.map(({ label, href, page }, i) =>
                page ? (
                  <motion.div key={href} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 + 0.1 }}>
                    <Link href={href} onClick={() => setMenuOpen(false)} className="text-4xl font-black text-[var(--text-primary)] hover:text-[var(--amber)] transition-colors">
                      {label}
                    </Link>
                  </motion.div>
                ) : (
                  <motion.button
                    key={href}
                    onClick={() => scrollTo(href)}
                    className="text-4xl font-black text-[var(--text-primary)] hover:text-[var(--amber)] transition-colors"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 + 0.1 }}
                  >
                    {label}
                  </motion.button>
                )
              )}
              {/* Explore links in mobile menu */}
              {EXPLORE_LINKS.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (NAV_LINKS.length + i) * 0.06 + 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 text-2xl font-bold transition-colors"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <span style={{ color: "var(--amber)" }}>{item.icon}</span>
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              {/* Codex in mobile menu */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (NAV_LINKS.length + EXPLORE_LINKS.length) * 0.06 + 0.1 }}
              >
                <Link href="/codex" onClick={() => setMenuOpen(false)} className="text-4xl font-black text-[#F59E0B]/60 hover:text-[#F59E0B] transition-colors flex items-center gap-3">
                  ◈ Codex
                </Link>
              </motion.div>
              <motion.a
                href="/cv.pdf"
                download
                className="mt-4 px-7 py-2.5 rounded-full border border-[#F59E0B]/50 text-[#F59E0B] text-sm font-bold tracking-wide"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.54 }}
              >
                Download CV
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
