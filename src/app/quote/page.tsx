import type { Metadata } from "next";
import { QuoteCalculator } from "@/components/quote/QuoteCalculator";
import { noindexRobots } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "KWW Quick Quote",
  description: "Internal boarding quote calculator for Jackye and Todd.",
  robots: noindexRobots,
};

export default function QuotePage() {
  return <QuoteCalculator />;
}
