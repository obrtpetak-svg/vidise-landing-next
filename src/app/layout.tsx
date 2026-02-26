import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar, Footer, ProgressBar } from "@/components/layout";
import { SmoothScroll } from "@/components/smooth-scroll";
import { JsonLd } from "@/components/json-ld";
import { ThemeProvider } from "@/components/theme-provider";
import { CursorGlow } from "@/components/cursor-glow";
import { CommandPalette } from "@/components/command-palette";
import { ScrollToTop } from "@/components/scroll-to-top";
import { FloatingCTA } from "@/components/floating-cta";
import { CookieConsent } from "@/components/cookie-consent";
import { SocialProofPopup } from "@/components/social-proof-popup";
import { PageTransition } from "@/components/page-transition";
import { CommandCenter } from "@/components/command-center";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const BASE_URL = "https://vi-di-sef.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Vi-Di-Sef — Upravljanje radnom snagom | Evidencija sati, Projekti, Računi",
    template: "%s — Vi-Di-Sef",
  },
  description: "Vi-Di-Sef je moderna platforma za upravljanje radnom snagom u građevinarstvu. Evidencija radnog vremena, projekti, računi, otpremnice, GPS praćenje — sve na jednom mjestu, u realnom vremenu.",
  keywords: [
    "upravljanje radnom snagom", "evidencija radnog vremena", "građevinska tvrtka",
    "projekti građevina", "radni sati", "Vi-Di-Sef", "workforce management",
    "građevinski dnevnik", "digitalne otpremnice", "GPS praćenje radnika",
    "QR check-in", "upravljanje vozilima", "izvještaji građevina",
    "aplikacija za građevinu", "evidencija rada", "radnici na terenu",
    "digitalizacija građevine", "automatska evidencija", "praćenje gradilišta",
  ],
  authors: [{ name: "Vi-Di.me", url: "https://www.vi-di.me" }],
  creator: "Vi-Di.me",
  publisher: "Vi-Di-Sef",
  alternates: { canonical: BASE_URL },
  openGraph: {
    type: "website",
    locale: "hr_HR",
    url: BASE_URL,
    siteName: "Vi-Di-Sef",
    title: "Vi-Di-Sef — Upravljanje radnom snagom bez kompromisa",
    description: "Evidencija sati, projekti, računi, otpremnice, GPS praćenje — sve na jednom mjestu. Besplatan probni period.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Vi-Di-Sef — Platforma za upravljanje radnom snagom" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vi-Di-Sef — Upravljanje radnom snagom",
    description: "Evidencija sati, projekti, računi, otpremnice — sve na jednom mjestu.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  category: "technology",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hr" className={inter.className} suppressHydrationWarning>
      <head>
        <JsonLd />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="alternate" hrefLang="hr" href="https://vi-di-sef.com" />
        <link rel="alternate" hrefLang="x-default" href="https://vi-di-sef.com" />
      </head>
      <body className="min-h-screen">
        <ThemeProvider>
          <div className="bg-grid" />
          <div className="bg-noise" />
          <CursorGlow />
          <SmoothScroll />
          <ProgressBar />
          <Navbar />
          <CommandPalette />
          <main className="relative z-10"><PageTransition>{children}</PageTransition></main>
          <Footer />
          <ScrollToTop />
          <FloatingCTA />
          <CookieConsent />
          <SocialProofPopup />
          <CommandCenter />
          <Toaster theme="dark" position="bottom-right" richColors closeButton
            toastOptions={{
              style: { background: "#111118", border: "1px solid rgba(255,255,255,0.06)", color: "#F1F5F9" },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
