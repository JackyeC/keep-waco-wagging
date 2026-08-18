import type { Metadata } from "next";
import { HomeBrandStory } from "@/components/home/HomeBrandStory";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeMerchStrip } from "@/components/home/HomeMerchStrip";
import { HomeServicesBand } from "@/components/home/HomeServicesBand";
import { HomeSoftProof } from "@/components/home/HomeSoftProof";
import { WagClubSignup } from "@/components/home/WagClubSignup";
import { designPhotos } from "@/data/designPhotos";
import { merchAnchorLine } from "@/data/merchCuration";
import { servicePageMetadata } from "@/lib/metadata";
import { brandLanguage } from "@/lib/site";

export const metadata: Metadata = servicePageMetadata(
  "/",
  "Keep Waco Wagging | Waco Dog Apparel & Pet Care",
  `${merchAnchorLine} ${brandLanguage.brandByLine}. Dog-friendly Waco guides, Wag Watch, and full-time dog care in Waco and McLennan County, Texas.`,
  designPhotos.homeHero,
);

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeMerchStrip />
      <HomeBrandStory />
      <HomeServicesBand />
      <HomeSoftProof />
      <div id="guides" className="scroll-mt-24">
        <WagClubSignup id="wag-club" sourcePage="/" variant="closer" />
      </div>
    </>
  );
}
