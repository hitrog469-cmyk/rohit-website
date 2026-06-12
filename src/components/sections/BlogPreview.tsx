"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import type { PostMeta } from "@/lib/blog";
import { CATEGORY_COLORS } from "@/lib/blog-constants";

export default function BlogPreview({ posts }: { posts: PostMeta[] }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const preview = posts.slice(0, 3);

  return (
    <section id="blog" ref={ref} className="section-padding bg-ink relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <span className="section-label mb-4 inline-flex">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
              Blog
            </span>
            <h2 className="text-headline text-[#F5F5F5] mt-4">
              Thoughts &amp; <span className="text-[#F59E0B]">Perspectives</span>
            </h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="/blog"
              className="hidden md:flex items-center gap-2 text-[#525252] hover:text-[#F59E0B] text-sm transition-colors font-medium"
            >
              All posts <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {preview.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.6 }}
            >
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <div className="h-full rounded-2xl p-6 border border-[#1a1a1a] bg-[#0a0a0a] hover:border-[rgba(245,158,11,0.25)] hover:bg-[#0d0d0d] transition-all duration-300 flex flex-col">
                  {/* Category + read time */}
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold"
                      style={{
                        color: CATEGORY_COLORS[post.category] ?? "#A3A3A3",
                        background: `${CATEGORY_COLORS[post.category]}15`,
                        border: `1px solid ${CATEGORY_COLORS[post.category]}25`,
                      }}
                    >
                      {post.category}
                    </span>
                    <span className="text-[#333] text-[10px] font-mono ml-auto flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-[#F5F5F5] font-bold text-base leading-snug mb-2 group-hover:text-[#F59E0B] transition-colors flex-1">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-[#525252] text-xs leading-relaxed mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#1a1a1a]">
                    <span className="text-[#333] text-[10px] font-mono">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#333] group-hover:text-[#F59E0B] transition-colors" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile see all */}
        <motion.div
          className="mt-8 text-center md:hidden"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#F59E0B] text-sm font-bold"
          >
            View all posts <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
