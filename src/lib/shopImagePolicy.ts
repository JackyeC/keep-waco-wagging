/**
 * Print-on-demand lifestyle frames of dogs that are not the owner's dog.
 * Shiloh is the only real dog approved for the shop. These files are mockups.
 */
export const placeholderDogImageIds = [
  "1395157564009763970",
  "85855634053968383",
  "919379830513923789",
] as const;

export function isPlaceholderDogImage(src: string): boolean {
  return placeholderDogImageIds.some((id) => src.includes(id));
}
