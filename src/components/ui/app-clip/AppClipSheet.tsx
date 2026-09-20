"use client";

import React, { ReactNode } from "react";
import { motion, useDragControls } from "motion/react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AppClipSheetProps {
  onClose: () => void;
  title: ReactNode;
  subtitle?: ReactNode;
  fullHeight?: boolean;
  children: ReactNode;
  headerRight?: ReactNode;
}

export function AppClipSheet({
  onClose,
  title,
  subtitle,
  children,
  headerRight,
}: AppClipSheetProps) {
  const dragControls = useDragControls();

  return (
    <>
      {/* Backdrop with soft dimming */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/65 backdrop-blur-[8px] z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Safari History Dark Glass Sheet Container */}
      <motion.div
        key="app-clip-sheet"
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 340 }}
        drag="y"
        dragControls={dragControls}
        dragListener={false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0.05, bottom: 0.6 }}
        onDragEnd={(_e, info) => {
          if (info.offset.y > 60 || info.velocity.y > 280) onClose();
        }}
        className={cn(
          "fixed bottom-0 left-0 right-0 mx-auto w-full max-w-lg z-50",
          "flex flex-col",
          "bg-[rgba(22,30,36,0.92)] text-[#f5f7f8]",
          "backdrop-blur-[24px] backdrop-saturate-[150%]",
          "border-t border-x border-white/[0.12]",
          "rounded-t-[28px] sm:rounded-t-[32px] overflow-hidden",
          "shadow-[0_-20px_60px_rgba(0,0,0,0.6),inset_0_1px_1px_0_rgba(255,255,255,0.12)]"
        )}
        style={{
          maxHeight: "90dvh",
          paddingBottom: "calc(env(safe-area-inset-bottom, 16px) + 16px)",
        }}
      >
        {/* Subtle teal center illumination behind sheet header */}
        <div className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-32 bg-[#20b6a5]/15 blur-3xl rounded-full" />

        {/* Refined Glass Grab Bar & Header */}
        <div
          onPointerDown={(e) => dragControls.start(e)}
          className="w-full cursor-grab active:cursor-grabbing shrink-0 touch-none select-none relative z-20 pt-3 pb-3 border-b border-white/[0.08] bg-white/[0.02] backdrop-blur-xl"
        >
          <div className="w-full flex justify-center pb-2.5">
            <div className="w-10 h-1 rounded-full bg-white/25 shadow-[inset_0_1px_1px_rgba(0,0,0,0.3)]" />
          </div>

          <div className="px-5 flex justify-between items-center gap-3">
            <div className="min-w-0">
              <div className="font-serif text-lg font-bold text-[#f5f7f8] tracking-tight truncate">
                {title}
              </div>
              {subtitle && (
                <div className="text-xs text-[#aeb9bf] truncate mt-0.5">{subtitle}</div>
              )}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {headerRight}
              <button
                type="button"
                onClick={onClose}
                onPointerDown={(e) => e.stopPropagation()}
                aria-label="Close sheet"
                className="w-9 h-9 rounded-full border border-white/15 bg-white/[0.06] hover:bg-white/[0.12] focus-visible:ring-2 focus-visible:ring-[#20b6a5] flex items-center justify-center active:scale-95 transition-all text-[#f5f7f8] shadow-sm"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Content Container with natural sizing */}
        <div className="flex-1 overflow-y-auto overscroll-contain relative z-10 px-4 sm:px-5 py-3">
          {children}
        </div>
      </motion.div>
    </>
  );
}

export default AppClipSheet;
