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
import { useTheme } from "@/context/theme-context";
import { useAppClip } from "@/components/ui/app-clip/AppClipProvider";
import { ArrowRight } from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const { isUrdu } = useLanguage();
  const { resolvedTheme } = useTheme();
  const appClip = useAppClip();

  const navLinks = [
    { href: "/start", en: "File return", ur: "ریٹرن" },
    { href: "/pricing", en: "Pricing", ur: "فیس" },
    { href: "/requirements", en: "Checklist", ur: "کاغذات" },
    { href: "/iris-guide", en: "IRIS", ur: "آئرس" },
    { href: "/track", en: "Track", ur: "ٹریک" },
  ];

  return (
    <header
      className="sticky top-0 z-40 w-full"
      style={{
        backgroundColor: "var(--glass-bg-strong)",
        borderBottom: "0.5px solid var(--glass-border)",
        WebkitBackdropFilter: "blur(32px) saturate(180%)",
        backdropFilter: "blur(32px) saturate(180%)",
        overflowX: "clip",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Brand Lockup: Official Storefront Logo + Tax Practice Pill */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
          <StoreLogo
            size={26}
            variant={resolvedTheme === "dark" ? "white" : "black"}
            className="h-6 sm:h-7 w-auto transition-transform group-hover:scale-[1.02]"
          />
          <div className="flex items-center gap-1.5 pl-2 sm:pl-2.5 border-l border-black/[0.06] dark:border-white/[0.08]">
            <span className="font-mono text-[12px] font-semibold px-2 py-0.5 rounded-full bg-apple-blue text-white uppercase tracking-wide">
              Tax
            </span>
            <span className="hidden sm:inline font-mono text-[12px] text-ash tracking-wider">
              TY2026
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-5 text-[13px] font-semibold">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors py-1 whitespace-nowrap ${
                  isActive
                    ? "text-apple-blue font-semibold"
                    : "text-ash hover:text-ink"
                }`}
              >
                {isUrdu ? link.ur : link.en}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <ThemeToggle />
          <LanguageToggle />

          <a
            href={formatWhatsAppUrl("Hi, I want to file my Tax Year 2026 return.")}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink px-3.5 py-1.5 rounded-full min-h-11 whitespace-nowrap"
            style={{
              backgroundColor: "var(--glass-bg)",
              border: "0.5px solid var(--glass-border)",
              backdropFilter: "blur(20px)",
            }}
          >
            <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
            <span>{SITE_CONFIG.contact.whatsappDisplay}</span>
          </a>

          <button
            type="button"
            onClick={() => appClip.open("fbr-simplified-intake")}
            className="md:hidden inline-flex items-center gap-1 bg-apple-blue hover:bg-apple-blue/90 text-white px-4 py-2 rounded-full text-[13px] font-semibold min-h-11 active:scale-95 whitespace-nowrap"
          >
            <span>{isUrdu ? "شروع" : "Start"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <Link
            href="/start"
            className="hidden md:inline-flex items-center gap-1.5 bg-apple-blue hover:bg-apple-blue/90 text-white px-5 py-2 rounded-full text-[13px] font-semibold min-h-11 active:scale-95 whitespace-nowrap"
          >
            <span>{isUrdu ? "فائلنگ" : "Start filing"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
