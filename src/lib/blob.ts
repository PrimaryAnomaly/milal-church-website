/**
 * Vercel Blob helpers. Graceful when BLOB_READ_WRITE_TOKEN is unset.
 */

export function isBlobConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export type UploadResult =
  | { ok: true; url: string }
  | { ok: false; error: string; skipped?: boolean };

export async function uploadImage(
  file: File | Blob,
  filename: string
): Promise<UploadResult> {
  if (!isBlobConfigured()) {
    return {
      ok: false,
      skipped: true,
      error:
        "BLOB_READ_WRITE_TOKEN is not set. Image upload is disabled; paste an external URL instead.",
    };
  }

  try {
    const { put } = await import("@vercel/blob");
    const blob = await put(filename, file, {
      access: "public",
      addRandomSuffix: true,
    });
    return { ok: true, url: blob.url };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed";
    return { ok: false, error: message };
  }
}
