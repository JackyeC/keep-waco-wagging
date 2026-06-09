import { cn } from "@/lib/utils";

type Tone = "sage" | "sky" | "sand" | "gold";

const tones: Record<Tone, string> = {
  sage: "bg-sage-100 text-sage-700",
  sky: "bg-sky-100 text-sky-700",
  sand: "bg-clay text-bark-soft",
  gold: "bg-gold-100 text-gold-600",
};

export function Badge({
  children,
  tone = "sage",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
