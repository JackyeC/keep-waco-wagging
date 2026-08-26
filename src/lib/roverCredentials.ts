import { cityConfig } from "@/lib/site";

/** Approved public Rover credential line — always label the platform. */
export const roverCredentialsLine = cityConfig.rover.starSitter
  ? `${cityConfig.rover.rating} on Rover · ${cityConfig.rover.reviewCount} Rover reviews · Rover Star Sitter`
  : `${cityConfig.rover.rating} on Rover · ${cityConfig.rover.reviewCount} Rover reviews`;

/** Compact chips for trust strips when a structured list is preferred. */
export function roverCredentialChips(): string[] {
  const chips = [
    `${cityConfig.rover.rating} on Rover`,
    `${cityConfig.rover.reviewCount} Rover reviews`,
  ];
  if (cityConfig.rover.starSitter) chips.push("Rover Star Sitter");
  return chips;
}
