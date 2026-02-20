import { SubpageTemplate } from "@/components/subpage-template";
import { subpageData } from "@/lib/features-data";
import type { Metadata } from "next";

const data = subpageData["qr-checkin"];

export const metadata: Metadata = {
  title: data.title,
  description: data.subtitle,
  alternates: { canonical: "https://vi-di-sef.com/qr-checkin" },
  openGraph: {
    title: `${data.title} — Vi-Di-Sef`,
    description: data.subtitle,
    url: "https://vi-di-sef.com/qr-checkin",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <SubpageTemplate {...data} />;
}
