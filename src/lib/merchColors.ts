/** Garment color swatches for shop variant pickers (Comfort Colors + common POD). */
export const garmentColorHex: Record<string, string> = {
  Black: "#2B2B2B",
  Navy: "#2B3A55",
  White: "#F2EEE6",
  Ivory: "#F2EDE5",
  Natural: "#D8C7B1",
  Cream: "#F2EDE5",
  Blossom: "#C07A6A",
  Bay: "#6D7F6A",
  "Blue Spruce": "#5F7485",
  Pepper: "#4A4A4A",
  Maroon: "#6B3A3A",
  Sage: "#6D7F6A",
  Sand: "#D8C7B1",
  "Light Blue": "#5F7485",
  "Dark Heather": "#4A4A4A",
  "Sport Grey": "#9CA3A8",
  Ash: "#B8B8B8",
  Red: "#8B3A3A",
  Royal: "#3D5A80",
};

export function isGarmentColorOption(values: string[]): boolean {
  return values.length > 0 && values.every((v) => v in garmentColorHex);
}
