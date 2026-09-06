/**
 * Public origin for absolute URLs (metadata, sitemap, JSON-LD).
 * Prefers NEXT_PUBLIC_SITE_URL, then Vercel production/deployment hosts.
 * Trailing slashes are stripped; Vercel hosts always use https.
 */
const LOCAL_FALLBACK = "http://localhost:3000";

function isVercelHostname(hostname: string): boolean {
  return hostname === "vercel.app" || hostname.endsWith(".vercel.app");
}

function originFrom(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  const withScheme = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  let parsed: URL;
  try {
    parsed = new URL(withScheme);
  } catch {
    return null;
  }

  if (isVercelHostname(parsed.hostname)) {
    parsed.protocol = "https:";
  }

  return parsed.origin;
}

export function getSiteUrl(): string {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL,
  ];

  for (const candidate of candidates) {
    if (!candidate) continue;
    const origin = originFrom(candidate);
    if (origin) return origin;
  }

  return LOCAL_FALLBACK;
}

/** Join the site origin with a path. No trailing slash on `/`; no double slashes. */
export function absoluteUrl(path = "/"): string {
  const origin = getSiteUrl();
  const pathname = path.startsWith("/") ? path : `/${path}`;
  if (pathname === "/") return origin;
  return `${origin}${pathname.replace(/\/{2,}/g, "/")}`;
}
