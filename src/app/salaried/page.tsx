"use client";

import React from "react";
import { BilingualIntakeForm } from "@/components/intake/BilingualIntakeForm";
import { Briefcase, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function SalariedPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-12">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-theme-primary/10 border border-theme-primary/20 text-theme-primary text-xs font-bold">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Salaried Individual Income Tax • Tax Year 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-theme-text">
          Salaried Tax Return Facilitation
        </h1>
        <p className="text-lg font-bold text-theme-primary font-urdu" dir="rtl">
          تنخواہ دار ملازمین کے لیے انکم ٹیکس ریٹرن فائلنگ
        </p>
        <p className="max-w-xl mx-auto text-xs sm:text-sm text-theme-text-secondary">
          Are you paying tax on your salary every month? Claim adjustable withholding taxes from mobile bills, vehicle registration, and school fees while maintaining your Active Taxpayer List (ATL) status.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-4 space-y-1.5">
          <div className="text-xs font-bold text-theme-primary uppercase tracking-wider">Salary Audit</div>
          <h3 className="font-bold text-sm text-theme-text">Section 149 Reconciliation</h3>
          <p className="text-xs text-theme-text-secondary leading-relaxed">
            Reconcile your employer's monthly tax deductions against the official FBR salary tax slabs.
          </p>
        </div>
        <div className="glass-card p-4 space-y-1.5">
          <div className="text-xs font-bold text-theme-primary uppercase tracking-wider">Adjustments</div>
          <h3 className="font-bold text-sm text-theme-text">Withholding Tax Credits</h3>
          <p className="text-xs text-theme-text-secondary leading-relaxed">
            Adjust prepaid tax on your electricity, internet, mobile SIM, and vehicle token taxes.
          </p>
        </div>
        <div className="glass-card p-4 space-y-1.5">
          <div className="text-xs font-bold text-theme-primary uppercase tracking-wider">Security</div>
          <h3 className="font-bold text-sm text-theme-text">Password Stays With You</h3>
          <p className="text-xs text-theme-text-secondary leading-relaxed">
            You enter your IRIS credentials directly on the official portal; we guide you step-by-step.
          </p>
        </div>
      </div>

      {/* Embedded Intake */}
      <div className="glass-card p-6 sm:p-8 space-y-6">
        <div className="space-y-1 text-center sm:text-left border-b border-theme-border/50 pb-4">
          <h2 className="text-xl font-bold text-theme-text">Start Salaried Intake</h2>
          <div className="text-xs font-urdu text-theme-primary font-semibold" dir="rtl">
            تنخواہ دار ٹیکس فائلنگ کی معلومات درج کریں
          </div>
        </div>
        <BilingualIntakeForm defaultPersona="salaried" />
      </div>
    </div>
  );
}
