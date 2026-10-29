import { contact, socials, whatsappMessage } from '../data/site'
import { isVisible } from './review'

const digits = (value: string) => value.replace(/[^\d]/g, '')

/** A contact value is usable only when it is filled in and allowed in this build. */
const usable = (f: { text: string; confirmed: boolean }) => f.text.trim() !== '' && isVisible(f)

export const phone = usable(contact.phone)
  ? { display: contact.phone.text, href: `tel:+${digits(contact.phone.text)}` }
  : null

export const email = usable(contact.email)
  ? { display: contact.email.text, href: `mailto:${contact.email.text}` }
  : null

export const whatsappHref = (message = whatsappMessage) =>
  usable(contact.whatsapp)
    ? `https://wa.me/${digits(contact.whatsapp.text)}?text=${encodeURIComponent(message)}`
    : null

export const visibleSocials = socials.filter(isVisible)
