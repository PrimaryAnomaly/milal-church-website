import { youtubeEmbedSrc } from "@/lib/youtube";

type YoutubeEmbedProps = {
  videoId?: string | null;
  playlistId?: string | null;
  title: string;
  className?: string;
};

export function YoutubeEmbed({
  videoId,
  playlistId,
  title,
  className,
}: YoutubeEmbedProps) {
  const src = youtubeEmbedSrc({ videoId, playlistId });
  if (!src) return null;

  return (
    <div
      className={`overflow-hidden rounded-xl border border-border bg-photo-ground ${className ?? ""}`}
    >
      <div className="relative aspect-video w-full">
        <iframe
          src={src}
          title={title}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          loading="lazy"
        />
      </div>
    </div>
  );
}
