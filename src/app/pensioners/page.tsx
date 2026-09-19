"use client";

import React from "react";
import Link from "next/link";
import { HeartHandshake, CheckCircle2, ShieldCheck } from "lucide-react";

export default function PensionersPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-16 space-y-10 pb-28">
      <div className="border-b-2 border-brass pb-4 space-y-2">
        <div className="flex items-center justify-between font-mono text-[11px] text-ash">
          <span>TAX CATEGORY: PEN</span>
          <span className="font-bold text-ink">TY2026 SCHEDULE</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-black text-ink">
          Senior Citizen & Pensioner Tax Facilitation
        </h1>
        <div className="font-urdu text-base font-bold text-ink" dir="rtl">
          پنشنرز اور بزرگ شہریوں کے لیے انکم ٹیکس ریٹرن فائلنگ
        </div>
        <p className="text-xs text-ash leading-relaxed max-w-2xl">
          Dedicated desk for retired government, armed forces, and corporate personnel. Ensure complete tax exemptions on pension receipts and National Savings profits.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-5 space-y-2">
          <span className="font-mono text-xs font-bold text-brass">EXEMPTION</span>
          <h2 className="font-bold text-sm text-ink">Pension Income Shield</h2>
          <p className="text-xs text-ash leading-relaxed">
            Proper declaration of monthly pension payments under statutory tax exemption clauses in the federal return.
          </p>
        </div>

        <div className="glass-card p-5 space-y-2">
          <span className="font-mono text-xs font-bold text-brass">BEHBOOD / NSS</span>
          <h2 className="font-bold text-sm text-ink">National Savings Profit</h2>
          <p className="text-xs text-ash leading-relaxed">
            Record Behbood Savings Certificates, Pensioner Benefit Accounts, and regular defense savings schemes accurately.
          </p>
        </div>

        <div className="glass-card p-5 space-y-2">
          <span className="font-mono text-xs font-bold text-brass">RECOVERY</span>
          <h2 className="font-bold text-sm text-ink">Withholding Tax Claim</h2>
          <p className="text-xs text-ash leading-relaxed">
            Claim back unjustified withholding deductions on cash withdrawals or utility bills to minimize net tax liability.
          </p>
        </div>
      </div>

      <div className="glass-card p-6 space-y-4 border-rule">
        <div className="border-b border-rule-light pb-2 flex items-center justify-between">
          <h3 className="font-serif text-base font-bold text-ink">Required Evidence Checklist (PEN)</h3>
          <span className="font-mono text-[10px] text-ash">SENIOR DESK</span>
        </div>

        <ul className="space-y-2 text-xs text-ash font-mono">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-iris-teal shrink-0 mt-0.5" />
            <span>Pension book or pension bank account statement for July 2025 – June 2026</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-iris-teal shrink-0 mt-0.5" />
            <span>National Savings profit slips or Behbood profit deduction records</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-iris-teal shrink-0 mt-0.5" />
            <span>Bank statements showing any profit on debt and tax deducted</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-iris-teal shrink-0 mt-0.5" />
            <span>List of immovable properties, cash in hand, and personal assets</span>
          </li>
        </ul>
      </div>

      <div className="bg-ink text-paper-light border-2 border-brass p-6 rounded-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <span className="font-mono text-xs text-brass font-bold">PROCEED TO INTAKE</span>
          <div className="font-serif text-lg font-bold">
            Continue with pre-selected Pensioner category
          </div>
          <p className="text-xs text-ash-light">
            Skip category selection and proceed straight to IRIS status and packages.
          </p>
        </div>

        <Link
          href="/start?cat=PEN"
          className="inline-flex items-center gap-2 bg-brass hover:bg-brass-light text-ink font-mono font-bold text-xs py-3 px-6 rounded shadow transition-all shrink-0"
        >
          <span>Continue as Pensioner →</span>
        </Link>
      </div>
    </div>
  );
}
