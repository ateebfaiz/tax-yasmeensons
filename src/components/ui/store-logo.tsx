"use client";

import React from "react";
import Image from "next/image";

export interface StoreLogoProps {
  size?: number;
  height?: number;
  className?: string;
  variant?: "black" | "white" | "color";
}

const ASPECT = 4.2;

export function StoreLogo({
  size,
  height = 28,
  className = "",
  variant = "black",
}: StoreLogoProps) {
  const effectiveHeight = size ?? height;
  const width = Math.round(effectiveHeight * ASPECT);
  const src =
    variant === "white"
      ? "/branding/Yasmeen_Sons_og_logo_white_02.png"
      : variant === "color"
      ? "/branding/Yasmeen_Sons_og_color_logo_02.png"
      : "/branding/Yasmeen_Sons_og_logo_black_02.png";

  return (
    <div className={`inline-flex items-center select-none shrink-0 ${className}`}>
      <Image
        src={src}
        alt="Yasmeen & Sons"
        width={width}
        height={effectiveHeight}
        className="object-contain w-auto"
        style={{ height: effectiveHeight }}
        priority
      />
    </div>
  );
}

export default StoreLogo;
