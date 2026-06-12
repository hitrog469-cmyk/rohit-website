"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/ui/Footer";

const NOW_DATA = {
  location: "Rourkela, Odisha, India",
  updated: "June 2026",
  working: [
    {
      title: "B.Tech Thesis — FG-GRC Plates",
      detail: "Writing up final findings on functionally graded graphene reinforced composite plate buckling. 200+ ABAQUS simulation runs, almost done.",
      tag: "Research",
      color: "#F59E0B",
      urgent: true,
    },
    {
      title: "This website",
      detail: "Building my personal site with Next.js, Three.js, and Framer Motion. Trying to make it feel like something, not just look like something.",
      tag: "Dev",
      color: "#8B5CF6",
      urgent: false,
    },
    {
      title: "IPL Analytics Model",
      detail: "Refining the XGBoost match prediction model. Currently at 67.3% accuracy. Testing new feature combinations.",
      tag: "ML",
      color: "#3B82F6",
      urgent: false,
    },
  ],
  reading: [
    { title: "Structures: Or Why Things Don't Fall Down", author: "J.E. Gordon", note: "Should be required reading for every civil engineering student. Gordon writes about stresses like they're living things." },
    { title: "The Goal", author: "Eliyahu Goldratt", note: "A novel about manufacturing. Recommended by a prof. Turns out the theory of constraints applies everywhere." },
  ],
  watching: [
    { what: "IPL 2024 replays", note: "Analyzing death-over patterns for the model." },
    { what: "3Blue1Brown — Essence of Linear Algebra", note: "Revisiting the fundamentals. FEM makes more sense when you truly understand eigenvectors." },
    { what: "Arrival (2016)", note: "Third time watching. Each time I understand why Amy Adams had to learn the alien language first." },
  ],
  thinking: [
    "Whether structural health monitoring will become standard on all major bridges in Nepal within my lifetime (I think: yes, but not fast enough).",
    "How much of machine learning is just linear algebra with better marketing.",
    "Whether to go to grad school or go back to Kathmandu and build something immediately after graduation.",
    "The relationship between graphene's hexagonal lattice and why FG-X distribution outperforms every other pattern. It's elegant. Like the universe is consistent about hexagons.",
  ],
  missing: [
    "Kathmandu monsoon — the smell of rain on old brick",
    "Momo from that place near Asan Tole",
    "The sound of the city at 6am when you can still hear birds",
    "My bed at home",
  ],
};

export default function NowPage() {
  return (
    <main className="min-h-screen bg-[#050505]">
      <Navigation />

      <div className="max-w-3xl mx-auto px-6 pt-28 pb-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#F59E0B]/40" />
            <span className="text-[#F59E0B] text-[10px] font-mono tracking-[0.5em]">PRESENT TENSE</span>
          </div>
          <h1
            className="text-[#F5F5F5] font-black mb-4"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", letterSpacing: "-0.03em" }}
          >
            Now.
          </h1>
          <p className="text-[#525252] text-base leading-relaxed max-w-lg">
            A snapshot of what I&apos;m doing right now. Updated occasionally — when the present feels worth recording.
          </p>
          <div className="flex items-center gap-4 mt-5 text-xs font-mono">
            <span className="text-[#333]"><span className="text-[#F59E0B]/60">◎</span> {NOW_DATA.location}</span>
            <span className="text-[#222]">·</span>
            <span className="text-[#333]">Updated {NOW_DATA.updated}</span>
          </div>
          <div className="h-px bg-gradient-to-r from-[#F59E0B]/25 via-[#F59E0B]/8 to-transparent mt-6" />
        </motion.div>

        {/* Currently Working On */}
        <Section title="Currently working on" icon="▶" delay={0.1}>
          <div className="space-y-4">
            {NOW_DATA.working.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.08 }}
                className="flex gap-4 p-4 rounded-xl border border-[#111] bg-[#0a0a0a] relative overflow-hidden group hover:border-[#1a1a1a] transition-colors"
              >
                {item.urgent && (
                  <div className="absolute top-0 left-0 bottom-0 w-0.5 bg-[#F59E0B]/60" />
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[#F5F5F5] font-semibold text-sm">{item.title}</span>
                    {item.urgent && (
                      <span className="text-[9px] font-mono text-[#F59E0B] border border-[#F59E0B]/30 px-1.5 py-0.5 rounded">ACTIVE</span>
                    )}
                  </div>
                  <p className="text-[#525252] text-xs leading-relaxed">{item.detail}</p>
                </div>
                <span
                  className="text-xs font-mono shrink-0 px-2 py-1 rounded border h-fit"
                  style={{ color: item.color, borderColor: `${item.color}25`, background: `${item.color}08` }}
                >
                  {item.tag}
                </span>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Reading */}
        <Section title="Reading" icon="◫" delay={0.3}>
          <div className="space-y-4">
            {NOW_DATA.reading.map((book, i) => (
              <motion.div
                key={book.title}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + i * 0.08 }}
                className="p-4 rounded-xl border border-[#111] bg-[#0a0a0a]"
              >
                <div className="text-[#F5F5F5] text-sm font-semibold mb-0.5">{book.title}</div>
                <div className="text-[#444] text-xs font-mono mb-2">by {book.author}</div>
                <p className="text-[#525252] text-xs leading-relaxed italic">&ldquo;{book.note}&rdquo;</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Watching */}
        <Section title="Watching / consuming" icon="◉" delay={0.45}>
          <div className="space-y-3">
            {NOW_DATA.watching.map((item, i) => (
              <motion.div
                key={item.what}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.07 }}
                className="flex gap-3 py-3 border-b border-[#0d0d0d] last:border-0"
              >
                <span className="text-[#F59E0B]/30 text-xs font-mono pt-0.5 w-4 shrink-0">▸</span>
                <div>
                  <div className="text-[#A3A3A3] text-sm font-medium">{item.what}</div>
                  <div className="text-[#444] text-xs mt-0.5 leading-relaxed">{item.note}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Thinking About */}
        <Section title="Thinking about" icon="⬡" delay={0.6}>
          <div className="space-y-3">
            {NOW_DATA.thinking.map((thought, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.65 + i * 0.07 }}
                className="flex gap-3"
              >
                <span className="text-[#222] text-xs font-mono pt-1 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-[#525252] text-sm leading-relaxed">{thought}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Missing */}
        <Section title="Missing from home" icon="◎" delay={0.75}>
          <div className="grid grid-cols-2 gap-3">
            {NOW_DATA.missing.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.06 }}
                className="p-3 rounded-xl bg-[#0a0a0a] border border-[#0d0d0d] text-[#444] text-xs leading-relaxed"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Closing */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="mt-16 pt-8 border-t border-[#111]"
        >
          <p className="text-[#222] text-xs font-mono text-center mb-6">
            Inspired by <a href="https://nownownow.com" target="_blank" rel="noopener" className="text-[#2a2a2a] hover:text-[#444] transition-colors">nownownow.com</a> — a movement of people with &apos;/now&apos; pages.
          </p>
          <div className="flex items-center justify-center gap-6 text-xs font-mono">
            <Link href="/" className="text-[#333] hover:text-[#F59E0B] transition-colors">← Home</Link>
            <Link href="/stack" className="text-[#333] hover:text-[#F59E0B] transition-colors">My Stack →</Link>
            <Link href="/codex" className="text-[#F59E0B]/40 hover:text-[#F59E0B] transition-colors">◈ Codex</Link>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}

function Section({
  title,
  icon,
  delay,
  children,
}: {
  title: string;
  icon: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="mb-14"
    >
      <h2 className="text-[#F5F5F5] font-bold text-base mb-5 flex items-center gap-3">
        <span className="text-[#F59E0B]/50 text-sm">{icon}</span>
        {title}
      </h2>
      {children}
    </motion.div>
  );
}
