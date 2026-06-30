import { shopifyStoreConfig } from "@/data/merchStore";

export type ShopifyRawVariant = {
  id: number;
  price: string;
  option1?: string | null;
  option2?: string | null;
  option3?: string | null;
  available?: boolean;
};

export type ProductCartOptions = {
  handle: string;
  option1Label: string | null;
  option1Values: string[];
  option2Label: string | null;
  option2Values: string[];
  variants: Array<{
    id: number;
    option1: string | null;
    option2: string | null;
    price: number;
    available: boolean;
  }>;
  supportsLocalCart: boolean;
};

export function formatShopPrice(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

export function parseProductCartOptions(
  handle: string,
  variants: ShopifyRawVariant[],
  optionNames?: { option1?: string; option2?: string },
): ProductCartOptions {
  const parsed = variants.map((v) => ({
    id: v.id,
    option1: v.option1?.trim() || null,
    option2: v.option2?.trim() || null,
    price: Number(v.price),
    available: v.available !== false,
  }));

  const option1Values = [
    ...new Set(parsed.map((v) => v.option1).filter(Boolean) as string[]),
  ];
  const option2Values = [
    ...new Set(parsed.map((v) => v.option2).filter(Boolean) as string[]),
  ];

  const isDefaultOnly =
    option1Values.length === 1 && option1Values[0] === "Default Title";

  return {
    handle,
    option1Label: isDefaultOnly
      ? null
      : (optionNames?.option1 ?? (option1Values.length ? "Color" : null)),
    option1Values: isDefaultOnly ? [] : option1Values,
    option2Label:
      option2Values.length > 0 ? (optionNames?.option2 ?? "Size") : null,
    option2Values,
    variants: parsed,
    supportsLocalCart: parsed.some((v) => v.available),
  };
}

export function findVariant(
  cart: ProductCartOptions,
  option1: string | null,
  option2: string | null,
): ProductCartOptions["variants"][number] | undefined {
  if (cart.option1Values.length === 0 && cart.option2Values.length === 0) {
    return cart.variants.find((v) => v.available) ?? cart.variants[0];
  }

  return cart.variants.find(
    (v) =>
      v.available &&
      (option1 ? v.option1 === option1 : true) &&
      (option2 ? v.option2 === option2 : !v.option2 || !cart.option2Values.length),
  );
}

export function buildShopifyCartUrl(
  lines: { variantId: number; qty: number }[],
): string {
  if (lines.length === 0) return shopifyStoreConfig.storefrontUrl;
  const items = lines.map((l) => `${l.variantId}:${l.qty}`).join(",");
  return `${shopifyStoreConfig.storefrontUrl}/cart/${items}`;
}

export function productStorefrontUrl(handle: string): string {
  return `${shopifyStoreConfig.storefrontUrl}/products/${handle}`;
}

export async function fetchShopifyProductByHandle(handle: string): Promise<{
  id: number;
  title: string;
  handle: string;
  body_html?: string;
  product_type?: string;
  tags?: string[];
  options?: { name: string; values: string[] }[];
  images?: { src: string; alt?: string | null }[];
  variants?: ShopifyRawVariant[];
} | null> {
  try {
    const res = await fetch(
      `${shopifyStoreConfig.storefrontUrl}/products/${handle}.json`,
      { next: { revalidate: 600 } },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as {
      product?: {
        id: number;
        title: string;
        handle: string;
        body_html?: string;
        product_type?: string;
        tags?: string[];
        options?: { name: string; values: string[] }[];
        images?: { src: string; alt?: string | null }[];
        variants?: ShopifyRawVariant[];
      };
    };
    return data.product ?? null;
  } catch {
    return null;
  }
}
