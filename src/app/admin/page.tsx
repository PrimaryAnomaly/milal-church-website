import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import { listPosts } from "@/lib/posts";
import { getDictionary } from "@/i18n/get-dictionary";
import { AdminLogoutButton } from "@/components/AdminLogoutButton";
import { DeletePostButton } from "@/components/DeletePostButton";
import { PageShell } from "@/components/PageShell";
import { PostForm } from "@/components/PostForm";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const ok = await isAdminAuthenticated();
  if (!ok) redirect("/admin/login");

  const t = await getDictionary();
  const posts = await listPosts();

  return (
    <PageShell>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">{t.admin.title}</h1>
          <p className="mt-1 text-sm text-muted">{t.admin.subtitle}</p>
        </div>
        <AdminLogoutButton label={t.admin.logout} />
      </div>

      <section className="mt-10 rounded-xl border border-border bg-white p-6">
        <h2 className="text-lg font-semibold">{t.admin.createHeading}</h2>
        <div className="mt-4">
          <PostForm labels={t.admin} />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">{t.admin.allPostsHeading}</h2>
        {posts.length === 0 ? (
          <p className="mt-4 text-sm text-muted">{t.admin.empty}</p>
        ) : (
          <ul className="mt-4 divide-y divide-border rounded-xl border border-border bg-white">
            {posts.map((post) => (
              <li
                key={post.id}
                className="flex flex-wrap items-center justify-between gap-3 p-4"
              >
                <div>
                  <p className="font-medium text-foreground">{post.title}</p>
                  <p className="text-xs text-muted">
                    {post.type === "news" ? t.admin.typeNews : t.admin.typeSermon}
                    {" · "}
                    {post.published ? t.admin.published : t.admin.draft}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Link
                    href={`/admin/edit/${post.id}`}
                    className="text-sm text-accent hover:underline"
                  >
                    {t.admin.edit}
                  </Link>
                  {post.published ? (
                    <Link
                      href={`/sermons/${post.slug}`}
                      className="text-sm text-muted hover:underline"
                    >
                      {t.admin.view}
                    </Link>
                  ) : null}
                  <DeletePostButton
                    id={post.id}
                    title={post.title}
                    label={t.admin.delete}
                    deletingLabel={t.admin.deleting}
                    confirmLabel={t.admin.confirmDelete}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </PageShell>
  );
}
