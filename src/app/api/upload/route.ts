import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { isBlobConfigured, uploadImage } from "@/lib/blob";

export async function POST(request: Request) {
  const ok = await isAdminAuthenticated();
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!isBlobConfigured()) {
    return NextResponse.json(
      {
        error:
          "BLOB_READ_WRITE_TOKEN is not set. Paste an external image URL instead.",
        skipped: true,
      },
      { status: 503 }
    );
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "file is required" }, { status: 400 });
  }

  const result = await uploadImage(file, file.name || "upload.bin");
  if (!result.ok) {
    return NextResponse.json(
      { error: result.error, skipped: result.skipped },
      { status: result.skipped ? 503 : 500 }
    );
  }
  return NextResponse.json({ url: result.url });
}
