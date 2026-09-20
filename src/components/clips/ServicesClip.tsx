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
      title="Tax Facilitation Services"
      subtitle="ہماری سروسز • Individual Filers Only • TY2026"
    >
      <div className="space-y-3.5 pb-3 text-ink dark:text-white">
        {/* Zero-Credential Invariant Banner */}
        <GlassCard variant="subtle" className="p-3.5 space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-apple-blue">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Zero-Credential Architecture</span>
          </div>
          <p className="text-xs text-ash dark:text-white/60 leading-relaxed">
            We never ask for or store your IRIS password. All filings are submitted under your own private authentication.
          </p>
        </GlassCard>

        {/* Services List */}
        <div className="space-y-3">
          {services.map((svc) => (
            <GlassCard
              key={svc.code}
              variant={svc.isRecommended ? "glow" : "default"}
              className="p-4 space-y-2.5"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/[0.08] text-ash dark:text-white/60">
                      {svc.code}
                    </span>
                    {svc.isRecommended && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-apple-blue">
                        Recommended
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-base font-bold text-ink dark:text-white">
                    {svc.titleEn}
                  </h3>
                  <div className="font-urdu text-xs text-apple-blue" dir="rtl">
                    {svc.titleUr}
                  </div>
                </div>
                <div className="font-serif text-xl font-black text-ink dark:text-white shrink-0">
                  {svc.fee}
                </div>
              </div>

              <p className="text-xs text-ash dark:text-white/60 leading-relaxed">
                {svc.descEn}
              </p>

              <ul className="space-y-1.5 text-xs text-ash dark:text-white/60 font-mono border-t border-rule/50 dark:border-white/[0.08] pt-2">
                {svc.points.map((pt, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-apple-blue shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              <GlassButton
                type="button"
                variant={svc.isRecommended ? "primary" : "secondary"}
                onClick={() => handleStart(svc.tierId)}
                icon={<Sparkles className="w-3.5 h-3.5" />}
                className="w-full"
              >
                Select {svc.code}
              </GlassButton>
            </GlassCard>
          ))}
        </div>

        {/* WhatsApp Contact */}
        <div className="pt-1">
          <a
            href={formatWhatsAppUrl("Hi, I have questions about your tax services.")}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-12 inline-flex items-center justify-center gap-2 rounded-full bg-white/80 dark:bg-[#1c1c1e]/75 hover:bg-[rgba(36,52,60,0.85)] border border-[#25D366]/40 text-[#25D366] font-bold text-xs backdrop-blur-xl shadow-sm active:scale-95 transition-all"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>Consult on WhatsApp ({SITE_CONFIG.contact.whatsappDisplay})</span>
          </a>
        </div>
      </div>
    </AppClipSheet>
  );
}
