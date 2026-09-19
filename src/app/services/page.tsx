"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppClip } from "@/components/ui/app-clip/AppClipProvider";
import ServicesClip from "@/components/clips/ServicesClip";
import { ShieldCheck, CheckCircle2, ArrowRight, Lock, ExternalLink, Sparkles } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/icons/whatsapp-icon";

export default function ServicesPage() {
  const router = useRouter();
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
        "Full income tax return + Section 116 wealth balance",
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
    <>
      {/* ========================================================
          1. MOBILE VIEWPORT (md:hidden): Frosted Liquid Glass AppClip
          ======================================================== */}
      <div className="block md:hidden">
        <ServicesClip onClose={() => router.push("/")} />
      </div>

      {/* ========================================================
          2. DESKTOP VIEWPORT (hidden md:block): Two-Column Layout
          ======================================================== */}
      <div className="hidden md:block max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16 pb-32">
        <div className="grid grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT COLUMN: Sticky Overview & Trust */}
          <div className="col-span-5 lg:col-span-4 sticky top-24 space-y-6">
            <div className="space-y-3">
              <div>
                <span className="inline-block font-mono text-[11px] text-brass font-bold tracking-widest uppercase bg-brass/10 border border-brass/30 px-3 py-1 rounded-full">
                  PRACTICE OVERVIEW · TY2026
                </span>
              </div>

              <h1 className="font-serif text-3xl lg:text-4xl font-black text-ink leading-tight">
                Tax Facilitation Services
              </h1>

              <div className="font-urdu text-base font-bold text-[#128C7E] dark:text-[#C4A046]" dir="rtl">
                ہماری سروسز • مکمل رازداری اور شفاف فیس کے ساتھ
              </div>

              <p className="text-sm text-ash leading-relaxed">
                Non-business individual filers only. Every tier strictly enforces our Zero-Credential Architecture: you never enter your FBR password on any third-party app.
              </p>
            </div>

            {/* Zero-Credential Invariant Card */}
            <div className="p-5 rounded-2xl bg-paper-light border border-rule space-y-2.5 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-[#128C7E] dark:text-[#C4A046]">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Zero-Credential Invariant</span>
              </div>
              <p className="text-xs text-ash leading-relaxed">
                We prepare all tax reconciliations beforehand. You sign in directly on official IRIS to inspect and submit.
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

            {/* Concierge Desk */}
            <div className="p-5 rounded-2xl bg-folio border border-rule space-y-3 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink">
                  Senior Counsel Desk
                </span>
              </div>
              <p className="text-xs text-ash leading-relaxed">
                Need guidance on which service level fits your tax profile? Talk with us directly.
              </p>
              <a
                href="https://wa.me/923120947187?text=Hi%2C%20I%20have%20questions%20about%20your%20tax%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-full bg-[#25D366] hover:bg-[#1ebd59] text-white font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>WhatsApp Desk (0312 0947187)</span>
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: Service Tiers */}
          <div className="col-span-7 lg:col-span-8 space-y-8">
            <div className="space-y-6">
              {services.map((svc) => (
                <div
                  key={svc.code}
                  className={`glass-card p-6 sm:p-8 space-y-5 rounded-3xl border-rule ${
                    svc.isRecommended ? "glass-card-featured border-2 border-brass shadow-lg" : "shadow-sm hover:shadow-md"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-rule-light pb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-ink px-2.5 py-0.5 rounded-full bg-paper border border-rule">
                          {svc.code}
                        </span>
                        {svc.isRecommended && (
                          <span className="font-mono text-[10px] font-bold bg-brass text-ink px-2 py-0.5 rounded-full uppercase tracking-wider">
                            Recommended
                          </span>
                        )}
                      </div>
                      <h2 className="font-serif text-2xl font-bold text-ink">
                        {svc.titleEn}
                      </h2>
                      <div className="font-urdu text-sm text-[#128C7E] dark:text-[#C4A046]" dir="rtl">
                        {svc.titleUr}
                      </div>
                    </div>
                    <div className="font-serif text-3xl font-black text-ink">
                      {svc.fee}
                    </div>
                  </div>

                  <p className="text-sm text-ash leading-relaxed">
                    {svc.descEn}
                  </p>

                  <div className="font-urdu text-xs text-ash/80 leading-relaxed" dir="rtl">
                    {svc.descUr}
                  </div>

                  <ul className="space-y-2 text-xs text-ash font-mono border-t border-rule-light pt-3">
                    {svc.points.map((pt, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-iris-teal shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2">
                    <Link
                      href={`/start?tier=${svc.tierId}`}
                      className={`inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-full font-mono font-bold text-xs sm:text-sm shadow-sm transition-all active:scale-95 ${
                        svc.isRecommended
                          ? "bg-gradient-to-r from-[#128C7E] to-[#0A6054] text-white shadow-md"
                          : "bg-paper hover:bg-paper-light border border-rule text-ink"
                      }`}
                    >
                      <span>Proceed with {svc.code} ({svc.fee})</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
