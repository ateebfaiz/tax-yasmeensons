"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppClipSheet } from "@/components/ui/app-clip/AppClipSheet";
import { GlassCard } from "@/components/ui/glass/GlassCard";
import { GlassButton } from "@/components/ui/glass/GlassButton";
import { GlassSegmentedControl } from "@/components/ui/glass/GlassSegmentedControl";
import { WhatsAppIcon } from "@/components/ui/icons/whatsapp-icon";
import { CheckSquare, Square, Sparkles, UploadCloud, ListChecks } from "lucide-react";
import { useAppClip } from "@/components/ui/app-clip/AppClipProvider";
import { SmoothFileUpload, UploadedTaxDocument } from "@/components/ui/file-upload";
import { formatWhatsAppUrl } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/config";

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

  const [viewMode, setViewMode] = useState<"upload" | "checklist">("upload");
  const [uploadedDocs, setUploadedDocs] = useState<UploadedTaxDocument[]>([]);

  const viewModeTabs = [
    { id: "upload", label: "Upload Documents", labelUrdu: "کاغذات اپلوڈ" },
    { id: "checklist", label: "View Checklist", labelUrdu: "مکمل فہرست" },
  ];

  const current = CHECKLISTS[activeTab] || CHECKLISTS.salaried;

  const toggleCheck = (idx: number) => {
    const key = `${activeTab}-${idx}`;
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const tabs = [
    { id: "salaried", label: "Salaried", labelUrdu: "تنخواہ دار" },
    { id: "pensioner", label: "Pensioner", labelUrdu: "پنشنر" },
    { id: "no_income", label: "No Income", labelUrdu: "بغیر آمدنی" },
    { id: "student", label: "Student", labelUrdu: "طالب علم" },
  ];

  return (
    <AppClipSheet
      onClose={onClose}
      title="Filing Documents & Upload"
      subtitle="دستاویزات اپلوڈ و چیک لسٹ • Tax Year 2026"
    >
      <div className="space-y-3.5 pb-3 text-ink dark:text-white">
        {/* Mode Selector: Direct Upload vs Full Checklist */}
        <GlassSegmentedControl
          tabs={viewModeTabs}
          activeTab={viewMode}
          onChange={(id) => setViewMode(id as "upload" | "checklist")}
        />

        {viewMode === "upload" ? (
          <div className="space-y-3">
            <SmoothFileUpload
              initialFiles={uploadedDocs}
              onFilesChange={setUploadedDocs}
              onManualEntryClick={() => {
                onClose();
                appClip.open("fbr-simplified-intake");
              }}
            />
          </div>
        ) : (
          <div className="space-y-3">
            {/* Category Tabs */}
            <GlassSegmentedControl
              tabs={tabs}
              activeTab={activeTab}
              onChange={(id) => setActiveTab(id)}
            />

            <div className="space-y-0.5 pt-1">
              <h3 className="text-xs font-bold text-ink dark:text-white uppercase tracking-wider">
                {current.titleEn}
              </h3>
              <p className="text-xs font-bold text-apple-blue font-urdu" dir="rtl">
                {current.titleUr}
              </p>
            </div>

        {/* Interactive Checklist Items */}
        <div className="space-y-2">
          {current.items.map((item, idx) => {
            const isChecked = !!checkedItems[`${activeTab}-${idx}`];
            return (
              <GlassCard
                key={idx}
                variant={isChecked ? "active" : "default"}
                interactive
                onClick={() => toggleCheck(idx)}
                className="p-3.5 flex items-start gap-3"
              >
                {isChecked ? (
                  <CheckSquare className="w-4 h-4 text-apple-blue shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-4 h-4 text-ash dark:text-white/60 shrink-0 mt-0.5" />
                )}
                <div className="space-y-0.5 min-w-0 flex-1">
                  <div
                    className={`text-xs font-medium transition-all ${
                      isChecked ? "line-through opacity-60 text-ash dark:text-white/60" : "text-ink dark:text-white"
                    }`}
                  >
                    {item.en}
                  </div>
                  <div className="text-[11px] font-urdu opacity-75 text-apple-blue" dir="rtl">
                    {item.ur}
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* Info Note */}
        <GlassCard variant="subtle" className="p-3 text-xs space-y-1">
          <div className="font-bold text-ink dark:text-white">Don&apos;t have all documents right now?</div>
          <p className="text-ash dark:text-white/60 leading-relaxed font-urdu text-[11px]" dir="rtl">
            اگر تمام کاغذات دستیاب نہیں ہیں تو فکر نہ کریں، ہمارے نمائندے آپ کے دستیاب ریکارڈ کے مطابق فائلنگ میں مدد کریں گے۔
          </p>
        </GlassCard>

        {/* Certificate Request Templates & App Guide */}
        <GlassCard variant="glow" className="p-3 flex items-center justify-between gap-3 text-xs">
          <div>
            <strong className="text-ink dark:text-white block font-bold">Need WHT, PRC or SIM Certificates?</strong>
            <span className="text-ash dark:text-white/60 text-[11px]">Copy-paste messages &amp; instant app guide</span>
          </div>
          <Link
            href="/requirements"
            onClick={onClose}
            className="px-3 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.16] border border-white/20 text-ink dark:text-white font-bold text-[11px] whitespace-nowrap shadow-sm active:scale-95 transition-all"
          >
            View Templates →
          </Link>
        </GlassCard>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
          <GlassButton
            type="button"
            variant="primary"
            onClick={() => {
              onClose();
              appClip.open("tax-intake", { defaultPersona: activeTab });
            }}
            icon={<Sparkles className="w-4 h-4" />}
            className="flex-1"
          >
            Proceed to Fast Intake
          </GlassButton>

          <a
            href={formatWhatsAppUrl("Hi, I have questions about required tax documents.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-white/80 dark:bg-[#1c1c1e]/75 hover:bg-[#25D366]/10 border border-[#25D366]/40 text-[#25D366] font-bold text-xs backdrop-blur-xl shadow-sm active:scale-95 transition-all whitespace-nowrap"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>WhatsApp ({SITE_CONFIG.contact.whatsappDisplay})</span>
          </a>
        </div>
          </div>
        )}
      </div>
    </AppClipSheet>
  );
}
