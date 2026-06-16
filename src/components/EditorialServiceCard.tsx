import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function EditorialServiceCard({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "rounded-card bg-white p-5 ring-1 ring-inset ring-clay/70",
        className,
      )}
    >
      <Check className="h-5 w-5 text-sage-600" aria-hidden="true" />
      <h3 className="mt-3 text-base font-semibold text-bark">{title}</h3>
    </article>
  );
}
