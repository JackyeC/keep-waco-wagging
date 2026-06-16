import type { Metadata } from "next";
import Link from "next/link";
import { ShopProductCard } from "@/components/ShopProductCard";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { AdSlot } from "@/components/AdSlot";
import { SitePhoto } from "@/components/SitePhoto";
import { getProductRecommendations } from "@/data/products";
import { sitePhotos } from "@/data/sitePhotos";
import { monetization } from "@/lib/site";
import type { ProductRecommendation } from "@/lib/types";

export const metadata: Metadata = {
  title: "Dog Products We Recommend | Keep Waco Wagging",
  description:
    "Practical dog product recommendations for Waco pet parents, including crates, slow feeders, puzzle toys, cleaning supplies, and everyday dog care basics.",
};

function slugifyCategory(category: string) {
  return category.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function groupByCategory(products: ProductRecommendation[]) {
  const categories: string[] = [];
  const byCategory = new Map<string, ProductRecommendation[]>();

  for (const product of products) {
    if (!byCategory.has(product.category)) {
      byCategory.set(product.category, []);
      categories.push(product.category);
    }
    byCategory.get(product.category)!.push(product);
  }

  return { categories, byCategory };
}

export default function ShopPage() {
  const products = getProductRecommendations();
  const { categories, byCategory } = groupByCategory(products);

  return (
    <>
      {/* Catalog header — Target-style category landing */}
      <section className="border-b border-clay/50 bg-white">
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
          <nav className="text-xs text-bark-faint">
            <Link href="/" className="hover:text-bark-soft">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-bark-soft">Shop</span>
          </nav>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-bark sm:text-3xl">
            Dog products we recommend
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-bark-soft sm:text-base">
            Practical gear we reach for every day in Central Texas — vetted, used, and
            linked to Amazon so you can grab what you need fast.
          </p>
        </div>

        <div className="relative mx-auto mt-6 aspect-[21/8] max-h-56 max-w-7xl overflow-hidden sm:px-6 lg:px-8">
          <div className="relative h-full overflow-hidden rounded-none sm:rounded-2xl">
            <SitePhoto
              src={sitePhotos.hero.src}
              alt="Dogs on a Waco walk"
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-bark/70 via-bark/35 to-transparent" />
            <div className="absolute inset-0 flex items-center px-6 sm:px-10">
              <p className="max-w-md text-lg font-semibold leading-snug text-cream sm:text-2xl">
                Summer-ready picks for Waco dogs — cooling, walking, and everyday care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by category — Target tile row */}
      <section className="border-b border-clay/40 bg-cream py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-semibold text-bark">Shop by category</h2>
          <div className="-mx-1 mt-4 flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
            {categories.map((category) => {
              const cover = byCategory.get(category)![0];
              return (
                <a
                  key={category}
                  href={`#${slugifyCategory(category)}`}
                  className="group w-28 shrink-0 text-center sm:w-32"
                >
                  <div className="aspect-square overflow-hidden rounded-xl bg-white p-3 ring-1 ring-inset ring-clay/60 transition group-hover:shadow-md group-hover:ring-sage-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cover.imageUrl}
                      alt=""
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <p className="mt-2 text-xs font-medium leading-tight text-bark group-hover:text-sage-700">
                    {category}
                  </p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sticky category nav */}
      <div className="sticky top-0 z-20 border-b border-clay/50 bg-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
          {categories.map((category) => (
            <a
              key={category}
              href={`#${slugifyCategory(category)}`}
              className="shrink-0 rounded-full bg-white px-4 py-1.5 text-sm font-medium text-bark ring-1 ring-inset ring-clay/70 transition hover:bg-sage-50 hover:ring-sage-200"
            >
              {category}
            </a>
          ))}
        </div>
      </div>

      {/* Disclosure */}
      <section className="bg-cream pt-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl bg-white px-4 py-3 ring-1 ring-inset ring-clay/60 sm:px-5">
            <AffiliateDisclosure />
            <p className="mt-1 text-xs leading-relaxed text-bark-soft">
              {monetization.productDisclosure}
            </p>
          </div>
        </div>
      </section>

      {/* Product grids */}
      <section className="bg-cream py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {categories.map((category, index) => {
            const items = byCategory.get(category)!;
            return (
              <div
                key={category}
                id={slugifyCategory(category)}
                className={index === 0 ? "" : "mt-16 scroll-mt-28 md:mt-20"}
              >
                <div className="flex items-end justify-between gap-4 border-b border-clay/60 pb-4">
                  <h2 className="text-xl font-semibold text-bark sm:text-2xl">
                    {category}
                  </h2>
                  <span className="text-sm text-bark-faint">
                    {items.length} {items.length === 1 ? "item" : "items"}
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {items.map((product) => (
                    <ShopProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            );
          })}

          <div className="mt-16 md:mt-20">
            <AdSlot placement="shop" />
          </div>
        </div>
      </section>
    </>
  );
}
