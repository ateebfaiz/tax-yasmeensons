"use client";

import React from "react";
import { AppClipSheet } from "@/components/ui/app-clip/AppClipSheet";
import { GlassCard } from "@/components/ui/glass/GlassCard";
import { WhatsAppIcon } from "@/components/ui/icons/whatsapp-icon";
import { ShieldCheck, ExternalLink, KeyRound, UserCheck, AlertTriangle } from "lucide-react";
import { formatWhatsAppUrl } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/config";

export default function IrisGuideClip({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <AppClipSheet
      onClose={onClose}
      title="Official FBR IRIS Guide"
      subtitle="ایف بی آر آئرس پورٹل و پاس ورڈ رہنمائی"
    >
      <div className="space-y-3 pb-3 text-ink dark:text-palette-frost">
        {/* Security Trust Callout */}
        <GlassCard variant="glow" className="p-3.5 space-y-1.5 border-palette-coral/40">
          <div className="flex items-center gap-2 text-palette-coral font-bold text-xs">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Customer-Controlled Authentication Invariant</span>
          </div>
          <p className="text-[11px] text-ash dark:text-palette-sky leading-relaxed">
            Your IRIS password gives access to your official federal tax records. You should never send your password to any agent or over WhatsApp. We guide you step-by-step so you enter figures and submit independently.
          </p>
          <p className="text-[11px] font-urdu text-palette-coral leading-relaxed" dir="rtl">
            آپ کا آئرس پاس ورڈ آپ کی ذاتی ملکیت ہے۔ اسے کسی ایجنٹ یا واٹس ایپ پر شیئر کرنے کی ضرورت نہیں ہے۔
          </p>
        </GlassCard>

        {/* Step-by-Step Scenarios */}
        <div className="space-y-2">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-ash dark:text-palette-sky">
            Key Registration &amp; Account Scenarios / ضروری مراحل
          </h4>

          {/* Scenario 1: Form 181 Registration */}
          <GlassCard variant="default" className="p-3.5 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <UserCheck className="w-4 h-4 text-palette-coral" />
              <span>1. New Individual Registration (Form 181)</span>
            </div>
            <p className="text-[11px] text-ash dark:text-palette-sky leading-relaxed">
              Use &apos;Registration for Unregistered Person&apos; on Iris. Requires 13-digit CNIC, active SIM (in your name or immediate family member), email (we help create one if you don&apos;t have it), and current home address.
            </p>
            <div className="font-urdu text-[10px] text-palette-coral" dir="rtl">
              نیا این ٹی این حاصل کرنے کے لیے شناختی کارڈ، سم (اپنے یا قریبی رشتہ دار کے نام)، ای میل اور رہائشی پتہ درکار ہے۔
            </div>
          </GlassCard>

          {/* Scenario 2: Forgot Password */}
          <GlassCard variant="default" className="p-3.5 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <KeyRound className="w-4 h-4 text-palette-coral" />
              <span>2. Forgot IRIS Password or PIN</span>
            </div>
            <p className="text-[11px] text-ash dark:text-palette-sky leading-relaxed">
              FBR allows instant reset via dual OTP codes sent to your registered mobile SIM and email address.
            </p>
            <div className="font-urdu text-[10px] text-palette-coral" dir="rtl">
              ایف بی آر پورٹل پر &apos;Forgot Password&apos; پر کلک کر کے بذریعہ ایس ایم ایس اور ای میل کوڈ پاس ورڈ تبدیل کریں۔
            </div>
          </GlassCard>

          {/* Scenario 3: Lost SIM / Inaccessible */}
          <GlassCard variant="default" className="p-3.5 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>3. Mobile SIM / Email Lost or Changed</span>
            </div>
            <p className="text-[11px] text-ash dark:text-palette-sky leading-relaxed">
              Update your registered credentials via NADRA e-Sahulat biometric verification or at your local Regional Tax Office (RTO).
            </p>
          </GlassCard>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row gap-2">
          <a
            href="https://iris.fbr.gov.pk/infosys/public/txplogin.xhtml"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 h-12 inline-flex items-center justify-center gap-1.5 rounded-full bg-white/80 dark:bg-palette-gunmetal/75 hover:bg-[rgba(36,52,60,0.85)] border border-white/[0.16] text-white font-mono font-bold text-xs backdrop-blur-xl shadow-md active:scale-95 transition-all"
          >
            <span>Open iris.fbr.gov.pk</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <a
            href={formatWhatsAppUrl("Hi, I need assistance with IRIS Registration.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 h-12 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-bold text-xs shadow-md active:scale-95 transition-all"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>WhatsApp ({SITE_CONFIG.contact.whatsappDisplay})</span>
          </a>
        </div>
      </div>
    </AppClipSheet>
  );
}
