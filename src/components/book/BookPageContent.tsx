import Image from "next/image";
import Link from "next/link";
import { designPhotos } from "@/data/designPhotos";
import { HomeNewsletter } from "@/components/home/HomeNewsletter";
import { brandLanguage, cityConfig, ctas } from "@/lib/site";

type BookingPath = {
  title: string;
  eyebrow: string;
  description: string;
  href: string;
  external: boolean;
  label: string;
  learnHref: string;
  learnLabel?: string;
  photo: { src: string; alt: string };
};

const bookingPaths: BookingPath[] = [
  {
    title: "Poop scoop & yard care",
    eyebrow: "From $25/week",
    description:
      "Recurring pet waste removal and one-time yard cleanups across greater Waco.",
    href: ctas.bookScoops.href,
    external: true,
    label: ctas.bookScoops.label,
    learnHref: "/platinum-scoops",
    photo: designPhotos.svcScoop,
  },
  {
    title: "Daycare & boarding",
    eyebrow: "5.0 on Rover",
    description:
      "Home-based dog daycare and boarding with full-time care professionals on Rover.",
    href: ctas.bookPetCare.href,
    external: true,
    label: "Book on Rover",
    learnHref: "/pet-care",
    photo: designPhotos.svcBoard,
  },
  {
    title: "Lifestyle training",
    eyebrow: "Real-life skills",
    description:
      "Patio manners, loose-leash walks, puppy field trips, and calm-home coaching in Waco.",
    href: ctas.trainingWaitlist.href,
    external: true,
    label: "Ask about training",
    learnHref: "/training",
    photo: designPhotos.svcTrain,
  },
  {
    title: brandLanguage.dogCampName,
    eyebrow: "Summer camp",
    description:
      "Thirteen themed summer weeks — drop in for a day or join the full week. Reserve on Rover.",
    href: ctas.bookPetCare.href,
    external: true,
    label: "Reserve on Rover",
    learnHref: "/summer-daycare",
    learnLabel: "View camp details",
    photo: designPhotos.svcCamp,
  },
  {
    title: "Dog of Honor Wedding Pet Care",
    eyebrow: "Weddings & events",
    description:
      "A dedicated wedding pet attendant for Waco weddings and special celebrations.",
    href: ctas.eventCare.href,
    external: false,
    label: ctas.eventCare.label,
    learnHref: "/pet-care/weddings-events",
    photo: designPhotos.svcWedding,
  },
];

export function BookPageContent() {
  return (
    <>
      <section className="mx-auto max-w-[1200px] px-6 pt-10 pb-4">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <span className="text-xs font-medium tracking-[0.2em] text-label-muted-alt uppercase">
              {brandLanguage.brandByLine}
            </span>
            <h1 className="display mt-3.5 text-balance">
              Book pet care in{" "}
              <span className="font-script text-[clamp(2.75rem,5vw,4.25rem)] text-rose">
                Waco
              </span>
            </h1>
            <p className="mt-4 text-xs font-medium tracking-[0.2em] text-label-muted uppercase">
              {cityConfig.city}, {cityConfig.stateAbbr} · {cityConfig.county}
            </p>
            <p className="dek mt-3.5 max-w-md">{brandLanguage.heroLine}</p>
            <p className="dek mt-4 max-w-md text-[15px]">
              Choose a service below to book online, or call{" "}
              {cityConfig.sponsor.phoneDisplay} and we&apos;ll point you in the
              right direction.
            </p>
          </div>
          <div className="relative aspect-[4/5] max-h-[440px] w-full overflow-hidden rounded-[28px] border border-border">
            <Image
              src={designPhotos.homeHero.src}
              alt={designPhotos.homeHero.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 560px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-[1200px] px-6">
        <div className="text-center">
          <p className="eyebrow tracking-[0.22em]">Services</p>
          <h2 className="heading mt-1.5 text-[38px]">
            Choose how you want to{" "}
            <span className="font-script font-normal text-rose">book</span>
          </h2>
          <p className="body-light mx-auto mt-3 max-w-2xl">
            {brandLanguage.sponsorServices}
          </p>
        </div>

        <div className="mt-8 space-y-4">
          {bookingPaths.map((path) => (
            <article
              key={path.title}
              className="grid gap-5 overflow-hidden rounded-[20px] border border-border bg-soft-cream p-5 md:grid-cols-[180px_1fr_auto] md:items-center md:p-6"
            >
              <div className="relative h-[140px] w-full overflow-hidden rounded-[14px] md:h-[120px] md:w-[180px]">
                <Image
                  src={path.photo.src}
                  alt={path.photo.alt}
                  fill
                  sizes="180px"
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-[10.5px] font-medium tracking-[0.16em] text-rose-deep uppercase">
                  {path.eyebrow}
                </span>
                <h3 className="mt-1 font-display text-[23px] font-semibold text-serif-ink">
                  {path.title}
                </h3>
                <p className="body-light mt-2">{path.description}</p>
                <Link
                  href={path.learnHref}
                  className="mt-2 inline-block text-[11.5px] font-medium tracking-[0.1em] text-wag-sage uppercase hover:text-rose"
                >
                  {path.learnLabel ?? "Learn more about this service"} →
                </Link>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row md:flex-col">
                {path.external ? (
                  <a
                    href={path.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-pill btn-sage px-6 py-3.5 text-center"
                  >
                    {path.label}
                  </a>
                ) : (
                  <Link
                    href={path.href}
                    className="btn-pill btn-sage px-6 py-3.5 text-center"
                  >
                    {path.label}
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-[1200px] px-6">
        <div className="rounded-[26px] bg-wag-sage px-8 py-12 text-center text-cream md:px-11 md:py-14">
          <p className="text-xs font-medium tracking-[0.2em] text-blush uppercase">
            Questions first?
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl font-display text-[42px] leading-tight font-medium">
            Call, email, or tell us what your dog{" "}
            <span className="font-script text-[48px] text-blush">needs</span>
          </h2>
          <p className="mt-3.5 text-[15.5px] font-light opacity-92">
            {cityConfig.sponsor.phoneDisplay} · {cityConfig.publicEmail}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={cityConfig.sponsor.phoneHref}
              className="btn-pill bg-cream px-8 py-4 text-wag-sage hover:bg-blush hover:text-bark"
            >
              Call {cityConfig.sponsor.phoneDisplay}
            </a>
            <Link
              href="/contact"
              className="btn-pill border-[1.4px] border-cream/60 bg-transparent px-7 py-3.5 text-cream hover:bg-cream/15"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>

      <HomeNewsletter sourcePage="/book" />
    </>
  );
}
