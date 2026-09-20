import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { SITE_CONFIG } from "@/lib/config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateReference(prefix: string = "YS-26"): string {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `${prefix}-${randomNum}`;
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
