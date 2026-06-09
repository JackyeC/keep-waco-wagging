import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import type { CategoryItem } from "@/lib/types";

export function CategoryCard({ item }: { item: CategoryItem }) {
  return (
    <Link
      href={item.href}
      className="group flex flex-col rounded-card bg-white p-5 ring-1 ring-inset ring-clay/70 transition-all hover:-translate-y-0.5 hover:shadow-md hover:ring-sage-200"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sage-100 text-sage-700 transition-colors group-hover:bg-sage-600 group-hover:text-white">
        <Icon name={item.icon} className="h-5 w-5" />
      </span>
      <h3 className="mt-4 text-lg font-semibold">{item.label}</h3>
      <p className="mt-1 flex-1 text-sm leading-relaxed text-bark-soft">
        {item.description}
      </p>
      <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-sage-700">
        Explore
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
