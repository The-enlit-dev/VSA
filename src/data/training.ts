/**
 * Training content.
 *
 * `foundations` describes karate itself (not claims about the academy), so it
 * is always shown. `programmes` lists class options the academy has published;
 * `offers` lists what the academy says its training includes. Both come from
 * the academy's own Wix site (blog post of 21 Jan 2025).
 */

export interface Programme {
  name: string
  audience?: string
  schedule?: string
  location?: string
  description: string
  /** Shown under the details, e.g. when timings may have changed. */
  note?: string
}

export const programmes: Programme[] = [
  {
    name: 'Karate class, Aundh',
    audience: 'Ages 4 and above · beginners and experienced students',
    schedule: 'Monday, Wednesday, Friday · 6:30–7:30 pm',
    location: 'EuroKids Preschool, Aundh',
    description:
      'A batch for self-defence, fitness or competitive training, focused on overall physical and mental development.',
    note: 'Timings as announced for the batch launch on 1 February 2025. Ask the academy for the current schedule.',
  },
]

/** What the academy says its programme offers (its own words, lightly edited). */
export const offers = [
  {
    title: 'Experienced coaches',
    text: 'A professional karate club and training programme with experienced, national-medallist coaches.',
  },
  {
    title: 'A free demo week',
    text: 'New batches have opened with a one-week free demo class, to see whether the training is the right fit.',
  },
  {
    title: 'Tournament preparation',
    text: 'Students are prepared for district, state, national and international tournaments.',
  },
  {
    title: 'Fitness and focus',
    text: 'Drills for agility, endurance, speed and focus that build immunity and self-confidence.',
  },
  {
    title: 'Diet guidance',
    text: 'Personalised diet plans to help students maintain a strong, healthy BMI.',
  },
  {
    title: 'Ages 4 and up',
    text: 'Training for students of all ages from 4 years, whether for self-defence, fitness or competition.',
  },
] as const

export const foundations = [
  {
    term: 'Kihon',
    kanji: '基本',
    meaning: 'Basics',
    description:
      'Stances, blocks, punches and kicks, repeated until they become precise and instinctive.',
  },
  {
    term: 'Kata',
    kanji: '形',
    meaning: 'Forms',
    description:
      'Set sequences of movements performed against imagined opponents, building rhythm, balance and control.',
  },
  {
    term: 'Kumite',
    kanji: '組手',
    meaning: 'Sparring',
    description:
      'Applying technique with a partner, with timing, distance and respect for the person opposite.',
  },
] as const

/** Verified parts of the academy's training pathway (from the existing site's pages). */
export const pathway = [
  {
    title: 'Regular training',
    description: 'Classes guided by the academy’s coaches, led by Sensei Preetam Ichake.',
  },
  {
    title: 'Belt examinations',
    description: 'Students are graded through belt exams, announced on the events page.',
    href: '/events/',
  },
  {
    title: 'Tournaments',
    description: 'Preparation for district, state, national and international tournaments, including the academy’s own Vishwa Cup.',
    href: '/events/',
  },
] as const
