/**
 * In-memory login throttle. Per serverless instance; enough to deter bots
 * on a low-traffic church site. Not a distributed lock.
 */

type Bucket = {
  fails: number;
  lockedUntil: number;
};

const buckets = new Map<string, Bucket>();

const FREE_TRIES = 5;
const MAX_LOCK_MS = 15 * 60 * 1000;

function lockMs(fails: number): number {
  if (fails < FREE_TRIES) return 0;
  const step = fails - FREE_TRIES;
  return Math.min(MAX_LOCK_MS, 30_000 * 2 ** step);
}

export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

export function loginAllowed(ip: string): { ok: true } | { ok: false; retryAfterSec: number } {
  const now = Date.now();
  const bucket = buckets.get(ip);
  if (!bucket) return { ok: true };
  if (bucket.lockedUntil > now) {
    return {
      ok: false,
      retryAfterSec: Math.max(1, Math.ceil((bucket.lockedUntil - now) / 1000)),
    };
  }
  return { ok: true };
}

export function recordLoginFailure(ip: string): { retryAfterSec: number } {
  const prev = buckets.get(ip);
  const fails = (prev?.fails ?? 0) + 1;
  const wait = lockMs(fails);
  buckets.set(ip, { fails, lockedUntil: Date.now() + wait });
  return { retryAfterSec: Math.ceil(wait / 1000) };
}

export function recordLoginSuccess(ip: string): void {
  buckets.delete(ip);
}
