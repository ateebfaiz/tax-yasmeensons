"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ShieldCheck,
  Sparkles,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  FileText,
  Clock,
  Zap,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/icons/whatsapp-icon";
import { useAppClip } from "@/components/ui/app-clip/AppClipProvider";
import { formatWhatsAppUrl } from "@/lib/utils";

export type IslandView = "idle" | "support" | "intake" | "iris";

export interface TaxDynamicIslandProps {
  className?: string;
  activeCaseRef?: string | null;
}

export function TaxDynamicIsland({ className = "", activeCaseRef }: TaxDynamicIslandProps) {
  const router = useRouter();
  const [view, setView] = useState<IslandView>("idle");
  const [isHovered, setIsHovered] = useState(false);
  const appClip = useAppClip();
  const shouldReduceMotion = useReducedMotion();

  // Content for each view
  const content = useMemo(() => {
    switch (view) {
      case "support":
        return (
          <div className="flex items-center gap-3 px-4 py-2 text-white">
            <div className="w-8 h-8 rounded-full bg-[#25D366]/20 flex items-center justify-center text-[#25D366] shrink-0">
              <WhatsAppIcon className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs text-white">Tax Desk Online</span>
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              </div>
              <div className="text-[11px] text-white/70 font-mono truncate">
                0312 0947187 • Direct Specialist
              </div>
            </div>
            <a
              href={formatWhatsAppUrl("Hi, I want assistance with Tax Year 2026 filing.", "03120947187")}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 rounded-full bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold text-[11px] transition-colors focus-visible:ring-2 focus-visible:ring-white shrink-0"
            >
              Chat
            </a>
          </div>
        );

      case "intake":
        return (
          <div className="flex items-center gap-3 px-4 py-2 text-white">
            <div className="w-8 h-8 rounded-full bg-[#C4A046]/20 flex items-center justify-center text-[#C4A046] shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-bold text-xs text-white">60-Second Fast Intake</div>
              <div className="text-[11px] text-white/70 truncate">
                No Passwords • Senior Desk
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                if (typeof window !== "undefined" && window.innerWidth >= 768) {
                  router.push("/start");
                } else {
                  appClip.open("tax-intake");
                }
              }}
              className="px-3 py-1 rounded-full bg-[#C4A046] hover:bg-[#DFBA5E] text-[#0B1C2C] font-bold text-[11px] transition-colors focus-visible:ring-2 focus-visible:ring-white shrink-0"
            >
              Open
            </button>
          </div>
        );

      case "iris":
        return (
          <div className="flex items-center gap-3 px-4 py-2 text-white">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-bold text-xs text-white">Official IRIS Verification</div>
              <div className="text-[11px] text-white/70 font-mono truncate">
                iris.fbr.gov.pk • Form 181
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                if (typeof window !== "undefined" && window.innerWidth >= 768) {
                  router.push("/iris-guide");
                } else {
                  appClip.open("iris-guide");
                }
              }}
              className="px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 text-white font-bold text-[11px] transition-colors focus-visible:ring-2 focus-visible:ring-white shrink-0"
            >
              Guide
            </button>
          </div>
        );

      default:
        // IDLE VIEW
        return (
          <div
            className="flex items-center gap-2.5 px-3.5 py-1.5 text-white cursor-pointer select-none"
            onClick={() => setView("intake")}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="font-mono text-[11px] font-bold tracking-tight text-white/90">
              {activeCaseRef ? `CASE: ${activeCaseRef}` : "TY2026 INDIVIDUAL PRACTICE"}
            </span>

            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center gap-1.5 overflow-hidden pl-1 border-l border-white/20 text-[10px] text-white/80 font-mono"
                >
                  <span className="text-[#C4A046] font-semibold">Zero-Password</span>
                  <ChevronRight className="w-3 h-3 text-white/50" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
    }
  }, [view, isHovered, activeCaseRef, appClip]);

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      {/* Morphing Dynamic Island Pill */}
      <motion.div
        layout
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-fit min-w-[140px] max-w-sm overflow-hidden rounded-full bg-[#07121D] border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : {
                type: "spring",
                stiffness: 380,
                damping: 30,
              }
        }
      >
        <motion.div
          key={view}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.15 }}
        >
          {content}
        </motion.div>
      </motion.div>

      {/* Micro Mode Toggles */}
      <div className="mt-1.5 flex items-center justify-center gap-1.5">
        {[
          { key: "idle", label: "Status", icon: Sparkles },
          { key: "support", label: "Support", icon: WhatsAppIcon },
          { key: "intake", label: "Fast Intake", icon: Zap },
          { key: "iris", label: "IRIS Guide", icon: ShieldCheck },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = view === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setView(tab.key as IslandView)}
              aria-label={tab.label}
              className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono transition-colors active:scale-95 focus-visible:ring-1 focus-visible:ring-black dark:focus-visible:ring-white ${
                isActive
                  ? "bg-black/10 dark:bg-white/15 text-ink dark:text-white font-bold"
                  : "text-ash hover:text-ink dark:text-[#8C959F] dark:hover:text-white"
              }`}
            >
              <Icon className="w-3 h-3" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
