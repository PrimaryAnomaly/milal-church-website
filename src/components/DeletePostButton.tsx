"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./Button";

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
    <Button
      variant="danger"
      className="text-lg"
      onClick={() => void onDelete()}
      disabled={loading}
    >
      {loading ? deletingLabel : label}
    </Button>
  );
}
