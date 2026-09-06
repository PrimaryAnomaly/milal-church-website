import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import { getPostById } from "@/lib/posts";
import { PostForm } from "@/components/PostForm";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function EditPostPage({ params }: Props) {
  const ok = await isAdminAuthenticated();
  if (!ok) redirect("/admin/login");

  const { id } = await params;
  const post = await getPostById(id);
  if (!post) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Link href="/admin" className="text-sm text-accent hover:underline">
        &larr; 관리자로 / Back to admin
      </Link>
      <h1 className="mt-4 text-2xl font-semibold text-foreground">
        게시물 수정 / Edit post
      </h1>
      <div className="mt-6 rounded-xl border border-border bg-white p-6">
        <PostForm post={post} />
      </div>
    </div>
  );
}
