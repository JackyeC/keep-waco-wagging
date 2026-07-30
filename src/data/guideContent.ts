export type GuideSection = {
  heading?: string;
  paragraphs: string[];
};

export type GuideSource = {
  label: string;
  href: string;
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
  "the-waco-puppy-socialization-checklist": [
    {
      paragraphs: [
        "“Socialization” sounds formal, but it really means helping your puppy learn that everyday life is safe. Think sights, sounds, surfaces, people, and animals — introduced gently enough that curiosity wins over worry.",
        "Ask your veterinarian which public activities are appropriate for your puppy's age, health, and vaccination status. You can begin many low-risk experiences at home, from the car, or while carrying your puppy.",
      ],
    },
    {
      heading: "People and handling",
      paragraphs: [
        "Pair gentle handling of paws, ears, mouth, collar, and tail with treats. Practice short sessions on a non-slip surface and stop if your puppy becomes worried or tries repeatedly to leave.",
        "Let your puppy observe people of different ages, appearances, and movement styles without requiring contact. One calm interaction your puppy chooses is more valuable than being passed around a crowd.",
      ],
    },
    {
      heading: "Waco sights and sounds",
      paragraphs: [
        "Introduce traffic, bicycles, strollers, delivery carts, lawn equipment, doorbells, and household appliances at a distance where your puppy can stay relaxed. Use recordings at low volume when the real sound would be too intense.",
        "A parked car with the air conditioning running can be a safe observation point, but never leave a puppy unattended in a vehicle. Keep Texas heat and hot pavement out of the lesson entirely.",
      ],
    },
    {
      heading: "Surfaces and places",
      paragraphs: [
        "Practice walking across grass, concrete, gravel, tile, rugs, metal thresholds, and gently moving surfaces. Add stairs and elevators only when appropriate for your puppy's size and physical development.",
        "Make early veterinary and grooming visits brief and positive when possible. A few treats in the lobby or on the scale can build familiarity without waiting for a stressful appointment.",
      ],
    },
    {
      heading: "Dogs and other animals",
      paragraphs: [
        "Choose healthy, vaccinated adult dogs with calm behavior rather than relying on random greetings or a busy dog park. Match playmates by size and style, supervise closely, and include frequent breaks.",
        "Watching another dog from a comfortable distance counts as socialization. Your puppy does not need to greet every animal they see.",
      ],
    },
    {
      heading: "A simple weekly rhythm",
      paragraphs: [
        "Aim for several short experiences across the week: one new sound, one new surface, one calm person, one handling session, and one outing approved by your veterinarian. Repeat experiences your puppy finds difficult at an easier level.",
        "End while your puppy is curious and able to eat. If they hide, freeze, flee, bark repeatedly, or refuse food, increase distance and get guidance from a qualified, reward-based trainer.",
      ],
    },
  ],
  "what-to-bring-when-you-take-your-dog-out-in-waco": [
    {
      paragraphs: [
        "A good Waco outing starts before you leave the driveway. Think of this as the dog-parent go bag: water, cleanup supplies, a secure leash, good treats, and an easy way home if your pup has had enough.",
      ],
    },
    {
      heading: "Water and a portable bowl",
      paragraphs: [
        "Bring more water than you expect to use, especially from late spring through early fall. A lightweight collapsible bowl is easier and more sanitary than letting your dog drink from a shared container.",
        "Offer small water breaks throughout the outing. Heavy panting, slowing down, seeking shade, or refusing to continue are signs to stop, cool down, and head home. Contact a veterinarian promptly if you are concerned about heat illness.",
      ],
    },
    {
      heading: "Waste bags and a backup roll",
      paragraphs: [
        "Carry enough bags for the whole trip and keep a spare roll in the car or attached to the leash. Picking up promptly protects shared spaces and helps Waco businesses and parks remain welcoming to dogs.",
      ],
    },
    {
      heading: "A secure leash and identification",
      paragraphs: [
        "Use a sturdy fixed-length leash in crowded areas rather than a retractable leash. Check that the collar or harness fits securely, and make sure your dog's identification tag and microchip contact details are current.",
        "A recent photo of your dog on your phone is also useful in the unlikely event that you become separated.",
      ],
    },
    {
      heading: "Training treats and a settle mat",
      paragraphs: [
        "Bring small, high-value treats to reward check-ins, loose-leash walking, and calm behavior. For patios or longer stops, a washable mat gives your dog a clear place to lie down and helps keep them out of walkways.",
      ],
    },
    {
      heading: "A simple exit plan",
      paragraphs: [
        "Before you arrive, decide how long you will stay and where you can move if the environment becomes crowded. Park where you can leave easily, choose shade when possible, and be willing to end the outing while your dog is still doing well.",
        "Check the destination's current dog policy, hours, and weather conditions before leaving home. A shorter successful outing is better practice than staying until your dog is overwhelmed.",
      ],
    },
  ],
  "patio-manners-what-your-dog-needs-before-brunch": [
    {
      paragraphs: [
        "Brunch asks a lot from a dog: ignore the bacon, skip the meet-and-greet, and relax while people keep walking past. The good news? Patio manners are everyday skills you can practice long before a server brings the menu.",
      ],
    },
    {
      heading: "Skill one: settle on a mat",
      paragraphs: [
        "Place a mat on the floor at home and reward your dog for stepping onto it, then for sitting or lying down. Deliver treats low and between the paws so the reward supports a relaxed position.",
        "Build duration a few seconds at a time while you sit nearby. Next, practice in the yard, on a quiet porch, and near a calm public bench before asking for the behavior at a restaurant.",
      ],
    },
    {
      heading: "Skill two: leave it",
      paragraphs: [
        "Start with low-value food covered by your hand. The moment your dog backs away or looks at you, mark the choice and reward from your other hand. Progress gradually to uncovered food and safe items on the ground.",
        "At a patio, leave-it applies to dropped food, passing dogs, and neighboring tables. Management still matters: keep the leash short enough that your dog cannot reach the tempting item.",
      ],
    },
    {
      heading: "Skill three: a calm down-stay",
      paragraphs: [
        "Ask for a down in an easy setting, reward, and release after one or two seconds. Add time before distance, then add mild distractions. Return frequently to reward so staying does not feel like being forgotten.",
        "Your dog does not need to remain perfectly still for an entire meal. Quiet position changes, water breaks, and a short sniff break can help them succeed.",
      ],
    },
    {
      heading: "Practice the whole routine",
      paragraphs: [
        "Rehearse at home: leash your dog, place the mat beside a chair, sit with a snack, and occasionally reward calm behavior. Then try a short visit during a restaurant's quietest patio hours.",
        "Choose a table away from entrances and main walkways. Bring water, waste bags, and high-value treats, and do not tether the leash to furniture that could move if your dog lunges.",
      ],
    },
    {
      heading: "Leave before manners fall apart",
      paragraphs: [
        "Continuous scanning, whining, barking, pulling, or an inability to take treats means the environment is too difficult. Create distance or end the visit instead of correcting your dog through escalating stress.",
        "Patio access is not the right goal for every dog. A relaxed walk followed by takeout can be the better outing, and it does not represent a training failure.",
      ],
    },
  ],
  "how-to-help-your-dog-stay-calm-around-crowds": [
    {
      paragraphs: [
        "Crowds ask a lot from even a social dog — movement, noise, food, children, and unfamiliar dogs all at once. The kindest plan starts at the edge, where your dog can notice the action without being swallowed by it.",
      ],
    },
    {
      heading: "Start below your dog's threshold",
      paragraphs: [
        "Your dog is under threshold when they can notice activity and still eat treats, respond to their name, and move with you. If they freeze, pull hard, bark, lunge, hide, or cannot take food, create more distance immediately.",
        "Begin near the edge of a quiet public space or during an off-peak time. Let your dog observe for a few minutes, reward calm check-ins, and leave before their focus falls apart.",
      ],
    },
    {
      heading: "Use distance as your first tool",
      paragraphs: [
        "Cross the street, step behind a parked car, or move to the outside of a gathering when your dog needs room. Distance is not a failure; it is how you keep the dog able to learn.",
        "Avoid tight entrances, narrow vendor aisles, and face-to-face leash greetings. Give working service dogs and dogs wearing space-request gear a wide berth.",
      ],
    },
    {
      heading: "Teach an easy exit cue",
      paragraphs: [
        "Practice a cheerful cue such as “this way” at home, then turn and walk with your dog for several rewarded steps. Use it before your dog becomes overwhelmed so leaving feels familiar rather than like a struggle.",
        "A hand target or simple name response can also help reconnect your dog with you when something surprising happens.",
      ],
    },
    {
      heading: "Keep sessions short",
      paragraphs: [
        "Five calm minutes near a crowd can be more useful than an hour inside one. Watch for repeated lip licking, yawning, scanning, tucked posture, frantic sniffing, or an inability to settle — these can indicate that your dog needs a break.",
        "Move to a quiet area, offer water, and end the session if your dog does not recover quickly. Do not force interactions with strangers or other dogs.",
      ],
    },
    {
      heading: "Know when to get help",
      paragraphs: [
        "If your dog regularly panics, tries to escape, or reacts aggressively around people or dogs, skip crowded outings for now. A qualified, reward-based trainer or veterinary behavior professional can help you build a safer plan.",
      ],
    },
  ],
  "dog-friendly-weekend-in-waco": [
    {
      paragraphs: [
        "The best dog-friendly Waco weekend is not a race to fit in every stop. Pick a little adventure, leave room for a real nap, and build the day around the dog you actually brought — not the imaginary pup who loves every crowd.",
        "This sample itinerary uses outdoor stops from our directory, but weather, hours, and dog policies can change. Confirm each destination before you go.",
      ],
    },
    {
      heading: "Saturday morning: a shaded walk",
      paragraphs: [
        "Start early at North Waco Park or another leashed walking route that matches your dog's fitness. Bring water, avoid hot pavement, and choose a short loop so you can finish before temperatures and foot traffic climb.",
        "If your dog is sensitive to bicycles, runners, or other dogs, keep extra distance and reward calm check-ins rather than pushing through a busy section.",
      ],
    },
    {
      heading: "Saturday lunch: a calm patio",
      paragraphs: [
        "After a rest at your lodging or home, consider a verified outdoor patio during an off-peak hour. Milo publishes a policy for leashed, well-behaved dogs on its patio; other directory listings should be confirmed directly before visiting.",
        "Choose a table away from the entrance, keep your dog beside you, and bring a bowl and settle mat. Take food to go if your dog cannot relax.",
      ],
    },
    {
      heading: "Saturday afternoon: decompress",
      paragraphs: [
        "Skip the temptation to fill every hour. Give your dog a quiet nap, a food puzzle, or a sniff walk near your lodging. Rest helps dogs recover from the sounds, smells, and social pressure of travel.",
      ],
    },
    {
      heading: "Sunday morning: an outdoor Waco landmark",
      paragraphs: [
        "Waco Mammoth National Monument welcomes leashed pets in outdoor areas, while buildings and the dig shelter remain off limits. Confirm current National Park Service guidance, bring another person if anyone wants to visit indoor areas, and never leave a dog in the car.",
        "Magnolia Market at the Silos also permits leashed dogs in some outdoor areas with specific restrictions. It can become crowded, so a quiet neighborhood walk may be a better choice for dogs who dislike close quarters.",
      ],
    },
    {
      heading: "Build the weekend around your dog",
      paragraphs: [
        "Not every dog enjoys patios, attractions, or travel. A successful weekend may be one early walk, plenty of rest, and takeout with your dog safely settled nearby.",
        "Review our directory before the trip for current verification notes, and have an indoor or dog-free backup plan for heat, storms, or crowded conditions.",
      ],
    },
  ],
  "what-local-businesses-should-know-before-becoming-dog-friendly": [
    {
      paragraphs: [
        "Thinking about putting out a “dogs welcome” sign? Waco dog parents will notice — but the sign is the easy part. A clear policy, enough breathing room, and a prepared team are what make dogs and people want to come back.",
      ],
    },
    {
      heading: "Confirm what is legally and operationally possible",
      paragraphs: [
        "Before advertising a dog-friendly policy, confirm current health-code, lease, insurance, and property-management requirements for your specific business. Rules may differ between outdoor patios, retail floors, food-service areas, and ticketed events.",
        "Define whether the policy covers pets, trained service animals, or both. Service-animal access is governed by law and should not be handled as an optional pet perk.",
      ],
    },
    {
      heading: "Write a policy customers can understand",
      paragraphs: [
        "State where dogs are allowed, whether leashes are required, and what behavior will prompt staff to ask a handler to leave. Publish the policy on your website and display it before guests enter the dog-friendly area.",
        "Use direct, neutral language: dogs must remain under handler control, stay off furniture, avoid walkways, and leave if they bark persistently or behave aggressively.",
      ],
    },
    {
      heading: "Design the space for safe movement",
      paragraphs: [
        "Leave enough room between tables for dogs to settle without touching strangers or other dogs. Keep leashes away from server paths, entrances, and emergency exits, and avoid placing water stations where they create congestion.",
        "Shade and clean drinking water are especially important in Waco weather. Use individual washable bowls or invite owners to bring their own rather than maintaining one shared bowl.",
      ],
    },
    {
      heading: "Prepare staff before launch",
      paragraphs: [
        "Give employees one consistent policy and a simple escalation plan. Staff should know who can address a problem, how to request more space, and how to document an incident.",
        "Do not ask employees to handle unfamiliar dogs. If a dog is distressed or disruptive, speak to the handler and focus on the observable behavior rather than guessing about breed or intent.",
      ],
    },
    {
      heading: "Set up cleanup and feedback",
      paragraphs: [
        "Keep waste bags and a covered outdoor bin accessible, and establish a cleaning procedure for accidents. Inspect the dog-friendly area regularly for spills, dropped food, broken glass, and other hazards.",
        "Launch the policy as a trial, collect feedback from staff and customers, and adjust hours, seating, or capacity based on what actually works. Keep online listings updated whenever the policy changes.",
      ],
    },
  ],
  "why-cleaning-up-dog-waste-matters-for-your-yard": [
    {
      paragraphs: [
        "Nobody puts dog-waste pickup at the top of the fun list. Still, a quick, steady routine keeps the yard easier to enjoy, easier to mow, and far less likely to follow the family back inside on a shoe or paw.",
      ],
    },
    {
      heading: "Waste is not lawn fertilizer",
      paragraphs: [
        "Dog waste is different from composted herbivore manure and should not be treated as fertilizer. Leaving piles on grass can smother small areas, create uneven nutrient loads, and make mowing or yard work unpleasant.",
        "Do not add dog waste to a household compost pile intended for vegetables or other edible plants unless your local guidance and composting system specifically support safe handling.",
      ],
    },
    {
      heading: "Regular pickup reduces exposure",
      paragraphs: [
        "Dog feces can carry parasites and disease-causing organisms. Picking it up promptly reduces opportunities for pets and people to step in it, investigate it, or track contaminated material into the home.",
        "Wash hands after cleanup and keep children away from soiled areas. If you see worms, blood, persistent diarrhea, or another concerning change in your dog's stool, contact your veterinarian.",
      ],
    },
    {
      heading: "Rain does not solve the problem",
      paragraphs: [
        "Stormwater can move residue from pet waste toward streets, drains, and waterways. Scoop before rain when possible rather than waiting for waste to break down into the soil.",
      ],
    },
    {
      heading: "A practical cleanup routine",
      paragraphs: [
        "Walk the yard on a predictable schedule, use a dedicated scoop or bag, and check play zones, fence lines, and shaded corners. More dogs and smaller yards generally require more frequent service.",
        "Bag waste securely and follow local disposal guidance. Clean tools after use and store them away from children, food-growing areas, and pet bowls.",
      ],
    },
    {
      heading: "When to use a pickup service",
      paragraphs: [
        "Recurring service can help households with multiple dogs, mobility limitations, demanding schedules, or a yard that repeatedly falls behind. Whether you do it yourself or hire help, consistency matters more than waiting for a major cleanup.",
      ],
    },
  ],
  "how-to-keep-your-yard-guest-ready-when-you-have-dogs": [
    {
      paragraphs: [
        "A dog lives here — the yard is allowed to look like it. “Guest-ready” just means the waste is gone, the gate latches, the water is fresh, and nobody is panic-cleaning an hour before company arrives.",
      ],
    },
    {
      heading: "Use a short weekly reset",
      paragraphs: [
        "Pick up dog waste, empty outdoor water bowls, gather damaged toys, and check the fence line on a consistent day each week. A ten-minute reset is easier to maintain than an occasional full-yard rescue.",
        "After storms, look for standing water, mud at gates, fallen branches, mushrooms, and anything washed into the yard before letting dogs or guests outside.",
      ],
    },
    {
      heading: "Create cleaner traffic paths",
      paragraphs: [
        "Place an outdoor mat near the most-used door and keep a washable towel inside for paws. Gravel, mulch approved for pet areas, or stepping stones can reduce worn mud paths where dogs repeatedly run.",
        "Move food and water bowls away from gathering areas to prevent spills and crowding. Refresh water shortly before guests arrive.",
      ],
    },
    {
      heading: "Manage odor at the source",
      paragraphs: [
        "Prompt waste pickup and good drainage do more than fragrance products. Rinse hard surfaces when appropriate, wash pet bedding, and clean any artificial turf according to the manufacturer's instructions.",
        "Avoid applying lawn chemicals, deodorizers, or pest products around pets unless the label permits that use and you can follow all re-entry directions.",
      ],
    },
    {
      heading: "Plan for dog and guest comfort",
      paragraphs: [
        "Decide before the gathering whether your dog will mingle, stay on leash, use a gated section, or relax indoors. Give dogs a quiet retreat with water and do not require them to interact with visitors.",
        "Check that gates latch, guests know not to leave doors open, and children understand the dog's boundaries. Put away chews, food, or toys that could cause conflict.",
      ],
    },
    {
      heading: "The day-of checklist",
      paragraphs: [
        "Do one final waste scan, remove hazards, refresh water, secure tools and chemicals, and test each gate. If you use recurring pet-waste service, schedule it with enough time to inspect the yard before guests arrive.",
        "Keep cleanup bags visible during the event and plan a quick reset afterward. A simple system keeps the yard ready for the next ordinary day, not only special occasions.",
      ],
    },
  ],
  "waco-dog-etiquette-guide": [
    {
      paragraphs: [
        "Good dog etiquette is not about having a perfect dog. It is about giving neighbors, staff, and other dogs room to choose. A little leash awareness and a spare waste bag go a long way toward keeping Waco welcoming.",
      ],
    },
    {
      heading: "Keep leashes short in shared spaces",
      paragraphs: [
        "Use a fixed-length leash and keep your dog close when passing people, bicycles, strollers, or other dogs. Retractable lines stretched across a trail or patio walkway create a trip and entanglement hazard.",
        "Follow posted leash rules even if your dog has reliable recall. Off-leash dogs can frighten leashed dogs, wildlife, children, and people who simply do not want an interaction.",
      ],
    },
    {
      heading: "Ask before every greeting",
      paragraphs: [
        "Do not assume another dog wants to say hello. Ask the handler first, and accept “no” without taking it personally. Avoid on-leash greetings in narrow entrances, near food, or when either dog looks tense or overexcited.",
        "The same rule applies to people: do not let your dog jump on, sniff, or approach a stranger without an invitation.",
      ],
    },
    {
      heading: "Pick up and pack it out",
      paragraphs: [
        "Carry waste bags on every walk and dispose of them in an appropriate trash bin. Do not leave filled bags beside a trail, on a curb, or in someone else's empty bin.",
        "At home, regular yard cleanup reduces odor and keeps waste from being tracked into play areas or washed into drainage paths.",
      ],
    },
    {
      heading: "Protect patio access",
      paragraphs: [
        "Keep your dog beside or under your table, never in a server's path. Bring your own water bowl, prevent begging at other tables, and leave if barking or restlessness continues.",
        "A business that allows dogs is offering access, not guaranteeing that every dog will be comfortable there. Verify the current policy and respect any staff request to move or leave.",
      ],
    },
    {
      heading: "Be a thoughtful neighbor",
      paragraphs: [
        "Prevent fence-line charging, repeated nuisance barking, and dogs roaming beyond your property. Give space to delivery workers and secure your dog before opening an exterior door or gate.",
        "If an accident or tense interaction happens, move the dogs apart calmly and exchange contact information when appropriate. Courtesy after a difficult moment matters as much as prevention.",
      ],
    },
  ],
};

/** Primary references used for factual, medical, legal, and local-policy claims. */
const guideSources: Record<string, GuideSource[]> = {
  "best-dog-friendly-patios-in-waco": [
    {
      label: "Milo — current dog policy",
      href: "https://www.milowaco.com/dog-policy/",
    },
  ],
  "how-to-know-if-your-dog-is-ready-for-a-patio": [
    {
      label: "AVSAB — humane, reward-based dog training",
      href: "https://avsab.org/resources/position-statements/",
    },
  ],
  "best-waco-parks-for-dogs": [
    {
      label: "City of Waco — Cameron Park trail rules",
      href: "https://www.waco-texas.com/Departments/Parks-Recreation/Cameron-Park/Cameron-Park-Trail-System-Rules",
    },
    {
      label: "City of Waco — North Waco Park",
      href: "https://www.waco-texas.com/Departments/Parks-Recreation/Parks-Playgrounds-Splash-Pads-Trails/North-Waco-Park",
    },
  ],
  "the-waco-puppy-socialization-checklist": [
    {
      label: "AVSAB — puppy socialization position statement",
      href: "https://avsab.org/resources/position-statements/",
    },
  ],
  "what-to-bring-when-you-take-your-dog-out-in-waco": [
    {
      label: "AVMA — warm-weather pet safety",
      href: "https://www.avma.org/resources-tools/pet-owners/petcare/warm-weather-pet-safety",
    },
  ],
  "patio-manners-what-your-dog-needs-before-brunch": [
    {
      label: "AVSAB — humane, reward-based dog training",
      href: "https://avsab.org/resources/position-statements/",
    },
    {
      label: "Milo — current dog policy",
      href: "https://www.milowaco.com/dog-policy/",
    },
  ],
  "how-to-help-your-dog-stay-calm-around-crowds": [
    {
      label: "AVSAB — humane, reward-based dog training",
      href: "https://avsab.org/resources/position-statements/",
    },
  ],
  "dog-friendly-weekend-in-waco": [
    {
      label: "National Park Service — pets at Waco Mammoth",
      href: "https://www.nps.gov/waco/planyourvisit/pets.htm",
    },
    {
      label: "Magnolia — dog policy at the Silos",
      href: "https://help.magnolia.com/hc/en-us/articles/31170271426452-Dog-Policy-at-the-Silos",
    },
    {
      label: "Milo — current dog policy",
      href: "https://www.milowaco.com/dog-policy/",
    },
  ],
  "what-local-businesses-should-know-before-becoming-dog-friendly": [
    {
      label: "ADA.gov — service-animal requirements",
      href: "https://www.ada.gov/resources/service-animals-2010-requirements/",
    },
  ],
  "why-cleaning-up-dog-waste-matters-for-your-yard": [
    {
      label: "CDC — healthy habits around pets",
      href: "https://www.cdc.gov/healthy-pets/about/index.html",
    },
    {
      label: "EPA — pet-waste and stormwater management",
      href: "https://www.epa.gov/system/files/documents/2023-01/bmp-pet-waste-management.pdf",
    },
  ],
  "how-to-keep-your-yard-guest-ready-when-you-have-dogs": [
    {
      label: "CDC — healthy habits around pets",
      href: "https://www.cdc.gov/healthy-pets/about/index.html",
    },
    {
      label: "EPA — pollution prevention around the home",
      href: "https://www.epa.gov/nutrientpollution/sources-and-solutions-and-around-home",
    },
  ],
  "waco-dog-etiquette-guide": [
    {
      label: "City of Waco — Cameron Park pet rules",
      href: "https://www.waco-texas.com/Departments/Parks-Recreation/Cameron-Park/Cameron-Park-Trail-System-Rules",
    },
  ],
};

const relatedGuideSlugs: Record<string, string[]> = {
  "best-dog-friendly-patios-in-waco": [
    "how-to-know-if-your-dog-is-ready-for-a-patio",
    "patio-manners-what-your-dog-needs-before-brunch",
  ],
  "how-to-know-if-your-dog-is-ready-for-a-patio": [
    "patio-manners-what-your-dog-needs-before-brunch",
    "best-dog-friendly-patios-in-waco",
  ],
  "best-waco-parks-for-dogs": [
    "what-to-bring-when-you-take-your-dog-out-in-waco",
    "waco-dog-etiquette-guide",
  ],
  "the-waco-puppy-socialization-checklist": [
    "how-to-help-your-dog-stay-calm-around-crowds",
    "what-to-bring-when-you-take-your-dog-out-in-waco",
  ],
  "what-to-bring-when-you-take-your-dog-out-in-waco": [
    "best-waco-parks-for-dogs",
    "dog-friendly-weekend-in-waco",
  ],
  "patio-manners-what-your-dog-needs-before-brunch": [
    "how-to-know-if-your-dog-is-ready-for-a-patio",
    "best-dog-friendly-patios-in-waco",
  ],
  "how-to-help-your-dog-stay-calm-around-crowds": [
    "the-waco-puppy-socialization-checklist",
    "waco-dog-etiquette-guide",
  ],
  "dog-friendly-weekend-in-waco": [
    "best-waco-parks-for-dogs",
    "best-dog-friendly-patios-in-waco",
  ],
  "what-local-businesses-should-know-before-becoming-dog-friendly": [
    "waco-dog-etiquette-guide",
    "best-dog-friendly-patios-in-waco",
  ],
  "why-cleaning-up-dog-waste-matters-for-your-yard": [
    "how-to-keep-your-yard-guest-ready-when-you-have-dogs",
    "waco-dog-etiquette-guide",
  ],
  "how-to-keep-your-yard-guest-ready-when-you-have-dogs": [
    "why-cleaning-up-dog-waste-matters-for-your-yard",
    "waco-dog-etiquette-guide",
  ],
  "waco-dog-etiquette-guide": [
    "best-waco-parks-for-dogs",
    "how-to-help-your-dog-stay-calm-around-crowds",
  ],
};

export function getGuideContent(slug: string): GuideSection[] | undefined {
  return guideContent[slug];
}

export function getGuideSources(slug: string): GuideSource[] {
  return guideSources[slug] ?? [];
}

export function getRelatedGuideSlugs(slug: string): string[] {
  return relatedGuideSlugs[slug] ?? [];
}
