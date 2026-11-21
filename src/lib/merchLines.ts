import type { MerchProduct } from "@/data/merchStore";

/**
 * Breed lines are grouped from the live catalog.
 * A breed exists only when a product carries a `Breed:` tag.
 * A line exists only when two or more of those products share a product type.
 */

export type CatalogBreed = {
  id: string;
  label: string;
};

export type ShopLine = {
  id: string;
  familyKey: string;
  label: string;
  singular: string;
  products: MerchProduct[];
  representative: MerchProduct;
  breeds: CatalogBreed[];
  priceLabel: string;
};

export type BreedShelf = CatalogBreed & {
  products: MerchProduct[];
};

export type ShopMerchandising = {
  lines: ShopLine[];
  singles: MerchProduct[];
  breeds: BreedShelf[];
};

const BREED_TAG = /^breed:\s*(.+)$/i;
const TYPE_TAG = /^product type:\s*(.+)$/i;

const LINE_ORDER = [
  "skyline-tee",
  "skyline-hoodie",
  "skyline-crewneck",
  "skyline-tote",
];

export function slugifyMerchLabel(label: string): string {
  return label
    .normalize("NFKD")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function breedFromCatalog(product: MerchProduct): CatalogBreed | null {
  for (const tag of product.tags ?? []) {
    const label = tag.match(BREED_TAG)?.[1]?.trim();
    if (!label) continue;
    const id = slugifyMerchLabel(label);
    if (!id) continue;
    return { id, label };
  }
  return null;
}

type LineFamily = {
  key: string;
  label: string;
  singular: string;
};

/** Product-type family that can collapse into one breed line. */
export function lineFamily(product: MerchProduct): LineFamily | null {
  const typeTag = (product.tags ?? [])
    .map((tag) => tag.match(TYPE_TAG)?.[1]?.trim())
    .find(Boolean);
  const hay = `${typeTag ?? ""} ${product.productType ?? ""} ${product.name}`.toLowerCase();

  if (/weekender/.test(hay)) return null;
  if (/crewneck/.test(hay) || (/sweatshirt/.test(hay) && !/hoodie/.test(hay))) {
    return {
      key: "skyline-crewneck",
      label: "Skyline crewneck",
      singular: "crewneck",
    };
  }
  if (/hoodie/.test(hay)) {
    return { key: "skyline-hoodie", label: "Skyline hoodie", singular: "hoodie" };
  }
  if (/tote/.test(hay)) {
    return { key: "skyline-tote", label: "Skyline tote", singular: "tote" };
  }
  if (/\b(t-shirt|tee)\b/.test(hay) || typeTag?.toLowerCase() === "t-shirt") {
    return { key: "skyline-tee", label: "Skyline tee", singular: "tee" };
  }
  return null;
}

export function parseShopPrice(price?: string): number | null {
  if (!price) return null;
  const amount = Number(price.replace(/[^0-9.]/g, ""));
  return Number.isFinite(amount) ? amount : null;
}

export function formatUsd(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

function priceLabelFor(products: MerchProduct[]): string {
  const amounts = products
    .map((product) => parseShopPrice(product.price))
    .filter((amount): amount is number => amount !== null);
  if (amounts.length === 0) return "";
  const low = Math.min(...amounts);
  const high = Math.max(...amounts);
  if (low === high) return formatUsd(low);
  return `From ${formatUsd(low)}`;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Title with the breed name removed, so "Corgi Waco Skyline Tote" and
 * "Aussie Waco Skyline Tote" share a template, while a different rescue tee
 * stays on its own.
 */
export function titleTemplate(product: MerchProduct, breed: CatalogBreed): string {
  const withoutBreed = product.name
    .replace(new RegExp(escapeRegExp(breed.label), "ig"), " ")
    .replace(/\s+/g, " ")
    .trim();
  return withoutBreed || product.name.trim();
}

function byBreedThenName(a: MerchProduct, b: MerchProduct): number {
  const breedA = breedFromCatalog(a)?.label ?? a.name;
  const breedB = breedFromCatalog(b)?.label ?? b.name;
  const breedOrder = breedA.localeCompare(breedB);
  if (breedOrder !== 0) return breedOrder;
  return a.name.localeCompare(b.name);
}

export function buildMerchMerchandising(
  products: MerchProduct[],
): ShopMerchandising {
  const lineBuckets = new Map<
    string,
    { family: LineFamily; label: string; products: MerchProduct[] }
  >();
  const singles: MerchProduct[] = [];

  for (const product of products) {
    const breed = breedFromCatalog(product);
    const family = lineFamily(product);
    if (!breed || !family) {
      singles.push(product);
      continue;
    }
    const label = titleTemplate(product, breed);
    const key = `${family.key}::${label.toLowerCase()}`;
    const bucket = lineBuckets.get(key) ?? { family, label, products: [] };
    bucket.products.push(product);
    lineBuckets.set(key, bucket);
  }

  const lines: ShopLine[] = [];
  for (const bucket of lineBuckets.values()) {
    if (bucket.products.length < 2) {
      singles.push(...bucket.products);
      continue;
    }
    const grouped = [...bucket.products].sort(byBreedThenName);
    const breeds: CatalogBreed[] = [];
    const seen = new Set<string>();
    for (const product of grouped) {
      const breed = breedFromCatalog(product);
      if (!breed || seen.has(breed.id)) continue;
      seen.add(breed.id);
      breeds.push(breed);
    }
    lines.push({
      id: slugifyMerchLabel(bucket.label),
      familyKey: bucket.family.key,
      label: bucket.label,
      singular: bucket.family.singular,
      products: grouped,
      representative: grouped[0]!,
      breeds,
      priceLabel: priceLabelFor(grouped),
    });
  }

  lines.sort((a, b) => {
    const rank = LINE_ORDER.indexOf(a.familyKey) - LINE_ORDER.indexOf(b.familyKey);
    if (rank !== 0) return rank;
    return a.label.localeCompare(b.label);
  });

  const breedMap = new Map<string, BreedShelf>();
  for (const product of products) {
    const breed = breedFromCatalog(product);
    if (!breed) continue;
    const shelf = breedMap.get(breed.id) ?? { ...breed, products: [] };
    shelf.products.push(product);
    breedMap.set(breed.id, shelf);
  }

  const breeds = [...breedMap.values()]
    .map((shelf) => ({
      ...shelf,
      products: [...shelf.products].sort((a, b) => a.name.localeCompare(b.name)),
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  return { lines, singles, breeds };
}

export function findShopLine(
  merch: ShopMerchandising,
  lineId: string,
): ShopLine | undefined {
  return merch.lines.find((line) => line.id === lineId);
}

export function findBreedShelf(
  merch: ShopMerchandising,
  breedId: string,
): BreedShelf | undefined {
  return merch.breeds.find((breed) => breed.id === breedId);
}

export function productForBreedOnLine(
  line: ShopLine,
  breedId: string,
): MerchProduct | undefined {
  return line.products.find((product) => breedFromCatalog(product)?.id === breedId);
}
