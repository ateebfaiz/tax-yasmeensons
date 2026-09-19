"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAppClip } from "@/components/ui/app-clip/AppClipProvider";
import { WhatsAppIcon } from "@/components/ui/icons/whatsapp-icon";
import {
  CheckSquare,
  ArrowRight,
  FileText,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Smartphone,
  Mail,
  Home,
  Briefcase,
  Users,
  ExternalLink,
} from "lucide-react";
import { TaxCertificateTemplates } from "@/components/tax/TaxCertificateTemplates";

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
      { code: "SIM", en: "Active Mobile SIM in Applicant's Own Name or Blood Relative", ur: "اپنے نام یا قریبی رشتہ دار کے نام رجسٹرڈ فعال موبائل سم", type: "required" },
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
      { code: "SIM", en: "Active Mobile SIM in Student's Name or Guardian's Name", ur: "طالب علم یا سرپرست کے نام پر رجسٹرڈ سم", type: "required" },
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-16 space-y-10 pb-28">
      {/* Header */}
      <div className="border-b-2 border-brass pb-4 space-y-2">
        <div className="flex items-center justify-between font-mono text-[11px] text-ash">
          <span>EVIDENCE SCHEDULE</span>
          <span className="font-bold text-ink">TY2026 REQUIREMENTS</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-black text-ink">
          FBR Individual Registration Requirements
        </h1>
        <div className="font-urdu text-base font-bold text-ink" dir="rtl">
          ایف بی آر انفرادی رجسٹریشن و نیشنل ٹیکس نمبر (NTN) کے ضروری تقاضے
        </div>
        <p className="text-xs text-ash leading-relaxed max-w-2xl">
          To register as an individual with the Federal Board of Revenue (FBR) and obtain your National Tax Number (NTN), you can complete the online process through the FBR Iris Portal. We provide full guidance and can create and configure an email for you if you do not already have one.
        </p>
      </div>

      {/* Module 1: Required Information & Documents */}
      <div className="glass-card p-6 sm:p-8 rounded-[28px] space-y-6 border-rule shadow-sm">
        <div className="border-b border-rule pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-full bg-brass/20 text-ink">
              SECTION 1
            </span>
            <h2 className="font-serif text-lg font-bold text-ink">
              Required Information &amp; Documents
            </h2>
          </div>
          <span className="font-urdu text-xs text-ash" dir="rtl">ضروری معلومات و دستاویزات</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Item 1: Valid CNIC */}
          <div className="p-4 rounded-2xl border border-rule bg-paper-light space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-xs text-ink">
              <span className="w-5 h-5 rounded-full bg-[#128C7E]/10 text-[#128C7E] flex items-center justify-center text-[11px]">1</span>
              <span>Valid CNIC (13 Digits)</span>
            </div>
            <p className="text-xs text-ash leading-relaxed">
              Your 13-digit Computerized National Identity Card number issued by NADRA (without hyphens for Iris verification).
            </p>
            <div className="font-urdu text-[11px] text-ash" dir="rtl">
              نادرا سے جاری کردہ ۱۳ ہندسوں کا درست قومی شناختی کارڈ
            </div>
          </div>

          {/* Item 2: Active Mobile SIM */}
          <div className="p-4 rounded-2xl border border-rule bg-paper-light space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-xs text-ink">
              <Smartphone className="w-4 h-4 text-[#128C7E]" />
              <span>Active Mobile SIM</span>
            </div>
            <p className="text-xs text-ash leading-relaxed">
              Must be registered under your own CNIC to receive the verification code. If not in your name, <strong>must be on your blood relative or immediate family member</strong> (provide relative&apos;s name and CNIC).
            </p>
            <div className="font-urdu text-[11px] text-ash" dir="rtl">
              اپنے نام پر یا قریبی خونی رشتہ دار کے نام پر رجسٹرڈ فعال سم
            </div>
          </div>

          {/* Item 3: Personal Email */}
          <div className="p-4 rounded-2xl border border-rule bg-paper-light space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-xs text-ink">
              <Mail className="w-4 h-4 text-[#128C7E]" />
              <span>Personal Email Address</span>
            </div>
            <p className="text-xs text-ash leading-relaxed">
              An active email to receive official FBR notices and OTP verification. <em>We can help along with full guidance and create email if you don&apos;t already have one.</em>
            </p>
            <div className="font-urdu text-[11px] text-ash" dir="rtl">
              ذاتی ای میل ایڈریس (اگر نہیں ہے تو ہم نیا بنا کر ترتیب دیں گے)
            </div>
          </div>

          {/* Item 4: Residential Address */}
          <div className="p-4 rounded-2xl border border-rule bg-paper-light space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-xs text-ink">
              <Home className="w-4 h-4 text-[#128C7E]" />
              <span>Current Residential Address</span>
            </div>
            <p className="text-xs text-ash leading-relaxed">
              Your current home address, city, and district required for FBR Form 181 jurisdiction mapping.
            </p>
            <div className="font-urdu text-[11px] text-ash" dir="rtl">
              موجودہ رہائشی پتہ مع شہر و ضلع
            </div>
          </div>
        </div>

        {/* Income Source Particulars Box */}
        <div className="p-4 rounded-2xl border border-brass/40 bg-brass-subtle space-y-2">
          <div className="flex items-center gap-2 font-bold text-xs text-ink">
            <Briefcase className="w-4 h-4 text-brass" />
            <span>Income Source Particulars</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-ash">
            <div>
              <strong className="text-ink">Salaried:</strong> Employer name, NTN, and office address (optional).
            </div>
            <div>
              <strong className="text-ink">Business / Freelancer:</strong> Business name, principal activity, and electricity bill (&lt;3 months old).
            </div>
            <div>
              <strong className="text-ink">Property / Support:</strong> Address of rental property or confirmation of family maintenance support.
            </div>
          </div>
        </div>
      </div>

      {/* Module 2: Online Registration Process (Form 181) */}
      <div className="glass-card p-6 sm:p-8 rounded-[28px] space-y-5 border-rule shadow-sm">
        <div className="border-b border-rule pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-full bg-brass/20 text-ink">
              SECTION 2
            </span>
            <h2 className="font-serif text-lg font-bold text-ink">
              Online Registration Process (Form 181)
            </h2>
          </div>
          <a
            href="https://iris.fbr.gov.pk/infosys/public/txplogin.xhtml"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono font-bold text-[#128C7E] hover:underline inline-flex items-center gap-1"
          >
            <span>iris.fbr.gov.pk</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { step: "01", title: "Access Portal", desc: "Open iris.fbr.gov.pk and verify the SSL secure lock." },
            { step: "02", title: "Unregistered Person", desc: "Select 'Registration for Unregistered Person' tab." },
            { step: "03", title: "Enter Particulars", desc: "Input CNIC, mobile number, email, and home address." },
            { step: "04", title: "Dual OTP Codes", desc: "Enter 6-digit codes received via SMS and Email." },
            { step: "05", title: "Complete Form 181", desc: "Submit individual registration without third-party fees." },
            { step: "06", title: "NTN & Password", desc: "Receive Iris login credentials and NTN via SMS from FBR." },
          ].map((s) => (
            <div key={s.step} className="p-3.5 rounded-2xl border border-rule bg-paper-light space-y-1">
              <span className="font-mono text-[10px] font-bold text-brass bg-folio border border-rule px-1.5 py-0.5 rounded-full">
                STEP {s.step}
              </span>
              <div className="font-bold text-xs text-ink">{s.title}</div>
              <p className="text-[11px] text-ash leading-snug">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Module 3: Family Consolidation & WHT Audit */}
      <div className="glass-card p-6 sm:p-8 rounded-[28px] space-y-4 border-rule shadow-sm bg-gradient-to-br from-paper-light to-folio">
        <div className="border-b border-rule pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-full bg-brass/20 text-ink">
              SECTION 3
            </span>
            <h2 className="font-serif text-lg font-bold text-ink">
              Family Group Consolidation &amp; Source Withholding Audit
            </h2>
          </div>
          <span className="font-urdu text-xs text-ash" dir="rtl">خاندانی اکاؤنٹس اور ٹیکس چھوٹ</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl border border-rule bg-paper-light space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-ink">
              <Users className="w-4 h-4 text-[#128C7E]" />
              <span>Inter-Family Fund Transfers Reconciliation</span>
            </div>
            <p className="text-ash leading-relaxed">
              We reconcile inter-family bank transfers (between husband, wife, parents, or children) so that money transfers for household expenses are never mistakenly treated as commercial income or double-taxed.
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-rule bg-paper-light space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-ink">
              <ShieldCheck className="w-4 h-4 text-[#128C7E]" />
              <span>Comprehensive Withholding Tax (WHT) Audit</span>
            </div>
            <p className="text-ash leading-relaxed">
              We audit and claim all advance taxes deducted at source: ATM and bank cash withdrawals, fuel purchases, electricity and gas bills, mobile recharge and bundle package fees, and debit/credit card transactions.
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter Chips & Documentation Schedule */}
      <div className="space-y-4">
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
        <div className="glass-card p-6 sm:p-8 rounded-[28px] space-y-5 border-rule shadow-sm">
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
      </div>

      {/* Module 4: Certificate Message Templates, App Guides & Utility WHT */}
      <TaxCertificateTemplates />

      {/* CTA Band */}
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

          <a
            href="https://wa.me/923120947187?text=Hi%2C%20I%20want%20guidance%20on%20FBR%20Individual%20Registration."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebd59] text-white font-mono font-bold text-xs py-3 px-5 rounded-full transition-all active:scale-95"
          >
            <WhatsAppIcon className="w-3.5 h-3.5" />
            <span>WhatsApp (03120947187)</span>
          </a>
        </div>
      </div>
    </div>
  );
}
