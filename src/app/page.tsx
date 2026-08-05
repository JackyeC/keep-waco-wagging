import type { Metadata } from "next";
import { HomeBrandStory } from "@/components/home/HomeBrandStory";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeMerchStrip } from "@/components/home/HomeMerchStrip";
import { HomeNewsletter } from "@/components/home/HomeNewsletter";
import { HomeServicesBand } from "@/components/home/HomeServicesBand";
import { HomeSoftProof } from "@/components/home/HomeSoftProof";
import { designPhotos } from "@/data/designPhotos";
import { merchAnchorLine } from "@/data/merchCuration";
import { servicePageMetadata } from "@/lib/metadata";
import { brandLanguage, cityConfig } from "@/lib/site";

export const metadata: Metadata = servicePageMetadata(
  "/",
  "Waco Dog Apparel & Pet Care",
  `${merchAnchorLine} ${brandLanguage.brandByLine}. Serving ${cityConfig.serviceAreas.slice(0, 4).join(", ")}, and greater ${cityConfig.county}.`,
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
        <HomeNewsletter sourcePage="/" />
      </div>
    </>
  );
}
