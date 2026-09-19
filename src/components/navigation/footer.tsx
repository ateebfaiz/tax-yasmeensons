"use client";

import React from "react";
import Link from "next/link";
import { useAppClip } from "@/components/ui/app-clip/AppClipProvider";
import { ShieldCheck, ExternalLink, MessageCircle } from "lucide-react";

export function Footer() {
  const appClip = useAppClip();

  return (
    <footer className="border-t border-theme-border/60 bg-theme-surface/60 backdrop-blur-md pt-12 pb-24 md:pb-12 text-xs text-theme-text-secondary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
        {/* Col 1: Brand & Affiliation */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-theme-primary" />
            <span className="font-extrabold text-sm text-theme-text">Yasmeen & Sons Tax</span>
          </div>
          <p className="text-xs leading-relaxed text-theme-text-muted">
            Independent individual income tax facilitation and return reconciliation desk. Operating on the official domain <span className="font-semibold text-theme-text">tax.yasmeensons.com</span>.
          </p>
          <p className="font-urdu text-[11px] text-theme-text-muted leading-relaxed" dir="rtl">
            غیر کاروباری افراد، تنخواہ دار ملازمین اور گھریلو خواتین کے لیے شفاف اور محفوظ ٹیکس فائلنگ سروس۔
          </p>
        </div>

        {/* Col 2: Services */}
        <div className="space-y-2.5">
          <div className="font-bold text-theme-text uppercase tracking-wider text-[11px]">
            Target Categories / کیٹیگریز
          </div>
          <ul className="space-y-1.5 text-xs">
            <li><Link href="/salaried" className="hover:text-theme-primary transition-colors">Salaried Return (تنخواہ دار)</Link></li>
            <li><Link href="/pensioners" className="hover:text-theme-primary transition-colors">Pensioners (پنشنرز)</Link></li>
            <li><Link href="/no-income" className="hover:text-theme-primary transition-colors">Housewife / Non-Earning (بغیر آمدنی)</Link></li>
            <li><Link href="/students" className="hover:text-theme-primary transition-colors">Students (طلباء)</Link></li>
            <li><Link href="/services" className="hover:text-theme-primary transition-colors">View All Services (تمام سروسز)</Link></li>
          </ul>
        </div>

        {/* Col 3: Practical Tools & Clis */}
        <div className="space-y-2.5">
          <div className="font-bold text-theme-text uppercase tracking-wider text-[11px]">
            Quick Tools / فوری ٹولز
          </div>
          <ul className="space-y-1.5 text-xs">
            <li><button onClick={() => appClip.open("tax-checklist")} className="hover:text-theme-primary transition-colors text-left">Document Checklist (چیک لسٹ)</button></li>
            <li><button onClick={() => appClip.open("iris-guide")} className="hover:text-theme-primary transition-colors text-left">IRIS Account & Password Guide</button></li>
            <li><button onClick={() => appClip.open("whatsapp-intake")} className="hover:text-theme-primary transition-colors text-left">WhatsApp Quick Handoff</button></li>
            <li><Link href="/pricing" className="hover:text-theme-primary transition-colors">Transparent Pricing (PKR 1,000+)</Link></li>
            <li><Link href="/requirements" className="hover:text-theme-primary transition-colors">Check Requirements</Link></li>
          </ul>
        </div>

        {/* Col 4: Trust & Official Links */}
        <div className="space-y-2.5">
          <div className="font-bold text-theme-text uppercase tracking-wider text-[11px]">
            Official Government Portals
          </div>
          <ul className="space-y-2 text-xs">
            <li>
              <a
                href="https://iris.fbr.gov.pk/infosys/public/txplogin.xhtml"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-theme-primary transition-colors"
              >
                <span>FBR IRIS Login Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>
              <a
                href="https://fbr.gov.pk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-theme-primary transition-colors"
              >
                <span>Federal Board of Revenue (FBR)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li className="pt-1">
              <a
                href="https://wa.me/923120947187"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#25D366] font-bold"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp: 03120947187</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 border-t border-theme-border/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-theme-text-muted">
        <div>
          © {new Date().getFullYear()} Yasmeen & Sons. All Rights Reserved. Not an official government body.
        </div>
        <div className="font-medium text-theme-text-secondary text-center sm:text-right">
          Security Guarantee: Your FBR Password stays strictly with you.
        </div>
      </div>
    </footer>
  );
}
