import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, listPosts } from "@/lib/posts";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post || !post.published) {
    const t = await getDictionary();
    return { title: t.sermons.title };
  }
  return {
    title: post.title,
    description: post.excerpt || undefined,
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

  return (
    <article className="mx-auto max-w-3xl px-4 py-14">
      <Link href="/sermons" className="text-sm text-accent hover:underline">
        &larr; {t.sermons.back}
      </Link>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {post.title}
      </h1>
      <p className="mt-3 text-sm text-muted">
        {new Date(post.createdAt).toLocaleDateString(
          locale === "ko" ? "ko-KR" : "en-US",
          { year: "numeric", month: "long", day: "numeric" },
        )}
      </p>
      {post.coverImageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.coverImageUrl}
          alt=""
          className="mt-8 max-h-96 w-full rounded-xl object-cover"
        />
      ) : null}
      <div className="prose prose-stone mt-8 max-w-none whitespace-pre-wrap text-foreground/90">
        {post.content || post.excerpt || "—"}
      </div>
    </article>
  );
}
