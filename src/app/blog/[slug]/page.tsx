import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleJsonLd } from "@/components/seo/StructuredData";
import { blogPostsWithImages } from "@/data/blog";
import { getGuideContent } from "@/data/guideContent";
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
  const indexable = post.indexable === true;

  if (!indexable) {
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
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPostsWithImages.find((item) => item.slug === slug);
  if (!post) notFound();

  const indexable = post.indexable === true;
  const sections = getGuideContent(slug);
  const image = post.imageUrl
    ? { src: post.imageUrl, alt: post.title }
    : getBlogCategoryImage(post.category);

  if (indexable && sections) {
    return (
      <>
        <ArticleJsonLd
          title={post.title}
          description={post.excerpt}
          path={`/blog/${post.slug}`}
          datePublished={post.date}
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
              {post.author} · {post.readTime} ·{" "}
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
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
          </div>
        </article>

        <section className="mx-auto max-w-[1200px] px-6 pb-10">
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
