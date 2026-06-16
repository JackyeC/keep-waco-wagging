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
    alt: "Dogs relaxing together in a shaded Waco backyard during home-based daycare",
  },
  summerCamp: {
    src: "/pictures/summer-camp-hero.webp",
    alt: "A dog cooling off in a splash pool during summer daycare camp in Waco",
  },
  summerCampCard: {
    src: "/pictures/summer-camp-card.webp",
    alt: "Summer splash pool play at home-based dog daycare in Waco",
  },
  summerMonths: {
    june: {
      src: "/pictures/summer-month-june.webp",
      alt: "Dogs playing with water during a June summer daycare week in Waco",
    },
    july: {
      src: "/pictures/summer-month-july.webp",
      alt: "Happy dogs socializing in a shaded Waco backyard during summer camp",
    },
    august: {
      src: "/pictures/summer-month-august.webp",
      alt: "Dogs on a group walk during an August summer daycare week in Waco",
    },
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
  yappyHours: {
    src: "/pictures/yappy-hours-party.webp",
    alt: "Dogs and guests at a Yappy Hour at Brotherwell Brewing in Waco",
  },
  yappyHoursCard: {
    src: "/pictures/yappy-hours-card.webp",
    alt: "A guest and her dog at an outdoor patio Yappy Hour in Waco",
  },
  /** Real Yappy Hour event photography — curated in source-photos/curated.json */
  yappyHoursGallery: [
    {
      src: "/pictures/yappy-hours/IMG_3544.webp",
      alt: "Dogs and guests at a Yappy Hour at Brotherwell Brewing in Waco",
    },
    {
      src: "/pictures/yappy-hours/IMG_3540.webp",
      alt: "Dogs and dog parents socializing at an indoor Yappy Hour in Waco",
    },
    {
      src: "/pictures/yappy-hours/IMG_3488.webp",
      alt: "A guest and her dog at an outdoor patio Yappy Hour in Waco",
    },
    {
      src: "/pictures/yappy-hours/IMG_3525.webp",
      alt: "Dog parents and a dog in the Austin Avenue District in downtown Waco",
    },
    {
      src: "/pictures/yappy-hours/IMG_3533.webp",
      alt: "Dog parents and dogs at a Yappy Hour on a painted alley mural in Waco",
    },
    {
      src: "/pictures/yappy-hours/IMG_3519.webp",
      alt: "Guests and dogs gathered at a Yappy Hour on a colorful ground mural in Waco",
    },
    {
      src: "/pictures/yappy-hours/FullSizeRender-hot-dog-crawl.webp",
      alt: "Guests and a dog at a Waco Hot Dog Crawl community event",
    },
    {
      src: "/pictures/yappy-hours/IMG_2466.webp",
      alt: "Dog parents and dogs at an outdoor patio Yappy Hour in Waco",
    },
  ],
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

/** Curated multi-photo spreads for editorial pages — all real site assets. */
export const editorialSpreads = {
  /** Community, events, and summer — Field Guide energy */
  wacoCommunity: [
    sitePhotos.yappyHoursGallery[0],
    sitePhotos.yappyHoursGallery[2],
    sitePhotos.summerCamp,
  ],
  /** Yappy Hour event spreads */
  yappyHours: sitePhotos.yappyHoursGallery,
  /** Home-based care and daily rhythm */
  homeLife: [
    sitePhotos.boardingDogs,
    sitePhotos.boardingHome,
    sitePhotos.training,
  ],
  /** Yard work and outdoor dog life */
  yardLife: [sitePhotos.scooping, sitePhotos.blog.yardHome, sitePhotos.blog.events],
  /** Summer camp weeks */
  summerWeeks: [
    sitePhotos.summerMonths.june,
    sitePhotos.summerMonths.july,
    sitePhotos.summerMonths.august,
  ],
} as const;

export type SitePhotoRef = { src: string; alt: string };

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
