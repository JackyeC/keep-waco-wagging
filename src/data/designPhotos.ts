/** Image-slot → /public path map from docs/design-handoff/README.md */
export const designPhotos = {
  homeHero: {
    src: "/pictures/hero-group-walk.webp",
    alt: "Five dogs on a group walk down a sunny Waco neighborhood street",
  },
  svcScoop: {
    src: "/pictures/platinum-scoops-sprayer.webp",
    alt: "Platinum Scoops yard service in Waco",
  },
  svcBoard: {
    src: "/pictures/pool-property.webp",
    alt: "Backyard splash pool at a Waco home boarding property",
  },
  svcTrain: {
    src: "/pictures/border-collie-joy.webp",
    alt: "Happy border collie during lifestyle training in Waco",
  },
  svcWedding: {
    src: "/pictures/wedding-dog-chaperone.webp",
    alt: "Bride and groom with their two French Bulldogs in wedding attire — one in a white tulle dress, one in a navy vest and bow tie",
    /** Keep dogs fully in frame — they sit near the bottom of this photo */
    objectPosition: "center 72%",
  },
  svcCamp: {
    src: "/pictures/pool-pack.webp",
    alt: "Three dogs playing around a backyard splash pool during summer camp",
  },
  aboutHero: {
    src: "/pictures/library/founders-jackye-and-todd.webp",
    alt: "Jackye and Todd Clayton, founders of Keep Waco Wagging and Platinum Scoops",
  },
} as const;
