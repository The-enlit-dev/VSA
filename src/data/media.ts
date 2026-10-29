/**
 * Site-wide photography.
 *
 * Hero photo: put a wide, high-quality action shot of the academy's own
 * students or coaches in src/assets/ (at least 2400px wide), then:
 *
 *   import heroImage from '../assets/hero.jpg'
 *   export const heroPhoto = { src: heroImage, alt: 'Describe the photo' }
 *
 * Until then the hero uses a typographic design.
 */
import type { ImageMetadata } from 'astro'

export const heroPhoto: { src: ImageMetadata; alt: string } | undefined = undefined
