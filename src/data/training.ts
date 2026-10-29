/**
 * Training content.
 *
 * `foundations` describes karate itself (not claims about the academy), so it
 * is always shown. `programmes` is the list of class options the academy
 * actually runs. It is empty until the academy confirms its batches: when it
 * is empty, the site asks visitors to enquire for current details instead.
 *
 * Example programme entry:
 *   {
 *     name: 'Junior batch',
 *     audience: 'Ages 6–12',
 *     schedule: 'Mon, Wed, Fri · 5:30–6:30 pm',
 *     location: 'Chikhali',
 *     description: 'Fundamentals, kata and belt preparation for younger students.',
 *   }
 */

export interface Programme {
  name: string
  audience?: string
  schedule?: string
  location?: string
  description: string
}

export const programmes: Programme[] = []

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
    description: 'Opportunities to compete, with upcoming tournaments listed as they are announced.',
    href: '/events/',
  },
] as const
