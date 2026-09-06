"use client";

import { useRouter } from "next/navigation";

export function AdminLogoutButton({ label }: { label: string }) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={() => void logout()}
      className="rounded-full border border-border px-4 py-2 text-sm hover:bg-accent-soft"
    >
      {label}
    </button>
  );
}
