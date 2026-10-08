import Image from "next/image";
import Link from "next/link";
import { designPhotos } from "@/data/designPhotos";
import { ctas } from "@/lib/site";

/** Community doorway. Care, guides, and the directory stay above this. */
export function HomeCommunity() {
  const photo = designPhotos.brandAtmosphere;

  return (
    <section className="bg-soft-cream">
      <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
        <div>
          <p className="eyebrow tracking-[0.24em]">Community</p>
          <h2 className="heading mt-2 text-[clamp(2rem,4vw,2.9rem)]">
            Find your people. Bring your dog.
          </h2>
          <p className="dek mt-4 max-w-xl">
            Meet other Waco dog people through hosted gatherings, dinners,
            local adventures, and The Wag Club.
          </p>
          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link href={ctas.exploreEvents.href} className="btn-pill btn-sage px-6 py-3">
              {ctas.exploreEvents.label}
            </Link>
            <Link
              href={ctas.joinClub.href}
              className="btn-pill btn-rose-outline px-6 py-3"
            >
              {ctas.joinClub.label}
            </Link>
            <Link
              href={ctas.freeUpdates.href}
              className="text-xs font-medium tracking-[0.14em] text-rose-deep uppercase underline decoration-rose/60 underline-offset-4 hover:text-wag-sage"
            >
              {ctas.freeUpdates.label}
            </Link>
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-clay">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 520px"
            className="object-cover"
            style={{ objectPosition: photo.objectPosition }}
          />
        </div>
      </div>
    </section>
  );
}
