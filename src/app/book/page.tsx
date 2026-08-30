import type { Metadata } from "next";
import { BookPageContent } from "@/components/book/BookPageContent";
import { designPhotos } from "@/data/designPhotos";
import { servicePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = servicePageMetadata(
  "/book",
  "Book Dog Care in Waco | Scooping, Boarding, Daycare & Training",
  "Book Platinum Scoops scooping, home-based dog boarding and daycare, lifestyle training, or wedding pet care in Waco. Camp is seasonal — year-round daycare stays open.",
  designPhotos.homeHero,
);

export default function BookPage() {
  return <BookPageContent />;
}
