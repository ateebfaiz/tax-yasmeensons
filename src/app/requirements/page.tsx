"use client";

import React from "react";
import { useAppClip } from "@/components/ui/app-clip/AppClipProvider";
import { CheckSquare, ShieldCheck, ArrowRight, FileText } from "lucide-react";

export default function RequirementsPage() {
  const appClip = useAppClip();

  const sections = [
    {
      titleEn: "1. Salaried Individuals",
      titleUr: "تنخواہ دار ملازمین کے ضروری کاغذات",
      items: [
        { en: "Annual Salary Certificate / 12 Months Salary Slips (July 2025 to June 2026)", ur: "سالانہ تنخواہ کا سرٹیفکیٹ یا 12 ماہ کی سیلری سلپس" },
        { en: "Employer Tax Deduction Certificate (Section 149)", ur: "ادارے سے حاصل کردہ ودہولڈنگ ٹیکس سرٹیفکیٹ" },
        { en: "Bank Statements of all active accounts (with profit on debt details)", ur: "تمام فعال بینک اکاؤنٹس کی سالانہ اسٹیٹمنٹ مع منافع" },
        { en: "Utility Bills (Electricity/Gas/Mobile SIM) WHT certificates", ur: "بجلی، گیس کے بلز اور موبائل سم پر ٹیکس کٹوتی کا ریکارڈ" },
        { en: "Property / Vehicle purchase, transfer or registration receipts", ur: "پراپرٹی یا گاڑی کی خرید و فروخت یا ٹرانسفر کے کاغذات" },
      ],
    },
    {
      titleEn: "2. Senior Citizens & Pensioners",
      titleUr: "پنشنرز اور بزرگ شہریوں کے ضروری کاغذات",
      items: [
        { en: "Pension Book / Pension Account Statement for Tax Year 2026", ur: "پنشن بک یا پنشن اکاؤنٹ کی سالانہ اسٹیٹمنٹ" },
        { en: "National Savings / Behbood Certificates profit deduction records", ur: "قومی بچت، بہبود یا پنشنرز سرٹیفکیٹس پر منافع کا ریکارڈ" },
        { en: "Bank withholding certificates on cash withdrawals / profit", ur: "بینک منافع یا کیش نکلوانے پر کٹوتی کے سرٹیفکیٹس" },
        { en: "Existing assets declaration (Residential house, cash, investments)", ur: "موجودہ اثاثہ جات کی تفصیل (رہائشی مکان، پلاٹ، کیش)" },
      ],
    },
    {
      titleEn: "3. Housewives & Zero-Income Individuals",
      titleUr: "گھریلو خواتین اور بغیر آمدنی افراد کے کاغذات",
      items: [
        { en: "Valid CNIC Copy (Front & Back)", ur: "قومی شناختی کارڈ کی کاپی" },
        { en: "Active Mobile SIM registered in applicant's own CNIC", ur: "اپنے نام پر رجسٹرڈ فعال موبائل سم" },
        { en: "Bank Account Statement showing nominal transactions", ur: "بینک اکاؤنٹ کی سالانہ اسٹیٹمنٹ" },
        { en: "Gifted / Inherited property or jewelry details (if applicable)", ur: "وراثت یا تحفے میں ملے اثاثوں کی تفصیل" },
        { en: "Family maintenance / Spouse support source confirmation", ur: "گھریلو کفالت یا شوہر کی طرف سے ماہانہ اخراجات کا بیان" },
      ],
    },
    {
      titleEn: "4. Student Filers",
      titleUr: "طلباء و یوتھ فائلرز کے ضروری کاغذات",
      items: [
        { en: "Valid CNIC & University/College ID Card Copy", ur: "شناختی کارڈ اور تعلیمی ادارے کا کارڈ" },
        { en: "Mobile SIM in student's name", ur: "طالب علم کے نام پر رجسٹرڈ سم" },
        { en: "University Fee Receipts (Advance tax under Sec 236I)", ur: "یونیورسٹی فیس کی رسیدیں مع ایڈوانس ٹیکس کٹوتی" },
        { en: "Student Bank Account Statement", ur: "اسٹوڈنٹ اکاؤنٹ کی بینک اسٹیٹمنٹ" },
      ],
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-12">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-theme-primary/10 border border-theme-primary/20 text-theme-primary text-xs font-bold">
          <FileText className="w-3.5 h-3.5" />
          <span>Documentation Checklist • Tax Year 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-theme-text">Document Requirements</h1>
        <p className="text-lg font-bold text-theme-primary font-urdu" dir="rtl">
          ٹیکس فائلنگ کے لیے ضروری کاغذات کی فہرست
        </p>
        <p className="max-w-xl mx-auto text-xs sm:text-sm text-theme-text-secondary">
          Gathering your documents upfront allows fast reconciliation and maximum legitimate tax deductions.
        </p>
      </div>

      <div className="space-y-6">
        {sections.map((sec, idx) => (
          <div key={idx} className="glass-card p-6 md:p-8 space-y-5">
            <div className="border-b border-theme-border/50 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <h2 className="text-lg sm:text-xl font-bold text-theme-text">{sec.titleEn}</h2>
              <div className="text-xs sm:text-sm font-semibold text-theme-primary font-urdu" dir="rtl">
                {sec.titleUr}
              </div>
            </div>

            <div className="space-y-3">
              {sec.items.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-theme-surface/40 border border-theme-border/60">
                  <CheckSquare className="w-4 h-4 text-theme-primary shrink-0 mt-0.5" />
                  <div className="space-y-0.5 text-xs">
                    <div className="font-semibold text-theme-text">{item.en}</div>
                    <div className="text-theme-text-muted font-urdu" dir="rtl">{item.ur}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center pt-4">
        <button
          type="button"
          onClick={() => appClip.open("tax-intake")}
          className="btn-shimmer inline-flex items-center gap-2 bg-theme-primary hover:bg-theme-primary-hover text-white font-bold py-3 px-8 rounded-xl text-sm shadow-md transition-all"
        >
          <span>Have Documents Ready? Start Filing</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
