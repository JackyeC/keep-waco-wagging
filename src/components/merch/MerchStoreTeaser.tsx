import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MerchProductCard } from "@/components/merch/MerchProductCard";
import { getFeaturedMerchProducts } from "@/data/merchStore";
import { cityConfig, ctas } from "@/lib/site";
import Image from "next/image";

export function MerchStoreTeaser() {
  const featured = getFeaturedMerchProducts(3);

  return (
    <section className="bg-paper py-20 md:py-24" aria-labelledby="wear-the-wag-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-4">
            <p className="eyebrow">Merch</p>
            <h2 id="wear-the-wag-title" className="heading mt-3 text-2xl md:text-3xl">
              Wear the Wag
            </h2>
            <p className="dek mt-4 text-base">
              Keep Waco Wagging shirts made for Waco dog people.
            </p>
            <Link
              href={ctas.visitShop.href}
              className="mt-6 inline-flex items-center gap-2 rounded-sm border border-clay bg-white px-5 py-2.5 text-sm font-semibold tracking-wide text-bark transition-colors hover:bg-sand/60"
            >
              {ctas.visitShop.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="lg:col-span-8">
            {featured.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {featured.map((product) => (
                  <MerchProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center rounded-sm border border-clay bg-cream px-6 py-10 text-center sm:px-10">
                <Image
                  src={cityConfig.brand.logo.mark.src}
                  alt={cityConfig.brand.logo.mark.alt}
                  width={160}
                  height={100}
                  className="h-auto w-32 opacity-90 sm:w-40"
                />
                <p className="mt-6 font-display text-xl text-bark">Merch coming soon</p>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-bark-soft">
                  We are preparing a small shirt collection for Waco dog people. Visit
                  the shop page for updates — no checkout on this site.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
