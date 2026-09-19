"use client";

import React from "react";
import Link from "next/link";
import { useAppClip } from "@/components/ui/app-clip/AppClipProvider";
import { BilingualIntakeForm } from "@/components/intake/BilingualIntakeForm";
import {
  ShieldCheck,
  Lock,
  ArrowRight,
  MessageCircle,
  FileCheck,
  CheckCircle2,
  Users,
  Briefcase,
  GraduationCap,
  HeartHandshake,
  HelpCircle,
  ExternalLink,
  Sparkles,
} from "lucide-react";

export default function HomePage() {
  const appClip = useAppClip();

  const personas = [
    {
      id: "salaried",
      titleEn: "Salaried Employees",
      titleUr: "تنخواہ دار ملازمین",
      descEn: "Salary certificates, tax withholding refunds, and tax return filing.",
      descUr: "تنخواہ کی کٹوتی، ریفنڈ اور بروقت ٹیکس گوشوارے جمع کروانا",
      href: "/salaried",
      icon: Briefcase,
    },
    {
      id: "pensioners",
      titleEn: "Senior Citizens & Pensioners",
      titleUr: "بزرگ شہری و پنشنرز",
      descEn: "Pension exemptions, profit on debt tax exemptions, and wealth filings.",
      descUr: "پنشن پر ٹیکس چھوٹ اور قومی بچت اسکیموں پر منافع کا حساب",
      href: "/pensioners",
      icon: HeartHandshake,
    },
    {
      id: "no-income",
      titleEn: "Housewives & Non-Earning",
      titleUr: "گھریلو خواتین و بغیر آمدنی",
      descEn: "Active taxpayer status for bank accounts, asset registration, and family safety.",
      descUr: "بینک اکاؤنٹ اور جائیداد کی آسانی کے لیے ایکٹو فائلر اسٹیٹس",
      href: "/no-income",
      icon: Users,
    },
    {
      id: "students",
      titleEn: "Student Filers",
      titleUr: "طلباء و یوتھ فائلرز",
      descEn: "Advance tax reductions on university fees and international payments.",
      descUr: "یونیورسٹی فیس پر ایڈوانس ٹیکس کٹوتی سے بچاؤ",
      href: "/students",
      icon: GraduationCap,
    },
  ];

  const workflowSteps = [
    { num: "01", en: "Intake & Documents", ur: "دستاویزات کی وصولی", descEn: "Submit your basic info without sending passwords." },
    { num: "02", en: "Tax Reconciliation", ur: "ٹیکس حساب کتاب", descEn: "Our team reconciles salary slips, WHT and wealth records." },
    { num: "03", en: "Return Prepared", ur: "گوشوارہ کی تیاری", descEn: "Structured figures prepared and presented for your verification." },
    { num: "04", en: "Your Pre-Approval", ur: "آپ کی حتمی منظوری", descEn: "You review exact numbers; nothing filed without your consent." },
    { num: "05", en: "Direct IRIS Filing", ur: "آئرس پر فائلنگ", descEn: "You log in to official FBR IRIS; we guide you to final submission." },
    { num: "06", en: "Filer Confirmed", ur: "ایکٹو فائلر تصدیق", descEn: "Return & Wealth Statement moved to Completed Tasks." },
  ];

  const faqs = [
    {
      qEn: "Do I have to provide my FBR/IRIS password?",
      qUr: "کیا مجھے اپنا ایف بی آر پاس ورڈ دینا پڑے گا؟",
      aEn: "Never. Our core security principle is customer-controlled authentication. We prepare and reconcile your return figures, and you log directly into FBR's official portal (iris.fbr.gov.pk) to submit with our guidance.",
      aUr: "ہرگز نہیں! ہمارا بنیادی اصول یہی ہے کہ پاس ورڈ آپ کے پاس رہے۔ ہم آپ کا گوشوارہ تیار کریں گے اور آپ خود ایف بی آر کی آفیشل ویب سائٹ پر لاگ ان ہو کر جمع کروائیں گے۔",
    },
    {
      qEn: "What if I forgot my IRIS password or PIN?",
      qUr: "اگر میں پاس ورڈ یا پن بھول گیا ہوں تو کیا ہوگا؟",
      aEn: "We guide you through the official FBR Forgot Password recovery flow, which sends official verification OTP codes directly to your registered SIM and email.",
      aUr: "ہم آپ کو ایف بی آر کے آفیشل طریقہ کار کے تحت پاس ورڈ ری سیٹ کرنے کی مکمل رہنمائی دیں گے، جس کا کوڈ آپ کے ذاتی موبائل نمبر اور ای میل پر آئے گا۔",
    },
    {
      qEn: "What is the fee for non-business filing?",
      qUr: "ٹیکس فائلنگ کی فیس کیا ہے؟",
      aEn: "Guided Filing is PKR 1,000 where we prepare the figures and checklist for you to submit. Full Filing Assistance is PKR 2,500 with complete screen assistance and reconciliation.",
      aUr: "رہنمائی مع سیلف فائلنگ صرف 1,000 روپے ہے، جبکہ مکمل فائلنگ اسسٹنس 2,500 روپے ہے۔ کوئی پوشیدہ چارجز نہیں ہیں۔",
    },
  ];

  return (
    <div className="space-y-16 md:space-y-24 py-8 md:py-16">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
        {/* Trust Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-theme-primary/10 border border-theme-primary/25 text-theme-primary text-xs font-bold shadow-sm">
          <ShieldCheck className="w-4 h-4" />
          <span>Zero-Credential Architecture • Tax Year 2026</span>
        </div>

        {/* Hero Title */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-theme-text leading-[1.15]">
            Your FBR Password <br className="hidden sm:inline" />
            <span className="text-gradient">Stays With You.</span>
          </h1>
          <p className="text-xl sm:text-2xl font-bold text-theme-primary font-urdu" dir="rtl">
            ہم تیار کریں گے۔ ہم رہنمائی کریں گے۔ پاس ورڈ آپ کے پاس رہے گا۔
          </p>
        </div>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-theme-text-secondary leading-relaxed">
          Transparent, non-business income tax filing assistance for Pakistan. We organize your salary, deductions, and wealth statements without ever asking you to enter your FBR password on our servers.
        </p>

        {/* Hero Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => appClip.open("tax-intake")}
            className="w-full sm:w-auto btn-shimmer inline-flex items-center justify-center gap-2 bg-theme-primary hover:bg-theme-primary-hover text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-theme-primary/25 text-sm transition-all"
          >
            <span>Start Tax Filing (Rs 1,000+)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => appClip.open("whatsapp-intake")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-theme-surface hover:bg-theme-surface-raised border border-theme-border text-theme-text font-bold py-3.5 px-6 rounded-xl text-sm transition-all shadow-sm"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>WhatsApp (03120947187)</span>
          </button>
        </div>

        {/* FBR Direct Verification Badge */}
        <div className="pt-4 flex items-center justify-center gap-2 text-xs text-theme-text-muted">
          <Lock className="w-3.5 h-3.5 text-theme-primary" />
          <span>Official Submission Gateway:</span>
          <a
            href="https://iris.fbr.gov.pk/infosys/public/txplogin.xhtml"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-theme-primary hover:underline inline-flex items-center gap-0.5"
          >
            <span>iris.fbr.gov.pk</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </section>

      {/* Target Personas Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-theme-text">Tailored for Individuals</h2>
          <p className="text-xs sm:text-sm text-theme-text-secondary">
            Exclusively built for non-business filers. Zero corporate jargon, zero complex commercial books.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {personas.map((p) => {
            const Icon = p.icon;
            return (
              <Link
                key={p.id}
                href={p.href}
                className="glass-card p-5 hover:border-theme-primary/50 transition-all group flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-theme-primary/10 text-theme-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm text-theme-text group-hover:text-theme-primary transition-colors">
                      {p.titleEn}
                    </h3>
                    <div className="text-xs font-semibold text-theme-primary font-urdu" dir="rtl">
                      {p.titleUr}
                    </div>
                  </div>
                  <p className="text-xs text-theme-text-secondary leading-relaxed">{p.descEn}</p>
                </div>
                <div className="text-xs font-bold text-theme-primary flex items-center gap-1 pt-2 border-t border-theme-border/40">
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Transparent Pricing Table */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-2">
          <div className="text-xs font-bold text-theme-primary uppercase tracking-wider">Transparent Fees</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-theme-text">Simple, Honest Pricing</h2>
          <p className="text-xs text-theme-text-secondary">
            Final price confirmed upfront after document review. No surprises or arbitrary hikes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tier 1 */}
          <div className="glass-card p-6 flex flex-col justify-between space-y-6 relative border-theme-border">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-theme-primary uppercase tracking-wider">Self-Filer</span>
                <h3 className="text-xl font-bold text-theme-text">Guided Filing</h3>
                <div className="text-xs font-urdu text-theme-primary" dir="rtl">خود فائل کریں مع رہنمائی</div>
              </div>
              <div className="text-3xl font-extrabold text-theme-text">
                PKR 1,000 <span className="text-xs font-normal text-theme-text-muted">/ return</span>
              </div>
              <ul className="space-y-2.5 text-xs text-theme-text-secondary">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-theme-success shrink-0" />
                  <span>Document check & tax calculation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-theme-success shrink-0" />
                  <span>Step-by-step IRIS filing figures</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-theme-success shrink-0" />
                  <span>Customer files independently</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-theme-success shrink-0" />
                  <span>Zero password sharing needed</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => appClip.open("tax-intake", { defaultTier: "guided_1000" })}
              className="w-full py-2.5 px-4 rounded-xl border border-theme-border bg-theme-surface hover:bg-theme-surface-raised font-bold text-xs text-theme-text transition-all"
            >
              Choose Guided (Rs 1,000)
            </button>
          </div>

          {/* Tier 2: Recommended */}
          <div className="glass-card p-6 flex flex-col justify-between space-y-6 relative border-theme-primary ring-2 ring-theme-primary/30 shadow-xl">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-theme-primary text-white text-[10px] font-bold uppercase tracking-wider">
              Most Popular / مقبول ترین
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-theme-primary uppercase tracking-wider">Assisted</span>
                <h3 className="text-xl font-bold text-theme-text">Filing Assistance</h3>
                <div className="text-xs font-urdu text-theme-primary" dir="rtl">مکمل فائلنگ اسسٹنس</div>
              </div>
              <div className="text-3xl font-extrabold text-theme-text">
                PKR 2,500 <span className="text-xs font-normal text-theme-text-muted">/ return</span>
              </div>
              <ul className="space-y-2.5 text-xs text-theme-text-secondary">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-theme-success shrink-0" />
                  <span>Full return & wealth reconciliation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-theme-success shrink-0" />
                  <span>Withholding tax refund optimization</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-theme-success shrink-0" />
                  <span>IRIS screen-by-screen assistance</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-theme-success shrink-0" />
                  <span>Customer review & approval gate</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => appClip.open("tax-intake", { defaultTier: "assistance_2500" })}
              className="btn-shimmer w-full py-3 px-4 rounded-xl bg-theme-primary hover:bg-theme-primary-hover text-white font-bold text-xs shadow-md transition-all"
            >
              Choose Assistance (Rs 2,500)
            </button>
          </div>

          {/* Tier 3: Complex */}
          <div className="glass-card p-6 flex flex-col justify-between space-y-6 relative border-theme-border">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-theme-text-muted uppercase tracking-wider">Complex</span>
                <h3 className="text-xl font-bold text-theme-text">Complex Review</h3>
                <div className="text-xs font-urdu text-theme-primary" dir="rtl">پیچیدہ ریٹرن جائزہ</div>
              </div>
              <div className="text-3xl font-extrabold text-theme-text">
                PKR 4,500+ <span className="text-xs font-normal text-theme-text-muted">/ case</span>
              </div>
              <ul className="space-y-2.5 text-xs text-theme-text-secondary">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-theme-success shrink-0" />
                  <span>Multiple bank accounts & foreign assets</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-theme-success shrink-0" />
                  <span>Prior year unfiled reconciliation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-theme-success shrink-0" />
                  <span>Capital gain / property transaction audit</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-theme-success shrink-0" />
                  <span>Dedicated senior tax specialist</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => appClip.open("tax-intake", { defaultTier: "complex_5000" })}
              className="w-full py-2.5 px-4 rounded-xl border border-theme-border bg-theme-surface hover:bg-theme-surface-raised font-bold text-xs text-theme-text transition-all"
            >
              Consult Complex Case
            </button>
          </div>
        </div>
      </section>

      {/* 6-Step Workflow */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-theme-text">How It Works</h2>
          <p className="text-xs sm:text-sm text-theme-text-secondary">
            Structured filing workflow with mandatory customer pre-approval before anything is filed.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {workflowSteps.map((step) => (
            <div key={step.num} className="glass-card p-5 space-y-2.5 border-theme-border/60">
              <div className="text-2xl font-black font-mono text-theme-primary/40">{step.num}</div>
              <div className="space-y-0.5">
                <h3 className="font-bold text-sm text-theme-text">{step.en}</h3>
                <div className="text-xs font-semibold text-theme-primary font-urdu" dir="rtl">{step.ur}</div>
              </div>
              <p className="text-xs text-theme-text-secondary leading-relaxed">{step.descEn}</p>
            </div>
          ))}
        </div>
      </section>

      {/* On-Page Intake Section (Desktop / Mobile Direct) */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="glass-card p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-theme-text">Start Your Filing Today</h2>
            <p className="text-xs sm:text-sm text-theme-text-secondary">
              Fill out your details below. You will receive an instant Case Reference and direct WhatsApp confirmation.
            </p>
            <p className="text-xs font-urdu text-theme-primary font-semibold" dir="rtl">
              براہ کرم اپنی تفصیلات درج کریں اور فوری رہنمائی حاصل کریں۔
            </p>
          </div>

          <BilingualIntakeForm defaultPersona="salaried" />
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-theme-text">Frequently Asked Questions</h2>
          <p className="text-xs text-theme-text-secondary font-urdu" dir="rtl">
            اکثر پوچھے گئے سوالات و جوابات
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="glass-card p-5 space-y-2">
              <div className="space-y-0.5">
                <h3 className="text-sm font-bold text-theme-text">{faq.qEn}</h3>
                <div className="text-xs font-semibold text-theme-primary font-urdu" dir="rtl">{faq.qUr}</div>
              </div>
              <p className="text-xs text-theme-text-secondary leading-relaxed pt-1 border-t border-theme-border/40">
                {faq.aEn}
              </p>
              <p className="text-[11px] font-urdu text-theme-text-muted leading-relaxed" dir="rtl">
                {faq.aUr}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
