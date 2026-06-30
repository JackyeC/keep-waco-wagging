import type { Metadata } from "next";
import { BookPageContent } from "@/components/book/BookPageContent";
import { designPhotos } from "@/data/designPhotos";
import { servicePageMetadata } from "@/lib/metadata";
import { brandLanguage } from "@/lib/site";

export const metadata: Metadata = servicePageMetadata(
  "/book",
  "Book Pet Care & Camp in Waco",
  `${brandLanguage.heroLine}. ${brandLanguage.brandByLine}.`,
  designPhotos.homeHero,
);

export default function BookPage() {
  return <BookPageContent />;
}
