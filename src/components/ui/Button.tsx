import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "sponsor";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm font-sans text-sm font-semibold tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-bark/30 disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-bark text-cream hover:bg-bark/90",
  secondary:
    "border border-clay bg-transparent text-bark hover:border-bark/40 hover:bg-sand/50",
  ghost: "text-bark hover:bg-sand/60",
  sponsor:
    "border border-gold-400 bg-gold-100/80 text-bark hover:bg-gold-100 hover:border-gold-500",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm sm:text-base",
  lg: "px-7 py-3 text-base",
};

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  href?: string;
} & Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "className" | "children"
>;

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  type,
  ...rest
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
      const external = href.startsWith("http");
      return (
        <a
          href={href}
          className={classes}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} type={type ?? "button"} {...rest}>
      {children}
    </button>
  );
}
