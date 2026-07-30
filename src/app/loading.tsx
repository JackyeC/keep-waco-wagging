import { Container } from "@/components/ui/Container";

export default function Loading() {
  return (
    <Container className="flex min-h-[40vh] flex-col items-center justify-center py-20">
      <div
        className="h-10 w-10 animate-pulse rounded-full bg-sage-200"
        aria-hidden
      />
      <p className="mt-4 text-sm font-medium tracking-wide text-bark-soft">
        Loading…
      </p>
      <span className="sr-only">Loading page content</span>
    </Container>
  );
}
