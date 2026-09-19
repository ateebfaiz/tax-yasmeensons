"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAppClip } from "@/components/ui/app-clip/AppClipProvider";
import { CheckSquare, ArrowRight, FileText, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

interface DocItem {
  code: string;
  en: string;
  ur: string;
  type: "required" | "optional";
}

const CATEGORY_DOCS: Record<string, { title: string; ur: string; items: DocItem[] }> = {
  SAL: {
    title: "Salaried Employees (SAL)",
    ur: "تنخواہ دار ملازمین",
    items: [
      { code: "s.149", en: "Annual Salary Certificate or 12 Months Salary Slips", ur: "سالانہ سیلری سرٹیفکیٹ یا 12 ماہ کی تنخواہ کی سلپس", type: "required" },
      { code: "s.149 WHT", en: "Employer Tax Deduction Certificate", ur: "ادارے کی طرف سے جاری کردہ انکم ٹیکس کٹوتی سرٹیفکیٹ", type: "required" },
      { code: "s.116 Banks", en: "Bank statements for all active accounts (July 2025 – June 2026)", ur: "تمام فعال اکاؤنٹس کی بینک اسٹیٹمنٹ مع منافع و ٹیکس", type: "required" },
      { code: "s.235/236", en: "Electricity & Gas Bill Withholding Statements", ur: "بجلی اور گیس کے بلوں پر ودہولڈنگ ٹیکس سرٹیفکیٹس", type: "optional" },
      { code: "s.236K", en: "Mobile SIM Annual Tax Deduction Certificate", ur: "موبائل سم پر سالانہ ٹیکس کٹوتی کا سرٹیفکیٹ", type: "optional" },
      { code: "s.231/234", en: "Vehicle Token Tax / Motor Vehicle Purchase Receipts", ur: "گاڑی کا ٹوکن ٹیکس یا خرید و فروخت کا ریکارڈ", type: "optional" },
      { code: "s.236C/K", en: "Property Sale or Purchase Deeds / FBR Challans", ur: "پراپرٹی کی خرید و فروخت یا ٹرانسفر کا ریکارڈ", type: "optional" },
    ],
  },
  PEN: {
    title: "Senior & Pensioners (PEN)",
    ur: "پنشنرز اور بزرگ شہری",
    items: [
      { code: "Exempt", en: "Pension Book or Bank Pension Statement", ur: "پنشن بک یا سالانہ پنشن اکاؤنٹ اسٹیٹمنٹ", type: "required" },
      { code: "CNIC", en: "Valid CNIC Copy (Senior Citizen)", ur: "شناختی کارڈ کی کاپی", type: "required" },
      { code: "s.151 NSS", en: "National Savings / Behbood Certificates Profit Records", ur: "قومی بچت یا بہبود سرٹیفکیٹس کے منافع کا ریکارڈ", type: "optional" },
      { code: "s.116 Banks", en: "Bank Statements with profit on debt details", ur: "بینک منافع اور کیش نکلوانے پر کٹوتی کے سرٹیفکیٹس", type: "optional" },
      { code: "Assets", en: "Residential property documents and asset list", ur: "رہائشی مکان یا پلاٹ کے کاغذات", type: "optional" },
    ],
  },
  HIF: {
    title: "Housewife / Non-Earning (HIF)",
    ur: "گھریلو خواتین و نان ارننگ",
    items: [
      { code: "CNIC", en: "Valid CNIC Copy (Front and Back)", ur: "قومی شناختی کارڈ کی کاپی", type: "required" },
      { code: "SIM", en: "Active Mobile SIM in Applicant's Own Name", ur: "اپنے نام پر رجسٹرڈ فعال موبائل سم", type: "required" },
      { code: "s.116 Bank", en: "Active Bank Account Statement (Nominal transactions)", ur: "بینک اکاؤنٹ اسٹیٹمنٹ (معمولی بیلنس)", type: "required" },
      { code: "Source", en: "Confirmation of Spouse / Family maintenance funds", ur: "گھریلو کفالت یا شوہر کی معاونت کا بیان", type: "required" },
      { code: "Assets", en: "Inherited property, gold, or gift deeds", ur: "وراثت یا تحفے میں ملے اثاثوں کی تفصیل", type: "optional" },
    ],
  },
  STU: {
    title: "Student Filers (STU)",
    ur: "طلباء و یوتھ فائلرز",
    items: [
      { code: "CNIC/ID", en: "Valid CNIC and College/University ID Card", ur: "شناختی کارڈ اور اسٹوڈنٹ کارڈ", type: "required" },
      { code: "SIM", en: "Active Mobile SIM in Student's Name", ur: "طالب علم کے نام پر رجسٹرڈ سم", type: "required" },
      { code: "s.236I", en: "University Fee Receipts (showing advance tax)", ur: "یونیورسٹی فیس کی رسیدیں مع ایڈوانس ٹیکس", type: "required" },
      { code: "s.116 Bank", en: "Student Bank Account Statement", ur: "اسٹوڈنٹ اکاؤنٹ کی بینک اسٹیٹمنٹ", type: "required" },
    ],
  },
};

export default function RequirementsPage() {
  const [activeCat, setActiveCat] = useState<string>("SAL");
  const appClip = useAppClip();
  const current = CATEGORY_DOCS[activeCat] || CATEGORY_DOCS.SAL;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-16 space-y-8 pb-28">
      {/* Header */}
      <div className="border-b-2 border-brass pb-4 space-y-2">
        <div className="flex items-center justify-between font-mono text-[11px] text-ash">
          <span>EVIDENCE SCHEDULE</span>
          <span className="font-bold text-ink">TY2026 REQUIREMENTS</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-black text-ink">
          Documentation Checklist
        </h1>
        <div className="font-urdu text-base font-bold text-ink" dir="rtl">
          ٹیکس فائلنگ کے لیے ضروری کاغذات کی فہرست
        </div>
        <p className="text-xs text-ash leading-relaxed max-w-2xl">
          Select your category chip below to see required vs optional documents. You can upload or simply photo-share them via WhatsApp.
        </p>
      </div>

      {/* Filter Chips & AppClip launch */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2 font-mono text-xs">
          {[
            { code: "SAL", label: "Salaried Employees" },
            { code: "PEN", label: "Senior & Pensioners" },
            { code: "HIF", label: "Housewife / Non-Earning" },
            { code: "STU", label: "Student Filers" },
          ].map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => setActiveCat(c.code)}
              className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 text-xs ${
                activeCat === c.code
                  ? "bg-ink text-paper-light font-bold shadow-sm"
                  : "bg-folio border border-rule text-ash hover:text-ink hover:border-ash"
              }`}
            >
              <span className="text-brass font-bold">{c.code}</span>
              <span>{c.label}</span>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => appClip.open("tax-checklist", { persona: activeCat.toLowerCase() })}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brass/15 border border-brass/40 text-ink font-mono font-bold text-xs hover:bg-brass/25 transition-all shadow-sm active:scale-95"
        >
          <Sparkles className="w-3.5 h-3.5 text-brass" />
          <span>Interactive AppClip Checklist</span>
        </button>
      </div>

      {/* Checklist Card */}
      <div className="glass-card p-6 sm:p-8 rounded-[28px] space-y-5 border-rule/80 shadow-sm">
        <div className="border-b border-rule-light pb-3 flex items-baseline justify-between">
          <h2 className="font-serif text-lg font-bold text-ink">{current.title}</h2>
          <span className="font-urdu text-xs text-ash" dir="rtl">{current.ur}</span>
        </div>

        <div className="space-y-3">
          {current.items.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl border border-rule bg-paper-light flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-brass px-2 py-0.5 rounded-full bg-folio border border-rule">
                    {item.code}
                  </span>
                  <span className="text-xs font-semibold text-ink">{item.en}</span>
                </div>
                <div className="font-urdu text-xs text-ash" dir="rtl">{item.ur}</div>
              </div>

              <div className="shrink-0">
                {item.type === "required" ? (
                  <span className="font-mono text-[10px] font-bold text-ink bg-brass/25 border border-brass px-2.5 py-0.5 rounded-full uppercase">
                    Required
                  </span>
                ) : (
                  <span className="font-mono text-[10px] text-ash bg-paper border border-rule px-2.5 py-0.5 rounded-full uppercase">
                    If Applicable
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Direct link to start with preselected category */}
      <div className="bg-ink text-paper-light border-2 border-brass p-8 rounded-[30px] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1 text-center sm:text-left">
          <span className="font-mono text-xs text-brass font-bold uppercase tracking-wider">READY WITH PAPERS?</span>
          <div className="font-serif text-xl font-bold">
            Begin filing with {activeCat} checklist
          </div>
          <p className="text-xs text-ash-light leading-relaxed max-w-md">
            You can photo-share documents on WhatsApp during our step-by-step guidance.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => appClip.open("tax-intake", { defaultPersona: activeCat })}
            className="inline-flex items-center justify-center gap-1.5 bg-brass hover:bg-brass-light text-ink font-mono font-bold text-xs py-3 px-6 rounded-full shadow transition-all active:scale-95"
          >
            <span>Fast AppClip ({activeCat})</span>
            <Sparkles className="w-3.5 h-3.5" />
          </button>
          <Link
            href={`/start?cat=${activeCat}`}
            className="inline-flex items-center justify-center gap-1.5 bg-folio/10 hover:bg-folio/20 border border-brass/40 text-paper-light font-mono font-bold text-xs py-3 px-5 rounded-full transition-all active:scale-95"
          >
            <span>Full Form →</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

