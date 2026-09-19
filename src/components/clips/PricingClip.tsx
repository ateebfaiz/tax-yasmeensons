"use client";

import React from "react";
import { AppClipSheet } from "@/components/ui/app-clip/AppClipSheet";
import { useAppClip } from "@/components/ui/app-clip/AppClipProvider";
import { CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/icons/whatsapp-icon";

export default function PricingClip({ onClose }: { onClose: () => void }) {
  const appClip = useAppClip();

  const handleSelectTier = (tier: string) => {
    onClose();
    appClip.open("tax-intake", { defaultTier: tier });
  };

  return (
    <AppClipSheet
      onClose={onClose}
      fullHeight
      title="Transparent Fee Schedule"
      subtitle="شفاف فیس و پیکیجز • TY2026 • No Hidden Retainers"
    >
      <div className="space-y-5 pb-24 text-ink dark:text-[#F4EFE6]">
        {/* Security / Policy Note */}
        <div className="p-4 rounded-2xl bg-white/45 dark:bg-white/[0.04] backdrop-blur-xl border border-white/70 dark:border-white/10 space-y-1.5 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-[#128C7E] dark:text-[#C4A046]">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Senior Tax Practice · Non-Business Individuals Only</span>
          </div>
          <p className="text-xs text-ash dark:text-[#8C959F] leading-relaxed">
            All fees are fixed and confirmed upfront. No surprises, no hourly billing, and zero password sharing.
          </p>
        </div>

        {/* Tier 1: Guided Filing */}
        <div className="p-5 rounded-2xl bg-white/45 dark:bg-white/[0.04] backdrop-blur-xl border border-white/70 dark:border-white/10 space-y-3 shadow-sm">
          <div className="space-y-1">
            <span className="font-mono text-[10px] font-bold text-ash tracking-widest uppercase">
              PACKAGE: GF-1000
            </span>
            <div className="font-serif text-2xl font-black text-ink dark:text-white">
              PKR 1,000
            </div>
            <h3 className="font-serif text-base font-bold text-ink dark:text-white">
              Guided Self-Filing
            </h3>
            <div className="font-urdu text-xs text-[#128C7E] dark:text-[#C4A046]" dir="rtl">
              رہنمائی مع سیلف فائلنگ
            </div>
          </div>

          <p className="text-xs text-ash dark:text-[#8C959F] leading-relaxed">
            We audit your figures and give you a field-by-field checklist. You log into IRIS and submit independently.
          </p>

          <ul className="space-y-1.5 text-xs text-ash dark:text-[#8C959F] font-mono border-t border-white/60 dark:border-white/10 pt-2.5">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#128C7E] dark:text-[#C4A046] shrink-0" />
              <span>Zero password sharing required</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#128C7E] dark:text-[#C4A046] shrink-0" />
              <span>Full salary &amp; WHT audit</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#128C7E] dark:text-[#C4A046] shrink-0" />
              <span>Field-by-field IRIS entry guide</span>
            </li>
          </ul>

          <button
            type="button"
            onClick={() => handleSelectTier("guided_1000")}
            className="w-full py-3 rounded-full border border-white/80 dark:border-white/15 bg-white/40 dark:bg-white/[0.03] backdrop-blur-md hover:bg-white/70 font-mono font-bold text-xs active:scale-95 transition-all shadow-sm"
          >
            Select GF-1000 (PKR 1,000)
          </button>
        </div>

        {/* Tier 2: Complete Assistance (Recommended) */}
        <div className="p-5 rounded-2xl bg-white/50 dark:bg-white/[0.06] backdrop-blur-xl border-2 border-[#128C7E] dark:border-[#C4A046] space-y-3 relative shadow-md">
          <div className="inline-block px-3 py-0.5 rounded-full bg-[#128C7E] dark:bg-[#C4A046] text-white dark:text-black font-mono text-[10px] font-bold uppercase tracking-wider">
            Most Selected · تجویز کردہ
          </div>

          <div className="space-y-1">
            <span className="font-mono text-[10px] font-bold text-[#128C7E] dark:text-[#C4A046] tracking-widest uppercase">
              PACKAGE: FA-2500
            </span>
            <div className="font-serif text-2xl font-black text-ink dark:text-white">
              PKR 2,500
            </div>
            <h3 className="font-serif text-base font-bold text-ink dark:text-white">
              Complete Filing Assistance
            </h3>
            <div className="font-urdu text-xs text-[#128C7E] dark:text-[#C4A046]" dir="rtl">
              مکمل فائلنگ اسسٹنس
            </div>
          </div>

          <p className="text-xs text-ash dark:text-[#8C959F] leading-relaxed">
            Full return &amp; wealth statement (s.116) preparation with screen assistance on official IRIS.
          </p>

          <ul className="space-y-1.5 text-xs text-ash dark:text-[#8C959F] font-mono border-t border-white/60 dark:border-white/10 pt-2.5">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#128C7E] dark:text-[#C4A046] shrink-0" />
              <span>Full return + Section 116 wealth balance</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#128C7E] dark:text-[#C4A046] shrink-0" />
              <span>WHT audit (SIM, bills, ATM, car, fuel)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#128C7E] dark:text-[#C4A046] shrink-0" />
              <span>Customer-authenticated IRIS session</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#128C7E] dark:text-[#C4A046] shrink-0" />
              <span>Active Taxpayer List (ATL) guarantee</span>
            </li>
          </ul>

          <button
            type="button"
            onClick={() => handleSelectTier("assistance_2500")}
            className="w-full py-3 rounded-full bg-gradient-to-r from-[#128C7E] to-[#0A6054] text-white font-mono font-bold text-xs shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>Select FA-2500 (PKR 2,500)</span>
            <Sparkles className="w-4 h-4" />
          </button>
        </div>

        {/* Tier 3: Complex Case Review */}
        <div className="p-5 rounded-2xl bg-white/45 dark:bg-white/[0.04] backdrop-blur-xl border border-white/70 dark:border-white/10 space-y-3 shadow-sm">
          <div className="space-y-1">
            <span className="font-mono text-[10px] font-bold text-ash tracking-widest uppercase">
              PACKAGE: CX-4500
            </span>
            <div className="font-serif text-2xl font-black text-ink dark:text-white">
              PKR 4,500+
            </div>
            <h3 className="font-serif text-base font-bold text-ink dark:text-white">
              Complex Individual Review
            </h3>
            <div className="font-urdu text-xs text-[#128C7E] dark:text-[#C4A046]" dir="rtl">
              پیچیدہ کیس جائزہ
            </div>
          </div>

          <p className="text-xs text-ash dark:text-[#8C959F] leading-relaxed">
            Multi-bank accounts, unfiled prior years, foreign remittances, or property section 111 asset reconciliations.
          </p>

          <ul className="space-y-1.5 text-xs text-ash dark:text-[#8C959F] font-mono border-t border-white/60 dark:border-white/10 pt-2.5">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#128C7E] dark:text-[#C4A046] shrink-0" />
              <span>Capital gains &amp; property reconciliation</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#128C7E] dark:text-[#C4A046] shrink-0" />
              <span>Foreign remittance &amp; PRC audit</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#128C7E] dark:text-[#C4A046] shrink-0" />
              <span>Multi-year wealth gap resolution</span>
            </li>
          </ul>

          <button
            type="button"
            onClick={() => handleSelectTier("complex_5000")}
            className="w-full py-3 rounded-full border border-white/80 dark:border-white/15 bg-white/40 dark:bg-white/[0.03] backdrop-blur-md hover:bg-white/70 font-mono font-bold text-xs active:scale-95 transition-all shadow-sm"
          >
            Select CX-4500 (Review)
          </button>
        </div>

        {/* WhatsApp Contact */}
        <div className="pt-2">
          <a
            href="https://wa.me/923120947187?text=Hi%2C%20I%20have%20questions%20regarding%20tax%20filing%20fees."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 rounded-full bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>Consult Fees on WhatsApp (0312 0947187)</span>
          </a>
        </div>
      </div>
    </AppClipSheet>
  );
}
