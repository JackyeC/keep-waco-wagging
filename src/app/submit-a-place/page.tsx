import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { DirectorySubmissionForm } from "@/components/DirectorySubmissionForm";
import { servicePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = servicePageMetadata(
  "/submit-a-place",
  "Submit a Dog-Friendly Place | Keep Waco Wagging",
  "Submit a Waco dog-friendly place for review in the Keep Waco Wagging directory.",
);

export default function SubmitAPlacePage() {
  return (
    <>
      <PageHeader
        eyebrow="Submit a place"
        title="Know a dog-friendly Waco spot?"
        description="Send it our way. We'll review the details before adding it to Keep Waco Wagging."
        tone="sage"
      />
      <Section tone="paper">
        <div className="mx-auto max-w-4xl">
          <DirectorySubmissionForm />
        </div>
      </Section>
    </>
  );
}
