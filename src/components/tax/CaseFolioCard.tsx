"use client";

import React from "react";
import { ShieldCheck } from "lucide-react";
import { folioLegalCaption } from "@/lib/utils";

export function CaseFolioCard({
  reference,
  name,
  meta,
}: {
  reference: string;
  name?: string;
  meta?: string;
}) {
  return (
    <div
      className="rounded-[22px] p-5 text-center space-y-3"
      style={{
        backgroundColor: "var(--glass-card-bg)",
        border: "0.5px solid var(--glass-border)",
        boxShadow: "inset 0 1px 0 var(--glass-highlight)",
        WebkitBackdropFilter: "blur(32px) saturate(180%)",
        backdropFilter: "blur(32px) saturate(180%)",
      }}
    >
      <div className="text-[12px] font-medium text-ash tracking-wide">
        Filing docket
      </div>
      <div className="font-mono text-[22px] sm:text-[26px] font-semibold text-ink tracking-tight break-all">
        {reference}
      </div>
      <div className="text-[13px] text-ash">{folioLegalCaption()}</div>
      {name && (
        <div className="text-[13px] font-semibold text-ink pt-1 border-t border-black/[0.04] dark:border-white/[0.06]">
          {name}
        </div>
      )}
      {meta && <div className="text-[12px] text-ash">{meta}</div>}
      <div className="inline-flex items-center gap-1.5 text-[12px] text-apple-blue font-medium">
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>Save this number · you keep IRIS custody</span>
      </div>
    </div>
  );
}
