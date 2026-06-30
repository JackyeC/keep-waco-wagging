import type { Metadata } from "next";
import { AboutPageContent } from "@/components/about/AboutPageContent";
import { designPhotos } from "@/data/designPhotos";
import { servicePageMetadata } from "@/lib/metadata";
import { brandLanguage } from "@/lib/site";

export const metadata: Metadata = servicePageMetadata(
  "/about",
  "About Keep Waco Wagging",
  `Meet Jackye and Todd Clayton — full-time Waco pet care professionals. ${brandLanguage.brandByLine}.`,
  designPhotos.aboutHero,
);

export default function AboutPage() {
  return <AboutPageContent />;
}
