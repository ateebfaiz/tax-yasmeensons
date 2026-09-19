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
  Lock,
  FileText,
  Clock,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/icons/whatsapp-icon";
import { TaxDynamicIsland } from "@/components/ui/tax-dynamic-island";

export default function HomePage() {
  const { isUrdu } = useLanguage();
  const appClip = useAppClip();

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
      titleEn: "Send Papers",
      titleUr: "کاغذات بھیجیں",
      descEn: "Share salary slip, WHT certificates, or bank statements on WhatsApp.",
    },
    {
      num: "02",
      code: "AUDIT",
      titleEn: "We Reconcile",
      titleUr: "ٹیکس حساب کتاب",
      descEn: "Our team audits deductions and reconciles wealth statement balances.",
    },
    {
      num: "03",
      code: "REVIEW",
      titleEn: "You Approve Figures",
      titleUr: "حتمی منظوری",
      descEn: "Mandatory pre-approval summary. Zero filing happens without your review.",
    },
    {
      num: "04",
      code: "IRIS",
      titleEn: "You Submit on IRIS",
      titleUr: "آئرس پر سبمشن",
      descEn: "You log in to official iris.fbr.gov.pk; we guide you to final completed task.",
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
      aEn: "Yes. Once you start or choose WhatsApp handoff, our filing operator connects directly with you on 0312 0947187 with your Case ID, collects document photos, and sends you the step-by-step numbers.",
      aUr: "جی ہاں! کیس نمبر بننے کے بعد ہمارا نمائندہ 03120947187 پر واٹس ایپ کے ذریعے تمام تفصیلات اور رہنمائی فراہم کرتا ہے۔",
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
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-7">
        {/* Dynamic Island: Active Live Desk & AppClip Controller */}
        <div className="flex justify-center pb-2">
          <TaxDynamicIsland />
        </div>

        {/* Hero Title */}
        <div className="space-y-3.5">
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black text-ink tracking-tight leading-[1.15]">
            File your Tax Year 2026 return <br className="hidden sm:inline" />
            <span className="italic text-brass font-bold">— from PKR 1,000</span>
          </h1>

          {isUrdu ? (
            <p className="font-urdu text-xl sm:text-2xl font-bold text-ink leading-relaxed" dir="rtl">
              ہم تیار کریں گے۔ آپ آفیشل آئرس پر خود لاگ ان کر کے فائل کریں گے۔
            </p>
          ) : (
            <p className="text-base sm:text-lg text-ash max-w-2xl mx-auto leading-relaxed">
              We prepare the figures and reconcile your wealth statement. You log into official FBR IRIS yourself. <strong className="text-ink">We never take your password.</strong>
            </p>
          )}
        </div>

        {/* Pricing Story Highlight */}
        <div className="inline-block bg-brass-subtle border border-brass/40 px-4 py-2 rounded-full font-mono text-xs text-ink shadow-sm">
          Most clients choose: <strong className="text-brass font-bold">FA-2500 Complete Assistance (PKR 2,500)</strong>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/start"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-ink hover:bg-theme-primary-hover text-paper-light font-bold py-3.5 px-8 rounded-full text-sm shadow-md hover:shadow-lg transition-colors focus-visible:ring-2 focus-visible:ring-brass active:scale-95"
          >
            <span>Start Filing (Part 01 / 04)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            type="button"
            onClick={() => appClip.open("tax-intake")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-paper-light hover:bg-paper border border-brass/40 text-ink font-bold py-3.5 px-6 rounded-full text-sm shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-brass active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-brass" />
            <span>Fast AppClip Intake</span>
          </button>

          <button
            type="button"
            onClick={() => appClip.open("tax-checklist")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-folio hover:bg-paper border border-rule text-ink font-bold py-3.5 px-6 rounded-full text-sm transition-colors focus-visible:ring-2 focus-visible:ring-brass active:scale-95"
          >
            <FileText className="w-4 h-4 text-ash" />
            <span>Docs Checklist</span>
          </button>
        </div>

        {/* Frosted AppClip Quick Tray */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-[11px] font-mono text-ash uppercase tracking-wider font-semibold">
            Quick Clips:
          </span>
          <button
            type="button"
            onClick={() => appClip.open("tax-checklist")}
            className="px-3 py-1 rounded-full bg-white/80 dark:bg-[#0B1C2C]/80 border border-rule hover:border-brass/50 text-ash hover:text-ink font-medium transition-all shadow-sm flex items-center gap-1.5"
          >
            <span>📋 Documents Needed</span>
          </button>
          <button
            type="button"
            onClick={() => appClip.open("whatsapp-intake")}
            className="px-3 py-1 rounded-full bg-white/80 dark:bg-[#0B1C2C]/80 border border-rule hover:border-[#128C7E]/50 text-ash hover:text-ink font-medium transition-all shadow-sm flex items-center gap-1.5"
          >
            <span className="text-[#128C7E]">💬 WhatsApp File</span>
          </button>
          <button
            type="button"
            onClick={() => appClip.open("iris-guide")}
            className="px-3 py-1 rounded-full bg-white/80 dark:bg-[#0B1C2C]/80 border border-rule hover:border-brass/50 text-ash hover:text-ink font-medium transition-all shadow-sm flex items-center gap-1.5"
          >
            <span>🛡️ IRIS Password Guide</span>
          </button>
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
            className="text-ash hover:text-ink underline flex items-center gap-0.5"
          >
            <span>Official portal: iris.fbr.gov.pk</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </section>

      {/* 2. Audience Profiles — Clean Folio Cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="border-b border-rule pb-2 flex items-baseline justify-between">
          <div>
            <span className="font-mono text-[10px] text-ash tracking-widest uppercase">SECTION A</span>
            <h2 className="font-serif text-2xl font-bold text-ink">Individual Tax Categories</h2>
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
                className="glass-card p-6 rounded-[24px] hover:border-brass transition-all group flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-brass px-2 py-0.5 rounded-full bg-brass-subtle border border-brass/20">
                      {p.code}
                    </span>
                    <Icon className="w-4 h-4 text-ash group-hover:text-ink transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-ink group-hover:text-iris-teal transition-colors">
                      {p.titleEn}
                    </h3>
                    <div className="font-urdu text-xs text-ash mt-0.5" dir="rtl">{p.titleUr}</div>
                  </div>
                  <p className="text-xs text-ash leading-relaxed">{p.descEn}</p>
                </div>

                <div className="font-mono text-[11px] font-bold text-ink flex items-center gap-1 pt-3 border-t border-rule-light group-hover:text-brass">
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
        <div className="border-b border-rule pb-2 flex items-baseline justify-between">
          <div>
            <span className="font-mono text-[10px] text-ash tracking-widest uppercase">SECTION B</span>
            <h2 className="font-serif text-2xl font-bold text-ink">Fee Schedule & Packages</h2>
          </div>
          <span className="font-mono text-xs text-ash">NO HIDDEN CHARGES</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Guided Filing */}
          <div className="glass-card p-6 sm:p-7 rounded-[28px] flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md transition-all">
            <div className="space-y-4">
              <div className="border-b border-rule pb-3">
                <span className="font-mono text-[10px] font-bold text-ash tracking-widest">CODE: GF-1000</span>
                <h3 className="font-serif text-xl font-bold text-ink">Guided Filing</h3>
                <div className="font-urdu text-xs text-ash" dir="rtl">رہنمائی مع سیلف فائلنگ</div>
              </div>
              <div className="font-serif text-3xl font-black text-ink">
                PKR 1,000
              </div>
              <p className="text-xs text-ash leading-relaxed">
                For taxpayers who want to submit themselves. We audit your salary/bills, calculate your figures, and provide a field-by-field checklist.
              </p>
              <ul className="space-y-2 text-xs text-ash font-mono pt-2 border-t border-rule-light">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-iris-teal shrink-0" />
                  <span>Document check & tax calculation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-iris-teal shrink-0" />
                  <span>Field-by-field IRIS checklist</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-iris-teal shrink-0" />
                  <span>Zero password shared</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => appClip.open("tax-intake", { defaultTier: "guided_1000" })}
                className="w-full py-3 text-center rounded-full bg-paper-light hover:bg-paper border border-rule font-bold text-xs text-ink transition-all font-mono active:scale-95 shadow-sm"
              >
                Select GF-1000 (AppClip)
              </button>
              <Link
                href="/start?tier=guided_1000"
                className="block text-center text-[11px] font-mono text-ash hover:text-ink underline"
              >
                Or open full page wizard →
              </Link>
            </div>
          </div>

          {/* Complete Assistance — Recommended */}
          <div className="glass-card-featured p-6 sm:p-7 rounded-[30px] flex flex-col justify-between space-y-6 relative shadow-lg">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-brass text-ink font-mono text-[10px] font-bold uppercase tracking-wider shadow-sm">
              Most Selected · تجویز کردہ
            </div>
            <div className="space-y-4">
              <div className="border-b border-rule pb-3">
                <span className="font-mono text-[10px] font-bold text-brass tracking-widest">CODE: FA-2500</span>
                <h3 className="font-serif text-xl font-bold text-ink">Complete Assistance</h3>
                <div className="font-urdu text-xs text-ash" dir="rtl">مکمل فائلنگ اسسٹنس</div>
              </div>
              <div className="font-serif text-3xl font-black text-ink">
                PKR 2,500
              </div>
              <p className="text-xs text-ash leading-relaxed">
                Full-service facilitation. We reconcile your return, wealth statement (s.116), and WHT credits, guide you screen-by-screen, and verify ATL.
              </p>
              <ul className="space-y-2 text-xs text-ash font-mono pt-2 border-t border-rule-light">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-iris-teal shrink-0" />
                  <span>Full return + s.116 wealth balance</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-iris-teal shrink-0" />
                  <span>WHT credit adjustment audit</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-iris-teal shrink-0" />
                  <span>Mandatory client pre-approval summary</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => appClip.open("tax-intake", { defaultTier: "assistance_2500" })}
                className="w-full py-3.5 text-center rounded-full bg-ink hover:bg-theme-primary-hover font-bold text-xs text-paper-light shadow-md hover:shadow-lg transition-all font-mono active:scale-95"
              >
                Select FA-2500 (Fast AppClip)
              </button>
              <Link
                href="/start?tier=assistance_2500"
                className="block text-center text-[11px] font-mono text-ash hover:text-ink underline"
              >
                Or open full page wizard →
              </Link>
            </div>
          </div>

          {/* Complex Review */}
          <div className="glass-card p-6 sm:p-7 rounded-[28px] flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md transition-all">
            <div className="space-y-4">
              <div className="border-b border-rule pb-3">
                <span className="font-mono text-[10px] font-bold text-ash tracking-widest">CODE: CX-4500</span>
                <h3 className="font-serif text-xl font-bold text-ink">Complex Review</h3>
                <div className="font-urdu text-xs text-ash" dir="rtl">پیچیدہ ریٹرن جائزہ</div>
              </div>
              <div className="font-serif text-3xl font-black text-ink">
                PKR 4,500+
              </div>
              <p className="text-xs text-ash leading-relaxed">
                For multi-bank reconciliation, prior unfiled years, foreign remittances, or capital gains on property and stocks. Quoted after document review.
              </p>
              <ul className="space-y-2 text-xs text-ash font-mono pt-2 border-t border-rule-light">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-iris-teal shrink-0" />
                  <span>Prior unfiled years reconciliation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-iris-teal shrink-0" />
                  <span>s.111 asset transactions</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-iris-teal shrink-0" />
                  <span>Final fee confirmed after review</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => appClip.open("whatsapp-intake", { defaultTier: "complex_5000" })}
                className="w-full py-3 text-center rounded-full border border-rule bg-paper-light hover:bg-paper font-bold text-xs text-ink transition-all font-mono active:scale-95 shadow-sm"
              >
                Consult CX-4500 (WhatsApp)
              </button>
              <Link
                href="/start?tier=complex_5000"
                className="block text-center text-[11px] font-mono text-ash hover:text-ink underline"
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
            <h2 className="font-serif text-2xl font-bold text-ink">Filing Workflow</h2>
          </div>
          <span className="font-mono text-xs text-ash">4 STEPS TO COMPLETED TASK</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {fourSteps.map((s) => (
            <div key={s.num} className="glass-card p-6 rounded-[24px] space-y-2.5 relative border-rule/70 shadow-sm">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="font-bold text-brass">{s.num}</span>
                <span className="text-[10px] text-ash px-2 py-0.5 bg-paper-light border border-rule rounded-full">{s.code}</span>
              </div>
              <div>
                <h3 className="font-bold text-sm text-ink">{s.titleEn}</h3>
                <div className="font-urdu text-xs text-ash mt-0.5" dir="rtl">{s.titleUr}</div>
              </div>
              <p className="text-xs text-ash leading-relaxed">{s.descEn}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Comprehensive FAQs */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="border-b border-rule pb-2 flex items-baseline justify-between">
          <div>
            <span className="font-mono text-[10px] text-ash tracking-widest uppercase">SECTION D</span>
            <h2 className="font-serif text-2xl font-bold text-ink">Practice FAQs</h2>
          </div>
          <span className="font-mono text-xs text-ash font-urdu" dir="rtl">اکثر پوچھے گئے سوالات</span>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, idx) => (
            <div key={idx} className="glass-card p-6 rounded-[22px] space-y-2.5 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <h3 className="font-bold text-sm text-ink">{faq.qEn}</h3>
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
        <div className="bg-ink text-paper-light border-2 border-brass p-8 sm:p-10 rounded-[32px] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1.5 text-center sm:text-left">
            <span className="font-mono text-xs text-brass tracking-wider uppercase font-bold">TY2026 INTAKE OPEN</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-paper-light">
              Ready to file your return?
            </h2>
            <p className="text-xs text-ash-light max-w-md leading-relaxed">
              Complete Part 01 in 60 seconds. You receive an instant case ID (YS-26-XXXXX) and our tax specialist handles the rest.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              type="button"
              onClick={() => appClip.open("tax-intake")}
              className="inline-flex items-center justify-center gap-2 bg-brass hover:bg-brass-light text-ink font-bold py-3.5 px-7 rounded-full text-xs shadow-md transition-all font-mono active:scale-95"
            >
              <span>Fast AppClip Form</span>
              <Sparkles className="w-3.5 h-3.5" />
            </button>

            <a
              href="https://wa.me/923120947187?text=Hi%2C%20I%20want%20to%20file%20my%20Tax%20Year%202026%20return."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-folio/10 hover:bg-folio/20 border border-brass/40 text-paper-light font-bold py-3.5 px-5 rounded-full text-xs transition-all font-mono active:scale-95"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
              <span>0312 0947187</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

