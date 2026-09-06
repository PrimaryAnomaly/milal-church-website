"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type DeletePostButtonProps = {
  id: string;
  title: string;
  label: string;
  deletingLabel: string;
  confirmLabel: string;
  failedLabel: string;
};

export function DeletePostButton({
  id,
  title,
  label,
  deletingLabel,
  confirmLabel,
  failedLabel,
}: DeletePostButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onDelete() {
    if (!confirm(`${confirmLabel}\n\n${title}`)) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
      if (!res.ok) {
        alert(failedLabel);
        return;
      }
      router.push("/admin");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={() => void onDelete()}
      disabled={loading}
      className="inline-flex min-h-12 items-center justify-center rounded-full border border-red-300 px-5 py-2 text-lg text-red-800 hover:bg-red-50 disabled:opacity-60"
    >
      {loading ? deletingLabel : label}
    </button>
  );
}
