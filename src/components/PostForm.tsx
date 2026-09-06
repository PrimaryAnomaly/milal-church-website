"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import type { Post, PostType } from "@/lib/posts";

type Props = {
  post?: Post;
};

export function PostForm({ post }: Props) {
  const router = useRouter();
  const isEdit = Boolean(post);
  const [type, setType] = useState<PostType>(post?.type ?? "sermon_summary");
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [body, setBody] = useState(post?.body ?? "");
  const [imageUrl, setImageUrl] = useState(post?.imageUrls?.[0] ?? "");
  const [published, setPublished] = useState(post?.published ?? false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  async function onUpload(file: File) {
    setUploading(true);
    setMessage(null);
    setError(null);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) {
        setError(
          data.error ||
            "Upload failed. If Blob token is unset, paste an image URL instead.",
        );
        return;
      }
      setImageUrl(data.url);
      setMessage("Image uploaded to Vercel Blob.");
    } catch {
      setError("Upload network error");
    } finally {
      setUploading(false);
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const imageUrls = imageUrl.trim() ? [imageUrl.trim()] : [];
      const payload = { type, title, slug, excerpt, body, imageUrls, published };
      const res = await fetch(isEdit ? `/api/posts/${post!.id}` : "/api/posts", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Save failed");
        return;
      }
      setMessage(isEdit ? "Post updated." : "Post created.");
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <label className="block text-sm">
        <span className="font-medium">Type / 유형</span>
        <select
          className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2"
          value={type}
          onChange={(e) => setType(e.target.value as PostType)}
        >
          <option value="sermon_summary">sermon_summary (설교요약)</option>
          <option value="news">news (소식)</option>
        </select>
      </label>
      <label className="block text-sm">
        <span className="font-medium">Title / 제목</span>
        <input
          className="mt-1 w-full rounded-lg border border-border px-3 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label className="block text-sm">
        <span className="font-medium">Slug</span>
        <input
          className="mt-1 w-full rounded-lg border border-border px-3 py-2"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="auto from title if empty"
        />
      </label>
      <label className="block text-sm">
        <span className="font-medium">Excerpt / 요약</span>
        <textarea
          className="mt-1 w-full rounded-lg border border-border px-3 py-2"
          rows={2}
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="derived from body if empty"
        />
      </label>
      <label className="block text-sm">
        <span className="font-medium">Body / 본문</span>
        <textarea
          className="mt-1 w-full rounded-lg border border-border px-3 py-2 font-mono text-sm"
          rows={10}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </label>
      <div className="space-y-2 text-sm">
        <span className="font-medium">이미지 URL / Image URL</span>
        <input
          className="w-full rounded-lg border border-border px-3 py-2"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://... or upload below"
        />
        <input
          type="file"
          accept="image/*"
          disabled={uploading}
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) void onUpload(f);
          }}
        />
        <p className="text-xs text-muted">
          Upload uses @vercel/blob when BLOB_READ_WRITE_TOKEN is set; otherwise paste a URL.
        </p>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
        />
        Published / 게시
      </label>
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
      {message ? <p className="text-sm text-green-700">{message}</p> : null}
      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-[#FAF7F2] hover:bg-[#9A3412] disabled:opacity-60"
      >
        {loading ? "Saving..." : isEdit ? "Update post" : "Create post"}
      </button>
    </form>
  );
}
