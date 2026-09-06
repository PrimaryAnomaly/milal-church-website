"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type DeletePostButtonProps = {
  id: string;
  title: string;
  label: string;
  deletingLabel: string;
  confirmLabel: string;
};

export function DeletePostButton({
  id,
  title,
  label,
  deletingLabel,
  confirmLabel,
}: DeletePostButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onDelete() {
    if (!confirm(`${confirmLabel}\n${title}`)) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Delete failed");
        return;
      }
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
      className="text-sm text-red-700 hover:underline disabled:opacity-60"
    >
      {loading ? deletingLabel : label}
    </button>
  );
}
