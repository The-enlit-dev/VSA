/**
 * Academy details used across the site.
 *
 * Details marked `confirmed: true` were checked against the academy's own
 * Wix site (attharvaagarwal20.wixsite.com/vsa-karate). Details still marked
 * `confirmed: false` came from elsewhere and carry a `source`. Work through
 * CONTENT-CHECKLIST.md, then correct them or change `confirmed` to `true`.
 */
import { fact, type Fact } from '../lib/review'

export const academy = {
  name: 'Vishwa Sports Academy',
  shortName: 'VSA',
  discipline: 'Karate',
  president: 'Sensei Preetam Ichake',
  /** One-line description used in metadata and the footer. */
  tagline: 'Karate training at Vishwa Sports Academy, led by Sensei Preetam Ichake.',
  /** The academy's own line, from its Wix site's business info. */
  motto: 'Empower yourself with VSA Karate! Unleash your inner strength.',
  area: fact('Pimpri-Chinchwad, Maharashtra', true, 'Wix site business info'),
} as const

/** People named on the academy's site as the contact for enquiries. */
export const contactPerson = {
  name: 'Mr. Sanket Shewale',
  /** Shown next to the name, e.g. "Call Mr. Sanket Shewale". */
  role: 'Class enquiries',
  source: 'Wix blog post “Kickstart Your Karate Journey with Vishwa Sports Academy!” (Jan 2025)',
}

/**
 * Contact details. Leave a value empty ('') until it is confirmed: empty
 * phone numbers and emails are never rendered as links.
 */
export const contact: {
  /** International format, digits only after the +, e.g. '+919876543210'. */
  phone: Fact
  /** Usually the same as `phone`. Powers every WhatsApp button. */
  whatsapp: Fact
  email: Fact
  /** Shown in review mode next to the email placeholder. */
  emailNote: string
} = {
  phone: fact('+91 88051 48722', true, contactPerson.source),
  whatsapp: fact(
    '+91 88051 48722',
    false,
    'Same number as the phone. Confirm it is on WhatsApp before launch.',
  ),
  email: fact(
    '',
    false,
    'The Wix site’s business info only holds the template placeholder info@mysite.com. The emails shown on the Wix pages could not be read through the Wix API.',
  ),
  emailNote:
    'The Wix site’s pages show two different email addresses, and its business info only has the template placeholder. Confirm which address the academy checks before adding it here.',
}

/** Message prefilled in every WhatsApp chat started from the site. */
export const whatsappMessage =
  'Hello Vishwa Sports Academy, I would like to know more about your karate classes.'

export interface SocialLink {
  label: string
  url: string
  handle: string
  confirmed: boolean
  source?: string
}

export const socials: SocialLink[] = [
  {
    label: 'Instagram',
    url: 'https://www.instagram.com/vishwasports/',
    handle: '@vishwasports',
    confirmed: false,
    source: 'Found by web search; not linked from a source we could check.',
  },
]

export interface Location {
  name: string
  address: string
  /** Optional Google Maps link. */
  mapUrl?: string
  /** Short extra line, e.g. when a batch started. */
  note?: string
  confirmed: boolean
  source?: string
}

export const locations: Location[] = [
  {
    name: 'Aundh',
    address: 'EuroKids Preschool, Aundh, Pune',
    note: 'Batch launched in February 2025',
    confirmed: true,
    source: contactPerson.source,
  },
  {
    name: 'Yamunanagar, Nigdi',
    address: 'Near Minatai Thakrey Skating Hall, Yamunanagar, Nigdi, Pimpri-Chinchwad',
    confirmed: false,
    source:
      'Justdial lists a “Yamunanagar DoJo”. The Wix site confirms only that Vishwa Cup 4 was held at Minatai Thakrey Skating Hall.',
  },
  {
    name: 'Chikhali',
    address: 'Sonawane Wasti Road, More Wasti, Chikhali, Pune, Maharashtra 412114',
    confirmed: false,
    source: 'Bookmyplayer and Justdial listings; not on the Wix site',
  },
]

export const nav = [
  { label: 'About', href: '/about/' },
  { label: 'Coaches', href: '/coaches/' },
  { label: 'Events', href: '/events/', title: 'Tournaments & belt exams' },
  { label: 'Gallery', href: '/gallery/' },
  { label: 'Blog', href: '/blog/' },
] as const

export const registerHref = '/register/'

/** Credit line in the footer. Set to '' to hide it. */
export const siteCredit = 'Website designed and built by Attharva Agarwal'
