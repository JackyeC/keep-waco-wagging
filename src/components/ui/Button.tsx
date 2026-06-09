import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "sponsor";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sage-400 disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-sage-600 text-white hover:bg-sage-700",
  secondary:
    "bg-white text-sage-700 ring-1 ring-inset ring-sage-200 hover:bg-sage-50",
  ghost: "text-sage-700 hover:bg-sage-50",
  sponsor: "bg-gold-500 text-bark hover:bg-gold-600 hover:text-white",
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
