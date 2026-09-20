"use client";

import React from "react";
import { AppClipSheet } from "@/components/ui/app-clip/AppClipSheet";
import { GlassCard } from "@/components/ui/glass/GlassCard";
import { GlassButton } from "@/components/ui/glass/GlassButton";
import { useAppClip } from "@/components/ui/app-clip/AppClipProvider";
import { CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/icons/whatsapp-icon";
import { formatWhatsAppUrl } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/config";

export default function PricingClip({ onClose }: { onClose: () => void }) {
  const appClip = useAppClip();

  const handleSelectTier = (tier: string) => {
    onClose();
    appClip.open("tax-intake", { defaultTier: tier });
  };

  return (
    <AppClipSheet
      onClose={onClose}
      title="Transparent Fee Schedule"
      subtitle="شفاف فیس و پیکیجز • TY2026 • No Hidden Retainers"
    >
      <div className="space-y-3.5 pb-3 text-[#f5f7f8]">
        {/* Security / Policy Note */}
        <GlassCard variant="subtle" className="p-3.5 space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-[#20b6a5]">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Senior Tax Practice · Non-Business Individuals Only</span>
          </div>
          <p className="text-xs text-[#aeb9bf] leading-relaxed">
            All fees are fixed and confirmed upfront. No surprises, no hourly billing, and zero password sharing.
          </p>
        </GlassCard>

        {/* Tier 1: Guided Filing */}
        <GlassCard variant="default" className="p-4 space-y-2.5">
          <div className="space-y-1">
            <span className="font-mono text-[10px] font-bold text-[#aeb9bf] tracking-widest uppercase">
              PACKAGE: GF-1000
            </span>
            <div className="font-serif text-2xl font-black text-white">
              PKR 1,000
            </div>
            <h3 className="font-serif text-base font-bold text-white">
              Guided Self-Filing
            </h3>
            <div className="font-urdu text-xs text-[#20b6a5]" dir="rtl">
              رہنمائی مع سیلف فائلنگ
            </div>
          </div>

          <p className="text-xs text-[#aeb9bf] leading-relaxed">
            We audit your figures and give you a field-by-field checklist. You log into IRIS and submit independently.
          </p>

          <ul className="space-y-1.5 text-xs text-[#aeb9bf] font-mono border-t border-white/[0.08] pt-2">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#20b6a5] shrink-0" />
              <span>Zero password sharing required</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#20b6a5] shrink-0" />
              <span>Full salary &amp; WHT audit</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#20b6a5] shrink-0" />
              <span>Field-by-field IRIS entry guide</span>
            </li>
          </ul>

          <GlassButton
            type="button"
            variant="secondary"
            onClick={() => handleSelectTier("guided_1000")}
            className="w-full"
          >
            Select GF-1000 (PKR 1,000)
          </GlassButton>
        </GlassCard>

        {/* Tier 2: Complete Assistance (Recommended) */}
        <GlassCard variant="glow" className="p-4 space-y-2.5 relative border-[#20b6a5]/50">
          <div className="inline-block px-3 py-0.5 rounded-full bg-[#20b6a5] text-black font-mono text-[10px] font-bold uppercase tracking-wider">
            Most Selected · تجویز کردہ
          </div>

          <div className="space-y-1">
            <span className="font-mono text-[10px] font-bold text-[#20b6a5] tracking-widest uppercase">
              PACKAGE: FA-2500
            </span>
            <div className="font-serif text-2xl font-black text-white">
              PKR 2,500
            </div>
            <h3 className="font-serif text-base font-bold text-white">
              Complete Filing Assistance
            </h3>
            <div className="font-urdu text-xs text-[#20b6a5]" dir="rtl">
              مکمل فائلنگ اسسٹنس
            </div>
          </div>

          <p className="text-xs text-[#aeb9bf] leading-relaxed">
            Full return &amp; wealth statement (s.116) preparation with screen assistance on official IRIS.
          </p>

          <ul className="space-y-1.5 text-xs text-[#aeb9bf] font-mono border-t border-white/[0.08] pt-2">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#20b6a5] shrink-0" />
              <span>Full return + Section 116 wealth balance</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#20b6a5] shrink-0" />
              <span>WHT audit (SIM, bills, ATM, car, fuel)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#20b6a5] shrink-0" />
              <span>Customer-authenticated IRIS session</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#20b6a5] shrink-0" />
              <span>Active Taxpayer List (ATL) guarantee</span>
            </li>
          </ul>

          <GlassButton
            type="button"
            variant="primary"
            onClick={() => handleSelectTier("assistance_2500")}
            icon={<Sparkles className="w-4 h-4" />}
            className="w-full"
          >
            Select FA-2500 (PKR 2,500)
          </GlassButton>
        </GlassCard>

        {/* Tier 3: Complex Case Review */}
        <GlassCard variant="default" className="p-4 space-y-2.5">
          <div className="space-y-1">
            <span className="font-mono text-[10px] font-bold text-[#aeb9bf] tracking-widest uppercase">
              PACKAGE: CX-4500
            </span>
            <div className="font-serif text-2xl font-black text-white">
              PKR 4,500+
            </div>
            <h3 className="font-serif text-base font-bold text-white">
              Complex Individual Review
            </h3>
            <div className="font-urdu text-xs text-[#20b6a5]" dir="rtl">
              پیچیدہ کیس جائزہ
            </div>
          </div>

          <p className="text-xs text-[#aeb9bf] leading-relaxed">
            Multi-bank accounts, unfiled prior years, foreign remittances, or property section 111 asset reconciliations.
          </p>

          <ul className="space-y-1.5 text-xs text-[#aeb9bf] font-mono border-t border-white/[0.08] pt-2">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#20b6a5] shrink-0" />
              <span>Capital gains &amp; property reconciliation</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#20b6a5] shrink-0" />
              <span>Foreign remittance &amp; PRC audit</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#20b6a5] shrink-0" />
              <span>Multi-year wealth gap resolution</span>
            </li>
          </ul>

          <GlassButton
            type="button"
            variant="secondary"
            onClick={() => handleSelectTier("complex_5000")}
            className="w-full"
          >
            Select CX-4500 (Review)
          </GlassButton>
        </GlassCard>

        {/* WhatsApp Contact */}
        <div className="pt-1">
          <a
            href={formatWhatsAppUrl("Hi, I have questions regarding tax filing fees.")}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-12 inline-flex items-center justify-center gap-2 rounded-full bg-[rgba(27,37,43,0.72)] hover:bg-[rgba(36,52,60,0.85)] border border-[#25D366]/40 text-[#25D366] font-bold text-xs backdrop-blur-xl shadow-sm active:scale-95 transition-all"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>Consult Fees on WhatsApp ({SITE_CONFIG.contact.whatsappDisplay})</span>
          </a>
        </div>
      </div>
    </AppClipSheet>
  );
}
