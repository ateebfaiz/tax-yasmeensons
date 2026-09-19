"use client";

import React, { ReactNode } from "react";
import { motion, useDragControls } from "framer-motion";
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
  fullHeight = false,
  children,
  headerRight,
}: AppClipSheetProps) {
  const dragControls = useDragControls();

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/25 dark:bg-black/45 backdrop-blur-[6px] z-40 transition-opacity"
        onClick={onClose}
      />

      <motion.div
        key="app-clip-sheet"
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 320 }}
        drag="y"
        dragControls={dragControls}
        dragListener={false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0.05, bottom: 0.7 }}
        onDragEnd={(_e, info) => {
          if (info.offset.y > 70 || info.velocity.y > 300) onClose();
        }}
        className={cn(
          "fixed bottom-0 left-0 right-0 mx-auto w-full max-w-lg z-50",
          "flex flex-col pb-safe",
          "bg-white/55 dark:bg-[#07121D]/60 backdrop-blur-3xl backdrop-saturate-150",
          "border-t border-x border-white/70 dark:border-white/20 text-ink dark:text-paper-light",
          "rounded-t-[32px] overflow-hidden",
          "shadow-[0_-20px_60px_rgba(0,0,0,0.18),inset_0_1px_1px_0_rgba(255,255,255,0.85)] dark:shadow-[0_-20px_60px_rgba(0,0,0,0.5),inset_0_1px_1px_0_rgba(255,255,255,0.15)]"
        )}
        style={{
          height: fullHeight ? "92dvh" : "auto",
          maxHeight: "92dvh",
        }}
      >
        {/* Frosted Grab Bar & Header */}
        <div
          onPointerDown={(e) => dragControls.start(e)}
          className="w-full cursor-grab active:cursor-grabbing shrink-0 touch-none select-none relative z-20 pt-3 pb-3 border-b border-black/[0.05] dark:border-white/[0.08] bg-white/30 dark:bg-white/[0.03] backdrop-blur-xl"
        >
          <div className="w-full flex justify-center pb-2.5">
            <div className="w-12 h-1.5 rounded-full bg-black/20 dark:bg-white/20 shadow-[inset_0_1px_2px_rgba(0,0,0,0.15)]" />
          </div>

          <div className="px-5 flex justify-between items-center gap-3">
            <div className="min-w-0">
              <div className="font-serif text-lg font-bold text-ink dark:text-[#F4EFE6] tracking-tight truncate">
                {title}
              </div>
              {subtitle && (
                <div className="text-xs text-ash dark:text-[#8C959F] truncate mt-0.5">{subtitle}</div>
              )}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {headerRight}
              <button
                type="button"
                onClick={onClose}
                onPointerDown={(e) => e.stopPropagation()}
                aria-label="Close sheet"
                className="w-8 h-8 rounded-full border border-white/80 dark:border-white/20 bg-white/50 dark:bg-white/10 hover:bg-white/80 dark:hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-[#128C7E] flex items-center justify-center active:scale-95 transition-colors text-ink dark:text-[#F4EFE6] backdrop-blur-md shadow-sm"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain relative z-10 px-4 sm:px-5 py-4">
          {children}
        </div>
      </motion.div>
    </>
  );
}
