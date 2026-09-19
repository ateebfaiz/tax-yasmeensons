"use client";

import React from "react";
import Link from "next/link";
import { useAppClip } from "@/components/ui/app-clip/AppClipProvider";
import { CheckCircle2, ShieldCheck, ArrowRight, MessageCircle } from "lucide-react";

export default function PricingPage() {
  const appClip = useAppClip();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-12">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-theme-primary/10 border border-theme-primary/20 text-theme-primary text-xs font-bold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Transparent Pricing Policy • Tax Year 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-theme-text">No Hidden Fees. Ever.</h1>
        <p className="text-lg font-bold text-theme-primary font-urdu" dir="rtl">
          شفاف فیس • کوئی پوشیدہ چارجز نہیں
        </p>
        <p className="max-w-xl mx-auto text-xs sm:text-sm text-theme-text-secondary">
          We believe tax preparation should be straightforward. Review our tiered pricing below and select the model that fits your filing needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tier 1 */}
        <div className="glass-card p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-bold text-theme-primary uppercase tracking-wider">Independent</span>
              <h2 className="text-xl font-bold text-theme-text">Guided Filing</h2>
              <div className="text-xs font-urdu text-theme-primary mt-0.5" dir="rtl">رہنمائی مع سیلف فائلنگ</div>
            </div>
            <div className="text-3xl font-extrabold text-theme-text">
              PKR 1,000
            </div>
            <p className="text-xs text-theme-text-secondary leading-relaxed">
              We audit your documents, calculate taxable income and withholding taxes, and provide a full checklist with exact numbers for each IRIS box.
            </p>
            <ul className="space-y-2 text-xs text-theme-text-secondary pt-2 border-t border-theme-border/40">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-theme-success shrink-0" />
                <span>Zero password sharing required</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-theme-success shrink-0" />
                <span>WHT certificate tax calculation</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-theme-success shrink-0" />
                <span>Step-by-step submission checklist</span>
              </li>
            </ul>
          </div>

          <button
            type="button"
            onClick={() => appClip.open("tax-intake", { defaultTier: "guided_1000" })}
            className="w-full py-2.5 px-4 rounded-xl border border-theme-border bg-theme-surface hover:bg-theme-surface-raised font-bold text-xs text-theme-text transition-all"
          >
            Choose Guided (Rs 1,000)
          </button>
        </div>

        {/* Tier 2: Recommended */}
        <div className="glass-card p-6 flex flex-col justify-between space-y-6 border-theme-primary ring-2 ring-theme-primary/30 shadow-xl relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-theme-primary text-white text-[10px] font-bold uppercase tracking-wider">
            Most Popular / مقبول ترین
          </div>
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-bold text-theme-primary uppercase tracking-wider">Assisted</span>
              <h2 className="text-xl font-bold text-theme-text">Filing Assistance</h2>
              <div className="text-xs font-urdu text-theme-primary mt-0.5" dir="rtl">مکمل فائلنگ اسسٹنس</div>
            </div>
            <div className="text-3xl font-extrabold text-theme-text">
              PKR 2,500
            </div>
            <p className="text-xs text-theme-text-secondary leading-relaxed">
              Complete hands-on facilitation through your official IRIS account. We reconcile your return, wealth statement, and deductions, followed by customer approval and submission.
            </p>
            <ul className="space-y-2 text-xs text-theme-text-secondary pt-2 border-t border-theme-border/40">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-theme-success shrink-0" />
                <span>Full return & wealth statement</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-theme-success shrink-0" />
                <span>IRIS screen-by-screen assistance</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-theme-success shrink-0" />
                <span>Customer pre-approval gate</span>
              </li>
            </ul>
          </div>

          <button
            type="button"
            onClick={() => appClip.open("tax-intake", { defaultTier: "assistance_2500" })}
            className="btn-shimmer w-full py-3 px-4 rounded-xl bg-theme-primary hover:bg-theme-primary-hover text-white font-bold text-xs shadow-md transition-all"
          >
            Choose Assistance (Rs 2,500)
          </button>
        </div>

        {/* Tier 3: Complex */}
        <div className="glass-card p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-bold text-theme-text-muted uppercase tracking-wider">Comprehensive</span>
              <h2 className="text-xl font-bold text-theme-text">Complex Review</h2>
              <div className="text-xs font-urdu text-theme-primary mt-0.5" dir="rtl">پیچیدہ کیس جائزہ</div>
            </div>
            <div className="text-3xl font-extrabold text-theme-text">
              PKR 4,500+
            </div>
            <p className="text-xs text-theme-text-secondary leading-relaxed">
              For complex individual profiles involving capital gains on property or stocks, foreign remittances, multiple bank accounts, or prior unfiled tax years.
            </p>
            <ul className="space-y-2 text-xs text-theme-text-secondary pt-2 border-t border-theme-border/40">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-theme-success shrink-0" />
                <span>Multiple accounts & prior year gaps</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-theme-success shrink-0" />
                <span>Property & capital gains reconciliation</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-theme-success shrink-0" />
                <span>Senior tax specialist assignment</span>
              </li>
            </ul>
          </div>

          <button
            type="button"
            onClick={() => appClip.open("tax-intake", { defaultTier: "complex_5000" })}
            className="w-full py-2.5 px-4 rounded-xl border border-theme-border bg-theme-surface hover:bg-theme-surface-raised font-bold text-xs text-theme-text transition-all"
          >
            Consult Complex Case
          </button>
        </div>
      </div>

      {/* Confirmation Guarantee Banner */}
      <div className="glass-card p-6 border-theme-primary/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="font-bold text-sm text-theme-text flex items-center justify-center sm:justify-start gap-2">
            <ShieldCheck className="w-4 h-4 text-theme-primary" />
            <span>Final Fee Confirmed After Document Review</span>
          </div>
          <p className="text-xs text-theme-text-secondary">
            We confirm the final applicable fee before any filing work begins. Zero surprises.
          </p>
        </div>
        <button
          type="button"
          onClick={() => appClip.open("whatsapp-intake")}
          className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold py-2.5 px-5 rounded-xl text-xs shadow-sm hover:bg-[#1ebd59] transition-all shrink-0"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Ask on WhatsApp (03120947187)</span>
        </button>
      </div>
    </div>
  );
}
