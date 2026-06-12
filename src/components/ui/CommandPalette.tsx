"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

type CommandItem = {
  id: string;
  label: string;
  sublabel?: string;
  group: string;
  icon: string;
  href?: string;
  scrollTo?: string;
};

const ALL_ITEMS: CommandItem[] = [
  // Navigate
  { id: "about", label: "About", sublabel: "Who I am + where I come from", group: "Navigate", icon: "◉", scrollTo: "about" },
  { id: "research", label: "Research", sublabel: "FG-GRC thesis, ABAQUS, composites", group: "Navigate", icon: "⬡", scrollTo: "research" },
  { id: "projects", label: "Projects", sublabel: "Things I've built", group: "Navigate", icon: "◫", scrollTo: "projects" },
  { id: "skills", label: "Skills", sublabel: "Engineering + tech stack", group: "Navigate", icon: "◈", scrollTo: "skills" },
  { id: "contact", label: "Contact", sublabel: "Let's build something together", group: "Navigate", icon: "◎", scrollTo: "contact" },
  // Pages
  { id: "blog-page", label: "Blog", sublabel: "Writing on engineering, Nepal, cricket", group: "Pages", icon: "▤", href: "/blog" },
  { id: "now-page", label: "Now", sublabel: "What I'm working on right now", group: "Pages", icon: "▶", href: "/now" },
  { id: "stack-page", label: "Stack", sublabel: "Tools I use daily — engineering + dev", group: "Pages", icon: "◳", href: "/stack" },
  { id: "lab-hub", label: "The Lab", sublabel: "Structural engineering tools & deep dives", group: "Pages", icon: "⬡", href: "/lab" },
  { id: "structures-page", label: "Structural Systems", sublabel: "Trusses, frames, plates, cables, composites, seismic", group: "Pages", icon: "△", href: "/structures" },
  { id: "failures-page", label: "Failures Archive", sublabel: "Tacoma Narrows, Dharahara, WTC and more", group: "Pages", icon: "◈", href: "/failures" },
  { id: "beam-calc", label: "Beam Calculator", sublabel: "Live deflection, BMD and SFD diagrams", group: "Pages", icon: "─", href: "/lab/beam" },
  { id: "column-calc", label: "Column Buckling", sublabel: "Euler critical load + K-factor visualizer", group: "Pages", icon: "╪", href: "/lab/column" },
  { id: "codex-hub", label: "Codex", sublabel: "Three cipher-locked secret chambers", group: "Pages", icon: "◈", href: "/codex" },
  { id: "mind-page", label: "World Map", sublabel: "Interactive constellation — how everything connects", group: "Pages", icon: "◎", href: "/mind" },
  { id: "journey-page", label: "The Journey", sublabel: "Eight chapters from Kathmandu to now", group: "Pages", icon: "▷", href: "/journey" },
  // Codex
  { id: "codex-research", label: "Research Vault", sublabel: "FG-GRC deep dive — 200+ simulations", group: "◈ Codex", icon: "⬡", href: "/codex/research" },
  { id: "codex-cricket", label: "Cricket Codex", sublabel: "IPL analytics + XGBoost prediction model", group: "◈ Codex", icon: "◉", href: "/codex/cricket" },
  { id: "codex-nepal", label: "Nepal Files", sublabel: "Infrastructure, Kathmandu, home", group: "◈ Codex", icon: "◎", href: "/codex/nepal" },
  // Blog
  { id: "blog-1", label: "Buckling & Life", sublabel: "How structural failure taught me to be flexible", group: "Blog", icon: "▤", href: "/blog/buckling-and-life" },
  { id: "blog-2", label: "Nepal Engineers Who Code", sublabel: "Why Nepal needs hybrid engineers", group: "Blog", icon: "▤", href: "/blog/nepal-engineers-who-code" },
  { id: "blog-3", label: "Cricket Analytics & T20", sublabel: "Data-driven T20 cricket", group: "Blog", icon: "▤", href: "/blog/ipl-analytics" },
];

const GROUP_ORDER = ["Navigate", "Pages", "◈ Codex", "Blog"];

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(el, { offset: -80, duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

interface CommandPaletteProps {
  initialOpen?: boolean;
  onClose?: () => void;
}

export default function CommandPalette({ initialOpen = false, onClose }: CommandPaletteProps) {
  const [open, setOpen] = useState(initialOpen);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const closeAll = useCallback(() => {
    setOpen(false);
    setQuery("");
    setSelected(0);
    onClose?.();
  }, [onClose]);

  // Filter items
  const filtered = query.trim()
    ? ALL_ITEMS.filter(
        (item) =>
          item.label.toLowerCase().includes(query.toLowerCase()) ||
          (item.sublabel?.toLowerCase().includes(query.toLowerCase())) ||
          item.group.toLowerCase().includes(query.toLowerCase())
      )
    : ALL_ITEMS;

  // Group filtered items
  const grouped = GROUP_ORDER.reduce<{ group: string; items: CommandItem[] }[]>((acc, g) => {
    const items = filtered.filter((i) => i.group === g);
    if (items.length) acc.push({ group: g, items });
    return acc;
  }, []);

  const flatFiltered = grouped.flatMap((g) => g.items);

  const handleAction = useCallback(
    (item: CommandItem) => {
      closeAll();
      if (item.scrollTo) {
        // Navigate home first if needed
        if (window.location.pathname !== "/") {
          router.push("/");
          setTimeout(() => scrollToSection(item.scrollTo!), 600);
        } else {
          scrollToSection(item.scrollTo);
        }
      } else if (item.href) {
        router.push(item.href);
      }
    },
    [router, closeAll]
  );

  // Keyboard navigation within the open palette
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { closeAll(); }
      if (e.key === "ArrowDown") { e.preventDefault(); setSelected((s) => Math.min(s + 1, flatFiltered.length - 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); setSelected((s) => Math.max(s - 1, 0)); }
      if (e.key === "Enter" && flatFiltered[selected]) { handleAction(flatFiltered[selected]); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, flatFiltered, selected, handleAction, closeAll]);

  // Auto-focus input when open
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelected(0);
    }
  }, [open]);

  // Scroll selected item into view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-index="${selected}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [selected]);

  return (
    <>
      {/* Trigger hint in nav — handled via nav component; this is the global overlay */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[100] bg-[#050505]/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={closeAll}
            />

            {/* Panel */}
            <motion.div
              className="fixed top-[18%] left-1/2 -translate-x-1/2 z-[101] w-full max-w-[580px] mx-4"
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ width: "calc(100% - 2rem)" }}
            >
              <div className="rounded-2xl border border-[#1a1a1a] overflow-hidden"
                style={{ background: "color-mix(in srgb, var(--bg-page) 97%, transparent)", boxShadow: "0 0 0 1px rgba(245,158,11,0.08), 0 32px 64px rgba(0,0,0,0.4)" }}>

                {/* Search bar */}
                <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#141414]">
                  <span className="text-[#444] text-sm font-mono">⌕</span>
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); setSelected(0); }}
                    placeholder="Search pages, sections, Codex chambers…"
                    className="flex-1 bg-transparent text-[#F5F5F5] text-sm placeholder-[#333] outline-none font-mono"
                  />
                  <kbd className="text-[#333] text-[10px] font-mono border border-[#1a1a1a] px-1.5 py-0.5 rounded">ESC</kbd>
                </div>

                {/* Results */}
                <div ref={listRef} className="max-h-[380px] overflow-y-auto py-2">
                  {grouped.length === 0 && (
                    <div className="text-[#333] text-xs font-mono text-center py-10">no results — try &apos;codex&apos; or &apos;nepal&apos;</div>
                  )}
                  {grouped.map(({ group, items }) => {
                    return (
                      <div key={group} className="mb-1">
                        <div className="px-4 py-1.5 text-[10px] font-mono tracking-widest text-[#333] uppercase">
                          {group}
                        </div>
                        {items.map((item) => {
                          const flatIdx = flatFiltered.indexOf(item);
                          const isSelected = flatIdx === selected;
                          return (
                            <button
                              key={item.id}
                              data-index={flatIdx}
                              onClick={() => handleAction(item)}
                              onMouseEnter={() => setSelected(flatIdx)}
                              className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors duration-75"
                              style={{ background: isSelected ? "rgba(245,158,11,0.07)" : "transparent" }}
                            >
                              <span
                                className="text-base w-6 text-center shrink-0 transition-colors"
                                style={{ color: isSelected ? "#F59E0B" : "#333" }}
                              >
                                {item.icon}
                              </span>
                              <div className="flex-1 min-w-0">
                                <div
                                  className="text-sm font-medium transition-colors truncate"
                                  style={{ color: isSelected ? "#F5F5F5" : "#A3A3A3" }}
                                >
                                  {item.label}
                                </div>
                                {item.sublabel && (
                                  <div className="text-xs text-[#333] truncate mt-0.5">{item.sublabel}</div>
                                )}
                              </div>
                              {item.scrollTo && (
                                <span className="text-[10px] font-mono text-[#222] shrink-0">scroll</span>
                              )}
                              {item.href && (
                                <span className="text-[10px] font-mono text-[#222] shrink-0">→</span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>

                {/* Footer */}
                <div className="border-t border-[#0f0f0f] px-4 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-[10px] font-mono text-[#222]">
                    <span>↑↓ navigate</span>
                    <span>↵ open</span>
                    <span>esc close</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#F59E0B]/30">press K to open anytime</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// Export a small trigger button for the nav
export function CommandPaletteTrigger({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#1a1a1a] text-[#444] hover:text-[#F59E0B] hover:border-[#F59E0B]/30 transition-all duration-200 text-xs font-mono group"
    >
      <span className="text-[10px] group-hover:text-[#F59E0B] transition-colors">⌕</span>
      <span>Search</span>
      <kbd className="text-[#2a2a2a] text-[9px] border border-[#1a1a1a] px-1 py-0.5 rounded ml-1">K</kbd>
    </button>
  );
}
