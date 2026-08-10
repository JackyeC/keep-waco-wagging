import Image from "next/image";
import Link from "next/link";

export function BrandStory() {
  return (
    <section className="mx-auto mt-20 max-w-[1200px] px-6">
      <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="relative order-2 lg:order-1">
          <div className="relative aspect-[5/4] w-full overflow-hidden rounded-[28px] border border-border">
            <Image
              src="/pictures/community-walk.webp"
              alt="Waco dog owners on a neighborhood group walk with their dogs"
              fill
              sizes="(max-width: 1024px) 100vw, 520px"
              className="object-cover"
            />
          </div>
        </div>
        <div className="order-1 max-w-xl lg:order-2">
          <p className="eyebrow tracking-[0.24em]">Our story</p>
          <h2 className="heading mt-3 text-[clamp(2rem,4vw,3rem)]">
            Born in Waco.{" "}
            <span className="font-script font-normal text-rose">
              Built for dog people.
            </span>
          </h2>
          <p className="dek mt-5">
            Keep Waco Wagging is a local lifestyle brand inspired by the people,
            pups, patios, neighborhoods, and little rituals that make life with
            dogs in Waco better.
          </p>
          <p className="body-light mt-4 text-[15px]">
            More than merch — it&apos;s a community of Waco dog people who show
            up for each other, for local spots, and for the dogs who make this
            town feel like home.
          </p>
          <Link
            href="/about"
            className="mt-6 inline-block border-b border-[#d9b7b2] pb-0.5 text-xs font-medium tracking-[0.14em] text-rose-deep uppercase hover:border-wag-sage hover:text-wag-sage"
          >
            Meet the people behind it →
          </Link>
        </div>
      </div>
    </section>
  );
}
