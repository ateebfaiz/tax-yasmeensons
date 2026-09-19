"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Home, Layers, CheckSquare, Sparkles, HelpCircle } from "lucide-react";
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
  const isServicesActive = pathname === "/services";
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
        className={cn(
          "flex items-center justify-between max-w-sm mx-auto h-16 rounded-[28px] overflow-hidden px-3",
          "bg-[#0B1C2C]/92 backdrop-blur-2xl backdrop-saturate-200 text-[#F4EFE6] border border-[#C4A046]/45",
          "shadow-[0_8px_32px_rgba(11,28,44,0.35)]"
        )}
      >
        {/* Tab 1: Home */}
        <button
          type="button"
          onClick={() => {
            if (appClip.isOpen) appClip.close();
            router.push("/");
          }}
          className={cn(
            "flex flex-col items-center justify-center flex-1 py-1 transition-all active:scale-95",
            isHomeActive ? "text-[#C4A046] font-bold" : "text-[#8C959F] hover:text-[#F4EFE6]"
          )}
        >
          <Home className="w-4 h-4" />
          <span className="text-[10px] mt-0.5 font-mono">Home</span>
        </button>

        {/* Tab 2: Services */}
        <button
          type="button"
          onClick={() => {
            if (appClip.isOpen) appClip.close();
            router.push("/services");
          }}
          className={cn(
            "flex flex-col items-center justify-center flex-1 py-1 transition-all active:scale-95",
            isServicesActive ? "text-[#C4A046] font-bold" : "text-[#8C959F] hover:text-[#F4EFE6]"
          )}
        >
          <Layers className="w-4 h-4" />
          <span className="text-[10px] mt-0.5 font-mono">Services</span>
        </button>

        {/* Tab 3: Checklist (AppClip Sheet) */}
        <button
          type="button"
          onClick={() => appClip.open("tax-checklist")}
          className={cn(
            "flex flex-col items-center justify-center flex-1 py-1 transition-all active:scale-95",
            isChecklistActive ? "text-[#C4A046] font-bold" : "text-[#8C959F] hover:text-[#F4EFE6]"
          )}
        >
          <CheckSquare className="w-4 h-4" />
          <span className="text-[10px] mt-0.5 font-mono">Docs</span>
        </button>

        {/* Tab 4: IRIS Guide (AppClip Sheet) */}
        <button
          type="button"
          onClick={() => appClip.open("iris-guide")}
          className={cn(
            "flex flex-col items-center justify-center flex-1 py-1 transition-all active:scale-95",
            isGuideActive ? "text-[#C4A046] font-bold" : "text-[#8C959F] hover:text-[#F4EFE6]"
          )}
        >
          <HelpCircle className="w-4 h-4" />
          <span className="text-[10px] mt-0.5 font-mono">Guide</span>
        </button>

        {/* Tab 5: Start Primary AppClip FAB */}
        <button
          type="button"
          onClick={() => appClip.open("tax-intake")}
          className="flex items-center justify-center w-11 h-11 rounded-full bg-[#C4A046] hover:bg-[#DFBA5E] text-[#0B1C2C] shadow-lg active:scale-90 transition-all ml-1 shrink-0 font-bold"
          aria-label="Start Filing AppClip"
        >
          <Sparkles className="w-4 h-4" />
        </button>
      </nav>
    </div>
  );
}
