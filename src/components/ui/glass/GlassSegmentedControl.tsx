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
      <div className="flex items-center gap-1.5 p-1.5 rounded-[22px] bg-[rgba(22,30,36,0.7)] border border-white/[0.08] backdrop-blur-xl overflow-x-auto no-scrollbar scroll-smooth">
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
                  ? "bg-[rgba(32,182,165,0.22)] border border-[#20b6a5]/50 text-[#f5f7f8] shadow-[0_0_16px_rgba(32,182,165,0.25)] font-bold"
                  : "bg-transparent hover:bg-white/[0.04] text-[#aeb9bf] hover:text-[#f5f7f8] border border-transparent"
              )}
            >
              <span>{tab.label}</span>
              {tab.labelUrdu && (
                <span className="font-urdu text-[11px] opacity-80" dir="rtl">
                  {tab.labelUrdu}
                </span>
              )}
              {tab.badge && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/10 text-white font-bold">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
      {/* Right scroll fade affordance */}
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[#07131b]/80 to-transparent" />
    </div>
  );
}

export default GlassSegmentedControl;
