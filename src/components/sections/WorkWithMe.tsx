"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const SERVICES = [
  {
    number: "01",
    title: "Research Collaboration",
    icon: "⬡",
    color: "#8B5CF6",
    tagline: "Co-authorship, domain expertise, or analytical support",
    offerings: [
      "AI and computer vision for construction progress monitoring",
      "BIM-based digital twin and site-data integration",
      "Functionally Graded Material (FGM) plate analysis",
      "ABAQUS parametric study design and execution",
      "Halpin-Tsai micromechanics modelling · CPT formulation",
    ],
    ideal: "Graduate supervisors · Research groups · PhD students · Conference papers",
    cta: "Collaborate",
  },
  {
    number: "02",
    title: "Structural Analysis & FEM",
    icon: "△",
    color: "#F59E0B",
    tagline: "From back-of-envelope to validated ABAQUS model",
    offerings: [
      "Finite Element Modeling (ABAQUS, SAP2000, STAAD.Pro)",
      "Buckling & vibration analysis of plates and frames",
      "Composite material structural assessment",
      "Seismic analysis & response spectrum evaluation",
      "Load combination checks per IS/ACI/Eurocode",
    ],
    ideal: "Engineering firms · Research labs · Thesis supervision · Design consultants",
    cta: "Request Analysis",
  },
  {
    number: "03",
    title: "Engineering Software & Dashboards",
    icon: "◳",
    color: "#3B82F6",
    tagline: "I turn your structural data into something you can actually use",
    offerings: [
      "Custom structural analysis web tools & simulators",
      "Real-time Structural Health Monitoring dashboards",
      "Data visualization for sensor networks & field data",
      "Automated FEM parametric study scripts (Python/MATLAB)",
      "Engineering calculators & code-compliance tools",
    ],
    ideal: "Infrastructure startups · Research institutes · Engineering firms · NGOs",
    cta: "Discuss Project",
  },
  {
    number: "04",
    title: "Technical Content & Education",
    icon: "▶",
    color: "#10B981",
    tagline: "Complex engineering, made unmistakably clear",
    offerings: [
      "Educational video scripts on structural concepts",
      "Technical blog posts and whitepapers",
      "FEM tutorial content for students",
      "Engineering explainers for non-technical audiences",
      "Course material development for universities",
    ],
    ideal: "EdTech platforms · Universities · YouTube channels · Engineering publications",
    cta: "Get In Touch",
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="rounded-2xl border border-[#1a1a1a] bg-[#0a0a0a] overflow-hidden group flex flex-col"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ borderColor: `${service.color}35`, backgroundColor: "var(--bg-ink)" }}
    >
      {/* Top accent bar */}
      <div className="h-1 w-full" style={{ backgroundColor: service.color }} />

      <div className="p-7 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <span
              className="text-xs font-mono"
              style={{ color: service.color }}
            >
              {service.number}
            </span>
            <div className="flex items-center gap-2.5 mt-1">
              <span className="text-2xl">{service.icon}</span>
              <h3 className="text-[#F5F5F5] font-bold text-lg leading-tight">
                {service.title}
              </h3>
            </div>
          </div>
        </div>

        <p className="text-[#525252] text-xs font-mono italic mb-5">
          &ldquo;{service.tagline}&rdquo;
        </p>

        {/* Offerings list */}
        <ul className="space-y-2 mb-6 flex-1">
          {service.offerings.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-[#A3A3A3] text-sm">
              <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: service.color }} />
              {item}
            </li>
          ))}
        </ul>

        {/* Ideal for */}
        <div className="mb-5 p-3 rounded-xl" style={{ background: `${service.color}08`, border: `1px solid ${service.color}15` }}>
          <p className="text-[10px] font-mono uppercase tracking-wider mb-1" style={{ color: service.color }}>
            Ideal for
          </p>
          <p className="text-[#525252] text-xs">{service.ideal}</p>
        </div>

        {/* CTA */}
        <button
          onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-bold transition-all group/btn"
          style={{
            background: `${service.color}10`,
            color: service.color,
            border: `1px solid ${service.color}25`,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = `${service.color}20`;
            (e.currentTarget as HTMLButtonElement).style.borderColor = `${service.color}50`;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = `${service.color}10`;
            (e.currentTarget as HTMLButtonElement).style.borderColor = `${service.color}25`;
          }}
        >
          {service.cta}
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

export default function WorkWithMe() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="work-with-me" ref={ref} className="section-padding bg-void relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#F59E0B 1px, transparent 1px), linear-gradient(90deg, #F59E0B 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-6"
        >
          <span className="section-label mb-4 inline-flex">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
            Work With Me
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7 }}
          >
            <h2 className="text-headline text-[#F5F5F5]">
              Open to Research <br />
              <span className="text-[#F59E0B]">Collaboration</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-4"
          >
            <p className="text-[#A3A3A3] text-base leading-relaxed">
              I sit at the intersection of civil engineering, computational methods, and AI for construction. Current work: verifying construction progress against BIM models using computer vision at CloudFactory. Research foundation: buckling and stability of FG-GRC composite plates under thermomechanical loading, NIT Rourkela.
            </p>
            <p className="text-[#525252] text-sm leading-relaxed">
              Whether you need a research collaborator, rigorous FEM analysis, a custom engineering tool, or domain expertise in AI-driven construction monitoring — I am available for the right work.
            </p>

            {/* Availability badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-[#8B5CF6]/25 bg-[#8B5CF6]/08">
              <span className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse" />
              <span className="text-[#8B5CF6] text-sm font-medium">
                Open to research collaborations and graduate opportunities
              </span>
            </div>
          </motion.div>
        </div>

        {/* Service cards */}
        <div className="grid md:grid-cols-2 gap-5 mb-16">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.number} service={s} index={i} />
          ))}
        </div>

        {/* Process strip */}
        <motion.div
          className="rounded-2xl border border-[#1a1a1a] p-7"
          style={{ background: "linear-gradient(135deg, var(--bg-ink) 0%, var(--bg-subtle) 100%)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          <p className="text-[#525252] text-xs font-mono uppercase tracking-widest mb-6 text-center">
            How it works
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { step: "01", label: "You email me", desc: "Describe what you need. No formal brief required — just the problem." },
              { step: "02", label: "We scope it", desc: "One call or async exchange. I'll tell you exactly what I can deliver and when." },
              { step: "03", label: "I build it", desc: "Analysis, code, content — delivered with full documentation and explanation." },
              { step: "04", label: "You own it", desc: "You get the files, the model, the code. No black boxes, no lock-in." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="text-2xl font-black text-[#F59E0B]/40 mb-2">{item.step}</div>
                <p className="text-[#F5F5F5] font-semibold text-sm mb-1">{item.label}</p>
                <p className="text-[#333] text-xs leading-snug">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#F59E0B] text-black text-sm font-black hover:bg-[#FBBF24] transition-all hover:shadow-[0_0_30px_rgba(245,158,11,0.4)]"
            >
              Start a Conversation <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
