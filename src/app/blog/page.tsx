import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { BlogCard } from "@/components/BlogCard";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { AdSlot } from "@/components/AdSlot";
import { blogPosts, blogCategories } from "@/data/blog";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "The Keep Waco Wagging Blog",
  description:
    "Guides and tips for Waco dog parents — dog-friendly Waco, training for real life, yard + home care, local pet parents, events, business spotlights, and Platinum Scoops tips.",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const active = category && blogCategories.includes(category as never)
    ? category
    : "All";

  const filtered =
    active === "All"
      ? blogPosts
      : blogPosts.filter((p) => p.category === active);

  const sorted = [...filtered].sort(
    (a, b) => +new Date(b.date) - +new Date(a.date),
  );

  return (
    <>
      <PageHeader
        eyebrow="The blog"
        title="Guides & tips for Waco dog parents"
        description="Practical, local advice for calmer outings, cleaner yards, better manners, and more fun with your dog."
        tone="sky"
      />

      <Section tone="paper">
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
          <div className="grid gap-6 sm:grid-cols-2">
            {sorted.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
          <div className="space-y-6 lg:sticky lg:top-20 lg:self-start">
            <AdSlot placement="blog-sidebar" />
          </div>
        </div>
      </Section>

      <Section tone="sand">
        <div className="mx-auto max-w-2xl">
          <NewsletterSignup />
        </div>
      </Section>
    </>
  );
}
