"use client";

import React, { ReactNode } from "react";
import { motion, useDragControls } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { clipType } from "./clip-ui";

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
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998]" onClick={onClose} />

      <motion.div
        key="app-clip-sheet"
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 300 }}
        drag="y"
        dragControls={dragControls}
        dragListener={false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0.05, bottom: 0.8 }}
        onDragEnd={(_e, info) => {
          if (info.offset.y > 60 || info.velocity.y > 250) onClose();
        }}
        className={cn(
          "fixed bottom-0 left-0 right-0 mx-auto w-full max-w-lg z-[9999]",
          "flex flex-col pb-safe",
          "bg-theme-glass backdrop-blur-2xl border-t border-theme-glass-border text-theme-text",
          "rounded-t-[2rem] overflow-hidden shadow-[0_-8px_40px_rgba(0,0,0,0.16)]"
        )}
        style={{
          height: fullHeight ? "92dvh" : "auto",
          maxHeight: "92dvh",
        }}
      >
        <div
          onPointerDown={(e) => dragControls.start(e)}
          className="w-full cursor-grab active:cursor-grabbing shrink-0 touch-none select-none relative z-20 pt-3 pb-2 border-b border-theme-border/40"
        >
          <div className="w-full flex justify-center pb-2">
            <div className="w-12 h-1 rounded-full bg-theme-border" />
          </div>

          <div className="px-5 flex justify-between items-start gap-3">
            <div className="min-w-0">
              <h2 className={cn(clipType.display, "pr-2")}>{title}</h2>
              {subtitle && <p className={cn(clipType.meta, "mt-0.5")}>{subtitle}</p>}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {headerRight}
              <button
                type="button"
                onClick={onClose}
                onPointerDown={(e) => e.stopPropagation()}
                aria-label="Close"
                className="w-8 h-8 rounded-full border border-theme-border bg-theme-surface flex items-center justify-center active:scale-90 transition hover:bg-theme-muted"
              >
                <X className="w-4 h-4 text-theme-text" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain relative z-10">{children}</div>
      </motion.div>
    </>
  );
}
