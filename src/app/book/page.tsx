import type { Metadata } from "next";
import { BookPageContent } from "@/components/book/BookPageContent";
import { designPhotos } from "@/data/designPhotos";
import { servicePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = servicePageMetadata(
  "/book",
  "Book Pet Care & Camp in Waco",
  "Book Camp Waco daycare, plus boarding and training, with Jackye and Todd in Waco and China Spring, TX. Keep Waco Wagging by Platinum Scoops.",
  designPhotos.homeHero,
);

export default function BookPage() {
  return <BookPageContent />;
}
