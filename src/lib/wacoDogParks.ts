/** Public status notes for Waco area off leash spots. Last checked November 2026. */

export const dogParkLastCheckedLabel = "Last checked November 2026.";

export const dogParkSources = {
  kwtxOctober2026: {
    label: "KWTX, October 6, 2026",
    href: "https://www.kwtx.com/2026/10/06/waco-residents-continue-push-off-leash-dog-park-two-years-after-closure-hot-dog-park/",
  },
  kwtxSeptember2024: {
    label: "KWTX, September 9, 2024",
    href: "https://www.kwtx.com/2024/09/09/waco-dog-park-permanently-closes-after-landowner-sells-property-board-says/",
  },
  kxxvAugust2025: {
    label: "KXXV, August 7, 2025",
    href: "https://www.kxxv.com/news/local-news/in-your-neighborhood/wacos-dog-park-dilemma-continues-nearly-a-year-after-closure",
  },
  woodwayParks: {
    label: "City of Woodway parks",
    href: "https://discoverwoodway.com/parks/",
  },
  cameronParkRules: {
    label: "City of Waco, Cameron Park trail rules",
    href: "https://www.waco-texas.com/Departments/Parks-Recreation/Cameron-Park/Cameron-Park-Trail-System-Rules",
  },
  northWacoPark: {
    label: "City of Waco, North Waco Park",
    href: "https://www.waco-texas.com/Departments/Parks-Recreation/Parks-Playgrounds-Splash-Pads-Trails/North-Waco-Park",
  },
} as const;

export type DogParkLink = {
  label: string;
  href: string;
};

export type DogParkNoteBlock = {
  text: string;
  links?: readonly DogParkLink[];
};

export const dogRunNoteTitle = "Where can my dog run in Waco right now?";

export const dogRunNoteBlocks: readonly DogParkNoteBlock[] = [
  {
    text: "The Heart of Texas Dog Park, also called the HOT Dog Park, closed for good in September 2024 after the land was sold. KWTX reported on October 6, 2026 that it was still closed. In that story, Waco Parks and Recreation said there was no funded city dog park, no timeline, and no location yet.",
    links: [dogParkSources.kwtxOctober2026, dogParkSources.kwtxSeptember2024],
  },
  {
    text: "Holly Dog Park is a small private park in Woodway. KXXV described it as still in use in August 2025, and KWTX mentioned it again in October 2026 as one of the smaller places people were using. We did not find an official hours page, so check before you go.",
    links: [dogParkSources.kxxvAugust2025, dogParkSources.kwtxOctober2026],
  },
  {
    text: "The City of Woodway parks page lists Woof Way Dog Park at Whitehall Park, 7600 Fresno Street. That page was updated March 17, 2026. Check before you go for current hours and rules.",
    links: [dogParkSources.woodwayParks],
  },
  {
    text: "We did not find a current public source that says a Bellmead off leash dog park is open or closed. Check before you go.",
  },
  {
    text: "Freight is a bar in Waco, not a city dog park. Our directory notes a fenced area on site. We did not find a parks agency page confirming that area, so check before you go.",
    links: [{ label: "Freight in our directory", href: "/dog-friendly-waco/freight-waco" }],
  },
  {
    text: "For a leashed walk, Cameron Park and North Waco Park are already in this directory. Cameron Park includes riverside trails along the Brazos and the Bosque.",
    links: [
      { label: "Cameron Park", href: "/dog-friendly-waco/cameron-park" },
      { label: "North Waco Park", href: "/dog-friendly-waco/north-waco-park" },
    ],
  },
];

export const wacoDogParkGuideSections = [
  {
    paragraphs: [
      "Waco has shaded trails and green space where leashed dogs are welcome. A true off leash run inside the city is hard to count on right now. Follow posted leash rules and bring water in Texas heat.",
    ],
  },
  {
    heading: "Trails and green space",
    paragraphs: [
      "Cameron Park and the Brazos River corridor offer shaded trails that Waco dog walkers use. North Waco Park on Edna Avenue is another city park with green space. Keep dogs leashed unless a sign says otherwise.",
      "For a structured outing, go early in the morning or near sunset when pavement and air temperature are safer for paws.",
    ],
  },
  {
    heading: "Where can my dog run off leash?",
    paragraphs: dogRunNoteBlocks.map((block) => block.text),
  },
  {
    heading: "Park etiquette in Waco",
    paragraphs: [
      "Scoop waste, respect leash laws, and give other dogs space even when yours is friendly. If your dog is still learning recall or tends to rush greetings, keep them on a leash until you are confident.",
      `${dogParkLastCheckedLabel} Park hours, closures, and rules can change. Verify with the city or the managing agency before you drive out.`,
    ],
  },
];

export const wacoDogParkGuideSources = [
  dogParkSources.kwtxOctober2026,
  dogParkSources.kwtxSeptember2024,
  dogParkSources.kxxvAugust2025,
  dogParkSources.woodwayParks,
  dogParkSources.cameronParkRules,
  dogParkSources.northWacoPark,
];
