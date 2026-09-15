import Image from "next/image";
import { campClaytonLifePhotos } from "@/data/summerDaycarePhotos";

export function CampClaytonLifePhotos() {
  return (
    <section className="mx-auto mt-14 max-w-[1200px] px-6">
      <div className="text-center">
        <p className="eyebrow tracking-[0.22em]">Real days at home</p>
        <h2 className="heading mt-1.5 text-[38px]">Life at Camp Clayton</h2>
        <p className="dek mx-auto mt-3 max-w-2xl">
          Supervised play, one-on-one time, enrichment, and real rest in our
          China Spring home, serving dog families across the Waco area.
        </p>
      </div>
      <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {campClaytonLifePhotos.map((photo) => (
          <figure
            key={photo.src}
            className="overflow-hidden rounded-[20px] border border-border bg-soft-cream"
          >
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 100vw, 560px"
                className="object-cover"
                style={
                  photo.objectPosition
                    ? { objectPosition: photo.objectPosition }
                    : undefined
                }
              />
            </div>
            <figcaption className="px-4 py-3 text-[12px] font-medium tracking-[0.14em] text-label-muted uppercase">
              {photo.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
