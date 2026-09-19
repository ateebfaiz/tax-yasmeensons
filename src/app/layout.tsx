import type { Metadata, Viewport } from "next";
import { AppClipProvider } from "@/components/ui/app-clip/AppClipProvider";
import { LanguageProvider } from "@/context/language-context";
import { LetterheadBand } from "@/components/navigation/letterhead-band";
import { Header } from "@/components/navigation/header";
import { Footer } from "@/components/navigation/footer";
import { LiquidGlassTabBar } from "@/components/navigation/liquid-glass-tab-bar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yasmeen & Sons · Tax Practice TY2026",
  description:
    "Private non-business individual tax return facilitation for Tax Year 2026. File from PKR 1,000. Customer-controlled authentication — we never take your IRIS password.",
  keywords: [
    "FBR Income Tax Return 2026",
    "Salaried Filer Pakistan",
    "Tax Year 2026 Return",
    "Active Taxpayer Status Pakistan",
    "iris.fbr.gov.pk assistance",
  ],
  metadataBase: new URL("https://tax.yasmeensons.com"),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#0B1C2C",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;0,900;1,600&family=Noto+Nastaliq+Urdu:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-paper text-ink font-sans selection:bg-brass/20 selection:text-ink">
        <LanguageProvider>
          <AppClipProvider>
            <LetterheadBand />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <LiquidGlassTabBar />
          </AppClipProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
