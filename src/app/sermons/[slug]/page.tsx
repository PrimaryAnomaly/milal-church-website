import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, listPosts } from "@/lib/posts";
import { parseYoutubeVideoId } from "@/lib/youtube";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { ButtonLink } from "@/components/Button";
import { PageShell } from "@/components/PageShell";
import { YoutubeEmbed } from "@/components/YoutubeEmbed";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const t = await getDictionary();
  if (!post || !post.published) {
    return { title: t.sermons.title };
  }
  return {
    title: post.title,
    description: post.excerpt || t.sermons.detailFallback,
  };
}

export async function generateStaticParams() {
  const posts = await listPosts({ publishedOnly: true });
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function SermonDetailPage({ params }: Props) {
  const { slug } = await params;
  const locale = await getLocale();
  const t = await getDictionary(locale);
  const post = await getPostBySlug(slug);
  if (!post || !post.published) notFound();

  const videoId = parseYoutubeVideoId(post.youtubeUrl);
  const cover = post.imageUrls[0];

  return (
    <PageShell>
    <article>
      <ButtonLink href="/sermons" variant="secondary">
        {t.sermons.back}
      </ButtonLink>
      <h1 className="mt-8 text-3xl font-semibold text-foreground sm:text-4xl">
        {post.title}
      </h1>
      <p className="mt-3 text-sm text-muted">
        {new Date(post.publishedAt ?? post.createdAt).toLocaleDateString(
          locale === "ko" ? "ko-KR" : "en-US",
          { year: "numeric", month: "long", day: "numeric" },
        )}
      </p>
      {videoId ? (
        <YoutubeEmbed
          videoId={videoId}
          title={post.title}
          className="mt-8 max-w-lg"
        />
      ) : null}
      {cover && !videoId ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={cover}
          alt={post.title}
          loading="lazy"
          decoding="async"
          className="mt-8 max-h-96 w-full rounded-xl border border-border bg-photo-ground object-cover"
        />
      ) : null}
      {post.imageUrls.length > 1 ? (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {post.imageUrls.slice(1).map((url) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={url}
              src={url}
              alt=""
              loading="lazy"
              decoding="async"
              className="max-h-64 w-full rounded-xl border border-border bg-photo-ground object-cover"
            />
          ))}
        </div>
      ) : null}
      {post.body || post.excerpt ? (
        <div className="mt-8 max-w-[65ch] whitespace-pre-wrap text-base leading-relaxed text-foreground">
          {post.body || post.excerpt}
        </div>
      ) : null}
    </article>
    </PageShell>
  );
}
