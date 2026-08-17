import type { Metadata } from "next";
import { ChoosePath } from "@/components/home/ChoosePath";
import { HomeDrop } from "@/components/home/HomeDrop";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeReviews } from "@/components/home/HomeReviews";
import { MarqueeStrip } from "@/components/home/MarqueeStrip";
import { TrustSection } from "@/components/home/TrustSection";
import { WagClubSignup } from "@/components/home/WagClubSignup";
import { WagWatchPreview } from "@/components/home/WagWatchPreview";
import { designPhotos } from "@/data/designPhotos";
import { servicePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = servicePageMetadata(
  "/",
  "Keep Waco Wagging | Waco's Home for Dog People",
  "Waco's home for dog people. Find dog-friendly places, local dog events, trusted recommendations, and dog care — boarding, daycare, training, and poop scooping — in Waco and McLennan County, Texas.",
  designPhotos.homeHero,
);

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <MarqueeStrip />
      {/* 1. Hero → 2. Choose your path → 3. Wag Watch → 4. Dog care trust →
          5. Social proof → 6. Wag Club → 7. Shop */}
      <ChoosePath />
      <WagWatchPreview />
      <WagClubSignup id="wag-club" sourcePage="/" variant="panel" />
      <TrustSection />
      <HomeReviews />
      <HomeDrop />
      <WagClubSignup id="updates-signup" sourcePage="/" variant="closer" />
    </>
  );
}
