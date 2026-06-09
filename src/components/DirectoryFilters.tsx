"use client";

import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DirectoryCategory } from "@/lib/types";

export interface DirectoryFilterState {
  query: string;
  category: DirectoryCategory | "All";
  goodForPuppies: boolean;
  goodForReactiveDogs: boolean;
  shadeOnly: boolean;
  waterOnly: boolean;
}

const toggles: {
  key: keyof Omit<DirectoryFilterState, "query" | "category">;
  label: string;
}[] = [
  { key: "goodForPuppies", label: "Good for puppies" },
  { key: "goodForReactiveDogs", label: "Good for reactive dogs" },
  { key: "shadeOnly", label: "Shade available" },
  { key: "waterOnly", label: "Water available" },
];

export function DirectoryFilters({
  state,
  categories,
  onChange,
  onReset,
  resultCount,
}: {
  state: DirectoryFilterState;
  categories: DirectoryCategory[];
  onChange: (next: Partial<DirectoryFilterState>) => void;
  onReset: () => void;
  resultCount: number;
}) {
  const allCategories: (DirectoryCategory | "All")[] = ["All", ...categories];

  return (
    <div className="rounded-card bg-white p-5 ring-1 ring-inset ring-clay/70">
      {/* Search */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-bark-faint" />
        <input
          type="search"
          value={state.query}
          onChange={(e) => onChange({ query: e.target.value })}
          placeholder="Search places, areas, or tags…"
          className="w-full rounded-full border-0 bg-cream py-2.5 pl-10 pr-4 text-sm text-bark ring-1 ring-inset ring-clay placeholder:text-bark-faint focus:outline-none focus:ring-2 focus:ring-sage-400"
        />
      </div>

      {/* Category chips */}
      <div className="mt-4 flex flex-wrap gap-2">
        {allCategories.map((cat) => {
          const active = state.category === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onChange({ category: cat })}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                active
                  ? "bg-sage-600 text-white"
                  : "bg-cream text-bark-soft ring-1 ring-inset ring-clay hover:bg-sage-50 hover:text-bark",
              )}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Toggles */}
      <div className="mt-4 flex flex-wrap gap-2">
        {toggles.map((t) => {
          const active = state[t.key];
          return (
            <button
              key={t.key}
              type="button"
              aria-pressed={active}
              onClick={() => onChange({ [t.key]: !active })}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                active
                  ? "bg-sky-600 text-white"
                  : "bg-sky-50 text-sky-700 ring-1 ring-inset ring-sky-100 hover:bg-sky-100",
              )}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-clay/70 pt-4">
        <p className="text-sm text-bark-soft">
          <span className="font-semibold text-bark">{resultCount}</span>{" "}
          {resultCount === 1 ? "place" : "places"}
        </p>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1 text-sm font-medium text-bark-soft hover:text-sage-700"
        >
          <X className="h-3.5 w-3.5" />
          Clear filters
        </button>
      </div>
    </div>
  );
}
