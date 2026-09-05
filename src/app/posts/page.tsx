import type { Metadata } from "next";
import Link from "next/link";
import { listPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Posts",
};

export const dynamic = "force-dynamic";

export default async function PostsPage() {
  const posts = await listPosts({ publishedOnly: true });

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-sm font-medium uppercase tracking-widest text-accent">Updates</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900">Posts</h1>
      <p className="mt-3 text-muted">
        Sermons notes, announcements, and community news from Milal Church.
      </p>

      {posts.length === 0 ? (
        <p className="mt-10 rounded-xl border border-dashed border-stone-300 bg-white p-8 text-center text-muted">
          No published posts yet.
        </p>
      ) : (
        <ul className="mt-10 divide-y divide-stone-200 rounded-xl border border-stone-200 bg-white">
          {posts.map((post) => (
            <li key={post.id} className="p-5">
              <Link href={`/posts/${post.slug}`} className="group block">
                <h2 className="text-lg font-medium text-stone-900 group-hover:text-accent">
                  {post.title}
                </h2>
                <p className="mt-1 text-xs text-muted">
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                {post.excerpt ? (
                  <p className="mt-2 text-sm text-stone-600">{post.excerpt}</p>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
