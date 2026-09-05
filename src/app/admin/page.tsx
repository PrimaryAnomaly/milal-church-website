import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import { listPosts } from "@/lib/posts";
import { AdminLogoutButton } from "@/components/AdminLogoutButton";
import { DeletePostButton } from "@/components/DeletePostButton";
import { PostForm } from "@/components/PostForm";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const ok = await isAdminAuthenticated();
  if (!ok) redirect("/admin/login");

  const posts = await listPosts();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">Admin</h1>
          <p className="mt-1 text-sm text-muted">Create, edit, and publish posts.</p>
        </div>
        <AdminLogoutButton />
      </div>

      <section className="mt-10 rounded-xl border border-stone-200 bg-white p-6">
        <h2 className="text-lg font-semibold">Create post</h2>
        <div className="mt-4">
          <PostForm />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">All posts</h2>
        {posts.length === 0 ? (
          <p className="mt-4 text-sm text-muted">No posts yet.</p>
        ) : (
          <ul className="mt-4 divide-y divide-stone-200 rounded-xl border border-stone-200 bg-white">
            {posts.map((post) => (
              <li
                key={post.id}
                className="flex flex-wrap items-center justify-between gap-3 p-4"
              >
                <div>
                  <p className="font-medium text-stone-900">{post.title}</p>
                  <p className="text-xs text-muted">
                    /{post.slug} · {post.published ? "Published" : "Draft"}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Link
                    href={`/admin/edit/${post.id}`}
                    className="text-sm text-accent hover:underline"
                  >
                    Edit
                  </Link>
                  {post.published ? (
                    <Link
                      href={`/posts/${post.slug}`}
                      className="text-sm text-stone-600 hover:underline"
                    >
                      View
                    </Link>
                  ) : null}
                  <DeletePostButton id={post.id} title={post.title} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
