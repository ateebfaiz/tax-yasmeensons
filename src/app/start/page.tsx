"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SeniorIntakeWizard } from "@/components/intake/SeniorIntakeWizard";
import { Lock, ExternalLink } from "lucide-react";

function StartWizardContent() {
  const searchParams = useSearchParams();
  const catParam = searchParams.get("cat") || searchParams.get("persona") || "SAL";
  const tierParam = searchParams.get("tier") || "assistance_2500";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12 space-y-6 pb-28">
      {/* Header Info */}
      <div className="text-center space-y-1.5">
        <div className="inline-block font-mono text-[10px] text-brass font-bold tracking-widest uppercase bg-paper-light border border-rule px-2 py-0.5 rounded">
          FORM 2026-A · INTAKE WIZARD
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink">
          Individual Tax Filing Registration
        </h1>
        <p className="text-xs text-ash max-w-lg mx-auto">
          Complete the 4 parts below. Your Case ID will be issued upon completion with direct WhatsApp handoff.
        </p>
      </div>

      <SeniorIntakeWizard initialCategory={catParam} initialTier={tierParam} />

      {/* Official disclaimer */}
      <div className="pt-4 text-center font-mono text-[11px] text-ash flex items-center justify-center gap-1.5">
        <Lock className="w-3 h-3 text-brass" />
        <span>Official IRIS Submission Gateway:</span>
        <a
          href="https://iris.fbr.gov.pk/infosys/public/txplogin.xhtml"
          target="_blank"
          rel="noopener noreferrer"
          className="text-ink underline hover:text-brass"
        >
          iris.fbr.gov.pk
        </a>
      </div>
    </div>
  );
}

export default function StartPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center font-mono text-xs text-ash">Loading Intake Wizard...</div>}>
      <StartWizardContent />
    </Suspense>
  );
}
