import { SITE_CONFIG } from "@/lib/config";
import { formatWhatsAppUrl } from "@/lib/utils";

export type IntakeInput = {
  fullName: string;
  phone: string;
  email?: string | null;
  cnic?: string | null;
  persona?: string;
  irisStatus?: string;
  serviceTier?: string;
  contactPreference?: string;
  clientNotes?: string;
  documentsSummary?: string;
  source?: string;
  fbrPayload?: unknown;
  documents?: {
    name: string;
    category: string;
    url: string;
    key?: string;
    size?: number;
    type?: string;
  }[];
  residentialAddress?: string;
  simOwner?: string;
  relativeName?: string;
  relativeCnic?: string;
  relativeRelation?: string;
  needEmailHelp?: boolean;
  incomeDetails?: string;
  familyConsolidation?: boolean;
  whtAudit?: boolean;
};

export type IntakeOk = { ok: true; reference: string; todoistTaskId?: string | null };
export type IntakeFail = { ok: false; error: string; fallbackWhatsAppUrl: string };
export type IntakeResult = IntakeOk | IntakeFail;

function fallbackUrl(fullName: string, phone: string): string {
  return formatWhatsAppUrl(
    `Hi, I attempted to submit my Tax Year ${SITE_CONFIG.taxYear} return for ${fullName} (${phone}), but the case was not recorded. Please log my case.`
  );
}

export async function postIntake(input: IntakeInput): Promise<IntakeResult> {
  try {
    const res = await fetch("/api/intake", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const data = await res.json().catch(() => ({} as Record<string, unknown>));
    const reference = typeof data.reference === "string" ? data.reference : "";
    if (res.ok && data.success && /^YS-26-\d{5}$/.test(reference)) {
      return {
        ok: true,
        reference,
        todoistTaskId: typeof data.todoistTaskId === "string" ? data.todoistTaskId : null,
      };
    }
    return {
      ok: false,
      error:
        (typeof data.error === "string" && data.error) ||
        "Unable to persist filing case. Please contact the tax desk on WhatsApp.",
      fallbackWhatsAppUrl:
        (typeof data.fallbackWhatsAppUrl === "string" && data.fallbackWhatsAppUrl) ||
        fallbackUrl(input.fullName, input.phone),
    };
  } catch {
    return {
      ok: false,
      error: "Network error. Please contact the tax desk on WhatsApp.",
      fallbackWhatsAppUrl: fallbackUrl(input.fullName, input.phone),
    };
  }
}
