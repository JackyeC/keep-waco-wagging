import { JsonLd } from "@/components/seo/JsonLd";
import { shopGraphics } from "@/data/shopGraphics";
import type { MerchProduct } from "@/data/merchStore";
import { parseShopPrice } from "@/lib/merchLines";
import { publicMerchDescription } from "@/lib/merchCopy";
import type { ProductCartOptions } from "@/lib/shopifyProductDetails";
import { cityConfig } from "@/lib/site";

const STORE_ID = `${cityConfig.url}/shop#store`;

function availability(cart: ProductCartOptions | undefined, product: MerchProduct) {
  const known = cart?.variants;
  if (known && known.length > 0) {
    return known.some((variant) => variant.available)
      ? "https://schema.org/InStock"
      : "https://schema.org/OutOfStock";
  }
  return product.supportsLocalCart === false
    ? "https://schema.org/OutOfStock"
    : "https://schema.org/InStock";
}

function offerNode(
  product: MerchProduct,
  cart: ProductCartOptions | undefined,
) {
  const variantPrices =
    cart?.variants
      .map((variant) => variant.price)
      .filter((price) => Number.isFinite(price)) ?? [];
  const fallback = parseShopPrice(product.price);
  const prices = variantPrices.length
    ? variantPrices
    : fallback !== null
      ? [fallback]
      : [];
  if (prices.length === 0) return null;

  const low = Math.min(...prices);
  const high = Math.max(...prices);
  const url = `${cityConfig.url}/shop/product/${product.slug}`;
  const seller = { "@id": `${cityConfig.url}/#organization` };
  const stock = availability(cart, product);

  if (low === high) {
    return {
      "@type": "Offer",
      url,
      priceCurrency: "USD",
      price: low.toFixed(2),
      availability: stock,
      seller,
    };
  }

  return {
    "@type": "AggregateOffer",
    url,
    priceCurrency: "USD",
    lowPrice: low.toFixed(2),
    highPrice: high.toFixed(2),
    offerCount: prices.length,
    availability: stock,
    seller,
  };
}

export function productJsonLd(
  product: MerchProduct,
  cart?: ProductCartOptions,
) {
  const offer = offerNode(product, cart);
  const description = publicMerchDescription(product.description) || product.name;
  return {
    "@type": "Product",
    name: product.name,
    description,
    image: product.image?.src ? [product.image.src] : undefined,
    sku: product.slug,
    brand: {
      "@type": "Brand",
      name: cityConfig.name,
    },
    offers: offer ?? undefined,
  };
}

export function ShopJsonLd({
  products,
  cartOptionsByHandle,
  pageUrl = `${cityConfig.url}/shop`,
  pageName = "Shop",
}: {
  products: MerchProduct[];
  cartOptionsByHandle: Record<string, ProductCartOptions>;
  pageUrl?: string;
  pageName?: string;
}) {
  const store = {
    "@context": "https://schema.org",
    "@type": "OnlineStore",
    "@id": STORE_ID,
    name: cityConfig.name,
    url: `${cityConfig.url}/shop`,
    image: `${cityConfig.url}${shopGraphics.og.src}`,
    telephone: "+1-254-726-6737",
    parentOrganization: { "@id": `${cityConfig.url}/#organization` },
    address: {
      "@type": "PostalAddress",
      addressLocality: cityConfig.homeCity,
      addressRegion: cityConfig.stateAbbr,
      postalCode: cityConfig.homeZip,
      addressCountry: "US",
    },
    areaServed: {
      "@type": "City",
      name: "Waco",
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: cityConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: pageName,
        item: pageUrl,
      },
    ],
  };

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: pageName,
    url: pageUrl,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${cityConfig.url}/shop/product/${product.slug}`,
      item: productJsonLd(product, cartOptionsByHandle[product.slug]),
    })),
  };

  return <JsonLd data={[store, breadcrumb, itemList]} />;
}

export function ProductJsonLd({
  product,
  cart,
}: {
  product: MerchProduct;
  cart?: ProductCartOptions;
}) {
  const url = `${cityConfig.url}/shop/product/${product.slug}`;
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: cityConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Shop",
        item: `${cityConfig.url}/shop`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: url,
      },
    ],
  };

  return (
    <JsonLd
      data={[
        {
          "@context": "https://schema.org",
          ...productJsonLd(product, cart),
          url,
        },
        breadcrumb,
      ]}
    />
  );
}
