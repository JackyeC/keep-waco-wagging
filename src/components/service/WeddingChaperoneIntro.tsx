import { weddingDogChaperone } from "@/data/eventCare";

export function WeddingChaperoneIntro() {
  return (
    <section className="mx-auto mt-10 max-w-[1200px] px-6">
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow tracking-[0.22em]">Wedding dog chaperone</p>
        <h2 className="heading mt-1.5 text-[38px] text-balance">
          One person, fully focused on your dog
        </h2>
        <div className="body-light mt-5 space-y-4 text-left sm:text-center">
          {weddingDogChaperone.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
        <p className="body-light mt-6 text-left sm:text-center">
          {weddingDogChaperone.closing}
        </p>
      </div>
    </section>
  );
}
