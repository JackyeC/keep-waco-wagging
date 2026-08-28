import Link from "next/link";
import { brandLanguage, servicesNav } from "@/lib/site";

export function HomeServicesBand() {
  return (
    <section
      id="services"
      className="scroll-mt-24 border-y border-border bg-soft-cream/60"
    >
      <div className="mx-auto max-w-[1200px] px-6 py-14 sm:py-16">
        <div className="max-w-xl">
          <p className="eyebrow tracking-[0.22em]">When they should stay home</p>
          <h2 className="heading mt-2 text-[clamp(1.75rem,3vw,2.35rem)]">
            Care you can actually trust
          </h2>
          <p className="dek mt-3 text-[15px]">
            {brandLanguage.servicesLine}. Taking your dog everywhere is not the
            job. Leaving them with people who know them is part of a good life.
          </p>
        </div>

        <ul className="mt-10 grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
          {servicesNav.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group flex items-baseline justify-between gap-3 border-b border-border pb-3 text-serif-ink transition-colors hover:border-rose hover:text-rose"
              >
                <span className="font-display text-[22px] font-medium">
                  {link.label}
                </span>
                <span
                  className="text-sm text-label-muted transition-transform group-hover:translate-x-0.5 group-hover:text-rose"
                  aria-hidden
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-8">
          <Link
            href="/dog-care"
            className="text-xs font-medium tracking-[0.16em] text-wag-sage uppercase underline decoration-border underline-offset-4 hover:text-rose hover:decoration-rose"
          >
            Explore dog care
          </Link>
        </p>
      </div>
    </section>
  );
}
