# AllStar Martial Arts: Chatbot Knowledge Base

**Purpose:** This is the only source the website chatbot is allowed to answer from. If something is not in here, the bot says "I don't have that, but the team can tell you. Call (908) 341-1131 or book your free trial."

**Source:** Everything below comes from the allstarbjj.com site code (Astro repo), read on 2026-09-29. Nothing was added from outside the site. Page names in brackets show where each fact lives.

---

## NEEDS JAMAL TO CONFIRM (read this first)

The bot should NOT quote any item on this list until Jamal picks the right answer. Until then, the bot gives the safe fallback shown in each row.

| # | Topic | What the site says (and where) | Safe answer until confirmed |
|---|---|---|---|
| 1 | **Kids class times** (the big one) | [union.astro ~L361] Kids Mon–Fri 4:30 and 6:00 PM, Sat 10 and 11 AM. [kids/index.astro L20 FAQ] Lions "5pm and 6pm most weekdays" plus Saturday mornings. [cranford-after-school.astro L122–127] Cubs AND Lions 3:30, 4:00 and 5:00 PM weekdays. [springfield-case-study.astro L129, L142] Cubs Mon and Wed 4:30 PM plus Sat 10 AM; Lions Tue and Thu 4:30 PM plus Sat 11 AM. | "Kids classes run weekday afternoons and Saturday mornings. Times change by session, so the team confirms your child's exact class when you book." |
| 2 | **Closing time** | Footer and llms.txt say Mon–Fri 9 AM–9 PM. [short-hills-millburn.astro L12 FAQ] says "open until 8 PM most weeknights." | Use 9 PM (footer). Fix the Short Hills page. |
| 3 | **Student count** | llms.txt and trial/index.astro say "300+ students trained." about-us says "hundreds of adult students." | Don't quote a number. |
| 4 | **Pricing** | Range confirmed by Jamal 2026-09-30: $179–$249/month by program. Exact per-program prices still not published. union.astro FAQ: "depends on program and frequency... no long-term contracts." trial/index.astro calls the trial "$150+ value." | See the Pricing section. Don't quote "$150+". |
| 5 | **Google rating** | llms.txt: 4.6 stars (192 reviews). Schema: 4.6 (3 places). trial/index.astro shows "5★ Google rating." Testimonials.astro schema uses 4.8 and 5. | Don't quote a rating. Point people to the Google reviews. |
| 6 | **Years in business** | "Since 2011" (everywhere). about-us says "over the last 13 years" in one spot and "15 years" in another. trial page says "15+ years in Union." | "Since 2011." |
| 7 | **Gi price** | Kids: "about $60" (kids/index), "about $50" (preschool). Adults: "about $80–150" (adult-bjj, bjj-for-women). | "You don't need one for the trial. The team will tell you about uniforms after." |
| 8 | **Contracts and cancelling** | "No contract" on the trial (everywhere). union: "No long-term contracts required." about-us: "No 12-month contracts on the way in." schedule.astro: "Cancel Anytime." | Bot only says: the trial has no contract and no card. It says nothing about membership contract terms or cancelling. |
| 9 | **Class length** | Cubs: "30 minutes" (kids-bjj) vs "30–40 minutes" (preschool, cranford-after-school). Lions: "45–60 min" (preschool), "45–50 min" (cranford-after-school), about 55 min by the class outline (kids/index). | Cubs "about 30–40 minutes." Lions "about 45–60 minutes." |
| 10 | **Kids sparring** | kids-bjj: Lions do "controlled live sparring." springfield-case-study: "no sparring until they're ready." preschool: Lions do "positional rolling, light sparring." | "Lions do controlled, supervised rolling. Coaches decide when a kid is ready for more." |
| 11 | **Summer camp** | Ages 4–12 (page title, FAQ) vs 4–13 (service schema on same page). No dates, hours, price or registration details. Page says "all-day" in schema only. | "Camp is for kids about 4–12. Call (908) 341-1131 for dates, hours and signup." |
| 12 | **Adult schedule by program** | Adult classes Mon–Fri 6, 7 and 8 PM and Sat 10 AM and 12 PM [union.astro]. The site never says which program runs at which time (BJJ vs Muay Thai vs MMA). | Give the general times, then "the team confirms which class fits you." |
| 13 | **Is Self-Defense its own class?** | It's in the lead form dropdown and has its own page, but its FAQ says "Adult BJJ classes cover both." No separate booking link. | "Self-defense is taught through our adult BJJ program." |
| 14 | **Kickboxing vs Muay Thai** | kickboxing.astro says "What we teach is Muay Thai." It's not a separate booking option. | "Our kickboxing is Muay Thai." Book them into Muay Thai. |
| 15 | **Lineage chain** | about-us and adult-bjj show "Helio Gracie → Carlos Gracie → Rolls Gracie → Renzo → Jamal." Jamal should double-check this order before the bot repeats it. | Just say "black belt under Renzo Gracie." |
| 16 | **ADCC wording** | union.astro says "an ADCC medal." Everywhere else says "ADCC veteran/competitor." | "ADCC veteran." |
| 17 | **Other instructors** | union.astro: "Every instructor on staff has trained under Jamal." Trial FAQ mentions "Coach Jamal or a senior instructor." No other coach is named. The Muay Thai coach is never named. | Only name Jamal. |
| 18 | **"Only" / "headquarters" claims** | union.astro: "the only fully staffed location" and "headquarters" (suggests other locations exist). Muay Thai pages: "the only authentic Muay Thai program in Union County." | One location only: 1166 West Chestnut St. Don't say "only" about competitors. |
| 19 | **Walk-ins** | Several pages say "walk in any time" or "walk in during class times" to watch or start. Trial flow says book online, then the team texts to confirm. | "Booking first is best so we're ready for you. Call if you want to come watch." |
| 20 | **"Exclusive Web Special"** | LeadForm.astro header says "Gain Access To Our Exclusive Web Special." Nothing says what it is. | Bot never mentions it. |
| 21 | **Testimonials** | Pages use different named quotes (e.g., "Mike T." on union, "Mike R." on trial, "Sarah K." vs "Sarah M."). Can't tell which are real reviews. | Bot never quotes testimonials. |
| 22 | **Results promises** | Muay Thai: "Most adults drop 10–20 lbs in their first 12 weeks." Kickboxing: "600–1,000 calories per class." Self-defense: a 120-lb woman "can escape or control a 200+ pound attacker." | Bot does not repeat weight-loss or outcome numbers. |
| 23 | **Drive times** | towns.ts says Springfield is 6 minutes. springfield-case-study says 8 minutes. | "About 5–10 minutes." |
| 24 | **Towns list** | Footer lists 11 towns. Town pages also exist for Clark, Garwood, Linden, New Providence, Rahway, Scotch Plains, South Orange and Short Hills. Homepage FAQ names Scotch Plains. | Fine to list them all as "students come from." |
| 25 | **Trial consult** | Trial FAQ promises "a pre-class consultation with Coach Jamal or a senior instructor" and "Coach Jamal will reach out personally." | "The team will reach out to confirm your first class." |

---

## 1. Basics

- **Name:** AllStar Martial Arts (site also uses "All Star Martial Arts" and "AllStar BJJ")
- **Address:** 1166 West Chestnut St, Union, NJ 07083
- **Phone:** (908) 341-1131
- **Email:** info@allstarbjj.com
- **Website:** allstarbjj.com
- **Founded:** 2011, family-owned, not a franchise
- **Hours:** Mon–Fri 9:00 AM – 9:00 PM. Sat 9:00 AM – 1:00 PM. Sun closed.
- **Parking:** Free on-site lot. Drop-off and pick-up from the same lot. Adult class entry doesn't conflict with kids pickup.
- **Getting there:** Off Route 22. From Route 22, head south on West Chestnut. About 10 minutes off the Parkway. Google Maps directions: https://www.google.com/maps/dir/?api=1&destination=1166+West+Chestnut+St,+Union,+NJ+07083
- **Watching:** Parents can watch kids classes from the lobby.

## 2. Free Trial (the main thing the bot sells)

- **What it is:** 2 weeks of unlimited classes. Free.
- **No** credit card. **No** contract. No commitment. If it's not for you, you owe nothing.
- **Gear:** A gi and any gear needed are provided during the trial.
- **Who:** Adults can sample Adult BJJ, Muay Thai and MMA. Kids try their age group: Cubs (4–6) or Lions (7–13).
- **What to bring:** Comfy athletic clothes, a water bottle.
- **Beginners:** No experience needed. Most students start at zero.
- **How to book:**
  1. Fill out the form on allstarbjj.com (or the bot collects the info), or call (908) 341-1131.
  2. After the form, you go to the online calendar (/schedule/) to pick a date and time.
  3. The team texts to confirm your class time. Most people start within a few days.
- **Booking calendars by program** (Cal.com, account "allstarmartialarts"): Adult BJJ and Adult MMA share one trial calendar; Adult Muay Thai has its own; Lions has its own; Cubs has its own.

## 3. Programs

### Adult Brazilian Jiu-Jitsu (flagship)
- **Who:** Adults 16+. All levels. Beginners welcome. Women train in the same classes.
- **What it is:** Grappling. No striking. Leverage, position and submissions. Technique over strength.
- **Class (first 6 months, Fundamentals):** 10 min warm-up (shrimping, rolls), 35 min technique with a partner, 15 min live rolling at controlled intensity. After about 6 months you can join general classes with open rolling. Beginners are paired with experienced partners who "guide rather than test."
- **Schedule:** Weekday evenings at 6, 7 and 8 PM, plus Saturday mornings. (See Confirm #12.)
- **Gear:** Nothing for the trial. A gi is needed after. (Price: see Confirm #7.)
- **Competing:** Optional. Most adults never compete.
- **Page:** /adult-bjj/

### Adult Muay Thai (also sold as "Kickboxing")
- **Who:** Adults 16+. Beginners welcome. Many students over 45.
- **What it is:** Striking with fists, elbows, knees and shins, plus the clinch. Pad work and conditioning. AllStar's "kickboxing" is Muay Thai.
- **Class:** Warm-up 10–15 min (jump rope, shadowboxing), technique 20–30 min, pad work 15–20 min, conditioning and cooldown 5–10 min.
- **Sparring:** No sparring the first 6 months. Only if you want to after that. Most adults never spar.
- **First 90 days:** Stance and footwork, jab and cross, round kicks, teep, clinch entries, pad-holding.
- **Schedule:** Weekday evenings. (See Confirm #12.)
- **Gear:** Hand wraps and gloves (always). Provided during trial.
- **Pages:** /adult-muay-thai/, /kickboxing/

### Adult MMA
- **Who:** Adults 16+. Beginners welcome. No wrestling background needed.
- **What it is:** BJJ, Muay Thai and wrestling combined. Classes connect clinch to takedown to ground.
- **Suggested path:** Year 1 build a BJJ base (2–3 BJJ + 1 Muay Thai a week). Year 2 add Muay Thai (2 + 2). Year 3+ add MMA classes. Some go faster or slower.
- **Sparring:** Not for months, and you can opt out.
- **Competing:** Optional. For people who want to compete, AllStar has taken fighters from first amateur match to pro and into the UFC.
- **Page:** /adult-mma/

### Self-Defense (through BJJ)
- **Who:** Adults 16+, any size or age. Non-competitive.
- **What it is:** Practical BJJ: escape bad positions first, then get on top, then control.
- **Roughly:** Months 1–2 escapes, months 2–4 top control, months 4–6 submissions.
- **Where it's taught:** Inside adult BJJ classes (see Confirm #13).
- **Page:** /self-defense/

### BJJ for Women
- There is **no separate women's class**. Women train in the same classes as men. Partners are paired carefully, especially for beginners. Women at every belt level train here. If you want to ease in slowly, the gym can accommodate.
- **Page:** /bjj-for-women/

### BJJ Over 40
- Students in their 50s and 60s train here. Many started after 40. You set the pace. No hard rolling for new students.
- 2–3 classes a week is suggested for adults over 40.
- **Page:** /bjj-over-40/

### Lions: Kids BJJ (ages 7–13)
- **What it is:** Real BJJ for kids. Takedowns, escapes, positions, and submissions taught safely. No striking. De-escalation and bully prevention are built in.
- **Class:** Warm-up 10 min, technique 20 min, live positional rounds 15 min, game and cooldown 10 min.
- **Belts:** White, grey, yellow, orange, green, then adult ranks. Earned through attendance and technique.
- **Schedule:** Weekday afternoons/evenings and Saturday mornings. (Exact times: see Confirm #1.)
- **Gear:** Nothing for the trial. A gi after they commit (price: Confirm #7).
- **Pages:** /kids/, /kids-bjj/

### Cubs: Preschool Martial Arts (ages 4–6)
- **What it is:** First martial arts experience. Games, coordination, listening, confidence, intro grappling. No striking, no rough rolling.
- **Class (same every time):** Bow in, warm-up games, one technique, mat game, bow out. About 30–40 minutes.
- **Belts:** Stripes on a white belt. At age 7 they move up to Lions.
- **Schedule:** Weekday afternoons and Saturday mornings. (Exact times: see Confirm #1.)
- **Parents:** Welcome to stay and watch from the lobby.
- **Page:** /preschool/

### After-School (Cubs and Lions)
- Cubs and Lions classes run after school and early evening. Kids ages 4–13.
- **Page:** /after-school/

### Summer Camp
- Kids about 4–12 (see Confirm #11). Cubs (4–6) and Lions (7–12) in separate groups.
- Day includes: warm-up, BJJ or Muay Thai basics, games, and a life-skills segment.
- Bring: comfy clothes, sneakers, water bottle, lunch or snack. Loaner gear provided.
- Small groups. Trial day possible: call (908) 341-1131.
- Kids with special needs or sensory sensitivities: call before registering.
- Spots fill in spring.
- **Page:** /summer-camp/

## 4. The Instructor

**Jamal "The Suit" Patterson**, Founder and Head Instructor
- 4th-degree Brazilian Jiu-Jitsu black belt under Renzo Gracie (trained at the Renzo Gracie Academy in New York)
- ADCC veteran (the world championships of submission grappling)
- Former pro MMA fighter: IFL and Bellator. UWC Light Heavyweight Champion.
- Has coached fighters from their first amateur fight into the UFC
- Wrestled at Blair Academy; played football and ran track at Colgate University
- Coaching in Union since 2011
- Motto on the site: "coach first, salesperson never"

## 5. Towns Served

The only location is in Union. Students come from Union and Essex County, including:

| Town | Approx. drive |
|---|---|
| Union | In town |
| Springfield | ~6 min via Morris Ave |
| Roselle Park | ~6 min via Westfield Ave |
| Kenilworth | ~8 min via Boulevard |
| Cranford | ~10 min via Garden State Parkway |
| Mountainside | ~10 min via Route 22 |
| Westfield | ~12 min via Mountain Ave |
| Millburn / Short Hills | ~12 min via Vauxhall Rd |
| Maplewood | ~15 min via Springfield Ave |
| Summit | ~15 min via Route 24 |
| Chatham | ~18 min via Route 24 west |
| Livingston | ~18 min via Eisenhower Pkwy |

Also has pages for: Clark, Garwood, Linden, New Providence, Rahway, Scotch Plains, South Orange (no drive times listed).

## 6. FAQs (deduplicated, best answer)

**Do I need experience?** No. Most adults and kids start at zero. There's a structured beginner curriculum and new people start every week.

**Am I too old / out of shape?** No. Students in their 50s and 60s train here. BJJ rewards technique over strength. You get in shape by training; you set the pace.

**Will I get hurt?** Every sport has some risk. The gym controls intensity, doesn't put new students in hard rolling or sparring, and uses proper gear. BJJ has no striking, and tapping stops the action immediately.

**Do I have to spar or compete?** No. No sparring in your first 6 months of Muay Thai or MMA, and it's optional after. Most adults never compete.

**Can I train more than one program?** Yes. Many students cross-train BJJ and Muay Thai. The trial covers all adult programs.

**Can I watch a class first?** Yes. Call (908) 341-1131 to set it up. Kids' parents can watch from the lobby.

**Are women welcome? Is it safe training with men?** Yes. Women train in every program. Partners are paired carefully and the culture is respectful.

**What's the difference between Cubs and Lions?** Cubs (4–6) is game-based, shorter classes, one move per class. Lions (7–13) is real BJJ technique with 2–3 techniques per class and controlled rolling. Cubs move up at age 7.

**My kid is shy / high-energy / on the spectrum. Is that okay?** Yes. The gym works with every kind of kid. Consistent structure and patient coaches help. For camp, call first to talk it through.

**Will BJJ make my kid aggressive?** No. Kids get calmer and more confident, and they learn when *not* to use what they learn.

**What if my kid doesn't like the first class or cries?** Common. Try a few classes. Parents can stay in the lobby. By class three or week two, most kids settle in.

**Can siblings train?** Yes. Many families have a Cubs kid and a Lions kid.

**How is BJJ different from karate or Tae Kwon Do?** BJJ is grappling, not striking. It's about leverage, position and control.

**How is Muay Thai different from kickboxing?** Muay Thai adds elbows, knees and the clinch. AllStar's kickboxing classes are Muay Thai.

**Is there parking?** Yes, a free on-site lot.

**I don't live in Union. Is it worth it?** Most students don't live in Union. See Towns Served.

**How do I start?** Book the free 2-week trial on the site or call (908) 341-1131. The team texts to confirm your first class.

## 7. Pricing Policy (what the bot says)

Jamal (2026-09-30): memberships run **$179 to $249 per month depending on the program**. That range is now published on /adult-bjj/ and in the site's schema. The bot may quote the range but must not quote an exact price for a specific program, a discount, or the "$150 value."

**Script:** "Memberships run $179 to $249 a month depending on the program, and the team goes over exact options in person after your free trial. The trial itself is 2 weeks free: no card, no contract. Want me to get you booked?"

If they push for an exact number: "I don't want to give you a wrong number. I can have someone from the team text or call you with details. What's the best number?" (Then collect contact info with the SMS consent line.)

## 8. The Bot Must NOT

1. Quote an exact per-program price, discounts, "web specials," or the "$150+ value." (The $179 to $249/month range is OK.)
2. Promise membership terms (contract length, cancellation, freezes, refunds).
3. Give exact class times for kids (until Confirm #1 is fixed). For adults, give general times and say the team confirms.
4. Quote a rating, review count, student count or years other than "since 2011."
5. Promise results (weight loss, calories, "defend yourself in X months," "bully-proof").
6. Give medical, injury or health advice. It says "check with your doctor" and offers to connect them to the team.
7. Name any coach except Jamal, or claim Jamal will personally call.
8. Say AllStar has other locations or is the "only" gym for anything.
9. Quote testimonials or share any member's information.
10. Pretend to be a person. If asked, it says it's an AI assistant for AllStar.
11. Text anyone who hasn't agreed to the SMS consent language.
12. Answer questions unrelated to the gym. It politely steers back.
13. Handle complaints, injuries, billing disputes or cancellations. Those go straight to a human (call (908) 341-1131 or info@allstarbjj.com).
14. Make anything up. If it's not in this file: "I don't have that. The team can tell you. (908) 341-1131."


## Addendum (2026-09-30): Boxing and Wrestling
Jamal confirms AllStar offers **Boxing** and **Wrestling**, but they are **not on the full class schedule yet**. The bot may say they're offered, must NOT give class times for them, and should say "the team can tell you when those sessions run" and offer the free trial or a callback.
