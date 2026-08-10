import Image from "next/image";
import Link from "next/link";
import { BlogCover } from "@/components/BlogCover";
import { getBlogCover } from "@/data/blogCovers";
import type { BlogPost } from "@/lib/types";

const lifestyleTiles = [
  {
    label: "Waco",
    title: "Dog-friendly patios, parks & trails",
    href: "/dog-friendly-waco",
    image: {
      src: "/pictures/blog-dog-friendly.webp",
      alt: "A dog relaxing at a dog-friendly patio in Waco",
    },
  },
  {
    label: "Community",
    title: "Yappy Hours & local events",
    href: "/yappy-hours",
    image: {
      src: "/pictures/yappy-hours-party.webp",
      alt: "Dogs and their people gathered at a Waco Yappy Hour event",
    },
  },
  {
    label: "Dog Camp",
    title: "Themed weeks of play & rest",
    href: "/summer-daycare",
    image: {
      src: "/pictures/summer-camp-hero.webp",
      alt: "Dogs playing together at Keep Waco Wagging Dog Camp",
    },
  },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function LifestyleCommunity({ posts }: { posts: BlogPost[] }) {
  return (
    <section id="guides" className="mx-auto mt-20 max-w-[1200px] scroll-mt-24 px-6">
      <div className="max-w-2xl">
        <p className="eyebrow tracking-[0.24em]">The Waco dog life</p>
        <h2 className="heading mt-2 text-[clamp(2rem,4vw,2.75rem)]">
          Life with dogs in Waco
        </h2>
        <p className="dek mt-3 text-[15px]">
          The patios, outings, events, and little rituals that come with being a
          Waco dog person — and being part of the club.
        </p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {lifestyleTiles.map((tile) => (
          <Link
            key={tile.href}
            href={tile.href}
            className="group relative flex min-h-[300px] flex-col justify-end overflow-hidden rounded-[22px] border border-border"
          >
            <Image
              src={tile.image.src}
              alt={tile.image.alt}
              fill
              sizes="(max-width: 768px) 100vw, 380px"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-bark/80 via-bark/25 to-transparent"
              aria-hidden
            />
            <div className="relative p-6">
              <span className="text-[10.5px] font-medium tracking-[0.2em] text-blush uppercase">
                {tile.label}
              </span>
              <h3 className="mt-1.5 font-display text-[24px] leading-snug font-semibold text-cream">
                {tile.title}
              </h3>
              <span className="mt-2 inline-block text-[11px] font-medium tracking-[0.14em] text-cream/85 uppercase">
                Explore →
              </span>
            </div>
          </Link>
        ))}
      </div>

      {posts.length > 0 && (
        <>
          <div className="mt-14 flex flex-wrap items-end justify-between gap-4">
            <h3 className="font-display text-[26px] font-semibold text-serif-ink">
              From the journal
            </h3>
            <Link
              href="/blog"
              className="border-b border-[#d9b7b2] pb-0.5 text-xs font-medium tracking-[0.12em] text-rose-deep uppercase hover:border-wag-sage hover:text-wag-sage"
            >
              All reads →
            </Link>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {posts.map((post) => {
              const cover = getBlogCover(post.slug);
              return (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-[20px] border border-border bg-soft-cream transition-colors hover:border-rose"
                >
                  <div className="relative h-40 w-full">
                    <BlogCover cover={cover} title={post.title} />
                  </div>
                  <div className="flex flex-1 flex-col px-5 pt-4 pb-5">
                    <span className="text-[10.5px] font-medium tracking-[0.14em] text-rose-deep uppercase">
                      {post.category}
                    </span>
                    <h4 className="mt-1.5 font-display text-[20px] leading-snug font-semibold text-serif-ink">
                      {post.title}
                    </h4>
                    <p className="body-light mt-2 flex-1 text-[13px]">
                      {post.excerpt}
                    </p>
                    <p className="mt-3 text-[11.5px] font-light text-label-muted">
                      {formatDate(post.date)} · {post.readTime}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}
