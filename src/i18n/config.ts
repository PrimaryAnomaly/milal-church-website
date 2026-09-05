export const locales = ["en", "ko"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const LOCALE_COOKIE = "milal_locale";

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "en" || value === "ko";
}

/** Parse Accept-Language: Korean preferred → ko, else en. */
export function localeFromAcceptLanguage(header: string | null): Locale {
  if (!header) return defaultLocale;
  const parts = header.split(",").map((p) => {
    const [tag, ...params] = p.trim().split(";");
    let q = 1;
    for (const param of params) {
      const m = param.trim().match(/^q=([0-9.]+)$/i);
      if (m) q = Number(m[1]) || 0;
    }
    return { tag: (tag || "").toLowerCase(), q };
  });
  parts.sort((a, b) => b.q - a.q);
  for (const { tag } of parts) {
    if (tag === "ko" || tag.startsWith("ko-")) return "ko";
  }
  return defaultLocale;
}
