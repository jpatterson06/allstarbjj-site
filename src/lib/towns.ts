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
    whyDriveHere: "Springfield has its own BJJ school now — and if local is all that matters, that's fine. But AllStar has been running since 2011 under a Renzo Gracie black belt who competed at ADCC and fought professionally in the IFL and Bellator. That's a different level of credential. Springfield families who care about the quality of instruction, not just the proximity, have been making the short drive down Morris Ave since we opened.",
    adultAngle: "If you live near Mountain Ave or the Springfield-Millburn line, you're already six minutes from the mat. Evening classes at 6, 7, and 8 PM fit around any work schedule. Two weeks free — no reason not to walk in and see the difference.",
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
    whyDriveHere: "Renzo Gracie Garwood is right next door to Cranford — same lineage, solid school. What sets AllStar apart is the coach. Jamal Patterson isn't just a Renzo Gracie black belt — he's an ADCC veteran, a pro MMA fighter with wins in the IFL and Bellator, and a UWC Light Heavyweight Champion. That competition experience changes how technique is taught. Cranford families who've been with us for five and ten years will tell you the difference shows up on the mat.",
    adultAngle: "Cranford has the train, the river, the downtown. What it doesn't have is a coach with Jamal's competition resume teaching adult BJJ ten minutes away. Two weeks free — walk in and see.",
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
    whyDriveHere: "Maplewood has Bodega Jiu-Jitsu — a beginner-friendly No-Gi school right in the village. Good option if No-Gi only and local is your priority. AllStar is fifteen minutes down Springfield Ave and offers Gi + No-Gi BJJ, Muay Thai, and MMA under a Renzo Gracie black belt with an ADCC and pro MMA record. SOMA parents who do the homework — who look at lineage, full program, and long-term development — consistently land here.",
    adultAngle: "If you commute through Newark Penn or the Morris & Essex line, the 6, 7, or 8 PM slot works. Maplewood Village is fifteen minutes from the mat. Two weeks free — see whether the full program is worth the drive.",
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

  {
    slug: 'summit',
    name: 'Summit',
    county: 'Union County',
    driveMin: 15,
    driveDirection: 'up Route 24',
    hookLine: "Fifteen minutes from downtown. Summit families research everything — so here's what matters.",
    whyDriveHere: "Summit is one of the top commuter towns in New Jersey for a reason — the schools are serious, the parents are involved, and expectations are high. That same standard applies when Summit families look for martial arts. They're not looking for a strip-mall karate school with colored belts handed out on a schedule. They're looking for real technique, real lineage, and a coach with a verifiable record. Coach Jamal trained directly under Renzo Gracie in New York and competed at ADCC — the highest-level grappling event in the world. There's nothing to take on faith.",
    adultAngle: "Summit kids are already in lacrosse, tennis, violin, AP prep. The question isn't whether to add one more activity — it's whether this one builds something that lasts past childhood. BJJ does. Confidence under pressure. The ability to stay calm when things go wrong. Discipline that doesn't need a season to exist. Drive 15 minutes up Route 24, walk in during any class. You'll know in one session.",
    landmarks: ['Summit Train Station', 'Downtown Summit (Springfield Ave)', 'Reeves-Reed Arboretum', 'Overlook Medical Center', 'Kent Place School'],
    adjacentSlugs: ['chatham', 'new-providence', 'westfield'],
    priority: 'highest',
  },
  {
    slug: 'chatham',
    name: 'Chatham',
    county: 'Morris County',
    driveMin: 18,
    driveDirection: 'via Route 24 west',
    hookLine: "Eighteen minutes from Chatham Borough. Small town, high standards — we match both.",
    whyDriveHere: "The closest martial arts option to Chatham is Dynasty — primarily a karate school that added BJJ as an extra class. That's not the same as a school built around BJJ from day one with Renzo Gracie lineage behind it. Chatham Borough families are tight-knit and do their research — word travels fast when a school is the real thing. Coach Jamal is a Renzo Gracie black belt and ADCC veteran. That's not marketing language. That's a verifiable competition record.",
    adultAngle: "Chatham kids come in with discipline already baked in — the schools here demand it. BJJ takes it further. The focus required to learn a technique, repeat it under pressure, and apply it when someone is actually resisting translates to every classroom, every field, every job they'll ever have. Eighteen minutes down Route 24. Walk in during any class. If it's not the right fit, you haven't lost anything.",
    landmarks: ['Chatham Borough Train Station', 'Main Street Chatham', 'Fishawack Trail', 'Chatham High School', 'Noe Pond Club'],
    adjacentSlugs: ['summit', 'millburn'],
    priority: 'high',
  },
  {
    slug: 'livingston',
    name: 'Livingston',
    county: 'Essex County',
    driveMin: 18,
    driveDirection: 'via Eisenhower Parkway',
    hookLine: "Eighteen minutes from Livingston. Essex County's top families are already training here.",
    whyDriveHere: "Livingston already has a martial arts school — Integrated Martial Arts & Fitness is right in town. If all you want is something local, that works. But if you want Renzo Gracie lineage, an ADCC-level competitor coaching your kid, and a school that has been built around BJJ since 2011 — that's AllStar, 18 minutes away. Livingston parents with high standards who have done the comparison keep ending up here. The credentials aren't close.",
    adultAngle: "Livingston adults who train at AllStar consistently say the same thing: they wish they'd started sooner. The after-work 7 PM class becomes the decompression they didn't know they needed. Livingston High will test your kid's composure. Every job they get will test it after that. BJJ builds that composure from the inside. Eighteen minutes via Eisenhower Parkway. Two weeks free. Nothing to lose.",
    landmarks: ['Livingston Mall', 'Livingston High School', 'Becker Park', 'Riker Hill Art Park', 'Memorial Oval'],
    adjacentSlugs: ['millburn', 'maplewood', 'springfield'],
    priority: 'high',
  },
];

export const townBySlug = (slug: string): Town | undefined =>
  towns.find((t) => t.slug === slug);
