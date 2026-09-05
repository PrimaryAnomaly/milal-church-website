import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, listPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post || !post.published) return { title: "Post" };
  return {
    title: post.title,
    description: post.excerpt || undefined,
  };
}

export async function generateStaticParams() {
  const posts = await listPosts({ publishedOnly: true });
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function PostDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post || !post.published) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <Link href="/posts" className="text-sm text-accent hover:underline">
        &larr; All posts
      </Link>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
        {post.title}
      </h1>
      <p className="mt-3 text-sm text-muted">
        {new Date(post.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      {post.coverImageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.coverImageUrl}
          alt=""
          className="mt-8 max-h-96 w-full rounded-xl object-cover"
        />
      ) : null}
      <div className="prose prose-stone mt-8 max-w-none whitespace-pre-wrap text-stone-700">
        {post.content || post.excerpt || "No content."}
      </div>
    </article>
  );
}
