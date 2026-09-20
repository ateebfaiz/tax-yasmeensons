"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppClip } from "@/components/ui/app-clip/AppClipProvider";
import IrisGuideClip from "@/components/clips/IrisGuideClip";
import { WhatsAppIcon } from "@/components/ui/icons/whatsapp-icon";
import { formatWhatsAppUrl } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/config";
import { ExternalLink, KeyRound, UserCheck, ShieldCheck, CheckCircle2, ArrowRight, Laptop, Lock, HelpCircle, Sparkles } from "lucide-react";

export default function IrisGuidePage() {
  const router = useRouter();
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
    <>
      {/* ========================================================
          1. MOBILE VIEWPORT (md:hidden): Frosted Liquid Glass AppClip
          ======================================================== */}
      <div className="block md:hidden">
        <IrisGuideClip onClose={() => router.push("/")} />
      </div>

      {/* ========================================================
          2. DESKTOP VIEWPORT (hidden md:block): Two-Column Layout
          ======================================================== */}
      <div className="hidden md:block max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16 pb-32">
        <div className="grid grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT COLUMN: Sticky Overview & Security */}
          <div className="col-span-5 lg:col-span-4 sticky top-24 space-y-6">
            <div className="space-y-3">
              <div>
                <span className="inline-block font-mono text-[11px] text-brass font-bold tracking-widest uppercase bg-brass/10 border border-brass/30 px-3 py-1 rounded-full">
                  PRACTICE ANNEX A · IRIS PORTAL
                </span>
              </div>

              <h1 className="font-serif text-3xl lg:text-4xl font-black text-ink leading-tight">
                Official IRIS Portal &amp; Account Guide
              </h1>

              <div className="font-urdu text-base font-bold text-apple-blue" dir="rtl">
                آفیشل پورٹل گائیڈ • پاس ورڈ اور پن کی مکمل رازداری
              </div>

              <p className="text-sm text-ash leading-relaxed">
                Everything you need to know about accessing, recovering, and authenticating your personal FBR tax account. You retain full control; our specialists never request your password.
              </p>
            </div>

            {/* Zero-Credential Invariant Card */}
            <div className="p-5 rounded-2xl bg-paper-light border border-rule space-y-2.5 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-apple-blue">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Zero-Credential Invariant</span>
              </div>
              <p className="text-xs text-ash leading-relaxed">
                No legitimate tax consultant needs to know your secret IRIS password. With Yasmeen &amp; Sons, we prepare and audit the reconciled figures beforehand, and you enter them into your own account session.
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

            {/* WhatsApp Assistance */}
            <div className="p-5 rounded-2xl bg-folio border border-rule space-y-3 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink">
                  IRIS Support Desk Online
                </span>
              </div>
              <p className="text-xs text-ash leading-relaxed">
                Stuck on password reset or dual OTP verification? Chat with our specialist directly.
              </p>
              <a
                href={formatWhatsAppUrl("Hi, I need guidance with FBR IRIS Portal.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-full bg-[#25D366] hover:bg-[#1ebd59] text-white font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>WhatsApp Desk ({SITE_CONFIG.contact.whatsappDisplay})</span>
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: 5 Step IRIS Walkthrough */}
          <div className="col-span-7 lg:col-span-8 space-y-6">
            {steps.map((s) => (
              <div key={s.step} className="glass-card p-6 sm:p-8 space-y-4 rounded-3xl border-rule shadow-sm hover:shadow-md transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-rule-light pb-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-brass px-3 py-1 rounded-full bg-brass/15 border border-brass/30">
                      STEP {s.step}
                    </span>
                    <div>
                      <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink">{s.titleEn}</h2>
                      <div className="font-urdu text-sm text-apple-blue" dir="rtl">{s.titleUr}</div>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] text-ash px-2.5 py-0.5 bg-paper rounded-full border border-rule self-start sm:self-auto">
                    {s.code}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs sm:text-sm text-ash leading-relaxed">
                  <p>{s.descEn}</p>
                  <p className="font-urdu text-ash/80 text-xs" dir="rtl">{s.descUr}</p>
                </div>

                <div className="bg-paper-light p-5 rounded-2xl border border-rule-light space-y-2.5">
                  <span className="font-mono text-[11px] font-bold text-ink uppercase tracking-wider block">
                    Official Procedure:
                  </span>
                  <ul className="space-y-2 text-xs text-ash font-mono">
                    {s.details.map((d, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-iris-teal shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{d}</span>
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
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            ))}

            {/* Action Footer */}
            <div className="glass-card border border-rule p-8 rounded-3xl text-center space-y-4 shadow-sm">
              <h3 className="font-serif text-2xl font-bold text-ink">Ready for Assisted Filing?</h3>
              <p className="text-xs sm:text-sm text-ash max-w-md mx-auto leading-relaxed">
                Start your intake in 60 seconds. Our desk prepares your return checklist and guides you through these exact steps.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Link
                  href="/start"
                  className="inline-flex items-center gap-2 bg-ink hover:bg-theme-primary-hover text-paper-light font-mono font-bold text-xs py-3.5 px-7 rounded-full shadow-md transition-all active:scale-95"
                >
                  <span>Start Filing Intake</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={formatWhatsAppUrl("Hi, I need guidance with FBR IRIS Portal.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebd59] text-white font-mono font-bold text-xs py-3.5 px-6 rounded-full shadow-md transition-all active:scale-95"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Chat on WhatsApp ({SITE_CONFIG.contact.whatsappDisplay})</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
