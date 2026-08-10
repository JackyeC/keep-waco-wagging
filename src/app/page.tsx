import type { Metadata } from "next";
import { BrandStory } from "@/components/home/BrandStory";
import { HomeDrop } from "@/components/home/HomeDrop";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeReviews } from "@/components/home/HomeReviews";
import { LifestyleCommunity } from "@/components/home/LifestyleCommunity";
import { MarqueeStrip } from "@/components/home/MarqueeStrip";
import { TrustSection } from "@/components/home/TrustSection";
import { WagClubSignup } from "@/components/home/WagClubSignup";
import { designPhotos } from "@/data/designPhotos";
import { getRecentPosts } from "@/data/blog";
import { servicePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = servicePageMetadata(
  "/",
  "Keep Waco Wagging | The Club for Waco Dog People",
  "The lifestyle brand and club for Waco dog people — exclusive drops, local favorites, and dog-parent perks. Powered by Platinum Scoops: boarding, daycare, training, camp, and poop scooping in Waco, Texas.",
  designPhotos.homeHero,
);

export default function HomePage() {
  const guidePosts = getRecentPosts(3);

  return (
    <>
      <HomeHero />
      <MarqueeStrip />
      <WagClubSignup id="wag-club" sourcePage="/" variant="panel" />
      <HomeDrop />
      <BrandStory />
      <LifestyleCommunity posts={guidePosts} />
      <TrustSection />
      <HomeReviews />
      <WagClubSignup id="updates-signup" sourcePage="/" variant="closer" />
    </>
  );
}
