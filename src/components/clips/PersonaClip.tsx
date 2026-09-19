"use client";

import React from "react";
import { AppClipSheet } from "@/components/ui/app-clip/AppClipSheet";
import { useAppClip } from "@/components/ui/app-clip/AppClipProvider";
import { WhatsAppIcon } from "@/components/ui/icons/whatsapp-icon";
import { formatWhatsAppUrl } from "@/lib/utils";
import {
  Briefcase,
  HeartHandshake,
  Users,
  GraduationCap,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export type PersonaType = "salaried" | "pensioner" | "housewife" | "student";

interface PersonaClipProps {
  persona: PersonaType;
  onClose: () => void;
}

const PERSONA_DETAILS: Record<
  PersonaType,
  {
    code: string;
    titleEn: string;
    titleUr: string;
    subtitleEn: string;
    icon: any;
    leadEn: string;
    leadUr: string;
    pillars: { badge: string; title: string; desc: string }[];
    docs: string[];
    intakePersonaId: string;
  }
> = {
  salaried: {
    code: "SAL",
    titleEn: "Salaried Individuals",
    titleUr: "تنخواہ دار ملازمین کی فائلنگ",
    subtitleEn: "Salary Certificate · s.149 Deductions · Zero Password",
    icon: Briefcase,
    leadEn: "For full-time, contract, or private employment with salary deduction at source.",
    leadUr: "سرکاری یا پرائیویٹ ملازمت پیشہ افراد جن کی تنخواہ سے ٹیکس کٹوتی ہوتی ہے۔",
    pillars: [
      {
        badge: "s.149 AUDIT",
        title: "Employer Tax Reconciliation",
        desc: "Reconcile your annual salary certificate against official tax slabs to prevent duplicate taxation.",
      },
      {
        badge: "s.235/236 WHT",
        title: "Adjustable Source Tax Credits",
        desc: "Claim withholding tax refunds on mobile SIM load, electricity bills, and banking transactions.",
      },
      {
        badge: "s.116 WEALTH",
        title: "Wealth Statement Balance",
        desc: "Zero-gap reconciliation of household expenses, assets, and bank balances balancing to 0.00.",
      },
    ],
    docs: [
      "Annual Salary Certificate or 12 months salary slips (July 2025 – June 2026)",
      "Section 149 tax deduction certificate issued by employer",
      "Bank account statements for the tax year with profit-on-debt details",
      "Annual mobile phone tax deduction certificate (Jazz/Telenor/Zong/Ufone)",
    ],
    intakePersonaId: "salaried",
  },
  pensioner: {
    code: "PEN",
    titleEn: "Senior Citizens & Pensioners",
    titleUr: "سینئر سٹیزن اور پنشنرز کی فائلنگ",
    subtitleEn: "Tax-Exempt Pension · Senior Rebate · Behbood NSS",
    icon: HeartHandshake,
    leadEn: "For retired government servants, armed forces, private pensioners, and seniors.",
    leadUr: "ریٹائرڈ سرکاری، فوجی، یا نجی ملازمین اور 60 سال سے زائد عمر کے شہری۔",
    pillars: [
      {
        badge: "SEC. 53 EXEMPT",
        title: "Pension 100% Tax Free",
        desc: "Government and armed forces pensions are fully exempt from income tax under Second Schedule.",
      },
      {
        badge: "SENIOR REBATE",
        title: "Senior Citizen Tax Reduction",
        desc: "Qualify for preferential tax reductions and higher non-taxable threshold brackets.",
      },
      {
        badge: "BEHBOOD NSS",
        title: "National Savings Protection",
        desc: "Correctly report Behbood & Pensioner accounts so final tax is strictly recognized.",
      },
    ],
    docs: [
      "Annual Pension payment slip or bank pension credit statement",
      "National Savings (Behbood / Pensioners / Regular Income) withholding certificates",
      "Bank statements for all active accounts for the tax year",
      "Annual telecom withholding statement and home utility bills",
    ],
    intakePersonaId: "pensioner",
  },
  housewife: {
    code: "HIF",
    titleEn: "Housewife & Non-Earning",
    titleUr: "گھریلو خواتین اور غیر ملازمت پیشہ افراد",
    subtitleEn: "Independent ATL · Asset Protection · Zero Income",
    icon: Users,
    leadEn: "For homemakers, dependent spouses, or non-earning family members holding assets.",
    leadUr: "گھریلو خواتین جن کے نام پر جائیداد، گاڑی یا بینک اکاؤنٹ موجود ہو۔",
    pillars: [
      {
        badge: "s.111 SAFEGUARD",
        title: "Unexplained Wealth Protection",
        desc: "Safely declare gold, property, or inheritance in your name to prevent FBR audit notices.",
      },
      {
        badge: "ACTIVE ATL",
        title: "Avoid 100% Tax Penalties",
        desc: "Active Taxpayer status eliminates punitive doubling of taxes on banking and asset purchases.",
      },
      {
        badge: "FAMILY GIFT",
        title: "Family Allowance Reconciliation",
        desc: "Properly record household allowances and gifts from spouse or parents without tax liability.",
      },
    ],
    docs: [
      "Valid CNIC number (13 digits)",
      "Active mobile SIM (in own name or blood relative/spouse)",
      "Bank statement (if maintaining any account or savings)",
      "Details of property, vehicle, or jewelry held in your name",
    ],
    intakePersonaId: "housewife",
  },
  student: {
    code: "STU",
    titleEn: "Students & Freelancer Youth",
    titleUr: "طلباء اور نوجوان فری لانسرز کی فائلنگ",
    subtitleEn: "0.25%-1% PSEB IT Export · Active ATL · Zero Password",
    icon: GraduationCap,
    leadEn: "For university students, remote workers, content creators, and IT freelancers.",
    leadUr: "یونیورسٹی کے طلباء، فری لانسرز، اور ریموٹ کام کرنے والے نوجوان۔",
    pillars: [
      {
        badge: "s.154A IT EXPORT",
        title: "0.25% - 1% Concession Tax",
        desc: "Software and IT freelancing exports qualify for specialized minimal tax withholding rates.",
      },
      {
        badge: "PRC / FIRC",
        title: "Foreign Remittance Proof",
        desc: "Certify payments received via Payoneer, Upwork, Fiverr, or direct bank remittances.",
      },
      {
        badge: "ZERO PASSWORD",
        title: "Self-Filing Security",
        desc: "We verify your wealth reconciliation without ever asking for your FBR IRIS credentials.",
      },
    ],
    docs: [
      "Valid CNIC and active mobile SIM registered in own CNIC",
      "Bank statement & Proceeds Realization Certificates (PRC) for foreign payments",
      "PSEB registration certificate (if available for 0.25% rate)",
      "Freelance platform invoices or receipts (Upwork/Fiverr/Deel)",
    ],
    intakePersonaId: "student",
  },
};

export default function PersonaClip({ persona, onClose }: PersonaClipProps) {
  const appClip = useAppClip();
  const current = PERSONA_DETAILS[persona] || PERSONA_DETAILS.salaried;
  const Icon = current.icon;

  const handleStartFiling = () => {
    onClose();
    appClip.open("tax-intake", { defaultPersona: current.intakePersonaId });
  };

  return (
    <AppClipSheet
      onClose={onClose}
      fullHeight
      title={current.titleEn}
      subtitle={current.subtitleEn}
    >
      <div className="space-y-4 pb-24 text-ink dark:text-[#F4EFE6]">
        {/* Profile Card */}
        <div className="p-4 rounded-2xl bg-white/45 dark:bg-white/[0.04] backdrop-blur-xl border border-white/70 dark:border-white/10 space-y-2 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#128C7E]/15 dark:bg-[#C4A046]/15 flex items-center justify-center text-[#128C7E] dark:text-[#C4A046]">
                <Icon className="w-4 h-4" />
              </div>
              <span className="font-mono text-xs font-bold text-[#128C7E] dark:text-[#C4A046]">
                CODE: {current.code}
              </span>
            </div>
            <span className="font-mono text-[10px] text-ash bg-white/60 dark:bg-white/10 px-2.5 py-0.5 rounded-full border border-white/60 dark:border-white/10">
              TY2026 AUDIENCE
            </span>
          </div>

          <div className="font-urdu text-sm font-bold text-[#128C7E] dark:text-[#C4A046]" dir="rtl">
            {current.titleUr}
          </div>
          <p className="text-xs text-ash dark:text-[#8C959F] leading-relaxed">
            {current.leadEn}
          </p>
          <div className="font-urdu text-xs text-ash dark:text-[#8C959F] leading-relaxed" dir="rtl">
            {current.leadUr}
          </div>
        </div>

        {/* 3 Core Pillars */}
        <div className="space-y-2">
          <div className="font-mono text-xs font-bold uppercase tracking-wider text-ash dark:text-[#8C959F]">
            Key Provisions &amp; Tax Rights
          </div>
          <div className="space-y-2">
            {current.pillars.map((p, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-white/45 dark:bg-white/[0.04] backdrop-blur-xl border border-white/70 dark:border-white/10 space-y-1 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-ink dark:text-white">{p.title}</span>
                  <span className="font-mono text-[9px] font-bold text-brass px-2 py-0.5 rounded-full bg-brass/10 border border-brass/30">
                    {p.badge}
                  </span>
                </div>
                <p className="text-[11px] text-ash dark:text-[#8C959F] leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Required Documents Checklist */}
        <div className="p-4 rounded-2xl bg-white/45 dark:bg-white/[0.04] backdrop-blur-xl border border-white/70 dark:border-white/10 space-y-2.5 shadow-sm">
          <div className="flex items-center justify-between border-b border-white/60 dark:border-white/10 pb-2">
            <span className="font-serif text-sm font-bold text-ink dark:text-white">
              Required Documents Checklist
            </span>
            <span className="font-urdu text-xs text-[#128C7E] dark:text-[#C4A046]" dir="rtl">
              لازمی دستاویزات
            </span>
          </div>

          <ul className="space-y-2 text-xs text-ash dark:text-[#8C959F] font-mono">
            {current.docs.map((doc, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#128C7E] dark:text-[#C4A046] shrink-0 mt-0.5" />
                <span className="leading-snug">{doc}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Security Stamp */}
        <div className="p-3 rounded-2xl bg-white/40 dark:bg-white/[0.03] backdrop-blur-md border border-white/60 dark:border-white/10 flex items-center gap-2 text-xs">
          <ShieldCheck className="w-4 h-4 text-[#128C7E] shrink-0" />
          <span className="text-[11px] text-ash dark:text-[#8C959F]">
            Zero password sharing: We prepare numbers and guide you on official IRIS.
          </span>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col gap-2">
          <button
            type="button"
            onClick={handleStartFiling}
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#128C7E] to-[#0A6054] hover:from-[#149989] hover:to-[#0D6D60] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
          >
            <span>Start Filing as {current.code} ({current.titleEn})</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href={formatWhatsAppUrl(
              `Hi, I need assistance with Tax Year 2026 filing for ${current.titleEn} (${current.code}).`,
              "03120947187"
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 rounded-full border border-white/80 dark:border-white/15 bg-white/45 dark:bg-white/[0.04] backdrop-blur-md text-[#128C7E] dark:text-white font-bold text-xs flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm"
          >
            <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
            <span>Consult on WhatsApp (0312 0947187)</span>
          </a>
        </div>
      </div>
    </AppClipSheet>
  );
}
