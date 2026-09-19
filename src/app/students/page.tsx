"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PersonaClip from "@/components/clips/PersonaClip";
import { GraduationCap, CheckCircle2, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/icons/whatsapp-icon";

export default function StudentsPage() {
  const router = useRouter();

  const content = (
    <div className="space-y-6">
      {/* 3 Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-5 rounded-2xl space-y-2 border-rule shadow-xs">
          <span className="font-mono text-xs font-bold text-brass px-2.5 py-0.5 rounded-full bg-brass/10 border border-brass/20">
            s.236I RELIEF
          </span>
          <h3 className="font-bold text-sm text-ink pt-1">University Fee Savings</h3>
          <p className="text-xs text-ash leading-relaxed">
            Eliminate non-filer advance withholding tax levied on university semester fees and college charges.
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl space-y-2 border-rule shadow-xs">
          <span className="font-mono text-xs font-bold text-brass px-2.5 py-0.5 rounded-full bg-brass/10 border border-brass/20">
            BANKING
          </span>
          <h3 className="font-bold text-sm text-ink pt-1">Unrestricted Accounts</h3>
          <p className="text-xs text-ash leading-relaxed">
            Open student or freelancer banking accounts with full digital banking and debit cards without tax penalties.
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl space-y-2 border-rule shadow-xs">
          <span className="font-mono text-xs font-bold text-brass px-2.5 py-0.5 rounded-full bg-brass/10 border border-brass/20">
            RATES
          </span>
          <h3 className="font-bold text-sm text-ink pt-1">Budget-Friendly Intake</h3>
          <p className="text-xs text-ash leading-relaxed">
            Guided self-filing starting at PKR 1,000 with complete explanation of basic tax principles.
          </p>
        </div>
      </div>

      {/* Checklist Card */}
      <div className="glass-card p-6 sm:p-7 rounded-3xl space-y-4 border-rule shadow-sm">
        <div className="border-b border-rule-light pb-3 flex items-center justify-between">
          <h3 className="font-serif text-lg font-bold text-ink">Required Evidence Checklist (STU)</h3>
          <span className="font-mono text-[10px] text-brass font-bold uppercase tracking-wider">STUDENT DESK</span>
        </div>

        <ul className="space-y-3 text-xs text-ash font-mono">
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-iris-teal shrink-0 mt-0.5" />
            <span className="leading-relaxed">Valid CNIC and Student ID card copy</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-iris-teal shrink-0 mt-0.5" />
            <span className="leading-relaxed">Active mobile SIM registered in student&apos;s own CNIC</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-iris-teal shrink-0 mt-0.5" />
            <span className="leading-relaxed">University fee payment receipts showing any advance tax deduction (s.236I)</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-iris-teal shrink-0 mt-0.5" />
            <span className="leading-relaxed">Student bank account statement for the tax year</span>
          </li>
        </ul>
      </div>

      {/* Forward Action Banner */}
      <div className="bg-ink text-paper-light border-2 border-brass p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1.5 text-center sm:text-left">
          <span className="font-mono text-xs text-brass font-bold uppercase tracking-wider">PROCEED TO INTAKE</span>
          <div className="font-serif text-xl sm:text-2xl font-bold">
            Continue with Student category
          </div>
          <p className="text-xs sm:text-sm text-ash-light leading-relaxed">
            Skip category selection and proceed straight to IRIS status and packages.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
          <Link
            href="/start?cat=STU"
            className="inline-flex items-center justify-center gap-2 bg-brass hover:bg-brass-light text-ink font-mono font-bold text-xs py-3.5 px-6 rounded-full shadow transition-all active:scale-95"
          >
            <span>Start Student Filing</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="https://wa.me/923120947187?text=Hi%2C%20I%20want%20to%20file%20as%20a%20Student%20or%20Freelancer."
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
        <PersonaClip persona="student" onClose={() => router.push("/")} />
      </div>

      {/* 2. DESKTOP VIEWPORT (hidden md:block): Two-Column Layout */}
      <div className="hidden md:block max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16 pb-32">
        <div className="grid grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Sticky Context */}
          <div className="col-span-5 lg:col-span-4 sticky top-24 space-y-6">
            <div className="space-y-3">
              <div>
                <span className="inline-block font-mono text-[11px] text-brass font-bold tracking-widest uppercase bg-brass/10 border border-brass/30 px-3 py-1 rounded-full">
                  TAX CATEGORY: STU · TY2026
                </span>
              </div>

              <h1 className="font-serif text-3xl lg:text-4xl font-black text-ink leading-tight">
                Student Filer Facilitation
              </h1>

              <div className="font-urdu text-base font-bold text-[#128C7E] dark:text-[#C4A046]" dir="rtl">
                طلباء و یوتھ کے لیے ٹیکس فائلنگ و ایکٹو فائلر رجسٹریشن
              </div>

              <p className="text-sm text-ash leading-relaxed">
                Get on the Active Taxpayer List (ATL) to avoid advance withholding taxes on university tuition fees and international certification payments.
              </p>
            </div>

            {/* Zero-Credential Invariant Card */}
            <div className="p-5 rounded-2xl bg-paper-light border border-rule space-y-2.5 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-[#128C7E] dark:text-[#C4A046]">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Zero-Credential Invariant</span>
              </div>
              <p className="text-xs text-ash leading-relaxed">
                We never store or ask for your FBR IRIS password. All filings are submitted under your own authenticated session.
              </p>
            </div>

            {/* WhatsApp Desk */}
            <div className="p-5 rounded-2xl bg-folio border border-rule space-y-3 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink">
                  Youth &amp; Student Desk Online
                </span>
              </div>
              <a
                href="https://wa.me/923120947187?text=Hi%2C%20I%20am%20a%20student%20inquiring%20about%20tax%20filing."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-full bg-[#25D366] hover:bg-[#1ebd59] text-white font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>WhatsApp Desk (0312 0947187)</span>
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
