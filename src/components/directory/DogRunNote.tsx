import Link from "next/link";
import {
  dogParkLastCheckedLabel,
  dogRunNoteBlocks,
  dogRunNoteTitle,
  type DogParkLink,
} from "@/lib/wacoDogParks";

function ParkLink({ link }: { link: DogParkLink }) {
  const className =
    "font-medium text-wag-sage underline-offset-2 hover:text-rose-deep hover:underline";
  if (link.href.startsWith("/")) {
    return (
      <Link href={link.href} className={className}>
        {link.label}
      </Link>
    );
  }
  return (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
      {link.label}
    </a>
  );
}

export function DogRunNote() {
  return (
    <section className="border-b border-line bg-sand">
      <div className="mx-auto max-w-[1200px] px-6 py-8">
        <div className="max-w-3xl">
          <h2 className="font-display text-[28px] leading-tight text-serif-ink">
            {dogRunNoteTitle}
          </h2>
          {dogRunNoteBlocks.map((block) => (
            <p key={block.text.slice(0, 48)} className="mt-4 text-[15.5px] leading-relaxed text-bark-soft">
              {block.text}
              {block.links && block.links.length > 0 && (
                <>
                  {" "}
                  {block.links.map((link, index) => (
                    <span key={link.href + link.label}>
                      {index > 0 ? " · " : null}
                      <ParkLink link={link} />
                    </span>
                  ))}
                </>
              )}
            </p>
          ))}
          <p className="mt-4 text-sm font-medium text-bark">{dogParkLastCheckedLabel}</p>
        </div>
      </div>
    </section>
  );
}
