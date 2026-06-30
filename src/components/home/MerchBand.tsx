import Image from "next/image";
import Link from "next/link";
import { liveMerchProducts } from "@/data/merchStore";

const featuredHoodies = liveMerchProducts.filter((p) => p.featured).slice(0, 2);

export function MerchBand() {
  return (
    <section className="mx-auto mt-[72px] max-w-[1200px] px-6">
      <div className="grid items-center gap-8 rounded-[26px] bg-clay-rose p-8 md:grid-cols-[1fr_auto] md:gap-10 md:p-11">
        <div>
          <p className="text-xs font-medium tracking-[0.2em] text-[#7a4f49] uppercase">
            Merch · Wear the Wag
          </p>
          <h2 className="mt-2.5 font-display text-[40px] leading-tight font-semibold text-soft-cream">
            Keep Waco Wagging hoodies, made for Waco dog people
          </h2>
          <p className="mt-3 max-w-md text-[15px] font-light leading-relaxed text-[#fbf1ec]">
            Three Waco-skyline designs — Golden Retriever, Frenchie & Rescue
            Mutt. Premium fleece, printed on demand, $58.
          </p>
          <Link
            href="/shop"
            className="btn-pill mt-5 inline-flex bg-soft-cream px-7 py-3.5 text-rose-deep hover:bg-wag-sage hover:text-cream"
          >
            Visit the shop →
          </Link>
        </div>

        <div className="flex gap-3.5">
          {featuredHoodies.map((product, index) =>
            product.image ? (
              <Link
                key={product.id}
                href="/shop"
                className={index === 1 ? "mt-5 block" : "block"}
              >
                <div className="relative h-[190px] w-[150px] overflow-hidden rounded-2xl border border-white/20 bg-garment-tray">
                  <Image
                    src={product.image.src}
                    alt={product.image.alt}
                    fill
                    sizes="150px"
                    className="object-cover"
                  />
                </div>
              </Link>
            ) : null,
          )}
        </div>
      </div>
    </section>
  );
}
