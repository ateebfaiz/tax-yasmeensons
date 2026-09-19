"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export function LetterheadBand() {
  return (
    <div className="letterhead-band text-[11px] font-mono py-1 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
        <div className="flex items-center gap-2 tracking-wider">
          <span className="font-bold text-brass-light">YASMEEN & SONS</span>
          <span className="text-ash-light opacity-60">·</span>
          <span>TAX PRACTICE</span>
          <span className="text-ash-light opacity-60">·</span>
          <span className="text-brass-light font-bold">TY 2026</span>
          <span className="hidden md:inline text-ash-light opacity-60">·</span>
          <span className="hidden md:inline">INDIVIDUAL / NON-BUSINESS</span>
        </div>

        <div className="flex items-center gap-3 text-[10px] text-paper/80">
          <span className="hidden sm:inline">REF: YS-26-_____</span>
          <span className="hidden sm:inline text-ash-light opacity-60">·</span>
          <span className="text-stamp-red bg-white/90 px-1.5 py-0.2 rounded font-bold">
            NOT FBR GOV
          </span>
          <a
            href="https://iris.fbr.gov.pk/infosys/public/txplogin.xhtml"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brass-light underline flex items-center gap-0.5"
          >
            <span>iris.fbr.gov.pk</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
