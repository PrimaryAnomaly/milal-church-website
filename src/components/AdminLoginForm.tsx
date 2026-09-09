"use client";

import { FormEvent, useId, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./Button";

type AdminLoginFormProps = {
  passwordLabel: string;
  submitLabel: string;
  submittingLabel: string;
  wrongPassword: string;
  tooManyTries: string;
  networkError: string;
  notConfigured: string;
  showPassword: string;
  hidePassword: string;
};

export function AdminLoginForm({
  passwordLabel,
  submitLabel,
  submittingLabel,
  wrongPassword,
  tooManyTries,
  networkError,
  notConfigured,
  showPassword,
  hidePassword,
}: AdminLoginFormProps) {
  const router = useRouter();
  const [secret, setSecret] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState<
    "password" | "network" | "config" | "locked" | null
  >(null);
  const [loading, setLoading] = useState(false);
  const errorId = useId();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret }),
      });
      if (res.status === 429) {
        setError("locked");
        return;
      }
      if (res.status === 401) {
        setError("password");
        return;
      }
      if (!res.ok) {
        setError(res.status === 500 ? "config" : "network");
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("network");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 max-w-md space-y-5 text-lg">
      <label className="block">
        <span className="font-medium text-foreground">{passwordLabel}</span>
        <span className="relative mt-2 block">
          <input
            type={visible ? "text" : "password"}
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            className="min-h-12 w-full rounded-lg border border-border bg-surface px-4 py-3 pr-24 text-lg outline-none focus:border-accent"
            autoComplete="current-password"
            required
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
          />
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className="absolute inset-y-0 right-1 my-1 min-h-11 rounded-md px-4 text-base text-accent hover:bg-accent-soft"
          >
            {visible ? hidePassword : showPassword}
          </button>
        </span>
      </label>
      {error ? (
        <p id={errorId} role="alert" className="text-base text-danger">
          {error === "password"
            ? wrongPassword
            : error === "locked"
              ? tooManyTries
              : error === "config"
                ? notConfigured
                : networkError}
        </p>
      ) : null}
      <Button type="submit" disabled={loading} className="w-full text-lg">
        {loading ? submittingLabel : submitLabel}
      </Button>
    </form>
  );
}
