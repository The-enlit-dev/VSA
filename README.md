# Vishwa Sports Academy (VSA) — website

The website of Vishwa Sports Academy, a karate academy led by Sensei Preetam
Ichake. It rebuilds the academy's earlier Wix site.

Built with [Astro](https://astro.build) as a fully static site: plain HTML and
CSS, a few small scripts, no framework at runtime, no database and no paid
services. It deploys to Netlify's free tier.

- **[CONTENT-CHECKLIST.md](CONTENT-CHECKLIST.md)**: what the academy still
  needs to confirm or supply. **Start here.**
- **[DESIGN.md](DESIGN.md)**: audit, design direction and design system.

## Run locally

Requires Node 22.23.4+ (Netlify uses Node 24; see `netlify.toml`).

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # type-check + production build → dist/
npm test          # end-to-end checks against dist/ (see "Testing")
```

## Content review mode

Details that have not been confirmed by the academy are stored with
`confirmed: false`. The `PUBLIC_CONTENT_REVIEW` setting in `netlify.toml`
controls how they appear:

| `PUBLIC_CONTENT_REVIEW` | Unconfirmed details | Placeholder photos | Search engines |
| --- | --- | --- | --- |
| `"true"` (current) | Shown with a yellow **To confirm** tag | Shown, labelled | Asked not to index (`noindex`, `robots.txt` disallow) |
| `"false"` (launch) | Removed | Removed | Indexed; sitemap published |

Work through the checklist, mark items `confirmed: true`, then set it to
`"false"`.

## Editing content

| What | File |
| --- | --- |
| Name, area, phone, WhatsApp, email, social links, locations, nav | `src/data/site.ts` |
| Coaches (photos in `src/assets/coaches/`) | `src/data/coaches.ts` |
| Programmes / batches, training foundations | `src/data/training.ts` |
| Gallery photos (files in `src/assets/gallery/`) | `src/data/gallery.ts` |
| Hero photo | `src/data/media.ts` |
| Events: tournaments, belt exams | One Markdown file each in `src/content/events/`. Copy `_template.md`. |
| Blog posts | One Markdown file each in `src/content/blog/`. Copy `_example-post.md`. |
| About page story | `src/pages/about.astro` |
| Colours, type, spacing | `src/styles/global.css` (`:root`) |

**Events** sort themselves into *Upcoming* and *Past* by date when the site is
built. If an event finishes before the next deploy, a small script on the
events page moves it to *Past* in the visitor's browser. To keep the home page
current as well, add a Netlify **build hook** and trigger it weekly (any free
cron service can call the hook URL).

**Photos.** Astro resizes, compresses (WebP) and lazy-loads every image in
`src/assets/` automatically. Upload originals of at least 1600px and always
write an `alt` text that describes the scene. Only publish photos of students
with permission (from parents, for children).

**WhatsApp.** Set `contact.whatsapp` to a number like `+91 98xxx xxxxx` and
`confirmed: true`. Every WhatsApp button appears, opening a chat prefilled
with `whatsappMessage`. Empty numbers are never rendered as links.

## Enquiry form (Netlify Forms)

The form on `/register/` uses [Netlify Forms](https://docs.netlify.com/forms/setup/)
(free: 100 submissions/month). There are no API keys or server code.

1. After the first deploy, open **Site configuration → Forms** in Netlify,
   click **Enable form detection**, and redeploy.
2. Submissions appear under **Forms → enquiry**. Add an email notification
   under **Forms → Form notifications** to send each one to the academy.
3. Spam protection: a hidden honeypot field plus Netlify's built-in filtering.

The form validates on the page (with an error summary), then posts to Netlify.
It shows **success only when Netlify accepts the submission**, and on failure
it keeps what the visitor typed and offers WhatsApp/phone if they are set.
Outside a Netlify build (`npm run dev`, `npm run preview`) it says it can't
send and sends nothing. Set `FORMS_LIVE=true` to override this. Without
JavaScript, the browser posts the form directly and Netlify redirects to
`/register/thanks/`.

Collected fields: who it's for, student's name and (optional) age,
parent/guardian name, phone, optional email, area, experience, contact
preference, message and consent. No dates of birth, addresses or ID numbers.

## Deploy to Netlify

1. Push this repository to GitHub.
2. In Netlify: **Add new site → Import an existing project**, then pick the
   repository. Build settings come from `netlify.toml` (`npm run build` →
   `dist`, Node 24).
3. Enable form detection (above).
4. Optional: add a custom domain. Canonical URLs, the sitemap and social
   images use Netlify's `URL` automatically; set `SITE_URL` to override.

## Testing

`npm test` serves `dist/` like Netlify does and uses Playwright + axe-core to
check:

- every page at 375px and 1440px: HTTP 200, no console errors or failed
  requests, all images load, no horizontal scroll, exactly one `<h1>`, title,
  description, absolute canonical and `og:image`;
- **WCAG 2.1 A/AA** with axe-core (no serious or critical violations);
- all internal links and in-page anchors, plus the custom 404;
- skip link, mobile menu (open, Escape, focus return, navigation);
- enquiry form: required fields, phone/email/age validation, guardian field
  toggle, error summary focus, the "can't send" preview state, failure (data
  kept) and success, and the submitted payload;
- gallery lightbox: open, image load, counter, arrow keys, wrap-around,
  Escape, focus return, category filter;
- reduced motion: animations off, all content visible.

Playwright isn't a project dependency. Install it globally
(`npm i -g playwright && npx playwright install chromium`) or point
`NODE_PATH` at an existing install. Set `TEST_URL` to test a deployed site
instead of `dist/`.

## Assets

- `public/favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`,
  `favicon-512.png`: icons (temporary mark; replace with the academy logo)
- `public/og-image.png`: 1200×630 social sharing image
- `scripts/render-assets.mjs`: re-renders the PNGs from
  `scripts/og-image.html` and `public/favicon.svg`
- `scripts/make-placeholders.mjs`: regenerates the labelled placeholder photos

## Project structure

```
src/
  components/   Header, Footer, Hero, EnquiryForm, Gallery, CoachFeature, EventCard, …
  content/      events/ and blog/ (Markdown)
  data/         site.ts, coaches.ts, training.ts, gallery.ts, media.ts
  layouts/      BaseLayout.astro (SEO, fonts, header/footer, reveal script)
  lib/          review.ts (confirmation logic), contact.ts, events.ts
  pages/        index, about, coaches, events/, gallery, blog/, register/, 404, robots.txt, sitemap.xml
  styles/       global.css (design tokens + shared components)
```
