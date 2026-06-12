"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const BELIEFS = [
  {
    n: "01",
    statement: "Engineering without software is archaeology.",
    expand: "The tools have changed. Knowing FEM theory but not being able to automate 200 parametric runs is like knowing structural mechanics but refusing to use a calculator.",
  },
  {
    n: "02",
    statement: "Data reveals what intuition misses — and confirms what intuition gets right.",
    expand: "I watched cricket for years before I ran the numbers. The data mostly confirmed my gut. But the 20% it didn't — that's where real understanding lives.",
  },
  {
    n: "03",
    statement: "The best structures fail gracefully. So should plans.",
    expand: "Ductility over brittleness, always. In steel, in code, in life. A plan that shatters at the first load case was never a good plan.",
  },
  {
    n: "04",
    statement: "Nepal's infrastructure problems aren't technical. They're organizational.",
    expand: "We have the engineering knowledge. We lack the systems to apply it at scale: data pipelines, enforcement mechanisms, engineers who can code their way through bureaucracy.",
  },
  {
    n: "05",
    statement: "If you can't explain your research to a 12-year-old, you don't fully understand it yet.",
    expand: "FG-GRC plates: graphene-laced panels that are stronger where they need to be. That's it. The math took 3 years. The sentence took 5 minutes. Both matter.",
  },
  {
    n: "06",
    statement: "Build things that will outlast you.",
    expand: "I want to design structures that stand for 100 years. Write software that runs for 10 without me touching it. Leave Nepal better-equipped than I found it.",
  },
];

export default function ManifestoSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 px-6 md:px-12 bg-[#050505]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-[#F59E0B]/40" />
            <span className="text-[#F59E0B] text-[10px] font-mono tracking-[0.5em]">HOW I THINK</span>
          </div>
          <h2
            className="text-[#F5F5F5] font-black text-3xl md:text-4xl mb-4"
            style={{ letterSpacing: "-0.02em" }}
          >
            The engineer&apos;s code.
          </h2>
          <p className="text-[#525252] text-base max-w-lg leading-relaxed">
            Six working principles — formed through thesis simulations, data analysis, and growing up in a country that needs more from its engineers.
          </p>
        </motion.div>

        <div className="space-y-0">
          {BELIEFS.map((b, i) => (
            <motion.div
              key={b.n}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="group border-b border-[#0d0d0d] py-8"
            >
              <div className="flex gap-6 md:gap-10">
                <span className="text-[#1e1e1e] group-hover:text-[#F59E0B]/25 font-mono text-sm transition-colors duration-300 shrink-0 pt-0.5 w-8 select-none">
                  {b.n}
                </span>
                <div className="flex-1">
                  <p className="text-[#D4D4D4] text-lg md:text-xl font-semibold leading-snug group-hover:text-white transition-colors duration-200 mb-3">
                    &ldquo;{b.statement}&rdquo;
                  </p>
                  <p className="text-[#444] group-hover:text-[#525252] text-sm leading-relaxed transition-colors duration-300">
                    {b.expand}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
