import { GearGuideProductCard } from "@/components/gear-guide/GearGuideProductCard";
import { GearGuideServiceCta } from "@/components/gear-guide/GearGuideServiceCta";
import { getFeaturedGearProduct } from "@/data/gearGuide";
import type { GearGuideDepartment } from "@/lib/types";

export function GearGuideDepartmentSection({
  department,
}: {
  department: GearGuideDepartment;
}) {
  const featured = getFeaturedGearProduct(department);
  const gridProducts = department.products.filter((p) => p.id !== featured?.id);

  return (
    <section
      id={department.slug}
      className="scroll-mt-24 border-t border-clay pt-14 first:border-t-0 first:pt-0 md:pt-16"
      aria-labelledby={`dept-${department.slug}-title`}
    >
      <header className="max-w-3xl">
        <p className="eyebrow eyebrow-brass">Department {department.number}</p>
        <h2
          id={`dept-${department.slug}-title`}
          className="headline-secondary mt-2"
        >
          {department.title}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-bark-soft sm:text-base">
          {department.intro}
        </p>
      </header>

      {department.callout && (
        <blockquote className="mt-8 border-l-4 border-sky-400 bg-sky-50/60 px-5 py-4 text-sm leading-relaxed text-bark sm:text-base">
          {department.callout}
        </blockquote>
      )}

      {department.pullQuote && (
        <blockquote className="mt-8 max-w-2xl font-display text-2xl leading-snug text-bark sm:text-3xl">
          “{department.pullQuote}”
        </blockquote>
      )}

      {department.safetyNote && (
        <aside className="mt-8 border border-gold-200 bg-gold-50/50 p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-gold-700">
            Safety notes
          </p>
          <div className="mt-3 space-y-3 text-sm leading-relaxed text-bark-soft whitespace-pre-line">
            {department.safetyNote}
          </div>
        </aside>
      )}

      {featured && (
        <div className="mt-10">
          <p className="eyebrow mb-4">Featured pick</p>
          <GearGuideProductCard product={featured} featured />
        </div>
      )}

      {gridProducts.length > 0 && (
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {gridProducts.map((product) => (
            <GearGuideProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {department.serviceCta && <GearGuideServiceCta cta={department.serviceCta} />}
    </section>
  );
}
