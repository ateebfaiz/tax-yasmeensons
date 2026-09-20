import { NextResponse } from "next/server";
import { FASTAPI_BACKEND_URL } from "@/lib/config";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const backendRes = await fetch(`${FASTAPI_BACKEND_URL}/api/tax/document`, {
      method: "POST",
      body: form,
      cache: "no-store",
      signal: AbortSignal.timeout(30000),
    });
    const data = await backendRes.json().catch(() => ({}));
    if (!backendRes.ok) {
      return NextResponse.json(
        { error: data.detail || data.error || "Could not save the file." },
        { status: backendRes.status === 400 ? 400 : 502 }
      );
    }
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Could not reach file storage. Please send the document on WhatsApp." },
      { status: 503 }
    );
  }
}
