"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PawPrint } from "lucide-react";
import { DirectoryCard } from "@/components/DirectoryCard";
import {
  DirectoryFilters,
  type DirectoryFilterState,
} from "@/components/DirectoryFilters";
import type { DirectoryCategory, Listing } from "@/lib/types";

const initialState: DirectoryFilterState = {
  query: "",
  category: "All",
  goodForPuppies: false,
  goodForReactiveDogs: false,
  shadeOnly: false,
  waterOnly: false,
};

export function DirectoryBrowser({
  listings,
  categories,
  sidebarSlot,
}: {
  listings: Listing[];
  categories: DirectoryCategory[];
  /** Optional content rendered beneath the filters (e.g. an ad slot). */
  sidebarSlot?: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") as
    | DirectoryCategory
    | null;

  const [state, setState] = useState<DirectoryFilterState>({
    ...initialState,
    category:
      initialCategory && categories.includes(initialCategory)
        ? initialCategory
        : "All",
  });

  const onChange = (next: Partial<DirectoryFilterState>) =>
    setState((prev) => ({ ...prev, ...next }));

  const filtered = useMemo(() => {
    const q = state.query.trim().toLowerCase();
    return listings.filter((l) => {
      if (state.category !== "All" && l.category !== state.category) return false;
      if (state.goodForPuppies && !l.goodForPuppies) return false;
      if (state.goodForReactiveDogs && !l.goodForReactiveDogs) return false;
      if (state.shadeOnly && !l.shadeAvailable) return false;
      if (state.waterOnly && !l.waterAvailable) return false;
      if (q) {
        const haystack = [
          l.name,
          l.area,
          l.category,
          l.description,
          l.dogFriendlyNotes,
          ...l.tags,
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [listings, state]);

  return (
    <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
      <aside className="space-y-6 lg:sticky lg:top-20 lg:self-start">
        <DirectoryFilters
          state={state}
          categories={categories}
          onChange={onChange}
          onReset={() => setState(initialState)}
          resultCount={filtered.length}
        />
        {sidebarSlot}
      </aside>

      <div>
        {filtered.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2">
            {filtered.map((listing) => (
              <DirectoryCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-card bg-white py-16 text-center ring-1 ring-inset ring-clay/70">
            <PawPrint className="h-10 w-10 text-sage-300" />
            <p className="mt-3 text-lg font-semibold">No places match yet</p>
            <p className="mt-1 max-w-sm text-sm text-bark-soft">
              Try clearing a filter or searching a different area. New Waco spots
              are added regularly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
