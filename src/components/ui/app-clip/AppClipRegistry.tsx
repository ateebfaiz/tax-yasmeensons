"use client";

import dynamic from "next/dynamic";
import React from "react";

export const AppClipRegistry: Record<string, React.ComponentType<any>> = {
  "fbr-simplified-intake": dynamic(() => import("@/components/clips/FbrSimplifiedClipWizard")),
  "fbr-simplified": dynamic(() => import("@/components/clips/FbrSimplifiedClipWizard")),
  "tax-intake": dynamic(() => import("@/components/clips/TaxIntakeClip")),
  "whatsapp-intake": dynamic(() => import("@/components/clips/WhatsAppIntakeClip")),
  "tax-checklist": dynamic(() => import("@/components/clips/ChecklistClip")),
  "iris-guide": dynamic(() => import("@/components/clips/IrisGuideClip")),
  "tax-track": dynamic(() => import("@/components/clips/TrackClip")),
  "pricing": dynamic(() => import("@/components/clips/PricingClip")),
  "services": dynamic(() => import("@/components/clips/ServicesClip")),
  "persona": dynamic(() =>
    import("@/components/clips/PersonaClip").then(
      (m) =>
        function PersonaWrapper(props: any) {
          const persona = props.payload?.persona || "salaried";
          return <m.default persona={persona} {...props} />;
        }
    )
  ),
  "persona-salaried": dynamic(() =>
    import("@/components/clips/PersonaClip").then(
      (m) =>
        function SalariedWrapper(props: any) {
          return <m.default persona="salaried" {...props} />;
        }
    )
  ),
  "persona-pensioner": dynamic(() =>
    import("@/components/clips/PersonaClip").then(
      (m) =>
        function PensionerWrapper(props: any) {
          return <m.default persona="pensioner" {...props} />;
        }
    )
  ),
  "persona-housewife": dynamic(() =>
    import("@/components/clips/PersonaClip").then(
      (m) =>
        function HousewifeWrapper(props: any) {
          return <m.default persona="housewife" {...props} />;
        }
    )
  ),
  "persona-student": dynamic(() =>
    import("@/components/clips/PersonaClip").then(
      (m) =>
        function StudentWrapper(props: any) {
          return <m.default persona="student" {...props} />;
        }
    )
  ),
};
