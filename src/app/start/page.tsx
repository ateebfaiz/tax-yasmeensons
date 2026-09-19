"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { BilingualIntakeForm } from "@/components/intake/BilingualIntakeForm";
import { ShieldCheck, Lock, ExternalLink } from "lucide-react";

function IntakeContent() {
  const searchParams = useSearchParams();
  const personaParam = searchParams.get("persona") || "salaried";

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-16 space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-theme-primary/10 border border-theme-primary/20 text-theme-primary text-xs font-bold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Non-Business Individual • Tax Year 2026 Intake</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-theme-text">
          Start Your Tax Filing Intake
        </h1>
        <p className="text-lg font-bold text-theme-primary font-urdu" dir="rtl">
          ٹیکس فائلنگ کا باقاعدہ آغاز کریں
        </p>
        <p className="max-w-xl mx-auto text-xs sm:text-sm text-theme-text-secondary leading-relaxed">
          Please fill out your basic taxpayer details below. Our desk will prepare your figures, reconcile your wealth, and assist you through official FBR IRIS submission.
        </p>
      </div>

      <div className="glass-card p-6 sm:p-8">
        <BilingualIntakeForm defaultPersona={personaParam} />
      </div>

      <div className="text-center text-xs text-theme-text-muted flex items-center justify-center gap-1.5">
        <Lock className="w-3.5 h-3.5 text-theme-primary" />
        <span>Official FBR Submission Gateway:</span>
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
    </div>
  );
}

export default function StartPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-theme-text-muted">Loading intake form...</div>}>
      <IntakeContent />
    </Suspense>
  );
}
