"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppClip } from "@/components/ui/app-clip/AppClipProvider";
import { AppClipSheet } from "@/components/ui/app-clip/AppClipSheet";
import { WhatsAppIcon } from "@/components/ui/icons/whatsapp-icon";
import { formatWhatsAppUrl } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/config";
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
  Lock,
} from "lucide-react";
import { TaxCertificateTemplates } from "@/components/tax/TaxCertificateTemplates";
import { SmoothFileUpload, UploadedTaxDocument } from "@/components/ui/file-upload";

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
  const router = useRouter();
  const [activeCat, setActiveCat] = useState<string>("SAL");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedTaxDocument[]>([]);
  const appClip = useAppClip();
  const current = CATEGORY_DOCS[activeCat] || CATEGORY_DOCS.SAL;

  // Shared inner content for checklist & modules
  const renderModules = () => (
    <div className="space-y-8">
      {/* Module 1: Required Information & Documents */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6 border-rule shadow-sm">
        <div className="border-b border-rule pb-4 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-brass/20 text-ink">
              Papers
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink">
              Required Information &amp; Documents
            </h2>
          </div>
          <span className="font-urdu text-sm text-apple-blue" dir="rtl">ضروری معلومات و دستاویزات</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Item 1: Valid CNIC */}
          <div className="p-5 rounded-2xl border border-rule bg-paper-light space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-ink">
              <span className="w-5 h-5 rounded-full bg-apple-blue/10 text-apple-blue flex items-center justify-center text-xs font-mono">1</span>
              <span>Valid CNIC (13 Digits)</span>
            </div>
            <p className="text-xs text-ash leading-relaxed">
              Your 13-digit Computerized National Identity Card number issued by NADRA (without hyphens for Iris verification).
            </p>
            <div className="font-urdu text-xs text-apple-blue" dir="rtl">
              نادرا سے جاری کردہ ۱۳ ہندسوں کا درست قومی شناختی کارڈ
            </div>
          </div>

          {/* Item 2: Active Mobile SIM */}
          <div className="p-5 rounded-2xl border border-rule bg-paper-light space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-ink">
              <Smartphone className="w-4 h-4 text-apple-blue" />
              <span>Active Mobile SIM</span>
            </div>
            <p className="text-xs text-ash leading-relaxed">
              Must be registered under your own CNIC to receive the verification code. If not in your name, <strong>must be on your blood relative or immediate family member</strong> (provide relative&apos;s name and CNIC).
            </p>
            <div className="font-urdu text-xs text-apple-blue" dir="rtl">
              اپنے نام پر یا قریبی خونی رشتہ دار کے نام پر رجسٹرڈ فعال سم
            </div>
          </div>

          {/* Item 3: Personal Email */}
          <div className="p-5 rounded-2xl border border-rule bg-paper-light space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-ink">
              <Mail className="w-4 h-4 text-apple-blue" />
              <span>Personal Email Address</span>
            </div>
            <p className="text-xs text-ash leading-relaxed">
              An active email to receive official FBR notices and OTP verification. <em>We can help along with full guidance and create email if you don&apos;t already have one.</em>
            </p>
            <div className="font-urdu text-xs text-apple-blue" dir="rtl">
              ذاتی ای میل ایڈریس (اگر نہیں ہے تو ہم نیا بنا کر ترتیب دیں گے)
            </div>
          </div>

          {/* Item 4: Residential Address */}
          <div className="p-5 rounded-2xl border border-rule bg-paper-light space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-ink">
              <Home className="w-4 h-4 text-apple-blue" />
              <span>Current Residential Address</span>
            </div>
            <p className="text-xs text-ash leading-relaxed">
              Your current home address, city, and district required for FBR Form 181 jurisdiction mapping.
            </p>
            <div className="font-urdu text-xs text-apple-blue" dir="rtl">
              موجودہ رہائشی پتہ مع شہر و ضلع
            </div>
          </div>
        </div>

        {/* Income Source Particulars Box */}
        <div className="p-5 rounded-2xl border border-brass/40 bg-brass-subtle/80 space-y-3">
          <div className="flex items-center gap-2 font-bold text-sm text-ink">
            <Briefcase className="w-4 h-4 text-brass" />
            <span>Income Source Particulars</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-ash">
            <div>
              <strong className="text-ink block mb-0.5">Salaried:</strong> Employer name, NTN, and office address (optional).
            </div>
            <div>
              <strong className="text-ink block mb-0.5">Business / Freelancer:</strong> Business name, principal activity, and utility bills.
            </div>
            <div>
              <strong className="text-ink block mb-0.5">Property / Support:</strong> Rental property address or confirmation of family maintenance.
            </div>
          </div>
        </div>
      </div>

      {/* Module 2: Online Registration Process (Form 181) */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6 border-rule shadow-sm">
        <div className="border-b border-rule pb-4 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-brass/20 text-ink">
              SIM & email
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink">
              Online Registration Process (Form 181)
            </h2>
          </div>
          <a
            href="https://iris.fbr.gov.pk/infosys/public/txplogin.xhtml"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono font-bold text-apple-blue hover:underline inline-flex items-center gap-1"
          >
            <span>iris.fbr.gov.pk</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {[
            { step: "01", title: "Access Portal", desc: "Open iris.fbr.gov.pk and verify the SSL secure lock." },
            { step: "02", title: "Unregistered Person", desc: "Select 'Registration for Unregistered Person' tab." },
            { step: "03", title: "Enter Particulars", desc: "Input CNIC, mobile number, email, and home address." },
            { step: "04", title: "Dual OTP Codes", desc: "Enter 6-digit codes received via SMS and Email." },
            { step: "05", title: "Complete Form 181", desc: "Submit individual registration without third-party fees." },
            { step: "06", title: "NTN & Password", desc: "Receive Iris login credentials and NTN via SMS from FBR." },
          ].map((s) => (
            <div key={s.step} className="p-4 rounded-2xl border border-rule bg-paper-light space-y-1.5">
              <span className="font-mono text-[10px] font-bold text-brass bg-folio border border-rule px-2 py-0.5 rounded-full">
                STEP {s.step}
              </span>
              <div className="font-bold text-sm text-ink">{s.title}</div>
              <p className="text-xs text-ash leading-snug">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Module 3: Family Consolidation & WHT Audit */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-5 border-rule shadow-sm bg-gradient-to-br from-paper-light to-folio">
        <div className="border-b border-rule pb-4 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-brass/20 text-ink">
              WHT certificates
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink">
              Family Group Consolidation &amp; Source Withholding Audit
            </h2>
          </div>
          <span className="font-urdu text-sm text-apple-blue" dir="rtl">خاندانی اکاؤنٹس اور ٹیکس چھوٹ</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-5 rounded-2xl border border-rule bg-paper-light space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-ink">
              <Users className="w-4 h-4 text-apple-blue" />
              <span>Inter-Family Fund Transfers Reconciliation</span>
            </div>
            <p className="text-xs text-ash leading-relaxed">
              We reconcile inter-family bank transfers (between husband, wife, parents, or children) so that money transfers for household expenses are never mistakenly treated as commercial income or double-taxed.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-rule bg-paper-light space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-ink">
              <ShieldCheck className="w-4 h-4 text-apple-blue" />
              <span>Comprehensive Withholding Tax (WHT) Audit</span>
            </div>
            <p className="text-xs text-ash leading-relaxed">
              We audit and claim all advance taxes deducted at source: ATM and bank cash withdrawals, fuel purchases, electricity and gas bills, mobile recharge and bundle package fees, and debit/credit card transactions.
            </p>
          </div>
        </div>
      </div>

      {/* Module 4: Document Upload & Manual Filing Options (SmoothUI) */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-5 border-rule shadow-sm">
        <div className="border-b border-rule pb-4 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-brass/20 text-ink">
              Form 181
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink">
              Upload Documents &amp; Manual Filing Options
            </h2>
          </div>
          <span className="font-urdu text-sm text-apple-blue" dir="rtl">
            دستاویزات اپلوڈ کریں یا مینوئل فارم پُر کریں
          </span>
        </div>

        <p className="text-xs text-ash leading-relaxed">
          Upload bank statements, CNIC scans (front, back, or combined), salary certificates, and withholding slips directly.
          If you prefer to enter all figures manually without uploading files, open the 8-window simplified wizard.
        </p>

        <SmoothFileUpload
          initialFiles={uploadedFiles}
          onFilesChange={setUploadedFiles}
          onManualEntryClick={() => appClip.open("fbr-simplified-intake")}
        />

        {uploadedFiles.length > 0 && (
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => appClip.open("tax-intake")}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-[#007AFF] hover:bg-[#007AFF]/90 text-white font-mono font-bold text-xs py-3.5 px-6 rounded-full shadow transition-all active:scale-95"
            >
              <span>Proceed with {uploadedFiles.length} Uploaded File{uploadedFiles.length > 1 ? "s" : ""}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Module 5: Category Checklist Cards */}
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
                className={`px-4 py-2 rounded-full transition-all flex items-center gap-2 text-xs font-semibold whitespace-nowrap ${
                  activeCat === c.code
                    ? "bg-ink text-paper-light font-bold shadow-sm"
                    : "bg-folio border border-rule text-ash hover:text-ink hover:border-ash"
                }`}
              >
                <span className="text-apple-blue font-bold">{c.code}</span>
                <span>{c.label}</span>
              </button>
            ))}
          </div>

          <a
            href={formatWhatsAppUrl("Hi, I need the tax document checklist for filing.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#25D366]/15 border border-[#25D366]/40 text-[#25D366] font-mono font-bold text-xs hover:bg-[#25D366]/25 transition-all shadow-sm active:scale-95 whitespace-nowrap"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
            <span>Request Checklist on WhatsApp</span>
          </a>
        </div>

        {/* Checklist Card */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-5 border-rule shadow-sm">
          <div className="border-b border-rule-light pb-3 flex items-baseline justify-between">
            <h2 className="font-serif text-xl font-bold text-ink">{current.title}</h2>
            <span className="font-urdu text-sm text-apple-blue" dir="rtl">{current.ur}</span>
          </div>

          <div className="space-y-3">
            {current.items.map((item, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl border border-rule bg-paper-light flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-bold text-brass px-2.5 py-0.5 rounded-full bg-folio border border-rule">
                      {item.code}
                    </span>
                    <span className="text-sm font-semibold text-ink">{item.en}</span>
                  </div>
                  <div className="font-urdu text-xs text-apple-blue" dir="rtl">{item.ur}</div>
                </div>

                <div className="shrink-0">
                  {item.type === "required" ? (
                    <span className="font-mono text-[10px] font-bold text-ink bg-brass/25 border border-brass px-3 py-1 rounded-full uppercase">
                      Required
                    </span>
                  ) : (
                    <span className="font-mono text-[10px] text-ash bg-paper border border-rule px-3 py-1 rounded-full uppercase">
                      If Applicable
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Module 5: Certificate Message Templates & App Guide */}
      <TaxCertificateTemplates />

      {/* CTA Band */}
      <div className="bg-ink dark:bg-[#1c1c1e] text-paper-light border border-black/[0.08] dark:border-white/[0.12] p-8 sm:p-10 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center sm:text-left">
          <span className="font-mono text-xs text-apple-blue font-bold uppercase tracking-wider">READY WITH PAPERS?</span>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Begin filing with {activeCat} checklist
          </div>
          <p className="text-xs sm:text-sm text-ash-light leading-relaxed max-w-md font-sans">
            You can photo-share documents on WhatsApp during our step-by-step guidance.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <Link
            href={`/start?cat=${activeCat}`}
            className="inline-flex items-center justify-center gap-2 bg-apple-blue hover:bg-apple-blue/90 text-white font-mono font-bold text-xs py-3.5 px-6 rounded-full shadow transition-all active:scale-95 whitespace-nowrap"
          >
            <span>Start Filing ({activeCat})</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </Link>

          <a
            href={formatWhatsAppUrl("Hi, I want guidance on FBR Individual Registration.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebd59] text-white font-mono font-bold text-xs py-3.5 px-5 rounded-full transition-all active:scale-95 whitespace-nowrap"
          >
            <WhatsAppIcon className="w-4 h-4 shrink-0" />
            <span>WhatsApp ({SITE_CONFIG.contact.whatsappDisplay})</span>
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* ========================================================
          1. MOBILE VIEWPORT (md:hidden): Frosted Liquid Glass AppClip
          ======================================================== */}
      <div className="block md:hidden">
        <AppClipSheet
          onClose={() => router.push("/")}
          title="FBR Requirements & Checklist"
          subtitle="TY2026 Evidence Schedule • Form 181 • Templates"
        >
          <div className="pb-4 pt-2">
            {renderModules()}
          </div>
        </AppClipSheet>
      </div>

      {/* ========================================================
          2. DESKTOP VIEWPORT (hidden md:block): Two-Column Layout
          ======================================================== */}
      <div className="hidden md:block max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16 pb-32">
        <div className="grid grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT COLUMN: Sticky Overview, Breathable Typography */}
          <div className="col-span-5 lg:col-span-4 sticky top-24 space-y-6">
            <div className="space-y-3">
              <div>
                <span className="inline-block font-mono text-[11px] text-brass font-bold tracking-widest uppercase bg-brass/10 border border-brass/30 px-3 py-1 rounded-full">
                  EVIDENCE SCHEDULE · TY2026
                </span>
              </div>

              <h1 className="font-serif text-3xl lg:text-4xl font-black text-ink leading-tight">
                FBR Registration Requirements
              </h1>

              <div className="font-urdu text-base font-bold text-apple-blue" dir="rtl">
                ایف بی آر انفرادی رجسٹریشن و نیشنل ٹیکس نمبر (NTN) کے ضروری تقاضے
              </div>

              <p className="text-sm text-ash leading-relaxed">
                To register as an individual with the Federal Board of Revenue (FBR) and obtain your National Tax Number (NTN), you can complete the online process through the FBR Iris Portal.
              </p>
            </div>

            {/* Zero-Credential Invariant Card */}
            <div className="p-5 rounded-2xl bg-paper-light border border-rule space-y-2.5 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-apple-blue">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Zero-Credential Invariant</span>
              </div>
              <p className="text-xs text-ash leading-relaxed">
                We never store, input, or ask for your FBR IRIS password. Registration codes and PIN are verified directly with FBR.
              </p>
              <div className="pt-2 border-t border-rule-light font-mono text-[11px] text-ash flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-brass" />
                <span>Official Gateway:</span>
                <a
                  href="https://iris.fbr.gov.pk/infosys/public/txplogin.xhtml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink font-bold hover:text-brass underline inline-flex items-center gap-1"
                >
                  <span>iris.fbr.gov.pk</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* WhatsApp Assistance */}
            <div className="p-5 rounded-2xl bg-folio border border-rule space-y-3 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink">
                  Document Desk Online
                </span>
              </div>
              <p className="text-xs text-ash leading-relaxed">
                Missing a bank certificate or need assistance requesting WHT from telecom? Chat with our desk.
              </p>
              <a
                href={formatWhatsAppUrl("Hi, I have questions about required tax documents.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-full bg-[#25D366] hover:bg-[#1ebd59] text-white font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>WhatsApp Desk ({SITE_CONFIG.contact.whatsappDisplay})</span>
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: Modules and Checklist */}
          <div className="col-span-7 lg:col-span-8">
            {renderModules()}
          </div>
        </div>
      </div>
    </>
  );
}
