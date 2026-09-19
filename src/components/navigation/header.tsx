"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { TaxSeal } from "@/components/ui/tax-seal";
import { LanguageToggle } from "@/components/navigation/language-toggle";
import { useLanguage } from "@/context/language-context";
import { ArrowRight, BookOpen, MessageCircle } from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const { isUrdu } = useLanguage();

  const navLinks = [
    { href: "/services", en: "Services", ur: "خدمات" },
    { href: "/pricing", en: "Pricing", ur: "فیس" },
    { href: "/requirements", en: "Checklist", ur: "کاغذات" },
    { href: "/iris-guide", en: "IRIS Guide", ur: "آئرس گائیڈ" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-folio/95 backdrop-blur-md border-b border-rule transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Brand Lockup: Seal + Wordmark */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <TaxSeal size={34} />
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-serif font-black text-base sm:text-lg tracking-tight text-ink">
                Yasmeen & Sons
              </span>
              <span className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded bg-brass/15 text-ink border border-brass/30 uppercase tracking-widest">
                TAX
              </span>
            </div>
            <span className="hidden sm:inline font-mono text-[10px] text-ash tracking-wider">
              INDIVIDUAL TAX PRACTICE · TY2026
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors py-1 ${
                  isActive
                    ? "text-ink font-bold border-b-2 border-brass"
                    : "text-ash hover:text-ink"
                }`}
              >
                {isUrdu ? link.ur : link.en}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageToggle />

          <a
            href="https://wa.me/923120947187?text=Hi%2C%20I%20want%20to%20file%20my%20Tax%20Year%202026%20return."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center gap-1.5 text-xs font-bold text-ink px-3 py-1.5 rounded-md border border-rule hover:bg-paper transition-all"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#128C7E]" />
            <span>0312 0947187</span>
          </a>

          <Link
            href="/start"
            className="inline-flex items-center gap-1.5 bg-ink hover:bg-theme-primary-hover text-paper-light px-3.5 sm:px-4 py-2 rounded-md text-xs font-bold shadow-sm transition-all"
          >
            <span>{isUrdu ? "فائلنگ کا آغاز" : "Start Filing"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
