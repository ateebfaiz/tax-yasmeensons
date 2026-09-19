import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { taxFilings } from "@/lib/db/schema";
import { generateReference } from "@/lib/utils";
import { createTodoistTask } from "@/lib/todoist";

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
      residentialAddress,
      simOwner,
      relativeName,
      relativeCnic,
      relativeRelation,
      needEmailHelp,
      incomeDetails,
      familyConsolidation,
      whtAudit,
    } = body;

    if (!fullName || !phone) {
      return NextResponse.json(
        { error: "Name and Phone number are required." },
        { status: 400 }
      );
    }

    const reference = generateReference();

    // Trigger Doist/Todoist P1 Notification
    let todoistTaskId: string | null = null;
    try {
      const taskTitle = `📋 TAX CASE: ${reference} — ${fullName.trim()} (${persona.toUpperCase()})`;
      const taskDescription = 
        `**Customer:** ${fullName.trim()}\n` +
        `**Phone:** ${phone.trim()}\n` +
        (cnic ? `**CNIC:** ${cnic.trim()}\n` : "") +
        (simOwner === "relative" ? `**SIM Ownership:** Relative (${relativeName || ""} - ${relativeRelation || ""}, CNIC: ${relativeCnic || ""})\n` : "") +
        (needEmailHelp ? `**Email:** Needs Email Creation Guidance\n` : email ? `**Email:** ${email.trim()}\n` : "") +
        (residentialAddress ? `**Residential Address:** ${residentialAddress.trim()}\n` : "") +
        `**Category:** ${persona}\n` +
        (incomeDetails ? `**Income Source:** ${incomeDetails.trim()}\n` : "") +
        (familyConsolidation ? `**Family Consolidation:** Yes (Reconcile inter-family transfers)\n` : "") +
        (whtAudit ? `**WHT Deductions Audit:** Yes (Claim ATM, fuel, bills, SIM)\n` : "") +
        `**IRIS Status:** ${irisStatus}\n` +
        `**Tier:** ${serviceTier}\n` +
        `**Contact Pref:** ${contactPreference}\n` +
        (documentsSummary ? `**Documents:** ${documentsSummary.trim()}\n` : "") +
        (credentialsNotes ? `**Notes/Particulars:** ${credentialsNotes.trim()}\n` : "");

      const todoistRes = await createTodoistTask(taskTitle, taskDescription);
      if (todoistRes && todoistRes.id) {
        todoistTaskId = String(todoistRes.id);
      }
    } catch (tErr) {
      console.error("[Todoist] Task creation error:", tErr);
    }

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
          todoistTaskId,
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
      todoistTaskId,
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
