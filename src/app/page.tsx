import type { Metadata } from "next";
import { DogMatchTeaser } from "@/components/dog-match/DogMatchTeaser";
import { ChoosePath } from "@/components/home/ChoosePath";
import { HomeApprovedNote } from "@/components/home/HomeApprovedNote";
import { HomeBrandStory } from "@/components/home/HomeBrandStory";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeMerchStrip } from "@/components/home/HomeMerchStrip";
import { HomeServicesBand } from "@/components/home/HomeServicesBand";
import { HomeSoftProof } from "@/components/home/HomeSoftProof";
import { HomeWeekendPreview } from "@/components/home/HomeWeekendPreview";
import { WagClubSignup } from "@/components/home/WagClubSignup";
import { WagWatchPreview } from "@/components/home/WagWatchPreview";
import { designPhotos } from "@/data/designPhotos";
import { servicePageMetadata } from "@/lib/metadata";

export const revalidate = 600;

export const metadata: Metadata = servicePageMetadata(
  "/",
  "Keep Waco Wagging | Give Your Dog Their Best Waco Life",
  "Keep Waco Wagging helps Waco dog parents give their dogs a better local life — dog-friendly places, trusted care, Wag Watch updates, weekend ideas, and community resources.",
  designPhotos.homeHero,
);

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ChoosePath />
      <DogMatchTeaser />
      <WagWatchPreview />
      <HomeWeekendPreview />
      <HomeApprovedNote />
      <HomeBrandStory />
      <HomeServicesBand />
      <HomeSoftProof />
      <HomeMerchStrip />
      <div id="guides" className="scroll-mt-24">
        <WagClubSignup id="wag-club" sourcePage="/" variant="closer" />
      </div>
    </>
  );
}
