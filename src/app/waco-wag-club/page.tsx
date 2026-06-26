import type { Metadata } from "next";
import { Heart, PawPrint } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { servicePageMetadata } from "@/lib/metadata";
import { shopifyStoreConfig } from "@/data/merchStore";
import { brandLanguage, cityConfig, ctas } from "@/lib/site";

const seoTitle = "The Waco Wag Club | Keep Waco Wagging";
const seoDescription =
  "Join The Waco Wag Club, a community for dog people who wear their love proudly and help support dogs in need across the Waco community.";

export const metadata: Metadata = {
  ...servicePageMetadata("/waco-wag-club", seoTitle, seoDescription),
  openGraph: {
    title: seoTitle,
    description: seoDescription,
    url: `${cityConfig.url}/waco-wag-club`,
    siteName: cityConfig.name,
    type: "website",
    images: [
      {
        url: cityConfig.brand.logo.full.src,
        alt: cityConfig.brand.logo.full.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seoTitle,
    description: seoDescription,
    images: [cityConfig.brand.logo.full.src],
  },
};

const belongHere = [
  "You greet the dog before greeting the human attached to it.",
  "You have a baby voice reserved for one very specific four-legged citizen.",
  "Your camera roll is mostly dog photos, including several where your dog looks better than you do.",
  "You know your dog's favorite toy, snack, chair, walking route, and neighborhood enemy.",
  "You have rearranged an entire day around your dog without complaint.",
  "You talk to your dog like they understand every word.",
];

const shopByBreedUrl = `${shopifyStoreConfig.storefrontUrl}/pages/shop-by-breed`;

export default function WacoWagClubPage() {
  return (
    <>
      <section className="border-b border-clay bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <p className="eyebrow">Community</p>
          <h1 className="display mt-3 max-w-3xl text-bark">The Waco Wag Club</h1>
          <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-bark-soft">
            <p>
              For the people whose schedules, camera rolls, and favorite clothes all
              revolve around dogs.
            </p>
            <p>
              You do not simply have a dog. You have a roommate, a walking partner, a
              security consultant, and a slightly emotional best friend who refuses to
              schedule meetings.
            </p>
            <p>
              Welcome to <strong className="font-semibold text-bark">The Waco Wag Club</strong>.
            </p>
            <p>No membership form required. Your dog already approved you.</p>
          </div>
        </div>
      </section>

      <Section tone="paper">
        <SectionHeading title="You might belong here if…" size="compact" />
        <ul className="mt-8 max-w-3xl space-y-3">
          {belongHere.map((item) => (
            <li
              key={item}
              className="flex gap-3 text-base leading-relaxed text-bark-soft"
            >
              <PawPrint
                className="mt-1 h-4 w-4 shrink-0 text-sage-600"
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-bark-soft">
          Because, frankly, they do.
        </p>
      </Section>

      <Section tone="sand">
        <SectionHeading title="The unofficial uniform" size="compact" />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-bark-soft">
          <p>Waco Wag Club members dress for the dogs they love.</p>
          <p>
            Maybe it is a shirt that celebrates your favorite breed. Maybe it is a tote
            bag that tells everyone in line at H-E-B exactly where your priorities are.
            Maybe it is a hoodie you wear so often your dog assumes it belongs to both
            of you.
          </p>
          <p>Whatever you choose, it tells the world the same thing:</p>
          <p className="font-display text-xl text-bark sm:text-2xl">
            Dog person. Proudly. Completely. No explanation needed.
          </p>
        </div>
      </Section>

      <Section tone="paper">
        <SectionHeading title="Shop the Club" size="compact" />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-bark-soft">
          <p>
            Our apparel, accessories, and gifts are made for the people who already know
            that &ldquo;just a quick walk&rdquo; is a polite fiction.
          </p>
          <p>The people who leave early because the dog is waiting.</p>
          <p>The people who walk into a room and the dog finds them first.</p>
          <p>Find your favorite. Wear it proudly. Help us keep Waco wagging.</p>
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button href={ctas.visitShop.href} variant="primary" size="lg">
            Shop Now
          </Button>
          <Button href={shopByBreedUrl} variant="secondary" size="lg">
            Shop by Breed
          </Button>
        </div>
      </Section>

      <section className="border-y border-clay bg-sage-50 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="editorial-panel mx-auto max-w-3xl p-8 sm:p-10">
            <div className="flex items-center gap-3 text-sage-600">
              <PawPrint className="h-5 w-5 shrink-0" aria-hidden="true" />
              <Heart className="h-5 w-5 shrink-0 text-gold-500" aria-hidden="true" />
              <span className="eyebrow !mb-0 text-sage-600">Purpose-driven merch</span>
            </div>
            <h2 className="headline-secondary mt-5 text-bark">
              Wear Your Love. Help Waco Dogs.
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-bark-soft sm:text-base">
              <p>Keep Waco Wagging is more than cute dog gear.</p>
              <p>
                We volunteer with Pet Circle Regional Animal Center and are committed to
                helping local dogs receive the care, enrichment, and second chances they
                deserve.
              </p>
              <p>
                Every purchase helps us continue supporting dogs in need right here in
                the Waco community.
              </p>
            </div>
            <p className="mt-6 border-t border-clay pt-5 font-display text-lg text-bark sm:text-xl">
              Cute gear. Local impact. More tails wagging.
            </p>
          </div>
        </div>
      </section>

      <Section tone="paper">
        <SectionHeading title="Welcome to the pack" size="compact" />
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-bark-soft">
          <p>Dogs make people better.</p>
          <p>
            They make neighborhoods friendlier, grocery runs more interesting, and
            ordinary Tuesdays feel a little more like Saturdays.
          </p>
          <p>If that sounds like you, you are already one of us.</p>
          <p className="font-display text-xl text-bark sm:text-2xl">
            Welcome to The Waco Wag Club.
          </p>
        </div>
      </Section>

      <section className="border-t border-clay bg-sand/60 py-8">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs leading-relaxed text-bark-faint">
            Keep Waco Wagging is a DBA of Platinum Scoops.
          </p>
          <p className="mt-2 text-xs leading-relaxed text-bark-faint">
            {brandLanguage.brandByLine}.
          </p>
        </div>
      </section>
    </>
  );
}
