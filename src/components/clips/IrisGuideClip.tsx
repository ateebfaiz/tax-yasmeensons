"use client";

import React from "react";
import { AppClipSheet } from "@/components/ui/app-clip/AppClipSheet";
import { ShieldCheck, ExternalLink, KeyRound, UserCheck, AlertTriangle } from "lucide-react";

export default function IrisGuideClip({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <AppClipSheet
      onClose={onClose}
      fullHeight
      title="Official FBR IRIS Guide"
      subtitle="ایف بی آر آئرس لاگ ان و پاس ورڈ گائیڈ"
    >
      <div className="p-4 md:p-6 pb-20 space-y-5">
        <div className="p-4 rounded-2xl bg-theme-primary/10 border border-theme-primary/20 space-y-2">
          <div className="flex items-center gap-2 text-theme-primary font-bold text-sm">
            <ShieldCheck className="w-5 h-5" />
            <span>Customer-Controlled Authentication</span>
          </div>
          <p className="text-xs text-theme-text-secondary leading-relaxed">
            Your IRIS password gives access to your official federal tax account. You should never send your password to tax agents or over WhatsApp. We guide you step-by-step so you sign in yourself.
          </p>
          <p className="text-xs font-urdu text-theme-primary leading-relaxed" dir="rtl">
            آپ کا آئرس پاس ورڈ آپ کی ذاتی ملکیت ہے۔ اسے کسی ایجنٹ یا واٹس ایپ پر دینے کی قطعی ضرورت نہیں ہے۔
          </p>
        </div>

        {/* Step-by-Step Recovery */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-theme-text-muted">
            Three Common Scenarios / تین ممکنہ صورتیں
          </h4>

          <div className="p-3.5 rounded-xl bg-theme-surface/60 border border-theme-border space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-theme-text">
              <KeyRound className="w-4 h-4 text-theme-primary" />
              <span>1. You Forgot Your IRIS Password</span>
            </div>
            <p className="text-xs text-theme-text-secondary leading-relaxed">
              FBR allows instant password reset via verification codes sent to your registered mobile and email.
            </p>
            <p className="text-xs font-urdu text-theme-text-muted" dir="rtl">
              ایف بی آر کی آفیشل ویب سائٹ پر 'Forgot Password' پر کلک کریں، کوڈ آپ کے تصدیق شدہ سم اور ای میل پر موصول ہوگا۔
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-theme-surface/60 border border-theme-border space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-theme-text">
              <UserCheck className="w-4 h-4 text-theme-primary" />
              <span>2. You Have an NTN but No Online Login</span>
            </div>
            <p className="text-xs text-theme-text-secondary leading-relaxed">
              Use "Registration for Unregistered Person" or "e-Enrollment for Registered Person" on IRIS.
            </p>
            <p className="text-xs font-urdu text-theme-text-muted" dir="rtl">
              اگر این ٹی این موجود ہے مگر پاس ورڈ نہیں، تو ایف بی آر کی 'E-Enrollment' سہولت سے نیا پاس ورڈ حاصل کریں۔
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-theme-surface/60 border border-theme-border space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-theme-text">
              <AlertTriangle className="w-4 h-4 text-theme-warning" />
              <span>3. Mobile / Email Changed or Inaccessible</span>
            </div>
            <p className="text-xs text-theme-text-secondary leading-relaxed">
              FBR offers biometric verification through NADRA e-Sahulat or visiting your local Regional Tax Office (RTO).
            </p>
            <p className="text-xs font-urdu text-theme-text-muted" dir="rtl">
              اگر رجسٹرڈ سم بند ہے تو نادرا ای سہولت یا قریبی آر ٹی او سے بائیو میٹرک تصدیق کے ذریعے موبائل نمبر اپ ڈیٹ کروائیں۔
            </p>
          </div>
        </div>

        {/* Official FBR Link Button */}
        <div className="pt-2">
          <a
            href="https://iris.fbr.gov.pk/infosys/public/txplogin.xhtml"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 bg-theme-primary hover:bg-theme-primary-hover text-white font-bold py-3.5 px-4 rounded-xl text-xs transition-all shadow-md"
          >
            <span>Open Official FBR IRIS Portal</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </AppClipSheet>
  );
}
