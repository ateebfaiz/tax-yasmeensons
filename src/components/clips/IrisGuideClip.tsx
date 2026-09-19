"use client";

import React from "react";
import { AppClipSheet } from "@/components/ui/app-clip/AppClipSheet";
import { WhatsAppIcon } from "@/components/ui/icons/whatsapp-icon";
import { ShieldCheck, ExternalLink, KeyRound, UserCheck, AlertTriangle, Sparkles } from "lucide-react";
import { useAppClip } from "@/components/ui/app-clip/AppClipProvider";

export default function IrisGuideClip({
  onClose,
}: {
  onClose: () => void;
}) {
  const appClip = useAppClip();

  return (
    <AppClipSheet
      onClose={onClose}
      fullHeight
      title="Official FBR IRIS Guide"
      subtitle="ایف بی آر آئرس پورٹل و پاس ورڈ رہنمائی"
    >
      <div className="space-y-4 pb-24 text-ink dark:text-[#F4EFE6]">
        {/* Security Trust Callout */}
        <div className="p-3.5 rounded-2xl bg-[#128C7E]/10 border border-[#128C7E]/25 backdrop-blur-md space-y-1.5">
          <div className="flex items-center gap-2 text-[#128C7E] font-bold text-xs">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Customer-Controlled Authentication Invariant</span>
          </div>
          <p className="text-[11px] text-ash dark:text-[#8C959F] leading-relaxed">
            Your IRIS password gives access to your official federal tax records. You should never send your password to any agent or over WhatsApp. We guide you step-by-step so you enter figures and submit independently.
          </p>
          <p className="text-[11px] font-urdu text-[#128C7E] leading-relaxed" dir="rtl">
            آپ کا آئرس پاس ورڈ آپ کی ذاتی ملکیت ہے۔ اسے کسی ایجنٹ یا واٹس ایپ پر شیئر کرنے کی ضرورت نہیں ہے۔
          </p>
        </div>

        {/* Step-by-Step Scenarios */}
        <div className="space-y-2.5">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-ash dark:text-[#8C959F]">
            Key Registration &amp; Account Scenarios / ضروری مراحل
          </h4>

          {/* Scenario 1: Form 181 Registration */}
          <div className="p-3.5 rounded-2xl bg-white/60 dark:bg-white/[0.03] backdrop-blur-md border border-black/[0.06] dark:border-white/10 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-ink dark:text-white">
              <UserCheck className="w-4 h-4 text-[#128C7E]" />
              <span>1. New Individual Registration (Form 181)</span>
            </div>
            <p className="text-[11px] text-ash dark:text-[#8C959F] leading-relaxed">
              Use &apos;Registration for Unregistered Person&apos; on Iris. Requires 13-digit CNIC, active SIM (in your name or immediate family member), email (we help create one if you don&apos;t have it), and current home address.
            </p>
            <div className="font-urdu text-[10px] text-ash" dir="rtl">
              نیا این ٹی این حاصل کرنے کے لیے شناختی کارڈ، سم (اپنے یا قریبی رشتہ دار کے نام)، ای میل اور رہائشی پتہ درکار ہے۔
            </div>
          </div>

          {/* Scenario 2: Forgot Password */}
          <div className="p-3.5 rounded-2xl bg-white/60 dark:bg-white/[0.03] backdrop-blur-md border border-black/[0.06] dark:border-white/10 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-ink dark:text-white">
              <KeyRound className="w-4 h-4 text-[#128C7E]" />
              <span>2. Forgot IRIS Password or PIN</span>
            </div>
            <p className="text-[11px] text-ash dark:text-[#8C959F] leading-relaxed">
              FBR allows instant reset via dual OTP codes sent to your registered mobile SIM and email address.
            </p>
            <div className="font-urdu text-[10px] text-ash" dir="rtl">
              ایف بی آر پورٹل پر &apos;Forgot Password&apos; پر کلک کر کے بذریعہ ایس ایم ایس اور ای میل کوڈ پاس ورڈ تبدیل کریں۔
            </div>
          </div>

          {/* Scenario 3: Lost SIM / Inaccessible */}
          <div className="p-3.5 rounded-2xl bg-white/60 dark:bg-white/[0.03] backdrop-blur-md border border-black/[0.06] dark:border-white/10 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-ink dark:text-white">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>3. Mobile SIM / Email Lost or Changed</span>
            </div>
            <p className="text-[11px] text-ash dark:text-[#8C959F] leading-relaxed">
              Update your registered credentials via NADRA e-Sahulat biometric verification or at your local Regional Tax Office (RTO).
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row gap-2">
          <a
            href="https://iris.fbr.gov.pk/infosys/public/txplogin.xhtml"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 px-4 rounded-full bg-ink hover:bg-theme-primary-hover text-paper-light font-mono font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
          >
            <span>Open iris.fbr.gov.pk</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <a
            href="https://wa.me/923120947187?text=Hi%2C%20I%20need%20assistance%20with%20IRIS%20Registration."
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-5 rounded-full bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>WhatsApp (03120947187)</span>
          </a>
        </div>
      </div>
    </AppClipSheet>
  );
}
