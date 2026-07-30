import { Container } from "@/components/ui/Container";

export default function ShopLoading() {
  return (
    <Container className="py-16">
      <div className="mx-auto max-w-xl text-center">
        <div
          className="mx-auto h-3 w-24 animate-pulse rounded-full bg-sage-200"
          aria-hidden
        />
        <div
          className="mx-auto mt-4 h-8 w-64 max-w-full animate-pulse rounded-md bg-cream ring-1 ring-inset ring-clay/50"
          aria-hidden
        />
        <p className="mt-4 text-sm text-bark-soft">Loading the shop…</p>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse overflow-hidden rounded-card bg-cream ring-1 ring-inset ring-clay/50"
          >
            <div className="aspect-[4/5] bg-sage-100/80" />
            <div className="space-y-2 p-4">
              <div className="h-3 w-1/3 rounded bg-sage-200/80" />
              <div className="h-4 w-3/4 rounded bg-clay/40" />
              <div className="h-3 w-1/4 rounded bg-sage-200/60" />
            </div>
          </div>
        ))}
      </div>
      <span className="sr-only">Loading shop products</span>
    </Container>
  );
}
