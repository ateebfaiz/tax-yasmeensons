"use client";

import React from "react";
import { BilingualIntakeForm } from "@/components/intake/BilingualIntakeForm";
import { Users, ShieldCheck } from "lucide-react";

export default function NoIncomePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-12">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-theme-primary/10 border border-theme-primary/20 text-theme-primary text-xs font-bold">
          <Users className="w-3.5 h-3.5" />
          <span>Non-Earning & Housewives • Tax Year 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-theme-text">
          Zero-Income & Housewife Filer Status
        </h1>
        <p className="text-lg font-bold text-theme-primary font-urdu" dir="rtl">
          گھریلو خواتین اور بغیر آمدنی افراد کے لیے ایکٹو فائلر رجسٹریشن
        </p>
        <p className="max-w-xl mx-auto text-xs sm:text-sm text-theme-text-secondary">
          Non-filers in Pakistan face double withholding taxes on bank transactions, property registry, and vehicle purchases. Even with zero personal taxable income, you can legally become an Active Taxpayer.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-4 space-y-1.5">
          <div className="text-xs font-bold text-theme-primary uppercase tracking-wider">Benefits</div>
          <h3 className="font-bold text-sm text-theme-text">Lower Banking WHT</h3>
          <p className="text-xs text-theme-text-secondary leading-relaxed">
            Avoid punitive non-filer withholding taxes on bank cash withdrawals and transfers.
          </p>
        </div>
        <div className="glass-card p-4 space-y-1.5">
          <div className="text-xs font-bold text-theme-primary uppercase tracking-wider">Legality</div>
          <h3 className="font-bold text-sm text-theme-text">Spouse / Family Source</h3>
          <p className="text-xs text-theme-text-secondary leading-relaxed">
            Proper declaration of household maintenance support from earning family members.
          </p>
        </div>
        <div className="glass-card p-4 space-y-1.5">
          <div className="text-xs font-bold text-theme-primary uppercase tracking-wider">Property</div>
          <h3 className="font-bold text-sm text-theme-text">Smooth Asset Transfers</h3>
          <p className="text-xs text-theme-text-secondary leading-relaxed">
            Required for transferring inherited property or opening individual investment accounts.
          </p>
        </div>
      </div>

      <div className="glass-card p-6 sm:p-8 space-y-6">
        <div className="space-y-1 text-center sm:text-left border-b border-theme-border/50 pb-4">
          <h2 className="text-xl font-bold text-theme-text">Start Non-Earning Intake</h2>
          <div className="text-xs font-urdu text-theme-primary font-semibold" dir="rtl">
            گھریلو خواتین و نان ارننگ فائلنگ کی معلومات درج کریں
          </div>
        </div>
        <BilingualIntakeForm defaultPersona="no_income" />
      </div>
    </div>
  );
}
