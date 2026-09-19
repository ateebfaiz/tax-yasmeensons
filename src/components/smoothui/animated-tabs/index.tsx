"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import { type ReactNode, useCallback, useId, useState } from "react";

export interface AnimatedTabsProps {
  activeTab?: string;
  className?: string;
  defaultTab?: string;
  layoutId?: string;
  onChange?: (tabId: string) => void;
  tabs: { id: string; label: string; icon?: ReactNode }[];
  variant?: "underline" | "pill" | "segment";
}

const SPRING = {
  bounce: 0.05,
  duration: 0.25,
  type: "spring" as const,
};

export default function AnimatedTabs({
  tabs,
  activeTab: controlledActiveTab,
  defaultTab,
  onChange,
  variant = "underline",
  layoutId: customLayoutId,
  className,
}: AnimatedTabsProps) {
  const shouldReduceMotion = useReducedMotion();
  const generatedId = useId();
  const layoutId = customLayoutId ?? `animated-tabs-${generatedId}`;

  const [internalActiveTab, setInternalActiveTab] = useState(
    defaultTab ?? tabs[0]?.id ?? ""
  );

  const isControlled = controlledActiveTab !== undefined;
  const activeTab = isControlled ? controlledActiveTab : internalActiveTab;

  const handleTabChange = useCallback(
    (tabId: string) => {
      if (!isControlled) {
        setInternalActiveTab(tabId);
      }
      onChange?.(tabId);
    },
    [isControlled, onChange]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent, currentIndex: number) => {
      let newIndex = currentIndex;

      if (event.key === "ArrowRight") {
        event.preventDefault();
        newIndex = (currentIndex + 1) % tabs.length;
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      } else if (event.key === "Home") {
        event.preventDefault();
        newIndex = 0;
      } else if (event.key === "End") {
        event.preventDefault();
        newIndex = tabs.length - 1;
      } else {
        return;
      }

      const newTab = tabs[newIndex];
      if (newTab) {
        handleTabChange(newTab.id);
        const tabElement = document.getElementById(
          `${layoutId}-tab-${newTab.id}`
        );
        tabElement?.focus();
      }
    },
    [tabs, handleTabChange, layoutId]
  );

  const baseContainerStyles = cn(
    "relative inline-flex",
    variant === "underline" && "gap-1 border-oklch(0.922 0 0) border-b dark:border-oklch(1 0 0 / 10%)",
    variant === "pill" && "gap-1 rounded-full bg-oklch(0.97 0 0) p-1 dark:bg-oklch(0.269 0 0)",
    variant === "segment" && "gap-0 rounded-lg bg-oklch(0.97 0 0) p-1 dark:bg-oklch(0.269 0 0)"
  );

  const getTabStyles = (isActive: boolean) =>
    cn(
      "relative z-10 flex cursor-pointer items-center justify-center gap-2 px-4 py-2 font-medium text-sm transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oklch(0.708 0 0) focus-visible:ring-offset-2 dark:focus-visible:ring-oklch(0.556 0 0)",
      variant === "underline" && [
        "rounded-t-md",
        isActive
          ? "text-oklch(0.145 0 0) dark:text-oklch(0.985 0 0)"
          : "text-oklch(0.556 0 0) hover:text-oklch(0.145 0 0) dark:text-oklch(0.708 0 0) dark:hover:text-oklch(0.985 0 0)",
      ],
      variant === "pill" && [
        "rounded-full",
        isActive
          ? "text-oklch(0.145 0 0) dark:text-oklch(0.985 0 0)"
          : "text-oklch(0.556 0 0) hover:text-oklch(0.145 0 0) dark:text-oklch(0.708 0 0) dark:hover:text-oklch(0.985 0 0)",
      ],
      variant === "segment" && [
        "flex-1 rounded-md",
        isActive
          ? "text-oklch(0.145 0 0) dark:text-oklch(0.985 0 0)"
          : "text-oklch(0.556 0 0) hover:text-oklch(0.145 0 0) dark:text-oklch(0.708 0 0) dark:hover:text-oklch(0.985 0 0)",
      ]
    );

  const getIndicatorStyles = () =>
    cn(
      "absolute",
      variant === "underline" && "right-0 -bottom-px left-0 h-0.5 bg-brand",
      variant === "pill" &&
        "inset-0 rounded-full border border-oklch(0.922 0 0) bg-oklch(1 0 0) shadow-sm dark:border-oklch(1 0 0 / 10%) dark:bg-oklch(0.145 0 0)",
      variant === "segment" &&
        "inset-0 rounded-md border border-oklch(0.922 0 0) bg-oklch(1 0 0) shadow-sm dark:border-oklch(1 0 0 / 10%) dark:bg-oklch(0.145 0 0)"
    );

  return (
    <div
      aria-label="Tabs"
      className={cn(baseContainerStyles, className)}
      role="tablist"
    >
      {tabs.map((tab, index) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            aria-selected={isActive}
            className={getTabStyles(isActive)}
            id={`${layoutId}-tab-${tab.id}`}
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            role="tab"
            tabIndex={isActive ? 0 : -1}
            type="button"
          >
            {isActive && (
              <motion.span
                className={getIndicatorStyles()}
                layout
                layoutId={layoutId}
                style={{ originY: "0px" }}
                transition={shouldReduceMotion ? { duration: 0 } : SPRING}
              />
            )}
            {tab.icon ? (
              <span className="relative z-10">{tab.icon}</span>
            ) : null}
            <span className="relative z-10">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
