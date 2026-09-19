"use client";

import React from "react";
import Link from "next/link";
import { useAppClip } from "@/components/ui/app-clip/AppClipProvider";
import { ShieldCheck, CheckCircle2, ArrowRight, FileCheck, HelpCircle } from "lucide-react";

export default function ServicesPage() {
  const appClip = useAppClip();

  const services = [
    {
      id: "guided",
      tierId: "guided_1000",
      fee: "PKR 1,000",
      titleEn: "Option 1 — Guided Self-Filing",
      titleUr: "رہنمائی مع سیلف فائلنگ",
      descEn: "Designed for individuals who want complete control and minimal cost. We review your documents, calculate your exact taxable income and withholding tax figures, reconcile your wealth statement, and prepare a step-by-step checklist. You sign into official FBR IRIS and submit the return yourself.",
      descUr: "یہ سروس ان افراد کے لیے ہے جو کم خرچ میں خود فائلنگ کرنا چاہتے ہیں۔ ہم آپ کی دستاویزات کی بنیاد پر تمام اعداد و شمار اور ویلتھ اسٹیٹمنٹ تیار کر کے دیں گے، اور آپ خود ایف بی آر کی آفیشل ویب سائٹ پر لاگ ان ہو کر گوشوارہ جمع کروائیں گے۔",
      points: [
        "Zero password sharing with any third party",
        "Document intake & withholding tax audit",
        "Step-by-step numbers provided for every IRIS field",
        "Filer status activation verification",
      ],
    },
    {
      id: "assisted",
      tierId: "assistance_2500",
      fee: "PKR 2,500",
      titleEn: "Option 2 — Complete Filing Assistance",
      titleUr: "مکمل فائلنگ اسسٹنس",
      descEn: "Our full-service facilitation through your FBR IRIS account. We organize all salary slips, bank tax deduction certificates, and asset declarations. We prepare the complete draft return and wealth statement, review final figures with you for mandatory approval, and assist you through the IRIS submission.",
      descUr: "ہماری جامع فائلنگ سہولت جس میں ہم آپ کے تمام سیلری سلپس، بینک سرٹیفکیٹس اور اثاثوں کا جامع گوشوارہ تیار کرتے ہیں۔ حتمی جمع کروانے سے پہلے مکمل جائزہ آپ کو پیش کیا جاتا ہے اور آپ کی منظوری کے بعد فائلنگ مکمل کروائی جاتی ہے۔",
      points: [
        "Full income tax & wealth reconciliation",
        "WHT optimization (mobile, banking, vehicle, property)",
        "Direct IRIS assistance with customer-authenticated session",
        "Mandatory customer pre-approval review summary",
      ],
    },
    {
      id: "complex",
      tierId: "complex_5000",
      fee: "PKR 4,500+",
      titleEn: "Option 3 — Complex Individual Case Review",
      titleUr: "پیچیدہ کیس و تفصیلی ریویو",
      descEn: "For taxpayers with multiple streams of income (rental, interest, foreign remittance), capital asset transactions, multiple bank accounts, or unfiled prior years requiring wealth reconciliation adjustments.",
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-12">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-theme-primary/10 border border-theme-primary/20 text-theme-primary text-xs font-bold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Non-Business Individual Services • Tax Year 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-theme-text">Our Filing Services</h1>
        <p className="text-lg font-bold text-theme-primary font-urdu" dir="rtl">
          ہماری سروسز • مکمل رازداری اور شفاف فیس کے ساتھ
        </p>
        <p className="max-w-2xl mx-auto text-xs sm:text-sm text-theme-text-secondary">
          Every tier strictly enforces our Zero-Credential Architecture: you never have to give your FBR password to our servers or agents.
        </p>
      </div>

      <div className="space-y-6">
        {services.map((svc) => (
          <div key={svc.id} className="glass-card p-6 md:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-theme-border/50 pb-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-bold text-theme-text">{svc.titleEn}</h2>
                <div className="text-sm font-semibold text-theme-primary font-urdu" dir="rtl">
                  {svc.titleUr}
                </div>
              </div>
              <div className="text-2xl font-extrabold text-theme-text">
                {svc.fee}
              </div>
            </div>

            <div className="space-y-2 text-xs sm:text-sm text-theme-text-secondary leading-relaxed">
              <p>{svc.descEn}</p>
              <p className="font-urdu text-theme-text-muted text-xs leading-relaxed" dir="rtl">
                {svc.descUr}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {svc.points.map((pt, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-theme-text">
                  <CheckCircle2 className="w-4 h-4 text-theme-success shrink-0" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => appClip.open("tax-intake", { defaultTier: svc.tierId })}
                className="btn-shimmer inline-flex items-center gap-2 bg-theme-primary hover:bg-theme-primary-hover text-white font-bold py-2.5 px-6 rounded-xl text-xs shadow-md transition-all"
              >
                <span>Select {svc.titleEn.split("—")[1] || svc.titleEn}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => appClip.open("tax-checklist")}
                className="inline-flex items-center gap-2 border border-theme-border bg-theme-surface hover:bg-theme-surface-raised text-theme-text font-bold py-2.5 px-4 rounded-xl text-xs transition-all"
              >
                <FileCheck className="w-3.5 h-3.5" />
                <span>View Checklist</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
