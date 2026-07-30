import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { ArticleJsonLd } from "@/components/seo/StructuredData";
import { blogPostsWithImages, isPublishedGuide } from "@/data/blog";
import {
  getGuideContent,
  getGuideSources,
  getRelatedGuideSlugs,
} from "@/data/guideContent";
import { articlePageMetadata } from "@/lib/metadata";
import { getBlogCategoryImage } from "@/data/sitePhotos";

export function generateStaticParams() {
  return blogPostsWithImages.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPostsWithImages.find((item) => item.slug === slug);
  if (!post) return { title: "Guide not found" };

  const image = post.imageUrl
    ? { src: post.imageUrl, alt: post.title }
    : getBlogCategoryImage(post.category);
  const published = isPublishedGuide(post);

  if (!published) {
    return {
      title: post.title,
      description: post.excerpt,
      robots: { index: false, follow: false },
    };
  }

  return articlePageMetadata(
    `/blog/${post.slug}`,
    post.title,
    post.excerpt,
    image,
    post.date,
    post.updated,
  );
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPostsWithImages.find((item) => item.slug === slug);
  if (!post) notFound();

  const published = isPublishedGuide(post);
  const sections = getGuideContent(slug);
  const sources = getGuideSources(slug);
  const relatedSlugs = getRelatedGuideSlugs(slug);
  const relatedPosts = blogPostsWithImages.filter((item) =>
    relatedSlugs.includes(item.slug),
  );
  const image = post.imageUrl
    ? { src: post.imageUrl, alt: post.title }
    : getBlogCategoryImage(post.category);

  if (published && sections) {
    return (
      <>
        <ArticleJsonLd
          title={post.title}
          description={post.excerpt}
          path={`/blog/${post.slug}`}
          datePublished={post.date}
          dateModified={post.updated}
          image={image.src}
        />
        <section className="mx-auto max-w-[1200px] px-6 pt-11 pb-4">
          <div className="max-w-3xl">
            <span className="text-xs font-medium tracking-[0.2em] text-label-muted-alt uppercase">
              {post.category}
            </span>
            <h1 className="display mt-3.5 text-balance">{post.title}</h1>
            <p className="dek mt-4">{post.excerpt}</p>
            <p className="mt-4 text-xs font-medium tracking-[0.16em] text-label-muted uppercase">
              {post.author} · {post.readTime} · Published{" "}
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              {post.updated && post.updated !== post.date && (
                <>
                  {" "}
                  · Reviewed <time dateTime={post.updated}>{formatDate(post.updated)}</time>
                </>
              )}
            </p>
          </div>
        </section>

        <article className="mx-auto mt-10 max-w-[1200px] px-6 pb-6">
          <div className="mx-auto max-w-3xl rounded-[24px] border border-border bg-soft-cream px-7 py-8 md:px-10 md:py-10">
            {sections.map((section, index) => (
              <section
                key={section.heading ?? section.paragraphs[0]?.slice(0, 40)}
                className={index > 0 ? "mt-8" : undefined}
              >
                {section.heading && (
                  <h2 className="font-display text-[26px] font-semibold text-serif-ink">
                    {section.heading}
                  </h2>
                )}
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className="body-light mt-4 text-[15.5px] leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
            <p className="body-light mt-8 border-t border-border pt-6 text-sm text-label-muted">
              Dog policies, hours, prices, and availability can change. Please
              verify directly before visiting or booking.
            </p>
            {sources.length > 0 && (
              <section className="mt-8 border-t border-border pt-6">
                <h2 className="font-display text-[24px] font-semibold text-serif-ink">
                  Sources &amp; further reading
                </h2>
                <ul className="mt-4 space-y-2">
                  {sources.map((source) => (
                    <li key={source.href}>
                      <a
                        href={source.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-start gap-2 text-sm font-medium text-wag-sage hover:text-rose"
                      >
                        <span>{source.label}</span>
                        <ExternalLink
                          className="mt-0.5 h-3.5 w-3.5 shrink-0"
                          aria-hidden
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </article>

        <section className="mx-auto max-w-[1200px] px-6 pb-10">
          {relatedPosts.length > 0 && (
            <div className="mb-8">
              <h2 className="font-display text-[26px] font-semibold text-serif-ink">
                Keep reading
              </h2>
              <ul className="mt-3 space-y-2">
                {relatedPosts.map((related) => (
                  <li key={related.slug}>
                    <Link
                      href={`/blog/${related.slug}`}
                      className="text-sm font-medium text-wag-sage hover:text-rose"
                    >
                      {related.title} →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <Link
            href="/blog"
            className="text-sm font-medium text-wag-sage hover:text-rose"
          >
            ← Back to guides
          </Link>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="mx-auto max-w-[1200px] px-6 pt-11 pb-4">
        <div className="max-w-3xl">
          <span className="text-xs font-medium tracking-[0.2em] text-label-muted-alt uppercase">
            {post.category}
          </span>
          <h1 className="display mt-3.5 text-balance">{post.title}</h1>
          <p className="dek mt-4">{post.excerpt}</p>
        </div>
      </section>
      <article className="mx-auto mt-10 max-w-[1200px] px-6 pb-10">
        <div className="mx-auto max-w-3xl rounded-[24px] border border-border bg-soft-cream px-7 py-8">
          <p className="text-sm text-label-muted">
            {post.author} · {post.readTime} · {post.date}
          </p>
          <div className="body-light mt-6 space-y-4 text-[15.5px] leading-relaxed">
            <p>
              This guide is in progress. Check back soon for the full article, or
              browse our{" "}
              <Link href="/dog-friendly-waco" className="text-wag-sage hover:text-rose">
                dog-friendly Waco directory
              </Link>
              .
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
