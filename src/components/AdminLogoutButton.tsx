"use client";

import { useRouter } from "next/navigation";
import { Button } from "./Button";

export function AdminLogoutButton({ label }: { label: string }) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <Button variant="secondary" className="text-lg" onClick={() => void logout()}>
      {label}
    </Button>
  );
}
