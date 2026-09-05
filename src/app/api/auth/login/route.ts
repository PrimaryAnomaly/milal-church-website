import { NextResponse } from "next/server";
import { createAdminSession, verifyAdminSecret } from "@/lib/auth";

export async function POST(request: Request) {
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
      { status: 500 }
    );
  }

  if (!verifyAdminSecret(secret)) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  await createAdminSession();
  return NextResponse.json({ ok: true });
}
