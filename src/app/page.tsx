import type { Metadata } from "next";
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
import { brandLanguage } from "@/lib/site";

export const revalidate = 600;

export const metadata: Metadata = servicePageMetadata(
  "/",
  "Keep Waco Wagging | Give Your Dog Their Best Waco Life",
  `${brandLanguage.heroLine} ${brandLanguage.communityLine} Dog-friendly Waco guides, Wag Watch, weekend ideas, and trusted local dog care.`,
  designPhotos.homeHero,
);

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ChoosePath />
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
