import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { deletePost, getPostById, updatePost, type PostType } from "@/lib/posts";

type Ctx = { params: Promise<{ id: string }> };

function parseType(v: unknown): PostType | undefined {
  if (v === "sermon_summary" || v === "news") return v;
  return undefined;
}

export async function GET(_request: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  const post = await getPostById(id);
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (!post.published) {
    const ok = await isAdminAuthenticated();
    if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ post });
}

export async function PUT(request: Request, ctx: Ctx) {
  const ok = await isAdminAuthenticated();
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await ctx.params;

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const imageUrls = Array.isArray(body.imageUrls)
    ? body.imageUrls.filter((u): u is string => typeof u === "string")
    : undefined;

  try {
    const post = await updatePost(id, {
      type: parseType(body.type),
      title: typeof body.title === "string" ? body.title : undefined,
      slug: typeof body.slug === "string" ? body.slug : undefined,
      excerpt: typeof body.excerpt === "string" ? body.excerpt : undefined,
      body:
        typeof body.body === "string"
          ? body.body
          : typeof body.content === "string"
            ? body.content
            : undefined,
      imageUrls,
      coverImageUrl:
        typeof body.coverImageUrl === "string" ? body.coverImageUrl : undefined,
      youtubeUrl:
        typeof body.youtubeUrl === "string" ? body.youtubeUrl : undefined,
      published: typeof body.published === "boolean" ? body.published : undefined,
    });
    return NextResponse.json({ post });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to update";
    const status = message === "Post not found" ? 404 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function DELETE(_request: Request, ctx: Ctx) {
  const ok = await isAdminAuthenticated();
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  try {
    await deletePost(id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to delete";
    const status = message === "Post not found" ? 404 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
