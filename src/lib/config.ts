export const SITE_CONFIG = {
  brandName: process.env.NEXT_PUBLIC_BRAND_NAME || "Yasmeen & Sons Tax",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://tax.yasmeensons.com",
  contact: {
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "03120947187",
    whatsappDisplay: "+92 312 094 7187",
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "tax@yasmeensons.com",
  },
  taxYear: process.env.NEXT_PUBLIC_TAX_YEAR || "2026",
  fbrIrisPortalUrl: "https://iris.fbr.gov.pk/infosys/public/txplogin.xhtml",
  fbrOfficialUrl: "https://fbr.gov.pk",
};

/** Filing desk backend (cases, documents, tracking) */
export const FASTAPI_BACKEND_URL =
  process.env.FASTAPI_BACKEND_URL || "https://ys-fastapi-backend.fastapicloud.dev";

export function getWhatsAppUrl(message: string, customPhone?: string): string {
  const phone = customPhone || SITE_CONFIG.contact.whatsapp;
  const cleanPhone = phone.replace(/\D/g, "");
  const intlPhone = cleanPhone.startsWith("0") ? `92${cleanPhone.slice(1)}` : cleanPhone;
  return `https://wa.me/${intlPhone}?text=${encodeURIComponent(message)}`;
}
