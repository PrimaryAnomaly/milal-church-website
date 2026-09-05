import Link from "next/link";
import { listPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const posts = (await listPosts({ publishedOnly: true })).slice(0, 3);

  return (
    <div>
      <section className="bg-gradient-to-b from-amber-50 to-background">
        <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:py-28">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent">
            Welcome
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl">
            Milal Church
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted">
            A placeholder home for our congregation. Join us as we grow in faith,
            serve our neighbors, and share the good news together.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/about"
              className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white hover:bg-orange-900"
            >
              About us
            </Link>
            <Link
              href="/posts"
              className="rounded-full border border-stone-300 bg-white px-6 py-2.5 text-sm font-medium text-stone-800 hover:border-stone-400"
            >
              Latest posts
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold text-stone-900">Recent posts</h2>
          <Link href="/posts" className="text-sm text-accent hover:underline">
            View all
          </Link>
        </div>
        {posts.length === 0 ? (
          <p className="rounded-xl border border-dashed border-stone-300 bg-white p-8 text-center text-muted">
            No published posts yet. Admins can create posts in the admin area.
          </p>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-3">
            {posts.map((post) => (
              <li
                key={post.id}
                className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm"
              >
                <h3 className="font-medium text-stone-900">
                  <Link href={`/posts/${post.slug}`} className="hover:text-accent">
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-2 line-clamp-3 text-sm text-muted">
                  {post.excerpt || "Read more..."}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="border-t border-stone-200 bg-white">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 py-16 sm:grid-cols-3">
          {[
            {
              title: "Worship",
              body: "Sunday gatherings with scripture, prayer, and fellowship. Times TBD.",
            },
            {
              title: "Community",
              body: "Small groups, meals, and neighborhood outreach throughout the week.",
            },
            {
              title: "Serve",
              body: "Local missions and care ministries — placeholder details coming soon.",
            },
          ].map((item) => (
            <div key={item.title}>
              <h3 className="text-lg font-semibold text-stone-900">{item.title}</h3>
              <p className="mt-2 text-sm text-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
