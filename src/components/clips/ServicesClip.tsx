"use client";

import React from "react";
import { AppClipSheet } from "@/components/ui/app-clip/AppClipSheet";
import { useAppClip } from "@/components/ui/app-clip/AppClipProvider";
import { CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/icons/whatsapp-icon";

export default function ServicesClip({ onClose }: { onClose: () => void }) {
  const appClip = useAppClip();

  const handleStart = (tier: string) => {
    onClose();
    appClip.open("tax-intake", { defaultTier: tier });
  };

  const services = [
    {
      code: "GF-1000",
      tierId: "guided_1000",
      fee: "PKR 1,000",
      titleEn: "Guided Self-Filing Facilitation",
      titleUr: "رہنمائی مع سیلف فائلنگ",
      descEn: "Document review, withholding tax calculations, and step-by-step checklist. You log into official IRIS and submit independently.",
      points: [
        "Zero password sharing with any third party",
        "Document intake & withholding tax calculation",
        "Field-by-field numbers provided for every tab",
      ],
    },
    {
      code: "FA-2500",
      tierId: "assistance_2500",
      fee: "PKR 2,500",
      titleEn: "Complete Filing Assistance",
      titleUr: "مکمل فائلنگ اسسٹنس",
      descEn: "Full return and wealth statement (s.116) preparation with authenticated screen assistance on official IRIS.",
      points: [
        "Full income tax return + Section 116 wealth balance",
        "WHT credit optimization (mobile, bills, bank)",
        "Screen-by-screen guidance with authenticated session",
      ],
      isRecommended: true,
    },
    {
      code: "CX-4500",
      tierId: "complex_5000",
      fee: "PKR 4,500+",
      titleEn: "Complex Individual Case Review",
      titleUr: "پیچیدہ کیس و تفصیلی ریویو",
      descEn: "Multiple income streams, foreign remittances, capital asset transactions, or unfiled prior years reconciliation.",
      points: [
        "Capital gains & property transaction reconciliation",
        "Foreign remittance & multi-currency audit",
        "Prior year wealth statement gap analysis",
      ],
    },
  ];

  return (
    <AppClipSheet
      onClose={onClose}
      fullHeight
      title="Tax Facilitation Services"
      subtitle="ہماری سروسز • Individual Filers Only • TY2026"
    >
      <div className="space-y-5 pb-24 text-ink dark:text-[#F4EFE6]">
        {/* Zero-Credential Invariant Banner */}
        <div className="p-4 rounded-2xl bg-white/60 dark:bg-white/[0.03] backdrop-blur-md border border-black/[0.06] dark:border-white/10 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold text-[#128C7E] dark:text-[#C4A046]">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Zero-Credential Architecture</span>
          </div>
          <p className="text-xs text-ash dark:text-[#8C959F] leading-relaxed">
            We never ask for or store your IRIS password. All filings are submitted under your own private authentication.
          </p>
        </div>

        {/* Services List */}
        <div className="space-y-4">
          {services.map((svc) => (
            <div
              key={svc.code}
              className={`p-5 rounded-2xl backdrop-blur-md space-y-3 ${
                svc.isRecommended
                  ? "bg-white/80 dark:bg-white/[0.06] border-2 border-[#128C7E] dark:border-[#C4A046] shadow-md"
                  : "bg-white/60 dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/10"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10">
                      {svc.code}
                    </span>
                    {svc.isRecommended && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#128C7E] dark:text-[#C4A046]">
                        Recommended
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-base font-bold text-ink dark:text-white">
                    {svc.titleEn}
                  </h3>
                  <div className="font-urdu text-xs text-[#128C7E] dark:text-[#C4A046]" dir="rtl">
                    {svc.titleUr}
                  </div>
                </div>
                <div className="font-serif text-xl font-black text-ink dark:text-white shrink-0">
                  {svc.fee}
                </div>
              </div>

              <p className="text-xs text-ash dark:text-[#8C959F] leading-relaxed">
                {svc.descEn}
              </p>

              <ul className="space-y-1.5 text-xs text-ash dark:text-[#8C959F] font-mono border-t border-black/[0.06] dark:border-white/10 pt-2.5">
                {svc.points.map((pt, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#128C7E] dark:text-[#C4A046] shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => handleStart(svc.tierId)}
                className={`w-full py-3 rounded-full font-mono font-bold text-xs active:scale-95 transition-all flex items-center justify-center gap-2 ${
                  svc.isRecommended
                    ? "bg-gradient-to-r from-[#128C7E] to-[#0A6054] text-white shadow-md"
                    : "border border-black/10 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                <span>Select {svc.code}</span>
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* WhatsApp Contact */}
        <div className="pt-2">
          <a
            href="https://wa.me/923120947187?text=Hi%2C%20I%20have%20questions%20about%20your%20tax%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 rounded-full bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>Consult on WhatsApp (0312 0947187)</span>
          </a>
        </div>
      </div>
    </AppClipSheet>
  );
}
