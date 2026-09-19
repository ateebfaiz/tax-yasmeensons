"use client";

import React from "react";
import { AppClipSheet } from "@/components/ui/app-clip/AppClipSheet";
import { SeniorIntakeWizard } from "@/components/intake/SeniorIntakeWizard";

export default function TaxIntakeClip({
  onClose,
  payload,
}: {
  onClose: () => void;
  payload?: { defaultPersona?: string; defaultTier?: string };
}) {
  return (
    <AppClipSheet
      onClose={onClose}
      fullHeight
      title="Start Tax Filing Intake"
      subtitle="ٹیکس فائلنگ کا آغاز • Non-Business Individual"
    >
      <div className="p-1 sm:p-3 pb-24">
        <SeniorIntakeWizard
          initialCategory={payload?.defaultPersona || "SAL"}
          initialTier={payload?.defaultTier || "assistance_2500"}
        />
      </div>
    </AppClipSheet>
  );
}
