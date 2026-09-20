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
      "bg-gradient-to-r from-palette-coral to-palette-coral-hover text-white font-bold shadow-[0_4px_20px_rgba(238,108,77,0.30)] border border-palette-coral/30 hover:opacity-95 active:scale-95",
    secondary:
      "bg-paper-light dark:bg-palette-gunmetal/80 hover:bg-paper dark:hover:bg-palette-gunmetal border border-rule/80 hover:border-palette-coral/50 text-ink dark:text-palette-frost font-semibold backdrop-blur-xl shadow-sm active:scale-95",
    whatsapp:
      "bg-paper-light dark:bg-palette-gunmetal/80 hover:bg-paper dark:hover:bg-palette-gunmetal border border-[#25D366]/40 hover:border-[#25D366] text-[#25D366] font-bold backdrop-blur-xl shadow-sm active:scale-95",
    ghost:
      "bg-transparent hover:bg-black/5 dark:hover:bg-white/[0.08] text-ash hover:text-ink dark:hover:text-palette-frost active:scale-95",
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
