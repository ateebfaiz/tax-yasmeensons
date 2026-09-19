"use client";

import React from "react";
import Link from "next/link";
import { StoreLogo } from "@/components/ui/store-logo";
import { WhatsAppIcon } from "@/components/ui/icons/whatsapp-icon";
import { ExternalLink, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-ink text-paper-light border-t-2 border-brass pt-12 pb-32 md:pb-12 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
        {/* Practice Identity */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <StoreLogo variant="white" size={26} className="h-6 w-auto" />
            <div className="flex items-center pl-2 border-l border-rule/30">
              <span className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-brass text-ink uppercase tracking-widest">
                TAX
              </span>
            </div>
          </div>
          <p className="text-ash-light text-xs leading-relaxed">
            Private individual tax return reconciliation and assistance practice. Dedicated to non-business individuals across Pakistan for Tax Year 2026.
          </p>
          <div className="font-mono text-[10px] text-brass-light pt-1">
            DOMAIN: tax.yasmeensons.com
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-2.5">
          <div className="font-mono font-bold text-brass uppercase tracking-wider text-[11px]">
            Audience Profiles
          </div>
          <ul className="space-y-1.5 text-xs text-paper/80 font-mono">
            <li><Link href="/salaried" className="hover:text-brass-light transition-colors">SAL · Salaried Employees</Link></li>
            <li><Link href="/pensioners" className="hover:text-brass-light transition-colors">PEN · Senior & Pensioners</Link></li>
            <li><Link href="/no-income" className="hover:text-brass-light transition-colors">HIF · Housewife / Non-Earning</Link></li>
            <li><Link href="/students" className="hover:text-brass-light transition-colors">STU · Student Filers</Link></li>
          </ul>
        </div>

        {/* Annexes & Navigation */}
        <div className="space-y-2.5">
          <div className="font-mono font-bold text-brass uppercase tracking-wider text-[11px]">
            Folio Pages & Annexes
          </div>
          <ul className="space-y-1.5 text-xs text-paper/80">
            <li><Link href="/start" className="hover:text-brass-light transition-colors">Start Case Filing (Form /start)</Link></li>
            <li><Link href="/services" className="hover:text-brass-light transition-colors">Service Fee Schedule</Link></li>
            <li><Link href="/requirements" className="hover:text-brass-light transition-colors">Documentation Checklist</Link></li>
            <li><Link href="/iris-guide" className="hover:text-brass-light transition-colors text-brass-light font-bold">Annex A — Official IRIS Guide</Link></li>
          </ul>
        </div>

        {/* Official Disclaimers */}
        <div className="space-y-2.5">
          <div className="font-mono font-bold text-brass uppercase tracking-wider text-[11px]">
            Official FBR Portal & Trust
          </div>
          <ul className="space-y-2 text-xs text-paper/80">
            <li>
              <a
                href="https://iris.fbr.gov.pk/infosys/public/txplogin.xhtml"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-brass-light hover:underline font-mono"
              >
                <span>iris.fbr.gov.pk</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/923120947187"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#25D366] font-bold"
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
                <span>WhatsApp: 0312 0947187</span>
              </a>
            </li>
            <li className="pt-1">
              <span className="stamp-box px-2 py-0.5 text-[10px] block text-center rounded">
                WE NEVER TAKE YOUR IRIS PASSWORD
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 border-t border-rule/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-ash-light font-mono">
        <div>
          © 2026 Yasmeen & Sons. All rights reserved.
        </div>
        <div className="text-center sm:text-right font-bold text-stamp-red bg-white/90 px-2 py-0.5 rounded">
          NOT AN OFFICIAL FBR / GOVERNMENT OF PAKISTAN WEBSITE.
        </div>
      </div>
    </footer>
  );
}
