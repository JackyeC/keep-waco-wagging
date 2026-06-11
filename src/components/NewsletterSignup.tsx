import { EmailSignupForm } from "@/components/EmailSignupForm";

export function NewsletterSignup({
  variant = "card",
  className,
}: {
  variant?: "card" | "inline";
  className?: string;
}) {
  return (
    <div className={className}>
      <div className={variant === "card" ? "rounded-card bg-sage-700 p-6 text-white sm:p-8" : ""}>
        <p className={variant === "card" ? "text-sm font-semibold uppercase tracking-wide text-sage-200" : "text-sm font-semibold uppercase tracking-wide text-sage-600"}>
          Join the Waco Dog Parent List
        </p>
        <h3 className={variant === "card" ? "mt-1 text-xl text-white sm:text-2xl" : "mt-1 text-xl text-bark sm:text-2xl"}>
          Dog-friendly Waco, in your inbox.
        </h3>
        <p className={variant === "card" ? "mt-2 text-sm leading-relaxed text-sage-100" : "mt-2 text-sm leading-relaxed text-bark-soft"}>
          Local dog-friendly finds, pet care updates, product recommendations,
          and practical Waco dog parent tips.
        </p>
        <div className="mt-4">
          <EmailSignupForm compact={variant === "inline"} />
        </div>
      </div>
    </div>
  );
}
