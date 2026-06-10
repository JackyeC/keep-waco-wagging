import Link from "next/link";
import { PawPrint } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig, sponsorLinks, cityConfig, mainNav, ctas, socialLinks } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-clay bg-sand">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.9fr_0.9fr_1.1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sage-600 text-white">
                <PawPrint className="h-5 w-5" />
              </span>
              <span className="font-display text-lg font-semibold text-bark">
                {siteConfig.name}
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-bark-soft">
              Keep Waco Wagging is a local resource presented by Platinum Scoops.
            </p>
            <p className="mt-3 text-xs leading-relaxed text-bark-faint">
              Dog policies, hours, prices, and availability may change. Please
              verify directly before visiting or booking.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h4 className="text-sm font-semibold text-bark">Explore</h4>
            <ul className="mt-3 space-y-2 text-sm">
              {mainNav.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-bark-soft hover:text-sage-700">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact" className="text-bark-soft hover:text-sage-700">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h4 className="text-sm font-semibold text-bark">Book & connect</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href={ctas.bookScoops.href} className="text-bark-soft hover:text-sage-700">Platinum Scoops booking</Link></li>
              <li><Link href={ctas.bookPetCare.href} className="text-bark-soft hover:text-sage-700">Rover profile</Link></li>
              <li><a href={`mailto:${sponsorLinks.email}`} className="text-bark-soft hover:text-sage-700">{sponsorLinks.email}</a></li>
              <li><a href={sponsorLinks.phoneHref} className="text-bark-soft hover:text-sage-700">{sponsorLinks.phone} ({sponsorLinks.phoneNumeric})</a></li>
            </ul>
            <div className="mt-4 flex gap-3">
              {socialLinks.map((link) => (
                <a key={link.label} href={link.href} className="text-xs text-bark-soft hover:text-sage-700">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-card bg-cream p-5 ring-1 ring-inset ring-clay">
            <p className="text-sm font-semibold text-bark">
              Own a local dog-friendly business?
            </p>
            <p className="mt-1 text-sm text-bark-soft">
              Submit a place or ask about sponsor options for Waco dog parents.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <Button href={ctas.submitPlace.href} variant="secondary" size="sm">
                Submit a Dog-Friendly Place
              </Button>
              <Button href={ctas.becomeSponsor.href} variant="secondary" size="sm">
                Become a Local Sponsor
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-clay pt-6 text-xs leading-relaxed text-bark-faint">
          <p>{cityConfig.monetization.affiliateDisclosure}</p>
          <p className="mt-2">
            <Link href="/affiliate-disclosure" className="underline-offset-2 hover:underline">
              Affiliate disclosure
            </Link>{" "}
            · Privacy note: form submissions are used to respond to your request
            and improve this local dog parent resource.
          </p>
          <p className="mt-2">
            &copy; {year} {siteConfig.name}. {siteConfig.sponsorLine}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
