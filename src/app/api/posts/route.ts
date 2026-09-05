import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { createPost, listPosts } from "@/lib/posts";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const all = searchParams.get("all") === "1";
  if (all) {
    const ok = await isAdminAuthenticated();
    if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const posts = await listPosts();
    return NextResponse.json({ posts });
  }
  const posts = await listPosts({ publishedOnly: true });
  return NextResponse.json({ posts });
}

export async function POST(request: Request) {
  const ok = await isAdminAuthenticated();
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: {
    title?: string;
    slug?: string;
    excerpt?: string;
    content?: string;
    coverImageUrl?: string;
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

  try {
    const post = await createPost({
      title: body.title,
      slug: body.slug ?? "",
      excerpt: body.excerpt,
      content: body.content,
      coverImageUrl: body.coverImageUrl,
      published: body.published,
    });
    return NextResponse.json({ post }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create post";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
