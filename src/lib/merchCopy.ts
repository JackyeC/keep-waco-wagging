/**
 * Public merch copy. Shopify descriptions sometimes include internal notes
 * in square brackets. Those stay off the shop.
 */

export function cleanListingDescription(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\[[^\]]*\]/g, " ")
    .replace(/DRAFT\s*[—-]\s*pending review\.?\s*/gi, "")
    .replace(/Not yet published\.?\s*/gi, "")
    .replace(/\s*[—–]\s*/g, ", ")
    .replace(/\s+/g, " ")
    .trim();
}

function isInternalSentence(sentence: string): boolean {
  return /printify|confirm whether|\btodo\b|placeholder|insert return address/i.test(
    sentence,
  );
}

/** Shopper-facing description. Drops internal notes and runaway length. */
export function publicMerchDescription(htmlOrText: string): string {
  const cleaned = cleanListingDescription(htmlOrText);
  const sentences = cleaned.split(/(?<=[.!?])\s+/).filter(Boolean);
  const kept = sentences.filter((sentence) => !isInternalSentence(sentence));
  let text = kept.join(" ").trim();
  if (text.length > 420) {
    const cut = text.slice(0, 420);
    const last = cut.lastIndexOf(". ");
    text = (last > 80 ? cut.slice(0, last + 1) : cut).trim();
  }
  return text;
}

/** One line under a product name. Empty when we don't have a real sentence. */
export function publicMerchBenefit(description: string, name: string): string {
  let text = publicMerchDescription(description);
  const cut = text.search(
    /\b(Designed in Waco|Made to order|Printed on|Garment dyed|Current listing|Colors:|Sizes |Unisex sizing)\b/i,
  );
  if (cut > 40) text = text.slice(0, cut).trim();
  text = text
    .replace(/currently\s+\$[\d.,\s–—-]*to\s+\$[\d.]+/gi, "")
    .replace(/\s+/g, " ")
    .trim();

  const sentences = text.split(/(?<=[.!?])\s+/).filter(Boolean);
  let line = "";
  for (const sentence of sentences) {
    const next = (line ? `${line} ${sentence}` : sentence).trim();
    if (next.length > 150 && line) break;
    line = next;
    if (line.length >= 80) break;
  }
  line = line.replace(/[,\s]+$/, "").trim();
  if (!line || line.toLowerCase() === name.toLowerCase()) return "";
  if (!/[.!?]$/.test(line)) line = `${line}.`;
  return line;
}

export function publicMerchAlt(
  name: string,
  alt: string | undefined,
  benefit: string,
): string {
  const cleaned = (alt ?? "").replace(/\s*[—–]\s*/g, ", ").trim();
  if (
    cleaned &&
    cleaned.toLowerCase() !== name.toLowerCase() &&
    cleaned.length > name.length + 12 &&
    !/^photo \d+$/i.test(cleaned)
  ) {
    return cleaned;
  }
  if (benefit) return `${name}. ${benefit}`;
  return `${name}, Keep Waco Wagging merch`;
}
