import type { Metadata } from "next";
import { Suspense } from "react";
import { DogMatchExperience } from "@/components/dog-match/DogMatchExperience";
import { servicePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = servicePageMetadata(
  "/dog-match",
  "Dog Breed Matcher: Find a Dog That Fits Your Life | Keep Waco Wagging",
  "Find dogs that fit your real life — including your home, schedule, exercise habits, grooming budget, training patience and other pets. See match scores, friction points and first-90-days plans.",
);

export default function DogMatchPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-[1200px] px-6 py-16 text-body-muted">Loading Dog Match…</div>}>
      <DogMatchExperience />
    </Suspense>
  );
}
