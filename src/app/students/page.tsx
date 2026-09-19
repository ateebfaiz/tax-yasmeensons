"use client";

import React from "react";
import Link from "next/link";
import { useAppClip } from "@/components/ui/app-clip/AppClipProvider";
import { GraduationCap, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

export default function StudentsPage() {
  const appClip = useAppClip();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-16 space-y-10 pb-28">
      <div className="border-b-2 border-brass pb-4 space-y-2">
        <div className="flex items-center justify-between font-mono text-[11px] text-ash">
          <span>TAX CATEGORY: STU</span>
          <span className="font-bold text-ink">TY2026 SCHEDULE</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-black text-ink">
          Student Filer Facilitation
        </h1>
        <div className="font-urdu text-base font-bold text-ink" dir="rtl">
          طلباء و یوتھ کے لیے ٹیکس فائلنگ و ایکٹو فائلر رجسٹریشن
        </div>
        <p className="text-xs text-ash leading-relaxed max-w-2xl">
          Get on the Active Taxpayer List (ATL) to avoid advance withholding taxes on university tuition fees and international certification payments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="glass-card p-6 rounded-[24px] space-y-2 shadow-xs">
          <span className="font-mono text-xs font-bold text-brass px-2 py-0.5 rounded-full bg-brass-subtle">s.236I RELIEF</span>
          <h2 className="font-bold text-sm text-ink pt-1">University Fee Savings</h2>
          <p className="text-xs text-ash leading-relaxed">
            Eliminate non-filer advance withholding tax levied on university semester fees and college charges.
          </p>
        </div>

        <div className="glass-card p-6 rounded-[24px] space-y-2 shadow-xs">
          <span className="font-mono text-xs font-bold text-brass px-2 py-0.5 rounded-full bg-brass-subtle">BANKING</span>
          <h2 className="font-bold text-sm text-ink pt-1">Unrestricted Accounts</h2>
          <p className="text-xs text-ash leading-relaxed">
            Open student or freelancer banking accounts with full digital banking and debit cards without tax penalties.
          </p>
        </div>

        <div className="glass-card p-6 rounded-[24px] space-y-2 shadow-xs">
          <span className="font-mono text-xs font-bold text-brass px-2 py-0.5 rounded-full bg-brass-subtle">RATES</span>
          <h2 className="font-bold text-sm text-ink pt-1">Budget-Friendly Intake</h2>
          <p className="text-xs text-ash leading-relaxed">
            Guided self-filing starting at PKR 1,000 with complete explanation of basic tax principles.
          </p>
        </div>
      </div>

      <div className="glass-card p-6 sm:p-8 rounded-[28px] space-y-4 border-rule/80 shadow-sm">
        <div className="border-b border-rule-light pb-2 flex items-center justify-between">
          <h3 className="font-serif text-base font-bold text-ink">Required Evidence Checklist (STU)</h3>
          <span className="font-mono text-[10px] text-ash">STUDENT DESK</span>
        </div>

        <ul className="space-y-2.5 text-xs text-ash font-mono">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-iris-teal shrink-0 mt-0.5" />
            <span>Valid CNIC and Student ID card copy</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-iris-teal shrink-0 mt-0.5" />
            <span>Active mobile SIM registered in student's own CNIC</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-iris-teal shrink-0 mt-0.5" />
            <span>University fee payment receipts showing any advance tax deduction (s.236I)</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-iris-teal shrink-0 mt-0.5" />
            <span>Student bank account statement for the tax year</span>
          </li>
        </ul>
      </div>

      <div className="bg-ink text-paper-light border-2 border-brass p-8 rounded-[30px] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1 text-center sm:text-left">
          <span className="font-mono text-xs text-brass font-bold uppercase tracking-wider">PROCEED TO INTAKE</span>
          <div className="font-serif text-xl font-bold">
            Continue with pre-selected Student category
          </div>
          <p className="text-xs text-ash-light leading-relaxed">
            Skip category selection and proceed straight to IRIS status and packages.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <button
            type="button"
            onClick={() => appClip.open("tax-intake", { defaultPersona: "STU" })}
            className="inline-flex items-center justify-center gap-1.5 bg-brass hover:bg-brass-light text-ink font-mono font-bold text-xs py-3.5 px-6 rounded-full shadow transition-all active:scale-95"
          >
            <span>Fast AppClip (STU)</span>
            <Sparkles className="w-3.5 h-3.5" />
          </button>
          <Link
            href="/start?cat=STU"
            className="inline-flex items-center justify-center gap-1.5 bg-folio/10 hover:bg-folio/20 border border-brass/40 text-paper-light font-mono font-bold text-xs py-3.5 px-5 rounded-full transition-all active:scale-95"
          >
            <span>Full Form →</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

