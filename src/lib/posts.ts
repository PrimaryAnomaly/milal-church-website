/**
 * File-backed posts store (data/posts.json).
 * Swap this module for a Postgres-backed implementation later without changing callers.
 */

import { promises as fs } from "fs";
import path from "path";
import { parseYoutubeVideoId } from "./youtube";

export type PostType = "sermon_summary" | "news";

export type Post = {
  id: string;
  type: PostType;
  title: string;
  slug: string;
  body: string;
  excerpt?: string;
  imageUrls: string[];
  /** Watch URL or 11-char id. Empty string means none. */
  youtubeUrl?: string;
  published: boolean;
  publishedAt?: string; // set on first transition to published; keep on unpublish; do not reset on republish
  createdAt: string;
  updatedAt: string;
};

export type PostInput = {
  type?: PostType;
  title: string;
  slug?: string;
  body?: string;
  excerpt?: string;
  imageUrls?: string[];
  youtubeUrl?: string;
  /** Legacy alias accepted by API/form during migration */
  content?: string;
  coverImageUrl?: string;
  published?: boolean;
};

type RawPost = Record<string, unknown>;

const DATA_PATH = path.join(process.cwd(), "data", "posts.json");
const EXCERPT_LEN = 160;

function isPostType(v: unknown): v is PostType {
  return v === "sermon_summary" || v === "news";
}

function asString(v: unknown, fallback = ""): string {
  return typeof v === "string" ? v : fallback;
}

function normalizeYoutubeUrl(raw: string | undefined): string | undefined {
  const trimmed = (raw ?? "").trim();
  if (!trimmed) return undefined;
  if (!parseYoutubeVideoId(trimmed)) {
    throw new Error("YouTube URL is not a valid watch, shorts, or youtu.be link");
  }
  return trimmed;
}

function deriveExcerpt(body: string, existing?: string): string | undefined {
  const trimmed = (existing ?? "").trim();
  if (trimmed) return trimmed;
  const slice = body.trim().replace(/\s+/g, " ").slice(0, EXCERPT_LEN);
  return slice || undefined;
}

/** Normalize every post from JSON (legacy content/coverImageUrl migration). */
export function normalizePost(raw: RawPost): Post {
  const body =
    asString(raw.body) ||
    asString(raw.content) ||
    "";

  let imageUrls: string[] = [];
  if (Array.isArray(raw.imageUrls)) {
    imageUrls = raw.imageUrls.filter((u): u is string => typeof u === "string" && u.trim() !== "").map((u) => u.trim());
  } else if (typeof raw.coverImageUrl === "string" && raw.coverImageUrl.trim()) {
    imageUrls = [raw.coverImageUrl.trim()];
  }

  const type: PostType = isPostType(raw.type) ? raw.type : "sermon_summary";
  const published = Boolean(raw.published);
  const createdAt = asString(raw.createdAt) || new Date().toISOString();
  let publishedAt = typeof raw.publishedAt === "string" && raw.publishedAt ? raw.publishedAt : undefined;
  if (published && !publishedAt) {
    publishedAt = createdAt;
  }

  const excerpt = deriveExcerpt(body, asString(raw.excerpt) || undefined);
  const youtubeRaw = asString(raw.youtubeUrl).trim();
  const youtubeUrl = youtubeRaw && parseYoutubeVideoId(youtubeRaw) ? youtubeRaw : undefined;

  return {
    id: asString(raw.id) || crypto.randomUUID(),
    type,
    title: asString(raw.title),
    slug: asString(raw.slug),
    body,
    excerpt,
    imageUrls,
    youtubeUrl,
    published,
    publishedAt,
    createdAt,
    updatedAt: asString(raw.updatedAt) || createdAt,
  };
}

async function readAll(): Promise<Post[]> {
  try {
    const raw = await fs.readFile(DATA_PATH, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.map((item) => normalizePost((item ?? {}) as RawPost));
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

function resolveImageUrls(input: PostInput, existing?: string[]): string[] {
  if (input.imageUrls !== undefined) {
    return input.imageUrls
      .filter((u) => typeof u === "string" && u.trim())
      .map((u) => u.trim());
  }
  if (input.coverImageUrl !== undefined) {
    const url = input.coverImageUrl.trim();
    return url ? [url] : [];
  }
  return existing ? [...existing] : [];
}

function resolveBody(input: PostInput, existing = ""): string {
  if (input.body !== undefined) return input.body.trim();
  if (input.content !== undefined) return input.content.trim();
  return existing;
}

function applyPublishedAt(
  wasPublished: boolean,
  existingPublishedAt: string | undefined,
  nextPublished: boolean,
  createdAt: string,
): string | undefined {
  if (nextPublished) {
    // First transition to published sets publishedAt; republish keeps it.
    if (!wasPublished && !existingPublishedAt) {
      return new Date().toISOString();
    }
    return existingPublishedAt ?? createdAt;
  }
  // Unpublish: keep last publishedAt
  return existingPublishedAt;
}

export async function listPosts(opts?: {
  publishedOnly?: boolean;
  type?: PostType;
}): Promise<Post[]> {
  let posts = await readAll();
  if (opts?.publishedOnly) {
    posts = posts.filter((p) => p.published);
  }
  if (opts?.type) {
    posts = posts.filter((p) => p.type === opts.type);
  }
  return posts.sort((a, b) => {
    const aTime = new Date(a.publishedAt ?? a.createdAt).getTime();
    const bTime = new Date(b.publishedAt ?? b.createdAt).getTime();
    return bTime - aTime;
  });
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
  let slug = input.slug?.trim() || slugify(input.title);
  if (!slug) {
    slug = `post-${Date.now().toString(36)}`;
  }
  if (posts.some((p) => p.slug === slug)) {
    slug = `${slug}-${Date.now().toString(36)}`;
  }
  const body = resolveBody(input);
  const published = Boolean(input.published);
  const type: PostType = isPostType(input.type) ? input.type : "sermon_summary";
  const imageUrls = resolveImageUrls(input);
  const youtubeUrl = normalizeYoutubeUrl(input.youtubeUrl);
  const post: Post = {
    id: crypto.randomUUID(),
    type,
    title: input.title.trim(),
    slug,
    body,
    excerpt: deriveExcerpt(body, input.excerpt),
    imageUrls,
    youtubeUrl,
    published,
    publishedAt: published ? now : undefined,
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

  const body =
    input.body !== undefined || input.content !== undefined
      ? resolveBody(input as PostInput, existing.body)
      : existing.body;

  const nextPublished =
    input.published !== undefined ? Boolean(input.published) : existing.published;

  const imageUrls =
    input.imageUrls !== undefined || input.coverImageUrl !== undefined
      ? resolveImageUrls(input as PostInput, existing.imageUrls)
      : existing.imageUrls;

  const type =
    input.type !== undefined && isPostType(input.type) ? input.type : existing.type;

  const excerpt =
    input.excerpt !== undefined
      ? deriveExcerpt(body, input.excerpt)
      : input.body !== undefined
        ? deriveExcerpt(body)
        : existing.excerpt;

  const youtubeUrl =
    input.youtubeUrl !== undefined
      ? normalizeYoutubeUrl(input.youtubeUrl)
      : existing.youtubeUrl;

  const updated: Post = {
    ...existing,
    type,
    title: input.title !== undefined ? input.title.trim() : existing.title,
    slug: nextSlug,
    body,
    excerpt,
    imageUrls,
    youtubeUrl,
    published: nextPublished,
    publishedAt: applyPublishedAt(
      existing.published,
      existing.publishedAt,
      nextPublished,
      existing.createdAt,
    ),
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
