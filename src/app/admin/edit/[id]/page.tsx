import { notFound, redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import { getPostById } from "@/lib/posts";
import { getDictionary } from "@/i18n/get-dictionary";
import { ButtonLink } from "@/components/Button";
import { DeletePostButton } from "@/components/DeletePostButton";
import { PageShell } from "@/components/PageShell";
import { PostForm } from "@/components/PostForm";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function EditPostPage({ params }: Props) {
  const ok = await isAdminAuthenticated();
  if (!ok) redirect("/admin/login");

  const { id } = await params;
  const post = await getPostById(id);
  if (!post) notFound();
  const t = await getDictionary();

  return (
    <PageShell>
      <ButtonLink href="/admin" variant="secondary">
        {t.admin.back}
      </ButtonLink>
      <h1 className="mt-4 text-3xl font-semibold text-foreground">
        {t.admin.editTitle}
      </h1>
      <p className="mt-2 text-lg text-muted">{post.title}</p>
      <div className="mt-6 rounded-xl border border-border bg-surface p-6 sm:p-8">
        <PostForm post={post} labels={t.admin} />
      </div>
      <div className="mt-8">
        <DeletePostButton
          id={post.id}
          title={post.title}
          label={t.admin.delete}
          deletingLabel={t.admin.deleting}
          confirmLabel={t.admin.confirmDelete}
          failedLabel={t.admin.deleteFailed}
        />
      </div>
    </PageShell>
  );
}
