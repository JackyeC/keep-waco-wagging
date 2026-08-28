import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { BlogCard } from "@/components/BlogCard";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { AdSlot } from "@/components/AdSlot";
import { blogCategories, getPublishedPosts } from "@/data/blog";
import { editorialFranchises } from "@/data/editorialFranchises";
import { sitePhotos } from "@/data/sitePhotos";
import { servicePageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}): Promise<Metadata> {
  const { category } = await searchParams;
  const filtered =
    Boolean(category) && blogCategories.includes(category as never);
  const metadata = servicePageMetadata(
    "/blog",
    "The Keep Waco Wagging Blog",
    "Guides and tips for Waco dog parents — dog-friendly Waco, training for real life, yard + home care, local pet parents, events, business spotlights, and Platinum Scoops tips.",
  );
  if (!filtered) return metadata;
  return {
    ...metadata,
    robots: { index: false, follow: true },
  };
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const active = category && blogCategories.includes(category as never)
    ? category
    : "All";

  const published = getPublishedPosts();
  const filtered =
    active === "All"
      ? published
      : published.filter((p) => p.category === active);

  return (
    <>
      <PageHeader
        eyebrow="The blog"
        title="Guides & tips for Waco dog parents"
        description="Practical, local advice for calmer outings, cleaner yards, better manners, and a better life with your dog in Waco — not generic pet-internet filler."
        tone="sky"
        image={sitePhotos.training}
      />

      <Section tone="paper">
        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {editorialFranchises.map((franchise) => (
            <Link
              key={franchise.id}
              href={franchise.href}
              className="rounded-[16px] border border-border bg-soft-cream p-4 transition-colors hover:border-wag-sage"
            >
              <p className="text-[11px] font-medium tracking-[0.14em] text-wag-sage uppercase">
                {franchise.name}
              </p>
              <p className="mt-1.5 text-[14px] leading-snug text-bark">
                {franchise.question}
              </p>
            </Link>
          ))}
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2">
          <Link
            href="/blog"
            className={cn(
              "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
              active === "All"
                ? "bg-sage-600 text-white"
                : "bg-cream text-bark-soft ring-1 ring-inset ring-clay hover:bg-sage-50",
            )}
          >
            All
          </Link>
          {blogCategories.map((cat) => (
            <Link
              key={cat}
              href={`/blog?category=${encodeURIComponent(cat)}`}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                active === cat
                  ? "bg-sage-600 text-white"
                  : "bg-cream text-bark-soft ring-1 ring-inset ring-clay hover:bg-sage-50",
              )}
            >
              {cat}
            </Link>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_300px]">
          {filtered.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2">
              {filtered.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <p className="rounded-card bg-cream p-6 text-sm text-bark-soft ring-1 ring-inset ring-clay/70">
              No published guides in this category yet. Check back soon, or browse{" "}
              <Link href="/dog-friendly-waco" className="text-wag-sage hover:text-rose">
                dog-friendly Waco
              </Link>
              .
            </p>
          )}
          <div className="space-y-6 lg:sticky lg:top-20 lg:self-start">
            <AdSlot placement="blog-sidebar" />
          </div>
        </div>
      </Section>

      <Section tone="sand">
        <div className="mx-auto max-w-2xl">
          <NewsletterSignup variant="card" sourcePage="/blog" />
        </div>
      </Section>
    </>
  );
}
