"use client";

import React from "react";
import Link from "next/link";
import { Briefcase, ArrowRight, CheckCircle2, ShieldCheck, FileText } from "lucide-react";

export default function SalariedPage() {
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-5 space-y-2">
          <span className="font-mono text-xs font-bold text-brass">s.149 AUDIT</span>
          <h2 className="font-bold text-sm text-ink">Employer Tax Reconciliation</h2>
          <p className="text-xs text-ash leading-relaxed">
            Reconcile your annual salary certificate against the official federal tax slabs to prevent duplicate taxation or unjustified tax demands.
          </p>
        </div>

        <div className="glass-card p-5 space-y-2">
          <span className="font-mono text-xs font-bold text-brass">s.235 / s.236 WHT</span>
          <h2 className="font-bold text-sm text-ink">Adjustable Tax Credits</h2>
          <p className="text-xs text-ash leading-relaxed">
            Claim tax deductions on your mobile phone bills, home electricity meter bills, vehicle token taxes, and banking transactions.
          </p>
        </div>

        <div className="glass-card p-5 space-y-2">
          <span className="font-mono text-xs font-bold text-brass">s.116 WEALTH</span>
          <h2 className="font-bold text-sm text-ink">Wealth Statement Balance</h2>
          <p className="text-xs text-ash leading-relaxed">
            Zero-gap reconciliation of household expenses, bank balances, and investments, ensuring your wealth statement reconciles to 0.00.
          </p>
        </div>
      </div>

      {/* Requirements Checklist Card */}
      <div className="glass-card p-6 space-y-4 border-rule">
        <div className="border-b border-rule-light pb-2 flex items-center justify-between">
          <h3 className="font-serif text-base font-bold text-ink">Required Evidence Checklist (SAL)</h3>
          <span className="font-mono text-[10px] text-ash">PREPARE BEFORE FILING</span>
        </div>

        <ul className="space-y-2 text-xs text-ash font-mono">
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
      <div className="bg-ink text-paper-light border-2 border-brass p-6 rounded-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <span className="font-mono text-xs text-brass font-bold">READY TO COMMENCE INTAKE?</span>
          <div className="font-serif text-lg font-bold">
            Continue with pre-selected Salaried category
          </div>
          <p className="text-xs text-ash-light">
            Skip category selection and proceed straight to IRIS status and packages.
          </p>
        </div>

        <Link
          href="/start?cat=SAL"
          className="inline-flex items-center gap-2 bg-brass hover:bg-brass-light text-ink font-mono font-bold text-xs py-3 px-6 rounded shadow transition-all shrink-0"
        >
          <span>Continue as Salaried →</span>
        </Link>
      </div>
    </div>
  );
}
