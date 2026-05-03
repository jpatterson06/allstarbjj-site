// Town data — drives the /trial/<slug>/ landing pages.
// Each town gets bespoke first paragraphs to keep them out of duplicate-content territory.

export interface Town {
  slug: string;
  name: string;          // headline name (e.g. "Westfield")
  longName?: string;     // longer form for body copy (e.g. "Millburn / Short Hills")
  county: string;
  driveMin: number;
  driveDirection: string; // e.g. "down Mountain Avenue", "via Morris Ave"
  hookLine: string;       // first emotional line — town-specific
  whyDriveHere: string;   // 1-2 paragraphs about why this town's families come to AllStar
  adultAngle: string;     // 1 paragraph for adults
  landmarks: string[];    // for cross-referencing in copy
  adjacentSlugs: string[]; // for sister-town cross-links
  priority: 'highest' | 'high' | 'medium';
  heroImage?: string;     // optional hero photo override (e.g. "/images/union-mat.jpg")
  heroPosition?: string;  // optional CSS object-position for hero
}

export const towns: Town[] = [
  {
    slug: 'union',
    name: 'Union',
    county: 'Union County',
    driveMin: 0,
    driveDirection: 'right here in town',
    hookLine: "We're the gym in your town. Not a chain. Not a franchise. The real one.",
    whyDriveHere: "AllStar has been on West Chestnut Street since 2011 — long before the trampoline parks and the chain karate places. We're not visiting Union. We are Union. Coach Jamal lives the work; the school sponsors local events; half the adult students live within five minutes of the building.",
    adultAngle: "If you live in Union, the trial isn't a road trip. It's a five-minute thing. Walk in any time during the schedule. We'll get you on the mat.",
    landmarks: ['Union High School', 'Kean University', 'Liberty Hall', 'Galloping Hill Golf Course'],
    adjacentSlugs: ['springfield', 'roselle-park'],
    priority: 'highest',
    heroImage: '/images/union-mat.jpg',
    heroPosition: '50% 60%',
  },
  {
    slug: 'springfield',
    name: 'Springfield',
    county: 'Union County',
    driveMin: 6,
    driveDirection: 'down Morris Avenue',
    hookLine: "Six minutes from your driveway. The closest real BJJ school to Springfield, full stop.",
    whyDriveHere: "Springfield families have been driving down Morris Ave to AllStar since we opened. It's a short hop — past the Battle of Springfield monument, past Baltusrol, into Union. The kids classes fit around school pickup. The adult evening classes work for working parents who can hit the 6, 7, or 8 PM slot and still be home for dinner.",
    adultAngle: "If you live near Mountain Ave or the Springfield-Millburn line, you already drive past us a few times a week. The trial is two weeks free. No reason not to walk in.",
    landmarks: ['Baltusrol Golf Club', 'Cannon Ball House', 'Meisel Park', 'Mountain Avenue'],
    adjacentSlugs: ['union', 'millburn', 'mountainside', 'maplewood'],
    priority: 'high',
  },
  {
    slug: 'cranford',
    name: 'Cranford',
    county: 'Union County',
    driveMin: 10,
    driveDirection: 'up the Parkway',
    hookLine: "Ten minutes from downtown Cranford. The other martial arts schools are fitness boxing in disguise.",
    whyDriveHere: "Cranford parents want real instruction. Walkable downtown, strong schools, an active community — the same energy shows up in how families approach extracurriculars. They want quality. We have Cranford families who've been with us five and ten years; their kids started in Cubs and now train as adults.",
    adultAngle: "Cranford has the train, the river, and the downtown. What it doesn't have is a Renzo Gracie black belt teaching adult BJJ. That's ten minutes away. The trial is two weeks free.",
    landmarks: ['Downtown Cranford', 'Nomahegan Park', 'Rahway River', 'Cranford Train Station'],
    adjacentSlugs: ['westfield', 'roselle-park', 'union'],
    priority: 'high',
  },
  {
    slug: 'westfield',
    name: 'Westfield',
    county: 'Union County',
    driveMin: 12,
    driveDirection: 'down Mountain Avenue',
    hookLine: "Twelve minutes down Mountain Avenue. Westfield parents do their homework — so let me save you some Googling.",
    whyDriveHere: "Westfield kids already do everything. Soccer at Tamaques Park, music, math tutoring, three more activities you're forgetting. So when your kid asks for one more — or you want to add one — the question isn't \"is this fun?\" It's \"is this *good*?\" BJJ is good. Not because we say so — because of what it actually does. Confidence under pressure. Discipline that travels. A school where the lineage is real.",
    adultAngle: "You commute to NYC. You're tired. The last thing you want is another gym where you go through the motions. BJJ isn't that. Six months in, you'll move differently. Stand differently. Sleep better. The 10 PM work email won't hit the same way.",
    landmarks: ['Downtown Westfield (Quimby St, Elm St, East Broad)', 'Tamaques Park', 'Mindowaskin Park', 'Echo Lake Country Club', 'Westfield Train Station'],
    adjacentSlugs: ['cranford', 'mountainside', 'springfield'],
    priority: 'highest',
  },
  {
    slug: 'mountainside',
    name: 'Mountainside',
    county: 'Union County',
    driveMin: 10,
    driveDirection: 'down Route 22',
    hookLine: "Mountainside is small. Your options for serious martial arts are smaller. We're ten minutes away.",
    whyDriveHere: "Mountainside families live next to the Watchung Reservation, which is great for hiking and not so great for finding a Renzo Gracie black belt within walking distance. Lucky for you, Route 22 puts AllStar ten minutes from your driveway. The drive is shorter than your kids' soccer games on the weekend.",
    adultAngle: "Quiet, residential, low-density Mountainside doesn't have an MMA gym. Union does. Ten minutes is a short price for the right coach.",
    landmarks: ['Watchung Reservation', 'Echo Lake Park', "Children's Specialized Hospital", 'Deerfield School'],
    adjacentSlugs: ['westfield', 'springfield', 'union'],
    priority: 'medium',
  },
  {
    slug: 'maplewood',
    name: 'Maplewood',
    longName: 'Maplewood / South Orange',
    county: 'Essex County',
    driveMin: 15,
    driveDirection: 'via Springfield Avenue',
    hookLine: "Fifteen minutes via Springfield Ave. Maplewood parents don't fall for slick branding — they want the real thing.",
    whyDriveHere: "Maplewood + South Orange parents value substance over polish. Real instruction over flashy marquees. Lineage over franchise templates. That cultural fit is exactly why so many SOMA families have ended up at AllStar — they did the homework, asked around, and ended up walking in. Maplewood Village is great. The Memorial Park scene is great. And the gym isn't down the block — but fifteen minutes down Springfield Ave isn't a deal-breaker for the right school.",
    adultAngle: "If you commute through Newark Penn or Hoboken on Morris & Essex, you're already moving through the right corridor. The 6, 7, or 8 PM adult class works for that schedule. Two weeks free.",
    landmarks: ['Maplewood Village', 'Memorial Park', 'South Mountain Reservation', 'Maplewood Train Station'],
    adjacentSlugs: ['millburn', 'springfield'],
    priority: 'high',
  },
  {
    slug: 'millburn',
    name: 'Millburn',
    longName: 'Millburn / Short Hills',
    county: 'Essex County',
    driveMin: 12,
    driveDirection: 'down Vauxhall Road',
    hookLine: "Twelve minutes from Short Hills. The wealth is real — but real coaching doesn't come from a luxury mall.",
    whyDriveHere: "Short Hills has the mall, the train, and the highest-LTV families in the state. What it doesn't have is a Renzo Gracie lineage school inside its borders. So Millburn / Short Hills parents do what affluent parents do everywhere: they research, they drive a few minutes, they pick the best option. We've coached Millburn kids from Cubs through Lions and into adult classes. We've trained Short Hills professionals after their NYC commute. The drive is twelve minutes. The decision is whether the coaching is worth that — and the answer is yes.",
    adultAngle: "Short Hills professionals don't need another expensive workout. They need a skill that compounds. BJJ does that — and twelve minutes down Vauxhall is a small price for the only Renzo Gracie black belt in the area.",
    landmarks: ['The Mall at Short Hills', 'Taylor Park', 'Millburn Train Station', 'Paper Mill Playhouse'],
    adjacentSlugs: ['springfield', 'maplewood'],
    priority: 'highest',
  },
  {
    slug: 'roselle-park',
    name: 'Roselle Park',
    county: 'Union County',
    driveMin: 6,
    driveDirection: 'down Westfield Avenue',
    hookLine: "Six minutes via Westfield Ave. Roselle Park has heart — what it needs is a real BJJ school.",
    whyDriveHere: "Roselle Park is dense, working-class, diverse, and full of families who'd love their kids to have the kind of structure and confidence that a real martial arts school builds. We're six minutes away. The drive's nothing. The trial is two weeks free, no commitment. Bring the kids. Bring yourself.",
    adultAngle: "If you work nights or shifts and only one or two evenings a week works — that's enough to start. We have students who train twice a week and still progress. Show up consistently and you'll get there.",
    landmarks: ['Casano Community Center', 'Roselle Park Train Station', 'Westfield Avenue', 'Veterans Memorial Park'],
    adjacentSlugs: ['union', 'cranford'],
    priority: 'medium',
  },
];

export const townBySlug = (slug: string): Town | undefined =>
  towns.find((t) => t.slug === slug);
