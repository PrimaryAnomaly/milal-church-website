"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import type { Post, PostType } from "@/lib/posts";
import type { Dictionary } from "@/i18n/get-dictionary";
import { parseYoutubeVideoId } from "@/lib/youtube";

type Props = {
  post?: Post;
  labels: Dictionary["admin"];
};

const field =
  "mt-2 min-h-12 w-full rounded-lg border border-border bg-white px-4 py-3 text-lg outline-none focus:border-accent";

export function PostForm({ post, labels }: Props) {
  const router = useRouter();
  const isEdit = Boolean(post);
  const [type, setType] = useState<PostType>(post?.type ?? "sermon_summary");
  const [title, setTitle] = useState(post?.title ?? "");
  const [body, setBody] = useState(post?.body ?? "");
  const [youtubeUrl, setYoutubeUrl] = useState(post?.youtubeUrl ?? "");
  const [published, setPublished] = useState(post?.published ?? true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const trimmedYoutube = youtubeUrl.trim();
    if (trimmedYoutube && !parseYoutubeVideoId(trimmedYoutube)) {
      setError(labels.badYoutube);
      return;
    }
    if (!title.trim()) {
      setError(labels.saveFailed);
      return;
    }
    setLoading(true);
    try {
      const payload = {
        type,
        title: title.trim(),
        body,
        youtubeUrl: trimmedYoutube,
        published,
      };
      const res = await fetch(isEdit ? `/api/posts/${post!.id}` : "/api/posts", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        const raw = typeof data.error === "string" ? data.error : "";
        setError(
          raw.includes("YouTube") ? labels.badYoutube : labels.saveFailed,
        );
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError(labels.networkError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 text-lg">
      <label className="block">
        <span className="font-medium">{labels.typeLabel}</span>
        <select
          className={field}
          value={type}
          onChange={(e) => setType(e.target.value as PostType)}
        >
          <option value="sermon_summary">{labels.typeSermon}</option>
          <option value="news">{labels.typeNews}</option>
        </select>
      </label>
      <label className="block">
        <span className="font-medium">{labels.postTitle}</span>
        <input
          className={field}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label className="block">
        <span className="font-medium">{labels.youtubeUrl}</span>
        <input
          className={field}
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=..."
          inputMode="url"
        />
        <p className="mt-2 text-base text-muted">{labels.youtubeHint}</p>
      </label>
      <label className="block">
        <span className="font-medium">{labels.body}</span>
        <textarea
          className={`${field} min-h-40 font-sans`}
          rows={8}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <p className="mt-2 text-base text-muted">{labels.bodyHint}</p>
      </label>
      <label className="flex min-h-12 items-center gap-3">
        <input
          type="checkbox"
          className="h-6 w-6 shrink-0 accent-[var(--accent)]"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
        />
        <span className="font-medium">{labels.publish}</span>
      </label>
      {error ? <p className="text-base text-red-700">{error}</p> : null}
      <button
        type="submit"
        disabled={loading}
        className="min-h-12 w-full rounded-full bg-accent px-6 py-3 text-lg font-medium text-[#FAF7F2] hover:bg-accent-hover disabled:opacity-60 sm:w-auto"
      >
        {loading ? labels.saving : labels.save}
      </button>
    </form>
  );
}
