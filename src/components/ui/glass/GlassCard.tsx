import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  variant?: "default" | "active" | "subtle" | "glow";
  interactive?: boolean;
}

export function GlassCard({
  children,
  className = "",
  variant = "default",
  interactive = false,
  style,
  ...props
}: GlassCardProps) {
  const variantStyles = {
    default: "text-ink",
    active: "bg-apple-blue/10 text-ink dark:text-white",
    subtle:
      "bg-black/[0.03] dark:bg-white/[0.05] text-ash dark:text-system-secondary-label",
    glow: "bg-white/40 dark:bg-[#2c2c2e]/40",
  };

  return (
    <div
      className={cn(
        "rounded-[20px] p-4 sm:p-5 transition-all duration-200",
        variantStyles[variant],
        interactive &&
          "cursor-pointer hover:bg-white/55 dark:hover:bg-[#2c2c2e]/55 active:scale-[0.985]",
        className
      )}
      style={{
        backgroundColor: variant === "default" ? "var(--glass-card-bg)" : undefined,
        border: "0.5px solid var(--glass-border)",
        boxShadow: "inset 0 1px 0 var(--glass-highlight)",
        color: "var(--text-primary)",
        WebkitBackdropFilter: "blur(32px) saturate(180%)",
        backdropFilter: "blur(32px) saturate(180%)",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export default GlassCard;
