import Link from "next/link";
import Image from "next/image";
import { designPhotos } from "@/data/designPhotos";
import { featuredHoodies } from "@/data/hoodieShop";
import { ctas } from "@/lib/site";
import { roverCredentialsLine } from "@/lib/roverCredentials";

export function HoodieShopHero() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 pt-10 pb-6">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
        <div>
          <span className="eyebrow tracking-[0.2em]">
            Keep Waco Wagging · by Platinum Scoops
          </span>
          <h1 className="display mt-3 text-balance">
            Wear the{" "}
            <span className="font-script text-[clamp(2.75rem,5vw,4.5rem)] text-rose">
              Wag
            </span>
          </h1>
          <p className="dek mt-5 max-w-md">
            Keep Waco Wagging hoodies, made for Waco dog people. Local
            Waco-skyline designs with the recognizable ALICO Building — printed
            on demand on premium Gildan Heavy Blend fleece.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#hoodies" className="btn-pill btn-sage px-7 py-4">
              Shop the hoodies
            </a>
            <Link href={ctas.bookService.href} className="btn-pill btn-rose-outline px-7 py-3.5">
              Book a service
            </Link>
          </div>
          <p className="mt-6 text-xs font-medium tracking-[0.18em] text-label-muted uppercase">
            {roverCredentialsLine}
          </p>
        </div>
        <div className="relative aspect-[4/5] max-h-[460px] w-full overflow-hidden rounded-[28px] border border-border">
          <Image
            src={designPhotos.homeHero.src}
            alt="Dogs on a walk in Waco wearing Keep Waco Wagging spirit"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 560px"
            className="object-cover object-[center_35%]"
          />
          <div
            className="absolute -bottom-4 -left-4 flex h-[118px] w-[118px] rotate-[-7deg] flex-col items-center justify-center rounded-full bg-wag-sage text-center text-cream shadow-[0_10px_26px_rgba(0,0,0,0.16)] sm:-bottom-5 sm:-left-5"
            aria-hidden
          >
            <span className="font-script text-[34px] text-blush">waco</span>
            <span className="mt-1 text-[11px] font-medium tracking-[0.24em]">
              STRONG
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HoodieImpactPanel() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 pb-8">
      <div className="grid gap-4 rounded-[22px] border border-border bg-soft-cream p-6 md:grid-cols-3 md:gap-0 md:p-8">
        <div className="text-center md:px-6">
          <p className="font-display text-[30px] font-bold text-wag-sage">
            5.0 ★
          </p>
          <p className="mt-1.5 text-[13px] font-light text-body-muted-light">
            on Rover · 73 reviews · Star Sitter
          </p>
        </div>
        <div className="border-border text-center md:border-x md:px-6">
          <p className="font-display text-[30px] font-bold text-wag-sage">
            Family-run
          </p>
          <p className="mt-1.5 text-[13px] font-light text-body-muted-light">
            by Jackye & Todd Clayton in Waco
          </p>
        </div>
        <div className="text-center md:px-6">
          <p className="font-display text-[30px] font-bold text-wag-sage">
            Printed here
          </p>
          <p className="mt-1.5 text-[13px] font-light text-body-muted-light">
            on demand · premium Gildan fleece
          </p>
        </div>
      </div>
    </section>
  );
}

export const featuredHoodieHandles = featuredHoodies.map((h) => h.handle);
