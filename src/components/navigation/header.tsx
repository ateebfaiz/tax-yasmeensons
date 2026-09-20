"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { StoreLogo } from "@/components/ui/store-logo";
import { LanguageToggle } from "@/components/navigation/language-toggle";
import { ThemeToggle } from "@/components/navigation/theme-toggle";
import { useLanguage } from "@/context/language-context";
import { WhatsAppIcon } from "@/components/ui/icons/whatsapp-icon";
import { formatWhatsAppUrl } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/config";
import { ArrowRight } from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const { isUrdu } = useLanguage();

  const navLinks = [
    { href: "/start", en: "Income Tax Return", ur: "انکم ٹیکس ریٹرن" },
    { href: "/services", en: "Services", ur: "خدمات" },
    { href: "/pricing", en: "Pricing", ur: "فیس" },
    { href: "/requirements", en: "Checklist", ur: "کاغذات" },
    { href: "/iris-guide", en: "IRIS Guide", ur: "آئرس گائیڈ" },
    { href: "/track", en: "Track Case", ur: "کیس ٹریکنگ" },
    {
      href: formatWhatsAppUrl("Hi, I need Personal Tax Support for Tax Year 2026."),
      en: "Personal Tax Support",
      ur: "ذاتی ٹیکس معاونت",
      isExternal: true,
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/85 dark:bg-palette-gunmetal/85 backdrop-blur-xl border-b border-rule/60 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Brand Lockup: Official Storefront Logo + Tax Practice Pill */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
          <StoreLogo size={26} className="h-6 sm:h-7 w-auto transition-transform group-hover:scale-[1.02]" />
          <div className="flex items-center gap-1.5 pl-2 sm:pl-2.5 border-l border-rule/80">
            <span className="font-mono text-[9px] font-bold px-2 py-0.5 rounded-full bg-palette-coral/15 text-palette-coral border border-palette-coral/30 uppercase tracking-widest">
              TAX
            </span>
            <span className="hidden sm:inline font-mono text-[10px] text-ash tracking-wider">
              TY2026
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold">
          {navLinks.map((link) => {
            if (link.isExternal) {
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors py-1 text-ash hover:text-palette-coral flex items-center gap-1"
                >
                  <span>{isUrdu ? link.ur : link.en}</span>
                </a>
              );
            }
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors py-1 ${
                  isActive
                    ? "text-palette-coral font-bold border-b-2 border-palette-coral"
                    : "text-ash hover:text-ink dark:hover:text-palette-frost"
                }`}
              >
                {isUrdu ? link.ur : link.en}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <LanguageToggle />

          <a
            href={formatWhatsAppUrl("Hi, I want to file my Tax Year 2026 return.")}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-ink dark:text-palette-frost px-3.5 py-1.5 rounded-full border border-rule/80 hover:bg-paper dark:hover:bg-white/[0.06] hover:border-palette-coral/50 transition-all"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
            <span>{SITE_CONFIG.contact.whatsappDisplay}</span>
          </a>

          <Link
            href="/start"
            className="inline-flex items-center gap-1.5 bg-palette-coral hover:bg-palette-coral/90 text-white px-4 sm:px-5 py-2 rounded-full text-xs font-bold shadow-sm hover:shadow-md transition-all active:scale-95"
          >
            <span>{isUrdu ? "فائلنگ کا آغاز" : "Start Filing"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
