import { getPost, getAllPosts, CATEGORY_COLORS } from "@/lib/blog";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import PostClient from "./PostClient";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

// Only slugs returned by generateStaticParams are valid — any other URL 404s.
// Prevents arbitrary slug values from ever reaching the filesystem lookup.
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} — Rohit Acharya`,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const { content } = await compileMDX({
    source: post!.content,
  });

  return (
    <PostClient post={post!} categoryColor={CATEGORY_COLORS[post!.category] ?? "#A3A3A3"}>
      {content}
    </PostClient>
  );
}
