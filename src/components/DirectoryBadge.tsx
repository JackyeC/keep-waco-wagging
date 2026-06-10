import { Badge } from "@/components/ui/Badge";

export function DirectoryBadge({ label }: { label: string }) {
  const tone =
    label.includes("Verify") || label.includes("unknown")
      ? "gold"
      : label.includes("Tourist")
        ? "sky"
        : "sage";

  return <Badge tone={tone}>{label}</Badge>;
}
