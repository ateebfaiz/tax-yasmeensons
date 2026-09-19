"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Home, Layers, CheckSquare, Sparkles, MessageCircle, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function LiquidGlassTabBar() {
  const pathname = usePathname();
  const router = useRouter();

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
          "flex items-center justify-between max-w-sm mx-auto h-16 rounded-[24px] overflow-hidden px-3",
          "bg-[#0B1C2C] text-[#F4EFE6] border border-[#C4A046]/40",
          "shadow-[0_-4px_24px_rgba(11,28,44,0.30)]"
        )}
      >
        {/* Tab 1: Home */}
        <button
          type="button"
          onClick={() => router.push("/")}
          className={cn(
            "flex flex-col items-center justify-center flex-1 py-1 transition-all",
            pathname === "/" ? "text-[#C4A046] font-bold" : "text-[#8C959F] hover:text-[#F4EFE6]"
          )}
        >
          <Home className="w-4 h-4" />
          <span className="text-[10px] mt-0.5 font-mono">Home</span>
        </button>

        {/* Tab 2: Services */}
        <button
          type="button"
          onClick={() => router.push("/services")}
          className={cn(
            "flex flex-col items-center justify-center flex-1 py-1 transition-all",
            pathname === "/services" ? "text-[#C4A046] font-bold" : "text-[#8C959F] hover:text-[#F4EFE6]"
          )}
        >
          <Layers className="w-4 h-4" />
          <span className="text-[10px] mt-0.5 font-mono">Services</span>
        </button>

        {/* Tab 3: Checklist */}
        <button
          type="button"
          onClick={() => router.push("/requirements")}
          className={cn(
            "flex flex-col items-center justify-center flex-1 py-1 transition-all",
            pathname === "/requirements" ? "text-[#C4A046] font-bold" : "text-[#8C959F] hover:text-[#F4EFE6]"
          )}
        >
          <CheckSquare className="w-4 h-4" />
          <span className="text-[10px] mt-0.5 font-mono">Docs</span>
        </button>

        {/* Tab 4: IRIS Guide */}
        <button
          type="button"
          onClick={() => router.push("/iris-guide")}
          className={cn(
            "flex flex-col items-center justify-center flex-1 py-1 transition-all",
            pathname === "/iris-guide" ? "text-[#C4A046] font-bold" : "text-[#8C959F] hover:text-[#F4EFE6]"
          )}
        >
          <HelpCircle className="w-4 h-4" />
          <span className="text-[10px] mt-0.5 font-mono">Guide</span>
        </button>

        {/* Tab 5: Start Primary Action */}
        <button
          type="button"
          onClick={() => router.push("/start")}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-[#C4A046] text-[#0B1C2C] shadow active:scale-95 transition-all ml-1 shrink-0 font-bold"
          aria-label="Start Filing"
        >
          <Sparkles className="w-4 h-4" />
        </button>
      </nav>
    </div>
  );
}
