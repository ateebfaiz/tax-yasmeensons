"use client";

import React from "react";
import { AppClipSheet } from "@/components/ui/app-clip/AppClipSheet";
import { useAppClip } from "@/components/ui/app-clip/AppClipProvider";
import { GlassCard } from "@/components/ui/glass/GlassCard";
import { GlassButton } from "@/components/ui/glass/GlassButton";
import { WhatsAppIcon } from "@/components/ui/icons/whatsapp-icon";
import { formatWhatsAppUrl } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/config";
import {
  Briefcase,
  HeartHandshake,
  Users,
  GraduationCap,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
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
      title={current.titleEn}
      subtitle={current.subtitleEn}
    >
      <div className="space-y-3.5 pb-3 text-ink dark:text-white">
        {/* Profile Card */}
        <GlassCard variant="default" className="p-4 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-apple-blue/15 flex items-center justify-center text-apple-blue">
                <Icon className="w-4 h-4" />
              </div>
              <span className="font-mono text-xs font-bold text-apple-blue">
                CODE: {current.code}
              </span>
            </div>
            <span className="font-mono text-[10px] text-ash dark:text-white/60 bg-white/[0.06] px-2.5 py-0.5 rounded-full border border-rule/50 dark:border-white/[0.08]">
              TY2026 AUDIENCE
            </span>
          </div>

          <div className="font-urdu text-sm font-bold text-apple-blue" dir="rtl">
            {current.titleUr}
          </div>
          <p className="text-xs text-ash dark:text-white/60 leading-relaxed">
            {current.leadEn}
          </p>
          <div className="font-urdu text-xs text-ash dark:text-white/60 leading-relaxed" dir="rtl">
            {current.leadUr}
          </div>
        </GlassCard>

        {/* 3 Core Pillars */}
        <div className="space-y-2">
          <div className="font-mono text-xs font-bold uppercase tracking-wider text-ash dark:text-white/60">
            Key Provisions &amp; Tax Rights
          </div>
          <div className="space-y-2">
            {current.pillars.map((p, idx) => (
              <GlassCard
                key={idx}
                variant="subtle"
                className="p-3.5 space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-ink dark:text-white">{p.title}</span>
                  <span className="font-mono text-[9px] font-bold text-apple-blue px-2 py-0.5 rounded-full bg-apple-blue/10 border border-apple-blue/30">
                    {p.badge}
                  </span>
                </div>
                <p className="text-[11px] text-ash dark:text-white/60 leading-relaxed">
                  {p.desc}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Required Documents Checklist */}
        <GlassCard variant="default" className="p-4 space-y-2.5">
          <div className="flex items-center justify-between border-b border-rule/50 dark:border-white/[0.08] pb-2">
            <span className="font-serif text-sm font-bold text-ink dark:text-white">
              Required Documents Checklist
            </span>
            <span className="font-urdu text-xs text-apple-blue" dir="rtl">
              لازمی دستاویزات
            </span>
          </div>

          <ul className="space-y-2 text-xs text-ash dark:text-white/60 font-mono">
            {current.docs.map((doc, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-apple-blue shrink-0 mt-0.5" />
                <span className="leading-snug">{doc}</span>
              </li>
            ))}
          </ul>
        </GlassCard>

        {/* Security Stamp */}
        <GlassCard variant="subtle" className="p-3 flex items-center gap-2 text-xs">
          <ShieldCheck className="w-4 h-4 text-apple-blue shrink-0" />
          <span className="text-[11px] text-ash dark:text-white/60">
            Zero password sharing: We prepare numbers and guide you on official IRIS.
          </span>
        </GlassCard>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col gap-2.5">
          <GlassButton
            type="button"
            variant="primary"
            onClick={handleStartFiling}
            icon={<ArrowRight className="w-4 h-4" />}
            className="w-full"
          >
            Start Filing as {current.code} ({current.titleEn})
          </GlassButton>

          <a
            href={formatWhatsAppUrl(
              `Hi, I need assistance with Tax Year 2026 filing for ${current.titleEn} (${current.code}).`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-12 inline-flex items-center justify-center gap-2 rounded-full bg-white/80 dark:bg-[#1c1c1e]/75 hover:bg-[rgba(36,52,60,0.85)] border border-[#25D366]/40 text-[#25D366] font-bold text-xs backdrop-blur-xl shadow-sm active:scale-95 transition-all"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>Consult on WhatsApp ({SITE_CONFIG.contact.whatsappDisplay})</span>
          </a>
        </div>
      </div>
    </AppClipSheet>
  );
}
