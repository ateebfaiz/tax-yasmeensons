import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateReference(prefix: string = "YS-26"): string {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `${prefix}-${randomNum}`;
}

export function formatWhatsAppUrl(message: string, phone: string = "03120947187"): string {
  const cleanPhone = phone.replace(/\D/g, "");
  const intlPhone = cleanPhone.startsWith("0") ? `92${cleanPhone.slice(1)}` : cleanPhone;
  return `https://wa.me/${intlPhone}?text=${encodeURIComponent(message)}`;
}

export function formatPhoneReadable(phone: string): string {
  const clean = phone.replace(/\D/g, "");
  if (clean.length === 11 && clean.startsWith("03")) {
    return `${clean.slice(0, 4)} ${clean.slice(4)}`;
  }
  return phone;
}
