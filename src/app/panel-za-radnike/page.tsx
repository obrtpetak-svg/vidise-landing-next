import { SubpageTemplate } from "@/components/subpage-template";
import { subpageData } from "@/lib/features-data";
import type { Metadata } from "next";

const data = subpageData["panel-za-radnike"];

export const metadata: Metadata = {
  title: data.title,
  description: data.subtitle,
  alternates: { canonical: "https://vi-di-sef.com/panel-za-radnike" },
  openGraph: {
    title: `${data.title} — Vi-Di-Sef`,
    description: data.subtitle,
    url: "https://vi-di-sef.com/panel-za-radnike",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <SubpageTemplate {...data} />;
}
