"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { DogDirectoryCard } from "@/components/DogDirectoryCard";
import type { DogDirectoryListing } from "@/lib/types";

const inputClass =
  "w-full rounded-xl border-0 bg-white px-3.5 py-2.5 text-sm text-bark ring-1 ring-inset ring-clay placeholder:text-bark-faint focus:outline-none focus:ring-2 focus:ring-sage-400";

export function DogDirectoryBrowser({
  listings,
  categories,
  neighborhoods,
}: {
  listings: DogDirectoryListing[];
  categories: readonly string[];
  neighborhoods: string[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [neighborhood, setNeighborhood] = useState("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return listings.filter((listing) => {
      if (category !== "All" && listing.category !== category) return false;
      if (neighborhood !== "All" && listing.neighborhood !== neighborhood) {
        return false;
      }
      if (!q) return true;
      return [
        listing.name,
        listing.category,
        listing.neighborhood,
        listing.description,
        listing.dogPolicy,
        ...(listing.badges ?? []),
      ]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [category, listings, neighborhood, query]);

  return (
    <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
      <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
        <div className="rounded-card bg-cream p-5 ring-1 ring-inset ring-clay/70">
          <label className="text-sm font-medium text-bark">
            Search
            <div className="relative mt-1.5">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-bark-faint" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Patio, park, coffee..."
                className={`${inputClass} pl-9`}
              />
            </div>
          </label>
          <label className="mt-4 block text-sm font-medium text-bark">
            Category
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`${inputClass} mt-1.5`}
            >
              <option>All</option>
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="mt-4 block text-sm font-medium text-bark">
            Neighborhood
            <select
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              className={`${inputClass} mt-1.5`}
            >
              <option>All</option>
              {neighborhoods.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <p className="mt-4 text-sm text-bark-soft">
            Showing {filtered.length} of {listings.length} places.
          </p>
        </div>
      </aside>

      <div className="grid gap-6 sm:grid-cols-2">
        {filtered.map((listing) => (
          <DogDirectoryCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
}
