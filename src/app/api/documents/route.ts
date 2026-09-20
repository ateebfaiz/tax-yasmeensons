import { NextResponse } from "next/server";
import { putTaxObject, TAX_PREFIX, viewPath } from "@/lib/s3";

const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
]);
const MAX_BYTES = 15 * 1024 * 1024;

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file");
    const category = String(form.get("category") || "other");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Choose a file to upload." }, { status: 400 });
    }

    const contentType = (file.type || "application/octet-stream").split(";")[0].trim();
    if (!ALLOWED.has(contentType)) {
      return NextResponse.json(
        { error: "Please upload a JPG, PNG, WebP, GIF, or PDF." },
        { status: 400 }
      );
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "File is larger than 15 MB." }, { status: 400 });
    }

    const safeName = (file.name || "document").replace(/[^A-Za-z0-9._-]+/g, "_").slice(0, 80);
    const key = `${TAX_PREFIX}${crypto.randomUUID()}/${safeName}`;
    const body = Buffer.from(await file.arrayBuffer());
    await putTaxObject(key, body, contentType);

    return NextResponse.json({
      key,
      url: viewPath(key),
      name: file.name || safeName,
      category,
      size: file.size,
      type: contentType,
      bucket: process.env.S3_BUCKET || "assets",
    });
  } catch (err) {
    console.error("[documents] put failed:", err instanceof Error ? err.message : err);
    return NextResponse.json(
      { error: "Could not save the file to storage. Please try again or send it on WhatsApp." },
      { status: 502 }
    );
  }
}
