"use client";

import React from "react";
import Link from "next/link";
import { useAppClip } from "@/components/ui/app-clip/AppClipProvider";
import { WhatsAppIcon } from "@/components/ui/icons/whatsapp-icon";
import { ExternalLink, KeyRound, UserCheck, ShieldCheck, CheckCircle2, ArrowRight, Laptop, Lock, HelpCircle, Sparkles } from "lucide-react";

export default function IrisGuidePage() {
  const appClip = useAppClip();

  const steps = [
    {
      step: "01",
      code: "AUTH-LOGIN",
      titleEn: "Sign into Official FBR IRIS",
      titleUr: "آفیشل آئرس لاگ ان",
      descEn: "Navigate directly to the official Federal Board of Revenue portal. The URL must begin with iris.fbr.gov.pk.",
      descUr: "براہِ راست ایف بی آر کے آفیشل پورٹل پر جائیں۔ ویب ایڈریس iris.fbr.gov.pk ہونا ضروری ہے۔",
      details: [
        "Registration No: Your 13-digit CNIC (without dashes)",
        "Password: Your secret IRIS password created during registration",
        "Never enter this password on any third-party app or website",
      ],
      link: "https://iris.fbr.gov.pk/infosys/public/txplogin.xhtml",
      linkText: "Open iris.fbr.gov.pk",
    },
    {
      step: "02",
      code: "AUTH-RESET",
      titleEn: "Forgot Password / PIN Recovery",
      titleUr: "پاس ورڈ یا پن ری سیٹ کرنے کا طریقہ",
      descEn: "If you have lost your credentials, click 'Forgot Password' on the IRIS login screen.",
      descUr: "اگر پاس ورڈ یاد نہیں ہے تو 'Forgot Password' پر کلک کر کے فوری نیا پاس ورڈ حاصل کریں۔",
      details: [
        "Enter your CNIC, registered mobile service provider, and cell number",
        "Enter your registered email address",
        "FBR sends two 6-digit OTP codes: one via SMS, one via Email",
        "Enter both codes to choose your new private password",
      ],
      link: "https://iris.fbr.gov.pk/infosys/public/txplogin.xhtml",
      linkText: "FBR Password Recovery",
    },
    {
      step: "03",
      code: "REG-181",
      titleEn: "Online Registration (Form 181) & NTN Issuance",
      titleUr: "آن لائن رجسٹریشن (فارم 181) اور این ٹی این کا حصول",
      descEn: "To register as an individual with FBR and obtain your NTN via Iris Portal (Form 181).",
      descUr: "ایف بی آر آئرس پورٹل پر انفرادی رجسٹریشن اور این ٹی این حاصل کرنے کا باقاعدہ طریقہ۔",
      details: [
        "Click 'Registration for Unregistered Person' on iris.fbr.gov.pk",
        "Valid CNIC: 13 digits (NADRA verified)",
        "Active Mobile SIM: Registered under own CNIC, or blood relative / immediate family member (with relative's name & CNIC)",
        "Personal Email: Used for electronic notice and OTP (we can guide and create one for you)",
        "Current Residential Address: Form 181 property and residence mapping",
        "Income Source Details: Salaried employer NTN, business activity, or household support declaration",
        "Dual Verification: Submit 6-digit SMS OTP and Email OTP to complete registration",
      ],
      link: "https://iris.fbr.gov.pk/infosys/public/txplogin.xhtml",
      linkText: "FBR Online Registration (Form 181)",
    },
    {
      step: "04",
      code: "DECLARATION",
      titleEn: "Where We Assist You: Return & Wealth Statement",
      titleUr: "فائلنگ کا طریقہ کار",
      descEn: "Once logged in, our specialist guides you to each exact screen and code.",
      descUr: "لاگ ان کے بعد ہمارا ماہر آپ کو ہر کوڈ اور خانے میں درست اعداد و شمار درج کرنے کی رہنمائی دیتا ہے۔",
      details: [
        "Declaration Menu → 114(1) Return of Income Filed Voluntarily",
        "Tax Year: Select 2026 (Period July 2025 – June 2026)",
        "Employment Tab: Enter verified salary and Sec 149 employer tax credit",
        "Adjustable Tax Tab: Enter withholding taxes from mobile, electricity, bank",
        "Wealth Statement Tab (Sec 116): Balance personal assets and expenses",
      ],
    },
    {
      step: "05",
      code: "VERIFICATION",
      titleEn: "Mandatory PIN & Completed Task Confirmation",
      titleUr: "حتمی تصدیق اور پن کوڈ کا اندراج",
      descEn: "FBR requires your 4-digit secret PIN code before saving a return as submitted.",
      descUr: "ریٹرن جمع کروانے کے لیے آپ کا ذاتی 4 ہندسوں والا پن کوڈ درکار ہوتا ہے۔",
      details: [
        "Check that 'Unreconciled Amount' in Wealth Statement shows exactly 0.00",
        "Click 'Verification' and type your confidential 4-digit PIN",
        "Click 'Submit' — your return moves from 'Draft' to 'Completed Tasks'",
        "Download your official FBR Acknowledgment Slip for banking/visa use",
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-16 space-y-10 pb-28">
      {/* Annex Header */}
      <div className="border-b-2 border-brass pb-4 space-y-2">
        <div className="flex items-center justify-between font-mono text-[11px] text-ash">
          <span>PRACTICE ANNEX A</span>
          <span className="text-stamp-red font-bold">OFFICIAL FBR IRIS PORTAL</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-black text-ink">
          Official IRIS Portal & Account Guide
        </h1>
        <p className="text-xs text-ash leading-relaxed max-w-2xl">
          Everything you need to know about accessing, recovering, and authenticating your personal FBR tax account. You retain full control; our specialists never request your password.
        </p>
      </div>

      {/* Security Stamp Box */}
      <div className="stamp-box p-5 rounded-2xl text-xs space-y-1.5 shadow-sm">
        <div className="font-bold flex items-center gap-1.5 text-stamp-red">
          <ShieldCheck className="w-4 h-4 text-stamp-red" />
          <span>ZERO-CREDENTIAL INVARIANT</span>
        </div>
        <p className="text-ink leading-relaxed">
          No legitimate tax consultant needs to know your secret IRIS password. With Yasmeen & Sons, we prepare and audit the reconciled figures beforehand, and you enter them into your own account session.
        </p>
      </div>

      {/* Steps List */}
      <div className="space-y-6">
        {steps.map((s) => (
          <div key={s.step} className="glass-card p-6 sm:p-7 space-y-4 rounded-[28px] border-rule/80 shadow-sm hover:shadow-md transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-rule-light pb-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-bold text-brass px-2.5 py-0.5 rounded-full bg-brass-subtle border border-brass/30">
                  {s.step}
                </span>
                <div>
                  <h2 className="font-serif text-lg font-bold text-ink">{s.titleEn}</h2>
                  <div className="font-urdu text-xs text-ash" dir="rtl">{s.titleUr}</div>
                </div>
              </div>
              <span className="font-mono text-[10px] text-ash px-2.5 py-0.5 bg-paper rounded-full border border-rule">
                {s.code}
              </span>
            </div>

            <div className="space-y-1 text-xs text-ash leading-relaxed">
              <p>{s.descEn}</p>
              <p className="font-urdu text-ash text-[11px]" dir="rtl">{s.descUr}</p>
            </div>

            <div className="bg-paper-light p-4 rounded-2xl border border-rule-light space-y-2">
              <span className="font-mono text-[10px] font-bold text-ink uppercase tracking-wider block">
                Official Procedure:
              </span>
              <ul className="space-y-1.5 text-xs text-ash font-mono">
                {s.details.map((d, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-iris-teal shrink-0 mt-0.5" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            {s.link && (
              <div className="pt-1">
                <a
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-ink hover:text-brass underline"
                >
                  <span>{s.linkText}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Action Footer */}
      <div className="glass-card border border-rule/80 p-8 rounded-[30px] text-center space-y-4 shadow-sm">
        <h3 className="font-serif text-2xl font-bold text-ink">Ready for Assistance?</h3>
        <p className="text-xs text-ash max-w-md mx-auto leading-relaxed">
          Start your intake in 60 seconds. Our desk prepares your return checklist and guides you through these exact steps.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => appClip.open("tax-intake")}
            className="inline-flex items-center gap-2 bg-ink hover:bg-theme-primary-hover text-paper-light font-mono font-bold text-xs py-3.5 px-7 rounded-full shadow-md transition-all active:scale-95"
          >
            <span>Fast AppClip Intake</span>
            <Sparkles className="w-3.5 h-3.5 text-brass" />
          </button>
          <a
            href="https://wa.me/923120947187?text=Hi%2C%20I%20need%20guidance%20with%20FBR%20IRIS%20Portal."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebd59] text-white font-mono font-bold text-xs py-3.5 px-6 rounded-full shadow-md transition-all active:scale-95"
          >
            <WhatsAppIcon className="w-3.5 h-3.5" />
            <span>Chat on WhatsApp (03120947187)</span>
          </a>
        </div>
      </div>
    </div>
  );
}

