"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppClip } from "@/components/ui/app-clip/AppClipProvider";
import { ShieldCheck, MessageCircle, ArrowRight, FileCheck, HelpCircle } from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const appClip = useAppClip();

  const navLinks = [
    { href: "/services", labelEn: "Services", labelUr: "خدمات" },
    { href: "/pricing", labelEn: "Pricing", labelUr: "فیس و پیکیجز" },
    { href: "/requirements", labelEn: "Requirements", labelUr: "ضروری کاغذات" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-theme-glass border-b border-theme-glass-border transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-theme-primary/15 border border-theme-primary/30 flex items-center justify-center text-theme-primary group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-theme-text">Yasmeen & Sons</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-theme-primary/15 text-theme-primary uppercase tracking-wider">
                Tax
              </span>
            </div>
            <span className="text-[10px] font-semibold text-theme-text-muted font-urdu" dir="rtl">
              ٹیکس فائلنگ و قانونی معاونت
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-bold">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors flex flex-col items-center ${
                  isActive ? "text-theme-primary font-extrabold" : "text-theme-text-secondary hover:text-theme-text"
                }`}
              >
                <span>{link.labelEn}</span>
                <span className="text-[10px] font-urdu font-normal opacity-80">{link.labelUr}</span>
              </Link>
            );
          })}

          <button
            type="button"
            onClick={() => appClip.open("iris-guide")}
            className="text-theme-text-secondary hover:text-theme-text transition-colors flex items-center gap-1"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>IRIS Guide</span>
          </button>
        </nav>

        {/* Action CTAs */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => appClip.open("whatsapp-intake")}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-theme-border bg-theme-surface/70 hover:bg-theme-surface text-xs font-bold text-theme-text transition-all"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
            <span>WhatsApp (03120947187)</span>
          </button>

          <button
            type="button"
            onClick={() => appClip.open("tax-intake")}
            className="btn-shimmer inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-theme-primary hover:bg-theme-primary-hover text-white text-xs font-bold shadow-sm transition-all"
          >
            <span>Start Filing</span>
            <span className="hidden sm:inline font-urdu font-normal text-[11px]">(آغاز کریں)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
