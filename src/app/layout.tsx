import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar, Footer, ProgressBar } from "@/components/layout";
import { SmoothScroll } from "@/components/smooth-scroll";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vi-Di-Sef — Workforce Management Platform",
  description: "Vi-Di-Sef je moderna platforma za upravljanje radnom snagom. Evidencija radnog vremena, projekti, računi, otpremnice — sve na jednom mjestu.",
  keywords: "workforce management, evidencija radnog vremena, građevinska tvrtka, projekti, radni sati, Vi-Di-Sef",
  openGraph: {
    title: "Vi-Di-Sef — Workforce Management Platform",
    description: "Upravljaj radnom snagom bez kompromisa. Evidencija sati, projekti, računi, otpremnice.",
    type: "website",
    url: "https://vi-di-sef.com",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hr" className={inter.className}>
      <body className="min-h-screen">
        <div className="bg-grid" />
        <SmoothScroll />
        <ProgressBar />
        <Navbar />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
