import { NextResponse } from "next/server";
import { createAdminSession, verifyAdminSecret } from "@/lib/auth";
import {
  clientIp,
  loginAllowed,
  recordLoginFailure,
  recordLoginSuccess,
} from "@/lib/rate-limit";

export async function POST(request: Request) {
  const ip = clientIp(request);
  const gate = loginAllowed(ip);
  if (!gate.ok) {
    return NextResponse.json(
      { error: "Too many attempts", retryAfterSec: gate.retryAfterSec },
      {
        status: 429,
        headers: { "Retry-After": String(gate.retryAfterSec) },
      },
    );
  }

  let body: { secret?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const secret = body.secret ?? "";
  if (!process.env.ADMIN_SECRET) {
    return NextResponse.json(
      { error: "ADMIN_SECRET is not configured on the server" },
      { status: 500 },
    );
  }

  if (!verifyAdminSecret(secret)) {
    const { retryAfterSec } = recordLoginFailure(ip);
    if (retryAfterSec > 0) {
      return NextResponse.json(
        { error: "Too many attempts", retryAfterSec },
        {
          status: 429,
          headers: { "Retry-After": String(retryAfterSec) },
        },
      );
    }
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  recordLoginSuccess(ip);
  await createAdminSession();
  return NextResponse.json({ ok: true });
}
