import type { MetadataRoute } from "next";
import { listPosts } from "@/lib/posts";
import { absoluteUrl } from "@/lib/site";

const STATIC_ROUTES: {
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
}[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/worship", changeFrequency: "monthly", priority: 0.9 },
  { path: "/visit", changeFrequency: "monthly", priority: 0.9 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/generations", changeFrequency: "monthly", priority: 0.7 },
  { path: "/sermons", changeFrequency: "weekly", priority: 0.8 },
  { path: "/korean-school", changeFrequency: "monthly", priority: 0.7 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await listPosts({ publishedOnly: true });

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: absoluteUrl(route.path),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/sermons/${post.slug}`),
    lastModified: post.updatedAt || post.publishedAt,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...postEntries];
}
