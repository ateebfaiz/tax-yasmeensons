"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/language-context";
import { useAppClip } from "@/components/ui/app-clip/AppClipProvider";
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Briefcase,
  HeartHandshake,
  Users,
  GraduationCap,
  FileText,
  Sparkles,
  Star,
  Clock,
  AlertTriangle,
  Award,
  Lock,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/icons/whatsapp-icon";
import { TaxDynamicIsland } from "@/components/ui/tax-dynamic-island";
import AnimatedTabs from "@/components/smoothui/animated-tabs";
import { formatWhatsAppUrl } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/config";

export default function HomePage() {
  const { isUrdu } = useLanguage();
  const appClip = useAppClip();
  const [pricingCategory, setPricingCategory] = React.useState<string>("all");

  const personas = [
    {
      code: "SAL",
      titleEn: "Salaried Employees",
      titleUr: "تنخواہ دار ملازمین",
      descEn: "Monthly tax deduction reconciliation (s.149), salary slips, and ATL status.",
      descUr: "تنخواہ سے کٹوتی، سیلری سلپس اور ودہولڈنگ ٹیکس ریفنڈ کا حساب",
      href: "/salaried",
      icon: Briefcase,
    },
    {
      code: "PEN",
      titleEn: "Senior & Pensioners",
      titleUr: "بزرگ شہری و پنشنرز",
      descEn: "Pension income tax exemption filing and National Savings/Behbood profits.",
      descUr: "پنشن پر مکمل ٹیکس چھوٹ اور قومی بچت اسکیموں پر منافع کا اندراج",
      href: "/pensioners",
      icon: HeartHandshake,
    },
    {
      code: "HIF",
      titleEn: "Housewife / Non-Earning",
      titleUr: "گھریلو خواتین و نان ارننگ",
      descEn: "Active taxpayer status to protect bank transactions and property transfers.",
      descUr: "بینک ٹرانزیکشنز اور جائیداد کی منتقلی کے لیے ایکٹو فائلر رجسٹریشن",
      href: "/no-income",
      icon: Users,
    },
    {
      code: "STU",
      titleEn: "Student Filers",
      titleUr: "طلباء و یوتھ فائلرز",
      descEn: "Eliminate advance withholding tax on university fees (s.236I) and open accounts.",
      descUr: "یونیورسٹی فیس پر ایڈوانس ٹیکس کٹوتی سے بچاؤ اور اسٹوڈنٹ اکاؤنٹس",
      href: "/students",
      icon: GraduationCap,
    },
  ];



  const fourSteps = [
    {
      num: "01",
      code: "DOCS",
      titleEn: "Select Category & Papers",
      titleUr: "صنف اور کاغذات منتخب کریں",
      descEn: "Choose salaried, pensioner, housewife, or student. Upload slips or certificates.",
    },
    {
      num: "02",
      code: "8-CLIP",
      titleEn: "Simplified e-Return",
      titleUr: "سادہ ڈیجیٹل ونڈوز",
      descEn: "Fill FBR 8-Window non-business form tailored exclusively to your income sources.",
    },
    {
      num: "03",
      code: "RECON",
      titleEn: "Wealth Balanced to 0.00",
      titleUr: "دولت کا گوشوارہ متوازن",
      descEn: "Zero-gap s.116 reconciliation matching income, assets, and living expenses.",
    },
    {
      num: "04",
      code: "IRIS",
      titleEn: "Official IRIS Submission",
      titleUr: "آفیشل آئرس پر حتمی سبمشن",
      descEn: "You sign into official iris.fbr.gov.pk with screen guidance; Active ATL guaranteed.",
    },
  ];

  const trustBadges = [
    { icon: Lock, title: "Zero Password Sharing", desc: "You log in privately on IRIS" },
    { icon: Award, title: "FBR SRO 1561 Ready", desc: "Simplified 8-Window pattern" },
    { icon: ShieldCheck, title: "Active ATL Guaranteed", desc: "100% tax penalty immunity" },
    { icon: Clock, title: "Zero-Gap Wealth (s.116)", desc: "Reconciled to exact 0.00" },
  ];

  const customerReviews = [
    {
      name: "Tariq Mehmood",
      role: "Corporate Salaried Executive",
      city: "Lahore",
      rating: 5,
      comment:
        "The fastest tax filing I've experienced in 8 years. Never asked for my Iris password. Reconciled my salary tax deduction and telecom WHT in 10 minutes!",
      ref: "YS-26-44819",
    },
    {
      name: "Col. (R) Farooq Ahmed",
      role: "Pensioner & Senior Citizen",
      city: "Rawalpindi",
      rating: 5,
      comment:
        "Handled my armed forces pension exemption and Behbood Certificate profit correctly. My name is actively reflecting on the ATL list with zero hassle.",
      ref: "YS-26-89104",
    },
    {
      name: "Fatima Noor",
      role: "Housewife (Asset Filer)",
      city: "Karachi",
      rating: 5,
      comment:
        "Very respectful and patient. Helped me declare household allowance without confusing legal jargon. Banking transactions are now free from double tax!",
      ref: "YS-26-31920",
    },
    {
      name: "Saad Hashmi",
      role: "Remote Software Developer",
      city: "Islamabad",
      rating: 5,
      comment:
        "Clean glass interface on mobile. FBR 8-window wizard auto-calculated my foreign remittance PRC details and wealth balance smoothly.",
      ref: "YS-26-72811",
    },
  ];

  const faqs = [
    {
      qEn: "What is the filing deadline for Tax Year 2026?",
      qUr: "مالی سال 2026 کا گوشوارہ جمع کروانے کی آخری تاریخ کیا ہے؟",
      aEn: "For salaried and non-business individuals, the annual deadline is September 30, 2026. Early filing guarantees your name remains on the Active Taxpayer List (ATL) without paying late surcharge penalties.",
      aUr: "تنخواہ دار اور انفرادی افراد کے لیے آخری تاریخ 30 ستمبر 2026 ہے۔ بروقت فائلنگ سے آپ کا نام ایکٹو ٹیکس پیئر لسٹ میں برقرار رہتا ہے۔",
    },
    {
      qEn: "Do you ever ask for my official FBR/IRIS password?",
      qUr: "کیا آپ مجھ سے میرا ایف بی آر پاس ورڈ مانگیں گے؟",
      aEn: "Never. We enforce customer-controlled authentication. We prepare, calculate, and reconcile your numbers, and you sign into the official portal (iris.fbr.gov.pk) yourself while we assist you.",
      aUr: "ہرگز نہیں! پاس ورڈ آپ کے پاس رہتا ہے۔ ہم مکمل گوشوارہ تیار کر کے آپ کو دیتے ہیں اور آپ خود آفیشل پورٹل پر لاگ ان ہو کر جمع کرتے ہیں۔",
    },
    {
      qEn: "Why should a housewife or non-earning person file a return?",
      qUr: "گھریلو خواتین یا جن کی آمدنی نہیں ہے وہ فائلر کیوں بنیں؟",
      aEn: "In Pakistan, non-filers pay up to 200% higher withholding tax on bank cash withdrawals, purchasing property, or registering vehicles. Filing a zero-tax return with household maintenance legally grants you Active Filer status.",
      aUr: "نان فائلر ہونے کی صورت میں بینک ٹرانزیکشنز اور جائیداد کی خریداری پر دوگنا ٹیکس کٹتا ہے۔ گھریلو کفالت ظاہر کر کے آپ قانونی طور پر ایکٹو فائلر بن سکتے ہیں۔",
    },
    {
      qEn: "Can I do the entire process over WhatsApp?",
      qUr: "کیا پورا عمل واٹس ایپ پر مکمل ہو سکتا ہے؟",
      aEn: `Yes. Once you start or choose WhatsApp handoff, our filing operator connects directly with you on ${SITE_CONFIG.contact.whatsappDisplay} with your Case ID, collects document photos, and sends you the step-by-step numbers.`,
      aUr: `جی ہاں! کیس نمبر بننے کے بعد ہمارا نمائندہ ${SITE_CONFIG.contact.whatsappDisplay} پر واٹس ایپ کے ذریعے تمام تفصیلات اور رہنمائی فراہم کرتا ہے۔`,
    },
    {
      qEn: "How long does it take for my ATL status to become Active?",
      qUr: "ایکٹو ٹیکس پیئر لسٹ (ATL) میں نام کب تک فعال ہوتا ہے؟",
      aEn: "FBR updates the ATL registry every Sunday night / Monday morning. Once your return is submitted and approved before the due date, your status reflects automatically.",
      aUr: "ایف بی آر ہر اتوار کی رات سسٹم اپ ڈیٹ کرتا ہے اور پیر کی صبح تک نام ایکٹو ٹیکس پیئر لسٹ میں شامل ہو جاتا ہے۔",
    },
    {
      qEn: "What pushes a case into the Complex (PKR 4,500+) tier?",
      qUr: "پیچیدہ کیس (4,500+ روپے) میں کون سی صورتیں شامل ہیں؟",
      aEn: "Cases involving multiple bank accounts with heavy turnover, unfiled prior tax years requiring wealth reconstruction, section 111 asset reconciliation, or property sale/purchase audits.",
      aUr: "ایک سے زائد سالوں کے پرانے گوشوارے، پراپرٹی یا گاڑیوں کی خرید و فروخت، یا بیرونی ترسیلات کے مفصل آڈٹ والے کیسز۔",
    },
  ];

  return (
    <div className="space-y-16 md:space-y-24 py-8 md:py-16">
      {/* 1. Hero Section — Lead with the Job */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-7">
        {/* Tax Season 2026 — mobile uses a short no-wrap line; desktop the full line */}
        <div className="w-full max-w-full flex justify-center px-2">
          <div className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-black/10 dark:border-white/15 bg-white dark:bg-black px-3 py-1.5 text-[11px] sm:text-xs font-rounded font-medium text-black dark:text-white">
            <Sparkles className="w-3.5 h-3.5 text-apple-blue shrink-0" />
            <span className="sm:hidden whitespace-nowrap truncate">Tax Season 2026 · ATL Open</span>
            <span className="hidden sm:inline whitespace-nowrap">Tax Season 2026 is Here! Active ATL Filing Open</span>
          </div>
        </div>

        {/* Dynamic Island: Active Live Desk & AppClip Controller */}
        <div className="flex justify-center pb-1">
          <TaxDynamicIsland />
        </div>

        {/* Hero Title */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold text-ink tracking-tight leading-[1.2]">
            <span>File your Tax Year 2026 return </span>
            <span className="italic text-apple-blue font-bold whitespace-nowrap">— from PKR 1,000</span>
          </h1>

          {isUrdu ? (
            <p className="font-urdu text-xl sm:text-2xl font-bold text-ink dark:text-white leading-relaxed" dir="rtl">
              ہم تیار کریں گے۔ آپ آفیشل آئرس پر خود لاگ ان کر کے فائل کریں گے۔
            </p>
          ) : (
            <p className="text-base sm:text-lg text-ash max-w-3xl mx-auto leading-relaxed">
              We prepare the figures and reconcile your wealth statement to exact 0.00. You log into official FBR IRIS yourself. <strong className="text-ink dark:text-white">We never take your password.</strong>
            </p>
          )}
        </div>

        {/* Trust Badges Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 text-left">
          {trustBadges.map((b, i) => {
            const Icon = b.icon;
            return (
              <div
                key={i}
                className="p-3 rounded-2xl bg-white/40 dark:bg-[#1c1c1e]/80 border border-white/10 dark:border-white/[0.08] backdrop-blur-md space-y-1 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-apple-blue" />
                  <span className="font-bold text-xs text-ink dark:text-white">{b.title}</span>
                </div>
                <p className="text-[11px] text-ash truncate">{b.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Pricing Story Highlight */}
        <div className="inline-block bg-brass-subtle border border-brass/40 px-4 py-2 rounded-full font-mono text-xs text-ink shadow-sm">
          Most clients choose: <strong className="text-apple-blue font-bold">FA-2500 Complete Assistance (PKR 2,500)</strong>
        </div>

        {/* CTAs with Dual Viewport Separation */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          {/* Primary CTA (Desktop: /start, Mobile: FBR 8-Window AppClip) */}
          <button
            type="button"
            onClick={() => appClip.open("fbr-simplified-intake")}
            className="md:hidden w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-apple-blue hover:bg-apple-blue/90 text-white font-semibold py-3.5 px-8 rounded-full text-[17px] shadow-sm transition-all active:scale-95 whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>Start FBR 8-Window Return</span>
          </button>

          <Link
            href="/start"
            className="hidden md:inline-flex items-center justify-center gap-2 bg-apple-blue hover:bg-apple-blue/90 text-white font-semibold py-3.5 px-8 rounded-full text-[17px] shadow-sm transition-all active:scale-95 whitespace-nowrap"
          >
            <span>Start Filing (Part 01 / 04)</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </Link>

          {/* Track Filing Progress Link */}
          <Link
            href="/track"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/60 dark:bg-white/[0.06] backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.12] text-ink dark:text-white font-bold py-3.5 px-6 rounded-full text-sm shadow-sm hover:border-apple-blue transition-all active:scale-95 whitespace-nowrap"
          >
            <span>Track Case Status (/track)</span>
          </Link>

          {/* Checklist Button */}
          <button
            type="button"
            onClick={() => appClip.open("tax-checklist")}
            className="md:hidden w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/60 dark:bg-white/[0.06] backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.12] text-ink dark:text-white font-bold py-3.5 px-6 rounded-full text-sm transition-all active:scale-95 shadow-sm whitespace-nowrap"
          >
            <FileText className="w-4 h-4 text-apple-blue shrink-0" />
            <span>Docs Checklist</span>
          </button>

          <Link
            href="/requirements"
            className="hidden md:inline-flex items-center justify-center gap-2 bg-white/70 dark:bg-white/[0.06] backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.12] hover:border-apple-blue text-ink dark:text-white font-bold py-3.5 px-6 rounded-full text-sm shadow-sm transition-all active:scale-95 whitespace-nowrap"
          >
            <FileText className="w-4 h-4 text-apple-blue shrink-0" />
            <span>Required Documents</span>
          </Link>
        </div>

        {/* Mobile Frosted Quick Tray (AppClips) */}
        <div className="md:hidden pt-2 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-[11px] font-mono text-ash uppercase tracking-wider font-semibold whitespace-nowrap">
            Quick Clips:
          </span>
          <button
            type="button"
            onClick={() => appClip.open("fbr-simplified-intake")}
            className="px-3.5 py-1.5 rounded-full bg-apple-blue/15 border border-apple-blue/40 text-apple-blue font-bold transition-all shadow-sm flex items-center gap-1.5 active:scale-95 whitespace-nowrap"
          >
            <span>⚡ FBR Simplified Return</span>
          </button>
          <button
            type="button"
            onClick={() => appClip.open("tax-checklist")}
            className="px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-[#1c1c1e]/75 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.12] text-ink dark:text-white font-medium transition-all shadow-sm flex items-center gap-1.5 active:scale-95 whitespace-nowrap"
          >
            <span>📋 Documents Needed</span>
          </button>
          <button
            type="button"
            onClick={() => appClip.open("whatsapp-intake")}
            className="px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-[#1c1c1e]/75 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.12] text-ink dark:text-white font-medium transition-all shadow-sm flex items-center gap-1.5 active:scale-95 whitespace-nowrap"
          >
            <span className="text-[#25D366]">💬 WhatsApp File</span>
          </button>
          <button
            type="button"
            onClick={() => appClip.open("iris-guide")}
            className="px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-[#1c1c1e]/75 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.12] text-ink dark:text-white font-medium transition-all shadow-sm flex items-center gap-1.5 active:scale-95 whitespace-nowrap"
          >
            <span>🛡️ IRIS Password Guide</span>
          </button>
        </div>

        {/* Desktop Quick Portals */}
        <div className="hidden md:flex pt-2 flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-[11px] font-mono text-ash uppercase tracking-wider font-semibold whitespace-nowrap">
            Portals:
          </span>
          <Link
            href="/requirements"
            className="px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-[#1c1c1e]/75 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.12] hover:border-apple-blue text-ink dark:text-white font-medium transition-all shadow-sm hover:shadow-md flex items-center gap-1.5 active:scale-95 whitespace-nowrap"
          >
            <span>📋 Document Checklist</span>
          </Link>
          <a
            href={formatWhatsAppUrl("Hi, I want to file my Tax Year 2026 return.")}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-[#1c1c1e]/75 backdrop-blur-md border border-[#25D366]/40 hover:border-[#25D366] text-ink dark:text-white font-medium transition-all shadow-sm hover:shadow-md flex items-center gap-1.5 active:scale-95 whitespace-nowrap"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
            <span className="text-[#25D366]">{SITE_CONFIG.contact.whatsappDisplay} (WhatsApp Desk)</span>
          </a>
          <Link
            href="/iris-guide"
            className="px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-[#1c1c1e]/75 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.12] hover:border-apple-blue text-ink dark:text-white font-medium transition-all shadow-sm hover:shadow-md flex items-center gap-1.5 active:scale-95 whitespace-nowrap"
          >
            <span>🛡️ IRIS Security Walkthrough</span>
          </Link>
        </div>

        {/* Stamp & Official Link */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs font-mono">
          <span className="stamp-box px-3 py-1 rounded-full text-[10px]">
            PASSWORD NEVER COLLECTED AT INTAKE
          </span>
          <span className="text-ash opacity-40 hidden sm:inline">·</span>
          <a
            href="https://iris.fbr.gov.pk/infosys/public/txplogin.xhtml"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ash hover:text-ink dark:hover:text-white underline flex items-center gap-0.5"
          >
            <span>Official portal: iris.fbr.gov.pk</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </section>

      {/* Urgency Deadline Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-amber-500/15 via-red-500/10 to-transparent border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-xs sm:text-sm text-ink dark:text-white">
                Don&apos;t Miss the Deadline! Protect Your Active Taxpayer (ATL) Status
              </div>
              <p className="text-[11px] text-ash leading-snug">
                Non-filers face up to 100% higher tax deductions on banking transactions, ATM cash withdrawals, and property transfers.
              </p>
            </div>
          </div>
          <Link
            href="/start"
            className="px-5 py-2 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-mono font-bold text-xs whitespace-nowrap active:scale-95 transition-all shadow"
          >
            File Now Before Cut-Off →
          </Link>
        </div>
      </section>

      {/* 2. Audience Profiles — Clean Folio Cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="border-b border-rule pb-2 flex items-baseline justify-between">
          <div>
            <span className="font-mono text-[10px] text-ash tracking-widest uppercase">SECTION A</span>
            <h2 className="font-serif text-2xl font-bold text-ink dark:text-white">Individual Tax Categories</h2>
          </div>
          <span className="font-mono text-xs text-ash">NON-BUSINESS ONLY</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {personas.map((p) => {
            const Icon = p.icon;
            return (
              <Link
                key={p.code}
                href={p.href}
                className="glass-card p-6 rounded-[24px] hover:border-apple-blue/50 transition-colors group flex flex-col justify-between space-y-4 h-full"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-apple-blue px-2 py-0.5 rounded-full bg-apple-blue/10 border border-apple-blue/30">
                      {p.code}
                    </span>
                    <Icon className="w-4 h-4 text-ash group-hover:text-ink dark:group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-ink dark:text-white group-hover:text-apple-blue transition-colors">
                      {p.titleEn}
                    </h3>
                    <div className="font-urdu text-xs text-ash mt-0.5" dir="rtl">{p.titleUr}</div>
                  </div>
                  <p className="text-xs text-ash leading-relaxed">{p.descEn}</p>
                </div>
                <div className="font-mono text-[11px] font-bold text-ink dark:text-white flex items-center gap-1 pt-3 border-t border-rule-light group-hover:text-apple-blue">
                  <span>Start as {p.code}</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. Pricing Folio Lines — Honest & Clear */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="border-b border-rule pb-2 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <span className="font-mono text-[10px] text-ash tracking-widest uppercase">SECTION B</span>
            <h2 className="font-serif text-2xl font-bold text-ink dark:text-white">Fee Schedule &amp; Packages</h2>
          </div>
          <span className="font-mono text-xs text-ash">NO HIDDEN CHARGES · 100% TRANSPARENT</span>
        </div>

        {/* SmoothUI Animated Tabs */}
        <div className="flex justify-center pt-2 overflow-x-auto pb-1 no-scrollbar">
          <AnimatedTabs
            variant="pill"
            activeTab={pricingCategory}
            onChange={setPricingCategory}
            tabs={[
              { id: "all", label: "All Packages" },
              { id: "standard", label: "Individual Filers" },
              { id: "complex", label: "Past Years / Special" },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Guided Filing */}
          <div className={`glass-card p-6 sm:p-7 rounded-[28px] flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md transition-all ${
            pricingCategory === "complex" ? "opacity-40 scale-[0.98]" : "opacity-100"
          }`}>
            <div className="space-y-4">
              <div className="border-b border-rule pb-3">
                <span className="font-mono text-[10px] font-bold text-ash tracking-widest">CODE: GF-1000</span>
                <h3 className="font-serif text-xl font-bold text-ink dark:text-white">Guided Filing</h3>
                <div className="font-urdu text-xs text-ash" dir="rtl">رہنمائی مع سیلف فائلنگ</div>
              </div>
              <div className="font-serif text-3xl font-black text-ink dark:text-white">
                PKR 1,000
              </div>
              <p className="text-xs text-ash leading-relaxed">
                For taxpayers who want to submit themselves. We audit your salary/bills, calculate your figures, and provide a field-by-field checklist.
              </p>
              <ul className="space-y-2 text-xs text-ash font-mono pt-2 border-t border-rule-light">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-apple-blue shrink-0" />
                  <span>Document check &amp; tax calculation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-apple-blue shrink-0" />
                  <span>Field-by-field IRIS checklist</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-apple-blue shrink-0" />
                  <span>Zero password shared</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => appClip.open("tax-intake", { defaultTier: "guided_1000" })}
                className="md:hidden w-full py-3.5 text-center rounded-full bg-paper hover:bg-paper-light dark:bg-white/[0.04] dark:hover:bg-white/[0.08] border border-rule font-bold text-xs text-ink dark:text-white transition-all font-mono active:scale-95 shadow-sm"
              >
                Select GF-1000 (PKR 1,000)
              </button>

              <Link
                href="/start?tier=guided_1000"
                className="hidden md:flex w-full py-3.5 items-center justify-center text-center rounded-full bg-paper hover:bg-paper-light dark:bg-white/[0.04] dark:hover:bg-white/[0.08] border border-rule font-bold text-xs text-ink dark:text-white transition-all font-mono active:scale-95 shadow-sm"
              >
                Select GF-1000 (PKR 1,000)
              </Link>
            </div>
          </div>

          {/* Complete Assistance — Recommended */}
          <div className={`glass-card-featured p-6 sm:p-7 rounded-[30px] flex flex-col justify-between space-y-6 relative shadow-lg transition-all ${
            pricingCategory === "complex" ? "opacity-40 scale-[0.98]" : "opacity-100 ring-2 ring-apple-blue/50"
          }`}>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-apple-blue text-white font-mono text-[10px] font-bold uppercase tracking-wider shadow-sm">
              Most Selected · تجویز کردہ
            </div>
            <div className="space-y-4">
              <div className="border-b border-rule pb-3">
                <span className="font-mono text-[10px] font-bold text-apple-blue tracking-widest">CODE: FA-2500</span>
                <h3 className="font-serif text-xl font-bold text-ink dark:text-white">Complete Assistance</h3>
                <div className="font-urdu text-xs text-ash" dir="rtl">مکمل فائلنگ اسسٹنس</div>
              </div>
              <div className="font-serif text-3xl font-black text-ink dark:text-white">
                PKR 2,500
              </div>
              <p className="text-xs text-ash leading-relaxed">
                Full-service facilitation. We reconcile your return, wealth statement (s.116) to 0.00, and WHT credits, guide you screen-by-screen, and verify ATL.
              </p>
              <ul className="space-y-2 text-xs text-ash font-mono pt-2 border-t border-rule-light">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-apple-blue shrink-0" />
                  <span>Full return + s.116 wealth balance</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-apple-blue shrink-0" />
                  <span>WHT credit adjustment audit</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-apple-blue shrink-0" />
                  <span>Mandatory client pre-approval summary</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => appClip.open("tax-intake", { defaultTier: "assistance_2500" })}
                className="md:hidden w-full py-3.5 text-center rounded-full bg-gradient-to-r from-palette-coral to-apple-blue font-bold text-xs text-white shadow-md transition-all font-mono active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Select FA-2500 (PKR 2,500)</span>
                <Sparkles className="w-3.5 h-3.5" />
              </button>

              <Link
                href="/start?tier=assistance_2500"
                className="hidden md:flex w-full py-3.5 items-center justify-center text-center rounded-full bg-gradient-to-r from-palette-coral to-apple-blue font-bold text-xs text-white shadow-md transition-all font-mono active:scale-95 gap-2"
              >
                <span>Select FA-2500 (PKR 2,500)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Complex Review */}
          <div className={`glass-card p-6 sm:p-7 rounded-[28px] flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md transition-all ${
            pricingCategory === "standard" ? "opacity-40 scale-[0.98]" : pricingCategory === "complex" ? "opacity-100 ring-2 ring-brass" : "opacity-100"
          }`}>
            <div className="space-y-4">
              <div className="border-b border-rule pb-3">
                <span className="font-mono text-[10px] font-bold text-ash tracking-widest">CODE: CX-4500</span>
                <h3 className="font-serif text-xl font-bold text-ink dark:text-white">Complex Review</h3>
                <div className="font-urdu text-xs text-ash" dir="rtl">پیچیدہ ریٹرن جائزہ</div>
              </div>
              <div className="font-serif text-3xl font-black text-ink dark:text-white">
                PKR 4,500+
              </div>
              <p className="text-xs text-ash leading-relaxed">
                For multi-bank reconciliation, prior unfiled years, foreign remittances, or capital gains on property and stocks. Quoted after document review.
              </p>
              <ul className="space-y-2 text-xs text-ash font-mono pt-2 border-t border-rule-light">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-apple-blue shrink-0" />
                  <span>Prior unfiled years reconciliation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-apple-blue shrink-0" />
                  <span>s.111 asset transactions</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-apple-blue shrink-0" />
                  <span>Final fee confirmed after review</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => appClip.open("whatsapp-intake", { defaultTier: "complex_5000" })}
                className="md:hidden w-full py-3.5 text-center rounded-full border border-[#25D366]/40 bg-[#25D366]/10 font-bold text-xs text-[#25D366] transition-all font-mono active:scale-95 shadow-sm flex items-center justify-center gap-2"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                <span>Consult CX-4500 (WhatsApp)</span>
              </button>

              <a
                href={formatWhatsAppUrl("Hi, I have a Complex Return (CX-4500) case for Tax Year 2026.")}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex w-full py-3.5 items-center justify-center rounded-full border border-[#25D366]/40 bg-[#25D366]/10 font-bold text-xs text-[#25D366] transition-all font-mono active:scale-95 shadow-sm gap-2"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                <span>Consult CX-4500 (WhatsApp)</span>
              </a>

              <Link
                href="/start?tier=complex_5000"
                className="block text-center text-[11px] font-mono text-ash hover:text-ink dark:hover:text-white underline"
              >
                Or open full page wizard →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. The 4-Step Process */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="border-b border-rule pb-2 flex items-baseline justify-between">
          <div>
            <span className="font-mono text-[10px] text-ash tracking-widest uppercase">SECTION C</span>
            <h2 className="font-serif text-2xl font-bold text-ink dark:text-white">Filing Workflow</h2>
          </div>
          <span className="font-mono text-xs text-ash">4 STEPS TO COMPLETED TASK</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {fourSteps.map((s) => (
            <div key={s.num} className="glass-card p-6 rounded-[24px] space-y-2.5 relative border-rule/70 shadow-sm">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="font-bold text-apple-blue">{s.num}</span>
                <span className="text-[10px] text-ash px-2 py-0.5 bg-paper-light dark:bg-white/10 border border-rule rounded-full">{s.code}</span>
              </div>
              <div>
                <h3 className="font-bold text-sm text-ink dark:text-white">{s.titleEn}</h3>
                <div className="font-urdu text-xs text-ash mt-0.5" dir="rtl">{s.titleUr}</div>
              </div>
              <p className="text-xs text-ash leading-relaxed">{s.descEn}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Customer Reviews Showcase */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="border-b border-rule pb-2 flex items-baseline justify-between">
          <div>
            <span className="font-mono text-[10px] text-ash tracking-widest uppercase">SECTION D</span>
            <h2 className="font-serif text-2xl font-bold text-ink dark:text-white">What Our Filers Say</h2>
          </div>
          <span className="font-mono text-xs text-apple-blue">VERIFIED REVIEWS</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {customerReviews.map((rev, i) => (
            <div
              key={i}
              className="p-5 rounded-3xl bg-white/45 dark:bg-[#1c1c1e]/70 border border-white/10 backdrop-blur-xl space-y-3 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs sm:text-sm text-ink dark:text-white">
                    {rev.name}
                  </div>
                  <div className="text-[11px] text-ash">
                    {rev.role} · {rev.city}
                  </div>
                </div>
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(rev.rating)].map((_, idx) => (
                    <Star key={idx} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
              </div>

              <p className="text-xs text-ash leading-relaxed italic">
                &ldquo;{rev.comment}&rdquo;
              </p>

              <div className="font-mono text-[10px] text-apple-blue pt-1 border-t border-white/[0.08] flex items-center justify-between">
                <span>Verified Case: {rev.ref}</span>
                <span className="text-emerald-400">Active ATL ✓</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Comprehensive FAQs */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="border-b border-rule pb-2 flex items-baseline justify-between">
          <div>
            <span className="font-mono text-[10px] text-ash tracking-widest uppercase">SECTION E</span>
            <h2 className="font-serif text-2xl font-bold text-ink dark:text-white">Practice FAQs</h2>
          </div>
          <span className="font-mono text-xs text-ash font-urdu" dir="rtl">اکثر پوچھے گئے سوالات</span>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, idx) => (
            <div key={idx} className="glass-card p-6 rounded-[22px] space-y-2.5 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <h3 className="font-bold text-sm text-ink dark:text-white">{faq.qEn}</h3>
                <span className="font-urdu text-xs text-ash" dir="rtl">{faq.qUr}</span>
              </div>
              <p className="text-xs text-ash leading-relaxed pt-2 border-t border-rule-light">
                {faq.aEn}
              </p>
              <p className="font-urdu text-xs text-ash leading-relaxed" dir="rtl">
                {faq.aUr}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Bottom Banner CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-ink text-paper-light border-2 border-apple-blue/50 p-8 sm:p-10 rounded-[32px] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1.5 text-center sm:text-left">
            <span className="font-mono text-xs text-apple-blue tracking-wider uppercase font-bold">TY2026 INTAKE OPEN</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-paper-light">
              Ready to file your return?
            </h2>
            <p className="text-xs text-ash-light max-w-md leading-relaxed">
              Complete Part 01 in 60 seconds. You receive an instant case ID (YS-26-XXXXX) and our tax specialist handles the rest.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            {/* Mobile AppClip button */}
            <button
              type="button"
              onClick={() => appClip.open("fbr-simplified-intake")}
              className="md:hidden inline-flex items-center justify-center gap-2 bg-apple-blue hover:bg-apple-blue-hover text-white font-bold py-3.5 px-7 rounded-full text-xs shadow-md transition-all font-mono active:scale-95"
            >
              <span>FBR 8-Window Form</span>
              <Sparkles className="w-3.5 h-3.5" />
            </button>

            {/* Desktop link to /start */}
            <Link
              href="/start"
              className="hidden md:inline-flex items-center justify-center gap-2 bg-apple-blue hover:bg-apple-blue-hover text-white font-bold py-3.5 px-7 rounded-full text-xs shadow-md transition-all font-mono active:scale-95"
            >
              <span>Start Filing Return</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <a
              href={formatWhatsAppUrl("Hi, I want to file my Tax Year 2026 return.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-folio/10 hover:bg-folio/20 border border-white/20 text-paper-light font-bold py-3.5 px-5 rounded-full text-xs transition-all font-mono active:scale-95"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
              <span>{SITE_CONFIG.contact.whatsappDisplay}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
