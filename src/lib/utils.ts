import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { SITE_CONFIG } from "@/lib/config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Legal docket: Yasmeen & Sons / Income Tax Return / Tax Year 2026 / serial */
export const FOLIO_EXAMPLE = "YS/ITR/TY2026/48192";
export const FOLIO_NEW_RE = /^YS\/ITR\/TY2026\/\d{5}$/;
export const FOLIO_LEGACY_RE = /^YS-26-\d{5}$/;

export function normalizeFolio(raw: string): string {
  const t = raw.trim().toUpperCase().replace(/\s+/g, "");
  const asLegacy = t.replace(/\//g, "-");
  if (FOLIO_LEGACY_RE.test(asLegacy)) return asLegacy;
  const asSlash = t.replace(/-/g, "/");
  if (FOLIO_NEW_RE.test(asSlash)) return asSlash;
  if (FOLIO_NEW_RE.test(t)) return t;
  return t;
}

export function isIssuedFolio(raw: string): boolean {
  const n = normalizeFolio(raw);
  return FOLIO_NEW_RE.test(n) || FOLIO_LEGACY_RE.test(n);
}

export function folioLegalCaption(): string {
  return "Yasmeen & Sons · Form 114(1) · Tax Year 2026";
}

export function formatWhatsAppUrl(message: string, phone?: string): string {
  const targetPhone = phone || SITE_CONFIG.contact.whatsapp;
  const cleanPhone = targetPhone.replace(/\D/g, "");
  const intlPhone = cleanPhone.startsWith("0") ? `92${cleanPhone.slice(1)}` : cleanPhone;
  return `https://wa.me/${intlPhone}?text=${encodeURIComponent(message)}`;
}

export function formatPhoneReadable(phone?: string): string {
  const target = phone || SITE_CONFIG.contact.whatsapp;
  const clean = target.replace(/\D/g, "");
  if (clean.length === 11 && clean.startsWith("03")) {
    return `${clean.slice(0, 4)} ${clean.slice(4)}`;
  }
  return target;
}

export function formatCnicInput(val: string): string {
  const digits = val.replace(/\D/g, "").slice(0, 13);
  if (digits.length > 5 && digits.length <= 12) {
    return `${digits.slice(0, 5)}-${digits.slice(5)}`;
  } else if (digits.length > 12) {
    return `${digits.slice(0, 5)}-${digits.slice(5, 12)}-${digits.slice(12)}`;
  }
  return digits;
}

export function formatPhoneInput(val: string): string {
  const digits = val.replace(/\D/g, "").slice(0, 11);
  if (digits.length > 4) {
    return `${digits.slice(0, 4)} ${digits.slice(4)}`;
  }
  return digits;
}
