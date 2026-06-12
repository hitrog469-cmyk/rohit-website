import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[var(--bg-page)] flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      {/* Amber radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 35%, rgba(245,158,11,0.07) 0%, transparent 60%)",
        }}
      />

      <p className="font-mono text-[var(--amber)] text-sm tracking-[0.3em] uppercase mb-6">
        Error 404 — Load Path Not Found
      </p>

      <h1 className="text-display text-[var(--text-primary)]">
        This member has <span className="text-[var(--amber)]">buckled</span>.
      </h1>

      <p className="text-[var(--text-tertiary)] max-w-md mt-6 leading-relaxed">
        The page you requested failed under load — or it never existed in the
        first place. Either way, the safest path is back to stable ground.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
        <Link
          href="/"
          className="px-6 py-3 rounded-full bg-[var(--amber)] text-black text-sm font-bold tracking-wide hover:opacity-90 transition-opacity"
        >
          ← Back to Home
        </Link>
        <Link
          href="/blog"
          className="px-6 py-3 rounded-full border border-[var(--amber)]/40 text-[var(--amber)] text-sm font-bold tracking-wide hover:bg-[var(--amber)]/10 transition-colors"
        >
          Read the Blog
        </Link>
      </div>

      <p className="font-mono text-[var(--text-dim)] text-xs mt-16">
        FS = 0.0 · section failed · हर हर महादेव
      </p>
    </main>
  );
}
