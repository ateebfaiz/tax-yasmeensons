"use client";

import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SeniorIntakeWizard } from "@/components/intake/SeniorIntakeWizard";
import { AppClipSheet } from "@/components/ui/app-clip/AppClipSheet";
import { WhatsAppIcon } from "@/components/ui/icons/whatsapp-icon";
import { ShieldCheck, Lock, ExternalLink, Sparkles, CheckCircle2 } from "lucide-react";

function StartWizardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const catParam = searchParams.get("cat") || searchParams.get("persona") || "SAL";
  const tierParam = searchParams.get("tier") || "assistance_2500";

  return (
    <>
      {/* ========================================================
          1. MOBILE VIEWPORT (md:hidden): Frosted Liquid Glass AppClip
          ======================================================== */}
      <div className="block md:hidden">
        <AppClipSheet
          onClose={() => router.push("/")}
          fullHeight
          title="Individual Tax Registration"
          subtitle="FORM 2026-A • Senior Intake Desk • Zero Password"
        >
          <div className="pb-16 pt-1">
            <SeniorIntakeWizard initialCategory={catParam} initialTier={tierParam} />
          </div>
        </AppClipSheet>
      </div>

      {/* ========================================================
          2. DESKTOP VIEWPORT (hidden md:grid): Two-Column Layout
          ======================================================== */}
      <div className="hidden md:block max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16 pb-32">
        <div className="grid grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT COLUMN: Sticky Context, Breathable One-Per-Line Typography */}
          <div className="col-span-5 lg:col-span-4 sticky top-24 space-y-6">
            <div className="space-y-3">
              <div>
                <span className="inline-block font-mono text-[11px] text-brass font-bold tracking-widest uppercase bg-brass/10 border border-brass/30 px-3 py-1 rounded-full">
                  FORM 2026-A · INTAKE WIZARD
                </span>
              </div>

              <h1 className="font-serif text-3xl lg:text-4xl font-black text-ink leading-tight">
                Individual Tax Filing Registration
              </h1>

              <div className="font-urdu text-base font-bold text-[#128C7E] dark:text-[#C4A046]" dir="rtl">
                انفرادی ٹیکس ریٹرن فائلنگ • تصدیق شدہ کوائف
              </div>

              <p className="text-sm text-ash leading-relaxed">
                Complete the 4 parts to register your filing case. Your case folio is issued with instant WhatsApp handoff.
              </p>
            </div>

            {/* Zero-Credential Guarantee Card */}
            <div className="p-5 rounded-2xl bg-paper-light border border-rule space-y-2.5 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-[#128C7E] dark:text-[#C4A046]">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Zero-Credential Invariant</span>
              </div>
              <p className="text-xs text-ash leading-relaxed">
                We never store, input, or ask for your FBR IRIS password. You retain full ownership and sign in yourself.
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

            {/* Senior Desk Concierge Card */}
            <div className="p-5 rounded-2xl bg-folio border border-rule space-y-3 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink">
                  Senior Tax Desk Online
                </span>
              </div>
              <p className="text-xs text-ash leading-relaxed">
                Need immediate help with documents or unfiled prior years? Message our senior desk directly.
              </p>
              <a
                href="https://wa.me/923120947187?text=Hi%2C%20I%20need%20assistance%20with%20Tax%20Intake%20Wizard."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-full bg-[#25D366] hover:bg-[#1ebd59] text-white font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>WhatsApp Desk (0312 0947187)</span>
              </a>
            </div>

            {/* Quick Benefits Checklist */}
            <ul className="space-y-2 text-xs text-ash font-mono pl-1">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-iris-teal shrink-0" />
                <span>Non-business individual focus</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-iris-teal shrink-0" />
                <span>Full WHT source deductions credit</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-iris-teal shrink-0" />
                <span>Section 116 wealth balance guarantee</span>
              </li>
            </ul>
          </div>

          {/* RIGHT COLUMN: Senior Intake Wizard */}
          <div className="col-span-7 lg:col-span-8">
            <SeniorIntakeWizard initialCategory={catParam} initialTier={tierParam} />
          </div>
        </div>
      </div>
    </>
  );
}

export default function StartPage() {
  return (
    <Suspense fallback={<div className="p-16 text-center font-mono text-xs text-ash">Loading Intake Wizard...</div>}>
      <StartWizardContent />
    </Suspense>
  );
}
