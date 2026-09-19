"use client";

import React from "react";
import Link from "next/link";
import { useAppClip } from "@/components/ui/app-clip/AppClipProvider";
import { Users, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

export default function NoIncomePage() {
  const appClip = useAppClip();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-16 space-y-10 pb-28">
      <div className="border-b-2 border-brass pb-4 space-y-2">
        <div className="flex items-center justify-between font-mono text-[11px] text-ash">
          <span>TAX CATEGORY: HIF</span>
          <span className="font-bold text-ink">TY2026 SCHEDULE</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-black text-ink">
          Housewife & Non-Earning Filer Status
        </h1>
        <div className="font-urdu text-base font-bold text-ink" dir="rtl">
          گھریلو خواتین اور بغیر آمدنی افراد کے لیے ایکٹو فائلر رجسٹریشن
        </div>
        <p className="text-xs text-ash leading-relaxed max-w-2xl">
          Obtain and protect your Active Taxpayer List (ATL) status legally without commercial income. Safeguard banking transactions and family asset holdings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="glass-card p-6 rounded-[24px] space-y-2 shadow-xs">
          <span className="font-mono text-xs font-bold text-brass px-2 py-0.5 rounded-full bg-brass-subtle">ATL ADVANTAGE</span>
          <h2 className="font-bold text-sm text-ink pt-1">Halve Withholding Taxes</h2>
          <p className="text-xs text-ash leading-relaxed">
            Avoid double withholding rates on cash withdrawals above Rs 50,000, prize bonds, and utility bills.
          </p>
        </div>

        <div className="glass-card p-6 rounded-[24px] space-y-2 shadow-xs">
          <span className="font-mono text-xs font-bold text-brass px-2 py-0.5 rounded-full bg-brass-subtle">LEGAL SOURCE</span>
          <h2 className="font-bold text-sm text-ink pt-1">Spouse / Family Source</h2>
          <p className="text-xs text-ash leading-relaxed">
            Record household expenses under legitimate family maintenance funds provided by earning household members.
          </p>
        </div>

        <div className="glass-card p-6 rounded-[24px] space-y-2 shadow-xs">
          <span className="font-mono text-xs font-bold text-brass px-2 py-0.5 rounded-full bg-brass-subtle">ASSET SHIELD</span>
          <h2 className="font-bold text-sm text-ink pt-1">Inheritance & Gifts</h2>
          <p className="text-xs text-ash leading-relaxed">
            Properly document inherited family property, jewelry, or cash gifts in wealth statement section 116.
          </p>
        </div>
      </div>

      <div className="glass-card p-6 sm:p-8 rounded-[28px] space-y-4 border-rule/80 shadow-sm">
        <div className="border-b border-rule-light pb-2 flex items-center justify-between">
          <h3 className="font-serif text-base font-bold text-ink">Required Evidence Checklist (HIF)</h3>
          <span className="font-mono text-[10px] text-ash">NON-EARNING DESK</span>
        </div>

        <ul className="space-y-2.5 text-xs text-ash font-mono">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-iris-teal shrink-0 mt-0.5" />
            <span>Valid CNIC copy (front and back)</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-iris-teal shrink-0 mt-0.5" />
            <span>Active mobile SIM registered on applicant's own CNIC</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-iris-teal shrink-0 mt-0.5" />
            <span>Active bank account statement (even with nominal balance or maintenance transactions)</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-iris-teal shrink-0 mt-0.5" />
            <span>Details of any property, gold, or assets owned in applicant's name</span>
          </li>
        </ul>
      </div>

      <div className="bg-ink text-paper-light border-2 border-brass p-8 rounded-[30px] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1 text-center sm:text-left">
          <span className="font-mono text-xs text-brass font-bold uppercase tracking-wider">PROCEED TO INTAKE</span>
          <div className="font-serif text-xl font-bold">
            Continue with pre-selected Housewife / Non-Earning
          </div>
          <p className="text-xs text-ash-light leading-relaxed">
            Skip category selection and proceed straight to IRIS status and packages.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <button
            type="button"
            onClick={() => appClip.open("tax-intake", { defaultPersona: "HIF" })}
            className="inline-flex items-center justify-center gap-1.5 bg-brass hover:bg-brass-light text-ink font-mono font-bold text-xs py-3.5 px-6 rounded-full shadow transition-all active:scale-95"
          >
            <span>Fast AppClip (HIF)</span>
            <Sparkles className="w-3.5 h-3.5" />
          </button>
          <Link
            href="/start?cat=HIF"
            className="inline-flex items-center justify-center gap-1.5 bg-folio/10 hover:bg-folio/20 border border-brass/40 text-paper-light font-mono font-bold text-xs py-3.5 px-5 rounded-full transition-all active:scale-95"
          >
            <span>Full Form →</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

