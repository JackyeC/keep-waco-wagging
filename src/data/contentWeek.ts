import { getWacoTodayISO } from "@/data/summerDaycare";

/**
 * Internal social posting plan — not public site copy.
 * Week of Oct 12, 2026 (Mon–Sun). Schedule in Metricool; nothing auto-posts.
 */
export type ContentWeekLine =
  | "community"
  | "merch"
  | "service"
  | "daycare";

export type ContentWeekPost = {
  id: string;
  day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
  date: string;
  format: string;
  line: ContentWeekLine;
  lineLabel: string;
  platform: string;
  hook: string;
  caption: string;
  hashtags: string;
  cta?: string;
  commentPrompt: string;
};

export type ContentWeekStory = {
  day: string;
  copy: string;
};

export const contentWeek = {
  slug: "week-of-oct-12-2026",
  title: "Keep Waco Wagging — Week of Oct 12, 2026",
  rangeLabel: "Mon Oct 12 – Sun Oct 18",
  startsOn: "2026-10-12",
  endsOn: "2026-10-18",
  season: "Howl-o-ween season",
  rhythm:
    "5 Reels/TikToks + 2 founder-voice feed posts + daily Stories. One clear CTA per post, a comment prompt on every post, and the revenue lines rotated so it never reads like a sales week.",
  postOrderNote: "Post Reels/TikToks to TikTok FIRST — biggest cold reach",
  campClaytonWeek: "Campfire Canines Week",
  posts: [
    {
      id: "mon-find-me",
      day: "Mon",
      date: "Oct 12",
      format: "Reel / TikTok",
      line: "community",
      lineLabel: "Community · Engagement",
      platform:
        'Post order: TikTok → Instagram Reels → Facebook → (clip the still for Pinterest). Format: the proven "Can you find me?" Where\'s-Waldo dog game — slow pan over a crowd of Waco pups with one hidden.',
      hook: "Can you find me? 🐾 One Waco pup is hiding in this crew — and I promise he thinks he's invisible.",
      caption: `Can you find me? 🐾

Somewhere in this pack of Waco's goodest dogs there's one little goober who's fully convinced he's hidden. (Spoiler: he is not. He's very much the main character.)

This is the game that started it all for us — because honestly, isn't that exactly how it feels walking around Waco? You spot another dog person across the park and go, "oh. you're one of us." The dogs find each other first. We just follow the leash.

Scroll slow. He's in there. 👀`,
      hashtags:
        "#KeepWacoWagging #WacoDogs #WacoTX #DogsOfWaco #Waco #WagClub #WacoCommunity",
      commentPrompt:
        "Drop a 🐶 the second you spot him — first three to find him get a shoutout on our Story!",
    },
    {
      id: "tue-wag-club-tee",
      day: "Tue",
      date: "Oct 13",
      format: "Founder feed post",
      line: "merch",
      lineLabel: "Merch · Wag Club",
      platform:
        "Post order: Instagram feed (photo/carousel in your voice) → Facebook. This is the first-person founder story tied to a product — the exact format that did 4,270 reach & 38 link clicks. Photo: you or Todd in the yellow Wag Club tee out in Waco.",
      hook: "I didn't set out to make a t-shirt. I set out to find my people.",
      caption: `I didn't set out to make a t-shirt. I set out to find my people. 🐾

When Todd and I started walking our dogs around Waco, I kept noticing this thing — you catch another dog person's eye, you both do the little nod, and there's this instant "oh, you're one of us." No introductions needed. The dogs already handled that part.

So I made the shirt I wished I could spot from across the dog park. The Wag Club tee. It's not really about the fabric — it's a little flag that says "yep, I'm one of the Waco dog people too." (The yellow one, for the record, is an absolute showstopper in person. Todd says I'm biased. Todd is also wrong.)

Every time someone tags us wearing theirs out on a brewery patio or a Cameron Park trail, I get a little misty. That's the whole dream — a town full of folks who found each other because of their dogs.

Want in? The Wag Club is open at keepwacowagging.com — link in bio. 💛`,
      hashtags:
        "#KeepWacoWagging #WacoDogs #WacoTX #WagClub #WacoProud #DogsOfWaco #ShopSmallWaco #GoodDogGoodTown",
      cta: "Join the Wag Club → keepwacowagging.com (link in bio).",
      commentPrompt:
        "What's YOUR dog's signature move that gives them away across the park? 🐕",
    },
    {
      id: "wed-scoops-halloween",
      day: "Wed",
      date: "Oct 14",
      format: "Reel / TikTok",
      line: "service",
      lineLabel: "Service · Platinum Scoops",
      platform:
        "Post order: TikTok → Instagram Reels → Facebook. Format: funny Howl-o-ween angle — quick yard walkthrough, Todd scooping, payoff shot of a clean yard. Keep it light and self-aware.",
      hook: "The scariest thing in your backyard this October isn't a ghost. 👻 It's what's hiding in the grass.",
      caption: `The scariest thing in your backyard this October isn't a ghost. 👻

It's the little landmines your very good dog has been... decorating the yard with. And look — we love them. We just don't love stepping in their artwork in the dark on the way to hang Halloween lights.

That's where we come in. Todd and I run Platinum Scoops right here in Waco — we show up, we scoop, your yard goes back to being a place you'd actually stand barefoot. No contracts to wrestle, no awkwardness, just a clean yard and a happy dog who has NO idea what we just saved everyone from.

Spooky season should be about costumes and candy. Not surprises in the grass. 🐾`,
      hashtags:
        "#KeepWacoWagging #WacoDogs #WacoTX #PlatinumScoops #WacoTexas #PooperScooper #DogsOfWaco #HowlOWeen",
      cta: 'Ready to hand off the dirty work? Message us "SCOOP" and we\'ll get you set up.',
      commentPrompt:
        "What's your dog's Halloween costume this year? Asking for... research. 🎃",
    },
    {
      id: "thu-day-camp",
      day: "Thu",
      date: "Oct 15",
      format: "Reel / TikTok",
      line: "daycare",
      lineLabel: "Daycare · Day Camp",
      platform:
        'Post order: TikTok → Instagram Reels → Facebook. Format: the irresistible "tired happy dog" montage — camp play clips cut to a dog passed out cold at home.',
      hook: "This is what a dog looks like when he's had the best day of his life. (He will now sleep for 14 hours.)",
      caption: `This is what a dog looks like when he's had the best day of his life — and also when he's about to sleep for 14 straight hours. 😴🐾

Welcome to Doggy Day Camp. We keep the groups small on purpose, because your dog isn't a number to us — they're a regular. We learn their name, their quirks, which toy is THE toy, and exactly how they like to say hi. (Some of these pups have better social lives than I do, honestly.)

If your dog's been giving you those "the house is boring and you left for eight hours" eyes — this is the fix. They come home happy, worn out, and weirdly proud of themselves.

New here? New campers get $40 off their first Rover booking. 🎉 Easiest "yes" you'll make all week.`,
      hashtags:
        "#KeepWacoWagging #WacoDogs #WacoTX #DoggyDayCamp #WacoDogMom #DogsOfWaco #CentralTexas #WagClub",
      cta: "New campers get $40 off their first Rover booking — DM us to grab a spot.",
      commentPrompt:
        'Comment your dog\'s name + one word for their daycare vibe. I\'ll start: "Scout — feral but polite." 🐶',
    },
    {
      id: "fri-one-of-us",
      day: "Fri",
      date: "Oct 16",
      format: "Founder feed post",
      line: "community",
      lineLabel: 'Community · "One of us"',
      platform:
        "Post order: Instagram feed → Facebook. The second founder-voice story of the week — pure community, no sale, and it sets up the weekend costume contest. Photo: you & Todd mid-walk, leashes in hand.",
      hook: "Nobody warns you that getting a dog means accidentally joining a whole community you didn't know you needed.",
      caption: `Nobody warns you that getting a dog means accidentally joining a whole community you didn't know you needed. 🐾

I think about this every Friday. A few years ago my weekend plans were... vague. Now? Todd's got the leashes by the door before I've finished my coffee, and half our "friends" are people we only know by their dog's name. (Shoutout to Biscuit's mom. You know who you are.)

That's the thing about Waco — big enough to always meet someone new, small enough that you keep running into them. And the dogs? The dogs are the icebreaker we never knew we had.

So here's my Friday wave across the park. 👋 If you're one of us — a Waco dog person — tell me who you've got at home. Names, breeds, the whole lineup. I want to know this community by heart.

And start thinking costumes... something fun is coming this weekend. 👀🎃`,
      hashtags:
        "#KeepWacoWagging #WacoDogs #WacoTX #WacoCommunity #DogsOfWaco #WacoProud #OneOfUs #WacoTexas",
      commentPrompt: "Who's in your crew? Introduce your dogs below. 🐕🐕🐕",
    },
    {
      id: "sat-good-dog-good-town",
      day: "Sat",
      date: "Oct 17",
      format: "Reel / TikTok",
      line: "merch",
      lineLabel: "Merch · Gateway tee",
      platform:
        'Post order: TikTok → Instagram Reels → Facebook. Format: quick "throw it on & go" try-on Reel featuring the pink GOOD DOG. GOOD TOWN. tee (your best gateway slogan). Film it on the way out for a Saturday walk.',
      hook: "If your dog could design a shirt, I'm pretty sure it'd just say this. 🐾",
      caption: `If your dog could design a shirt, I'm pretty sure it would just say this: GOOD DOG. GOOD TOWN. 🐾

Because that's the whole vibe, right? You've got a good dog. You live in a good town. Some mornings in Waco that's genuinely all you need to know to have a great day.

This one's our little gateway into the Wag Club — the pink is the one people grab first, usually for themselves and then again for a friend who "needs" it. (They do. Everyone needs it.) It's the shirt you throw on for the Saturday market walk and three people stop you to say they love it.

Fair warning: wear it out and you WILL get recruited into conversations with strangers about their dogs. That's not a bug. That's the entire point. 💛`,
      hashtags:
        "#KeepWacoWagging #WacoDogs #WacoTX #GoodDogGoodTown #WagClub #ShopSmallWaco #WacoProud #DogsOfWaco",
      cta: "Shop the Wag Club → keepwacowagging.com (link in bio). Grab yours before the weekend's over.",
      commentPrompt:
        '"GOOD DOG. GOOD TOWN." — what\'s the ONE word your dog would add to describe Waco? 🐕',
    },
    {
      id: "sun-costume-contest",
      day: "Sun",
      date: "Oct 18",
      format: "Reel / TikTok",
      line: "community",
      lineLabel: "Community · UGC kickoff",
      platform:
        'Post order: TikTok → Instagram Reels → Facebook. Format: soft, slow "Sunday reset" walk Reel that doubles as the costume contest launch — turns followers into creators (UGC) going into the week.',
      hook: "Sunday in Waco = one slow walk, zero agenda, and a dog who treats every sniff like urgent breaking news. 📰",
      caption: `Sunday in Waco = one slow walk, zero agenda, and a dog who treats every single sniff like urgent breaking news. 📰🐾

We don't rush the Sunday walk. It's the one Todd and I protect. No phones (okay, one phone, for this), no timeline — just letting the dogs lead and seeing where we end up. It's the reset that makes the whole week work.

And since spooky season's in full swing, here's the fun thing I teased: we want to see your dog's Halloween costume. 🎃 Post it, tag us @keepwacowagging, and we'll feature our favorites all week. Full glam, lazy bandana, "I refuse to wear this" energy — all of it welcome.

Here's to a slow Sunday and a wagging week ahead. 💛`,
      hashtags:
        "#KeepWacoWagging #WacoDogs #WacoTX #HowlOWeen #WacoCommunity #DogsOfWaco #SundayFunday #CameronPark",
      cta: "Tag @keepwacowagging in your dog's costume to be featured — free, fun, and it fills next week's feed with your community.",
      commentPrompt:
        "Where'd your dog drag you on today's walk? Cameron Park? The greenbelt? Straight back to the couch? 🐕",
    },
  ] satisfies ContentWeekPost[],
  stories: [
    {
      day: "Mon",
      copy: 'Poll sticker on the "Can you find me?" still — "Found the hidden pup?" → Yes 🐶 / Still looking 👀',
    },
    {
      day: "Tue",
      copy: "Behind-the-scenes shot of the yellow Wag Club tee + link sticker to keepwacowagging.com",
    },
    {
      day: "Wed",
      copy: '10-sec "the glamorous side of running a dog business" clip of Todd scooping + "Message us" sticker',
    },
    {
      day: "Thu",
      copy: 'Camper of the day re-share + "$40 off your first booking" link sticker',
    },
    {
      day: "Fri",
      copy: 'Question sticker — "Introduce your dog 🐾" (re-share the best answers Sat)',
    },
    {
      day: "Sat",
      copy: 'Repost anyone wearing a tee + "Shop the Wag Club" link sticker',
    },
    {
      day: "Sun",
      copy: "Costume contest countdown sticker — start re-sharing submissions as they roll in",
    },
  ] satisfies ContentWeekStory[],
  scorecardMetrics: [
    { name: "TikToks posted", tier: "lead" },
    { name: "TikTok views", tier: "lead" },
    { name: "TikTok followers", tier: "vanity" },
    { name: "Reels posted", tier: "lead" },
    { name: "Total reel views", tier: "lead" },
    { name: "Story-voice founder posts", tier: "lead" },
    { name: "Link clicks to site", tier: "lead" },
    { name: "Comments earned", tier: "lead" },
    { name: "FB net new followers", tier: "vanity" },
    { name: "Bookings / sales tied to social", tier: "scoreboard" },
    { name: "Top post (name it + why you think it won)", tier: "note" },
  ] as const,
} as const;

/** Public Howl-o-ween UGC ask — visible through Sunday of this week. */
export const howloweenCostumeCallout = {
  eyebrow: "Howl-o-ween",
  title: "Show us the costume",
  copy: "Post your dog's Halloween costume, tag @keepwacowagging, and we'll feature favorites. Full glam, a lazy bandana, or I-refuse-to-wear-this energy — all welcome.",
  ctaLabel: "Tag us on Instagram",
  href: "https://www.instagram.com/keepwacowagging/",
  /** Site teaser can go up before Monday's first post. */
  publicFrom: "2026-10-09",
} as const;

export function isContentWeekLive(now = new Date()): boolean {
  const today = getWacoTodayISO(now);
  return today >= contentWeek.startsOn && today <= contentWeek.endsOn;
}

export function isHowloweenCalloutLive(now = new Date()): boolean {
  const today = getWacoTodayISO(now);
  return (
    today >= howloweenCostumeCallout.publicFrom &&
    today <= contentWeek.endsOn
  );
}
