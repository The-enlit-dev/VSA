/**
 * Coach profiles, in the order they appear.
 *
 * To add a photo: put the image in src/assets/coaches/ (a portrait at least
 * 1200px tall works best), import it below and set `photo` and `photoAlt`.
 * Any field written with fact(..., false, source) shows a "To confirm" tag in
 * review mode and is hidden once review mode is off.
 */
import type { ImageMetadata } from 'astro'
import { fact, type Fact } from '../lib/review'

export interface Coach {
  id: string
  name: string
  /** Role at the academy. */
  role: Fact
  /** Rank, grade or other qualifications, one per line. */
  credentials: Fact[]
  /** Biography paragraphs. */
  bio: Fact[]
  photo?: ImageMetadata
  photoAlt?: string
  confirmed: boolean
}

export const coaches: Coach[] = [
  {
    id: 'preetam-ichake',
    name: 'Sensei Preetam Ichake',
    role: fact('President, Vishwa Sports Academy', true),
    credentials: [
      fact(
        'Chief Instructor, TSSKO (Traditional Shotokan and Sports Karate Organisation), Pimpri Chinchwad',
        false,
        'mydvc.in business profile. The Wix site confirms only that VSA hosted Vishwa Cup 4 in affiliation with TSSKO.',
      ),
      fact('Karate rank / dan grade', false, 'Not available in any source we could check'),
    ],
    bio: [
      fact(
        'Sensei Preetam Ichake is the president of Vishwa Sports Academy and leads its karate training.',
        true,
      ),
      fact(
        'A full biography — training background, years of teaching and achievements — is to be supplied by the academy.',
        false,
        'Placeholder: copy the biography from the Wix "Our Coaches" page or ask Sensei Ichake',
      ),
    ],
    confirmed: true,
  },
  {
    id: 'sanket-shewale',
    name: 'Sanket Shewale',
    role: fact(
      'Contact for classes and the Vishwa Cup',
      true,
      'Wix blog posts of Dec 2024 (“Sanket Sir”) and Jan 2025 (“Mr. Sanket Shewale”)',
    ),
    credentials: [fact('Coaching role and qualifications', false, 'Not stated on the Wix site')],
    bio: [
      fact(
        'Named on the academy’s site as the person to call about classes and about registration for Vishwa Cup 4.',
        true,
      ),
    ],
    // Shown only in review mode until the academy confirms his coaching role.
    confirmed: false,
  },
]
