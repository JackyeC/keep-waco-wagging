import { PawPrint } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ctas } from "@/lib/site";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sage-100 text-sage-600">
        <PawPrint className="h-8 w-8" />
      </span>
      <h1 className="mt-6 text-3xl sm:text-4xl">This trail&apos;s a dead end</h1>
      <p className="mt-3 max-w-md text-bark-soft">
        We couldn&apos;t find that page. Let&apos;s get you back to sniffing out
        dog-friendly Waco.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href="/">Back home</Button>
        <Button href={ctas.exploreDirectory.href} variant="secondary">
          {ctas.exploreDirectory.label}
        </Button>
      </div>
    </Container>
  );
}
