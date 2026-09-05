/**
 * File-backed posts store (data/posts.json).
 * Swap this module for a Postgres-backed implementation later without changing callers.
 */

import { promises as fs } from "fs";
import path from "path";

export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl?: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export type PostInput = {
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  coverImageUrl?: string;
  published?: boolean;
};

const DATA_PATH = path.join(process.cwd(), "data", "posts.json");

async function readAll(): Promise<Post[]> {
  try {
    const raw = await fs.readFile(DATA_PATH, "utf8");
    const parsed = JSON.parse(raw) as Post[];
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code;
    if (code === "ENOENT") {
      await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
      await fs.writeFile(DATA_PATH, "[]\n", "utf8");
      return [];
    }
    throw err;
  }
}

async function writeAll(posts: Post[]): Promise<void> {
  await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
  await fs.writeFile(DATA_PATH, JSON.stringify(posts, null, 2) + "\n", "utf8");
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function listPosts(opts?: { publishedOnly?: boolean }): Promise<Post[]> {
  const posts = await readAll();
  const filtered = opts?.publishedOnly ? posts.filter((p) => p.published) : posts;
  return filtered.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await readAll();
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function getPostById(id: string): Promise<Post | null> {
  const posts = await readAll();
  return posts.find((p) => p.id === id) ?? null;
}

export async function createPost(input: PostInput): Promise<Post> {
  const posts = await readAll();
  const now = new Date().toISOString();
  const slug = input.slug?.trim() || slugify(input.title);
  if (posts.some((p) => p.slug === slug)) {
    throw new Error(`Slug already exists: ${slug}`);
  }
  const post: Post = {
    id: crypto.randomUUID(),
    title: input.title.trim(),
    slug,
    excerpt: (input.excerpt ?? "").trim(),
    content: (input.content ?? "").trim(),
    coverImageUrl: input.coverImageUrl?.trim() || undefined,
    published: Boolean(input.published),
    createdAt: now,
    updatedAt: now,
  };
  posts.push(post);
  await writeAll(posts);
  return post;
}

export async function updatePost(id: string, input: Partial<PostInput>): Promise<Post> {
  const posts = await readAll();
  const idx = posts.findIndex((p) => p.id === id);
  if (idx === -1) throw new Error("Post not found");
  const existing = posts[idx];
  const nextSlug = input.slug?.trim() || existing.slug;
  if (nextSlug !== existing.slug && posts.some((p) => p.slug === nextSlug)) {
    throw new Error(`Slug already exists: ${nextSlug}`);
  }
  const updated: Post = {
    ...existing,
    title: input.title !== undefined ? input.title.trim() : existing.title,
    slug: nextSlug,
    excerpt: input.excerpt !== undefined ? input.excerpt.trim() : existing.excerpt,
    content: input.content !== undefined ? input.content.trim() : existing.content,
    coverImageUrl:
      input.coverImageUrl !== undefined
        ? input.coverImageUrl.trim() || undefined
        : existing.coverImageUrl,
    published: input.published !== undefined ? Boolean(input.published) : existing.published,
    updatedAt: new Date().toISOString(),
  };
  posts[idx] = updated;
  await writeAll(posts);
  return updated;
}

export async function deletePost(id: string): Promise<void> {
  const posts = await readAll();
  const next = posts.filter((p) => p.id !== id);
  if (next.length === posts.length) throw new Error("Post not found");
  await writeAll(next);
}

export { slugify };
