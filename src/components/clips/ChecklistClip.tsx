"use client";

import React, { useState } from "react";
import { AppClipSheet } from "@/components/ui/app-clip/AppClipSheet";
import { WhatsAppIcon } from "@/components/ui/icons/whatsapp-icon";
import { CheckSquare, Square, FileText, ArrowRight, Sparkles } from "lucide-react";
import { useAppClip } from "@/components/ui/app-clip/AppClipProvider";

const CHECKLISTS: Record<string, { titleEn: string; titleUr: string; items: { en: string; ur: string }[] }> = {
  salaried: {
    titleEn: "Salaried Individual Documents",
    titleUr: "تنخواہ دار ملازمین کے لیے ضروری کاغذات",
    items: [
      { en: "Salary Slips / Annual Salary Certificate (July 2025 – June 2026)", ur: "سالانہ تنخواہ کا سرٹیفکیٹ یا تمام سیلری سلپس" },
      { en: "Tax Deduction Certificate from Employer (Section 149)", ur: "ادارے سے حاصل کردہ ٹیکس کٹوتی کا سرٹیفکیٹ" },
      { en: "Bank Statements with profit & WHT tax deduction certificates", ur: "تمام بینک اکاؤنٹس کی سالانہ اسٹیٹمنٹ مع منافع و ٹیکس کٹوتی" },
      { en: "Electricity, Gas & Mobile SIM tax certificates (recharge & packages)", ur: "بجلی، گیس کے بلز اور موبائل سم پر ٹیکس کٹوتی کا ریکارڈ" },
      { en: "Vehicle purchase/token tax or Property sale/purchase deeds", ur: "گاڑی، پلاٹ یا مکان کی خرید و فروخت کی تفصیلات" },
      { en: "Source WHT deductions (ATM cash withdrawals, fuel, card fees)", ur: "اے ٹی ایم، پیٹرول اور کارڈ کٹوتیوں کا ایڈوانس ٹیکس کلیم" },
    ],
  },
  pensioner: {
    titleEn: "Senior Citizen & Pensioner Documents",
    titleUr: "پنشنرز اور بزرگ شہریوں کے لیے ضروری کاغذات",
    items: [
      { en: "Pension Book / Pension Bank Statement for Tax Year 2026", ur: "پنشن بک یا پنشن والے بینک اکاؤنٹ کی سالانہ اسٹیٹمنٹ" },
      { en: "National Savings / Behbood Certificates profit deduction slips", ur: "قومی بچت، بہبود یا پنشنر سرٹیفکیٹ پر منافع اور ودہولڈنگ ٹیکس" },
      { en: "Utility bills tax deduction certificates", ur: "بجلی اور گیس کے بلوں پر ودہولڈنگ ٹیکس" },
      { en: "Bank withholding tax certificates (Cash withdrawal / profit)", ur: "بینک منافع یا کیش نکلوانے پر کٹوتی کا سرٹیفکیٹ" },
      { en: "Existing assets list (House, plots, cash in bank)", ur: "موجودہ اثاثہ جات کی تفصیل (مکان، پلاٹ، کیش)" },
    ],
  },
  no_income: {
    titleEn: "Housewife & Non-Earning Documents",
    titleUr: "گھریلو خواتین اور بغیر آمدنی افراد کے کاغذات",
    items: [
      { en: "Valid CNIC (13 digits front and back)", ur: "قومی شناختی کارڈ کی کاپی" },
      { en: "Active Mobile SIM in applicant's own CNIC OR immediate family member", ur: "اپنے شناختی کارڈ یا قریبی رشتہ دار کے نام پر رجسٹرڈ فعال سم" },
      { en: "Personal Email address (we can guide and create one for you)", ur: "ذاتی ای میل ایڈریس (اگر نہیں ہے تو ہم نیا بنا کر ترتیب دیں گے)" },
      { en: "Current Residential Address details", ur: "موجودہ رہائشی پتہ" },
      { en: "Active Bank Account Statement (showing nominal maintenance)", ur: "بینک اکاؤنٹ کی سالانہ اسٹیٹمنٹ" },
      { en: "Source of funds declaration (Husband / Family maintenance)", ur: "اخراجات کے ذرائع کا بیان (مثلاً شوہر یا والدین کی کفالت)" },
    ],
  },
  student: {
    titleEn: "Student Filer Documents",
    titleUr: "طالب علم فائلر کے لیے ضروری کاغذات",
    items: [
      { en: "Valid CNIC & Student Card Copy", ur: "شناختی کارڈ اور اسٹوڈنٹ کارڈ کی کاپی" },
      { en: "Active SIM registered in student's name or guardian's name", ur: "طالب علم یا سرپرست کے نام پر رجسٹرڈ سم" },
      { en: "University Fee Receipts (Advance tax under Sec 236I)", ur: "یونیورسٹی فیس کی رسیدیں مع ایڈوانس ٹیکس کٹوتی" },
      { en: "Student Bank Account Statement", ur: "اسٹوڈنٹ اکاؤنٹ کی بینک اسٹیٹمنٹ" },
      { en: "Source of Pocket Money / Guardian Support Confirmation", ur: "تعلیمی اخراجات و جیب خرچ کا ذریعہ (والدین کی معاونت)" },
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
  const appClip = useAppClip();
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
      <div className="space-y-4 pb-24 text-ink dark:text-[#F4EFE6]">
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
              className={`px-3.5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border active:scale-95 ${
                activeTab === tab.id
                  ? "bg-[#128C7E] text-white border-[#128C7E] shadow-sm"
                  : "bg-white/60 dark:bg-white/[0.04] border-black/[0.08] dark:border-white/10 text-ash dark:text-[#8C959F] hover:text-ink"
              }`}
            >
              {tab.en} / <span className="font-urdu">{tab.ur}</span>
            </button>
          ))}
        </div>

        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-ink dark:text-white uppercase tracking-wider">{current.titleEn}</h3>
          <p className="text-xs font-bold text-[#128C7E] font-urdu" dir="rtl">
            {current.titleUr}
          </p>
        </div>

        {/* Interactive Checklist Items */}
        <div className="space-y-2">
          {current.items.map((item, idx) => {
            const isChecked = !!checkedItems[`${activeTab}-${idx}`];
            return (
              <div
                key={idx}
                onClick={() => toggleCheck(idx)}
                className={`p-3 rounded-2xl border cursor-pointer flex items-start gap-3 transition-all backdrop-blur-md ${
                  isChecked
                    ? "bg-[#128C7E]/10 border-[#128C7E]/40"
                    : "bg-white/60 dark:bg-white/[0.03] border-black/[0.06] dark:border-white/10 hover:border-[#128C7E]/40"
                }`}
              >
                {isChecked ? (
                  <CheckSquare className="w-4 h-4 text-[#128C7E] shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-4 h-4 text-ash dark:text-[#8C959F] shrink-0 mt-0.5" />
                )}
                <div className="space-y-0.5 min-w-0 flex-1">
                  <div className={`text-xs font-medium ${isChecked ? "line-through opacity-60" : ""}`}>
                    {item.en}
                  </div>
                  <div className="text-[11px] font-urdu opacity-75" dir="rtl">
                    {item.ur}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-3.5 rounded-2xl bg-white/60 dark:bg-white/[0.04] backdrop-blur-md border border-black/[0.06] dark:border-white/10 text-xs space-y-1">
          <div className="font-bold text-ink dark:text-white">Don&apos;t have all documents right now?</div>
          <p className="text-ash dark:text-[#8C959F] leading-relaxed font-urdu text-[11px]" dir="rtl">
            اگر تمام کاغذات دستیاب نہیں ہیں تو فکر نہ کریں، ہمارے نمائندے آپ کے دستیاب ریکارڈ کے مطابق فائلنگ میں مدد کریں گے۔
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row gap-2">
          <button
            type="button"
            onClick={() => {
              onClose();
              appClip.open("tax-intake", { defaultPersona: activeTab });
            }}
            className="flex-1 py-3 rounded-full bg-gradient-to-r from-[#128C7E] to-[#0A6054] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
          >
            <span>Proceed to Fast Intake</span>
            <Sparkles className="w-4 h-4" />
          </button>

          <a
            href="https://wa.me/923120947187?text=Hi%2C%20I%20have%20questions%20about%20required%20tax%20documents."
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-5 rounded-full bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>WhatsApp (03120947187)</span>
          </a>
        </div>
      </div>
    </AppClipSheet>
  );
}
