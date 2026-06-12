import { getAllPosts, CATEGORIES, CATEGORY_COLORS } from "@/lib/blog";
import BlogIndexClient from "./BlogIndexClient";

export const metadata = {
  title: "Blog — Rohit Acharya",
  description: "Thoughts on structural engineering, research, Nepal, cricket, and life.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  return <BlogIndexClient posts={posts} categories={CATEGORIES} categoryColors={CATEGORY_COLORS} />;
}
