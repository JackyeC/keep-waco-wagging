import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/Logo";
import { NavLinkItem } from "@/components/NavLinkItem";
import {
  siteConfig,
  sponsorLinks,
  cityConfig,
  mainNav,
  secondaryNav,
  ctas,
  socialLinks,
} from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-clay bg-sand">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.85fr_0.85fr_1fr]">
          <div>
            <Logo variant="mark" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-bark-soft">
              <span className="font-semibold text-bark">{siteConfig.name}</span>{" "}
              is a local Waco dog-parent guide presented by{" "}
              <span className="font-semibold text-bark">{cityConfig.sponsor.name}</span>
              .
            </p>
            <p className="mt-3 text-xs leading-relaxed text-bark-faint">
              Dog policies, hours, prices, and availability may change. Please
              verify directly before visiting or booking.
            </p>
          </div>

          <nav aria-label="Services">
            <h4 className="text-sm font-semibold text-bark">Services</h4>
            <ul className="mt-3 space-y-2 text-sm">
              {mainNav.map((link) => (
                <li key={link.href}>
                  <NavLinkItem
                    link={link}
                    className="text-bark-soft hover:text-sage-700"
                  />
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Community">
            <h4 className="text-sm font-semibold text-bark">Community</h4>
            <ul className="mt-3 space-y-2 text-sm">
              {secondaryNav.map((link) => (
                <li key={link.href}>
                  <NavLinkItem
                    link={link}
                    className="text-bark-soft hover:text-sage-700"
                  />
                </li>
              ))}
            </ul>
          </nav>

          <div className="rounded-card bg-cream p-5 ring-1 ring-inset ring-clay">
            <p className="text-sm font-semibold text-bark">Book with us</p>
            <p className="mt-1 text-sm text-bark-soft">
              Yard scooping through Platinum Scoops. Boarding and daycare on Rover.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <Button href={ctas.bookScoops.href} variant="sponsor" size="sm">
                {ctas.bookScoops.label}
              </Button>
              <Button href={ctas.bookPetCare.href} variant="secondary" size="sm">
                {ctas.bookPetCare.label}
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
            <div className="mt-4 flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs text-bark-faint hover:text-sage-700"
                >
                  {link.label}
                </a>
              ))}
            </div>
            {/* TODO: Replace placeholder social URLs in cityConfig.social with live handles. */}
          </div>
        </div>

        <div className="mt-10 border-t border-clay pt-6 text-xs leading-relaxed text-bark-faint">
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
