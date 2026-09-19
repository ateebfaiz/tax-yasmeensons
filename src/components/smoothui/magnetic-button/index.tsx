"use client";

import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, useReducedMotion, useSpring } from "motion/react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

const magneticButtonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium text-sm ring-offset-oklch(1 0 0) transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oklch(0.708 0 0) focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-oklch(0.145 0 0) dark:focus-visible:ring-oklch(0.556 0 0)",
  {
    defaultVariants: {
      size: "default",
      variant: "default",
    },
    variants: {
      size: {
        default: "h-10 px-4 py-2",
        icon: "h-10 w-10",
        lg: "h-11 rounded-md px-8",
        sm: "h-9 rounded-md px-3",
      },
      variant: {
        default: "bg-oklch(0.205 0 0) text-oklch(0.985 0 0) hover:bg-oklch(0.205 0 0)/90 dark:bg-oklch(0.922 0 0) dark:text-oklch(0.205 0 0) dark:hover:bg-oklch(0.922 0 0)/90",
        destructive:
          "bg-oklch(0.577 0.245 27.325) text-destructive-foreground hover:bg-oklch(0.577 0.245 27.325)/90 dark:bg-oklch(0.704 0.191 22.216) dark:hover:bg-oklch(0.704 0.191 22.216)/90",
        ghost: "hover:bg-oklch(0.97 0 0) hover:text-oklch(0.205 0 0) dark:hover:bg-oklch(0.269 0 0) dark:hover:text-oklch(0.985 0 0)",
        link: "text-oklch(0.145 0 0) underline-offset-4 hover:underline dark:text-oklch(0.985 0 0)",
        outline:
          "border border-oklch(0.922 0 0) bg-oklch(1 0 0) hover:bg-oklch(0.97 0 0) hover:text-oklch(0.205 0 0) dark:border-oklch(1 0 0 / 15%) dark:bg-oklch(0.145 0 0) dark:hover:bg-oklch(0.269 0 0) dark:hover:text-oklch(0.985 0 0)",
        secondary:
          "bg-oklch(0.97 0 0) text-oklch(0.205 0 0) hover:bg-oklch(0.97 0 0)/80 dark:bg-oklch(0.269 0 0) dark:text-oklch(0.985 0 0) dark:hover:bg-oklch(0.269 0 0)/80",
      },
    },
  }
);

export type MagneticButtonProps = {
  children: ReactNode;
  strength?: number;
  radius?: number;
  springConfig?: { duration?: number; bounce?: number };
  disabled?: boolean;
  asChild?: boolean;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof magneticButtonVariants>;

const MagneticButton = ({
  children,
  strength = 0.3,
  radius = 150,
  springConfig = { bounce: 0.1, duration: 0.4 },
  disabled = false,
  asChild = false,
  variant,
  size,
  className,
  ...props
}: MagneticButtonProps) => {
  const shouldReduceMotion = useReducedMotion();
  const [isHoverDevice, setIsHoverDevice] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const x = useSpring(0, {
    bounce: springConfig.bounce ?? 0.1,
    duration: springConfig.duration ?? 0.4,
  });
  const y = useSpring(0, {
    bounce: springConfig.bounce ?? 0.1,
    duration: springConfig.duration ?? 0.4,
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    setIsHoverDevice(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsHoverDevice(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const isEffectDisabled = disabled || shouldReduceMotion || !isHoverDevice;

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (isEffectDisabled || !buttonRef.current) {
        return;
      }

      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = event.clientX - centerX;
      const distanceY = event.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < radius) {
        const factor = 1 - distance / radius;
        const moveX = distanceX * strength * factor;
        const moveY = distanceY * strength * factor;
        x.set(moveX);
        y.set(moveY);
      } else {
        x.set(0);
        y.set(0);
      }
    },
    [isEffectDisabled, radius, strength, x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const Comp = asChild ? Slot : "button";

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: Mouse events are for visual effect, not interaction
    <div
      className="inline-block"
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      ref={wrapperRef}
      role="presentation"
      style={
        isEffectDisabled
          ? undefined
          : {
              margin: `-${radius / 2}px`,
              padding: `${radius / 2}px`,
            }
      }
    >
      <motion.div style={{ x, y }}>
        <Comp
          className={cn(magneticButtonVariants({ className, size, variant }))}
          disabled={disabled}
          ref={buttonRef}
          type="button"
          {...props}
        >
          {children}
        </Comp>
      </motion.div>
    </div>
  );
};

export default MagneticButton;
