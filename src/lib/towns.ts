// Town data — drives the /trial/<slug>/ landing pages.
// Each town gets bespoke first paragraphs to keep them out of duplicate-content territory.
// Copy is description-forward and uses verified facts only (no demographic framing / no unverifiable competitor claims).

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
  metaDescription: string; // unique, <160 char meta description with city, distance, programs, value prop
}

export const towns: Town[] = [
  {
    slug: 'union',
    name: 'Union',
    county: 'Union County',
    driveMin: 0,
    driveDirection: 'right here in town',
    hookLine: "The martial arts school right here in Union — BJJ, Muay Thai, MMA and kids classes since 2011.",
    whyDriveHere: "AllStar Martial Arts is a family-owned school on West Chestnut Street in Union, running since 2011. Coach Jamal Patterson is a 4th-degree Brazilian Jiu-Jitsu black belt under Renzo Gracie, an ADCC veteran, and a former pro MMA fighter who competed in the IFL and Bellator. Adults train BJJ, Muay Thai, kickboxing and MMA; kids have Cubs (ages 4–6) and Lions (ages 7–13).",
    adultAngle: "If you live in Union, the free two-week trial is a five-minute trip. Walk in during any class and we'll get you on the mat.",
    landmarks: ['Union High School', 'Kean University', 'Liberty Hall', 'Galloping Hill Golf Course'],
    adjacentSlugs: ['springfield', 'roselle-park', 'kenilworth'],
    priority: 'highest',
    heroImage: '/images/union-mat.jpg',
    heroPosition: '50% 60%',
    metaDescription: 'Brazilian Jiu-Jitsu in Union, NJ since 2011. BJJ, Muay Thai, MMA + Kids classes. Renzo Gracie black belt. Free 2-week trial, no contract.',
  },
  {
    slug: 'springfield',
    name: 'Springfield',
    county: 'Union County',
    driveMin: 6,
    driveDirection: 'down Morris Avenue',
    hookLine: "About six minutes down Morris Avenue to real BJJ, Muay Thai and MMA.",
    whyDriveHere: "AllStar Martial Arts is a family-owned school at 1166 West Chestnut St in Union — about six minutes from Springfield down Morris Avenue, with free on-site parking. We've taught adults and kids since 2011 under Coach Jamal Patterson, a 4th-degree Renzo Gracie black belt, ADCC veteran and former pro MMA fighter (IFL, Bellator).",
    adultAngle: "Evening classes at 6, 7 and 8 PM fit around a work schedule, and your first two weeks are free with no contract.",
    landmarks: ['Baltusrol Golf Club', 'Cannon Ball House', 'Meisel Park', 'Mountain Avenue'],
    adjacentSlugs: ['union', 'millburn', 'mountainside', 'maplewood'],
    priority: 'high',
    metaDescription: 'BJJ, Muay Thai, MMA in Springfield, NJ — 6 min from Union. Renzo Gracie black belt coaching. Kids classes available. Free 2-week trial.',
  },
  {
    slug: 'cranford',
    name: 'Cranford',
    county: 'Union County',
    driveMin: 10,
    driveDirection: 'up the Parkway',
    hookLine: "About ten minutes up the Garden State Parkway to a Renzo Gracie lineage school.",
    whyDriveHere: "AllStar Martial Arts is a family-owned BJJ, Muay Thai and MMA school at 1166 West Chestnut St in Union — roughly ten minutes from downtown Cranford up the Garden State Parkway, with free parking. Coach Jamal Patterson is a 4th-degree Renzo Gracie black belt, an ADCC veteran and a former pro MMA fighter (IFL, Bellator).",
    adultAngle: "Adults train BJJ, Muay Thai, kickboxing and MMA (ages 16+), with evening classes built for commuters and a free two-week trial.",
    landmarks: ['Downtown Cranford', 'Nomahegan Park', 'Rahway River', 'Cranford Train Station'],
    adjacentSlugs: ['westfield', 'roselle-park', 'union'],
    priority: 'high',
    metaDescription: 'Martial Arts in Cranford, NJ — 10 min from Union. BJJ, Muay Thai, MMA & Kids classes. ADCC veteran coach. Free 2-week trial, no contract.',
  },
  {
    slug: 'westfield',
    name: 'Westfield',
    county: 'Union County',
    driveMin: 12,
    driveDirection: 'down Mountain Avenue',
    hookLine: "About twelve minutes down Mountain Avenue to real martial arts instruction.",
    whyDriveHere: "AllStar Martial Arts is a family-owned school at 1166 West Chestnut St in Union — about twelve minutes from Westfield down Mountain Avenue, with free parking. Running since 2011 under Coach Jamal Patterson, a 4th-degree Renzo Gracie black belt, ADCC veteran and former pro MMA fighter (IFL, Bellator). Adults train BJJ, Muay Thai, kickboxing and MMA; kids have Cubs (4–6) and Lions (7–13).",
    adultAngle: "For adults coming off an NYC commute, the 6, 7 and 8 PM classes fit the schedule — and the first two weeks are free.",
    landmarks: ['Downtown Westfield (Quimby St, Elm St, East Broad)', 'Tamaques Park', 'Mindowaskin Park', 'Echo Lake Country Club', 'Westfield Train Station'],
    adjacentSlugs: ['cranford', 'mountainside', 'springfield'],
    priority: 'highest',
    metaDescription: 'Renzo Gracie BJJ + Muay Thai in Westfield, NJ, 12 min from Union. Adults & kids classes. IFL & Bellator veteran. Free 2-week trial.',
  },
  {
    slug: 'mountainside',
    name: 'Mountainside',
    county: 'Union County',
    driveMin: 10,
    driveDirection: 'down Route 22',
    hookLine: "About ten minutes down Route 22 to BJJ, Muay Thai and MMA.",
    whyDriveHere: "AllStar Martial Arts is a family-owned school at 1166 West Chestnut St in Union — about ten minutes from Mountainside down Route 22, with free parking. Coach Jamal Patterson is a 4th-degree Renzo Gracie black belt, ADCC veteran and former pro MMA fighter (IFL, Bellator).",
    adultAngle: "Adults train BJJ, Muay Thai, kickboxing and MMA (ages 16+), and every new student starts with a free two-week trial.",
    landmarks: ['Watchung Reservation', 'Echo Lake Park', "Children's Specialized Hospital", 'Deerfield School'],
    adjacentSlugs: ['westfield', 'springfield', 'union'],
    priority: 'medium',
    metaDescription: 'Brazilian Jiu-Jitsu in Mountainside, NJ — 10 min away. Adults & kids classes, Muay Thai, MMA. Renzo Gracie black belt. Free 2-week trial.',
  },
  {
    slug: 'maplewood',
    name: 'Maplewood',
    longName: 'Maplewood / South Orange',
    county: 'Essex County',
    driveMin: 15,
    driveDirection: 'via Springfield Avenue',
    hookLine: "About fifteen minutes via Springfield Avenue to a full Gi and No-Gi program.",
    whyDriveHere: "AllStar Martial Arts is a family-owned school at 1166 West Chestnut St in Union — about fifteen minutes from Maplewood via Springfield Avenue, with free parking. Running since 2011 under Coach Jamal Patterson, a 4th-degree Renzo Gracie black belt, ADCC veteran and former pro MMA fighter (IFL, Bellator). We offer Gi and No-Gi BJJ, Muay Thai, kickboxing and MMA, plus kids classes.",
    adultAngle: "If you commute through Newark Penn or the Morris & Essex line, the 6, 7 or 8 PM classes work — and the first two weeks are free.",
    landmarks: ['Maplewood Village', 'Memorial Park', 'South Mountain Reservation', 'Maplewood Train Station'],
    adjacentSlugs: ['millburn', 'springfield'],
    priority: 'high',
    metaDescription: 'BJJ, Muay Thai, MMA in Maplewood, NJ — 15 min from Union. Adults & kids Gi + No-Gi classes. Renzo Gracie lineage. Free 2-week trial.',
  },
  {
    slug: 'millburn',
    name: 'Millburn',
    longName: 'Millburn / Short Hills',
    county: 'Essex County',
    driveMin: 12,
    driveDirection: 'down Vauxhall Road',
    hookLine: "About twelve minutes down Vauxhall Road to a Renzo Gracie lineage school.",
    whyDriveHere: "AllStar Martial Arts is a family-owned BJJ, Muay Thai and MMA school at 1166 West Chestnut St in Union — about twelve minutes from Millburn and Short Hills down Vauxhall Road, with free parking. We've taught Millburn and Short Hills families since 2011 under Coach Jamal Patterson, a 4th-degree Renzo Gracie black belt, ADCC veteran and former pro MMA fighter (IFL, Bellator).",
    adultAngle: "Adults train BJJ, Muay Thai, kickboxing and MMA (ages 16+), with evening classes for commuters and a free two-week trial.",
    landmarks: ['The Mall at Short Hills', 'Taylor Park', 'Millburn Train Station', 'Paper Mill Playhouse'],
    adjacentSlugs: ['springfield', 'maplewood'],
    priority: 'highest',
    metaDescription: 'Renzo Gracie BJJ & Muay Thai in Short Hills, NJ — 12 min from Union. Adult & kids classes. ADCC veteran. Free 2-week trial, no contract.',
  },
  {
    slug: 'roselle-park',
    name: 'Roselle Park',
    county: 'Union County',
    driveMin: 6,
    driveDirection: 'down Westfield Avenue',
    hookLine: "About six minutes down Westfield Avenue to real BJJ, Muay Thai and MMA.",
    whyDriveHere: "AllStar Martial Arts is a family-owned school at 1166 West Chestnut St in Union — about six minutes from Roselle Park down Westfield Avenue, with free parking. Running since 2011 under Coach Jamal Patterson, a 4th-degree Renzo Gracie black belt, ADCC veteran and former pro MMA fighter (IFL, Bellator). Kids have Cubs (4–6) and Lions (7–13).",
    adultAngle: "Even one or two evenings a week is enough to start, and the first two weeks are free with no contract.",
    landmarks: ['Casano Community Center', 'Roselle Park Train Station', 'Westfield Avenue', 'Veterans Memorial Park'],
    adjacentSlugs: ['union', 'cranford', 'kenilworth'],
    priority: 'medium',
    metaDescription: 'Brazilian Jiu-Jitsu in Roselle Park, NJ — 6 min from Union. BJJ, Muay Thai, MMA & kids classes. Renzo Gracie black belt. Free trial.',
  },

  {
    slug: 'summit',
    name: 'Summit',
    county: 'Union County',
    driveMin: 15,
    driveDirection: 'up Route 24',
    hookLine: "About fifteen minutes up Route 24 to a Renzo Gracie lineage school.",
    whyDriveHere: "AllStar Martial Arts is a family-owned school at 1166 West Chestnut St in Union — about fifteen minutes from Summit up Route 24, with free parking. Coach Jamal Patterson trained directly under Renzo Gracie, competed at ADCC, and fought professionally in the IFL and Bellator. Adults train BJJ, Muay Thai, kickboxing and MMA; kids have Cubs (4–6) and Lions (7–13).",
    adultAngle: "Drive fifteen minutes up Route 24, walk in during any class, and start with a free two-week trial — no contract.",
    landmarks: ['Summit Train Station', 'Downtown Summit (Springfield Ave)', 'Reeves-Reed Arboretum', 'Overlook Medical Center', 'Kent Place School'],
    adjacentSlugs: ['chatham', 'new-providence', 'westfield'],
    priority: 'highest',
    metaDescription: 'Real BJJ in Summit, NJ — 15 min from Union. Renzo Gracie black belt, ADCC veteran. Adults & kids classes. Muay Thai, MMA. Free trial.',
  },
  {
    slug: 'chatham',
    name: 'Chatham',
    county: 'Morris County',
    driveMin: 18,
    driveDirection: 'via Route 24 west',
    hookLine: "About eighteen minutes via Route 24 to a Renzo Gracie lineage school.",
    whyDriveHere: "AllStar Martial Arts is a family-owned BJJ, Muay Thai and MMA school at 1166 West Chestnut St in Union — about eighteen minutes from Chatham via Route 24, with free parking. Coach Jamal Patterson is a 4th-degree Renzo Gracie black belt and an ADCC veteran with a verifiable competition record.",
    adultAngle: "Adults train BJJ, Muay Thai, kickboxing and MMA (ages 16+); every new student starts with a free two-week trial.",
    landmarks: ['Chatham Borough Train Station', 'Main Street Chatham', 'Fishawack Trail', 'Chatham High School', 'Noe Pond Club'],
    adjacentSlugs: ['summit', 'millburn'],
    priority: 'high',
    metaDescription: 'Brazilian Jiu-Jitsu in Chatham, NJ — 18 min away. Renzo Gracie lineage, ADCC veteran coach. BJJ, Muay Thai, MMA. Free 2-week trial.',
  },
  {
    slug: 'livingston',
    name: 'Livingston',
    county: 'Essex County',
    driveMin: 18,
    driveDirection: 'via Eisenhower Parkway',
    hookLine: "About eighteen minutes via Eisenhower Parkway to real BJJ, Muay Thai and MMA.",
    whyDriveHere: "AllStar Martial Arts is a family-owned school at 1166 West Chestnut St in Union — about eighteen minutes from Livingston via Eisenhower Parkway, with free parking. Built around Brazilian Jiu-Jitsu since 2011 under Coach Jamal Patterson, a 4th-degree Renzo Gracie black belt, ADCC veteran and former pro MMA fighter (IFL, Bellator).",
    adultAngle: "The after-work 7 PM class becomes a real decompression, and the first two weeks are free with no contract.",
    landmarks: ['Livingston Mall', 'Livingston High School', 'Becker Park', 'Riker Hill Art Park', 'Memorial Oval'],
    adjacentSlugs: ['millburn', 'maplewood', 'springfield'],
    priority: 'high',
    metaDescription: 'Real BJJ in Livingston, NJ — 18 min from Union. Renzo Gracie black belt coaching. BJJ, Muay Thai, MMA & kids. Free 2-week trial.',
  },
  {
    slug: 'kenilworth',
    name: 'Kenilworth',
    county: 'Union County',
    driveMin: 8,
    driveDirection: 'via Boulevard',
    hookLine: "About eight minutes via the Boulevard to a Renzo Gracie lineage school.",
    whyDriveHere: "AllStar Martial Arts is a family-owned school at 1166 West Chestnut St in Union — about eight minutes from Kenilworth via the Boulevard, with free parking. Built since 2011 under Coach Jamal Patterson, a 4th-degree Renzo Gracie black belt, ADCC veteran and former pro MMA fighter (IFL, Bellator). Kids have Cubs (4–6) and Lions (7–13).",
    adultAngle: "Evening classes fit around a 9-to-5, and every new student gets a free two-week trial.",
    landmarks: ['Kenilworth Town Hall', 'Boulevard', 'Kean University', 'Townley Presbyterian Church'],
    adjacentSlugs: ['union', 'roselle-park'],
    priority: 'high',
    metaDescription: 'Brazilian Jiu-Jitsu in Kenilworth, NJ — 8 min from Union. Renzo Gracie lineage. BJJ, Muay Thai, MMA & kids classes. Free trial.',
  },
];

export const townBySlug = (slug: string): Town | undefined =>
  towns.find((t) => t.slug === slug);
