import { NextResponse } from "next/server";
import { FASTAPI_BACKEND_URL } from "@/lib/config";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const ref = searchParams.get("ref");
    const cnic = searchParams.get("cnic");

    if (!ref) {
      return NextResponse.json(
        { error: "Case reference number is required." },
        { status: 400 }
      );
    }

    const query = new URLSearchParams({ ref });
    if (cnic) query.append("cnic", cnic);

    const backendRes = await fetch(
      `${FASTAPI_BACKEND_URL}/api/tax/track?${query.toString()}`,
      { cache: "no-store" }
    );

    if (backendRes.ok) {
      const data = await backendRes.json();
      return NextResponse.json(data);
    }

    if (backendRes.status === 404) {
      return NextResponse.json(
        { error: "Case record not found. Please check your reference and CNIC." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Failed to fetch status from cloud database." },
      { status: 502 }
    );
  } catch (err: any) {
    console.error("Tracking API error:", err);
    return NextResponse.json(
      { error: "Internal server error. Please contact WhatsApp desk." },
      { status: 500 }
    );
  }
}
