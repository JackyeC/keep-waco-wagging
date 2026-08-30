export const methodologyCopy = {
  title: "How we match",
  intro:
    "Dog Match is a lifestyle matcher, not a personality quiz and not a promise about an individual dog.",
  bullets: [
    "Popularity is informational only. AKC rank never changes a match score or the order of results.",
    "Lifestyle compatibility — home, schedule, activity, noise, grooming, training patience, other pets — drives the scores.",
    "Not every 1–5 value is an official AKC rating. Direct, derived, and unknown traits are scored differently on purpose.",
    "Individual dogs vary. Health, history, learning, and the home they land in matter more than a type.",
    "Mixed breeds and designer mixes can vary even more. Unknown fields are not treated as easy or as a positive match.",
    "Dog Match cannot guarantee behavior, apartment success, or getting along with kids, cats, or other dogs.",
  ],
  traitOrigins: {
    title: "Direct, derived, and unknown traits",
    intro:
      "A 1–5 number in Dog Match is not lab precision and is not always an AKC characteristic rating. We separate how a value was sourced so unknown guesses cannot look like evidence.",
    direct:
      "DIRECT — a structured rating directly supported by a source, such as an AKC breed characteristic scale for energy, barking, shedding, grooming, trainability, or similar published ratings.",
    derived:
      "DERIVED — a conservative editorial reading of reliable breed descriptions and history. Fields like prey drive, cat compatibility, small-animal caution, alone-time tolerance, apartment compatibility, shared-wall risk, novice-owner suitability, and training patience needed usually sit here. They can inform friction and caution; they are not official AKC scores.",
    unknown:
      "UNKNOWN — not strong enough to score responsibly. Mixes are unknown at the type level. Unknown values never become a positive match factor. We would rather leave a cell blank than invent a tidy number.",
  },
  pitBull:
    "“Pit bull” is commonly used as an umbrella term for several breeds and mixes. We’ll show relevant breed profiles, but an individual dog’s temperament, history and behavior matter more than a label.",
  scoring:
    "Lifestyle Fit (0–100) asks how naturally a type’s typical needs line up with the life you described. Friction (0–100) asks how much management, cost, training, or compromise may still be required. They are not opposites. A dog can be a strong fit and still come with meaningful friction. “You May Love Them, But…” only includes dogs that are reasonably compatible first — high friction alone does not earn a slot.",
} as const;
