"use client";

import { motion } from "framer-motion";

/**
 * An engineering dimension line — the |←— label —→| annotation
 * from structural drawings, used as a section divider.
 */
export default function DimensionLine({ label }: { label: string }) {
  return (
    <div className="relative flex items-center justify-center py-2 px-6 select-none" aria-hidden>
      <motion.div
        className="flex items-center w-full max-w-2xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.8 }}
      >
        {/* Left extension tick + arrow */}
        <div className="w-px h-4 bg-[#F59E0B]/30" />
        <svg width="10" height="8" viewBox="0 0 10 8" className="shrink-0 -ml-px">
          <path d="M10 4 L2 4 M2 4 L7 1 M2 4 L7 7" stroke="#F59E0B" strokeOpacity="0.35" strokeWidth="1" fill="none" />
        </svg>
        <motion.div
          className="flex-1 h-px bg-[#F59E0B]/25"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
        <span className="px-3 text-[9px] font-mono tracking-[0.35em] text-[#F59E0B]/45 uppercase whitespace-nowrap">
          {label}
        </span>
        <motion.div
          className="flex-1 h-px bg-[#F59E0B]/25"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
        <svg width="10" height="8" viewBox="0 0 10 8" className="shrink-0 -mr-px">
          <path d="M0 4 L8 4 M8 4 L3 1 M8 4 L3 7" stroke="#F59E0B" strokeOpacity="0.35" strokeWidth="1" fill="none" />
        </svg>
        <div className="w-px h-4 bg-[#F59E0B]/30" />
      </motion.div>
    </div>
  );
}
