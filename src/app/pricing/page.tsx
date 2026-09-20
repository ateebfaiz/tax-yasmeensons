"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppClip } from "@/components/ui/app-clip/AppClipProvider";
import PricingClip from "@/components/clips/PricingClip";
import { CheckCircle2, ShieldCheck, ArrowRight, Lock, ExternalLink, Sparkles } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/icons/whatsapp-icon";
import { formatWhatsAppUrl } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/config";

export default function PricingPage() {
  const router = useRouter();
  const appClip = useAppClip();

  return (
    <>
      {/* ========================================================
          1. MOBILE VIEWPORT (md:hidden): Frosted Liquid Glass AppClip
          ======================================================== */}
      <div className="block md:hidden">
        <PricingClip onClose={() => router.push("/")} />
      </div>

      {/* ========================================================
          2. DESKTOP VIEWPORT (hidden md:block): Two-Column Layout
          ======================================================== */}
      <div className="hidden md:block max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16 pb-32">
        <div className="grid grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT COLUMN: Sticky Overview & Trust */}
          <div className="col-span-5 lg:col-span-4 sticky top-24 space-y-6">
            <div className="space-y-3">
              <div>
                <span className="inline-block font-mono text-[11px] text-brass font-bold tracking-widest uppercase bg-brass/10 border border-brass/30 px-3 py-1 rounded-full">
                  SCHEDULE 03 · TY2026
                </span>
              </div>

              <h1 className="font-serif text-3xl lg:text-4xl font-black text-ink leading-tight">
                Transparent Fee Schedule
              </h1>

              <div className="font-urdu text-base font-bold text-[#128C7E] dark:text-[#C4A046]" dir="rtl">
                شفاف فیس و پیکیجز • کوئی پوشیدہ چارجز نہیں
              </div>

              <p className="text-sm text-ash leading-relaxed">
                Senior tax practice pricing for non-business individuals. The applicable fee is confirmed upfront before filing commences.
              </p>
            </div>

            {/* Zero-Credential Invariant Card */}
            <div className="p-5 rounded-2xl bg-paper-light border border-rule space-y-2.5 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-[#128C7E] dark:text-[#C4A046]">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Zero-Credential Invariant</span>
              </div>
              <p className="text-xs text-ash leading-relaxed">
                We never store, input, or ask for your FBR IRIS password. Filings are submitted under your own private authentication.
              </p>
              <div className="pt-2 border-t border-rule-light font-mono text-[11px] text-ash flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-brass" />
                <span>Official Gateway:</span>
                <a
                  href="https://iris.fbr.gov.pk/infosys/public/txplogin.xhtml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink font-bold hover:text-brass underline inline-flex items-center gap-1"
                >
                  <span>iris.fbr.gov.pk</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Concierge Desk */}
            <div className="p-5 rounded-2xl bg-folio border border-rule space-y-3 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink">
                  Fee Concierge Online
                </span>
              </div>
              <p className="text-xs text-ash leading-relaxed">
                Have questions about previous unfiled years or multi-bank reconciliation fees?
              </p>
              <a
                href={formatWhatsAppUrl("Hi, I have questions regarding tax filing fees.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-full bg-[#25D366] hover:bg-[#1ebd59] text-white font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>WhatsApp Desk ({SITE_CONFIG.contact.whatsappDisplay})</span>
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: 3 Transparent Packages & Comparison */}
          <div className="col-span-7 lg:col-span-8 space-y-8">
            <div className="grid grid-cols-1 gap-6">
              {/* Package 1: Guided Filing */}
              <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-5 border-rule shadow-sm hover:shadow-md transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-rule pb-4">
                  <div className="space-y-1">
                    <span className="font-mono text-[11px] font-bold text-ash tracking-widest uppercase">
                      PACKAGE: GF-1000
                    </span>
                    <h2 className="font-serif text-2xl font-bold text-ink">
                      Guided Self-Filing
                    </h2>
                    <div className="font-urdu text-sm text-[#128C7E] dark:text-[#C4A046]" dir="rtl">
                      رہنمائی مع سیلف فائلنگ
                    </div>
                  </div>
                  <div className="font-serif text-3xl font-black text-ink">
                    PKR 1,000
                  </div>
                </div>

                <p className="text-sm text-ash leading-relaxed">
                  We audit your documents, calculate your taxable income and withholding deductions, and provide a field-by-field checklist. You sign into IRIS and submit independently.
                </p>

                <ul className="space-y-2 text-xs text-ash font-mono pt-2 border-t border-rule-light">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-iris-teal shrink-0" />
                    <span>Zero password sharing required</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-iris-teal shrink-0" />
                    <span>Full salary &amp; WHT audit</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-iris-teal shrink-0" />
                    <span>Field-by-field IRIS entry guide</span>
                  </li>
                </ul>

                <div className="pt-2">
                  <Link
                    href="/start?tier=guided_1000"
                    className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-full bg-paper hover:bg-paper-light border border-rule font-mono font-bold text-xs text-ink transition-all active:scale-95 shadow-sm"
                  >
                    <span>Proceed with GF-1000 (PKR 1,000)</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Package 2: Complete Assistance (Recommended) */}
              <div className="glass-card-featured p-6 sm:p-8 rounded-3xl space-y-5 border-2 border-brass relative shadow-lg">
                <div className="inline-block px-3.5 py-1 rounded-full bg-brass text-ink font-mono text-[10px] font-bold uppercase tracking-wider shadow-sm">
                  Most Selected · تجویز کردہ
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-rule pb-4">
                  <div className="space-y-1">
                    <span className="font-mono text-[11px] font-bold text-brass tracking-widest uppercase">
                      PACKAGE: FA-2500
                    </span>
                    <h2 className="font-serif text-2xl font-bold text-ink">
                      Complete Filing Assistance
                    </h2>
                    <div className="font-urdu text-sm text-[#128C7E] dark:text-[#C4A046]" dir="rtl">
                      مکمل فائلنگ اسسٹنس
                    </div>
                  </div>
                  <div className="font-serif text-3xl font-black text-ink">
                    PKR 2,500
                  </div>
                </div>

                <p className="text-sm text-ash leading-relaxed">
                  Full-service facilitation. We reconcile your return, wealth statement (s.116), and WHT deductions, guide you through official IRIS screens, and confirm ATL status.
                </p>

                <ul className="space-y-2 text-xs text-ash font-mono pt-2 border-t border-rule-light">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-iris-teal shrink-0" />
                    <span>Full income tax return + Section 116 wealth balance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-iris-teal shrink-0" />
                    <span>WHT audit (SIM, bills, ATM, car, fuel)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-iris-teal shrink-0" />
                    <span>Screen-by-screen assistance on official IRIS</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-iris-teal shrink-0" />
                    <span>Active Taxpayer List (ATL) confirmation</span>
                  </li>
                </ul>

                <div className="pt-2">
                  <Link
                    href="/start?tier=assistance_2500"
                    className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#128C7E] to-[#0A6054] text-white font-mono font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
                  >
                    <span>Proceed with FA-2500 (PKR 2,500)</span>
                    <Sparkles className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Package 3: Complex Case Review */}
              <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-5 border-rule shadow-sm hover:shadow-md transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-rule pb-4">
                  <div className="space-y-1">
                    <span className="font-mono text-[11px] font-bold text-ash tracking-widest uppercase">
                      PACKAGE: CX-4500
                    </span>
                    <h2 className="font-serif text-2xl font-bold text-ink">
                      Complex Individual Review
                    </h2>
                    <div className="font-urdu text-sm text-[#128C7E] dark:text-[#C4A046]" dir="rtl">
                      پیچیدہ کیس جائزہ
                    </div>
                  </div>
                  <div className="font-serif text-3xl font-black text-ink">
                    PKR 4,500+
                  </div>
                </div>

                <p className="text-sm text-ash leading-relaxed">
                  For taxpayers with multiple streams of income (rental, interest, foreign remittance), capital asset transactions, multiple bank accounts, or unfiled prior years requiring wealth reconciliation adjustments. Final fee confirmed after document review.
                </p>

                <ul className="space-y-2 text-xs text-ash font-mono pt-2 border-t border-rule-light">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-iris-teal shrink-0" />
                    <span>Capital gains &amp; property reconciliation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-iris-teal shrink-0" />
                    <span>Foreign remittance &amp; PRC audit</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-iris-teal shrink-0" />
                    <span>Prior year wealth gap resolution</span>
                  </li>
                </ul>

                <div className="pt-2">
                  <Link
                    href="/start?tier=complex_5000"
                    className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-full bg-paper hover:bg-paper-light border border-rule font-mono font-bold text-xs text-ink transition-all active:scale-95 shadow-sm"
                  >
                    <span>Proceed with CX-4500 (Quoted Review)</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
