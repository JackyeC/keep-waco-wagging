import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CalendarDays, ExternalLink } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { UrgencyBadge } from "@/components/wagwatch/WagWatchCard";
import { ArticleJsonLd } from "@/components/seo/StructuredData";
import { getDirectoryListingBySlug } from "@/data/directory";
import {
  getPublishedWagWatch,
  getPublishedWagWatchBySlug,
} from "@/data/wagWatch";
import { articlePageMetadata } from "@/lib/metadata";
import { cityConfig } from "@/lib/site";

/** Only published items are routable — drafts never generate a page. */
export function generateStaticParams() {
  return getPublishedWagWatch().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getPublishedWagWatchBySlug(slug);
  if (!item) return { title: "Wag Watch update not found" };
  return articlePageMetadata(
    `/wag-watch/${item.slug}`,
    item.headline,
    item.shortSummary,
    item.image ?? {
      src: cityConfig.brand.logo.full.src,
      alt: cityConfig.brand.logo.full.alt,
    },
    item.publishedDate,
    item.updatedDate,
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function WagWatchArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getPublishedWagWatchBySlug(slug);
  if (!item) notFound();

  const relatedListing = item.relatedDirectorySlug
    ? getDirectoryListingBySlug(item.relatedDirectorySlug)
    : undefined;

  return (
    <>
      <ArticleJsonLd
        title={item.headline}
        description={item.shortSummary}
        path={`/wag-watch/${item.slug}`}
        datePublished={item.publishedDate}
        dateModified={item.updatedDate}
        image={item.image?.src ?? cityConfig.brand.logo.full.src}
      />

      <section className="border-b border-clay bg-sage-50">
        <div className="mx-auto max-w-[820px] px-6 py-12 sm:py-16">
          <Link
            href="/wag-watch"
            className="text-[12px] font-medium tracking-[0.14em] text-label-muted uppercase hover:text-wag-sage"
          >
            ← Wag Watch
          </Link>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-medium tracking-[0.16em] text-label-muted uppercase">
              {item.category}
            </span>
            <UrgencyBadge urgency={item.urgency} />
          </div>
          <h1 className="mt-3 text-[clamp(2rem,4.5vw,3rem)] leading-[1.08]">
            {item.headline}
          </h1>
          <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-bark-soft">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4 text-wag-sage" aria-hidden="true" />
              Published {formatDate(item.publishedDate)}
            </span>
            {item.updatedDate && <span>Updated {formatDate(item.updatedDate)}</span>}
            {item.geographicScope && <span>· {item.geographicScope}</span>}
          </p>
        </div>
      </section>

      <Section tone="paper">
        <div className="mx-auto max-w-[720px]">
          <p className="dek">{item.shortSummary}</p>

          {item.whatHappened && (
            <Block title="What happened" body={item.whatHappened} />
          )}
          {item.whyCare && (
            <Block title="Why dog parents should care" body={item.whyCare} />
          )}
          {item.whatToDo && (
            <Block title="What you need to do" body={item.whatToDo} />
          )}
          {item.wacoAngle && <Block title="The Waco angle" body={item.wacoAngle} />}

          {item.actionUrl && item.actionLabel && (
            <div className="mt-8">
              <Button href={item.actionUrl} variant="sage" size="lg">
                {item.actionLabel}
              </Button>
            </div>
          )}

          {item.sourceUrls && item.sourceUrls.length > 0 && (
            <div className="mt-10 border-t border-border pt-6">
              <h2 className="font-display text-[1.35rem] font-medium text-serif-ink">
                Sources
              </h2>
              <ul className="mt-3 space-y-2">
                {item.sourceUrls.map((url, i) => (
                  <li key={url} className="text-[14px]">
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-rose-deep underline underline-offset-2 hover:text-wag-sage"
                    >
                      {item.sourceNames?.[i] ?? url}
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {relatedListing && (
            <div className="mt-10 rounded-[18px] bg-sage-50 p-6 ring-1 ring-sage-200">
              <h2 className="font-display text-[1.35rem] font-medium text-serif-ink">
                Related on Keep Waco Wagging
              </h2>
              <Link
                href={`/dog-friendly-waco/${relatedListing.slug}`}
                className="mt-2 inline-block text-[15px] text-rose-deep underline underline-offset-2 hover:text-wag-sage"
              >
                {relatedListing.name} →
              </Link>
            </div>
          )}
        </div>
      </Section>
    </>
  );
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <div className="mt-8">
      <h2 className="font-display text-[1.5rem] font-medium text-serif-ink">
        {title}
      </h2>
      <p className="mt-3 text-[16px] leading-relaxed text-bark-soft">{body}</p>
    </div>
  );
}
