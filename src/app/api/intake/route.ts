import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { taxFilings } from "@/lib/db/schema";
import { generateReference } from "@/lib/utils";

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
      credentialsNotes = "",
      documentsSummary = "",
      source = "web_intake",
    } = body;

    if (!fullName || !phone) {
      return NextResponse.json(
        { error: "Name and Phone number are required." },
        { status: 400 }
      );
    }

    const reference = generateReference();

    // Persist to Neon DB if available
    if (db) {
      try {
        await db.insert(taxFilings).values({
          reference,
          fullName: fullName.trim(),
          phone: phone.trim(),
          email: email?.trim() || null,
          cnic: cnic?.trim() || null,
          persona,
          irisStatus,
          serviceTier,
          contactPreference,
          credentialsNotes: credentialsNotes?.trim() || null,
          documentsSummary: documentsSummary?.trim() || null,
          source,
          status: "pending",
        });
      } catch (dbErr) {
        console.error("Database insert error (non-fatal for customer):", dbErr);
      }
    } else {
      console.warn("Neon DB client not initialized (DATABASE_URL may be missing).");
    }

    return NextResponse.json({
      success: true,
      reference,
      message: "Filing intake case created successfully.",
    });
  } catch (err: any) {
    console.error("Intake processing error:", err);
    return NextResponse.json(
      { error: "Internal server error. Please retry or contact WhatsApp directly." },
      { status: 500 }
    );
  }
}
