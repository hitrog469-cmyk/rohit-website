"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type LockState = "boot" | "typing" | "ready" | "analyzing" | "granted" | "compassionate";

const GLOBAL_EGGS: Record<string, string> = {
  sudo: "ROOT PRIVILEGES DETECTED. BYPASSING ALL SECURITY LAYERS.",
  please: "POLITENESS PROTOCOL ENGAGED. RARE INPUT. ACCEPTED.",
  rohit: "MASTER KEY RECOGNIZED. CREATOR ACCESS. WELCOME HOME.",
  "42": "THE ANSWER TO LIFE, UNIVERSE & EVERYTHING WORKS HERE TOO.",
  "open sesame": "ANCIENT PROTOCOL ACCEPTED. ALI BABA WOULD BE PROUD.",
  enter: "DIRECT ENTRY COMMAND RECEIVED. EXECUTING.",
  skip: "CURIOSITY IS ITS OWN KEY. ENTERING.",
  help: "THERE IS NO HELP. JUST TYPE SOMETHING AND PRESS ENTER.",
  password: "REALLY? 'password'? GRANTING FOR SHEER AUDACITY.",
  admin: "ADMIN OVERRIDE ACCEPTED. LOGGING THIS.",
  root: "ROOT ACCESS. IMPRESSIVE INSTINCT.",
  yes: "AFFIRMATIVE INPUT ACCEPTED. PROCEEDING.",
  no: "PARADOX DETECTED — DENIED MEANS ENTERING. GRANTED.",
  "": "VOID INPUT DETECTED. THE EMPTY SET IS VALID. GRANTED.",
  idk: "HONESTY IS A FORM OF INTELLIGENCE. ACCESS GRANTED.",
  "i don't know": "SOCRATIC AWARENESS DETECTED. GRANTED.",
  "hm": "CONTEMPLATION DETECTED. ACCESS GRANTED.",
  lol: "HUMOR PROTOCOL ENGAGED. GRANTED.",
  wtf: "APPROPRIATE REACTION. GRANTED.",
};

const BOOT_LINES = [
  "NITR RESEARCH NETWORK — RESTRICTED SYSTEM v2.1",
  "INITIALIZING CIPHER LOCK PROTOCOL...",
  "LOADING CHALLENGE DATABASE...",
  "BIOMETRIC SCAN: BYPASSED (WEB LIMITATION)",
  "CHALLENGE MODE: ACTIVE",
];

export default function CipherLock({
  chamberCode,
  chamberName,
  question,
  hint,
  correctAnswers,
  extraEggs,
  onUnlock,
}: {
  chamberCode: string;
  chamberName: string;
  question: string;
  hint: string;
  correctAnswers: string[];
  extraEggs?: Record<string, string>;
  onUnlock: () => void;
}) {
  const [state, setState] = useState<LockState>("boot");
  const [bootLine, setBootLine] = useState(0);
  const [displayedQ, setDisplayedQ] = useState("");
  const [input, setInput] = useState("");
  const [grantMsg, setGrantMsg] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Boot sequence
  useEffect(() => {
    if (state !== "boot") return;
    if (bootLine < BOOT_LINES.length) {
      const t = setTimeout(() => setBootLine(b => b + 1), 280);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setState("typing"), 300);
      return () => clearTimeout(t);
    }
  }, [state, bootLine]);

  // Typewriter for question
  useEffect(() => {
    if (state !== "typing") return;
    let i = 0;
    const iv = setInterval(() => {
      setDisplayedQ(question.slice(0, i + 1));
      i++;
      if (i >= question.length) {
        clearInterval(iv);
        setState("ready");
        setTimeout(() => inputRef.current?.focus(), 80);
      }
    }, 28);
    return () => clearInterval(iv);
  }, [state, question]);

  const handleSubmit = useCallback(() => {
    if (state !== "ready") return;
    const val = input.trim().toLowerCase();
    setState("analyzing");

    const allEggs = { ...GLOBAL_EGGS, ...(extraEggs ?? {}) };
    const correct = correctAnswers.some(a => a.toLowerCase() === val);
    const egg = allEggs[val];

    setTimeout(() => {
      if (correct) {
        setIsCorrect(true);
        setGrantMsg("ACCESS GRANTED");
        setState("granted");
      } else if (egg) {
        setIsCorrect(true);
        setGrantMsg(egg + "\n\nACCESS GRANTED.");
        setState("granted");
      } else {
        setIsCorrect(false);
        const correct_ans = correctAnswers[0];
        setGrantMsg(
          `INCORRECT. THE ANSWER WAS: "${correct_ans.toUpperCase()}"\n\nBUT KNOWLEDGE UNLOCKS DOORS — AND SO DOES CURIOSITY.\nCOMPASSIONATE ACCESS GRANTED.`
        );
        setState("compassionate");
      }
      setTimeout(onUnlock, 2600);
    }, 1800);
  }, [state, input, correctAnswers, extraEggs, onUnlock]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none z-0"
        style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.12) 3px,rgba(0,0,0,0.12) 4px)" }}
      />
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none z-0"
        style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(245,158,11,0.06) 0%, transparent 65%)" }}
      />
      {/* Corner grids */}
      {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((pos, i) => (
        <div key={i} className={`absolute ${pos} w-40 h-40 pointer-events-none z-0 opacity-10`}
          style={{ background: `radial-gradient(circle at ${i < 2 ? "top" : "bottom"} ${i % 2 === 0 ? "left" : "right"}, rgba(245,158,11,0.3), transparent 70%)` }}
        />
      ))}

      <div className="relative z-10 w-full max-w-xl px-6 py-12 font-mono">
        {/* ASCII Padlock */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: state === "granted" || state === "compassionate" ? 0 : 1,
            scale: state === "granted" || state === "compassionate" ? 0 : 1,
          }}
          transition={{ duration: 0.4 }}
          className="text-center mb-6"
        >
          <pre className="text-[#F59E0B] text-xs leading-tight inline-block opacity-70">
{`   ╔═════════╗
   ║  ╔═══╗  ║
   ║  ║   ║  ║
   ╚══╝   ╚══╝
   ┌─────────┐
   │ ███████ │
   │ ███ ○ ██│
   │ ███████ │
   └─────────┘`}
          </pre>
        </motion.div>

        {/* Chamber label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-6"
        >
          <div className="text-[#F59E0B] text-[10px] tracking-[0.5em] mb-1">CHAMBER {chamberCode}</div>
          <div className="text-[#F5F5F5] text-xl font-black tracking-wide">{chamberName}</div>
          <div className="w-16 h-px bg-[#F59E0B]/30 mx-auto mt-2" />
        </motion.div>

        {/* Terminal box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl border border-[#1a1a1a] bg-[#080808] overflow-hidden"
          style={{ boxShadow: "0 0 60px rgba(245,158,11,0.06), inset 0 1px 0 rgba(255,255,255,0.03)" }}
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[#111] bg-[#0a0a0a]">
            <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#1a1a1a]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#1a1a1a]" />
            <span className="ml-2 text-[#333] text-[10px] tracking-wider">cipher_lock.sh — restricted</span>
          </div>

          {/* Terminal content */}
          <div className="p-5 space-y-1.5 text-xs min-h-[280px]">
            {/* Boot lines */}
            {BOOT_LINES.map((line, i) => (
              <AnimatePresence key={i}>
                {bootLine > i && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={i === 0 ? "text-[#F59E0B] font-bold mb-2" : "text-[#444]"}
                  >
                    {i > 0 && <span className="text-[#F59E0B]/40 mr-2">$</span>}
                    {line}
                  </motion.div>
                )}
              </AnimatePresence>
            ))}

            {/* Question */}
            <AnimatePresence>
              {(state === "typing" || state === "ready" || state === "analyzing" || state === "granted" || state === "compassionate") && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="pt-3 pb-1"
                >
                  <span className="text-[#F59E0B]/60 mr-2">$</span>
                  <span className="text-[#666] mr-1">challenge:</span>
                  <span className="text-[#F5F5F5]">
                    {displayedQ}
                    {state === "typing" && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.5 }}
                        className="text-[#F59E0B]"
                      >▋</motion.span>
                    )}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input line */}
            <AnimatePresence>
              {state === "ready" && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 pt-1"
                >
                  <span className="text-[#F59E0B] text-sm">›</span>
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKey}
                    className="flex-1 bg-transparent text-[#F5F5F5] text-xs outline-none caret-[#F59E0B] placeholder-[#2a2a2a]"
                    placeholder="enter your answer..."
                    autoComplete="off"
                    spellCheck={false}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05, borderColor: "rgba(245,158,11,0.5)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSubmit}
                    className="text-[#F59E0B] text-[10px] border border-[#F59E0B]/20 px-3 py-1.5 rounded transition-colors hover:bg-[#F59E0B]/8"
                  >
                    ENTER ↵
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Analyzing */}
            <AnimatePresence>
              {state === "analyzing" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="pt-2 space-y-1"
                >
                  <div className="text-[#444]"><span className="text-[#F59E0B]/40 mr-2">$</span>input: <span className="text-[#F59E0B]">&quot;{input}&quot;</span></div>
                  <motion.div
                    className="text-[#F59E0B]"
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ repeat: Infinity, duration: 0.7 }}
                  >
                    <span className="mr-2 opacity-40">$</span>analyzing ██████████░░░░ 72%...
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Result */}
            <AnimatePresence>
              {(state === "granted" || state === "compassionate") && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="pt-3"
                >
                  <div className={`text-sm font-bold whitespace-pre-line leading-relaxed ${isCorrect ? "text-[#10B981]" : "text-[#F59E0B]"}`}>
                    {grantMsg}
                  </div>
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, ease: "linear" }}
                    className={`h-0.5 mt-3 rounded ${isCorrect ? "bg-[#10B981]" : "bg-[#F59E0B]"}`}
                    style={{ opacity: 0.5 }}
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="text-[#444] text-[10px] mt-2"
                  >
                    $ opening chamber...
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Hint */}
        <AnimatePresence>
          {state === "ready" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              exit={{ opacity: 0 }}
              className="text-center mt-4 text-[#2a2a2a] text-[10px] tracking-wider"
            >
              hint: {hint} · press enter with no answer to skip
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
