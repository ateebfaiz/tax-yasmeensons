"use client";

import React from "react";
import Link from "next/link";
import { useAppClip } from "@/components/ui/app-clip/AppClipProvider";
import { Briefcase, ArrowRight, CheckCircle2, ShieldCheck, FileText, Sparkles } from "lucide-react";

export default function SalariedPage() {
  const appClip = useAppClip();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-16 space-y-10 pb-28">
      {/* Header */}
      <div className="border-b-2 border-brass pb-4 space-y-2">
        <div className="flex items-center justify-between font-mono text-[11px] text-ash">
          <span>TAX CATEGORY: SAL</span>
          <span className="font-bold text-ink">TY2026 SCHEDULE</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-black text-ink">
          Salaried Individual Return Facilitation
        </h1>
        <div className="font-urdu text-base font-bold text-ink" dir="rtl">
          تنخواہ دار ملازمین کے لیے انکم ٹیکس گوشوارہ و ودہولڈنگ ٹیکس ریفنڈ
        </div>
        <p className="text-xs text-ash leading-relaxed max-w-2xl">
          Designed specifically for corporate, private, and institutional employees paying monthly income tax under Section 149 of the Income Tax Ordinance.
        </p>
      </div>

      {/* 3 Value Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="glass-card p-6 rounded-[24px] space-y-2 shadow-xs">
          <span className="font-mono text-xs font-bold text-brass px-2 py-0.5 rounded-full bg-brass-subtle">s.149 AUDIT</span>
          <h2 className="font-bold text-sm text-ink pt-1">Employer Tax Reconciliation</h2>
          <p className="text-xs text-ash leading-relaxed">
            Reconcile your annual salary certificate against the official federal tax slabs to prevent duplicate taxation or unjustified tax demands.
          </p>
        </div>

        <div className="glass-card p-6 rounded-[24px] space-y-2 shadow-xs">
          <span className="font-mono text-xs font-bold text-brass px-2 py-0.5 rounded-full bg-brass-subtle">s.235 / s.236 WHT</span>
          <h2 className="font-bold text-sm text-ink pt-1">Adjustable Tax Credits</h2>
          <p className="text-xs text-ash leading-relaxed">
            Claim tax deductions on your mobile phone bills, home electricity meter bills, vehicle token taxes, and banking transactions.
          </p>
        </div>

        <div className="glass-card p-6 rounded-[24px] space-y-2 shadow-xs">
          <span className="font-mono text-xs font-bold text-brass px-2 py-0.5 rounded-full bg-brass-subtle">s.116 WEALTH</span>
          <h2 className="font-bold text-sm text-ink pt-1">Wealth Statement Balance</h2>
          <p className="text-xs text-ash leading-relaxed">
            Zero-gap reconciliation of household expenses, bank balances, and investments, ensuring your wealth statement reconciles to 0.00.
          </p>
        </div>
      </div>

      {/* Requirements Checklist Card */}
      <div className="glass-card p-6 sm:p-8 rounded-[28px] space-y-4 border-rule/80 shadow-sm">
        <div className="border-b border-rule-light pb-2 flex items-center justify-between">
          <h3 className="font-serif text-base font-bold text-ink">Required Evidence Checklist (SAL)</h3>
          <span className="font-mono text-[10px] text-ash">PREPARE BEFORE FILING</span>
        </div>

        <ul className="space-y-2.5 text-xs text-ash font-mono">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-iris-teal shrink-0 mt-0.5" />
            <span>Annual Salary Certificate / 12 months salary slips (July 2025 to June 2026)</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-iris-teal shrink-0 mt-0.5" />
            <span>Tax deduction certificate under Section 149 from your employer HR / Accounts</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-iris-teal shrink-0 mt-0.5" />
            <span>All bank account statements for the tax year with profit on debt details</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-iris-teal shrink-0 mt-0.5" />
            <span>Annual withholding tax statements from mobile telecom provider (Jazz/Telenor/Zong/Ufone)</span>
          </li>
        </ul>
      </div>

      {/* Forward Action Banner */}
      <div className="bg-ink text-paper-light border-2 border-brass p-8 rounded-[30px] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1 text-center sm:text-left">
          <span className="font-mono text-xs text-brass font-bold uppercase tracking-wider">READY TO COMMENCE INTAKE?</span>
          <div className="font-serif text-xl font-bold">
            Continue with pre-selected Salaried category
          </div>
          <p className="text-xs text-ash-light leading-relaxed">
            Skip category selection and proceed straight to IRIS status and packages.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <button
            type="button"
            onClick={() => appClip.open("tax-intake", { defaultPersona: "SAL" })}
            className="inline-flex items-center justify-center gap-1.5 bg-brass hover:bg-brass-light text-ink font-mono font-bold text-xs py-3.5 px-6 rounded-full shadow transition-all active:scale-95"
          >
            <span>Fast AppClip (SAL)</span>
            <Sparkles className="w-3.5 h-3.5" />
          </button>
          <Link
            href="/start?cat=SAL"
            className="inline-flex items-center justify-center gap-1.5 bg-folio/10 hover:bg-folio/20 border border-brass/40 text-paper-light font-mono font-bold text-xs py-3.5 px-5 rounded-full transition-all active:scale-95"
          >
            <span>Full Form →</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

