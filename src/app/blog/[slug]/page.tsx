import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { blogPostsWithImages } from "@/data/blog";
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
  const image = getBlogCategoryImage(post.category);
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      images: [{ url: image.src, alt: image.alt }],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPostsWithImages.find((item) => item.slug === slug);
  if (!post) notFound();
  const image = getBlogCategoryImage(post.category);

  return (
    <>
      <PageHeader
        eyebrow={post.category}
        title={post.title}
        description={post.excerpt}
        tone="sage"
        image={image}
      />
      <Section tone="paper">
        <article className="mx-auto max-w-3xl rounded-card bg-white p-7 ring-1 ring-inset ring-clay/70">
          <p className="text-sm text-bark-faint">
            {post.author} · {post.readTime} · {post.date}
          </p>
          <div className="mt-6 space-y-4 leading-relaxed text-bark-soft">
            <p>
              This guide is a starter article for Keep Waco Wagging. It is ready
              for SEO-friendly expansion with real local notes, photos, and
              direct source links.
            </p>
            <p>
              Dog policies, hours, prices, and availability can change. Please
              verify directly before visiting or booking.
            </p>
          </div>
        </article>
      </Section>
    </>
  );
}
