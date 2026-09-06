import type { Metadata } from "next";
import Link from "next/link";
import { listPosts } from "@/lib/posts";
import {
  parseYoutubeVideoId,
  YOUTUBE_UPLOADS_PLAYLIST_ID,
} from "@/lib/youtube";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import { YoutubeEmbed } from "@/components/YoutubeEmbed";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return {
    title: t.sermons.metaTitle ?? t.sermons.title,
    description: t.sermons.metaDescription,
  };
}

export default async function SermonsPage() {
  const locale = await getLocale();
  const t = await getDictionary(locale);
  const sermonSummaries = await listPosts({
    publishedOnly: true,
    type: "sermon_summary",
  });
  const newsPosts = await listPosts({ publishedOnly: true, type: "news" });
  const dateLocale = locale === "ko" ? "ko-KR" : "en-US";

  return (
    <PageShell>
      <PageHeader title={t.sermons.title} intro={t.sermons.intro} />

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-foreground">
          {t.sermons.youtubeHeading}
        </h2>
        <YoutubeEmbed
          playlistId={YOUTUBE_UPLOADS_PLAYLIST_ID}
          title={t.sermons.youtubePlayerTitle}
          className="mt-4 max-w-lg"
        />
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-foreground">
          {t.sermons.listHeading}
        </h2>
        {sermonSummaries.length === 0 ? (
          <p className="mt-4 text-muted">{t.sermons.empty}</p>
        ) : (
          <ul className="mt-4 divide-y divide-border border-y border-border">
            {sermonSummaries.map((post) => (
              <li key={post.id} className="py-5">
                <Link href={`/sermons/${post.slug}`} className="group block">
                  <div className="flex flex-wrap items-center gap-2">
                    {parseYoutubeVideoId(post.youtubeUrl) ? (
                      <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent">
                        {t.sermons.hasVideo}
                      </span>
                    ) : null}
                    <h3 className="text-lg font-medium text-foreground group-hover:text-accent">
                      {post.title}
                    </h3>
                  </div>
                  <p className="mt-1 text-sm text-muted">
                    {new Date(
                      post.publishedAt ?? post.createdAt,
                    ).toLocaleDateString(dateLocale, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  {post.excerpt ? (
                    <p className="mt-2 text-muted">{post.excerpt}</p>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {newsPosts.length > 0 ? (
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-foreground">
            {t.sermons.newsHeading}
          </h2>
          <p className="mt-1 text-sm text-muted">{t.sermons.newsLabel}</p>
          <ul className="mt-4 divide-y divide-border border-y border-border">
            {newsPosts.map((post) => (
              <li key={post.id} className="py-5">
                <Link href={`/sermons/${post.slug}`} className="group block">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent">
                      {t.sermons.newsBadge}
                    </span>
                    <h3 className="text-lg font-medium text-foreground group-hover:text-accent">
                      {post.title}
                    </h3>
                  </div>
                  <p className="mt-1 text-sm text-muted">
                    {new Date(
                      post.publishedAt ?? post.createdAt,
                    ).toLocaleDateString(dateLocale, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  {post.excerpt ? (
                    <p className="mt-2 text-muted">{post.excerpt}</p>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </PageShell>
  );
}
