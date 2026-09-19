"use client";

import React from "react";
import { AppClipSheet } from "@/components/ui/app-clip/AppClipSheet";
import { BilingualIntakeForm } from "@/components/intake/BilingualIntakeForm";

export default function TaxIntakeClip({
  onClose,
  payload,
}: {
  onClose: () => void;
  payload?: { defaultPersona?: string };
}) {
  return (
    <AppClipSheet
      onClose={onClose}
      fullHeight
      title="Start Tax Filing Intake"
      subtitle="ٹیکس فائلنگ کا آغاز • Non-Business Individual"
    >
      <div className="p-4 md:p-6 pb-20">
        <BilingualIntakeForm
          defaultPersona={payload?.defaultPersona || "salaried"}
          onSuccess={() => {}}
        />
      </div>
    </AppClipSheet>
  );
}
