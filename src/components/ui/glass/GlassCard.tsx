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
    default:
      "border text-ink shadow-[0_4px_24px_rgba(0,0,0,0.04)]",
    active:
      "bg-apple-blue/10 border-apple-blue/50 text-ink dark:text-white",
    subtle:
      "bg-black/[0.03] dark:bg-white/[0.05] border-black/[0.05] dark:border-white/[0.08] text-ash dark:text-system-secondary-label",
    glow:
      "bg-white/75 dark:bg-[#2c2c2e]/75 border-apple-blue/40",
  };

  return (
    <div
      className={cn(
        "rounded-[20px] border p-4 sm:p-5 transition-all duration-200",
        variantStyles[variant],
        interactive &&
          "cursor-pointer hover:border-apple-blue/50 hover:bg-white/85 dark:hover:bg-[#2c2c2e]/85 active:scale-[0.985]",
        className
      )}
      style={{
        backgroundColor: variant === "default" ? "var(--glass-card-bg)" : undefined,
        borderColor: variant === "default" ? "var(--glass-border)" : undefined,
        color: "var(--text-primary)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        backdropFilter: "blur(24px) saturate(180%)",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export default GlassCard;
