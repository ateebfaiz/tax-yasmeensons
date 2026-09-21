import type { Metadata, Viewport } from "next";
import { Inter, Noto_Nastaliq_Urdu } from "next/font/google";
import { AppClipProvider } from "@/components/ui/app-clip/AppClipProvider";
import { LanguageProvider } from "@/context/language-context";
import { ThemeProvider } from "@/context/theme-context";
import { Header } from "@/components/navigation/header";
import { Footer } from "@/components/navigation/footer";
import { LiquidGlassTabBar } from "@/components/navigation/liquid-glass-tab-bar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

const notoNastaliq = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-urdu",
});

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
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2f2f7" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${notoNastaliq.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const t = localStorage.getItem('tax_theme');
                if (t === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-paper text-ink font-sans font-normal selection:bg-apple-blue/20 selection:text-apple-blue transition-colors duration-200 overflow-x-clip">
        <ThemeProvider>
          <LanguageProvider>
            <AppClipProvider>
              <Header />
              <main className="relative z-[1] flex-1 w-full overflow-x-clip">{children}</main>
              <Footer />
              <LiquidGlassTabBar />
            </AppClipProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
