import Link from "next/link";
import { BrandWordmark } from "@/components/layout/BrandWordmark";
import {
  brandLanguage,
  cityConfig,
  ctas,
  servicesNav,
  socialLinksConfig,
} from "@/lib/site";

const brandLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Wag Club", href: "/wagclub" },
  { label: "About", href: "/about" },
];

const exploreLinks = [
  { label: "Dog-friendly Waco", href: "/dog-friendly-waco" },
  { label: "Keep Waco Wagging Approved", href: "/approved" },
  { label: "Waco Dog Weekend", href: "/weekend" },
  { label: "Wag Watch", href: "/wag-watch" },
  { label: "Dog Match", href: "/dog-match" },
  { label: "New dog in Waco", href: "/new-dog-in-waco" },
  { label: "Guides", href: "/blog" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const instagram = socialLinksConfig.links.find((l) => l.id === "instagram");

  return (
    <footer className="mx-auto max-w-[1200px] px-6 pt-16 pb-10">
      <div className="flex flex-wrap items-start justify-between gap-10 border-t border-border pt-10">
        <div className="max-w-[300px]">
          <BrandWordmark size="sm" />
          <p className="mt-4 text-[13px] leading-relaxed font-light text-body-muted-light">
            {brandLanguage.heroLine}
          </p>
          <p className="mt-2 text-[12px] leading-relaxed font-light text-label-muted">
            {brandLanguage.communityLine}
          </p>
        </div>

        <nav aria-label="Brand">
          <p className="text-[11px] font-medium tracking-[0.16em] text-label-muted uppercase">
            Brand
          </p>
          <ul className="mt-2.5 flex flex-col gap-2.5">
            {brandLinks.map((link) => (
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
          </ul>
        </nav>

        <nav aria-label="Services">
          <p className="text-[11px] font-medium tracking-[0.16em] text-label-muted uppercase">
            Services
          </p>
          <ul className="mt-2.5 flex flex-col gap-2.5">
            <li>
              <Link
                href="/dog-care"
                className="text-[13.5px] font-light text-[#6e6457] hover:text-rose"
              >
                Explore dog care
              </Link>
            </li>
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
            <li>
              <Link
                href={ctas.bookService.href}
                className="text-[13.5px] font-light text-[#6e6457] hover:text-rose"
              >
                Book a service
              </Link>
            </li>
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
                href="/contact"
                className="text-[13.5px] font-light text-[#6e6457] hover:text-rose"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <p className="mt-10 text-xs font-light tracking-wide text-label-muted">
        © {year} {cityConfig.name} · {cityConfig.city}, {cityConfig.state}
        {" · "}
        <Link href="/privacy" className="hover:text-rose">
          Privacy
        </Link>
        {" · "}
        <Link href="/affiliate-disclosure" className="hover:text-rose">
          Affiliate disclosure
        </Link>
      </p>
      <p className="mt-2 max-w-3xl text-[11px] leading-relaxed font-light text-label-muted">
        {brandLanguage.brandRelationship} Approval, reviews, and recommendations
        are editorial — they cannot be bought.
      </p>
    </footer>
  );
}
