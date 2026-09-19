"use client";

import dynamic from "next/dynamic";
import React from "react";

export const AppClipRegistry: Record<string, React.ComponentType<any>> = {
  "tax-intake": dynamic(() => import("@/components/clips/TaxIntakeClip")),
  "whatsapp-intake": dynamic(() => import("@/components/clips/WhatsAppIntakeClip")),
  "tax-checklist": dynamic(() => import("@/components/clips/ChecklistClip")),
  "iris-guide": dynamic(() => import("@/components/clips/IrisGuideClip")),
  "pricing": dynamic(() => import("@/components/clips/PricingClip")),
  "services": dynamic(() => import("@/components/clips/ServicesClip")),
};
