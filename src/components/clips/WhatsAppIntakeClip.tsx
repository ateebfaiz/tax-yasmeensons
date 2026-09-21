"use client";

import React, { useState } from "react";
import { AppClipSheet } from "@/components/ui/app-clip/AppClipSheet";
import { GlassCard } from "@/components/ui/glass/GlassCard";
import { GlassButton } from "@/components/ui/glass/GlassButton";
import { BilingualLabel } from "@/components/ui/bilingual-label";
import { formatWhatsAppUrl, formatPhoneInput } from "@/lib/utils";
import { CaseFolioCard } from "@/components/tax/CaseFolioCard";
import { postIntake } from "@/lib/intake";
import { SITE_CONFIG } from "@/lib/config";
import { WhatsAppIcon } from "@/components/ui/icons/whatsapp-icon";
import { ShieldCheck, CheckCircle2 } from "lucide-react";

export default function WhatsAppIntakeClip({
  onClose,
  payload,
}: {
  onClose: () => void;
  payload?: { defaultPersona?: string; defaultTier?: string };
}) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [persona, setPersona] = useState(payload?.defaultPersona || "salaried");
  const [tier, setTier] = useState(payload?.defaultTier || "guided_1000");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [refId, setRefId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) return;

    setSubmitting(true);
    try {
      const result = await postIntake({
        fullName,
        phone,
        persona,
        serviceTier: tier,
        contactPreference: "whatsapp",
        clientNotes: notes,
        source: "whatsapp_quick_clip",
      });
      if (!result.ok) {
        window.open(result.fallbackWhatsAppUrl, "_blank");
        return;
      }
      const generatedRef = result.reference;
      setRefId(generatedRef);

      const msg = `*Quick WhatsApp Tax Filing Inquiry*\n\n` +
        `*Ref:* ${generatedRef}\n` +
        `*Name:* ${fullName}\n` +
        `*Phone:* ${phone}\n` +
        `*Category:* ${persona}\n` +
        `*Service Tier:* ${tier}\n` +
        `${notes ? `*Notes:* ${notes}\n` : ""}\n` +
        `I would like to start my Tax Year 2026 return filing.`;

      window.open(formatWhatsAppUrl(msg), "_blank");
    } catch {
      const msg = `Hi, I would like to start Tax Year 2026 individual filing. Name: ${fullName}, Category: ${persona}`;
      window.open(formatWhatsAppUrl(msg), "_blank");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AppClipSheet
      onClose={onClose}
      title="Quick WhatsApp Filing"
      subtitle={`واٹس ایپ پر فوری رابطہ • ${SITE_CONFIG.contact.whatsappDisplay}`}
    >
      <div className="space-y-3.5 pb-3 text-ink dark:text-white">
        {refId ? (
          <div className="text-center py-4 space-y-3.5">
            <CaseFolioCard reference={refId} name={fullName} meta="Form 114(1) · WhatsApp intake" />
            <p className="text-[13px] text-ash font-urdu" dir="rtl">
              ڈاکٹ نمبر محفوظ کریں۔ واٹس ایپ کھل چکا ہے۔
            </p>
            <GlassButton
              type="button"
              variant="secondary"
              onClick={onClose}
              className="mt-2"
            >
              Close Window / بند کریں
            </GlassButton>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <GlassCard variant="subtle" className="p-3 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-apple-blue shrink-0 mt-0.5" />
              <div className="text-xs text-ash dark:text-white/60">
                <span className="font-bold text-ink dark:text-white">Your FBR Password stays with you.</span> We never request credentials on WhatsApp.
              </div>
            </GlassCard>

            <GlassCard variant="default" className="p-4 space-y-3">
              <div>
                <BilingualLabel en="Full Name" ur="پورا نام" htmlFor="wa-name" required />
                <input
                  id="wa-name"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Tariq Mehmood"
                  className="w-full mt-1.5 bg-black/[0.04] dark:bg-white/[0.08] text-ink dark:text-white border border-black/[0.10] dark:border-white/[0.15] rounded-xl px-3.5 py-2.5 text-xs placeholder:text-ash/50 dark:placeholder:text-palette-sky/40 focus:border-apple-blue outline-none"
                />
              </div>

              <div>
                <BilingualLabel en="WhatsApp Number" ur="واٹس ایپ نمبر" htmlFor="wa-phone" required />
                <input
                  id="wa-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(formatPhoneInput(e.target.value))}
                  placeholder="0312 0000000"
                  className="w-full mt-1 bg-black/[0.04] dark:bg-white/[0.08] text-ink dark:text-white border border-black/[0.10] dark:border-white/[0.15] rounded-xl px-3.5 py-2.5 text-xs font-mono placeholder:text-ash/50 dark:placeholder:text-palette-sky/40 focus:border-apple-blue outline-none"
                />
              </div>

              <div>
                <BilingualLabel en="Income Category" ur="آمدنی کی قسم" htmlFor="wa-cat" />
                <select
                  id="wa-cat"
                  value={persona}
                  onChange={(e) => setPersona(e.target.value)}
                  className="w-full mt-1 bg-black/[0.04] dark:bg-white/[0.08] text-ink dark:text-white border border-black/[0.10] dark:border-white/[0.15] rounded-xl px-3.5 py-2.5 text-xs text-ink dark:text-white focus:border-apple-blue outline-none"
                >
                  <option value="salaried" className="bg-paper dark:bg-[#1c1c1e] text-ink dark:text-white">Salaried Individual / تنخواہ دار ملازم</option>
                  <option value="pensioner" className="bg-paper dark:bg-[#1c1c1e] text-ink dark:text-white">Senior / Pensioner / پنشنر و بزرگ شہری</option>
                  <option value="no_income" className="bg-paper dark:bg-[#1c1c1e] text-ink dark:text-white">Housewife / No Income / گھریلو خواتین و بغیر آمدنی</option>
                  <option value="student" className="bg-paper dark:bg-[#1c1c1e] text-ink dark:text-white">Student Filer / طالب علم</option>
                  <option value="govt" className="bg-paper dark:bg-[#1c1c1e] text-ink dark:text-white">Government Employee / سرکاری ملازم</option>
                  <option value="other" className="bg-paper dark:bg-[#1c1c1e] text-ink dark:text-white">Other Individual / دیگر</option>
                </select>
              </div>

              <div>
                <BilingualLabel en="Service Tier" ur="سروس پیکیج" htmlFor="wa-tier" />
                <select
                  id="wa-tier"
                  value={tier}
                  onChange={(e) => setTier(e.target.value)}
                  className="w-full mt-1 bg-black/[0.04] dark:bg-white/[0.08] text-ink dark:text-white border border-black/[0.10] dark:border-white/[0.15] rounded-xl px-3.5 py-2.5 text-xs text-ink dark:text-white focus:border-apple-blue outline-none"
                >
                  <option value="guided_1000" className="bg-paper dark:bg-[#1c1c1e] text-ink dark:text-white">Guided Filing (PKR 1,000) / رہنمائی مع سیلف فائلنگ</option>
                  <option value="assistance_2500" className="bg-paper dark:bg-[#1c1c1e] text-ink dark:text-white">Filing Assistance (PKR 2,500) / مکمل فائلنگ اسسٹنس</option>
                  <option value="complex_5000" className="bg-paper dark:bg-[#1c1c1e] text-ink dark:text-white">Complex Review (PKR 4,500+) / پیچیدہ کیس جائزہ</option>
                </select>
              </div>

              <div>
                <BilingualLabel en="Notes (Optional)" ur="اضافی نوٹس" htmlFor="wa-notes" />
                <textarea
                  id="wa-notes"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any special remarks..."
                  className="w-full mt-1 bg-black/[0.04] dark:bg-white/[0.08] text-ink dark:text-white border border-black/[0.10] dark:border-white/[0.15] rounded-xl px-3.5 py-2 text-xs placeholder:text-ash/50 dark:placeholder:text-palette-sky/40 focus:border-apple-blue outline-none"
                />
              </div>
            </GlassCard>

            <button
              type="submit"
              disabled={submitting}
              className="w-full h-12 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:opacity-95 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all disabled:opacity-50"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Connect on WhatsApp ({SITE_CONFIG.contact.whatsappDisplay})</span>
            </button>
          </form>
        )}
      </div>
    </AppClipSheet>
  );
}
