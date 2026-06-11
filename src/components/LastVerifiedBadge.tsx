import { CheckCircle2 } from "lucide-react";

export function LastVerifiedBadge({ date }: { date?: string }) {
  if (!date) return null;
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-sage-100 px-2.5 py-0.5 text-xs font-medium text-sage-700">
      <CheckCircle2 className="h-3 w-3" />
      Last verified {date}
    </span>
  );
}
