"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Home, Layers, CheckSquare, Sparkles, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppClip } from "@/components/ui/app-clip/AppClipProvider";

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

  // Don't show tab bar on fullscreen intake page if open
  if (pathname === "/start") {
    return null;
  }

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
          "bg-theme-surface/85 backdrop-blur-2xl backdrop-saturate-200 border border-theme-glass-border",
          "shadow-[0_-4px_24px_rgba(0,0,0,0.10)]"
        )}
      >
        {/* Tab 1: Home */}
        <button
          type="button"
          onClick={() => router.push("/")}
          className={cn(
            "flex flex-col items-center justify-center flex-1 py-1 transition-all",
            pathname === "/" ? "text-theme-primary font-bold" : "text-theme-text-muted hover:text-theme-text"
          )}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Home</span>
        </button>

        {/* Tab 2: Services */}
        <button
          type="button"
          onClick={() => router.push("/services")}
          className={cn(
            "flex flex-col items-center justify-center flex-1 py-1 transition-all",
            pathname === "/services" ? "text-theme-primary font-bold" : "text-theme-text-muted hover:text-theme-text"
          )}
        >
          <Layers className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Services</span>
        </button>

        {/* Tab 3: Checklist Clip */}
        <button
          type="button"
          onClick={() => appClip.open("tax-checklist")}
          className={cn(
            "flex flex-col items-center justify-center flex-1 py-1 transition-all",
            appClip.activeClip === "tax-checklist" ? "text-theme-primary font-bold" : "text-theme-text-muted hover:text-theme-text"
          )}
        >
          <CheckSquare className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Checklist</span>
        </button>

        {/* Tab 4: WhatsApp Clip */}
        <button
          type="button"
          onClick={() => appClip.open("whatsapp-intake")}
          className="flex flex-col items-center justify-center flex-1 py-1 text-[#25D366] hover:opacity-80 transition-all"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 font-bold">WhatsApp</span>
        </button>

        {/* Tab 5: Start Primary Action */}
        <button
          type="button"
          onClick={() => appClip.open("tax-intake")}
          className="flex items-center justify-center w-11 h-11 rounded-full bg-theme-primary text-white shadow-md active:scale-95 transition-all ml-1 shrink-0"
          aria-label="Start Filing"
        >
          <Sparkles className="w-5 h-5" />
        </button>
      </nav>
    </div>
  );
}
