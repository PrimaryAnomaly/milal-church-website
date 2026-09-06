import type { Metadata } from "next";
import Link from "next/link";
import { listPosts } from "@/lib/posts";
import { CHURCH } from "@/lib/church";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return { title: t.sermons.title };
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
    <div className="mx-auto max-w-3xl px-4 py-14">
      <p className="text-sm font-medium uppercase tracking-widest text-accent">
        {t.nav.sermons}
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {t.sermons.title}
      </h1>
      <p className="mt-3 text-base text-muted sm:text-lg">{t.sermons.intro}</p>

      <section className="mt-8 rounded-xl border border-border bg-accent-soft/40 p-6">
        <h2 className="text-xl font-semibold text-foreground">
          {t.sermons.youtubeHeading}
        </h2>
        <p className="mt-1 text-sm text-muted">{CHURCH.youtubeHandle}</p>
        <a
          href={CHURCH.youtubeUrl}
          className="mt-3 inline-flex items-center rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-[#FAF7F2] hover:bg-[#9A3412]"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.sermons.youtubeCta}
        </a>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-foreground">
          {t.sermons.listHeading}
        </h2>
        {sermonSummaries.length === 0 ? (
          <p className="mt-4 rounded-xl border border-dashed border-border bg-white p-8 text-center text-muted">
            {t.sermons.empty}
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-border rounded-xl border border-border bg-white">
            {sermonSummaries.map((post) => (
              <li key={post.id} className="p-5">
                <Link href={`/sermons/${post.slug}`} className="group block">
                  <h3 className="text-lg font-medium text-foreground group-hover:text-accent">
                    {post.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted">
                    {new Date(post.publishedAt ?? post.createdAt).toLocaleDateString(
                      dateLocale,
                      { year: "numeric", month: "long", day: "numeric" },
                    )}
                  </p>
                  {post.excerpt ? (
                    <p className="mt-2 text-base text-muted">{post.excerpt}</p>
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
          <ul className="mt-4 divide-y divide-border rounded-xl border border-border bg-white">
            {newsPosts.map((post) => (
              <li key={post.id} className="p-5">
                <Link href={`/sermons/${post.slug}`} className="group block">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-border bg-accent-soft px-2 py-0.5 text-xs font-medium text-accent">
                      {t.sermons.newsBadge}
                    </span>
                    <h3 className="text-lg font-medium text-foreground group-hover:text-accent">
                      {post.title}
                    </h3>
                  </div>
                  <p className="mt-1 text-xs text-muted">
                    {new Date(post.publishedAt ?? post.createdAt).toLocaleDateString(
                      dateLocale,
                      { year: "numeric", month: "long", day: "numeric" },
                    )}
                  </p>
                  {post.excerpt ? (
                    <p className="mt-2 text-base text-muted">{post.excerpt}</p>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
