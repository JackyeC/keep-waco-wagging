"use client";

import Image from "next/image";
import Link from "next/link";
import { BrandSwatch } from "@/components/brand/BrandSwatch";
import { BrandWordmark } from "@/components/layout/BrandWordmark";
import {
  brandColors,
  brandPhotoSlots,
  brandTypography,
  brandVoiceLines,
  colorBalance,
} from "@/data/brandBook";
import { brandLanguage, cityConfig } from "@/lib/site";

const navItems = [
  { label: "Logo", href: "#logo" },
  { label: "Color", href: "#color" },
  { label: "Type", href: "#type" },
  { label: "UI", href: "#ui" },
  { label: "Voice", href: "#voice" },
  { label: "Photos", href: "#photos" },
  { label: "Skyline", href: "#skyline" },
  { label: "Platinum Scoops", href: "#platinum-scoops" },
  { label: "Merch", href: "#merch" },
  { label: "In the wild", href: "#wild" },
] as const;

export function BrandBookContent() {
  return (
    <div className="pb-16">
      {/* Internal subnav */}
      <div className="sticky top-[var(--site-header-offset,0px)] z-30 border-b border-border bg-cream/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1160px] flex-wrap items-center gap-3 px-6 py-3">
          <BrandWordmark href={false} compact />
          <span className="hidden text-[11px] font-medium tracking-[0.2em] text-label-muted uppercase sm:inline">
            Brand Book
          </span>
          <nav
            className="ml-auto flex flex-wrap gap-0.5"
            aria-label="Brand book sections"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-2.5 py-1.5 text-[11px] font-medium tracking-[0.12em] text-bark-soft uppercase hover:text-rose focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wag-sage"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1160px] px-6 pt-16 pb-8 text-center">
        <p className="text-xs font-medium tracking-[0.28em] text-label-muted uppercase">
          Brand & Identity System · 2026
        </p>
        <div className="mx-auto mt-5 flex flex-col items-center leading-[0.82]">
          <span className="font-display text-[clamp(3rem,8vw,5.25rem)] font-semibold tracking-[0.1em] text-wag-sage">
            KEEP WACO
          </span>
          <span className="font-script text-[clamp(3.5rem,9vw,6.5rem)] text-rose">
            wagging
          </span>
        </div>
        <p className="mt-4 text-[13px] font-medium tracking-[0.24em] text-body-muted-light uppercase">
          Community · Connection · Compassion
        </p>
        <p className="dek mx-auto mt-6 max-w-xl">
          {brandLanguage.brandRelationship} This is how Keep Waco Wagging looks,
          sounds, and feels — everywhere, so a Waco dog family knows us on sight.
        </p>
        <p className="mt-4 text-xs text-label-muted">
          Internal reference only · Founder: {cityConfig.founders.jackye} ·{" "}
          {cityConfig.founders.todd}
        </p>
      </section>

      <div className="mx-auto max-w-[1160px] px-6">
        <div className="h-px bg-border" />
      </div>

      {/* Essence */}
      <section className="mx-auto grid max-w-[1160px] gap-10 px-6 pt-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
        <div>
          <p className="text-xs font-medium tracking-[0.2em] text-label-muted uppercase">
            01 — Essence
          </p>
          <h2 className="heading mt-3 text-[38px] leading-tight">
            Warm, local, and built around real dogs.
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <h3 className="font-display text-[23px] text-rose italic">We are</h3>
            <p className="body-light mt-2">
              Family-run. Inclusive and multicultural. Multi-ability and welcoming.
              Hands-on and present. Proudly Waco. The good-towels, kitchen-sink kind
              of care.
            </p>
          </div>
          <div>
            <h3 className="font-display text-[23px] text-rose italic">
              We are not
            </h3>
            <p className="body-light mt-2">
              A warehouse kennel. A faceless franchise. Cold or corporate. Loud or
              gimmicky. An after-hours side gig. Anything that treats a dog like a
              number.
            </p>
          </div>
        </div>
      </section>

      {/* Logo */}
      <section id="logo" className="mx-auto max-w-[1160px] scroll-mt-24 px-6 pt-16">
        <p className="text-xs font-medium tracking-[0.2em] text-label-muted uppercase">
          02 — Logo system
        </p>
        <h2 className="heading mt-2 text-[38px]">The lockup & its family</h2>

        <div className="mt-7 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          <div className="flex items-center justify-center rounded-[20px] border border-border bg-soft-cream p-10 sm:p-12">
            <div className="text-center">
              <BrandWordmark href={false} size="lg" showTagline />
            </div>
          </div>
          <div className="grid gap-5 sm:grid-rows-2">
            <div className="flex items-center justify-center rounded-[20px] bg-wag-sage p-8">
              <BrandWordmark href={false} size="md" onDark />
            </div>
            <div className="flex items-center justify-center rounded-[20px] bg-blush p-8">
              <div
                className="flex h-24 w-24 rotate-[-7deg] flex-col items-center justify-center rounded-full bg-wag-sage text-center text-cream shadow-[0_10px_26px_rgba(0,0,0,0.16)]"
                aria-hidden
              >
                <span className="font-script text-[30px] text-blush">waco</span>
                <span className="mt-1 text-[9.5px] font-medium tracking-[0.24em]">
                  STRONG
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {[
            {
              label: "Do",
              tone: "text-wag-sage",
              copy:
                'Keep the serif/script pairing intact. Give it clear space equal to the cap-height of "KEEP." Let it sit on cream, sage, or rose.',
            },
            {
              label: "Don't",
              tone: "text-rose-deep",
              copy:
                'Don\'t swap the fonts, stretch it, add a drop shadow, recolor "wagging" to anything but rose/blush, or crowd it with other marks.',
            },
            {
              label: "Motifs",
              tone: "text-label-muted",
              copy: "Heart ♥ · paw cluster · script accent wag",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-[16px] border border-border bg-soft-cream p-6"
            >
              <p
                className={`text-[11px] font-medium tracking-[0.16em] uppercase ${item.tone}`}
              >
                {item.label}
              </p>
              <p className="body-light mt-2 text-[13.5px]">{item.copy}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-6 rounded-[18px] border border-border bg-soft-cream p-6">
          <Image
            src={cityConfig.brand.logo.mark.src}
            alt={cityConfig.brand.logo.mark.alt}
            width={80}
            height={80}
            className="rounded-full"
          />
          <div>
            <p className="font-display text-lg font-semibold text-serif-ink">
              Mark asset
            </p>
            <p className="body-light mt-1 text-sm">
              {cityConfig.brand.logo.mark.src} — use for favicons, stickers, and
              small placements where the full wordmark would be too tall.
            </p>
          </div>
        </div>
      </section>

      {/* Color */}
      <section id="color" className="mx-auto max-w-[1160px] scroll-mt-24 px-6 pt-16">
        <p className="text-xs font-medium tracking-[0.2em] text-label-muted uppercase">
          03 — Color
        </p>
        <h2 className="heading mt-2 text-[38px]">Known from the palette alone</h2>
        <p className="body-light mt-2 max-w-xl">
          Tap any swatch to copy its hex. Hand these exact values to a printer, sign
          shop, or embroiderer.
        </p>

        <div className="mt-7 grid gap-4 sm:grid-cols-3">
          {brandColors.slice(0, 3).map((color) => (
            <BrandSwatch key={color.hex} {...color} />
          ))}
        </div>
        <div className="mt-3.5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {brandColors.slice(3).map((color) => (
            <BrandSwatch key={color.hex} {...color} />
          ))}
        </div>

        <div className="mt-6">
          <p className="text-[11px] font-medium tracking-[0.16em] text-label-muted uppercase">
            Usage balance
          </p>
          <div className="mt-2 flex h-8 overflow-hidden rounded-full border border-border">
            {colorBalance.map((band) => (
              <div
                key={band.label}
                style={{
                  flex: band.pct,
                  backgroundColor: band.color,
                }}
                title={`${band.label} ${band.pct}%`}
              />
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-5 text-xs font-light text-body-muted-light">
            {colorBalance.map((band) => (
              <span key={band.label}>
                {band.pct}% {band.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Typography */}
      <section id="type" className="mx-auto max-w-[1160px] scroll-mt-24 px-6 pt-16">
        <p className="text-xs font-medium tracking-[0.2em] text-label-muted uppercase">
          04 — Typography
        </p>
        <h2 className="heading mt-2 text-[38px]">Three voices, one tone</h2>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {brandTypography.map((font) => (
            <div
              key={font.name}
              className="rounded-[18px] border border-border bg-soft-cream p-7"
            >
              <p className={`text-[64px] leading-none ${font.css}`}>{font.sample}</p>
              <p className="mt-3 font-display text-[22px] font-semibold text-serif-ink">
                {font.name}
              </p>
              <p className="body-light mt-1.5 text-[13px]">{font.usage}</p>
            </div>
          ))}
        </div>
      </section>

      {/* UI / buttons / spacing */}
      <section id="ui" className="mx-auto max-w-[1160px] scroll-mt-24 px-6 pt-16">
        <p className="text-xs font-medium tracking-[0.2em] text-label-muted uppercase">
          05 — UI & layout
        </p>
        <h2 className="heading mt-2 text-[38px]">Buttons, spacing, containers</h2>
        <div className="mt-7 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[18px] border border-border bg-soft-cream p-7">
            <p className="text-[11px] font-medium tracking-[0.16em] text-label-muted uppercase">
              Buttons
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <span className="btn-pill btn-sage px-6 py-3">Primary sage</span>
              <span className="btn-pill btn-rose-outline px-6 py-3">
                Secondary rose
              </span>
              <span className="btn-pill bg-cream px-6 py-3 text-wag-sage ring-1 ring-border">
                On sage band
              </span>
            </div>
            <p className="body-light mt-4 text-sm">
              Pill radius 999px · label weight 500 · uppercase tracking 0.12–0.14em ·
              min tap target 44px height on mobile.
            </p>
          </div>
          <div className="rounded-[18px] border border-border bg-soft-cream p-7">
            <p className="text-[11px] font-medium tracking-[0.16em] text-label-muted uppercase">
              Layout rhythm
            </p>
            <ul className="body-light mt-4 space-y-2 text-sm">
              <li>Max content width: 1160–1200px</li>
              <li>Horizontal padding: 24–30px (px-6)</li>
              <li>Section spacing: 54–72px between major blocks</li>
              <li>Card radius: 18–22px · panels 24–26px</li>
              <li>Sticky header: cream 90% + blur + border-bottom</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Voice */}
      <section id="voice" className="mx-auto max-w-[1160px] scroll-mt-24 px-6 pt-16">
        <div className="rounded-[24px] bg-wag-sage px-8 py-12 text-cream md:px-12">
          <p className="text-xs font-medium tracking-[0.2em] text-blush uppercase">
            06 — Voice & taglines
          </p>
          <div className="mt-6 grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <blockquote className="font-display text-[clamp(1.75rem,4vw,2.125rem)] leading-snug font-medium">
                &ldquo;Together, we keep waco{" "}
                <span className="font-script text-[clamp(2rem,5vw,2.625rem)] text-blush">
                  wagging
                </span>
                .&rdquo;
              </blockquote>
              <p className="mt-5 max-w-md text-[15px] font-light leading-relaxed opacity-90">
                Talk like a neighbor who loves dogs. Warm, plainspoken, a little
                playful — never salesy. Lead with the dog and the family, then the
                service. Spell the founder&apos;s name{" "}
                <strong className="font-medium">{cityConfig.founders.jackye.split(" ")[0]}</strong>,
                never Jacky or Jackie in our copy.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {brandVoiceLines.map((line) => (
                <div
                  key={line}
                  className="rounded-[14px] border border-cream/30 px-4 py-3.5 text-[13px] font-medium tracking-[0.18em] uppercase"
                >
                  {line}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Photography */}
      <section id="photos" className="mx-auto max-w-[1160px] scroll-mt-24 px-6 pt-16">
        <p className="text-xs font-medium tracking-[0.2em] text-label-muted uppercase">
          07 — Photography
        </p>
        <h2 className="heading mt-2 text-[38px]">
          Real dogs, real Waco, warm light
        </h2>
        <p className="body-light mt-2 max-w-2xl">
          Natural golden-hour light, candid moments, soft film tones. Kitchen-sink
          baths, riverside walks, dogs mid-joy. Use approved photos from{" "}
          <code className="text-sm">/public/pictures/</code> — never stock replacements
          or AI-generated people or dogs.
        </p>
        <ul className="body-light mt-4 max-w-2xl list-disc space-y-1 pl-5 text-sm">
          <li>Write meaningful alt text — not filenames.</li>
          <li>Protect faces and dogs from aggressive crops.</li>
          <li>Decorative graphics use empty alt text.</li>
          <li>Do not alter skin tone, faces, or invent dogs.</li>
        </ul>
        <div className="mt-6 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {brandPhotoSlots.map((photo) => (
            <figure
              key={photo.src}
              className="overflow-hidden rounded-[16px] border border-border"
            >
              <div className="relative aspect-[4/3]">
                <Image src={photo.src} alt={photo.alt} fill className="object-cover" />
              </div>
              <figcaption className="bg-soft-cream px-4 py-2 text-[11px] font-medium tracking-[0.14em] text-label-muted uppercase">
                {photo.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Waco skyline */}
      <section id="skyline" className="mx-auto max-w-[1160px] scroll-mt-24 px-6 pt-16">
        <p className="text-xs font-medium tracking-[0.2em] text-label-muted uppercase">
          08 — Waco skyline art
        </p>
        <h2 className="heading mt-2 text-[38px]">
          The ALICO Building is non-negotiable
        </h2>
        <p className="body-light mt-3 max-w-2xl">
          Keep Waco Wagging skyline graphics must include the recognizable real{" "}
          <strong className="font-medium">ALICO Building</strong> — along with
          approved landmarks such as the suspension bridge, McLennan County Courthouse,
          and Magnolia silos where the design calls for them. Do not substitute a
          generic skyscraper or unrelated tower.
        </p>
        <div className="mt-6 rounded-[18px] border border-border bg-soft-cream p-6">
          <p className="font-display text-lg font-semibold text-serif-ink">
            Hoodie product copy (verified)
          </p>
          <p className="body-light mt-2 text-sm italic">
            &ldquo;The iconic Waco skyline (Alico Building, suspension bridge,
            McLennan County Courthouse, and Magnolia silos)&hellip;&rdquo;
          </p>
        </div>
      </section>

      {/* Platinum Scoops */}
      <section
        id="platinum-scoops"
        className="mx-auto max-w-[1160px] scroll-mt-24 px-6 pt-16"
      >
        <p className="text-xs font-medium tracking-[0.2em] text-label-muted uppercase">
          09 — Platinum Scoops identity
        </p>
        <h2 className="heading mt-2 text-[38px]">
          Pet waste removal & pet services — not ice cream
        </h2>
        <p className="body-light mt-3 max-w-2xl">
          <strong className="font-medium">{cityConfig.sponsor.name}</strong> is the
          family-run service engine behind Keep Waco Wagging: pet waste removal, scooping,
          daycare, boarding, training, and event care in Waco. Never describe Platinum
          Scoops as an ice cream business or use dessert imagery for scooping services.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-[18px] border border-border bg-soft-cream p-6">
            <p className="text-[11px] font-medium tracking-[0.16em] text-wag-sage uppercase">
              Official mark
            </p>
            <p className="body-light mt-2 text-sm">
              Circular paw-with-heart mark reading &ldquo;PLATINUM SCOOPS.&rdquo; Do not
              substitute an ice cream graphic. Add{" "}
              <code className="text-xs">/public/brand/platinum-scoops-logo.webp</code>{" "}
              when the asset is ready.
            </p>
          </div>
          <div className="rounded-[18px] border border-border bg-soft-cream p-6">
            <p className="text-[11px] font-medium tracking-[0.16em] text-wag-sage uppercase">
              Relationship line
            </p>
            <p className="body-light mt-2 text-sm">{brandLanguage.brandByLine}</p>
            <p className="body-light mt-2 text-sm">{brandLanguage.brandRelationship}</p>
          </div>
        </div>
      </section>

      {/* Merch line */}
      <section id="merch" className="mx-auto max-w-[1160px] scroll-mt-24 px-6 pt-16">
        <p className="text-xs font-medium tracking-[0.2em] text-label-muted uppercase">
          10 — Apparel line
        </p>
        <h2 className="heading mt-2 text-[38px]">
          Wear the <span className="font-script text-rose">Wag</span>
        </h2>
        <p className="body-light mt-2 max-w-2xl">
          Typographic designs straight from the brand — signature Waco-skyline hoodies
          live in the{" "}
          <Link href="/shop" className="text-rose-deep hover:text-wag-sage">
            Shop
          </Link>
          . Garment mockups use the shared hoodie silhouette and brand colors.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Script Tee · sage, cream, rose",
            "Wear the Wag Tee · cream, blush",
            "Logo Crewneck · rose, sage",
            "Values Tee · bark, sage",
            "Waco Strong Tee · sage, cream",
            "Dog Parent Tee · cream, blue",
          ].map((item) => (
            <div
              key={item}
              className="rounded-[18px] border border-border bg-garment-tray px-5 py-8 text-center"
            >
              <p className="font-display text-lg font-semibold text-serif-ink">
                {item.split(" · ")[0]}
              </p>
              <p className="mt-1 text-xs text-label-muted">
                {item.split(" · ")[1]}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* In the wild */}
      <section id="wild" className="mx-auto max-w-[1160px] scroll-mt-24 px-6 pt-16">
        <p className="text-xs font-medium tracking-[0.2em] text-label-muted uppercase">
          11 — In the wild
        </p>
        <h2 className="heading mt-2 text-[38px]">Recognizable on sight</h2>
        <p className="body-light mt-2 max-w-xl">
          Where the brand shows up out in Waco — on the van, on the team, on the porch.
        </p>
        <div className="mt-6 grid gap-4 lg:grid-cols-[1.3fr_1fr]">
          <div className="overflow-hidden rounded-[20px] border border-border">
            <div className="flex h-[210px] flex-col items-center justify-center bg-wag-sage text-cream">
              <span className="text-[11px] font-medium tracking-[0.24em] uppercase text-blush">
                Platinum Scoops presents
              </span>
              <BrandWordmark href={false} size="md" onDark className="mt-2" />
            </div>
            <p className="bg-soft-cream px-4 py-3 text-[12px] font-medium tracking-[0.14em] text-label-muted uppercase">
              Van wrap / vehicle decal
            </p>
          </div>
          <div className="overflow-hidden rounded-[20px] border border-border">
            <div className="flex min-h-[210px] items-center justify-center bg-garment-tray p-6">
              <BrandWordmark href={false} size="sm" />
            </div>
            <p className="bg-soft-cream px-4 py-3 text-[12px] font-medium tracking-[0.14em] text-label-muted uppercase">
              Team uniform · sage polo
            </p>
          </div>
        </div>
      </section>

      <footer className="mx-auto mt-16 max-w-[1160px] border-t border-border px-6 pt-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <BrandWordmark href={false} compact />
          <p className="text-xs font-light text-label-muted">
            © 2026 · by Platinum Scoops · Internal use only
          </p>
        </div>
      </footer>
    </div>
  );
}
