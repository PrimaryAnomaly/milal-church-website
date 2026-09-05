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
  const posts = await listPosts({ publishedOnly: true });

  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <p className="text-sm font-medium uppercase tracking-widest text-accent">
        {t.nav.sermons}
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
        {t.sermons.title}
      </h1>
      <p className="mt-3 text-muted">{t.sermons.intro}</p>

      <section className="mt-8 rounded-xl border border-border bg-accent-soft/40 p-6">
        <h2 className="text-lg font-semibold text-foreground">
          {t.sermons.youtubeHeading}
        </h2>
        <a
          href={CHURCH.youtubeUrl}
          className="mt-2 inline-block font-medium text-accent hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.sermons.youtubeCta}
        </a>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-foreground">
          {t.sermons.listHeading}
        </h2>
        {posts.length === 0 ? (
          <p className="mt-4 rounded-xl border border-dashed border-border bg-white p-8 text-center text-muted">
            {t.sermons.empty}
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-border rounded-xl border border-border bg-white">
            {posts.map((post) => (
              <li key={post.id} className="p-5">
                <Link href={`/sermons/${post.slug}`} className="group block">
                  <h3 className="text-lg font-medium text-foreground group-hover:text-accent">
                    {post.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted">
                    {new Date(post.createdAt).toLocaleDateString(
                      locale === "ko" ? "ko-KR" : "en-US",
                      { year: "numeric", month: "long", day: "numeric" },
                    )}
                  </p>
                  {post.excerpt ? (
                    <p className="mt-2 text-sm text-muted">{post.excerpt}</p>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
