import Link from "next/link";
import { PawPrint } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { Button } from "@/components/ui/Button";
import { SponsorBadge } from "@/components/SponsorBadge";
import {
  siteConfig,
  mainNav,
  sponsorLinks,
  socialLinks,
  ctas,
} from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-clay bg-sand">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr_1.3fr]">
          {/* Brand + sponsor */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sage-600 text-white">
                <PawPrint className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
              </span>
              <span className="font-display text-lg font-semibold text-bark">
                {siteConfig.name}
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-bark-soft">
              {siteConfig.tagline} Helping Waco dog parents find calmer outings,
              cleaner yards, and more fun with their dogs.
            </p>
            <div className="mt-4">
              <SponsorBadge />
            </div>
          </div>

          {/* Explore */}
          <nav aria-label="Footer">
            <h4 className="text-sm font-semibold text-bark">Explore</h4>
            <ul className="mt-3 space-y-2 text-sm">
              {mainNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-bark-soft transition-colors hover:text-sage-700"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Platinum Scoops services */}
          <div>
            <h4 className="text-sm font-semibold text-bark">
              Platinum Scoops services
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              {sponsorLinks.services.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="text-bark-soft transition-colors hover:text-sage-700"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter + listing CTA */}
          <div className="space-y-4">
            <NewsletterSignup />
            <div className="rounded-card bg-cream p-5 ring-1 ring-inset ring-clay">
              <p className="text-sm font-semibold text-bark">
                Own a dog-friendly Waco business?
              </p>
              <p className="mt-1 text-sm text-bark-soft">
                Get listed and reach local dog parents.
              </p>
              <Button
                href={ctas.getListed.href}
                variant="secondary"
                size="sm"
                className="mt-3"
              >
                {ctas.getListed.label}
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-clay pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-bark-soft">
            <p className="font-medium text-bark">{siteConfig.name}</p>
            <p>{siteConfig.sponsorLine}</p>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="text-sm text-bark-soft transition-colors hover:text-sage-700"
                aria-label={s.label}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <p className="mt-6 text-xs text-bark-faint">
          &copy; {year} {siteConfig.name}. Presented by Platinum Scoops. All
          rights reserved.{" "}
          <Link
            href="/affiliate-disclosure"
            className="underline-offset-2 hover:underline"
          >
            Affiliate disclosure
          </Link>
        </p>
      </Container>
    </footer>
  );
}
