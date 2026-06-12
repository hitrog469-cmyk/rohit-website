import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

const BASE_URL = "https://rohitacharya.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { path: "", priority: 1.0 },
    { path: "/blog", priority: 0.8 },
    { path: "/codex", priority: 0.6 },
    { path: "/codex/research", priority: 0.5 },
    { path: "/codex/cricket", priority: 0.5 },
    { path: "/codex/nepal", priority: 0.5 },
    { path: "/failures", priority: 0.6 },
    { path: "/journey", priority: 0.6 },
    { path: "/lab", priority: 0.6 },
    { path: "/lab/beam", priority: 0.5 },
    { path: "/lab/column", priority: 0.5 },
    { path: "/mind", priority: 0.5 },
    { path: "/now", priority: 0.6 },
    { path: "/stack", priority: 0.5 },
    { path: "/structures", priority: 0.6 },
  ].map(({ path, priority }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority,
  }));

  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...postRoutes];
}
