import type { Metadata } from "next";
import { AboutPageContent } from "@/components/about/AboutPageContent";
import { designPhotos } from "@/data/designPhotos";
import { servicePageMetadata } from "@/lib/metadata";
import { brandLanguage } from "@/lib/site";

export const metadata: Metadata = servicePageMetadata(
  "/about",
  "About Keep Waco Wagging",
  `Meet Jackye and Todd Clayton, the Waco dog people behind Keep Waco Wagging. ${brandLanguage.heroLine}`,
  designPhotos.aboutHero,
);

export default function AboutPage() {
  return <AboutPageContent />;
}
