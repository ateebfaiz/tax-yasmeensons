"use client";

import React, { useState } from "react";
import { AppClipSheet } from "@/components/ui/app-clip/AppClipSheet";
import { CheckSquare, Square, FileText, ArrowRight } from "lucide-react";

const CHECKLISTS: Record<string, { titleEn: string; titleUr: string; items: { en: string; ur: string }[] }> = {
  salaried: {
    titleEn: "Salaried Individual Documents",
    titleUr: "تنخواہ دار ملازمین کے لیے ضروری کاغذات",
    items: [
      { en: "Salary Slips / Annual Salary Certificate (July 2025 – June 2026)", ur: "سالانہ تنخواہ کا سرٹیفکیٹ یا تمام سیلری سلپس" },
      { en: "Tax Deduction Certificate from Employer (Section 149)", ur: "ادارے سے حاصل کردہ ٹیکس کٹوتی کا سرٹیفکیٹ" },
      { en: "Bank Account Statements (July 2025 to June 2026)", ur: "تمام بینک اکاؤنٹس کی سالانہ اسٹیٹمنٹ مع منافع و ٹیکس کٹوتی" },
      { en: "Electricity, Gas & Mobile Tax Deduction Certificates", ur: "بجلی، گیس کے بلز اور موبائل سم پر ٹیکس کٹوتی کا ریکارڈ" },
      { en: "Vehicle or Property Purchase/Sale details (if any)", ur: "گاڑی، پلاٹ یا مکان کی خرید و فروخت کی تفصیلات (اگر کوئی ہو)" },
      { en: "Personal & Household Expenses estimate", ur: "سالانہ ذاتی و گھریلو اخراجات کا تخمینہ" },
    ],
  },
  pensioner: {
    titleEn: "Senior Citizen & Pensioner Documents",
    titleUr: "پنشنرز اور بزرگ شہریوں کے لیے ضروری کاغذات",
    items: [
      { en: "Pension Book / Pension Bank Statement for Tax Year 2026", ur: "پنشن بک یا پنشن والے بینک اکاؤنٹ کی سالانہ اسٹیٹمنٹ" },
      { en: "National Savings / Behbood Certificates profit slips", ur: "قومی بچت، بہبود یا پنشنر سرٹیفکیٹ پر منافع اور ودہولڈنگ ٹیکس" },
      { en: "Utility bills tax deduction certificates", ur: "بجلی اور گیس کے بلوں پر ودہولڈنگ ٹیکس" },
      { en: "Bank withholding tax certificates (Cash withdrawal / profit)", ur: "بینک منافع یا کیش نکلوانے پر کٹوتی کا سرٹیفکیٹ" },
      { en: "Existing assets list (House, plots, cash in bank)", ur: "موجودہ اثاثہ جات کی تفصیل (مکان، پلاٹ، کیش)" },
    ],
  },
  no_income: {
    titleEn: "Housewife & Non-Earning Documents",
    titleUr: "گھریلو خواتین اور بغیر آمدنی افراد کے کاغذات",
    items: [
      { en: "Valid CNIC Copy", ur: "قومی شناختی کارڈ کی کاپی" },
      { en: "Active Mobile SIM registered in applicant's own CNIC", ur: "اپنے شناختی کارڈ پر رجسٹرڈ ایکٹو موبائل سم" },
      { en: "Active Bank Account Statement (showing nominal maintenance balance)", ur: "بینک اکاؤنٹ کی سالانہ اسٹیٹمنٹ" },
      { en: "Details of any inherited or gifted property / vehicle", ur: "وراثت یا تحفے میں ملے پلاٹ، مکان یا زیورات کی تفصیل" },
      { en: "Source of funds declaration (Husband / Family support)", ur: "اخراجات کے ذرائع کا بیان (مثلاً شوہر یا والدین کی کفالت)" },
    ],
  },
  student: {
    titleEn: "Student Filer Documents",
    titleUr: "طالب علم فائلر کے لیے ضروری کاغذات",
    items: [
      { en: "Valid CNIC & Student Card Copy", ur: "شناختی کارڈ اور اسٹوڈنٹ کارڈ کی کاپی" },
      { en: "SIM registered on student's own CNIC", ur: "اپنے نام پر رجسٹرڈ موبائل سم" },
      { en: "University Fee Receipts (Advance tax under Sec 236I)", ur: "یونیورسٹی فیس کی رسیدیں مع ایڈوانس ٹیکس کٹوتی" },
      { en: "Student Bank Account Statement", ur: "اسٹوڈنٹ اکاؤنٹ کی بینک اسٹیٹمنٹ" },
      { en: "Source of Pocket Money / Guardian Support Letter", ur: "تعلیمی اخراجات و جیب خرچ کا ذریعہ (والدین کی معاونت)" },
    ],
  },
};

export default function ChecklistClip({
  onClose,
  payload,
}: {
  onClose: () => void;
  payload?: { persona?: string };
}) {
  const [activeTab, setActiveTab] = useState<string>(payload?.persona || "salaried");
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const current = CHECKLISTS[activeTab] || CHECKLISTS.salaried;

  const toggleCheck = (idx: number) => {
    const key = `${activeTab}-${idx}`;
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <AppClipSheet
      onClose={onClose}
      fullHeight
      title="Filing Document Checklist"
      subtitle="دستاویزات کی مکمل چیک لسٹ • Tax Year 2026"
    >
      <div className="p-4 md:p-6 pb-20 space-y-5">
        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {[
            { id: "salaried", en: "Salaried", ur: "تنخواہ دار" },
            { id: "pensioner", en: "Pensioner", ur: "پنشنر" },
            { id: "no_income", en: "No Income", ur: "بغیر آمدنی" },
            { id: "student", en: "Student", ur: "طالب علم" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                activeTab === tab.id
                  ? "bg-theme-primary text-white border-theme-primary shadow-sm"
                  : "bg-theme-surface/60 border-theme-border text-theme-text-secondary hover:text-theme-text"
              }`}
            >
              {tab.en} / <span className="font-urdu">{tab.ur}</span>
            </button>
          ))}
        </div>

        <div className="space-y-1">
          <h3 className="text-sm font-bold text-theme-text">{current.titleEn}</h3>
          <p className="text-xs font-semibold text-theme-primary font-urdu" dir="rtl">
            {current.titleUr}
          </p>
        </div>

        {/* Interactive Checklist Items */}
        <div className="space-y-2.5">
          {current.items.map((item, idx) => {
            const isChecked = !!checkedItems[`${activeTab}-${idx}`];
            return (
              <div
                key={idx}
                onClick={() => toggleCheck(idx)}
                className={`p-3.5 rounded-xl border cursor-pointer flex items-start gap-3 transition-all ${
                  isChecked
                    ? "bg-theme-primary/10 border-theme-primary/40 text-theme-text"
                    : "bg-theme-surface/50 border-theme-border/70 hover:border-theme-border"
                }`}
              >
                {isChecked ? (
                  <CheckSquare className="w-5 h-5 text-theme-primary shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-5 h-5 text-theme-text-muted shrink-0 mt-0.5" />
                )}
                <div className="space-y-0.5 min-w-0 flex-1">
                  <div className={`text-xs font-medium ${isChecked ? "line-through text-theme-text-muted" : "text-theme-text"}`}>
                    {item.en}
                  </div>
                  <div className="text-[12px] font-urdu text-theme-text-secondary" dir="rtl">
                    {item.ur}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-3.5 rounded-xl bg-theme-surface/70 border border-theme-border text-xs space-y-1">
          <div className="font-bold text-theme-text">Don't have all documents right now?</div>
          <p className="text-theme-text-secondary leading-relaxed font-urdu text-[11px]" dir="rtl">
            اگر تمام کاغذات دستیاب نہیں ہیں تو فکر نہ کریں، ہمارے نمائندے آپ کے دستیاب ریکارڈ کے مطابق فائلنگ میں مدد کریں گے۔
          </p>
        </div>
      </div>
    </AppClipSheet>
  );
}
