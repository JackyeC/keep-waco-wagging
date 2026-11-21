import Link from "next/link";

const SIZE_LABEL = /^(XXS|XS|S|M|L|XL|2XL|3XL|4XL|5XL)$/;

export function apparelSizes(values: Array<string | null | undefined>): string[] {
  const seen = new Set<string>();
  const sizes: string[] = [];
  for (const value of values) {
    if (!value || !SIZE_LABEL.test(value) || seen.has(value)) continue;
    seen.add(value);
    sizes.push(value);
  }
  return sizes;
}

export function ShopPurchaseNotes({
  sizes = [],
  detailed = false,
}: {
  sizes?: string[];
  detailed?: boolean;
}) {
  return (
    <div className="text-[13px] leading-relaxed font-light text-body-muted">
      <p>
        Made to order. Most pieces are produced in about 3 to 5 business days,
        then shipped. Shipping and tax show at checkout.
      </p>
      {sizes.length > 0 && (
        <p className="mt-2">Sizes on this piece: {sizes.join(", ")}.</p>
      )}
      {detailed && (
        <p className="mt-2">
          The wrong size or color is not a standard return. If an order arrives
          damaged or incorrect, email hello@keepwacowagging.com within 14 days.
        </p>
      )}
      <p className="mt-2">
        <Link
          href="/shop/size-guide"
          className="underline decoration-border underline-offset-2 hover:text-rose-deep"
        >
          Size guide
        </Link>
        <span aria-hidden="true"> · </span>
        <Link
          href="/shop/shipping"
          className="underline decoration-border underline-offset-2 hover:text-rose-deep"
        >
          Shipping
        </Link>
        <span aria-hidden="true"> · </span>
        <Link
          href="/shop/returns"
          className="underline decoration-border underline-offset-2 hover:text-rose-deep"
        >
          Returns
        </Link>
      </p>
    </div>
  );
}
