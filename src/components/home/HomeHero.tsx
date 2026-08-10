import Image from "next/image";
import Link from "next/link";
import { WagClubSignup } from "@/components/home/WagClubSignup";
import { designPhotos } from "@/data/designPhotos";
import { ctas } from "@/lib/site";
import { roverCredentialsLine } from "@/lib/roverCredentials";

export function HomeHero() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 pt-12 pb-4 md:pt-16">
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="max-w-xl">
          <span className="eyebrow tracking-[0.28em]">
            Waco dog people · members club
          </span>
          <h1 className="display mt-5 text-[clamp(2.75rem,7vw,4.75rem)] leading-[0.95]">
            The club for Waco{" "}
            <span className="font-script font-normal text-rose">
              dog people.
            </span>
          </h1>
          <p className="dek mt-6 max-w-md text-[1.125rem]">
            Exclusive drops, local favorites, and first access to what&apos;s
            next — for the dog people who make Waco better.
          </p>
          <WagClubSignup variant="hero" id="hero-club" sourcePage="/" />
          <div className="mt-5">
            <Link
              href={ctas.shopDrop.href}
              className="inline-flex items-center gap-1.5 border-b border-[#d9b7b2] pb-0.5 text-xs font-medium tracking-[0.14em] text-rose-deep uppercase hover:border-wag-sage hover:text-wag-sage"
            >
              Shop the Drop →
            </Link>
          </div>
          <p className="mt-7 text-[11px] font-medium tracking-[0.18em] text-label-muted uppercase">
            ★ {roverCredentialsLine}
          </p>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] max-h-[560px] w-full overflow-hidden rounded-[32px] border border-border">
            <Image
              src={designPhotos.homeHero.src}
              alt={designPhotos.homeHero.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 540px"
              className="object-cover"
            />
          </div>
          <div
            className="absolute -bottom-6 -left-6 flex h-[132px] w-[132px] -rotate-[8deg] flex-col items-center justify-center rounded-full bg-wag-sage text-center leading-none text-cream shadow-[0_12px_30px_rgba(0,0,0,0.18)]"
            aria-hidden
          >
            <span className="font-script text-[30px] text-blush">the</span>
            <span className="-mt-1 font-script text-[34px] text-blush">
              wag club
            </span>
            <span className="mt-1.5 text-[10px] font-medium tracking-[0.24em]">
              EST. 2025
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
