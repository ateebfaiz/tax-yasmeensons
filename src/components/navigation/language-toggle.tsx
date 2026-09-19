"use client";

import React from "react";
import { useLanguage } from "@/context/language-context";

export function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="inline-flex items-center rounded-md border border-rule bg-folio p-0.5 text-xs font-mono">
      <button
        type="button"
        onClick={() => setLang("en")}
        className={`px-2 py-0.5 rounded transition-all ${
          lang === "en"
            ? "bg-ink text-paper-light font-bold"
            : "text-ash hover:text-ink"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("ur")}
        className={`px-2 py-0.5 rounded font-urdu text-[11px] transition-all ${
          lang === "ur"
            ? "bg-ink text-brass-light font-bold"
            : "text-ash hover:text-ink"
        }`}
      >
        اردو
      </button>
    </div>
  );
}
