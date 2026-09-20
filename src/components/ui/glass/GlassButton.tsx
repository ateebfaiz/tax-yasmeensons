import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "whatsapp" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  icon?: ReactNode;
}

export function GlassButton({
  variant = "primary",
  size = "md",
  children,
  icon,
  className = "",
  disabled,
  ...props
}: GlassButtonProps) {
  const sizeStyles = {
    sm: "h-10 px-4 text-xs rounded-full",
    md: "h-12 px-6 text-xs sm:text-sm rounded-full",
    lg: "h-13 sm:h-14 px-8 text-sm sm:text-base rounded-full",
  };

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-[#20b6a5] to-[#0d978b] hover:from-[#24cbb7] hover:to-[#0fa396] text-white font-bold shadow-[0_4px_20px_rgba(32,182,165,0.35)] border border-white/20 active:scale-95",
    secondary:
      "bg-[rgba(27,37,43,0.72)] hover:bg-[rgba(36,52,60,0.85)] border border-white/[0.16] text-[#f5f7f8] font-semibold backdrop-blur-xl shadow-sm active:scale-95",
    whatsapp:
      "bg-[rgba(27,37,43,0.72)] hover:bg-[rgba(36,52,60,0.85)] border border-[#25D366]/35 hover:border-[#25D366] text-[#25D366] font-bold backdrop-blur-xl shadow-sm active:scale-95",
    ghost:
      "bg-transparent hover:bg-white/[0.06] text-[#aeb9bf] hover:text-[#f5f7f8] active:scale-95",
  };

  return (
    <button
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center gap-2.5 font-mono select-none transition-all duration-200 outline-none disabled:opacity-40 disabled:pointer-events-none",
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}

export default GlassButton;
