/**
 * Content review mode.
 *
 * Anything on the site that has not been confirmed by the academy is stored
 * with `confirmed: false`. While review mode is on (the default), those items
 * are shown with a visible "To confirm" tag, placeholder photos are shown,
 * and the site asks search engines not to index it. With review mode off,
 * unconfirmed items and placeholders are left out of the build entirely.
 *
 * Turn it off by setting PUBLIC_CONTENT_REVIEW=false (see netlify.toml).
 */
export const REVIEW_MODE = import.meta.env.PUBLIC_CONTENT_REVIEW !== 'false'

/** A piece of content that may still need the academy's confirmation. */
export interface Fact {
  text: string
  confirmed: boolean
  /** Where an unconfirmed detail came from, so it can be checked. */
  source?: string
}

export const fact = (text: string, confirmed: boolean, source?: string): Fact => ({
  text,
  confirmed,
  source,
})

/** Whether an item should be rendered in this build. */
export const isVisible = (item: { confirmed?: boolean; placeholder?: boolean }) =>
  REVIEW_MODE || (item.confirmed !== false && !item.placeholder)

/** Whether an item should carry a "To confirm" tag. */
export const needsTag = (item: { confirmed?: boolean }) => REVIEW_MODE && item.confirmed === false

export const visible = <T extends { confirmed?: boolean; placeholder?: boolean }>(items: T[]) =>
  items.filter(isVisible)
