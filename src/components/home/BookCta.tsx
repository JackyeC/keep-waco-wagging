import Link from "next/link";
import { cityConfig, ctas } from "@/lib/site";

export function BookCta() {
  return (
    <section className="mx-auto mt-[72px] max-w-[1200px] px-6">
      <div className="rounded-[26px] bg-wag-sage px-8 py-12 text-center text-cream md:px-11 md:py-14">
        <p className="text-xs font-medium tracking-[0.2em] text-blush uppercase">
          Ready to book?
        </p>
        <h2 className="mx-auto mt-3 max-w-2xl font-display text-[42px] leading-tight font-medium">
          Tell us what your dog needs — we&apos;ll point you to the right{" "}
          <span className="font-script text-[48px] text-blush">service</span>
        </h2>
        <p className="mt-3.5 text-[15.5px] font-light opacity-92">
          Call {cityConfig.sponsor.phoneDisplay} · email {cityConfig.publicEmail}{" "}
          · or start online.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href={ctas.bookService.href}
            className="btn-pill bg-cream px-8 py-4 text-wag-sage hover:bg-blush hover:text-bark"
          >
            Book a service
          </Link>
          <Link
            href="/contact"
            className="btn-pill border-[1.4px] border-cream/60 bg-transparent px-7 py-3.5 text-cream hover:bg-cream/15"
          >
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
