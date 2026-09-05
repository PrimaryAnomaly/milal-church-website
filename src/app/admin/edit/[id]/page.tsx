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
        &larr; Back to admin
      </Link>
      <h1 className="mt-4 text-2xl font-semibold text-stone-900">Edit post</h1>
      <div className="mt-6 rounded-xl border border-stone-200 bg-white p-6">
        <PostForm post={post} />
      </div>
    </div>
  );
}
