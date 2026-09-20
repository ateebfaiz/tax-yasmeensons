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
      "bg-[rgba(27,37,43,0.72)] border-white/[0.12] text-[#f5f7f8] shadow-[0_4px_24px_rgba(0,0,0,0.25)]",
    active:
      "bg-[rgba(32,182,165,0.12)] border-[#20b6a5]/40 text-[#f5f7f8] shadow-[0_0_24px_rgba(32,182,165,0.2)]",
    subtle:
      "bg-[rgba(22,30,36,0.6)] border-white/[0.08] text-[#aeb9bf]",
    glow:
      "bg-[rgba(27,37,43,0.82)] border-[#20b6a5]/50 shadow-[0_0_32px_rgba(32,182,165,0.25)]",
  };

  return (
    <div
      className={cn(
        "rounded-[20px] border backdrop-blur-[20px] backdrop-saturate-[140%] p-4 sm:p-5 transition-all duration-200",
        variantStyles[variant],
        interactive &&
          "cursor-pointer hover:border-white/[0.22] hover:bg-[rgba(36,52,60,0.85)] active:scale-[0.985]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default GlassCard;
