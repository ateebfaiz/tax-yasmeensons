import type { Metadata, Viewport } from "next";
import { AppClipProvider } from "@/components/ui/app-clip/AppClipProvider";
import { Header } from "@/components/navigation/header";
import { Footer } from "@/components/navigation/footer";
import { LiquidGlassTabBar } from "@/components/navigation/liquid-glass-tab-bar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yasmeen & Sons Tax • Individual Income Tax Facilitation (Tax Year 2026)",
  description:
    "Transparent, non-business individual income tax return preparation and guidance for Pakistan. Keep control of your FBR IRIS account. Services starting from PKR 1,000.",
  keywords: [
    "FBR Pakistan Tax Return",
    "Tax Year 2026 Filer",
    "Salaried Income Tax Return Pakistan",
    "Active Taxpayer Status Pakistan",
    "IRIS FBR Assistance",
    "Yasmeen and Sons Tax",
  ],
  authors: [{ name: "Yasmeen & Sons Tax Desk" }],
  metadataBase: new URL("https://tax.yasmeensons.com"),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f5f2" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0c" },
  ],
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
          href="https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans selection:bg-theme-primary/20 selection:text-theme-primary">
        <AppClipProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <LiquidGlassTabBar />
        </AppClipProvider>
      </body>
    </html>
  );
}
