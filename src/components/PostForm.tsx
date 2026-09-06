"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import type { Post, PostType } from "@/lib/posts";
import type { Dictionary } from "@/i18n/get-dictionary";

type Props = {
  post?: Post;
  labels: Dictionary["admin"];
};

export function PostForm({ post, labels }: Props) {
  const router = useRouter();
  const isEdit = Boolean(post);
  const [type, setType] = useState<PostType>(post?.type ?? "sermon_summary");
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [body, setBody] = useState(post?.body ?? "");
  const [imageUrl, setImageUrl] = useState(post?.imageUrls?.[0] ?? "");
  const [youtubeUrl, setYoutubeUrl] = useState(post?.youtubeUrl ?? "");
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
        setError(data.error || labels.uploadFailed);
        return;
      }
      setImageUrl(data.url);
    } catch {
      setError(labels.networkError);
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
      const payload = {
        type,
        title,
        slug,
        excerpt,
        body,
        imageUrls,
        youtubeUrl: youtubeUrl.trim(),
        published,
      };
      const res = await fetch(isEdit ? `/api/posts/${post!.id}` : "/api/posts", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || labels.saveFailed);
        return;
      }
      setMessage(isEdit ? labels.updated : labels.created);
      router.push("/admin");
      router.refresh();
    } catch {
      setError(labels.networkError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <label className="block text-sm">
        <span className="font-medium">{labels.typeLabel}</span>
        <select
          className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2"
          value={type}
          onChange={(e) => setType(e.target.value as PostType)}
        >
          <option value="sermon_summary">{labels.typeSermon}</option>
          <option value="news">{labels.typeNews}</option>
        </select>
      </label>
      <label className="block text-sm">
        <span className="font-medium">{labels.postTitle}</span>
        <input
          className="mt-1 w-full rounded-lg border border-border px-3 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label className="block text-sm">
        <span className="font-medium">{labels.slug}</span>
        <input
          className="mt-1 w-full rounded-lg border border-border px-3 py-2"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder={labels.slugHint}
        />
      </label>
      <label className="block text-sm">
        <span className="font-medium">{labels.excerpt}</span>
        <textarea
          className="mt-1 w-full rounded-lg border border-border px-3 py-2"
          rows={2}
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder={labels.excerptHint}
        />
      </label>
      <label className="block text-sm">
        <span className="font-medium">{labels.body}</span>
        <textarea
          className="mt-1 w-full rounded-lg border border-border px-3 py-2 font-mono text-sm"
          rows={10}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </label>
      <label className="block text-sm">
        <span className="font-medium">{labels.youtubeUrl}</span>
        <input
          className="mt-1 w-full rounded-lg border border-border px-3 py-2"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=..."
        />
        <p className="mt-1 text-xs text-muted">{labels.youtubeHint}</p>
      </label>
      <div className="space-y-2 text-sm">
        <span className="font-medium">{labels.imageUrl}</span>
        <input
          className="w-full rounded-lg border border-border px-3 py-2"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
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
        <p className="text-xs text-muted">{labels.imageHint}</p>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
        />
        {labels.publish}
      </label>
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
      {message ? <p className="text-sm text-green-700">{message}</p> : null}
      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-[#FAF7F2] hover:bg-accent-hover disabled:opacity-60"
      >
        {loading ? labels.saving : isEdit ? labels.update : labels.create}
      </button>
    </form>
  );
}
