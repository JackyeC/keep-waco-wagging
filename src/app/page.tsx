import type { Metadata } from "next";
import { HomeSummerCalendar } from "@/components/home/HomeSummerCalendar";
import { BookCta } from "@/components/home/BookCta";
import { GuideCards } from "@/components/home/GuideCards";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeNewsletter } from "@/components/home/HomeNewsletter";
import { HomeReviews } from "@/components/home/HomeReviews";
import { MarqueeStrip } from "@/components/home/MarqueeStrip";
import { MerchBand } from "@/components/home/MerchBand";
import { ServiceCardGrid } from "@/components/home/ServiceCardGrid";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { getRecentPosts } from "@/data/blog";
import { servicePageMetadata } from "@/lib/metadata";
import { brandLanguage, cityConfig } from "@/lib/site";

export const metadata: Metadata = servicePageMetadata(
  "/",
  "Waco Dog Boarding, Daycare & Poop Scooping",
  `${brandLanguage.heroLine}. ${brandLanguage.brandByLine}. Serving ${cityConfig.serviceAreas.slice(0, 4).join(", ")}, and greater ${cityConfig.county}.`,
);

export default function HomePage() {
  const guidePosts = getRecentPosts(3);

  return (
    <>
      <HomeHero />
      <MarqueeStrip />
      <WhyChooseUs />
      <ServiceCardGrid />
      <HomeReviews />
      <MerchBand />
      <HomeSummerCalendar />
      <GuideCards posts={guidePosts} />
      <BookCta />
      <HomeNewsletter sourcePage="/" />
    </>
  );
}
