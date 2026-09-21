"use client";

import React from "react";
import { useAppClip } from "@/components/ui/app-clip/AppClipProvider";
import { TrackPanel } from "@/components/tax/TrackPanel";
import { FOLIO_EXAMPLE } from "@/lib/utils";

export default function TrackCasePage() {
  const appClip = useAppClip();

  React.useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      appClip.open("tax-track");
    }
    // Open once on mobile so the sheet frosts this page behind it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-title">Track your return</h1>
        <p className="text-body max-w-lg mx-auto">
          Enter the Form 114(1) docket issued after intake
          {" "}
          <code className="font-mono text-ink">{FOLIO_EXAMPLE}</code>
          . Optional CNIC narrows the lookup. You file on iris.fbr.gov.pk yourself.
        </p>
      </div>
      <div className="hidden md:block">
        <TrackPanel />
      </div>
      <div className="md:hidden">
        <TrackPanel compact />
      </div>
    </div>
  );
}
