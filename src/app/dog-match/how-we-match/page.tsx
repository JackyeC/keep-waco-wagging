import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { dogMatchSources } from "@/data/dog-match/sources";
import { methodologyCopy } from "@/data/dog-match/methodology";
import { servicePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = servicePageMetadata(
  "/dog-match/how-we-match",
  "How Dog Match Works | Keep Waco Wagging",
  "How Dog Match scores lifestyle fit and friction. Popularity is informational only. Breed traits are tendencies, not a guarantee about an individual dog.",
);

export default function HowWeMatchPage() {
  return (
    <>
      <PageHeader
        eyebrow="Dog Match by Keep Waco Wagging"
        title={methodologyCopy.title}
        description={methodologyCopy.intro}
        tone="sage"
      >
        <Button href="/dog-match" variant="sage">
          Find My Dog Match
        </Button>
      </PageHeader>

      <Section tone="paper">
        <ul className="max-w-3xl space-y-4 text-[16px] leading-relaxed text-body-muted">
          {methodologyCopy.bullets.map((item) => (
            <li key={item} className="border-l-2 border-wag-sage pl-4">
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-3xl text-[16px] leading-relaxed text-body-muted">
          {methodologyCopy.scoring}
        </p>
        <p className="mt-6 max-w-3xl text-[16px] leading-relaxed text-body-muted">
          {methodologyCopy.pitBull}
        </p>
      </Section>

      <Section tone="sand">
        <h2 className="heading">Sources</h2>
        <p className="dek mt-3 max-w-2xl">
          Inspectable on purpose. Trait scores are compiled, not invented to fill
          every cell. Unknown fields stay unknown.
        </p>
        <ul className="mt-8 grid gap-4">
          {dogMatchSources.map((source) => (
            <li key={source.id} className="card-panel p-5">
              <p className="font-display text-[1.25rem] text-serif-ink">{source.label}</p>
              {source.notes && (
                <p className="mt-2 text-[14px] leading-relaxed text-body-muted">{source.notes}</p>
              )}
              <a
                href={source.url}
                className="mt-3 inline-block text-xs font-medium tracking-[0.12em] text-rose-deep uppercase hover:text-wag-sage"
                target="_blank"
                rel="noopener noreferrer"
              >
                {source.url.replace("https://", "")} →
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-10">
          <Link
            href="/dog-match"
            className="text-xs font-medium tracking-[0.16em] text-wag-sage uppercase underline decoration-border underline-offset-4 hover:text-rose"
          >
            Back to Dog Match
          </Link>
        </p>
      </Section>
    </>
  );
}
