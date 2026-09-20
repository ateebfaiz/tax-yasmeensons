import { NextResponse } from "next/server";
import { signedGetUrl } from "@/lib/s3";

export async function GET(req: Request) {
  try {
    const key = new URL(req.url).searchParams.get("key") || "";
    const url = await signedGetUrl(key);
    return NextResponse.redirect(url, 302);
  } catch {
    return NextResponse.json({ error: "Document not found." }, { status: 404 });
  }
}
