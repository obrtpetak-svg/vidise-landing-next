import { SubpageTemplate } from "@/components/subpage-template";
import { subpageData } from "@/lib/features-data";
import type { Metadata } from "next";

const data = subpageData["radni-sati"];

export const metadata: Metadata = {
  title: `${data.title} — Vi-Di-Sef`,
  description: data.subtitle,
};

export default function Page() {
  return <SubpageTemplate {...data} />;
}
