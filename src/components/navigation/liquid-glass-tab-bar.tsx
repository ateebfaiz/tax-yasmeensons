"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Home, Search, CheckSquare, Sparkles, HelpCircle } from "lucide-react";
import { useAppClip } from "@/components/ui/app-clip/AppClipProvider";
import { cn } from "@/lib/utils";

export function LiquidGlassTabBar() {
  const pathname = usePathname();
  const router = useRouter();
  const appClip = useAppClip();

  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const handleScroll = useCallback(() => {
    if (ticking.current) return;
    ticking.current = true;
    requestAnimationFrame(() => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY.current && currentY > 80) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentY;
      ticking.current = false;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Don't cover form actions on fullscreen intake wizard
  if (pathname === "/start") {
    return null;
  }

  const isChecklistActive = appClip.activeClip === "tax-checklist" || pathname === "/requirements";
  const isGuideActive = appClip.activeClip === "iris-guide" || pathname === "/iris-guide";
  const isTrackActive = appClip.activeClip === "tax-track" || pathname === "/track";
  const isHomeActive = pathname === "/" && !appClip.isOpen;

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 w-full z-40 pt-2 px-3 transition-transform duration-300 ease-out md:hidden",
        visible ? "translate-y-0" : "translate-y-full"
      )}
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 20px) + 8px)" }}
    >
      <nav
        className="flex items-center justify-between max-w-sm mx-auto h-16 rounded-[28px] px-2.5"
        style={{
          backgroundColor: "var(--glass-bg)",
          border: "0.5px solid var(--glass-border)",
          boxShadow: "inset 0 1px 0 var(--glass-highlight), 0 16px 40px rgba(0,0,0,0.10)",
          WebkitBackdropFilter: "blur(32px) saturate(190%)",
          backdropFilter: "blur(32px) saturate(190%)",
        }}
      >
        {/* Tab 1: Home */}
        <button
          type="button"
          onClick={() => {
            if (appClip.isOpen) appClip.close();
            router.push("/");
          }}
          className={cn(
            "relative flex flex-col items-center justify-center flex-1 h-full py-1 rounded-2xl transition-all duration-200 active:scale-95",
            "hover:bg-black/[0.03] dark:hover:bg-white/[0.06]",
            isHomeActive
              ? "text-apple-blue font-bold"
              : "text-ash hover:text-ink dark:hover:text-white"
          )}
        >
          {isHomeActive && (
            <span className="absolute top-1.5 w-7 h-1 rounded-full bg-apple-blue shadow-sm" />
          )}
          <Home className="w-5 h-5" />
          <span className="text-[12px] mt-0.5 font-medium uppercase tracking-wider whitespace-nowrap">Home</span>
        </button>

        <button
          type="button"
          onClick={() => appClip.open("tax-track")}
          className={cn(
            "relative flex flex-col items-center justify-center flex-1 h-full py-1 rounded-2xl transition-all duration-200 active:scale-95",
            "hover:bg-black/[0.03] dark:hover:bg-white/[0.06]",
            isTrackActive
              ? "text-apple-blue font-semibold"
              : "text-ash hover:text-ink"
          )}
        >
          {isTrackActive && (
            <span className="absolute top-1.5 w-7 h-1 rounded-full bg-apple-blue shadow-sm" />
          )}
          <Search className="w-5 h-5" />
          <span className="text-[12px] mt-0.5 font-medium uppercase tracking-wider whitespace-nowrap">Track</span>
        </button>

        {/* Tab 3: Checklist (Docs) */}
        <button
          type="button"
          onClick={() => appClip.open("tax-checklist")}
          className={cn(
            "relative flex flex-col items-center justify-center flex-1 h-full py-1 rounded-2xl transition-all duration-200 active:scale-95",
            "hover:bg-black/[0.03] dark:hover:bg-white/[0.06]",
            isChecklistActive
              ? "text-apple-blue font-bold"
              : "text-ash hover:text-ink dark:hover:text-white"
          )}
        >
          {isChecklistActive && (
            <span className="absolute top-1.5 w-7 h-1 rounded-full bg-apple-blue shadow-sm" />
          )}
          <CheckSquare className="w-5 h-5" />
          <span className="text-[12px] mt-0.5 font-medium uppercase tracking-wider whitespace-nowrap">Docs</span>
        </button>

        {/* Tab 4: IRIS Guide */}
        <button
          type="button"
          onClick={() => appClip.open("iris-guide")}
          className={cn(
            "relative flex flex-col items-center justify-center flex-1 h-full py-1 rounded-2xl transition-all duration-200 active:scale-95",
            "hover:bg-black/[0.03] dark:hover:bg-white/[0.06]",
            isGuideActive
              ? "text-apple-blue font-bold"
              : "text-ash hover:text-ink dark:hover:text-white"
          )}
        >
          {isGuideActive && (
            <span className="absolute top-1.5 w-7 h-1 rounded-full bg-apple-blue shadow-sm" />
          )}
          <HelpCircle className="w-5 h-5" />
          <span className="text-[12px] mt-0.5 font-medium uppercase tracking-wider whitespace-nowrap">Guide</span>
        </button>

        {/* Tab 5: Start Fast AppClip Intake FAB */}
        <button
          type="button"
          onClick={() => appClip.open("tax-intake")}
          className="flex items-center justify-center w-11 h-11 rounded-full bg-apple-blue hover:bg-apple-blue/90 text-white shadow-md shadow-apple-blue/30 active:scale-90 transition-all ml-1 shrink-0"
          aria-label="Start Fast Intake AppClip"
        >
          <Sparkles className="w-4 h-4 text-white" />
        </button>
      </nav>
    </div>
  );
}
