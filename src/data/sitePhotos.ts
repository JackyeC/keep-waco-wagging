/** Optimized local photography — files live in /public/pictures/ */
export const sitePhotos = {
  hero: {
    src: "/pictures/hero-group-walk.webp",
    alt: "Jackye walking a group of happy dogs on leashes in Waco",
  },
  scooping: {
    src: "/pictures/scooping-yard.webp",
    alt: "A happy brindle dog in a green Waco yard wearing a harness",
  },
  boarding: {
    src: "/pictures/boarding-backyard.webp",
    alt: "Dogs relaxing in a shaded backyard during home-based daycare",
  },
  boardingDogs: {
    src: "/pictures/boarding-home-dogs.webp",
    alt: "Two brindle dogs resting together on a wood floor at home",
  },
  boardingHome: {
    src: "/pictures/boarding-living-room.webp",
    alt: "A dog settled by the window in a calm home environment",
  },
  training: {
    src: "/pictures/training-enrichment.webp",
    alt: "A dog working on a puzzle enrichment toy indoors",
  },
  community: {
    src: "/pictures/community-walk.webp",
    alt: "Dogs relaxing together in a shaded Waco backyard",
  },
  founders: {
    src: "/pictures/founders-jackye-todd.webp",
    alt: "Jackye and Todd Clayton, founders of Platinum Scoops and Keep Waco Wagging",
  },
  og: {
    src: "/pictures/og-share.webp",
    alt: "Keep Waco Wagging — group dog walk in Waco, Texas",
  },
  blog: {
    dogFriendly: {
      src: "/pictures/blog-dog-friendly.webp",
      alt: "Dogs on a group walk through Waco",
    },
    training: {
      src: "/pictures/blog-training.webp",
      alt: "Dog working on a puzzle enrichment toy",
    },
    yardHome: {
      src: "/pictures/blog-yard-home.webp",
      alt: "Happy dog in a green Waco yard",
    },
    events: {
      src: "/pictures/blog-events.webp",
      alt: "Dogs playing in a shaded backyard",
    },
    local: {
      src: "/pictures/boarding-home-dogs.webp",
      alt: "Two dogs resting together at home",
    },
  },
} as const;

const blogCategoryImages: Record<string, { src: string; alt: string }> = {
  "Dog-Friendly Waco": sitePhotos.blog.dogFriendly,
  "Training for Real Life": sitePhotos.blog.training,
  "Yard + Home": sitePhotos.blog.yardHome,
  Events: sitePhotos.blog.events,
  "Local Pet Parents": sitePhotos.blog.local,
  "Waco Business Spotlights": sitePhotos.community,
  "Platinum Scoops Tips": sitePhotos.blog.yardHome,
};

export function getBlogCategoryImage(category: string) {
  return blogCategoryImages[category] ?? sitePhotos.community;
}
