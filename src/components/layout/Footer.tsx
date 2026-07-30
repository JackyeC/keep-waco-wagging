import Link from "next/link";
import { BrandWordmark } from "@/components/layout/BrandWordmark";
import {
  brandLanguage,
  cityConfig,
  ctas,
  secondaryNav,
  servicesNav,
  socialLinksConfig,
} from "@/lib/site";

const exploreLinks = [
  { label: "Shop merch", href: "/shop" },
  { label: "Waco Wag Club", href: "/waco-wag-club" },
  { label: "Blog & guides", href: "/blog" },
  { label: "Dog-friendly directory", href: "/dog-friendly-waco" },
  { label: "Gear Guide", href: "/gear-guide" },
  { label: "Book a service", href: "/book" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const instagram = socialLinksConfig.links.find((l) => l.id === "instagram");

  return (
    <footer className="mx-auto max-w-[1200px] px-6 pt-12 pb-10">
      <div className="flex flex-wrap items-start justify-between gap-8 border-t border-border pt-8">
        <div className="max-w-[280px]">
          <BrandWordmark size="sm" />
          <p className="mt-3.5 text-[13px] leading-relaxed font-light text-body-muted-light">
            {brandLanguage.brandRelationship} Full-time, family-run care for
            Waco dog families.
          </p>
        </div>

        <nav aria-label="Services">
          <p className="text-[11px] font-medium tracking-[0.16em] text-label-muted uppercase">
            Services
          </p>
          <ul className="mt-2.5 flex flex-col gap-2.5">
            {servicesNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[13.5px] font-light text-[#6e6457] hover:text-rose"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Explore">
          <p className="text-[11px] font-medium tracking-[0.16em] text-label-muted uppercase">
            Explore
          </p>
          <ul className="mt-2.5 flex flex-col gap-2.5">
            {exploreLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[13.5px] font-light text-[#6e6457] hover:text-rose"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {secondaryNav
              .filter(
                (l) =>
                  !exploreLinks.some((e) => e.href === l.href) &&
                  !l.external,
              )
              .map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13.5px] font-light text-[#6e6457] hover:text-rose"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>

        <div>
          <p className="text-[11px] font-medium tracking-[0.16em] text-label-muted uppercase">
            Say hello
          </p>
          <ul className="mt-2.5 flex flex-col gap-2.5">
            <li>
              <a
                href={cityConfig.sponsor.phoneHref}
                className="text-[13.5px] font-light text-[#6e6457] hover:text-rose"
              >
                {cityConfig.sponsor.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${cityConfig.publicEmail}`}
                className="text-[13.5px] font-light text-[#6e6457] hover:text-rose"
              >
                {cityConfig.publicEmail}
              </a>
            </li>
            {instagram?.href && (
              <li>
                <a
                  href={instagram.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13.5px] font-light text-[#6e6457] hover:text-rose"
                >
                  {brandLanguage.instagram.handle}
                </a>
              </li>
            )}
            <li>
              <Link
                href={ctas.bookService.href}
                className="text-[13.5px] font-light text-[#6e6457] hover:text-rose"
              >
                Book a service
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <p className="mt-7 text-xs font-light tracking-wide text-label-muted">
        © {year} {cityConfig.name} · {brandLanguage.brandByLine} ·{" "}
        {cityConfig.city}, {cityConfig.state}
        {" · "}
        <Link href="/privacy" className="hover:text-rose">
          Privacy
        </Link>
        {" · "}
        <Link href="/affiliate-disclosure" className="hover:text-rose">
          Affiliate disclosure
        </Link>
      </p>
    </footer>
  );
}
