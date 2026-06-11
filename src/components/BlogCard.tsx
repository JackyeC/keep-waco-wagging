import Link from "next/link";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import type { BlogPost } from "@/lib/types";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function BlogCard({ post }: { post: BlogPost }) {
  const href = `/blog/${post.slug}`;
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-card bg-white ring-1 ring-inset ring-clay/70 transition-all hover:-translate-y-0.5 hover:shadow-md hover:ring-sage-200">
      <Link href={href} className="block">
        <div className="aspect-[16/9] overflow-hidden">
          <ImagePlaceholder src={post.imageUrl} alt={post.title} label={post.category} />
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2">
          <Badge tone="sky">{post.category}</Badge>
        </div>
        <h3 className="mt-3 text-lg font-semibold leading-snug">
          <Link href={href} className="hover:text-sage-700">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-bark-soft">
          {post.excerpt}
        </p>
        <div className="mt-4 flex items-center gap-3 text-xs text-bark-faint">
          <span>{formatDate(post.date)}</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {post.readTime}
          </span>
        </div>
      </div>
    </article>
  );
}
