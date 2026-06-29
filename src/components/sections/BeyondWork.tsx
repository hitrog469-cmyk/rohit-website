"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const FUN_FACTS = [
  { front: "Can explain FEM to a 10 year old", back: "Springs, nodes, and a rubber duck" },
  { front: "Rohit Sharma or no one", back: "The Hitman's pull shot is just applied momentum." },
  { front: "Bayern Munich & Joshua Kimmich", back: "Pressing, positioning, pure football IQ." },
  { front: "हर हर महादेव", back: "Faith from Baglung. Carried everywhere." },
  { front: "District topper from Baglung", back: "A small hill town near Dhaulagiri. Proud of it." },
  { front: "Dad worked in the Gulf. I worked at NIT.", back: "Different kinds of hard. Same mission." },
];

function FlipCard({ front, back, delay }: { front: string; back: string; delay: number }) {
  const [flipped, setFlipped] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="relative h-28 cursor-pointer"
      style={{ perspective: 1000 }}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      onClick={() => setFlipped(!flipped)}
    >
      <motion.div
        className="w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-xl flex items-center justify-center p-4 text-center"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            background: "var(--bg-surface)",
            border: "1px solid var(--border-muted)",
          }}
        >
          <p className="text-[#F5F5F5] text-sm font-medium leading-snug">{front}</p>
        </div>
        {/* Back */}
        <div
          className="absolute inset-0 rounded-xl flex items-center justify-center p-4 text-center"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "linear-gradient(135deg, rgba(245,158,11,0.12), rgba(245,158,11,0.05))",
            border: "1px solid rgba(245,158,11,0.3)",
          }}
        >
          <p className="text-[#F59E0B] text-sm font-medium leading-snug">{back}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

const PERSONALITY = [
  {
    icon: "◉",
    title: "Cricket",
    sub: "Medium-pace bowler · Weekend warrior",
    desc: "Plays every Sunday. Rohit Sharma fan. The Hitman's pull shot is pure mechanics at work. Has a theory that bowling is applied physics. The crease is the lab.",
    color: "#10B981",
  },
  {
    icon: "◎",
    title: "Football",
    sub: "Bayern Munich · Joshua Kimmich",
    desc: "Grew up watching football and fell completely in love with the pressing, the passing lanes, the intelligence of it. Kimmich's ability to read the game is something I think about way more than I should.",
    color: "#3B82F6",
  },
  {
    icon: "▤",
    title: "Learners Club",
    sub: "300+ videos · 3,000+ subscribers",
    desc: "Co-founded during COVID-19 lockdown with two school friends. We uploaded 300+ videos teaching high school physics, chemistry, and maths to students who needed it. On hold now. The mission isn't over.",
    color: "#8B5CF6",
  },
  {
    icon: "△",
    title: "Baglung → Kathmandu",
    sub: "From the hills. Built in the city.",
    desc: "Grew up in Baglung, a small district near Dhaulagiri in western Nepal. Moved to Kathmandu for +2, then to India for engineering. The mountains, the terraces, the pace of a smaller city shaped how I see everything, including structures.",
    color: "#F59E0B",
  },
  {
    icon: "✦",
    title: "हर हर महादेव",
    sub: "Faith · Nepal · Roots",
    desc: "Grew up with Mahadev as part of the furniture. The temples in Baglung, the rituals my parents kept. I'm not religious in a strict sense. But there's something about believing in something larger than yourself that makes you a better engineer, and a better human.",
    color: "#EF4444",
  },
];

const FAILURES = [
  {
    num: "01",
    year: "2015",
    tag: "FAMILY",
    tagColor: "#EF4444",
    title: "My father gave everything he had so I could have a shot.",
    hook: "He worked Gulf security for years. Sent money home. Never complained. That's the foundation everything else is built on.",
    story: [
      "My dad worked security in Bahrain. Then Saudi Arabia. Then Dubai. Years of his life in someone else's country, doing night shifts, sending money home so that his sons could eat, study, become something he didn't get to be. He never made a scene about it. It was just what the situation required, and he did it.",
      "In 2015, a health issue brought him back to Nepal. The Gulf doesn't hold your spot when you leave. For a stretch of time he was selling phone recharge cards to keep the household going. Ten rupees at a time. I was in school. I was watching. And every morning when I sat down to study, I knew exactly what was funding that moment, and who.",
      "He's now a bank security guard in Kathmandu. Still steady. Still going. The man has never once asked me to make him proud out loud. I've always known what's at stake.",
    ],
    turned: "That clarity is the engine. Not pressure, not guilt. Direction. Every exam I sat, every project I built, every late night I chose to keep going connects back to what I watched my father do without ever asking for recognition. I want to build a life that's worth what he paid for it. That's a clear enough reason to work hard.",
    color: "#EF4444",
  },
  {
    num: "02",
    year: "2015",
    tag: "PURPOSE",
    tagColor: "#3B82F6",
    title: "I watched Kathmandu collapse on a phone screen. That afternoon gave me my reason.",
    hook: "April 25, 2015. The city I was heading toward was falling in real time. I was 200km away with nothing to give.",
    story: [
      "I was in Baglung when the earthquake hit. Our area was shaken but we were among the fortunate. Structures cracked, people frightened, but no one in my immediate circle was lost. In the scale of that disaster, we were lucky.",
      "But on my phone: Dharahara was falling. Balkhu, the neighbourhood I'd move to for +2 where my school would later be, was on the news. Buildings I'd been to, a city I was heading toward, reduced to footage. 9,000 people died. My family was trying to reach each other. Lines were jammed. I was thirteen years old, in Baglung, with nothing to do except watch and pray.",
      "That specific feeling of being physically safe while somewhere you love falls apart doesn't leave you. I had no knowledge, no tools, nothing to give. Just a phone screen and the sudden, very clear understanding that buildings are not permanent. That the structures people trust with their lives can and do fail.",
    ],
    turned: "I chose structural engineering because of that afternoon. Not the heroic version, just the honest one. I want to understand why buildings fail so I can help build better ones. Every seismic paper I read, every finite element model I run, every plate analysis I write: April 25 is somewhere in the foundation. That day gave my work a reason that goes far beyond a degree.",
    color: "#3B82F6",
  },
  {
    num: "03",
    year: "2018",
    tag: "FIRST LEAP",
    tagColor: "#10B981",
    title: "I left Baglung for Kathmandu at thirteen. I knew no one in that city.",
    hook: "The capital was the first big bet I placed on myself. Overwhelming, clarifying, necessary.",
    story: [
      "After topping the district at Grade 10, the next move was clear: Kathmandu for the +2 science programme at Bernhardt Secondary School in Balkhu. Good school. Big city. And I had no social network there, no family nearby, no map beyond the hostel address.",
      "Going from a town where everyone knew my name to a classroom where I was just another student required a real recalibration. I had to learn how to build structure for myself when no one was checking on me. How to study without the familiar environment. How to make a new place feel like somewhere you belong rather than just somewhere you're surviving.",
      "I adjusted. Made friends. Found my footing. Got 3.85 GPA out of 4.0. But what Kathmandu gave me beyond the grade was the capacity for independence. The confidence that I could land in an unfamiliar place and figure it out. That proved useful in Rourkela. It will prove useful wherever I go next.",
    ],
    turned: "Every move I've made has been a version of the same bet: leave the familiar room for the bigger one. Kathmandu prepared me for India. Each time you do it, it gets slightly less terrifying and slightly more second nature. The willingness to uproot, adapt, and rebuild is probably the most transferable skill I have.",
    color: "#10B981",
  },
  {
    num: "04",
    year: "2021",
    tag: "IDENTITY",
    tagColor: "#F59E0B",
    title: "I arrived at NIT as the district topper. The lecture hall had different information.",
    hook: "I had a certificate that said I was the best. That certificate was not going to help me here.",
    story: [
      "In Baglung and at Bernhardt, I was the person who had things figured out. 3.95 GPA, district topper, the one people pointed to. I'd earned that identity through real work, and I carried it to Rourkela.",
      "NIT reshaped things quickly. The students around me had come through Kota coaching centres, cracked JEE, spent years drilling problems I was seeing for the first time. First semester, I sat in Structural Analysis and genuinely followed maybe a third of it. Too proud to raise my hand in the early weeks, so I ground through those months alone at night, rebuilding foundations from scratch.",
      "It took about a year to find my footing. Once I did, something became clear: curiosity, cross-disciplinary thinking, research instinct. These were real assets that hadn't been produced in everyone around me by the coaching-centre path. The early gap wasn't a ceiling. It was the opening chapter of a different kind of preparation.",
    ],
    turned: "Being the best in a smaller room is not the same as being ready for a bigger one. That first year forced me to become a genuine student again — uncertain, humble, hungry to understand rather than to look like I already did. That process built the researcher I became. Not the certificate. The willingness to start over.",
    color: "#F59E0B",
  },
  {
    num: "05",
    year: "2021–25",
    tag: "GROWTH",
    tagColor: "#8B5CF6",
    title: "At NIT I said yes to everything. That grew me, and stretched me thin.",
    hook: "Four years of clubs, responsibilities, research, and Learners Club on the side. I wanted all of it. I couldn't always deliver on all of it.",
    story: [
      "I didn't go to NIT to just study. I was involved. Student activities, events, helping juniors, lab work, the thesis, building Learners Club from Kathmandu. I wanted to understand what the institution had to offer beyond the syllabus, and I said yes to most things that came my way.",
      "That approach built things in me I'm genuinely grateful for: how to manage competing demands, how to show up for people while delivering on your own work, how to lead small things and follow in larger ones, how to fail fast and extract the lesson. Four years of doing too much produced a more capable person than four years of playing it safe would have.",
      "But there were also stretches where I was spread too thin. Commitments I under-delivered on. Projects I half-finished. Moments where I was present in too many places at once and fully present in none. Learning to distinguish between what's important and what just feels urgent took longer than it should have.",
    ],
    turned: "Being ambitious about what you take on and being ruthless about what you protect are not contradictions. They work together. I learned that the hard way. The person who came out of four years of doing too much is more capable than the person who played it safe would have been. But focus is a skill, not a limitation. I'm still building it.",
    color: "#8B5CF6",
  },
  {
    num: "06",
    year: "2020–25",
    tag: "MISSION",
    tagColor: "#10B981",
    title: "We built Learners Club during COVID. Keeping it going while at NIT was a different challenge.",
    hook: "300 videos. 3,000 subscribers. Students who needed it. The mission was real. It still is.",
    story: [
      "COVID-19 lockdown, 2020. Three school friends in Kathmandu, no classes, and a clear problem: high school students across Nepal had lost access to teachers overnight. So we built Learners Club, a YouTube channel teaching physics, chemistry, and maths. We didn't wait for permission. We just started.",
      "It worked better than we expected. 300+ videos. 3,000+ subscribers. Comments from students saying they finally understood topics they'd been stuck on for weeks. We weren't chasing numbers. We were solving a real problem with what we had. It was the most purposeful thing I'd been part of.",
      "Then NIT started and the time compressed — four years of coursework, lab work, thesis research, and everything else. Uploading consistently became uploading occasionally, then rarely. The channel didn't end dramatically. It just got quieter. I'd check it sometimes and feel the recognition that something unfinished was waiting for me.",
    ],
    turned: "Learners Club is unfinished business, not a closed chapter. The mission of making quality education accessible to students who don't have the coaching-centre path is still exactly right. The research background I built at NIT only makes me more equipped to deliver on it. Getting back to it is a matter of when, not if.",
    color: "#10B981",
  },
  {
    num: "07",
    year: "2025",
    tag: "BECOMING",
    tagColor: "#F97316",
    title: "I came back to Kathmandu at 22. The person who returned wasn't the one who left.",
    hook: "Four years in India changed how I think, what I expect, who I am. Coming home and recalibrating — that takes its own kind of work.",
    story: [
      "I left Kathmandu at eighteen. Came back at twenty-two with a degree, a research background, and a very different relationship with my own capabilities and expectations.",
      "My family was the same. The city was mostly the same. But I had changed in ways that took time to fully see. I thought differently. I expected different things from work, from conversations, from myself. There was a recalibration period: finding how the person I'd become fits back into the place and the people I love.",
      "I also saw things I'd been too young to fully see before. My parents were older. The sacrifices they'd made were more legible now that I had some life experience to read them through. The responsibility — to make something of what they'd given me — settled differently. Not heavier. More clearly mine.",
    ],
    turned: "Returning wasn't the end of something. It was a reorientation. I know now that wherever I go next, whether research, further study, or building things, I want it to connect back to here. Not to stay, but to build something that the place I came from can be part of. That's a cleaner ambition than just leaving and not looking back.",
    color: "#F97316",
  },
  {
    num: "08",
    year: "2025–now",
    tag: "THE REAL WORK",
    tagColor: "#A855F7",
    title: "Graduation was the beginning. The chapter after is the one that counts.",
    hook: "Everyone had a plan for the morning after. Mine is still being written — intentionally.",
    story: [
      "The imagined version of post-graduation: a clear next step, a research fellowship, forward momentum. The actual version: a full-time job because earning mattered and I knew it mattered. A family to pull weight for, responsibilities that were mine to carry. I made that decision with my eyes open.",
      "There was still a gap between the imagined trajectory and the real one. I'd spent four years building toward something. Coming back and operating at a different pace than I'd pictured required some adjustment.",
      "What I've realised over the time since: the messy middle is where most of the important formation happens. The thesis proved I could do the research. Now I'm building the broader platform — the discipline, the direction, the work ethic — that makes the next opportunity worth taking when it arrives. That's what this chapter is actually for.",
    ],
    turned: "The research is coming. The next leap is coming. I'm building toward it methodically, not frantically. The gap between people who get where they're going and people who don't is rarely talent — it's consistency through the chapters that don't look impressive from the outside. This is one of those chapters, and I'm using it.",
    color: "#A855F7",
  },
];

export default function BeyondWork() {
  const ref = useRef<HTMLElement>(null);
  const failuresRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const failuresInView = useInView(failuresRef, { once: true, margin: "-40px" });
  const [expandedFailure, setExpandedFailure] = useState<number | null>(null);

  return (
    <section id="beyond" ref={ref} className="section-padding bg-ink relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at 20% 50%, rgba(245,158,11,0.05) 0%, transparent 60%), radial-gradient(ellipse 60% 60% at 80% 80%, rgba(139,92,246,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16"
        >
          <span className="section-label mb-4 inline-flex">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
            Beyond Work
          </span>
          <h2 className="text-headline text-[#F5F5F5] mt-4">
            The <span className="text-[#F59E0B]">Full Human</span>
          </h2>
          <p className="text-[#525252] mt-3 text-base max-w-md">
            Engineering is what I do. Everything below is who I am.
          </p>
        </motion.div>

        {/* Personality grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {PERSONALITY.map((item, i) => (
            <motion.div
              key={item.title}
              className="rounded-2xl p-6 flex gap-5 group"
              style={{ background: "var(--bg-ink)", border: "1px solid var(--border-default)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.6 }}
              whileHover={{ borderColor: `${item.color}30`, backgroundColor: "var(--bg-surface)" }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 transition-all duration-300"
                style={{ background: `${item.color}10`, border: `1px solid ${item.color}20` }}
              >
                {item.icon}
              </div>
              <div>
                <h3 className="text-[#F5F5F5] font-bold text-base">{item.title}</h3>
                <p className="text-xs font-mono mt-0.5 mb-2" style={{ color: item.color }}>
                  {item.sub}
                </p>
                <p className="text-[#525252] text-sm leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fun facts flip cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mb-20"
        >
          <p className="text-[#333] text-xs font-mono tracking-widest uppercase mb-5 text-center">
            — click to flip —
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {FUN_FACTS.map((fact, i) => (
              <FlipCard key={i} {...fact} delay={0.1 + i * 0.07} />
            ))}
          </div>
        </motion.div>

        {/* ── Failures section ── */}
        <div ref={failuresRef} id="failures-personal">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={failuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="mb-14"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px flex-1 max-w-[2rem]" style={{ background: "rgba(245,158,11,0.4)" }} />
              <span className="text-[9px] font-mono tracking-[0.5em] text-[#F59E0B]">WHAT BROKE ME — WHAT BUILT ME</span>
            </div>
            <h3
              className="font-black leading-none mb-6"
              style={{ fontSize: "clamp(2rem, 6vw, 4rem)", letterSpacing: "-0.03em", color: "var(--text-primary)" }}
            >
              My failures are<br />
              my <span style={{ color: "var(--amber)" }}>credentials.</span>
            </h3>
            <p className="text-[#525252] text-base max-w-2xl leading-relaxed">
              These aren&apos;t humble-brag setbacks. They hurt. Some of them still do.
              I&apos;m putting them here because I&apos;m done pretending my path was clean.
              It wasn&apos;t. Click any one.
            </p>
          </motion.div>

          {/* Failure entries — editorial layout */}
          <div className="space-y-0">
            {FAILURES.map((f, i) => {
              const isOpen = expandedFailure === i;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  animate={failuresInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.07, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                  style={{
                    borderTop: `1px solid ${isOpen ? f.color + "35" : "var(--border-muted)"}`,
                    transition: "border-color 0.4s",
                  }}
                >
                  {/* Clickable header row */}
                  <button
                    className="w-full text-left group"
                    onClick={() => setExpandedFailure(isOpen ? null : i)}
                  >
                    <div
                      className="relative py-8 md:py-10 px-2 overflow-hidden"
                      style={{ transition: "background 0.3s" }}
                    >
                      {/* Watermark number — massive background */}
                      <span
                        className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none font-black leading-none"
                        style={{
                          fontSize: "clamp(6rem, 14vw, 10rem)",
                          color: f.color,
                          opacity: isOpen ? 0.07 : 0.04,
                          transition: "opacity 0.3s",
                          letterSpacing: "-0.05em",
                          lineHeight: 1,
                        }}
                      >
                        {f.num}
                      </span>

                      <div className="relative z-10 flex items-start justify-between gap-6 md:gap-12">
                        <div className="flex-1 min-w-0">
                          {/* Meta row: year + tag */}
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-[10px] font-mono text-[#404040] tracking-widest">{f.year}</span>
                            <span
                              className="text-[9px] font-mono tracking-[0.35em] px-2 py-0.5 rounded-sm"
                              style={{ color: f.color, background: `${f.color}12`, border: `1px solid ${f.color}25` }}
                            >
                              {f.tag}
                            </span>
                          </div>

                          {/* Title */}
                          <h4
                            className="font-black leading-tight mb-3 transition-opacity duration-200 group-hover:opacity-80"
                            style={{
                              fontSize: "clamp(1.15rem, 2.8vw, 1.6rem)",
                              letterSpacing: "-0.025em",
                              color: "var(--text-primary)",
                            }}
                          >
                            {f.title}
                          </h4>

                          {/* Hook — always visible */}
                          <p
                            className="text-sm leading-relaxed"
                            style={{ color: isOpen ? "#737373" : "#525252", transition: "color 0.3s" }}
                          >
                            {f.hook}
                          </p>
                        </div>

                        {/* Toggle */}
                        <div className="shrink-0 mt-2">
                          <motion.div
                            animate={{ rotate: isOpen ? 45 : 0 }}
                            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{
                              background: isOpen ? `${f.color}18` : "transparent",
                              border: `1px solid ${isOpen ? f.color + "50" : "var(--border-muted)"}`,
                              transition: "background 0.3s, border-color 0.3s",
                            }}
                          >
                            <span
                              className="text-base leading-none"
                              style={{ color: isOpen ? f.color : "#404040", transition: "color 0.3s" }}
                            >
                              +
                            </span>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Expanded: full essay */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <div className="pb-10 px-2">
                          {/* Left accent bar + story */}
                          <div
                            className="pl-5 md:pl-8 mb-8"
                            style={{ borderLeft: `2px solid ${f.color}40` }}
                          >
                            {/* Story paragraphs */}
                            <div className="space-y-4 mb-0">
                              {f.story.map((para, pi) => (
                                <p
                                  key={pi}
                                  className="leading-[1.9] text-[0.95rem]"
                                  style={{ color: pi === 0 ? "#A3A3A3" : "#737373" }}
                                >
                                  {para}
                                </p>
                              ))}
                            </div>
                          </div>

                          {/* The lesson — visually separated */}
                          <div
                            className="rounded-xl p-5 md:p-6"
                            style={{
                              background: `${f.color}07`,
                              border: `1px solid ${f.color}20`,
                            }}
                          >
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-4 h-px" style={{ background: f.color }} />
                              <span className="text-[9px] font-mono tracking-[0.45em]" style={{ color: f.color }}>
                                WHAT IT COST. WHAT IT TAUGHT.
                              </span>
                            </div>
                            <p className="text-sm leading-[1.85]" style={{ color: "#A3A3A3" }}>
                              {f.turned}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}

            {/* Closing rule */}
            <div style={{ borderTop: "1px solid var(--border-muted)" }} />
          </div>

          {/* Closing block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={failuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.0, duration: 0.7 }}
            className="mt-16 rounded-2xl p-8 md:p-10"
            style={{
              background: "linear-gradient(135deg, rgba(245,158,11,0.05) 0%, rgba(245,158,11,0.02) 100%)",
              border: "1px solid rgba(245,158,11,0.15)",
            }}
          >
            <p
              className="font-black leading-tight mb-4"
              style={{ fontSize: "clamp(1.4rem, 3.5vw, 2.2rem)", letterSpacing: "-0.02em", color: "var(--text-primary)" }}
            >
              The path was not straight. It was mine.
            </p>
            <p className="text-[#A3A3A3] text-base leading-relaxed max-w-2xl mb-6">
              Every chapter above, the hard ones, the uncertain ones, the ones that required rebuilding from scratch, produced something the easy path couldn&apos;t have. A district topper from Baglung who learned to be a genuine student. An engineer who knows exactly why the work matters. Someone who has moved between cities and countries and rebuilt himself each time.
            </p>
            <p className="text-[#A3A3A3] text-base leading-relaxed max-w-2xl mb-8">
              I&apos;m not done. The research chapter, the Learners Club chapter, whatever comes next: those are all still ahead. <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>But the foundation is real. Built from Baglung. Tested at NIT. Still going.</span>
            </p>
            <div className="flex items-center gap-3">
              <div className="h-px w-8" style={{ background: "rgba(245,158,11,0.5)" }} />
              <p className="text-[#525252] text-xs font-mono tracking-[0.4em]">SON OF A SECURITY GUARD. BUILT IN BAGLUNG. NOT DONE YET.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
