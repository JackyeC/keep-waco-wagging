/**
 * First Wag Club newsletter — week of Sept. 20–26, 2026.
 *
 * Preview-only. Do not send until `getNewsletterSendBlockers()` is empty.
 * Signup forms and the leads table are untouched.
 */

export const NEWSLETTER_PLACEHOLDER = {
  mailingAddress: "[PHYSICAL MAILING ADDRESS — replace before send]",
  unsubscribeUrl: "#replace-unsubscribe-before-send",
  featuredArticleUrl: "[WAG WATCH URL — article not published yet]",
} as const;

export const wagClubSept20Issue = {
  id: "2026-09-20",
  previewPath: "/admin/newsletter/sept-20-26-2026",
  status: "draft_not_sent",
  subject: "Your dog's week in Waco: Sept. 20–26",
  previewText:
    "Where to go, when to leave them home, and the dog-park question Waco should really be asking.",
  weekLabel: "Sept. 20–26, 2026",
  fromName: "Keep Waco Wagging",
  fromEmail: "hello@keepwacowagging.com",
  /** Working inbox until keepwacowagging.com inbound MX is confirmed. */
  replyTo: "jackyeclayton@gmail.com",
  siteUrl: "https://keepwacowagging.com",
  campClaytonUrl: "https://keepwacowagging.com/camp-waco",
  mailingAddress: NEWSLETTER_PLACEHOLDER.mailingAddress,
  unsubscribeUrl: NEWSLETTER_PLACEHOLDER.unsubscribeUrl,
  brandLine: "Keep Waco Wagging, presented by Platinum Scoops",
  welcome: {
    eyebrow: "Wag Club",
    headline: "Your dog's week in Waco",
    dek: "Sept. 20–26, 2026",
    body: "This is the first Wag Club email from Keep Waco Wagging. The purpose is not to list everything happening in Waco. It is to tell dog parents what is actually worth knowing, where dogs can reasonably go, and when leaving them home is the better choice.",
  },
  weather: {
    title: "Heat first",
    line: "Fall is on the calendar. It is not necessarily on the pavement.",
    days: [
      { day: "Sunday", detail: "99°F" },
      { day: "Monday", detail: "94°F, possible storms" },
      { day: "Tuesday", detail: "92°F, possible storms" },
      { day: "Wednesday", detail: "95°F" },
      { day: "Thursday", detail: "92°F" },
      { day: "Friday", detail: "90°F" },
      { day: "Saturday", detail: "90°F" },
    ],
    advice:
      "Keep outings to the morning. Bring water, hunt shade, and do a paw check on pavement before you commit to a walk. During the hottest part of the day, leaving dogs home is the better choice.",
  },
  events: {
    title: "Where to go",
    items: [
      {
        id: "wednesday-market",
        when: "Wednesday, September 23 · 5–8 PM",
        title: "Wednesday Night Farmers Market",
        place: "Bridge Street Plaza",
        status: "verify_policy" as const,
        statusLabel: "Verify before you go",
        body: "This is an outdoor chance to get out after work. We have not independently confirmed this specific event's dog policy. Check before you bring a dog.",
        href: null,
      },
      {
        id: "brotherwell-trivia",
        when: "Thursday, September 24 · 7–10 PM",
        title: "Thursday Night Trivia at Brotherwell Brewing",
        place: "400 E Bridge Street, Waco",
        status: "confirmed_dog_friendly" as const,
        statusLabel: "Confirmed dog-friendly",
        body: "Leashed dogs are welcome, and Brotherwell has a large outdoor area. A better fit than a packed stadium afternoon if your dog likes people, noise, and a patio.",
        href: "https://www.brotherwell.com/taproom",
      },
      {
        id: "saturday-market",
        when: "Saturday, September 26 · 9 AM–1 PM",
        title: "Waco Downtown Farmers Market",
        place: "Bridge Street Plaza, 200 E Bridge Street",
        status: "heat_note" as const,
        statusLabel: "Go early",
        body: "If you go, arrive at the start. Ninety degrees on the plaza is a different animal than a 9 AM stroll. Do the market early, then get dogs off the pavement before the day builds.",
        href: "https://wacodowntownfarmersmarket.org/locations",
      },
    ],
  },
  leaveThemHome: {
    title: "Leave them home",
    when: "Saturday, September 26 · 1 PM",
    body: "Baylor plays Colorado at McLane Stadium at 1 PM. East Waco and Bridge Street will pick up traffic, crowds, noise, and hot pavement. If you do the farmers market, finish early and leave before game traffic builds. The stadium afternoon is not a dog outing.",
  },
  wagWatchChanged: {
    title: "Wag Watch: What Changed?",
    recall: {
      label: "FDA recall",
      kind: "enacted_recall" as const,
      headline: "Fi dog supplements recalled for possible Salmonella",
      body: "Fi recalled two dog supplements because of possible Salmonella contamination. They were sold directly to consumers and through Amazon and Chewy. Stop using the affected lots. Seal the container, dispose of it, wash your hands, and clean anything the supplement touched.",
      products: [
        {
          name: "Fi Calming Supplement for Dogs, 180 g",
          lot: "26118",
          upc: "8 50064 80011 1",
        },
        {
          name: "Fi 8-in-1 Formula Supplement for Dogs, 180 g",
          lot: "26159",
          upc: "8 50055 11168 4",
        },
      ],
      href: "https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts/fi-recalls-supplements-dogs-because-possible-salmonella-contamination",
      hrefLabel: "FDA recall notice",
    },
    stillWorthChecking: {
      body: "Still worth checking: the FDA's complete animal recall list, in case another product in your pantry shows up.",
      href: "https://www.fda.gov/animal-veterinary/safety-health/recalls-withdrawals",
      hrefLabel: "FDA animal recalls and withdrawals",
    },
  },
  governmentWatch: {
    title: "Waco government watch",
    label: "Public project / discussion",
    kind: "public_discussion" as const,
    headline: "Barron's Branch Park groundbreaking",
    when: "Thursday, September 24 · 10 AM",
    body: "Current public plans describe trails, public spaces, water features, creek restoration, and riverfront connections. They do not confirm a dog park. They do not establish a published dog policy. This is not a dog-friendly event listing.",
    question:
      "As Waco builds new public park space, where—and how—are dog owners included?",
    href: "https://www.wacodowntownredevelopment.com/About",
    hrefLabel: "Official project page",
    recordsNote:
      "We reviewed the currently posted Waco council, parks, planning, and Animal Welfare Board records. We did not find a newly proposed dog ordinance or confirmed dog-park project this week.",
  },
  featuredArticle: {
    title: "The question behind the park talk",
    headline: "Does Waco Need Another Dog Park—or Better Options for Dogs?",
    body: "Waco needs more safe exercise options for dogs. Uncontrolled group play is not the only answer. Reservable sniff spaces, secure fenced exercise areas, and supervised, behavior-screened small groups can fit more dogs — and more households — than one more free-for-all park.",
    href: NEWSLETTER_PLACEHOLDER.featuredArticleUrl,
    hrefIsPlaceholder: true,
  },
  campClayton: {
    title: "This week at Camp Clayton",
    headline: "Fall Sniffari Week · September 21–25",
    body: "Nose work, hidden-treat trails, snuffle mats, scent stations, puzzles, supervised small-group play, one-on-one attention, and real rest. The theme is extra. The day is still built around the dog in front of us.",
    cta: "Learn about Camp Clayton",
    href: "https://keepwacowagging.com/camp-waco",
  },
  readerQuestion: {
    title: "Quick question",
    body: "If Waco added a new option for dogs, what would you actually use: a traditional dog park, a reservable private sniff space, or supervised small-group play?",
    cta: "Reply to this email and tell us. We read them.",
  },
} as const;

export type WagClubSept20Issue = typeof wagClubSept20Issue;

export function getNewsletterSendBlockers(
  issue: WagClubSept20Issue = wagClubSept20Issue,
): string[] {
  const blockers: string[] = [];

  if (
    issue.mailingAddress.includes("PLACEHOLDER") ||
    issue.mailingAddress.includes("replace before send")
  ) {
    blockers.push("Physical mailing address is still a placeholder.");
  }

  if (
    !issue.unsubscribeUrl.startsWith("http") ||
    issue.unsubscribeUrl.includes("PLACEHOLDER") ||
    issue.unsubscribeUrl.includes("replace-unsubscribe")
  ) {
    blockers.push("Unsubscribe URL is still a placeholder and has not been tested.");
  }

  if (issue.featuredArticle.hrefIsPlaceholder) {
    blockers.push("Featured Wag Watch article URL is not live yet.");
  }

  const reply = issue.replyTo.toLowerCase();
  if (
    reply.endsWith("@keepwacowagging.com") ||
    reply === "hello@keepwacowagging.com" ||
    reply === "info@keepwacowagging.com"
  ) {
    blockers.push(
      "Reply-To still uses keepwacowagging.com. Inbound mail on that domain is not confirmed.",
    );
  }

  return blockers;
}

export function isNewsletterSendReady(
  issue: WagClubSept20Issue = wagClubSept20Issue,
): boolean {
  return getNewsletterSendBlockers(issue).length === 0;
}
