"use client";

import React from "react";
import { BilingualIntakeForm } from "@/components/intake/BilingualIntakeForm";
import { GraduationCap, ShieldCheck } from "lucide-react";

export default function StudentsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-12">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-theme-primary/10 border border-theme-primary/20 text-theme-primary text-xs font-bold">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Student & Youth Desk • Tax Year 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-theme-text">
          Student Filer Facilitation
        </h1>
        <p className="text-lg font-bold text-theme-primary font-urdu" dir="rtl">
          طلباء و یوتھ کے لیے ٹیکس فائلنگ و ایکٹو فائلر رجسٹریشن
        </p>
        <p className="max-w-xl mx-auto text-xs sm:text-sm text-theme-text-secondary">
          Students need active filer status to avoid heavy advance withholding tax on university tuition fees (Sec 236I), international examination fees, and opening full-featured bank accounts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-4 space-y-1.5">
          <div className="text-xs font-bold text-theme-primary uppercase tracking-wider">Fee Relief</div>
          <h3 className="font-bold text-sm text-theme-text">Section 236I WHT Savings</h3>
          <p className="text-xs text-theme-text-secondary leading-relaxed">
            Eliminate or drastically reduce non-filer advance withholding tax levied on educational fees.
          </p>
        </div>
        <div className="glass-card p-4 space-y-1.5">
          <div className="text-xs font-bold text-theme-primary uppercase tracking-wider">Banking</div>
          <h3 className="font-bold text-sm text-theme-text">Unrestricted Banking</h3>
          <p className="text-xs text-theme-text-secondary leading-relaxed">
            Open student, freelancing, or regular checking accounts without punitive tax deduction rates.
          </p>
        </div>
        <div className="glass-card p-4 space-y-1.5">
          <div className="text-xs font-bold text-theme-primary uppercase tracking-wider">Affordable</div>
          <h3 className="font-bold text-sm text-theme-text">Student Friendly Pricing</h3>
          <p className="text-xs text-theme-text-secondary leading-relaxed">
            Guided filing starting from PKR 1,000 with complete explanation of tax fundamentals.
          </p>
        </div>
      </div>

      <div className="glass-card p-6 sm:p-8 space-y-6">
        <div className="space-y-1 text-center sm:text-left border-b border-theme-border/50 pb-4">
          <h2 className="text-xl font-bold text-theme-text">Start Student Intake</h2>
          <div className="text-xs font-urdu text-theme-primary font-semibold" dir="rtl">
            طالب علم فائلر کی معلومات درج کریں
          </div>
        </div>
        <BilingualIntakeForm defaultPersona="student" />
      </div>
    </div>
  );
}
