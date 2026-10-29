/**
 * Gallery photos, in display order.
 *
 * To add a photo:
 *   1. Put the image in src/assets/gallery/ (JPG or WebP, at least 1600px on
 *      the long edge). Astro resizes and compresses it automatically.
 *   2. Import it below and add an entry with an `alt` that describes what is
 *      in the photo (who is doing what), not just "karate".
 *   3. Remove the placeholder entries once real photos are in.
 *
 * Only use photos of the academy's own students, coaches and events, with
 * permission from the people pictured (and parents, for children).
 */
import type { ImageMetadata } from 'astro'
import training1 from '../assets/placeholders/training-1.jpg'
import training2 from '../assets/placeholders/training-2.jpg'
import training3 from '../assets/placeholders/training-3.jpg'
import events1 from '../assets/placeholders/events-1.jpg'
import competition1 from '../assets/placeholders/competition-1.jpg'
import competition2 from '../assets/placeholders/competition-2.jpg'
import life1 from '../assets/placeholders/life-1.jpg'
import life2 from '../assets/placeholders/life-2.jpg'

export const categories = {
  training: 'Training',
  events: 'Belt exams & events',
  competitions: 'Competitions',
  life: 'Academy life',
} as const

export type Category = keyof typeof categories

export interface Photo {
  src: ImageMetadata
  alt: string
  caption?: string
  category: Category
  /** Placeholder images are only shown in review mode. */
  placeholder?: boolean
}

export const photos: Photo[] = [
  { src: training1, alt: 'Placeholder for a photo of a training session', caption: 'Training session', category: 'training', placeholder: true },
  { src: training2, alt: 'Placeholder for a photo of kata practice', caption: 'Kata practice', category: 'training', placeholder: true },
  { src: events1, alt: 'Placeholder for a photo of a belt examination', caption: 'Belt examination', category: 'events', placeholder: true },
  { src: competition1, alt: 'Placeholder for a photo from a tournament', caption: 'Tournament day', category: 'competitions', placeholder: true },
  { src: competition2, alt: 'Placeholder for a photo of a medal presentation', caption: 'Medal presentation', category: 'competitions', placeholder: true },
  { src: life1, alt: 'Placeholder for an academy group photo', caption: 'Academy group photo', category: 'life', placeholder: true },
  { src: training3, alt: 'Placeholder for a photo of kumite drills', caption: 'Kumite drills', category: 'training', placeholder: true },
  { src: life2, alt: 'Placeholder for a photo of students and coaches', caption: 'Students and coaches', category: 'life', placeholder: true },
]
