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
        className="fixed inset-0 bg-ink/40 backdrop-blur-md z-[9998]"
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
          "fixed bottom-0 left-0 right-0 mx-auto w-full max-w-xl z-[9999]",
          "flex flex-col pb-safe",
          "bg-white/95 dark:bg-[#0B1C2C]/95 backdrop-blur-2xl backdrop-saturate-180",
          "border-t border-x border-[#C4A046]/40 text-ink dark:text-paper-light",
          "rounded-t-[36px] overflow-hidden shadow-[0_-16px_60px_rgba(11,28,44,0.28)]"
        )}
        style={{
          height: fullHeight ? "92dvh" : "auto",
          maxHeight: "92dvh",
        }}
      >
        <div
          onPointerDown={(e) => dragControls.start(e)}
          className="w-full cursor-grab active:cursor-grabbing shrink-0 touch-none select-none relative z-20 pt-3 pb-3 border-b border-rule/50 bg-white/40 dark:bg-black/20"
        >
          <div className="w-full flex justify-center pb-2">
            <div className="w-12 h-1.5 rounded-full bg-brass/40" />
          </div>

          <div className="px-6 flex justify-between items-center gap-3">
            <div className="min-w-0">
              <div className="font-serif text-lg font-bold text-ink tracking-tight truncate">
                {title}
              </div>
              {subtitle && <div className="text-xs text-ash truncate mt-0.5">{subtitle}</div>}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {headerRight}
              <button
                type="button"
                onClick={onClose}
                onPointerDown={(e) => e.stopPropagation()}
                aria-label="Close sheet"
                className="w-8 h-8 rounded-full border border-rule/70 bg-paper-light/90 hover:bg-paper flex items-center justify-center active:scale-95 transition-all text-ink shadow-sm"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain relative z-10 px-6 py-4">
          {children}
        </div>
      </motion.div>
    </>
  );
}
