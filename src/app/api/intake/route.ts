import { NextResponse } from "next/server";
import { FASTAPI_BACKEND_URL, SITE_CONFIG } from "@/lib/config";
import { formatWhatsAppUrl } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      fullName,
      phone,
      email,
      cnic,
      persona = "salaried",
      irisStatus = "active",
      serviceTier = "assistance_2500",
      contactPreference = "whatsapp",
      clientNotes = "",
      documentsSummary = "",
      source = "web_intake",
      residentialAddress,
      simOwner,
      relativeName,
      relativeCnic,
      relativeRelation,
      needEmailHelp,
      incomeDetails,
      familyConsolidation,
      whtAudit,
      fbrPayload,
    } = body;

    if (!fullName || !phone) {
      return NextResponse.json(
        { error: "Name and Phone number are required." },
        { status: 400 }
      );
    }

    // Compose diagnostic notes
    const consolidatedNotes = [
      clientNotes,
      simOwner === "relative"
        ? `SIM on Relative: ${relativeName || ""} (${relativeRelation || ""}, CNIC: ${relativeCnic || ""})`
        : null,
      needEmailHelp ? "Customer requests email creation assistance" : null,
      residentialAddress ? `Address: ${residentialAddress}` : null,
      incomeDetails ? `Income Source: ${incomeDetails}` : null,
      familyConsolidation ? "Family group filing requested" : null,
      whtAudit ? "Full source withholding tax claim audit requested" : null,
    ]
      .filter(Boolean)
      .join(" | ");

    const backendPayload = {
      fullName: fullName.trim(),
      phone: phone.trim(),
      cnic: cnic ? cnic.replace(/\D/g, "") : null,
      email: needEmailHelp ? "needs_email_help@fbr.local" : email?.trim() || null,
      persona,
      irisStatus,
      serviceTier,
      contactPreference,
      notes: consolidatedNotes || null,
      documentsSummary: documentsSummary?.trim() || null,
      source,
      fbrPayload: fbrPayload || null,
    };

    // Forward to FastAPI Cloud Backend Authority
    try {
      const backendRes = await fetch(`${FASTAPI_BACKEND_URL}/api/tax/intake`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(backendPayload),
        cache: "no-store",
        signal: AbortSignal.timeout(20000),
      });

      if (backendRes.ok) {
        const data = await backendRes.json();
        return NextResponse.json({
          success: true,
          reference: data.reference,
          todoistTaskId: data.todoistTaskId,
          status: data.status || "pending",
          message: data.message || "Filing intake recorded successfully.",
        });
      }

      const errData = await backendRes.json().catch(() => null);
      console.error("[FastAPI Cloud] Non-200 response:", backendRes.status, errData);
    } catch (backendErr) {
      console.error("[FastAPI Cloud] Connection error:", backendErr);
    }

    // Fail-fast with clear WhatsApp fallback rather than silent fake success
    const fallbackWhatsAppUrl = formatWhatsAppUrl(
      `Hi, I attempted to submit my Tax Year ${SITE_CONFIG.taxYear} return for ${fullName.trim()} (${phone.trim()}), but experienced a network issue. Please log my case.`
    );

    return NextResponse.json(
      {
        error:
          "Unable to persist filing case to cloud database. Please connect with our direct tax desk on WhatsApp.",
        fallbackWhatsAppUrl,
      },
      { status: 503 }
    );
  } catch (err: any) {
    console.error("Intake processing error:", err);
    return NextResponse.json(
      {
        error:
          "Internal server error processing intake. Please contact our desk directly on WhatsApp.",
      },
      { status: 500 }
    );
  }
}
