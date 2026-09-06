import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import { listPosts } from "@/lib/posts";
import { AdminLogoutButton } from "@/components/AdminLogoutButton";
import { DeletePostButton } from "@/components/DeletePostButton";
import { PostForm } from "@/components/PostForm";

export const dynamic = "force-dynamic";

function typeLabel(type: string): string {
  return type === "news" ? "소식 (news)" : "설교요약 (sermon_summary)";
}

export default async function AdminPage() {
  const ok = await isAdminAuthenticated();
  if (!ok) redirect("/admin/login");

  const posts = await listPosts();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">관리자 / Admin</h1>
          <p className="mt-1 text-sm text-muted">
            게시물 작성·수정·게시 (Admin v1은 한국어 중심)
          </p>
        </div>
        <AdminLogoutButton />
      </div>

      <section className="mt-10 rounded-xl border border-border bg-white p-6">
        <h2 className="text-lg font-semibold">새 게시물 / Create post</h2>
        <div className="mt-4">
          <PostForm />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">전체 게시물 / All posts</h2>
        {posts.length === 0 ? (
          <p className="mt-4 text-sm text-muted">아직 게시물이 없습니다.</p>
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
                    {typeLabel(post.type)} · /{post.slug} ·{" "}
                    {post.published ? "게시됨 (Published)" : "초안 (Draft)"}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Link
                    href={`/admin/edit/${post.id}`}
                    className="text-sm text-accent hover:underline"
                  >
                    수정
                  </Link>
                  {post.published ? (
                    <Link
                      href={`/sermons/${post.slug}`}
                      className="text-sm text-muted hover:underline"
                    >
                      보기
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
