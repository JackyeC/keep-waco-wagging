import type { MerchProduct } from "@/data/merchStore";
import { MerchProductCard } from "@/components/merch/MerchProductCard";

export function ShopProductGrid({
  products,
  columns = 3,
}: {
  products: MerchProduct[];
  columns?: 2 | 3 | 4;
}) {
  if (products.length === 0) return null;

  const gridClass =
    columns === 4
      ? "sm:grid-cols-2 lg:grid-cols-4"
      : columns === 2
        ? "sm:grid-cols-2"
        : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid gap-5 ${gridClass}`}>
      {products.map((product) => (
        <MerchProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
