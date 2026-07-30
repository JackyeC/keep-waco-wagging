import Link from "next/link";
import { BlogCover } from "@/components/BlogCover";
import { getBlogCover } from "@/data/blogCovers";
import type { BlogPost } from "@/lib/types";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function GuideCards({ posts }: { posts: BlogPost[] }) {
  return (
    <section id="guides" className="mx-auto mt-[72px] max-w-[1200px] px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow tracking-[0.22em]">Local guides</p>
          <h2 className="heading mt-1.5 text-[40px]">
            Dog-friendly Waco resources
          </h2>
        </div>
        <Link
          href="/dog-friendly-waco"
          className="border-b border-[#d9b7b2] pb-0.5 text-xs font-medium tracking-[0.12em] text-rose-deep uppercase hover:border-wag-sage hover:text-wag-sage"
        >
          Dog-friendly directory →
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
                <h3 className="mt-1.5 font-display text-[21px] leading-snug font-semibold text-serif-ink">
                  {post.title}
                </h3>
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
    </section>
  );
}
