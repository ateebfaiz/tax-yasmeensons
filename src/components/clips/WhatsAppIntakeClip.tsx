"use client";

import React, { useState } from "react";
import { AppClipSheet } from "@/components/ui/app-clip/AppClipSheet";
import { BilingualLabel } from "@/components/ui/bilingual-label";
import { formatWhatsAppUrl } from "@/lib/utils";
import { MessageCircle, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

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
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          phone,
          persona,
          serviceTier: tier,
          contactPreference: "whatsapp",
          credentialsNotes: notes,
          source: "whatsapp_quick_clip",
        }),
      });
      const data = await res.json();
      const generatedRef = data.reference || "TAX-2026-DIRECT";
      setRefId(generatedRef);

      const msg = `*Quick WhatsApp Tax Filing Inquiry*\n\n` +
        `*Ref:* ${generatedRef}\n` +
        `*Name:* ${fullName}\n` +
        `*Phone:* ${phone}\n` +
        `*Category:* ${persona}\n` +
        `*Service Tier:* ${tier}\n` +
        `${notes ? `*Notes:* ${notes}\n` : ""}\n` +
        `I would like to start my Tax Year 2026 return filing.`;

      window.open(formatWhatsAppUrl(msg, "03120947187"), "_blank");
    } catch {
      // Fallback direct open
      const msg = `Hi, I would like to start Tax Year 2026 individual filing. Name: ${fullName}, Category: ${persona}`;
      window.open(formatWhatsAppUrl(msg, "03120947187"), "_blank");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AppClipSheet
      onClose={onClose}
      title="Quick WhatsApp Filing"
      subtitle="واٹس ایپ پر فوری رابطہ • 03120947187"
    >
      <div className="p-4 md:p-6 pb-20 space-y-4">
        {refId ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 bg-theme-success/10 text-theme-success rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-theme-text">WhatsApp Chat Opened</h3>
            <p className="text-xs text-theme-text-secondary font-urdu" dir="rtl">
              آپ کا کیس نمبر {refId} ہے۔ واٹس ایپ پر گفتگو شروع ہو چکی ہے۔
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded-xl border border-theme-border font-bold text-xs"
            >
              Close Window / بند کریں
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="p-3 bg-theme-primary/10 border border-theme-primary/20 rounded-xl flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-theme-primary shrink-0 mt-0.5" />
              <div className="text-xs text-theme-text-secondary">
                <span className="font-bold text-theme-text">Your FBR Password stays with you.</span> We never request credentials on WhatsApp.
              </div>
            </div>

            <div>
              <BilingualLabel en="Full Name" ur="پورا نام" htmlFor="wa-name" required />
              <input
                id="wa-name"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Tariq Mehmood"
                className="w-full bg-theme-surface border border-theme-border rounded-xl px-3.5 py-2.5 text-sm font-medium focus:ring-2 focus:ring-theme-primary/30 focus:border-theme-primary"
              />
            </div>

            <div>
              <BilingualLabel en="WhatsApp Number" ur="واٹس ایپ نمبر" htmlFor="wa-phone" required />
              <input
                id="wa-phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0312 0000000"
                className="w-full bg-theme-surface border border-theme-border rounded-xl px-3.5 py-2.5 text-sm font-medium focus:ring-2 focus:ring-theme-primary/30 focus:border-theme-primary"
              />
            </div>

            <div>
              <BilingualLabel en="Income Category" ur="آمدنی کی قسم" htmlFor="wa-cat" />
              <select
                id="wa-cat"
                value={persona}
                onChange={(e) => setPersona(e.target.value)}
                className="w-full bg-theme-surface border border-theme-border rounded-xl px-3.5 py-2.5 text-sm font-medium focus:ring-2 focus:ring-theme-primary/30 focus:border-theme-primary"
              >
                <option value="salaried">Salaried Individual / تنخواہ دار ملازم</option>
                <option value="pensioner">Senior / Pensioner / پنشنر و بزرگ شہری</option>
                <option value="no_income">Housewife / No Income / گھریلو خواتین و بغیر آمدنی</option>
                <option value="student">Student Filer / طالب علم</option>
                <option value="govt">Government Employee / سرکاری ملازم</option>
                <option value="other">Other Individual / دیگر</option>
              </select>
            </div>

            <div>
              <BilingualLabel en="Service Tier" ur="سروس پیکیج" htmlFor="wa-tier" />
              <select
                id="wa-tier"
                value={tier}
                onChange={(e) => setTier(e.target.value)}
                className="w-full bg-theme-surface border border-theme-border rounded-xl px-3.5 py-2.5 text-sm font-medium focus:ring-2 focus:ring-theme-primary/30 focus:border-theme-primary"
              >
                <option value="guided_1000">Guided Filing (PKR 1,000) / رہنمائی مع سیلف فائلنگ</option>
                <option value="assistance_2500">Filing Assistance (PKR 2,500) / مکمل فائلنگ اسسٹنس</option>
                <option value="complex_5000">Complex Review (PKR 4,500+) / پیچیدہ کیس جائزہ</option>
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
                className="w-full bg-theme-surface border border-theme-border rounded-xl px-3.5 py-2 text-sm font-medium focus:ring-2 focus:ring-theme-primary/30 focus:border-theme-primary"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 text-sm shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Connect on WhatsApp (03120947187)</span>
            </button>
          </form>
        )}
      </div>
    </AppClipSheet>
  );
}
