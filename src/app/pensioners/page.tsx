"use client";

import React from "react";
import { BilingualIntakeForm } from "@/components/intake/BilingualIntakeForm";
import { HeartHandshake, ShieldCheck } from "lucide-react";

export default function PensionersPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-12">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-theme-primary/10 border border-theme-primary/20 text-theme-primary text-xs font-bold">
          <HeartHandshake className="w-3.5 h-3.5" />
          <span>Senior Citizen & Pensioner Desk • Tax Year 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-theme-text">
          Pensioner & Senior Citizen Tax Filing
        </h1>
        <p className="text-lg font-bold text-theme-primary font-urdu" dir="rtl">
          پنشنرز اور بزرگ شہریوں کے لیے انکم ٹیکس ریٹرن فائلنگ
        </p>
        <p className="max-w-xl mx-auto text-xs sm:text-sm text-theme-text-secondary">
          Pension income is generally exempt from federal income tax in Pakistan. We ensure your Behbood Certificates, National Savings profits, and pension receipts are properly documented without tax leakages.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-4 space-y-1.5">
          <div className="text-xs font-bold text-theme-primary uppercase tracking-wider">Exemption</div>
          <h3 className="font-bold text-sm text-theme-text">Pension Exemption Clause</h3>
          <p className="text-xs text-theme-text-secondary leading-relaxed">
            Properly tag your government/private pension under exempt income clauses in IRIS.
          </p>
        </div>
        <div className="glass-card p-4 space-y-1.5">
          <div className="text-xs font-bold text-theme-primary uppercase tracking-wider">Savings</div>
          <h3 className="font-bold text-sm text-theme-text">Behbood & National Savings</h3>
          <p className="text-xs text-theme-text-secondary leading-relaxed">
            Record profit on debt and adjust or reclaim excess withholding tax deductions.
          </p>
        </div>
        <div className="glass-card p-4 space-y-1.5">
          <div className="text-xs font-bold text-theme-primary uppercase tracking-wider">Respect</div>
          <h3 className="font-bold text-sm text-theme-text">Dedicated Assistance</h3>
          <p className="text-xs text-theme-text-secondary leading-relaxed">
            Patient, step-by-step guidance tailored for senior citizens and retired personnel.
          </p>
        </div>
      </div>

      <div className="glass-card p-6 sm:p-8 space-y-6">
        <div className="space-y-1 text-center sm:text-left border-b border-theme-border/50 pb-4">
          <h2 className="text-xl font-bold text-theme-text">Start Pensioner Intake</h2>
          <div className="text-xs font-urdu text-theme-primary font-semibold" dir="rtl">
            پنشنر ٹیکس فائلنگ کی معلومات درج کریں
          </div>
        </div>
        <BilingualIntakeForm defaultPersona="pensioner" />
      </div>
    </div>
  );
}
