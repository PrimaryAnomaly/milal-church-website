"use client";

import { useRouter } from "next/navigation";
import { LOCALE_COOKIE, type Locale } from "@/i18n/config";

type Props = {
  locale: Locale;
  labelEn: string;
  labelKo: string;
  ariaLabel: string;
};

function setLocalePreference(next: Locale) {
  const maxAge = 60 * 60 * 24 * 365;
  document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=${maxAge}; samesite=lax`;
  try {
    localStorage.setItem(LOCALE_COOKIE, next);
  } catch {
    /* ignore */
  }
  document.documentElement.lang = next;
}

export function LocaleToggle({ locale, labelEn, labelKo, ariaLabel }: Props) {
  const router = useRouter();

  function select(next: Locale) {
    if (next === locale) return;
    setLocalePreference(next);
    router.refresh();
  }

  return (
    <div
      className="inline-flex items-center rounded-full border border-border bg-white p-0.5 text-xs font-medium"
      role="group"
      aria-label={ariaLabel}
    >
      <button
        type="button"
        onClick={() => select("en")}
        className={`rounded-full px-2.5 py-1 transition-colors ${
          locale === "en"
            ? "bg-accent text-white"
            : "text-muted hover:text-foreground"
        }`}
        aria-pressed={locale === "en"}
      >
        {labelEn}
      </button>
      <button
        type="button"
        onClick={() => select("ko")}
        className={`rounded-full px-2.5 py-1 transition-colors ${
          locale === "ko"
            ? "bg-accent text-white"
            : "text-muted hover:text-foreground"
        }`}
        aria-pressed={locale === "ko"}
      >
        {labelKo}
      </button>
    </div>
  );
}
