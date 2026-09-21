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
      "bg-apple-blue hover:bg-apple-blue/90 text-white font-semibold shadow-sm active:scale-95",
    secondary:
      "bg-white/45 dark:bg-[#1c1c1e]/45 hover:bg-white/60 dark:hover:bg-[#2c2c2e]/60 border-[0.5px] border-black/[0.06] dark:border-white/[0.08] text-ink dark:text-white font-semibold backdrop-blur-xl active:scale-95",
    whatsapp:
      "bg-white/80 dark:bg-[#1c1c1e]/80 hover:bg-white dark:hover:bg-[#2c2c2e] border border-[#25D366]/40 hover:border-[#25D366] text-[#25D366] font-bold backdrop-blur-xl shadow-sm active:scale-95",
    ghost:
      "bg-transparent hover:bg-black/5 dark:hover:bg-white/[0.08] text-ash hover:text-ink dark:hover:text-white active:scale-95",
  };

  return (
    <button
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center gap-2.5 font-semibold select-none whitespace-nowrap transition-all duration-200 outline-none disabled:opacity-40 disabled:pointer-events-none",
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
