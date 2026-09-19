"use client";

import React from "react";
import Link from "next/link";
import { useAppClip } from "@/components/ui/app-clip/AppClipProvider";
import { CheckCircle2, ShieldCheck, ArrowRight, AlertCircle, Sparkles } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/icons/whatsapp-icon";

export default function PricingPage() {
  const appClip = useAppClip();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-16 space-y-12 pb-28">
      {/* Header */}
      <div className="border-b-2 border-brass pb-4 space-y-2 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-between font-mono text-[11px] text-ash">
          <span>SCHEDULE 03</span>
          <span className="font-bold text-ink">TY2026 FEE SCHEDULE</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-black text-ink">
          Transparent Fee Schedule
        </h1>
        <div className="font-urdu text-base font-bold text-ink" dir="rtl">
          شفاف فیس و پیکیجز • کوئی پوشیدہ چارجز نہیں
        </div>
        <p className="text-xs text-ash leading-relaxed max-w-xl mx-auto md:mx-0">
          Senior tax practice pricing for non-business individuals. The applicable fee is confirmed upfront before filing commences.
        </p>
      </div>

      {/* 3 Packages */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tier 1 */}
        <div className="glass-card p-6 sm:p-7 rounded-[28px] flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md transition-all">
          <div className="space-y-4">
            <div className="border-b border-rule pb-3">
              <span className="font-mono text-[10px] font-bold text-ash tracking-widest uppercase">
                PACKAGE: GF-1000
              </span>
              <h2 className="font-serif text-xl font-bold text-ink">Guided Filing</h2>
              <div className="font-urdu text-xs text-ash" dir="rtl">رہنمائی مع سیلف فائلنگ</div>
            </div>
            <div className="font-serif text-3xl font-black text-ink">
              PKR 1,000
            </div>
            <p className="text-xs text-ash leading-relaxed">
              We audit your documents, calculate your taxable income and withholding deductions, and provide a field-by-field checklist. You sign into IRIS and submit independently.
            </p>
            <ul className="space-y-2 text-xs text-ash font-mono pt-2 border-t border-rule-light">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-iris-teal shrink-0" />
                <span>Zero password sharing required</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-iris-teal shrink-0" />
                <span>Salary & WHT credit calculation</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-iris-teal shrink-0" />
                <span>Field-by-field IRIS guide</span>
              </li>
            </ul>
          </div>

          <div className="space-y-2 pt-2">
            <button
              type="button"
              onClick={() => appClip.open("tax-intake", { defaultTier: "guided_1000" })}
              className="w-full py-3 text-center rounded-full bg-paper-light hover:bg-paper border border-rule font-mono font-bold text-xs text-ink transition-all active:scale-95 shadow-sm"
            >
              Select GF-1000 (AppClip)
            </button>
            <Link
              href="/start?tier=guided_1000"
              className="block text-center text-[11px] font-mono text-ash hover:text-ink underline"
            >
              Or open full web wizard →
            </Link>
          </div>
        </div>

        {/* Tier 2: Recommended */}
        <div className="glass-card-featured p-6 sm:p-7 rounded-[30px] flex flex-col justify-between space-y-6 relative shadow-lg">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-brass text-ink font-mono text-[10px] font-bold uppercase tracking-wider shadow-sm">
            Most Selected · تجویز کردہ
          </div>
          <div className="space-y-4">
            <div className="border-b border-rule pb-3">
              <span className="font-mono text-[10px] font-bold text-brass tracking-widest uppercase">
                PACKAGE: FA-2500
              </span>
              <h2 className="font-serif text-xl font-bold text-ink">Complete Assistance</h2>
              <div className="font-urdu text-xs text-ash" dir="rtl">مکمل فائلنگ اسسٹنس</div>
            </div>
            <div className="font-serif text-3xl font-black text-ink">
              PKR 2,500
            </div>
            <p className="text-xs text-ash leading-relaxed">
              Full-service facilitation. We reconcile your return, wealth statement (s.116), and WHT deductions, guide you through official IRIS screens, and confirm ATL status.
            </p>
            <ul className="space-y-2 text-xs text-ash font-mono pt-2 border-t border-rule-light">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-iris-teal shrink-0" />
                <span>Complete return & s.116 wealth balance</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-iris-teal shrink-0" />
                <span>Screen-by-screen assistance on official IRIS</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-iris-teal shrink-0" />
                <span>Mandatory client pre-approval summary</span>
              </li>
            </ul>
          </div>

          <div className="space-y-2 pt-2">
            <button
              type="button"
              onClick={() => appClip.open("tax-intake", { defaultTier: "assistance_2500" })}
              className="w-full py-3.5 text-center rounded-full bg-ink hover:bg-theme-primary-hover font-mono font-bold text-xs text-paper-light shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              Select FA-2500 (Fast AppClip)
            </button>
            <Link
              href="/start?tier=assistance_2500"
              className="block text-center text-[11px] font-mono text-ash hover:text-ink underline"
            >
              Or open full web wizard →
            </Link>
          </div>
        </div>

        {/* Tier 3: Complex */}
        <div className="glass-card p-6 sm:p-7 rounded-[28px] flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md transition-all">
          <div className="space-y-4">
            <div className="border-b border-rule pb-3">
              <span className="font-mono text-[10px] font-bold text-ash tracking-widest uppercase">
                PACKAGE: CX-4500
              </span>
              <h2 className="font-serif text-xl font-bold text-ink">Complex Review</h2>
              <div className="font-urdu text-xs text-ash" dir="rtl">پیچیدہ ریٹرن جائزہ</div>
            </div>
            <div className="font-serif text-3xl font-black text-ink">
              PKR 4,500+
            </div>
            <p className="text-xs text-ash leading-relaxed">
              For complex personal situations. <em>Final fee confirmed strictly after document review.</em>
            </p>
            <div className="space-y-1.5 p-3 rounded-2xl bg-paper-light border border-rule-light text-xs font-mono text-ash">
              <div className="font-bold text-ink uppercase text-[10px]">What pushes into CX-4500:</div>
              <div>• Unfiled prior tax years wealth reconstruction</div>
              <div>• Section 111 asset transactions / property deeds</div>
              <div>• Multiple high-turnover bank accounts</div>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <button
              type="button"
              onClick={() => appClip.open("whatsapp-intake", { defaultTier: "complex_5000" })}
              className="w-full py-3 text-center rounded-full border border-rule bg-paper-light hover:bg-paper font-mono font-bold text-xs text-ink transition-all active:scale-95 shadow-sm"
            >
              Consult CX-4500 (WhatsApp)
            </button>
            <Link
              href="/start?tier=complex_5000"
              className="block text-center text-[11px] font-mono text-ash hover:text-ink underline"
            >
              Or open full web wizard →
            </Link>
          </div>
        </div>
      </div>

      {/* Upfront Confirmation Policy */}
      <div className="glass-card p-6 sm:p-8 rounded-[28px] border-brass flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="space-y-1.5 text-center sm:text-left">
          <div className="font-serif font-bold text-base text-ink flex items-center justify-center sm:justify-start gap-2">
            <ShieldCheck className="w-4 h-4 text-brass" />
            <span>Upfront Fee Confirmation Policy</span>
          </div>
          <p className="text-xs text-ash max-w-lg leading-relaxed">
            Once you provide your documents, we confirm the exact fee in writing on WhatsApp before any work starts. No hidden surprises.
          </p>
        </div>

        <a
          href="https://wa.me/923120947187?text=Hi%2C%20I%20have%20a%20pricing%20question%20for%20Tax%20Year%202026."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#128C7E] text-white font-mono font-bold py-3 px-6 rounded-full text-xs shadow-sm hover:bg-[#0e7064] transition-all shrink-0 active:scale-95"
        >
          <WhatsAppIcon className="w-4 h-4" />
          <span>Ask on WhatsApp (0312 0947187)</span>
        </a>
      </div>
    </div>
  );
}

