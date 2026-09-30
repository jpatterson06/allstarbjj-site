// Knowledge section content. Source of truth: allstar-knowledge-base.md (2026-09-30).
// Rules: price only as the $179-$249/month range; no ratings, review or student counts,
// testimonials, results promises, exact kids class times, other locations, or lineage chain.
export interface KSection { h: string; p?: string; items?: string[] }
export interface KFaq { q: string; a: string }
export interface KLink { href: string; label: string }
export interface KItem {
  slug: string;
  navLabel: string;
  title: string;
  description: string;
  q: string;
  a: string; // direct answer, 40-60 words
  sections: KSection[];
  faqs: KFaq[]; // extra Q&As (the main Q/A is added automatically)
  learnMore: KLink[];
  related: string[]; // other knowledge slugs
}

export const knowledge: KItem[] = [
  {
    slug: 'what-is-brazilian-jiu-jitsu',
    navLabel: 'What is Brazilian Jiu-Jitsu?',
    title: 'What Is Brazilian Jiu-Jitsu? Who Is It For? | AllStar',
    description: 'Brazilian Jiu-Jitsu is a grappling art built on leverage, position and submissions. Learn who it suits and how to try it free in Union, NJ.',
    q: 'What is Brazilian Jiu-Jitsu and who is it for?',
    a: 'Brazilian Jiu-Jitsu (BJJ) is a grappling martial art with no striking. It uses leverage, body position and submissions, so technique matters more than strength. At AllStar Martial Arts in Union, NJ, adults 16 and up of every level can train, and beginners are welcome.',
    sections: [
      { h: 'How BJJ works', p: 'You learn to control a partner on the ground, escape bad positions and finish with submissions. Tapping stops the action immediately, so training stays controlled.' },
      { h: 'Who trains at AllStar', items: ['Adults 16 and up, all levels', 'Women train in the same classes as men', 'Students in their 50s and 60s', 'Kids through Cubs (ages 4 to 6) and Lions (ages 7 to 13)'] },
      { h: 'Do I have to compete?', p: 'No. Competing is optional, and most adults never compete.' },
    ],
    faqs: [
      { q: 'Is there striking in BJJ?', a: 'No. BJJ is grappling. It is about leverage, position and control rather than punches or kicks.' },
    ],
    learnMore: [{ href: '/adult-bjj/', label: 'Adult BJJ at AllStar' }, { href: '/kids/', label: 'Kids martial arts' }],
    related: ['bjj-for-beginners', 'bjj-vs-muay-thai-vs-mma', 'first-bjj-class'],
  },
  {
    slug: 'bjj-for-beginners',
    navLabel: 'Is BJJ good for beginners?',
    title: 'Is BJJ Good for Beginners? No Experience Needed',
    description: 'Yes, BJJ suits complete beginners. Most AllStar students in Union, NJ start at zero, with a structured beginner curriculum and new people every week.',
    q: 'Is BJJ good for beginners, and do I need experience?',
    a: 'Yes, BJJ is a good fit for beginners, and you do not need any experience. Most students at AllStar Martial Arts in Union, NJ start at zero. There is a structured beginner curriculum, and new people start every week, so you will not be the only one learning.',
    sections: [
      { h: 'How beginners are handled', items: ['Your first 6 months are in a Fundamentals-style class', 'Beginners are paired with experienced partners who guide rather than test', 'Live rolling is at controlled intensity', 'After about 6 months you can join general classes with open rolling'] },
      { h: 'Do I need to be in shape or flexible?', p: 'No. You get in shape by training, and you set the pace. Technique matters more than strength.' },
      { h: 'Will I get hurt?', p: 'Every sport carries some risk. The gym controls intensity, does not put new students in hard rolling, and tapping stops the action right away. If you have a health concern, check with your doctor first.' },
    ],
    faqs: [
      { q: 'Can I try BJJ before joining?', a: 'Yes. The free trial is 2 weeks of unlimited classes with no credit card and no contract, and a gi is provided.' },
    ],
    learnMore: [{ href: '/adult-bjj/', label: 'Adult BJJ at AllStar' }, { href: '/bjj-over-40/', label: 'BJJ over 40' }],
    related: ['first-bjj-class', 'free-trial', 'what-to-bring-to-bjj'],
  },
  {
    slug: 'bjj-vs-muay-thai-vs-mma',
    navLabel: 'BJJ vs Muay Thai vs MMA',
    title: 'BJJ vs Muay Thai vs MMA: Which Should You Try?',
    description: 'BJJ is grappling, Muay Thai is striking, MMA combines both with wrestling. See how they differ and which fits you at AllStar in Union, NJ.',
    q: 'What is the difference between BJJ, Muay Thai and MMA?',
    a: 'BJJ is grappling with no striking. Muay Thai is striking with fists, elbows, knees and shins, plus the clinch. MMA blends BJJ, Muay Thai and wrestling. AllStar Martial Arts in Union, NJ teaches all three for adults 16 and up, and one free trial covers them.',
    sections: [
      { h: 'Brazilian Jiu-Jitsu', p: 'Leverage, position and submissions on the ground. No striking.' },
      { h: 'Muay Thai', p: 'Pad work, conditioning and technique. AllStar kickboxing is Muay Thai. There is no sparring in your first 6 months, and it is optional after that.' },
      { h: 'MMA', p: 'Classes connect the clinch to the takedown to the ground. No wrestling background is needed, and sparring is optional.' },
      { h: 'Boxing and Wrestling', p: 'AllStar also offers Boxing and Wrestling. They are not on the full class schedule yet, so the team can tell you when those sessions run.' },
      { h: 'Can I train more than one?', p: 'Yes. Many students cross-train BJJ and Muay Thai. The free trial lets adults sample Adult BJJ, Muay Thai and MMA.' },
    ],
    faqs: [
      { q: 'Is kickboxing different from Muay Thai at AllStar?', a: 'No. AllStar kickboxing is Muay Thai. Muay Thai adds elbows, knees and the clinch to punches and kicks.' },
    ],
    learnMore: [{ href: '/adult-bjj/', label: 'Adult BJJ' }, { href: '/adult-muay-thai/', label: 'Adult Muay Thai' }, { href: '/adult-mma/', label: 'Adult MMA' }],
    related: ['what-is-brazilian-jiu-jitsu', 'free-trial', 'bjj-for-beginners'],
  },
  {
    slug: 'first-bjj-class',
    navLabel: 'What happens in a first BJJ class?',
    title: 'What Happens in Your First BJJ Class? | AllStar',
    description: 'Your first BJJ class: a warm-up, partner technique and light live rolling. See what to expect at AllStar Martial Arts in Union, NJ.',
    q: 'What happens in a first BJJ class?',
    a: 'A beginner class starts with a 10-minute warm-up, then about 35 minutes of technique with a partner, then about 15 minutes of live rolling at controlled intensity. Your partner is an experienced student who guides you. You do not need experience or your own gear for the trial.',
    sections: [
      { h: 'Class outline', items: ['Warm-up, 10 minutes: shrimping and rolls', 'Technique, 35 minutes: learn moves with a partner', 'Live rolling, 15 minutes: controlled intensity'] },
      { h: 'Before class', p: 'Book your free trial first so the team is ready for you. The team then reaches out to confirm your first class. Wear comfortable athletic clothes and bring a water bottle.' },
      { h: 'Adult class times', p: 'Adult classes run weekday evenings at 6, 7 and 8 PM and on Saturday mornings. The team confirms which class fits you.' },
    ],
    faqs: [
      { q: 'Do I have to spar in my first class?', a: 'Live rolling is at controlled intensity, and new students are not put into hard rolling.' },
    ],
    learnMore: [{ href: '/adult-bjj/', label: 'Adult BJJ' }, { href: '/trial/', label: 'Book your free trial' }],
    related: ['what-to-bring-to-bjj', 'free-trial', 'bjj-for-beginners'],
  },
  {
    slug: 'bjj-for-self-defense',
    navLabel: 'Is BJJ good for self-defense?',
    title: 'Is BJJ Good for Self-Defense? | AllStar Union NJ',
    description: 'BJJ teaches practical self-defense: escape bad positions, get on top and control. Learn how AllStar in Union, NJ teaches it, at any size or age.',
    q: 'Is BJJ good for self-defense?',
    a: 'Yes. BJJ teaches practical self-defense on the ground: escape bad positions first, then get on top, then control. It relies on leverage rather than strength, so it suits any size or age. At AllStar in Union, NJ, self-defense is taught through the adult BJJ program.',
    sections: [
      { h: 'How the curriculum is ordered', p: 'Escapes come first, then top control, then submissions. The training is non-competitive.' },
      { h: 'Who it is for', p: 'Adults 16 and up, at any size or age. Technique and leverage matter more than strength.' },
      { h: 'Where to train', p: 'There is no separate self-defense booking. You join adult BJJ classes, and the free trial lets you start.' },
    ],
    faqs: [
      { q: 'Do I need to be strong or athletic?', a: 'No. BJJ rewards technique and leverage over strength, and you get in shape by training.' },
    ],
    learnMore: [{ href: '/self-defense/', label: 'Self-defense at AllStar' }, { href: '/adult-bjj/', label: 'Adult BJJ' }],
    related: ['what-is-brazilian-jiu-jitsu', 'bjj-for-women', 'first-bjj-class'],
  },
  {
    slug: 'bjj-for-women',
    navLabel: 'Is BJJ good for women?',
    title: 'BJJ for Women in Union, NJ | AllStar Martial Arts',
    description: 'Women train in every AllStar class in Union, NJ. Partners are paired carefully, beginners are welcome, and you can ease in at your own pace.',
    q: 'Is BJJ a good fit for women, and how are classes set up?',
    a: 'Yes. Women train at every belt level at AllStar Martial Arts in Union, NJ. There is no separate women-only class: women train in the same classes as men. Partners are paired carefully, especially for beginners, and the culture is respectful. You can ease in slowly.',
    sections: [
      { h: 'What to expect', items: ['Same classes and same curriculum as everyone else', 'Careful partner pairing for beginners', 'No experience needed', 'Nothing to bring for the free trial except comfortable athletic clothes and water'] },
      { h: 'Is it safe training with men?', p: 'Partners are paired carefully and the gym controls intensity. If you want to ease in slowly, the gym can accommodate that.' },
    ],
    faqs: [
      { q: 'Is there a women-only BJJ class?', a: 'No. Women train in the same classes as men, with careful partner pairing.' },
    ],
    learnMore: [{ href: '/bjj-for-women/', label: 'BJJ for women at AllStar' }, { href: '/adult-bjj/', label: 'Adult BJJ' }],
    related: ['bjj-for-beginners', 'bjj-for-self-defense', 'free-trial'],
  },
  {
    slug: 'bjj-after-40',
    navLabel: 'Can I start BJJ after 40?',
    title: 'Can You Start BJJ After 40? | AllStar Union NJ',
    description: 'Yes, you can start BJJ after 40. Students in their 50s and 60s train at AllStar in Union, NJ. You set the pace, and hard rolling is not for new students.',
    q: 'Can I start BJJ after 40?',
    a: 'Yes. Students in their 50s and 60s train at AllStar Martial Arts in Union, NJ, and many started after 40. BJJ rewards technique over strength, you set the pace, and new students are not put into hard rolling. Two to three classes a week is a suggested rhythm.',
    sections: [
      { h: 'Why it works', p: 'Leverage, timing and position reward technique over strength. You get in shape by training, so you do not need to be fit first.' },
      { h: 'How to start', items: ['Begin with the free 2-week trial', 'Train 2 to 3 times a week', 'Take it at your own pace', 'Check with your doctor if you have health concerns'] },
    ],
    faqs: [
      { q: 'Am I too old or out of shape for BJJ?', a: 'No. Students in their 50s and 60s train here, and you get in shape by training.' },
    ],
    learnMore: [{ href: '/bjj-over-40/', label: 'BJJ over 40 at AllStar' }, { href: '/adult-bjj/', label: 'Adult BJJ' }],
    related: ['bjj-for-beginners', 'first-bjj-class', 'free-trial'],
  },
  {
    slug: 'free-trial',
    navLabel: 'What is the free 2-week trial?',
    title: 'Free 2-Week BJJ Trial in Union, NJ | AllStar',
    description: 'AllStar offers 2 weeks of unlimited classes, free. No credit card, no contract. Adults sample BJJ, Muay Thai and MMA. See how to book.',
    q: 'What is the free 2-week trial at AllStar?',
    a: 'The free trial is 2 weeks of unlimited classes at AllStar Martial Arts in Union, NJ. There is no credit card, no contract and no commitment. A gi and any gear needed are provided. If it is not for you, you owe nothing.',
    sections: [
      { h: 'What you can try', items: ['Adults: Adult BJJ, Muay Thai and MMA', 'Kids: their age group, Cubs (4 to 6) or Lions (7 to 13)'] },
      { h: 'How to book', items: ['Fill out the form on allstarbjj.com, or call (908) 341-1131', 'Pick a date and time on the online calendar', 'The team reaches out to confirm your first class'] },
      { h: 'What to bring', p: 'Comfortable athletic clothes and a water bottle.' },
    ],
    faqs: [
      { q: 'Do I need experience for the trial?', a: 'No. Most students start at zero, and there is a structured beginner curriculum.' },
      { q: 'Can I watch a class first?', a: 'Yes. Call (908) 341-1131 to set it up. Booking first is best so the team is ready for you.' },
    ],
    learnMore: [{ href: '/trial/', label: 'Book your free trial' }, { href: '/adult-bjj/', label: 'Adult BJJ' }],
    related: ['bjj-cost-union-nj', 'what-to-bring-to-bjj', 'first-bjj-class'],
  },
  {
    slug: 'bjj-cost-union-nj',
    navLabel: 'How much does BJJ cost in Union, NJ?',
    title: 'How Much Does BJJ Cost in Union, NJ? | AllStar',
    description: 'AllStar memberships run $179 to $249 a month depending on the program. Start with a free 2-week trial, no card and no contract.',
    q: 'How much does BJJ cost in Union, NJ?',
    a: 'AllStar Martial Arts memberships run $179 to $249 a month depending on the program. The team goes over exact options in person after your free trial. The trial itself is 2 weeks of unlimited classes, free, with no credit card and no contract.',
    sections: [
      { h: 'How to get exact numbers', p: 'Try the free trial first. Afterward the team explains the options that fit your goals. You can also call (908) 341-1131.' },
      { h: 'Uniforms and gear', p: 'You do not need a gi for the trial. The team will tell you about uniforms after.' },
    ],
    faqs: [
      { q: 'Is the trial really free?', a: 'Yes. It is 2 weeks of unlimited classes with no credit card and no contract.' },
    ],
    learnMore: [{ href: '/trial/', label: 'Book your free trial' }, { href: '/adult-bjj/', label: 'Adult BJJ' }],
    related: ['free-trial', 'what-to-bring-to-bjj', 'bjj-for-beginners'],
  },
  {
    slug: 'kids-bjj-classes',
    navLabel: 'Kids BJJ: Cubs and Lions',
    title: 'Kids BJJ in Union, NJ: Cubs (4-6), Lions (7-13)',
    description: 'AllStar kids programs in Union, NJ: Cubs for ages 4 to 6 and Lions for ages 7 to 13. Free 2-week trial, no contract, parents watch from the lobby.',
    q: 'What kids BJJ classes does AllStar offer?',
    a: 'AllStar Martial Arts in Union, NJ offers two kids programs. Cubs is for ages 4 to 6, with games, listening skills and intro grappling. Lions is for ages 7 to 13, with real BJJ technique taught safely. There is no striking in either program. Both start with a free trial.',
    sections: [
      { h: 'Cubs, ages 4 to 6', items: ['Bow in, warm-up games, one technique, a mat game, bow out', 'About 30 to 40 minutes', 'No striking and no rough rolling', 'Kids move up to Lions at age 7'] },
      { h: 'Lions, ages 7 to 13', items: ['Takedowns, escapes, positions and submissions taught safely', 'About 45 to 60 minutes', 'Controlled, supervised rolling; coaches decide when a kid is ready for more', 'Belts: white, grey, yellow, orange, green, then adult ranks'] },
      { h: 'Class times', p: 'Kids classes run weekday afternoons and Saturday mornings. Times change by session, so the team confirms your child\'s exact class when you book.' },
      { h: 'Parents', p: 'Parents can watch from the lobby. Free on-site parking is available for drop-off and pick-up.' },
    ],
    faqs: [
      { q: 'What if my child is shy or cries in the first class?', a: 'That is common. Try a few classes. Parents can stay in the lobby, and by class three or week two most kids settle in.' },
      { q: 'Can siblings train?', a: 'Yes. Many families have a Cubs kid and a Lions kid.' },
    ],
    learnMore: [{ href: '/kids/', label: 'Kids martial arts' }, { href: '/preschool/', label: 'Cubs preschool program' }, { href: '/kids-bjj/', label: 'Lions kids BJJ' }],
    related: ['free-trial', 'what-to-bring-to-bjj', 'where-is-allstar-martial-arts'],
  },
  {
    slug: 'what-to-bring-to-bjj',
    navLabel: 'What should I bring to my first class?',
    title: 'What to Bring to Your First BJJ Class | AllStar',
    description: 'For your free BJJ trial at AllStar in Union, NJ, bring comfortable athletic clothes and a water bottle. A gi and gear are provided during the trial.',
    q: 'What should I bring to my first BJJ class?',
    a: 'Bring comfortable athletic clothes and a water bottle. That is all. A gi and any gear you need are provided during the free trial at AllStar Martial Arts in Union, NJ. Kids need nothing extra for the trial either, and beginners are welcome.',
    sections: [
      { h: 'After the trial', p: 'A gi is needed for BJJ once you continue. The team will tell you about uniforms after your trial.' },
      { h: 'Muay Thai gear', p: 'Hand wraps and gloves are always used in Muay Thai. They are provided during the trial.' },
      { h: 'Getting there', p: 'There is a free on-site parking lot at 1166 West Chestnut St.' },
    ],
    faqs: [
      { q: 'Do I need to buy a gi before the trial?', a: 'No. You do not need one for the trial.' },
    ],
    learnMore: [{ href: '/trial/', label: 'Book your free trial' }, { href: '/adult-bjj/', label: 'Adult BJJ' }],
    related: ['first-bjj-class', 'free-trial', 'bjj-cost-union-nj'],
  },
  {
    slug: 'where-is-allstar-martial-arts',
    navLabel: 'Where is AllStar, and where do students come from?',
    title: 'AllStar Martial Arts Location, Hours & Towns Served',
    description: 'AllStar Martial Arts is at 1166 West Chestnut St, Union, NJ 07083, (908) 341-1131. See hours, parking and the towns our students come from.',
    q: 'Where is AllStar Martial Arts, and which towns do students come from?',
    a: 'AllStar Martial Arts is at 1166 West Chestnut St, Union, NJ 07083, phone (908) 341-1131. It has one location, with free on-site parking. Students come from Union and across Union and Essex County, including Springfield, Cranford, Westfield, Maplewood and Millburn.',
    sections: [
      { h: 'Hours', items: ['Monday to Friday: 9:00 AM to 9:00 PM', 'Saturday: 9:00 AM to 1:00 PM', 'Sunday: closed'] },
      { h: 'Getting there', p: 'The gym is off Route 22. From Route 22, head south on West Chestnut. It is about 10 minutes off the Garden State Parkway.' },
      { h: 'Towns students come from', items: ['Union (in town)', 'Springfield, about 5 to 10 minutes', 'Roselle Park, about 6 minutes', 'Kenilworth, about 8 minutes', 'Cranford and Mountainside, about 10 minutes', 'Westfield and Millburn / Short Hills, about 12 minutes', 'Maplewood and Summit, about 15 minutes', 'Chatham and Livingston, about 18 minutes', 'Also Clark, Garwood, Linden, New Providence, Rahway, Scotch Plains and South Orange'] },
    ],
    faqs: [
      { q: 'Is there parking?', a: 'Yes. There is a free on-site lot, and kids drop-off and pick-up use the same lot.' },
      { q: 'Is it worth the drive if I do not live in Union?', a: 'Most students do not live in Union. Drive times from nearby towns run from about 5 to 18 minutes.' },
    ],
    learnMore: [{ href: '/union/', label: 'Martial arts in Union, NJ' }, { href: '/trial/', label: 'Book your free trial' }, { href: '/adult-bjj/', label: 'Adult BJJ' }],
    related: ['free-trial', 'coach-jamal-patterson', 'kids-bjj-classes'],
  },
  {
    slug: 'coach-jamal-patterson',
    navLabel: 'Who is Coach Jamal Patterson?',
    title: 'Who Is Coach Jamal Patterson? | AllStar Union NJ',
    description: 'Coach Jamal Patterson is the founder and head instructor of AllStar Martial Arts in Union, NJ: 4th-degree BJJ black belt under Renzo Gracie.',
    q: 'Who is Coach Jamal Patterson?',
    a: 'Jamal Patterson is the founder and head instructor of AllStar Martial Arts in Union, NJ. He is a 4th-degree Brazilian Jiu-Jitsu black belt under Renzo Gracie and an ADCC veteran. He is a former professional MMA fighter and has coached in Union since 2011.',
    sections: [
      { h: 'Background', items: ['Trained at the Renzo Gracie Academy in New York', 'ADCC veteran, the world championships of submission grappling', 'Former pro MMA fighter in the IFL and Bellator', 'UWC Light Heavyweight Champion', 'Wrestled at Blair Academy; played football and ran track at Colgate University'] },
      { h: 'Coaching', p: 'He has coached fighters from their first amateur fight into the UFC. His motto: coach first, salesperson never.' },
    ],
    faqs: [
      { q: 'How long has AllStar been open?', a: 'AllStar Martial Arts has been coaching in Union since 2011. It is family-owned and not a franchise.' },
    ],
    learnMore: [{ href: '/about-us/', label: 'About AllStar' }, { href: '/adult-bjj/', label: 'Adult BJJ' }],
    related: ['what-is-brazilian-jiu-jitsu', 'where-is-allstar-martial-arts', 'free-trial'],
  },
];

export const bySlug: Record<string, KItem> = Object.fromEntries(knowledge.map((k) => [k.slug, k]));
