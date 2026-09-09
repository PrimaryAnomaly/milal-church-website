import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import { listPosts } from "@/lib/posts";
import { getDictionary } from "@/i18n/get-dictionary";
import { AdminLogoutButton } from "@/components/AdminLogoutButton";
import { ButtonLink } from "@/components/Button";
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
          <h1 className="text-3xl font-semibold text-foreground">{t.admin.title}</h1>
          <p className="mt-2 max-w-[65ch] text-lg text-muted">{t.admin.subtitle}</p>
        </div>
        <AdminLogoutButton label={t.admin.logout} />
      </div>

      <section className="mt-10 rounded-xl border border-border bg-surface p-6 sm:p-8">
        <h2 className="text-2xl font-semibold">{t.admin.createHeading}</h2>
        <div className="mt-6">
          <PostForm labels={t.admin} />
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">{t.admin.allPostsHeading}</h2>
        {posts.length === 0 ? (
          <p className="mt-4 text-lg text-muted">{t.admin.empty}</p>
        ) : (
          <ul className="mt-4 divide-y divide-border rounded-xl border border-border bg-surface">
            {posts.map((post) => (
              <li key={post.id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xl font-medium text-foreground">{post.title}</p>
                  <p className="mt-1 text-base text-muted">
                    {post.type === "news" ? t.admin.typeNews : t.admin.typeSermon}
                    {" · "}
                    {post.published ? t.admin.published : t.admin.draft}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <ButtonLink href={`/admin/edit/${post.id}`} className="text-lg">
                    {t.admin.edit}
                  </ButtonLink>
                  {post.published ? (
                    <ButtonLink
                      href={`/sermons/${post.slug}`}
                      variant="secondary"
                      className="text-lg"
                    >
                      {t.admin.view}
                    </ButtonLink>
                  ) : null}
                  <DeletePostButton
                    id={post.id}
                    title={post.title}
                    label={t.admin.delete}
                    deletingLabel={t.admin.deleting}
                    confirmLabel={t.admin.confirmDelete}
                    failedLabel={t.admin.deleteFailed}
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
