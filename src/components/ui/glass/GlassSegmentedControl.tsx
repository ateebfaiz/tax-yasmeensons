import React from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  labelUrdu?: string;
  badge?: string;
}

export interface GlassSegmentedControlProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export function GlassSegmentedControl({
  tabs,
  activeTab,
  onChange,
  className = "",
}: GlassSegmentedControlProps) {
  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <div className="flex items-center gap-1.5 p-1.5 rounded-[22px] bg-paper-light/70 dark:bg-palette-gunmetal/60 border border-rule/60 backdrop-blur-xl overflow-x-auto no-scrollbar scroll-smooth">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={cn(
                "flex-shrink-0 px-3.5 py-2 rounded-[16px] text-xs font-mono font-medium transition-all duration-200 select-none flex items-center gap-2",
                isActive
                  ? "bg-palette-coral text-white font-bold shadow-[0_0_16px_rgba(238,108,77,0.30)] border border-palette-coral"
                  : "bg-transparent hover:bg-black/5 dark:hover:bg-white/[0.06] text-ash dark:text-palette-sky hover:text-ink dark:hover:text-palette-frost border border-transparent"
              )}
            >
              <span>{tab.label}</span>
              {tab.labelUrdu && (
                <span className="font-urdu text-[11px] opacity-80" dir="rtl">
                  {tab.labelUrdu}
                </span>
              )}
              {tab.badge && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/10 dark:bg-white/10 font-bold">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
      {/* Right scroll fade affordance */}
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-paper dark:from-palette-gunmetal to-transparent" />
    </div>
  );
}

export default GlassSegmentedControl;
