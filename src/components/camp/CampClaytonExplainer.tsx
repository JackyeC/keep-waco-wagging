import { CampClaytonBookingNote } from "@/components/camp/CampClaytonBookingNote";
import { cityConfig } from "@/lib/site";

export function CampClaytonExplainer() {
  return (
    <section className="mx-auto mt-14 max-w-[1200px] px-6">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow tracking-[0.22em]">A smaller, calmer group</p>
        <h2 className="heading mt-2 text-[clamp(1.85rem,3.5vw,2.4rem)]">
          Would your dog love Camp Clayton?
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-body-muted">
          Camp Clayton is for friendly, social dogs who enjoy being around other
          dogs but do better with a smaller, calmer group than a large
          commercial daycare. Dogs must be spayed or neutered and complete a
          successful meet-and-greet before their first day.
        </p>
        <p className="mt-3 text-[15px] leading-relaxed text-body-muted">
          We adjust play, enrichment and rest to each dog. Not every dog has to
          enjoy every activity—and no dog is forced to participate.
        </p>
        <CampClaytonBookingNote className="mt-6" />
        <a
          href={cityConfig.rover.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-pill btn-sage mt-4 inline-flex px-6 py-3"
        >
          Book a Day on Rover
        </a>
      </div>
    </section>
  );
}
