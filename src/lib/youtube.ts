/**
 * YouTube URL helpers. We embed the church channel; we do not host video files.
 * Channel: @milalkoreanchurch1435
 */

export const YOUTUBE_CHANNEL_ID = "UCgrvqzHwQrZQuZRNH1vPuTA";
/** Uploads playlist = channel id with UC → UU. */
export const YOUTUBE_UPLOADS_PLAYLIST_ID = "UUgrvqzHwQrZQuZRNH1vPuTA";

const VIDEO_ID = /^[A-Za-z0-9_-]{11}$/;

export function parseYoutubeVideoId(input: string | undefined | null): string | null {
  const raw = (input ?? "").trim();
  if (!raw) return null;
  if (VIDEO_ID.test(raw)) return raw;

  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return null;
  }

  const host = url.hostname.replace(/^www\./, "");
  if (host === "youtu.be") {
    const id = url.pathname.split("/").filter(Boolean)[0];
    return id && VIDEO_ID.test(id) ? id : null;
  }
  if (host !== "youtube.com" && host !== "m.youtube.com" && host !== "youtube-nocookie.com") {
    return null;
  }

  const v = url.searchParams.get("v");
  if (v && VIDEO_ID.test(v)) return v;

  const parts = url.pathname.split("/").filter(Boolean);
  const kind = parts[0];
  const maybeId = parts[1];
  if (
    maybeId &&
    VIDEO_ID.test(maybeId) &&
    (kind === "embed" || kind === "shorts" || kind === "live" || kind === "v")
  ) {
    return maybeId;
  }
  return null;
}

export function youtubeEmbedSrc(opts: {
  videoId?: string | null;
  playlistId?: string | null;
}): string | null {
  const videoId = opts.videoId || null;
  const playlistId = opts.playlistId || null;
  const params = new URLSearchParams({ rel: "0", modestbranding: "1" });
  if (videoId && playlistId) {
    params.set("list", playlistId);
    return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
  }
  if (videoId) {
    return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
  }
  if (playlistId) {
    params.set("list", playlistId);
    return `https://www.youtube-nocookie.com/embed/videoseries?${params.toString()}`;
  }
  return null;
}
