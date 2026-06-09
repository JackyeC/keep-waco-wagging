import Link from "next/link";
import {
  MapPin,
  Globe,
  Phone,
  Clock,
  Sun,
  Droplets,
  AlertTriangle,
  GraduationCap,
  ArrowLeft,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { DirectoryCard } from "@/components/DirectoryCard";
import { ctas } from "@/lib/site";
import type { Listing } from "@/lib/types";

function BoolPill({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span
      className={
        ok
          ? "inline-flex items-center gap-1 rounded-full bg-sage-100 px-3 py-1 text-xs font-medium text-sage-700"
          : "inline-flex items-center gap-1 rounded-full bg-sand px-3 py-1 text-xs font-medium text-bark-faint"
      }
    >
      {label}: {ok ? "Yes" : "Not really"}
    </span>
  );
}

export function ListingDetail({
  listing,
  nearby,
}: {
  listing: Listing;
  nearby: Listing[];
}) {
  return (
    <article>
      {/* Header / hero */}
      <div className="bg-gradient-to-b from-sage-50 to-cream">
        <Container className="py-8 sm:py-12">
          <Link
            href="/directory"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-sage-700 hover:text-sage-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to directory
          </Link>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div className="overflow-hidden rounded-card ring-1 ring-inset ring-clay/70">
              <div className="aspect-[16/10]">
                <ImagePlaceholder
                  src={listing.imageUrl}
                  alt={listing.name}
                  label={listing.name}
                />
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="sage">{listing.category}</Badge>
                {listing.featured && <Badge tone="gold">Featured</Badge>}
              </div>
              <h1 className="mt-3 text-3xl sm:text-4xl">{listing.name}</h1>
              <p className="mt-2 inline-flex items-center gap-1.5 text-bark-soft">
                <MapPin className="h-4 w-4" />
                {listing.area} · {listing.address}
              </p>

              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                {listing.website && (
                  <a
                    href={listing.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-medium text-sage-700 hover:text-sage-800"
                  >
                    <Globe className="h-4 w-4" /> Website
                  </a>
                )}
                {listing.phone && (
                  <a
                    href={`tel:${listing.phone.replace(/[^\d]/g, "")}`}
                    className="inline-flex items-center gap-1.5 font-medium text-sage-700 hover:text-sage-800"
                  >
                    <Phone className="h-4 w-4" /> {listing.phone}
                  </a>
                )}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-sand px-3 py-1 text-xs font-medium text-bark-soft">
                  <Sun className="h-3.5 w-3.5" />
                  {listing.shadeAvailable ? "Shade available" : "Limited shade"}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">
                  <Droplets className="h-3.5 w-3.5" />
                  {listing.waterAvailable ? "Water available" : "Bring water"}
                </span>
                <BoolPill ok={listing.goodForPuppies} label="Puppies" />
                <BoolPill ok={listing.goodForReactiveDogs} label="Reactive dogs" />
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Body */}
      <Container className="py-12">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold">Overview</h2>
              <p className="mt-2 leading-relaxed text-bark-soft">
                {listing.description}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold">Dog rules</h2>
              <p className="mt-2 leading-relaxed text-bark-soft">
                {listing.dogFriendlyNotes}
              </p>
              {listing.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {listing.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-sage-50 px-2.5 py-0.5 text-xs font-medium text-sage-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </section>

            <div className="grid gap-4 sm:grid-cols-2">
              <section className="rounded-card bg-white p-5 ring-1 ring-inset ring-clay/70">
                <h3 className="inline-flex items-center gap-2 font-semibold">
                  <Clock className="h-4 w-4 text-sky-600" /> Best time to go
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-bark-soft">
                  {listing.bestTimeToVisit}
                </p>
              </section>
              <section className="rounded-card bg-white p-5 ring-1 ring-inset ring-clay/70">
                <h3 className="inline-flex items-center gap-2 font-semibold">
                  <AlertTriangle className="h-4 w-4 text-gold-600" /> What to
                  watch for
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-bark-soft">
                  {listing.shadeAvailable
                    ? ""
                    : "Limited shade — plan around the Texas heat. "}
                  {!listing.waterAvailable
                    ? "Bring your own water. "
                    : ""}
                  {!listing.goodForReactiveDogs
                    ? "Can get busy, so give reactive dogs extra space."
                    : "Generally manageable for dogs still building confidence."}
                </p>
              </section>
            </div>

            {listing.trainingTip && (
              <section className="rounded-card bg-sage-50 p-5 ring-1 ring-inset ring-sage-200">
                <h3 className="inline-flex items-center gap-2 font-semibold text-sage-800">
                  <GraduationCap className="h-5 w-5" /> Training tip
                </h3>
                <p className="mt-1 leading-relaxed text-sage-900/80">
                  {listing.trainingTip}
                </p>
              </section>
            )}
          </div>

          {/* Sidebar CTA */}
          <aside className="lg:sticky lg:top-20 lg:self-start">
            <div className="rounded-card bg-sage-700 p-6 text-white">
              <h3 className="text-lg font-semibold">
                Need help getting your dog ready for outings?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-sage-100">
                Patios, parks, and busy places are skills you can build. Start
                with a Lifestyle Training Assessment and get a plan for calmer
                real-life adventures.
              </p>
              <Button
                href={ctas.bookTraining.href}
                variant="secondary"
                className="mt-4 w-full"
              >
                {ctas.bookTraining.label}
              </Button>
            </div>
          </aside>
        </div>

        {/* Nearby */}
        {nearby.length > 0 && (
          <div className="mt-14">
            <h2 className="text-2xl font-semibold">Nearby places</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {nearby.map((n) => (
                <DirectoryCard key={n.id} listing={n} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </article>
  );
}
