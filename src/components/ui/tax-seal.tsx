import React from "react";

interface TaxSealProps {
  size?: number;
  className?: string;
}

export function TaxSeal({ size = 36, className = "" }: TaxSealProps) {
  return (
    <div
      className={`relative rounded-full flex items-center justify-center shrink-0 select-none ${className}`}
      style={{
        width: size,
        height: size,
        background: "radial-gradient(circle, #F6F1E3 40%, #E9DFC9 100%)",
        border: "1.5px solid #C4A046",
        boxShadow: "inset 0 0 0 1px #D7D0C4, 0 1px 3px rgba(11, 28, 44, 0.15)",
      }}
      title="Yasmeen & Sons Tax Practice Seal"
    >
      <div
        className="rounded-full flex flex-col items-center justify-center"
        style={{
          width: size - 6,
          height: size - 6,
          border: "1px dashed #C4A046",
        }}
      >
        <span
          className="font-serif font-black tracking-tighter text-[#0B1C2C] leading-none"
          style={{ fontSize: Math.max(10, Math.floor(size * 0.38)) }}
        >
          YS
        </span>
        <span
          className="font-mono font-bold tracking-widest text-[#C4A046] uppercase leading-none"
          style={{ fontSize: Math.max(6, Math.floor(size * 0.18)), marginTop: 1 }}
        >
          TAX
        </span>
      </div>
    </div>
  );
}
