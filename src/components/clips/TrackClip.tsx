"use client";

import React from "react";
import { AppClipSheet } from "@/components/ui/app-clip/AppClipSheet";
import { TrackPanel } from "@/components/tax/TrackPanel";

export default function TrackClip({ onClose }: { onClose: () => void }) {
  return (
    <AppClipSheet
      onClose={onClose}
      title="Track filing"
      subtitle="Form 114(1) docket · Tax Year 2026"
    >
      <TrackPanel compact />
    </AppClipSheet>
  );
}
