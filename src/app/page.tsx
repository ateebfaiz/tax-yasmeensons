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
import { formatWhatsAppUrl, FOLIO_EXAMPLE } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/config";

const btnPrimary =
  "inline-flex items-center justify-center gap-2 bg-apple-blue hover:bg-apple-blue/90 text-white font-semibold py-3.5 px-8 rounded-full text-[17px] min-h-11 shadow-sm active:scale-95 whitespace-nowrap";
const btnGhost =
  "inline-flex items-center justify-center gap-2 font-semibold py-3.5 px-6 rounded-full text-[15px] min-h-11 active:scale-95 whitespace-nowrap";

export default function HomePage() {
  const { isUrdu } = useLanguage();
  const appClip = useAppClip();
  const [pricingCategory, setPricingCategory] = React.useState<string>("all");

  const personas = [
    {
      titleEn: "Salaried",
      titleUr: "تنخواہ دار",
      descEn: "s.149 employer WHT, salary certificate, Form 114(1).",
      descUr: "سیکشن 149 کٹوتی، سیلری سرٹیفکیٹ اور فارم 114(1)",
      href: "/salaried",
      clip: "persona-salaried",
      icon: Briefcase,
    },
    {
      titleEn: "Pensioners",
      titleUr: "پنشنرز",
      descEn: "Pension exemption and National Savings / Behbood profits.",
      descUr: "پنشن چھوٹ اور قومی بچت منافع",
      href: "/pensioners",
      clip: "persona-pensioner",
      icon: HeartHandshake,
    },
    {
      titleEn: "Household",
      titleUr: "گھریلو",
      descEn: "Zero-tax return for ATL — lower WHT on banks and property.",
      descUr: "بینک اور جائیداد پر کم کٹوتی کے لیے ایکٹو فائلر",
      href: "/no-income",
      clip: "persona-housewife",
      icon: Users,
    },
    {
      titleEn: "Students",
      titleUr: "طلباء",
      descEn: "s.236I advance tax on fees; student accounts.",
      descUr: "فیس پر ایڈوانس ٹیکس s.236I",
      href: "/students",
      clip: "persona-student",
      icon: GraduationCap,
    },
  ];

  const fourSteps = [
    {
      num: "01",
      titleEn: "Papers",
      titleUr: "کاغذات",
      descEn: "CNIC, salary certificate or Form-J, bank s.164, SIM s.236.",
    },
    {
      num: "02",
      titleEn: "Form 114(1)",
      titleUr: "فارم 114(1)",
      descEn: "SRO 1561(I)/2025 windows: salary s.12, rent s.15, other s.39.",
    },
    {
      num: "03",
      titleEn: "Form 116",
      titleUr: "فارم 116",
      descEn: "s.116 wealth: opening + inflows = outflows + closing, to 0.00.",
    },
    {
      num: "04",
      titleEn: "iris.fbr.gov.pk",
      titleUr: "آفیشل آئرس",
      descEn: "You sign in. We guide the screens. ATL updates each Monday.",
    },
  ];

  const trustBadges = [
    { icon: Lock, title: "You keep IRIS", desc: "Password never collected" },
    { icon: Award, title: "SRO 1561(I)/2025", desc: "Simplified e-return" },
    { icon: ShieldCheck, title: "ATL weekly", desc: "FBR list, Sunday night" },
    { icon: Clock, title: "s.116 to 0.00", desc: "Wealth recon, Form 116" },
  ];

  const customerReviews = [
    {
      name: "Tariq Mehmood",
      role: "Salaried, Lahore",
      comment:
        "s.149 and telecom WHT matched. Never asked for my IRIS password.",
    },
    {
      name: "Col. (R) Farooq Ahmed",
      role: "Pensioner, Rawalpindi",
      comment:
        "Pension exemption and Behbood profit entered correctly. Name on ATL.",
    },
    {
      name: "Fatima Noor",
      role: "Household filer, Karachi",
      comment:
        "Household maintenance on a zero-tax return. Bank WHT dropped after ATL.",
    },
    {
      name: "Saad Hashmi",
      role: "Remote developer, Islamabad",
      comment:
        "PRC under s.111(4) / s.154A and Form 116 balanced without a gap.",
    },
  ];

  const faqs = [
    {
      qEn: "What is the filing deadline for Tax Year 2026?",
      qUr: "مالی سال 2026 کی آخری تاریخ؟",
      aEn: "Individuals: 30 September 2026. Late ATL surcharge is s.182A, PKR 1,000.",
      aUr: "انفرادی افراد: 30 ستمبر 2026۔ تاخیر پر s.182A سرچارج 1,000 روپے۔",
    },
    {
      qEn: "Do you ask for my IRIS password?",
      qUr: "کیا آپ آئرس پاس ورڈ مانگتے ہیں؟",
      aEn: "Never. We prepare Form 114(1) and Form 116. You log into iris.fbr.gov.pk.",
      aUr: "ہرگز نہیں۔ گوشوارہ ہم تیار کرتے ہیں؛ لاگ ان آپ خود کرتے ہیں۔",
    },
    {
      qEn: "Why file if I have no taxable income?",
      qUr: "آمدنی نہ ہو تو فائل کیوں؟",
      aEn: "Non-filers pay higher WHT: bank profit 30% vs 15%, property 6% vs 3%. A household return puts you on ATL.",
      aUr: "نان فائلر بینک منافع پر 30% اور جائیداد پر 6% کٹوتی دیتا ہے۔ فائلر کی شرح آدھی ہے۔",
    },
    {
      qEn: "How do I get a docket number?",
      qUr: "ڈاکٹ نمبر کیسے ملتا ہے؟",
      aEn: `After intake the desk issues ${FOLIO_EXAMPLE} — Yasmeen & Sons, Form 114(1), Tax Year 2026. Track it here or on WhatsApp.`,
      aUr: "انٹیک کے بعد فارم 114(1) کا ڈاکٹ نمبر جاری ہوتا ہے۔",
    },
    {
      qEn: "When does ATL update?",
      qUr: "ATL کب اپ ڈیٹ ہوتا ہے؟",
      aEn: "FBR refreshes the Active Taxpayer List Sunday night; names show Monday morning.",
      aUr: "ایف بی آر اتوار کی رات فہرست اپ ڈیٹ کرتا ہے، پیر کو نام نظر آتا ہے۔",
    },
    {
      qEn: "What is CX-4500?",
      qUr: "CX-4500 کب؟",
      aEn: "Prior years, s.111 unexplained wealth, property sale/purchase, or heavy multi-bank turnover.",
      aUr: "پرانی سال، s.111 نوٹس، جائیداد کی خرید و فروخت۔",
    },
  ];

  return (
    <div className="space-y-16 md:space-y-24 py-8 md:py-16 pb-28 md:pb-16">
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-7">
        <div className="w-full flex justify-center px-2">
          <div className="inline-flex max-w-full items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] sm:text-[13px] font-medium text-ink glass-pill">
            <Sparkles className="w-3.5 h-3.5 text-apple-blue shrink-0" />
            <span className="sm:hidden whitespace-nowrap">Tax Season 2026 · ATL Open</span>
            <span className="hidden sm:inline whitespace-nowrap">Tax Season 2026 is Here! Active ATL Filing Open</span>
          </div>
        </div>

        <div className="flex justify-center pb-1">
          <TaxDynamicIsland />
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-title">
            File your Tax Year 2026 return{" "}
            <span className="italic text-apple-blue whitespace-nowrap">— from PKR 1,000</span>
          </h1>
          {isUrdu ? (
            <p className="font-urdu text-xl font-semibold text-ink leading-relaxed" dir="rtl">
              ہم تیار کریں گے۔ آپ iris.fbr.gov.pk پر خود لاگ ان کریں گے۔
            </p>
          ) : (
            <p className="text-body max-w-3xl mx-auto">
              We prepare Form 114(1) and reconcile Form 116 to 0.00. You log into official FBR IRIS.{" "}
              <strong className="text-ink">We never take your password.</strong>
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 text-left">
          {trustBadges.map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.title} className="glass-card p-3 space-y-1">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-apple-blue shrink-0" />
                  <span className="font-semibold text-[13px] text-ink">{b.title}</span>
                </div>
                <p className="text-[13px] text-ash">{b.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="inline-flex items-center glass-pill px-4 py-2 font-mono text-[13px] text-ink">
          Most choose <strong className="text-apple-blue ml-1 whitespace-nowrap">FA-2500 · PKR 2,500</strong>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button type="button" onClick={() => appClip.open("fbr-simplified-intake")} className={`md:hidden w-full sm:w-auto ${btnPrimary}`}>
            <Sparkles className="w-4 h-4 shrink-0" />
            Start return
          </button>
          <Link href="/start" className={`hidden md:inline-flex ${btnPrimary}`}>
            Start filing
            <ArrowRight className="w-4 h-4 shrink-0" />
          </Link>
          <button
            type="button"
            onClick={() => appClip.open("tax-track")}
            className={`md:hidden w-full sm:w-auto glass-pill ${btnGhost} text-ink`}
          >
            Track case
          </button>
          <Link href="/track" className={`hidden md:inline-flex glass-pill ${btnGhost} text-ink`}>
            Track case
          </Link>
          <button
            type="button"
            onClick={() => appClip.open("tax-checklist")}
            className={`md:hidden w-full sm:w-auto glass-pill ${btnGhost} text-ink`}
          >
            <FileText className="w-4 h-4 text-apple-blue shrink-0" />
            Documents
          </button>
          <Link href="/requirements" className={`hidden md:inline-flex glass-pill ${btnGhost} text-ink`}>
            <FileText className="w-4 h-4 text-apple-blue shrink-0" />
            Documents
          </Link>
        </div>

        <div className="md:hidden pt-2 grid grid-cols-2 gap-2 text-[13px]">
          {[
            { clip: "fbr-simplified-intake", label: "Simplified return" },
            { clip: "tax-checklist", label: "Documents" },
            { clip: "whatsapp-intake", label: "WhatsApp" },
            { clip: "iris-guide", label: "IRIS guide" },
          ].map((c) => (
            <button
              key={c.clip}
              type="button"
              onClick={() => appClip.open(c.clip)}
              className="glass-pill px-3 py-2 font-medium text-ink whitespace-nowrap min-h-11"
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="hidden md:flex pt-2 flex-wrap items-center justify-center gap-2 text-[13px]">
          <Link href="/requirements" className="glass-pill px-3.5 py-1.5 min-h-11 inline-flex items-center whitespace-nowrap">
            Document checklist
          </Link>
          <a
            href={formatWhatsAppUrl("Hi, I want to file my Tax Year 2026 return.")}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-pill px-3.5 py-1.5 min-h-11 inline-flex items-center gap-1.5 whitespace-nowrap text-[#128C7E]"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
            {SITE_CONFIG.contact.whatsappDisplay}
          </a>
          <Link href="/iris-guide" className="glass-pill px-3.5 py-1.5 min-h-11 inline-flex items-center whitespace-nowrap">
            IRIS walkthrough
          </Link>
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-[13px]">
          <span className="stamp-box px-3 py-1 rounded-full text-[12px]">Password never collected</span>
          <a
            href="https://iris.fbr.gov.pk/infosys/public/txplogin.xhtml"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ash hover:text-ink underline inline-flex items-center gap-0.5"
          >
            iris.fbr.gov.pk
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="glass-card p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-apple-orange/15 text-apple-orange flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="font-semibold text-[15px] text-ink">Deadline 30 September 2026</div>
              <p className="text-[13px] text-ash">Non-filer bank profit WHT is 30%. Filer rate is 15% (s.151).</p>
            </div>
          </div>
          <Link href="/start" className={`${btnPrimary} text-[15px] px-5 py-2 hidden md:inline-flex`}>
            File now
          </Link>
          <button type="button" onClick={() => appClip.open("fbr-simplified-intake")} className={`${btnPrimary} text-[15px] px-5 py-2 md:hidden`}>
            File now
          </button>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 space-y-4">
        <h2 className="text-headline">Filer vs non-filer (TY2026)</h2>
        <div className="glass-card overflow-hidden">
          <table className="w-full text-[13px] sm:text-[15px] text-left">
            <thead>
              <tr className="text-ash">
                <th className="p-3 font-semibold">Head</th>
                <th className="p-3 font-semibold">Non-filer</th>
                <th className="p-3 font-semibold text-apple-blue">On ATL</th>
              </tr>
            </thead>
            <tbody className="text-ink">
              <tr className="border-t border-black/[0.04] dark:border-white/[0.06]">
                <td className="p-3">Bank profit WHT (s.151)</td>
                <td className="p-3">30%</td>
                <td className="p-3 font-semibold">15%</td>
              </tr>
              <tr className="border-t border-black/[0.04] dark:border-white/[0.06]">
                <td className="p-3">Property WHT</td>
                <td className="p-3">6%</td>
                <td className="p-3 font-semibold">3%</td>
              </tr>
              <tr className="border-t border-black/[0.04] dark:border-white/[0.06]">
                <td className="p-3">ATL after deadline</td>
                <td className="p-3">s.182A PKR 1,000</td>
                <td className="p-3 font-semibold">Filed on time</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        <h2 className="text-headline">Who we file for</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {personas.map((p) => {
            const Icon = p.icon;
            const inner = (
              <>
                <div className="space-y-3">
                  <Icon className="w-5 h-5 text-apple-blue" />
                  <div>
                    <h3 className="font-semibold text-[17px] text-ink">{p.titleEn}</h3>
                    <div className="font-urdu text-[13px] text-ash mt-0.5" dir="rtl">{p.titleUr}</div>
                  </div>
                  <p className="text-[13px] text-ash leading-relaxed">{p.descEn}</p>
                </div>
                <div className="text-[13px] font-semibold text-ink flex items-center gap-1 pt-3">
                  Open
                  <ArrowRight className="w-3 h-3" />
                </div>
              </>
            );
            return (
              <React.Fragment key={p.href}>
                <button
                  type="button"
                  onClick={() => appClip.open(p.clip)}
                  className="md:hidden glass-card p-6 text-left flex flex-col justify-between space-y-4 h-full active:scale-[0.99]"
                >
                  {inner}
                </button>
                <Link href={p.href} className="hidden md:flex glass-card p-6 flex-col justify-between space-y-4 h-full">
                  {inner}
                </Link>
              </React.Fragment>
            );
          })}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
        <h2 className="text-headline">Fees</h2>
        <div className="flex justify-center overflow-x-auto pb-1 no-scrollbar">
          <AnimatedTabs
            variant="pill"
            activeTab={pricingCategory}
            onChange={setPricingCategory}
            tabs={[
              { id: "all", label: "All" },
              { id: "standard", label: "Individual" },
              { id: "complex", label: "Prior years" },
            ]}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              code: "GF-1000",
              title: "Guided filing",
              ur: "رہنمائی مع سیلف فائلنگ",
              price: "PKR 1,000",
              body: "We calculate. You enter on iris.fbr.gov.pk.",
              items: ["Document check", "Field list for IRIS", "You keep the password"],
              clip: "tax-intake",
              tier: "guided_1000",
              featured: false,
            },
            {
              code: "FA-2500",
              title: "Complete assistance",
              ur: "مکمل اسسٹنس",
              price: "PKR 2,500",
              body: "Form 114(1) + Form 116 to 0.00 + WHT credits. Screen-by-screen.",
              items: ["s.116 wealth balance", "s.149 / s.164 / s.236 credits", "You approve before IRIS"],
              clip: "tax-intake",
              tier: "assistance_2500",
              featured: true,
            },
            {
              code: "CX-4500",
              title: "Complex review",
              ur: "پیچیدہ جائزہ",
              price: "PKR 4,500+",
              body: "Prior years, s.111, property, or multi-bank. Quoted after papers.",
              items: ["Prior-year recon", "s.111 unexplained wealth", "Fee after review"],
              clip: "whatsapp-intake",
              tier: "complex_5000",
              featured: false,
            },
          ].map((tier) => (
            <div
              key={tier.code}
              className={`${tier.featured ? "glass-card-featured" : "glass-card"} p-6 sm:p-7 flex flex-col justify-between space-y-6 relative ${
                pricingCategory === "complex" && tier.code !== "CX-4500"
                  ? "opacity-40"
                  : pricingCategory === "standard" && tier.code === "CX-4500"
                  ? "opacity-40"
                  : ""
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-apple-blue text-white text-[12px] font-semibold whitespace-nowrap">
                  Most selected
                </div>
              )}
              <div className="space-y-3">
                <div className="font-mono text-[13px] text-apple-blue">{tier.code}</div>
                <h3 className="text-[22px] font-semibold text-ink">{tier.title}</h3>
                <div className="font-urdu text-[13px] text-ash" dir="rtl">{tier.ur}</div>
                <div className="text-[28px] font-semibold text-ink">{tier.price}</div>
                <p className="text-[15px] text-ash leading-relaxed">{tier.body}</p>
                <ul className="space-y-2 text-[13px] text-ash pt-2">
                  {tier.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-apple-blue shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                onClick={() => appClip.open(tier.clip, { defaultTier: tier.tier })}
                className={`md:hidden w-full min-h-11 rounded-full font-semibold text-[15px] whitespace-nowrap ${
                  tier.featured ? "bg-apple-blue text-white" : "glass-pill text-ink"
                }`}
              >
                Select {tier.code}
              </button>
              {tier.code === "CX-4500" ? (
                <a
                  href={formatWhatsAppUrl("Hi, I have a Complex Return (CX-4500) case for Tax Year 2026.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:flex w-full min-h-11 items-center justify-center rounded-full font-semibold text-[15px] whitespace-nowrap text-[#128C7E] glass-pill"
                >
                  WhatsApp CX-4500
                </a>
              ) : (
                <Link
                  href={`/start?tier=${tier.tier}`}
                  className={`hidden md:flex w-full min-h-11 items-center justify-center rounded-full font-semibold text-[15px] whitespace-nowrap ${
                    tier.featured ? "bg-apple-blue text-white" : "glass-pill text-ink"
                  }`}
                >
                  Select {tier.code}
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
        <h2 className="text-headline">How filing works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {fourSteps.map((s) => (
            <div key={s.num} className="glass-card p-6 space-y-2">
              <span className="font-mono text-[13px] text-apple-blue font-semibold">{s.num}</span>
              <h3 className="font-semibold text-[17px] text-ink">{s.titleEn}</h3>
              <div className="font-urdu text-[13px] text-ash" dir="rtl">{s.titleUr}</div>
              <p className="text-[13px] text-ash leading-relaxed">{s.descEn}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
        <h2 className="text-headline">From filers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {customerReviews.map((rev) => (
            <div key={rev.name} className="glass-card p-5 space-y-3">
              <div>
                <div className="font-semibold text-[15px] text-ink">{rev.name}</div>
                <div className="text-[13px] text-ash">{rev.role}</div>
              </div>
              <div className="flex gap-0.5 text-apple-orange">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <p className="text-[15px] text-ash leading-relaxed">&ldquo;{rev.comment}&rdquo;</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        <h2 className="text-headline">Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <div key={faq.qEn} className="glass-card p-6 space-y-2">
              <h3 className="font-semibold text-[17px] text-ink">{faq.qEn}</h3>
              <div className="font-urdu text-[13px] text-ash" dir="rtl">{faq.qUr}</div>
              <p className="text-[15px] text-ash leading-relaxed">{faq.aEn}</p>
              <p className="font-urdu text-[13px] text-ash leading-relaxed" dir="rtl">{faq.aUr}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="glass-card-featured p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="text-[13px] text-apple-blue font-semibold">Tax Year 2026 · Form 114(1)</div>
            <h2 className="text-[22px] sm:text-[28px] font-semibold text-ink">Ready to file?</h2>
            <p className="text-[15px] text-ash max-w-md">
              Intake issues docket {FOLIO_EXAMPLE}. You keep IRIS. We prepare the figures.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button type="button" onClick={() => appClip.open("fbr-simplified-intake")} className={`md:hidden ${btnPrimary}`}>
              Start return
            </button>
            <Link href="/start" className={`hidden md:inline-flex ${btnPrimary}`}>
              Start filing
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <a
              href={formatWhatsAppUrl("Hi, I want to file my Tax Year 2026 return.")}
              target="_blank"
              rel="noopener noreferrer"
              className={`${btnGhost} glass-pill text-ink`}
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
              {SITE_CONFIG.contact.whatsappDisplay}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
