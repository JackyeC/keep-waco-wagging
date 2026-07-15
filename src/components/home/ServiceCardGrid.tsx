import Image from "next/image";
import Link from "next/link";
import { designPhotos } from "@/data/designPhotos";
import { brandLanguage } from "@/lib/site";

const services = [
  {
    eyebrow: "From $25/week",
    title: "Poop scooping & yard care",
    detail:
      "Weekly scooping, one-time cleanups, and odor support so your yard stays usable through Texas heat.",
    href: "/platinum-scoops",
    photo: designPhotos.svcScoop,
  },
  {
    eyebrow: "5.0 on Rover",
    title: "Daycare & boarding",
    detail:
      "Home-based daycare and boarding with full-time attention, enrichment, rest, and daily updates.",
    href: "/pet-care",
    photo: designPhotos.svcBoard,
  },
  {
    eyebrow: "Real-life skills",
    title: "Lifestyle training",
    detail:
      "Patio manners, loose-leash walks, puppy field trips, and calm-home skills — coached in real Waco settings.",
    href: "/training",
    photo: designPhotos.svcTrain,
  },
  {
    eyebrow: "Weddings & events",
    title: "Dog of Honor wedding care",
    detail:
      "A dedicated wedding dog chaperone — ceremony support, photos, potty breaks, and a safe handoff.",
    href: "/pet-care/weddings-events",
    photo: designPhotos.svcWedding,
  },
  {
    eyebrow: "Summer camp",
    title: brandLanguage.dogCampName,
    detail:
      "Thirteen themed summer weeks of supervised play, enrichment, and rest. Drop in or join the full week.",
    href: "/summer-daycare",
    photo: designPhotos.svcCamp,
  },
];

export function ServiceCardGrid() {
  return (
    <section id="services" className="mx-auto mt-[70px] max-w-[1200px] px-6">
      <div className="text-center">
        <p className="eyebrow tracking-[0.22em]">Our services</p>
        <h2 className="heading mt-1.5 text-[44px]">
          Scooping, care, training &{" "}
          <span className="font-script font-normal text-rose">camp</span>
        </h2>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <Link
            key={service.href}
            href={service.href}
            className="group flex flex-col overflow-hidden rounded-[20px] border border-border bg-soft-cream transition-colors hover:border-rose"
          >
            <div className="relative h-[188px] w-full">
              <Image
                src={service.photo.src}
                alt={service.photo.alt}
                fill
                sizes="(max-width: 768px) 100vw, 360px"
                className="object-cover"
                style={
                  "objectPosition" in service.photo
                    ? { objectPosition: String(service.photo.objectPosition) }
                    : undefined
                }
              />
            </div>
            <div className="flex flex-1 flex-col px-5 pt-4 pb-5">
              <span className="text-[10.5px] font-medium tracking-[0.16em] text-rose-deep uppercase">
                {service.eyebrow}
              </span>
              <h3 className="mt-1 font-display text-[23px] font-semibold text-serif-ink">
                {service.title}
              </h3>
              <p className="body-light mt-2 flex-1">{service.detail}</p>
              <span className="mt-3 text-[11.5px] font-medium tracking-[0.1em] text-wag-sage uppercase group-hover:text-rose">
                Learn more →
              </span>
            </div>
          </Link>
        ))}

        <Link
          href="/book"
          className="flex flex-col justify-center rounded-[20px] bg-soft-sage p-7 text-cream transition-colors hover:bg-[#7b8a6d]"
        >
          <h3 className="font-display text-[27px] leading-tight font-semibold">
            Not sure what you need?
          </h3>
          <p className="mt-2.5 text-sm font-light leading-relaxed opacity-92">
            Tell us about your dog and we&apos;ll point you to the right service.
          </p>
          <span className="mt-4 text-xs font-medium tracking-[0.14em] uppercase">
            All booking options →
          </span>
        </Link>
      </div>
    </section>
  );
}
