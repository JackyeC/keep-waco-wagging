import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/Logo";
import { PresentingSponsor } from "@/components/PresentingSponsor";
import { SocialLinksBlock } from "@/components/SocialLinksBlock";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { NavLinkItem } from "@/components/NavLinkItem";
import {
  siteConfig,
  sponsorLinks,
  cityConfig,
  servicesNav,
  secondaryNav,
  ctas,
  brandLanguage,
} from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-clay bg-sand">
      <NewsletterSignup
        sourcePage="footer"
        compact
        variant="inline"
        className="border-b border-clay bg-cream py-12"
        showSocial
      />

      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.85fr_0.85fr_1fr]">
          <div>
            <Logo variant="mark" />
            <div className="mt-3">
              <PresentingSponsor size="sm" />
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-bark-soft">
              {brandLanguage.heroLine}. {brandLanguage.brandByLine}.
            </p>
            <p className="mt-2 max-w-xs text-xs leading-relaxed text-bark-faint">
              {brandLanguage.sponsorServices}
            </p>
            <SocialLinksBlock className="mt-5" size="sm" />
            <p className="mt-3 text-xs leading-relaxed text-bark-faint">
              Dog policies, hours, prices, and availability may change. Please
              verify directly before visiting or booking.
            </p>
          </div>

          <nav aria-label="Services">
            <h4 className="text-sm font-semibold text-bark">Services</h4>
            <ul className="mt-3 space-y-2 text-sm">
              {servicesNav.map((link) => (
                <li key={link.href}>
                  <NavLinkItem
                    link={link}
                    className="text-bark-soft hover:text-sage-700"
                  />
                </li>
              ))}
              <li>
                <NavLinkItem
                  link={{ label: "Book a service", href: "/book" }}
                  className="text-bark-soft hover:text-sage-700"
                />
              </li>
            </ul>
          </nav>

          <nav aria-label="Guides and more">
            <h4 className="text-sm font-semibold text-bark">Guides & more</h4>
            <ul className="mt-3 space-y-2 text-sm">
              {secondaryNav.map((link) => (
                <li key={link.href}>
                  <NavLinkItem
                    link={link}
                    className="text-bark-soft hover:text-sage-700"
                  />
                </li>
              ))}
              <li>
                <NavLinkItem
                  link={{ label: "Waco Wag Club", href: "/waco-wag-club" }}
                  className="text-bark-soft hover:text-sage-700"
                />
              </li>
              <li>
                <NavLinkItem
                  link={{ label: "Shop", href: "/shop" }}
                  className="text-bark-soft hover:text-sage-700"
                />
              </li>
              <li>
                <NavLinkItem
                  link={{ label: "Gear Guide", href: "/gear-guide" }}
                  className="text-bark-soft hover:text-sage-700"
                />
              </li>
            </ul>
          </nav>

          <div className="rounded-card bg-cream p-5 ring-1 ring-inset ring-clay">
            <p className="text-sm font-semibold text-bark">Book with us</p>
            <p className="mt-1 text-sm text-bark-soft">
              {brandLanguage.servicesLine}
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <Button href="/book" variant="primary" size="sm">
                Book a service
              </Button>
              <Button href={ctas.bookScoops.href} variant="sponsor" size="sm">
                {ctas.bookScoops.label}
              </Button>
            </div>
            <ul className="mt-4 space-y-1.5 text-xs text-bark-soft">
              <li>
                <a
                  href={`mailto:${sponsorLinks.email}`}
                  className="hover:text-sage-700"
                >
                  {sponsorLinks.email}
                </a>
              </li>
              <li>
                <a href={sponsorLinks.phoneHref} className="hover:text-sage-700">
                  {sponsorLinks.phone} ({sponsorLinks.phoneNumeric})
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="hairline mt-12" />
        <p className="smallcaps mt-6 text-bark-soft">
          Filed under: Poop scooping · Daycare · Boarding · Training · Event care ·{" "}
          {cityConfig.city} · {brandLanguage.brandByLine}
        </p>

        <hr className="hairline mt-6" />
        <div className="mt-6 text-xs leading-relaxed text-bark-faint">
          <p>{cityConfig.monetization.affiliateDisclosure}</p>
          <p className="mt-2">
            <NavLinkItem
              link={{ label: "Affiliate disclosure", href: "/affiliate-disclosure" }}
              className="underline-offset-2 hover:underline"
            />{" "}
            · Privacy note: form submissions are used to respond to your request
            and improve this local dog parent resource.
          </p>
          <p className="mt-2">
            &copy; {year} {siteConfig.name}. {siteConfig.sponsorLine}. All rights
            reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
