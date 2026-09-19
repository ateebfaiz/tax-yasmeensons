"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { StoreLogo } from "@/components/ui/store-logo";
import { LanguageToggle } from "@/components/navigation/language-toggle";
import { useLanguage } from "@/context/language-context";
import { ArrowRight, MessageCircle } from "lucide-react";

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
    <header className="sticky top-0 z-40 w-full bg-white/85 dark:bg-[#0B1C2C]/85 backdrop-blur-xl border-b border-rule/60 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Brand Lockup: Official Storefront Logo + Tax Practice Pill */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
          <StoreLogo size={26} className="h-6 sm:h-7 w-auto transition-transform group-hover:scale-[1.02]" />
          <div className="flex items-center gap-1.5 pl-2 sm:pl-2.5 border-l border-rule/80">
            <span className="font-mono text-[9px] font-bold px-2 py-0.5 rounded-full bg-brass/15 text-ink border border-brass/30 uppercase tracking-widest">
              TAX
            </span>
            <span className="hidden sm:inline font-mono text-[10px] text-ash tracking-wider">
              TY2026
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
            className="hidden lg:inline-flex items-center gap-1.5 text-xs font-bold text-ink px-3.5 py-1.5 rounded-full border border-rule/80 hover:bg-paper hover:border-brass/50 transition-all"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#128C7E]" />
            <span>0312 0947187</span>
          </a>

          <Link
            href="/start"
            className="inline-flex items-center gap-1.5 bg-ink hover:bg-theme-primary-hover text-paper-light px-4 sm:px-5 py-2 rounded-full text-xs font-bold shadow-sm hover:shadow-md transition-all active:scale-95"
          >
            <span>{isUrdu ? "فائلنگ کا آغاز" : "Start Filing"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
