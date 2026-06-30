export function ServiceFaqSection({
  eyebrow = "Common questions",
  title = "FAQ",
  items,
}: {
  eyebrow?: string;
  title?: string;
  items: { question: string; answer: string }[];
}) {
  if (items.length === 0) return null;

  return (
    <section className="mx-auto mt-14 max-w-[1200px] px-6">
      <div className="text-center">
        <p className="eyebrow tracking-[0.22em]">{eyebrow}</p>
        <h2 className="heading mt-1.5 text-[36px]">{title}</h2>
      </div>
      <div className="mt-7 space-y-3">
        {items.map((item) => (
          <details
            key={item.question}
            className="group rounded-[18px] border border-border bg-soft-cream px-6 py-4"
          >
            <summary className="cursor-pointer list-none font-display text-lg font-semibold text-serif-ink marker:content-none [&::-webkit-details-marker]:hidden">
              {item.question}
            </summary>
            <p className="body-light mt-3 text-[15px] leading-relaxed">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
