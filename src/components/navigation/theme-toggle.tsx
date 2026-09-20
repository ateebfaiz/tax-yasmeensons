"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "@/context/theme-context";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-8 h-8 rounded-full border border-rule/60 bg-paper-light/50" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="w-8 h-8 rounded-full border border-rule/80 hover:border-palette-coral/50 bg-paper-light/60 hover:bg-paper-light dark:bg-white/[0.06] dark:hover:bg-white/[0.12] flex items-center justify-center transition-all text-ink dark:text-palette-frost active:scale-90"
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
      ) : (
        <Moon className="w-4 h-4 text-palette-slate hover:-rotate-12 transition-transform" />
      )}
    </button>
  );
}
