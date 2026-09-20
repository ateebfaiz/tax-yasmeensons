"use client";

import React from "react";
import Link from "next/link";
import { StoreLogo } from "@/components/ui/store-logo";
import { WhatsAppIcon } from "@/components/ui/icons/whatsapp-icon";
import { useAppClip } from "@/components/ui/app-clip/AppClipProvider";
import { ExternalLink, ShieldCheck, Phone, Mail } from "lucide-react";
import { formatWhatsAppUrl } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/config";

export function Footer() {
  const appClip = useAppClip();

  return (
    <footer className="bg-[#1c1c1e] text-white border-t border-white/[0.12] pt-12 pb-32 md:pb-12 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
        {/* Practice Identity & Direct Support Lines */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <StoreLogo variant="white" size={26} className="h-6 w-auto" />
            <div className="flex items-center pl-2 border-l border-white/20">
              <span className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-apple-blue text-white uppercase tracking-widest">
                TAX
              </span>
            </div>
          </div>
          <p className="text-white/60 text-xs leading-relaxed">
            Private individual tax return reconciliation and assistance practice. Dedicated to non-business individuals across Pakistan for Tax Year 2026.
          </p>
          <div className="space-y-1.5 pt-2 border-t border-white/10 text-[11px]">
            <div className="text-apple-blue font-bold uppercase tracking-wider font-mono">
              Direct Support Lines:
            </div>
            <div className="text-white/60">
              <strong className="text-white">General Inquiries:</strong> {SITE_CONFIG.contact.whatsappDisplay}
            </div>
            <div className="text-white/60">
              <strong className="text-white">NTN &amp; Registration:</strong> {SITE_CONFIG.contact.whatsappDisplay}
            </div>
            <div className="text-white/60">
              <strong className="text-white">Individual Tax Desk:</strong> {SITE_CONFIG.contact.whatsappDisplay}
            </div>
            <div className="text-white/60 flex items-center gap-1">
              <Mail className="w-3 h-3 text-apple-blue" />
              <a href={`mailto:${SITE_CONFIG.contact.email}`} className="text-apple-blue hover:underline">
                {SITE_CONFIG.contact.email}
              </a>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-2.5">
          <div className="font-mono font-bold text-apple-blue uppercase tracking-wider text-[11px]">
            Audience Profiles
          </div>
          <ul className="space-y-2 text-xs text-white/60 font-mono">
            <li>
              <button
                type="button"
                onClick={() => appClip.open("persona-salaried")}
                className="md:hidden text-left hover:text-apple-blue transition-colors active:scale-95"
              >
                SAL · Salaried Employees
              </button>
              <Link href="/salaried" className="hidden md:inline hover:text-apple-blue transition-colors">
                SAL · Salaried Employees
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={() => appClip.open("persona-pensioner")}
                className="md:hidden text-left hover:text-apple-blue transition-colors active:scale-95"
              >
                PEN · Senior &amp; Pensioners
              </button>
              <Link href="/pensioners" className="hidden md:inline hover:text-apple-blue transition-colors">
                PEN · Senior &amp; Pensioners
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={() => appClip.open("persona-housewife")}
                className="md:hidden text-left hover:text-apple-blue transition-colors active:scale-95"
              >
                HIF · Housewife / Non-Earning
              </button>
              <Link href="/no-income" className="hidden md:inline hover:text-apple-blue transition-colors">
                HIF · Housewife / Non-Earning
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={() => appClip.open("persona-student")}
                className="md:hidden text-left hover:text-apple-blue transition-colors active:scale-95"
              >
                STU · Student Filers
              </button>
              <Link href="/students" className="hidden md:inline hover:text-apple-blue transition-colors">
                STU · Student Filers
              </Link>
            </li>
          </ul>
        </div>

        {/* Annexes & Navigation */}
        <div className="space-y-2.5">
          <div className="font-mono font-bold text-apple-blue uppercase tracking-wider text-[11px]">
            Folio Pages &amp; Tools
          </div>
          <ul className="space-y-2 text-xs text-white/60">
            <li>
              <button
                type="button"
                onClick={() => appClip.open("fbr-simplified-intake")}
                className="md:hidden text-left text-apple-blue font-bold hover:underline active:scale-95"
              >
                FBR 8-Window Simplified Return ★
              </button>
              <Link href="/start" className="hidden md:inline text-apple-blue font-bold hover:underline">
                FBR 8-Window Simplified Return ★
              </Link>
            </li>
            <li>
              <Link href="/track" className="hover:text-white transition-colors">
                Case Progress Tracking (/track)
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={() => appClip.open("services")}
                className="md:hidden text-left hover:text-white transition-colors active:scale-95"
              >
                Service Fee Schedule
              </button>
              <Link href="/services" className="hidden md:inline hover:text-white transition-colors">
                Service Fee Schedule
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={() => appClip.open("tax-checklist")}
                className="md:hidden text-left hover:text-white transition-colors active:scale-95"
              >
                Documentation Checklist
              </button>
              <Link href="/requirements" className="hidden md:inline hover:text-white transition-colors">
                Documentation Checklist
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={() => appClip.open("iris-guide")}
                className="md:hidden text-left hover:text-apple-blue transition-colors font-bold active:scale-95"
              >
                Annex A — Official IRIS Guide
              </button>
              <Link href="/iris-guide" className="hidden md:inline hover:text-apple-blue transition-colors font-bold">
                Annex A — Official IRIS Guide
              </Link>
            </li>
          </ul>
        </div>

        {/* Official Disclaimers */}
        <div className="space-y-2.5">
          <div className="font-mono font-bold text-apple-blue uppercase tracking-wider text-[11px]">
            Official FBR Portal &amp; Trust
          </div>
          <ul className="space-y-2 text-xs text-white/60">
            <li>
              <a
                href="https://iris.fbr.gov.pk/infosys/public/txplogin.xhtml"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-apple-blue hover:underline font-mono"
              >
                <span>iris.fbr.gov.pk</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>
              <a
                href={formatWhatsAppUrl("Hi, I want to inquire about tax filing.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#25D366] font-bold"
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
                <span>WhatsApp: {SITE_CONFIG.contact.whatsappDisplay}</span>
              </a>
            </li>
            <li className="pt-1">
              <span className="stamp-box px-2 py-0.5 text-[10px] block text-center rounded border border-apple-blue/40 text-white bg-white/[0.04]">
                WE NEVER TAKE YOUR IRIS PASSWORD
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-white/60 font-mono">
        <div>
          © 2026 Yasmeen &amp; Sons. All rights reserved.
        </div>
        <div className="text-center sm:text-right font-bold text-white bg-apple-blue px-2.5 py-0.5 rounded">
          NOT AN OFFICIAL FBR / GOVERNMENT OF PAKISTAN WEBSITE.
        </div>
      </div>
    </footer>
  );
}
