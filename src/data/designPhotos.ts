/** Image-slot → /public path map from docs/design-handoff/README.md */
export const designPhotos = {
  /** Full-bleed apparel/brand home hero — on-body merch lifestyle */
  homeHero: {
    src: "/pictures/jackye-goldendoodle-tee.webp",
    alt: "Jackye at home with a goldendoodle, wearing a Keep Waco Wagging tee",
    objectPosition: "center 28%",
  },
  /** Shop full-bleed — outdoor editorial lifestyle */
  shopHero: {
    src: "/pictures/jackye-collie-tree.webp",
    alt: "Outdoor walk with a collie under Texas trees — Keep Waco Wagging lifestyle",
    objectPosition: "center 30%",
  },
  /** Atmosphere strip / secondary brand beat */
  brandAtmosphere: {
    src: "/pictures/community-walk.webp",
    alt: "Dogs and people on a community walk in Waco",
    objectPosition: "center 40%",
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
