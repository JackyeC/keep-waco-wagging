import type { Metadata } from "next";
import { BrandBookContent } from "@/components/brand/BrandBookContent";
import { noindexRobots } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Brand Book — Internal Reference",
  description:
    "Keep Waco Wagging brand guidelines — color, typography, voice, and identity. Internal use only.",
  robots: noindexRobots,
};

export default function BrandPage() {
  return <BrandBookContent />;
}
