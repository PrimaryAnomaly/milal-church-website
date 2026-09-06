import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { createPost, listPosts, type PostType } from "@/lib/posts";

function parseType(v: unknown): PostType | undefined {
  if (v === "sermon_summary" || v === "news") return v;
  return undefined;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const all = searchParams.get("all") === "1";
  const type = parseType(searchParams.get("type"));
  if (all) {
    const ok = await isAdminAuthenticated();
    if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const posts = await listPosts(type ? { type } : undefined);
    return NextResponse.json({ posts });
  }
  const posts = await listPosts({
    publishedOnly: true,
    ...(type ? { type } : {}),
  });
  return NextResponse.json({ posts });
}

export async function POST(request: Request) {
  const ok = await isAdminAuthenticated();
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: {
    type?: string;
    title?: string;
    slug?: string;
    excerpt?: string;
    body?: string;
    content?: string;
    imageUrls?: string[];
    coverImageUrl?: string;
    youtubeUrl?: string;
    published?: boolean;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.title?.trim()) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const imageUrls =
    Array.isArray(body.imageUrls)
      ? body.imageUrls.filter((u): u is string => typeof u === "string")
      : body.coverImageUrl
        ? [body.coverImageUrl]
        : undefined;

  try {
    const post = await createPost({
      type: parseType(body.type),
      title: body.title,
      slug: body.slug ?? "",
      excerpt: body.excerpt,
      body: body.body ?? body.content,
      imageUrls,
      youtubeUrl: body.youtubeUrl,
      published: body.published,
    });
    return NextResponse.json({ post }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create post";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
