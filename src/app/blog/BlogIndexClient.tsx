"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/ui/Footer";
import type { PostMeta } from "@/lib/blog";
// category colors passed as prop — no server imports needed
import { ArrowUpRight, Clock, Calendar } from "lucide-react";

export default function BlogIndexClient({
  posts,
  categories,
  categoryColors,
}: {
  posts: PostMeta[];
  categories: string[];
  categoryColors: Record<string, string>;
}) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  const featured = posts.find((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured || activeCategory !== "All");

  return (
    <main className="min-h-screen bg-void">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label mb-6 inline-flex">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
            Thoughts & Perspectives
          </span>
          <h1 className="text-display text-[#F5F5F5] mt-4 mb-4">
            The <span className="text-[#F59E0B]">Blog</span>
          </h1>
          <p className="text-[#525252] text-base max-w-xl">
            Research notes, engineering deep dives, and data-driven perspectives —
            on structures, on Nepal, and occasionally on cricket.
          </p>
        </motion.div>
      </section>

      {/* Featured post */}
      {featured && activeCategory === "All" && (
        <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
          <p className="text-[#333] text-xs font-mono tracking-widest uppercase mb-4">
            Featured
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link href={`/blog/${featured.slug}`} className="group block">
              <div
                className="rounded-2xl p-8 md:p-10 relative overflow-hidden border border-[#1a1a1a] hover:border-[rgba(245,158,11,0.3)] transition-all duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, #111 0%, #0d0d0d 100%)",
                }}
              >
                {/* Glow */}
                <div className="absolute top-0 right-0 w-80 h-80 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "radial-gradient(circle at top right, rgba(245,158,11,0.08), transparent 70%)" }} />

                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <span
                    className="text-xs px-3 py-1 rounded-full font-mono font-bold"
                    style={{
                      color: categoryColors[featured.category] ?? "#A3A3A3",
                      background: `${categoryColors[featured.category]}15`,
                      border: `1px solid ${categoryColors[featured.category]}30`,
                    }}
                  >
                    {featured.category}
                  </span>
                  <span className="flex items-center gap-1 text-[#333] text-xs font-mono">
                    <Clock className="w-3 h-3" /> {featured.readTime}
                  </span>
                  <span className="flex items-center gap-1 text-[#333] text-xs font-mono">
                    <Calendar className="w-3 h-3" />
                    {new Date(featured.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-[#F5F5F5] mb-3 group-hover:text-[#F59E0B] transition-colors leading-tight max-w-2xl">
                  {featured.title}
                </h2>
                <p className="text-[#525252] text-base leading-relaxed max-w-2xl mb-6">
                  {featured.excerpt}
                </p>
                <span className="flex items-center gap-2 text-[#F59E0B] text-sm font-bold group-hover:gap-3 transition-all">
                  Read Article <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </motion.div>
        </section>
      )}

      {/* Category filters */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mb-10">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
                activeCategory === cat
                  ? "bg-[#F59E0B] text-black font-bold"
                  : "border border-[#222] text-[#525252] hover:border-[#F59E0B]/40 hover:text-[#F5F5F5]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Post grid */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {rest.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link href={`/blog/${post.slug}`} className="group block h-full">
                  <div className="h-full rounded-2xl p-6 border border-[#1a1a1a] bg-[#0f0f0f] hover:border-[rgba(245,158,11,0.25)] hover:bg-[#111] transition-all duration-300 flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                      <span
                        className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold"
                        style={{
                          color: categoryColors[post.category] ?? "#A3A3A3",
                          background: `${categoryColors[post.category]}15`,
                          border: `1px solid ${categoryColors[post.category]}25`,
                        }}
                      >
                        {post.category}
                      </span>
                      <span className="text-[#333] text-[10px] font-mono ml-auto flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-[#F5F5F5] font-bold text-base leading-snug mb-2 group-hover:text-[#F59E0B] transition-colors flex-1">
                      {post.title}
                    </h3>
                    <p className="text-[#525252] text-xs leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#1a1a1a]">
                      <span className="text-[#333] text-[10px] font-mono">
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-[#333] group-hover:text-[#F59E0B] transition-colors" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}

            {rest.length === 0 && (
              <div className="col-span-3 text-center py-20">
                <p className="text-[#333] font-mono">No posts in this category yet.</p>
                <p className="text-[#222] text-sm mt-2">Check back soon.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      <Footer />
    </main>
  );
}
