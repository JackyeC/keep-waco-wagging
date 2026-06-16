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
        "border-l-2 border-gold-400 py-3 pl-4",
        className,
      )}
    >
      <h3 className="text-sm font-medium leading-snug text-bark">{title}</h3>
    </article>
  );
}
