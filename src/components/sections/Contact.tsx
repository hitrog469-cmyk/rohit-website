"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Send, ArrowUpRight, CheckCircle } from "lucide-react";

const GhIcon = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>;
const LiIcon = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
const YtIcon = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>;

const SOCIAL = [
  { icon: <GhIcon />, label: "GitHub", handle: "@hitrog469-cmyk", href: "https://github.com/hitrog469-cmyk" },
  { icon: <LiIcon />, label: "LinkedIn", handle: "rohitacharya45", href: "https://www.linkedin.com/in/rohitacharya45/" },
  { icon: <YtIcon />, label: "YouTube", handle: "Learners Club", href: "https://www.youtube.com/@learnersclub5910" },
  { icon: <Mail className="w-5 h-5" />, label: "Email", handle: "rohitofficial.ce@gmail.com", href: "mailto:rohitofficial.ce@gmail.com" },
];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("idle");
      alert("Something went wrong. Try emailing directly at rohitofficial.ce@gmail.com");
    }
  };

  return (
    <section id="contact" ref={ref} className="section-padding bg-void relative overflow-hidden">
      {/* Large glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(245,158,11,0.08) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16 text-center"
        >
          <span className="section-label mb-4 inline-flex">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
            Contact
          </span>
          <h2 className="text-headline text-[#F5F5F5] mt-4">
            Let&apos;s <span className="text-[#F59E0B]">Talk</span>
          </h2>

          {/* Availability */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#10B981]/10 border border-[#10B981]/25 text-[#10B981] text-sm">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              Open to research collaborations & opportunities
            </span>
            <span className="text-[#333] text-sm font-mono">
              Usually responds within 24 hours
            </span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left — form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-4"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[#525252] text-xs font-mono uppercase tracking-wider block mb-2">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl text-[#F5F5F5] text-sm placeholder-[#333] outline-none transition-all"
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border-muted)",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(245,158,11,0.5)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border-muted)")}
                />
              </div>
              <div>
                <label className="text-[#525252] text-xs font-mono uppercase tracking-wider block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl text-[#F5F5F5] text-sm placeholder-[#333] outline-none transition-all"
                  style={{ background: "var(--bg-surface)", border: "1px solid var(--border-muted)" }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(245,158,11,0.5)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border-muted)")}
                />
              </div>
            </div>

            <div>
              <label className="text-[#525252] text-xs font-mono uppercase tracking-wider block mb-2">
                Message
              </label>
              <textarea
                required
                rows={6}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about your project, collaboration, or question…"
                className="w-full px-4 py-3 rounded-xl text-[#F5F5F5] text-sm placeholder-[#333] outline-none resize-none transition-all"
                style={{ background: "var(--bg-surface)", border: "1px solid var(--border-muted)" }}
                onFocus={(e) => (e.target.style.borderColor = "rgba(245,158,11,0.5)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border-muted)")}
              />
            </div>

            <motion.button
              type="submit"
              disabled={status !== "idle"}
              className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
              style={{
                background: status === "sent" ? "#10B981" : "#F59E0B",
                color: "black",
              }}
              whileHover={status === "idle" ? { scale: 1.02, boxShadow: "0 0 30px rgba(245,158,11,0.4)" } : {}}
              whileTap={{ scale: 0.98 }}
            >
              {status === "idle" && (
                <>
                  <Send className="w-4 h-4" /> Send Message
                </>
              )}
              {status === "sending" && (
                <motion.div
                  className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
                />
              )}
              {status === "sent" && (
                <>
                  <CheckCircle className="w-4 h-4" /> Message Sent
                </>
              )}
            </motion.button>
          </motion.form>

          {/* Right — socials + info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <p className="text-[#A3A3A3] text-base leading-relaxed mb-8">
              Whether you have a research collaboration in mind, want to discuss
              structural engineering, need a builder for your project, or just want
              to connect. My inbox is open.
            </p>

            <div className="space-y-3 mb-10">
              {SOCIAL.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl group transition-all"
                  style={{ background: "var(--bg-ink)", border: "1px solid var(--border-default)" }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  whileHover={{ borderColor: "rgba(245,158,11,0.3)", backgroundColor: "var(--bg-surface)" }}
                >
                  <span className="text-[#525252] group-hover:text-[#F59E0B] transition-colors">
                    {s.icon}
                  </span>
                  <div className="flex-1">
                    <p className="text-[#F5F5F5] text-sm font-medium">{s.label}</p>
                    <p className="text-[#333] text-xs font-mono">{s.handle}</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#333] group-hover:text-[#F59E0B] transition-colors" />
                </motion.a>
              ))}
            </div>

            {/* CV download */}
            <motion.a
              href="/cv.pdf"
              download
              className="flex items-center justify-between p-5 rounded-2xl group"
              style={{
                background: "linear-gradient(135deg, rgba(245,158,11,0.08), rgba(245,158,11,0.03))",
                border: "1px solid rgba(245,158,11,0.2)",
              }}
              whileHover={{ borderColor: "rgba(245,158,11,0.5)", scale: 1.01 }}
            >
              <div>
                <p className="text-[#F5F5F5] font-semibold">Download CV</p>
                <p className="text-[#525252] text-xs font-mono mt-0.5">
                  PDF · Updated May 2026
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/30 flex items-center justify-center group-hover:bg-[#F59E0B] group-hover:border-[#F59E0B] transition-all">
                <ArrowUpRight className="w-4 h-4 text-[#F59E0B] group-hover:text-black transition-colors" />
              </div>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
