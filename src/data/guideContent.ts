export type GuideSection = {
  heading?: string;
  paragraphs: string[];
};

/** Full guide body copy for indexable blog posts. */
export const guideContent: Record<string, GuideSection[]> = {
  "best-dog-friendly-patios-in-waco": [
    {
      paragraphs: [
        "A dog-friendly patio in Waco is more than a sign on the door. You want shade, a clear leash policy, and a spot where your dog can settle without blocking the walkway. Policies change — always verify directly before you go.",
      ],
    },
    {
      heading: "Where to start downtown",
      paragraphs: [
        "Milo on Franklin Avenue posts a patio dog policy online — leashed, well-behaved dogs on the outdoor patio. Southern Roots Brewing Co. on North 8th Street is another downtown option with an outdoor patio; confirm the current policy when you visit.",
        "Hecho en Waco and Terry Black's BBQ are high-traffic downtown spots that may allow dogs on outdoor patios only. Treat these as “verify before visiting” until you confirm with staff.",
      ],
    },
    {
      heading: "Coffee and neighborhood patios",
      paragraphs: [
        "Street Dog Cafe on Elm Avenue is a mission-driven coffee spot with a dog-friendly patio and a heart for local rescue work. Morning or early afternoon is usually the easiest time to find shade and a calm corner.",
        "Browse our full dog-friendly directory for more patios, breweries, and coffee shops across Waco — each listing notes what we could verify and when it was last checked.",
      ],
    },
    {
      heading: "Before you go",
      paragraphs: [
        "Bring water, waste bags, and a settle mat if your dog is still learning patio manners. If your dog is not ready yet, our patio-readiness guide walks through the self-check we use with training clients.",
        "Hours, menus, and dog policies can change without notice. Please verify directly with each business before visiting.",
      ],
    },
  ],
  "how-to-know-if-your-dog-is-ready-for-a-patio": [
    {
      paragraphs: [
        "Patio outings are a lot of stimulation — people, food smells, other dogs, and busy servers. A dog who looks fine at home may still be over threshold on a patio. Here is a quick self-check before you book brunch.",
      ],
    },
    {
      heading: "Can your dog settle?",
      paragraphs: [
        "On a mat or at your feet, can your dog relax for several minutes while you sit still? If they cannot settle at home with mild distractions, start there before adding a restaurant patio.",
      ],
    },
    {
      heading: "Can they recover from distractions?",
      paragraphs: [
        "When something exciting passes — a skateboard, another dog, a dropped plate — can your dog look back at you and breathe again within a few seconds? If recovery takes minutes or leads to barking and lunging, you are not ready for a busy patio yet.",
      ],
    },
    {
      heading: "Are they comfortable on leash at your side?",
      paragraphs: [
        "Patio seating is tight. Your dog needs to stay beside your chair without pulling into the aisle or greeting every table. Practice loose-leash walking and a calm down-stay in quieter outdoor spots first.",
      ],
    },
    {
      heading: "What to do if not yet",
      paragraphs: [
        "Start with short visits to calmer outdoor spots — a shaded bench, a quiet brewery corner on a weekday, or a training field trip with a professional. Keep Waco Wagging offers lifestyle training in real Waco settings if you want coached practice before your first patio.",
        "There is no shame in waiting. A calm dog on patio number five beats a stressful first outing that sets you both back.",
      ],
    },
  ],
  "best-waco-parks-for-dogs": [
    {
      paragraphs: [
        "Waco has everything from shaded river trails to fenced bark parks. The best park for your dog depends on age, reactivity, and how much off-leash time you need. Always follow posted leash rules and bring water in Texas heat.",
      ],
    },
    {
      heading: "Trails and green space",
      paragraphs: [
        "Cameron Park and the Brazos River corridor offer shaded trails popular with Waco dog walkers. North Waco Park on Edna Avenue is another city park option with green space — check current park rules before letting dogs off leash anywhere except designated areas.",
        "For a structured outing, go early in the morning or near sunset when pavement and air temperature are safer for paws.",
      ],
    },
    {
      heading: "Fenced dog parks",
      paragraphs: [
        "If your dog needs a true off-leash run, look for fenced dog parks in Waco and surrounding communities such as Bellmead. Watch the gate when entering and leaving — that is when many scuffles start.",
        "Puppies, seniors, and reactive dogs may do better on-leash trails than inside a busy fenced park. Match the environment to your dog, not the other way around.",
      ],
    },
    {
      heading: "Park etiquette in Waco",
      paragraphs: [
        "Scoop waste, respect leash laws, and give other dogs space even when yours is friendly. If your dog is still learning recall or tends to rush greetings, keep them on leash until you are confident.",
        "Park hours, closures, and rules can change. Verify with the City of Waco or the managing agency before you drive out.",
      ],
    },
  ],
};

export function getGuideContent(slug: string): GuideSection[] | undefined {
  return guideContent[slug];
}
