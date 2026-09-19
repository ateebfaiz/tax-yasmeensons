"use client";

import React from "react";
import Link from "next/link";
import { useAppClip } from "@/components/ui/app-clip/AppClipProvider";
import { ShieldCheck, CheckCircle2, ArrowRight, FileCheck, Sparkles } from "lucide-react";

export default function ServicesPage() {
  const appClip = useAppClip();

  const services = [
    {
      code: "GF-1000",
      tierId: "guided_1000",
      fee: "PKR 1,000",
      titleEn: "Guided Self-Filing Facilitation",
      titleUr: "رہنمائی مع سیلف فائلنگ",
      descEn: "Designed for individuals who want complete control and minimal cost. We review your documents, calculate your exact taxable income and withholding tax figures, reconcile your wealth statement, and prepare a step-by-step checklist. You sign into official FBR IRIS and submit the return yourself.",
      descUr: "یہ سروس ان افراد کے لیے ہے جو کم خرچ میں خود فائلنگ کرنا چاہتے ہیں۔ ہم آپ کی دستاویزات کی بنیاد پر تمام اعداد و شمار اور ویلتھ اسٹیٹمنٹ تیار کر کے دیں گے، اور آپ خود ایف بی آر کی آفیشل ویب سائٹ پر لاگ ان ہو کر گوشوارہ جمع کروائیں گے۔",
      points: [
        "Zero password sharing with any third party",
        "Document intake & withholding tax calculation",
        "Field-by-field numbers provided for every IRIS declaration tab",
        "Confirmation of Active Taxpayer List (ATL) status",
      ],
    },
    {
      code: "FA-2500",
      tierId: "assistance_2500",
      fee: "PKR 2,500",
      titleEn: "Complete Filing Assistance",
      titleUr: "مکمل فائلنگ اسسٹنس",
      descEn: "Our full-service facilitation through your FBR IRIS account. We organize all salary slips, bank tax deduction certificates, and asset declarations. We prepare the complete draft return and wealth statement (s.116), review final figures with you for mandatory pre-approval, and assist you through the IRIS submission.",
      descUr: "ہماری جامع فائلنگ سہولت جس میں ہم آپ کے تمام سیلری سلپس، بینک سرٹیفکیٹس اور اثاثوں کا جامع گوشوارہ تیار کرتے ہیں۔ حتمی جمع کروانے سے پہلے مکمل جائزہ آپ کو پیش کیا جاتا ہے اور آپ کی منظوری کے بعد فائلنگ مکمل کروائی جاتی ہے۔",
      points: [
        "Full income tax return + section 116 wealth balance",
        "WHT credit optimization (mobile, utility, banking, motor vehicle)",
        "Screen-by-screen assistance with customer-authenticated session",
        "Mandatory pre-submission approval summary",
      ],
      isRecommended: true,
    },
    {
      code: "CX-4500",
      tierId: "complex_5000",
      fee: "PKR 4,500+",
      titleEn: "Complex Individual Case Review",
      titleUr: "پیچیدہ کیس و تفصیلی ریویو",
      descEn: "For taxpayers with multiple streams of income (rental, interest, foreign remittance), capital asset transactions, multiple bank accounts, or unfiled prior years requiring wealth reconciliation adjustments. Final fee confirmed after document review.",
      descUr: "ان افراد کے لیے جن کی ایک سے زائد ذرائع سے آمدنی ہو، بیرونی ترسیلات، پراپرٹی کی خرید و فروخت یا پچھلے سالوں کے بقایا گوشوارے شامل ہوں۔",
      points: [
        "Capital gains & property transaction reconciliation",
        "Foreign remittance & multi-currency audit",
        "Prior year wealth statement gap analysis",
        "Dedicated senior tax counsel oversight",
      ],
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-16 space-y-12 pb-28">
      {/* Header */}
      <div className="border-b-2 border-brass pb-4 space-y-2 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-between font-mono text-[11px] text-ash">
          <span>PRACTICE OVERVIEW</span>
          <span className="font-bold text-ink">TY2026 SERVICES</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-black text-ink">
          Tax Facilitation Services
        </h1>
        <div className="font-urdu text-base font-bold text-ink" dir="rtl">
          ہماری سروسز • مکمل رازداری اور شفاف فیس کے ساتھ
        </div>
        <p className="text-xs text-ash leading-relaxed max-w-xl mx-auto md:mx-0">
          Every tier strictly enforces our Zero-Credential Architecture: you never enter your FBR password on any third-party app.
        </p>
      </div>

      <div className="space-y-8">
        {services.map((svc) => (
          <div
            key={svc.code}
            className={`glass-card p-6 md:p-8 space-y-5 rounded-[28px] ${
              svc.isRecommended ? "glass-card-featured border-brass shadow-lg" : "shadow-sm hover:shadow-md"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-rule-light pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-ink px-2 py-0.5 rounded-full bg-paper border border-rule">
                    {svc.code}
                  </span>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink">
                    {svc.titleEn}
                  </h2>
                </div>
                <div className="font-urdu text-xs text-ash mt-0.5" dir="rtl">{svc.titleUr}</div>
              </div>
              <div className="font-serif text-2xl font-black text-ink">
                {svc.fee}
              </div>
            </div>

            <div className="space-y-1 text-xs text-ash leading-relaxed">
              <p>{svc.descEn}</p>
              <p className="font-urdu text-ash" dir="rtl">{svc.descUr}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {svc.points.map((pt, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-ink font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5 text-iris-teal shrink-0" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => appClip.open("tax-intake", { defaultTier: svc.tierId })}
                className="inline-flex items-center gap-1.5 bg-ink hover:bg-theme-primary-hover text-paper-light font-mono font-bold py-2.5 px-6 rounded-full text-xs shadow transition-all active:scale-95"
              >
                <span>Fast AppClip ({svc.code})</span>
                <Sparkles className="w-3.5 h-3.5 text-brass" />
              </button>

              <Link
                href={`/start?tier=${svc.tierId}`}
                className="inline-flex items-center gap-1.5 border border-rule bg-paper-light hover:bg-paper text-ink font-mono font-bold py-2.5 px-5 rounded-full text-xs transition-all active:scale-95"
              >
                <span>Full Web Page Form →</span>
              </Link>

              <button
                type="button"
                onClick={() => appClip.open("tax-checklist")}
                className="inline-flex items-center gap-1.5 text-ash hover:text-ink font-mono text-xs px-3 py-2 transition-colors"
              >
                <FileCheck className="w-3.5 h-3.5 text-iris-teal" />
                <span>View Checklist</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

