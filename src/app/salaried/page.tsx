"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PersonaClip from "@/components/clips/PersonaClip";
import { Briefcase, ArrowRight, CheckCircle2, ShieldCheck, Lock, ExternalLink, Sparkles } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/icons/whatsapp-icon";
import { formatWhatsAppUrl } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/config";

export default function SalariedPage() {
  const router = useRouter();

  const content = (
    <div className="space-y-6">
      {/* 3 Value Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-5 rounded-2xl space-y-2">
          <span className="font-mono text-[13px] font-semibold text-apple-blue">
            s.149
          </span>
          <h3 className="font-bold text-sm text-ink pt-1">Employer Tax Reconciliation</h3>
          <p className="text-xs text-ash leading-relaxed">
            Reconcile your annual salary certificate against the official federal tax slabs to prevent duplicate taxation or unjustified tax demands.
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl space-y-2">
          <span className="font-mono text-[13px] font-semibold text-apple-blue">
            s.235 / s.236
          </span>
          <h3 className="font-bold text-sm text-ink pt-1">Adjustable Tax Credits</h3>
          <p className="text-xs text-ash leading-relaxed">
            Claim tax deductions on your mobile phone bills, home electricity meter bills, vehicle token taxes, and banking transactions.
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl space-y-2">
          <span className="font-mono text-[13px] font-semibold text-apple-blue">
            s.116
          </span>
          <h3 className="font-bold text-sm text-ink pt-1">Wealth Statement Balance</h3>
          <p className="text-xs text-ash leading-relaxed">
            Zero-gap reconciliation of household expenses, bank balances, and investments, ensuring your wealth statement reconciles to 0.00.
          </p>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="p-4 pb-2">
          <h3 className="font-semibold text-[17px] text-ink">Salary slabs TY2026–27</h3>
          <p className="text-[13px] text-ash">0% on the first PKR 600,000. Progressive after that.</p>
        </div>
        <table className="w-full text-[13px]">
          <thead>
            <tr className="text-ash text-left">
              <th className="px-4 py-2 font-semibold">Annual salary</th>
              <th className="px-4 py-2 font-semibold">Rate</th>
            </tr>
          </thead>
          <tbody className="text-ink">
            <tr className="border-t border-black/[0.04] dark:border-white/[0.06]"><td className="px-4 py-2">Up to 600,000</td><td className="px-4 py-2">0%</td></tr>
            <tr className="border-t border-black/[0.04] dark:border-white/[0.06]"><td className="px-4 py-2">600,001 – 1,200,000</td><td className="px-4 py-2">1% of excess</td></tr>
            <tr className="border-t border-black/[0.04] dark:border-white/[0.06]"><td className="px-4 py-2">1,200,001 – 2,200,000</td><td className="px-4 py-2">6,000 + 11%</td></tr>
            <tr className="border-t border-black/[0.04] dark:border-white/[0.06]"><td className="px-4 py-2">Above 7,000,000</td><td className="px-4 py-2">1,424,000 + 35%</td></tr>
          </tbody>
        </table>
      </div>

      <div className="glass-card p-6 sm:p-7 rounded-3xl space-y-4">
        <div className="border-b border-rule-light pb-3 flex items-center justify-between">
          <h3 className="text-[17px] font-semibold text-ink">Papers we need (s.149)</h3>
          <span className="font-mono text-[10px] text-brass font-bold uppercase tracking-wider">TY2026 EVIDENCE</span>
        </div>

        <ul className="space-y-3 text-xs text-ash font-mono">
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-iris-teal shrink-0 mt-0.5" />
            <span className="leading-relaxed">Annual Salary Certificate / 12 months salary slips (July 2025 to June 2026)</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-iris-teal shrink-0 mt-0.5" />
            <span className="leading-relaxed">Tax deduction certificate under Section 149 from your employer HR / Accounts</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-iris-teal shrink-0 mt-0.5" />
            <span className="leading-relaxed">All bank account statements for the tax year with profit on debt details</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-iris-teal shrink-0 mt-0.5" />
            <span className="leading-relaxed">Annual withholding tax statements from mobile telecom provider (Jazz/Telenor/Zong/Ufone)</span>
          </li>
        </ul>
      </div>

      {/* Forward Action Banner */}
      <div className="bg-ink text-paper-light border-2 border-brass p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1.5 text-center sm:text-left">
          <span className="font-mono text-xs text-brass font-bold uppercase tracking-wider">READY TO COMMENCE?</span>
          <div className="font-serif text-xl sm:text-2xl font-bold">
            Continue with Salaried category
          </div>
          <p className="text-xs sm:text-sm text-ash-light leading-relaxed">
            Skip category selection and proceed straight to IRIS status and packages.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
          <Link
            href="/start?cat=SAL"
            className="inline-flex items-center justify-center gap-2 bg-brass hover:bg-brass-light text-ink font-mono font-bold text-xs py-3.5 px-6 rounded-full shadow transition-all active:scale-95"
          >
            <span>Start Salaried Filing</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href={formatWhatsAppUrl("Hi, I want to file as a Salaried individual.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 bg-folio/20 hover:bg-folio/30 border border-brass/40 text-paper-light font-mono font-bold text-xs py-3.5 px-5 rounded-full transition-all active:scale-95"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
            <span>WhatsApp Desk</span>
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* 1. MOBILE VIEWPORT (md:hidden): Purpose-Built Mobile AppClip */}
      <div className="block md:hidden">
        <PersonaClip persona="salaried" onClose={() => router.push("/")} />
      </div>

      {/* 2. DESKTOP VIEWPORT (hidden md:block): Two-Column Layout */}
      <div className="hidden md:block max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16 pb-32">
        <div className="grid grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Sticky Context */}
          <div className="col-span-5 lg:col-span-4 sticky top-24 space-y-6">
            <div className="space-y-3">
              <div>
                <span className="inline-block font-mono text-[12px] text-apple-blue font-semibold tracking-wide glass-pill px-3 py-1">
                  s.12 / s.149 · TY2026
                </span>
              </div>

              <h1 className="text-title">
                Salaried return
              </h1>

              <div className="font-urdu text-base font-bold text-apple-blue" dir="rtl">
                تنخواہ دار ملازمین کے لیے انکم ٹیکس گوشوارہ و ودہولڈنگ ٹیکس ریفنڈ
              </div>

              <p className="text-body">
                Employer withholds under s.149. You still file Form 114(1) and Form 116. First Rs 600,000 of salary is 0%.
              </p>
            </div>

            {/* Zero-Credential Invariant Card */}
            <div className="glass-card p-5 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-apple-blue">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Zero-Credential Invariant</span>
              </div>
              <p className="text-xs text-ash leading-relaxed">
                We never store or ask for your FBR IRIS password. You inspect the figures and submit directly.
              </p>
            </div>

            {/* WhatsApp Desk */}
            <div className="glass-card p-5 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink">
                  Salaried Desk Online
                </span>
              </div>
              <a
                href={formatWhatsAppUrl("Hi, I am a salaried individual looking to file taxes.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-full bg-[#25D366] hover:bg-[#1ebd59] text-white font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>WhatsApp Desk ({SITE_CONFIG.contact.whatsappDisplay})</span>
              </a>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-span-7 lg:col-span-8">
            {content}
          </div>
        </div>
      </div>
    </>
  );
}
