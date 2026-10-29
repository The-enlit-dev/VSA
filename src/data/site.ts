/**
 * Academy details used across the site.
 *
 * Every detail that has not been confirmed by the academy has
 * `confirmed: false` and a `source`. Work through CONTENT-CHECKLIST.md, then
 * change `confirmed` to `true` (or correct the text) for each one.
 */
import { fact, type Fact } from '../lib/review'

export const academy = {
  name: 'Vishwa Sports Academy',
  shortName: 'VSA',
  discipline: 'Karate',
  president: 'Sensei Preetam Ichake',
  /** One-line description used in metadata and the footer. */
  tagline: 'Karate training at Vishwa Sports Academy, led by Sensei Preetam Ichake.',
  area: fact(
    'Pimpri-Chinchwad (PCMC), Pune',
    false,
    'Instagram profile @vishwasports and public business listings (Justdial, mydvc.in)',
  ),
} as const

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
  phone: fact('', false, 'Not found in any source available to us. Copy it from the Wix site.'),
  whatsapp: fact('', false, 'Use the academy phone number if it is on WhatsApp.'),
  email: fact('', false, 'The Wix site lists two different email addresses.'),
  emailNote:
    'The current Wix site shows two different email addresses. Confirm which one is monitored before adding it here.',
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
  confirmed: boolean
  source?: string
}

export const locations: Location[] = [
  {
    name: 'Chikhali',
    address: 'Sonawane Wasti Road, More Wasti, Chikhali, Pune, Maharashtra 412114',
    confirmed: false,
    source: 'Bookmyplayer and Justdial listings',
  },
  {
    name: 'Yamunanagar Dojo, Nigdi',
    address: 'Yamunanagar, Nigdi, Pune, Maharashtra',
    confirmed: false,
    source: 'Justdial listing ("Vishwa Sports Academy (Yamunanagar DoJo)")',
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
