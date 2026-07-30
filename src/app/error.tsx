"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ctas } from "@/lib/site";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-100 text-bark">
        <AlertTriangle className="h-8 w-8" aria-hidden />
      </span>
      <h1 className="mt-6 text-3xl sm:text-4xl">Something went sideways</h1>
      <p className="mt-3 max-w-md text-bark-soft">
        We hit a snag loading this page. Try again, or head back to a familiar
        trail.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button type="button" onClick={reset}>
          Try again
        </Button>
        <Button href="/" variant="secondary">
          Back home
        </Button>
        <Button href={ctas.exploreDirectory.href} variant="ghost">
          {ctas.exploreDirectory.label}
        </Button>
      </div>
    </Container>
  );
}
