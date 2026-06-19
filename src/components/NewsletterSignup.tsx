import { EmailSignupForm } from "@/components/EmailSignupForm";
import { PresentingSponsor } from "@/components/PresentingSponsor";
import { SocialLinksBlock } from "@/components/SocialLinksBlock";
import { signupCopy } from "@/lib/signup";
import { brandLanguage } from "@/lib/site";
import { cn } from "@/lib/utils";

type NewsletterSignupProps = {
  /** full = all fields; compact = email only */
  compact?: boolean;
  /** Page path for owner notification emails */
  sourcePage?: string;
  /** Visual wrapper style */
  variant?: "section" | "card" | "inline";
  className?: string;
  showSocial?: boolean;
  id?: string;
};

/**
 * Keep Waco Wagging updates signup — primary list-building block.
 */
export function NewsletterSignup({
  compact = false,
  sourcePage,
  variant = "section",
  className,
  showSocial = true,
  id,
}: NewsletterSignupProps) {
  const isSection = variant === "section";
  const isCard = variant === "card";
  const Wrapper = isSection ? "section" : "div";

  return (
    <Wrapper
      id={id}
      className={cn(
        isSection && "bg-sand py-24 md:py-32",
        className,
      )}
    >
      <div
        className={cn(
          isSection && "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8",
          isCard && "rounded-card bg-cream p-6 ring-1 ring-inset ring-clay sm:p-8",
        )}
      >
        <div
          className={cn(
            "grid gap-10",
            !compact && "lg:grid-cols-[1fr_1.1fr] lg:items-start",
          )}
        >
          <div className={compact ? undefined : "max-w-lg"}>
            <p className="eyebrow eyebrow-brass">Updates</p>
            <h2
              className={cn(
                "heading mt-3",
                compact ? "text-xl" : "text-3xl md:text-4xl",
              )}
            >
              {signupCopy.headline}
            </h2>
            <p className="dek mt-4 text-base">{signupCopy.subheadline}</p>
            {!compact && (
              <p className="dek mt-4 text-base text-bark-soft">
                {brandLanguage.instagram.socialLine}
              </p>
            )}
            {!compact && (
              <div className="mt-4">
                <PresentingSponsor size="sm" />
              </div>
            )}
            {showSocial && !compact && (
              <SocialLinksBlock className="mt-8 hidden lg:block" size="sm" />
            )}
          </div>
          <div className={compact ? "max-w-md" : undefined}>
            <EmailSignupForm
              compact={compact}
              sourcePage={sourcePage}
              showSocialOnSuccess={showSocial}
            />
            {showSocial && compact && (
              <SocialLinksBlock className="mt-5" size="sm" />
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
