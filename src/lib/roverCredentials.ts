import { cityConfig } from "@/lib/site";

/**
 * Public Rover trust line. Do not include a review count here — those
 * numbers change often and we do not have an automated source.
 */
export const roverCredentialsLine = cityConfig.rover.starSitter
  ? `${cityConfig.rover.rating} Star Sitter on Rover`
  : `${cityConfig.rover.rating} on Rover`;

/** Compact chips for trust strips when a structured list is preferred. */
export function roverCredentialChips(): string[] {
  const chips = [`${cityConfig.rover.rating} on Rover`];
  if (cityConfig.rover.starSitter) chips.push("Rover Star Sitter");
  return chips;
}
