/**
 * Official City of Waco neighborhood names.
 * Source: City of Waco Neighborhood Directory (waco-texas.com)
 * https://www.waco-texas.gov/resident/neighborhood-engagement/neighborhood-directory
 */
export const wacoCityNeighborhoods = [
  "Alta Vista",
  "Austin Avenue",
  "Baylor",
  "Brook Oaks",
  "Brookview",
  "Cameron Park",
  "Carver",
  "Cedar Ridge",
  "Cesar Chavez",
  "China Spring",
  "Dean Highland",
  "Downtown",
  "Heart of Texas",
  "Highway 84 West",
  "Kendrick",
  "Landon Branch",
  "Mountainview",
  "North East Riverside",
  "North Lake Waco",
  "North Waco",
  "Oakwood",
  "Parkdale Viking Hills",
  "Richland Hills",
  "Sanger Heights",
  "Technology Village",
  "Timbercrest",
  "West Waco",
] as const;

export type WacoCityNeighborhood = (typeof wacoCityNeighborhoods)[number];

/** Select value when the user enters a neighborhood not in the city list. */
export const NEIGHBORHOOD_OTHER = "__other__";

export function resolveNeighborhoodValue(
  preset: string,
  other: string,
): string {
  if (!preset) return "";
  if (preset === NEIGHBORHOOD_OTHER) return other.trim();
  return preset;
}
