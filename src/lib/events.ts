import { getCollection, type CollectionEntry } from 'astro:content'
import { isVisible } from './review'

export type EventEntry = CollectionEntry<'events'>

export const eventTypeLabel: Record<EventEntry['data']['type'], string> = {
  tournament: 'Tournament',
  'belt-exam': 'Belt exam',
  seminar: 'Seminar',
  announcement: 'Announcement',
}

const dayFmt = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })

export function formatEventDate({ date, endDate, dateLabel }: EventEntry['data']) {
  if (dateLabel) return dateLabel
  if (!endDate || endDate.getTime() === date.getTime()) return dayFmt.format(date)
  return `${dayFmt.format(date)} – ${dayFmt.format(endDate)}`
}

/** Last day of the event as YYYY-MM-DD, used by the page script to re-sort after the build date. */
export const eventEndISO = ({ date, endDate }: EventEntry['data']) => (endDate ?? date).toISOString().slice(0, 10)

/**
 * Published events split into upcoming (soonest first) and past (most recent
 * first), relative to the build date. A small script on the page moves any
 * event that has finished since the last build into "Past".
 */
export async function getEvents() {
  const all = (await getCollection('events')).filter((e) => !e.data.draft && isVisible(e.data))
  const today = new Date().toISOString().slice(0, 10)
  const upcoming = all
    .filter((e) => eventEndISO(e.data) >= today)
    .sort((a, b) => a.data.date.getTime() - b.data.date.getTime())
  const past = all
    .filter((e) => eventEndISO(e.data) < today)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
  return { upcoming, past }
}
