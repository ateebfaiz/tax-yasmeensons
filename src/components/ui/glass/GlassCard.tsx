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
  ...props
}: GlassCardProps) {
  const variantStyles = {
    default:
      "bg-white/80 dark:bg-palette-gunmetal/75 border-rule/70 dark:border-palette-sky/20 text-ink dark:text-palette-frost shadow-sm",
    active:
      "bg-palette-coral/10 border-palette-coral/50 text-ink dark:text-palette-frost shadow-[0_0_20px_rgba(238,108,77,0.20)]",
    subtle:
      "bg-paper-light/60 dark:bg-palette-gunmetal/50 border-rule/50 dark:border-palette-sky/10 text-ash dark:text-palette-sky",
    glow:
      "bg-white/90 dark:bg-palette-gunmetal/85 border-palette-coral/40 shadow-[0_0_28px_rgba(238,108,77,0.20)]",
  };

  return (
    <div
      className={cn(
        "rounded-[20px] border backdrop-blur-[20px] backdrop-saturate-[140%] p-4 sm:p-5 transition-all duration-200",
        variantStyles[variant],
        interactive &&
          "cursor-pointer hover:border-palette-coral/50 hover:bg-white dark:hover:bg-palette-gunmetal active:scale-[0.985]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default GlassCard;
