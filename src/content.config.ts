import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

/**
 * Events: tournaments, belt examinations and other announcements.
 * One Markdown file per event in src/content/events/. Files starting with an
 * underscore (like _template.md) are ignored.
 */
const events = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    type: z.enum(['tournament', 'belt-exam', 'seminar', 'announcement']),
    /** Start date, YYYY-MM-DD. */
    date: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    /** Overrides the formatted date, e.g. "February 2020" when the day is unknown. */
    dateLabel: z.string().optional(),
    time: z.string().optional(),
    venue: z.string().optional(),
    summary: z.string(),
    /** Link for registration or more details (optional). */
    link: z.url().optional(),
    linkLabel: z.string().optional(),
    /** For past events: a short, verified result. */
    result: z.string().optional(),
    confirmed: z.boolean().default(true),
    source: z.string().optional(),
    draft: z.boolean().default(false),
  }),
})

/**
 * Blog posts: one Markdown file per post in src/content/blog/. Posts with
 * `draft: true` (like example-post.md) are never published.
 */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      author: z.string().default('Vishwa Sports Academy'),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      draft: z.boolean().default(false),
    }),
})

export const collections = { events, blog }
