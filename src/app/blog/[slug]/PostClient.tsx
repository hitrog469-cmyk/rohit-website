"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/ui/Footer";
import type { Post } from "@/lib/blog";
// Post type is safe — only types, no fs imports
import { ArrowLeft, Clock, Calendar } from "lucide-react";

export default function PostClient({
  post,
  categoryColor,
  children,
}: {
  post: Post;
  categoryColor: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-void">
      <Navigation />

      <article className="pt-28 pb-24 px-6 md:px-12 max-w-3xl mx-auto">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-10"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#525252] hover:text-[#F59E0B] text-sm transition-colors font-mono"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="mb-12"
        >
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span
              className="text-xs px-3 py-1 rounded-full font-mono font-bold"
              style={{
                color: categoryColor,
                background: `${categoryColor}15`,
                border: `1px solid ${categoryColor}30`,
              }}
            >
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-[#333] text-xs font-mono">
              <Clock className="w-3 h-3" /> {post.readTime} read
            </span>
            <span className="flex items-center gap-1 text-[#333] text-xs font-mono">
              <Calendar className="w-3 h-3" />
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#F5F5F5] leading-tight mb-5">
            {post.title}
          </h1>
          <p className="text-[#525252] text-lg leading-relaxed">{post.excerpt}</p>

          {/* Author */}
          <div className="flex items-center gap-3 mt-8 pt-6 border-t border-[#1a1a1a]">
            <div className="w-9 h-9 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/20 flex items-center justify-center">
              <span className="text-xs font-black tracking-tight text-[#F59E0B]">RA</span>
            </div>
            <div>
              <p className="text-[#F5F5F5] text-sm font-semibold">Rohit Acharya</p>
              <p className="text-[#333] text-xs font-mono">Structural Engineer · NIT Rourkela</p>
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="amber-line mb-12" />

        {/* MDX content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="prose-rohit"
        >
          {children}
        </motion.div>

        {/* End signature */}
        <div className="mt-16 pt-8 border-t border-[#1a1a1a]">
          <p className="text-[#333] font-mono text-sm text-center">— Rohit Acharya · हर हर महादेव</p>
        </div>
      </article>

      <Footer />
    </main>
  );
}
