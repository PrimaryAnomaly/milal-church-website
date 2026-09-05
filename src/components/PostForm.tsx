"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import type { Post } from "@/lib/posts";

type Props = {
  post?: Post;
};

export function PostForm({ post }: Props) {
  const router = useRouter();
  const isEdit = Boolean(post);
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [coverImageUrl, setCoverImageUrl] = useState(post?.coverImageUrl ?? "");
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
        setError(data.error || "Upload failed");
        return;
      }
      setCoverImageUrl(data.url);
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
      const payload = { title, slug, excerpt, content, coverImageUrl, published };
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
        <span className="font-medium">Title</span>
        <input
          className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label className="block text-sm">
        <span className="font-medium">Slug</span>
        <input
          className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="auto from title if empty"
        />
      </label>
      <label className="block text-sm">
        <span className="font-medium">Excerpt</span>
        <textarea
          className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
          rows={2}
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
        />
      </label>
      <label className="block text-sm">
        <span className="font-medium">Content</span>
        <textarea
          className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 font-mono text-sm"
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </label>
      <div className="space-y-2 text-sm">
        <span className="font-medium">Cover image URL</span>
        <input
          className="w-full rounded-lg border border-stone-300 px-3 py-2"
          value={coverImageUrl}
          onChange={(e) => setCoverImageUrl(e.target.value)}
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
        Published
      </label>
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
      {message ? <p className="text-sm text-green-700">{message}</p> : null}
      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-orange-900 disabled:opacity-60"
      >
        {loading ? "Saving..." : isEdit ? "Update post" : "Create post"}
      </button>
    </form>
  );
}
