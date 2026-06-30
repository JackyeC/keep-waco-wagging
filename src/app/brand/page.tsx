import type { Metadata } from "next";
import { BrandBookContent } from "@/components/brand/BrandBookContent";

export const metadata: Metadata = {
  title: "Brand Book — Internal Reference",
  description:
    "Keep Waco Wagging brand guidelines — color, typography, voice, and identity. Internal use only.",
  robots: { index: false, follow: false },
};

export default function BrandPage() {
  return <BrandBookContent />;
}
