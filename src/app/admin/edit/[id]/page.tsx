import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import { getPostById } from "@/lib/posts";
import { getDictionary } from "@/i18n/get-dictionary";
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
      <Link href="/admin" className="text-sm text-accent hover:underline">
        {t.admin.back}
      </Link>
      <h1 className="mt-4 text-2xl font-semibold text-foreground">
        {t.admin.editTitle}
      </h1>
      <div className="mt-6 rounded-xl border border-border bg-white p-6">
        <PostForm post={post} labels={t.admin} />
      </div>
    </PageShell>
  );
}
