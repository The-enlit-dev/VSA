# Design notes: audit, direction and system

## 1. Audit of the existing Wix site

**Access.** The first pass couldn't reach the site at all: this build
environment's network policy blocks `wixsite.com` and `static.wixstatic.com`.
On 30 October 2026 the site was inspected **read-only through the Wix
connector**. That covered its business info, blog posts, registration form,
media library, store and bookings (see the table in
[CONTENT-CHECKLIST.md](CONTENT-CHECKLIST.md)). Nothing on Wix was changed.

What the inspection showed:

| Area | Finding |
| --- | --- |
| Navigation (from the brief) | Home · Register · Our Coaches · Gallery · Next Tournament / Belt Exam · About Us · Blog |
| Business info | "VSA Karate", Pimpri-Chinchwad; contact email and phone are still **Wix template placeholders** (`info@mysite.com`, `123-456-7890`) |
| Blog | 2 posts: the Aundh batch launch (Jan 2025) and Vishwa Cup 4 (Dec 2024). These hold the only verifiable class, contact and event details. |
| Registration | A Wix Form asking for name, email, phone, home address, gender, availability and a star rating |
| Installed but unused | Bookings (no services), Stores (no products), a Hotels app (template leftover), Chat |
| Not readable via API | The text and images of the Classic Editor pages, including the two conflicting email addresses |

Public listings (Instagram `@vishwasports`, Justdial, Bookmyplayer, mydvc.in,
a school news page) add further details, but some conflict with each other.
They are used only as clearly tagged, unconfirmed hints.

**What the new site keeps.** All seven sections of the original navigation:

| Wix page | New page |
| --- | --- |
| Home | `/` |
| Register | `/register/` (Register / Enquire), plus a CTA on every page |
| Our Coaches | `/coaches/` |
| Gallery | `/gallery/` |
| Next Tournament / Belt Exam | `/events/` (labelled "Events" in the nav, "Tournaments & belt exams" on the page) |
| About Us | `/about/` |
| Blog | `/blog/` |

**Weaknesses of the Wix build that this rebuild addresses.**

- Template placeholder contact details are still in the site's business info,
  so they can leak into search results and Wix-generated pages.
- The only class and event information is buried in blog posts; there is no
  structured classes or events page.
- The registration form asks for more than it needs (gender, home address,
  a star rating) and gives no feedback beyond Wix's defaults.
- Unused apps (Hotels, Stores, Bookings) add weight and confusion.
- Limited control over metadata, accessibility and performance, and content is
  locked in an editor rather than in versioned, reviewable files.

## 2. Direction

A martial-arts academy is about discipline, lineage and progression. The
design borrows from that rather than from generic "fitness" templates:

- **Typography carries the brand.** Archivo, a variable grotesk, set heavy
  and wide (`wdth` 112–125) in uppercase for headings. It is athletic without
  being aggressive. Outlined type ("Earned on the mat.") gives the hero
  contrast without needing a photo.
- **Kanji as structure, not decoration.** 空手道 (*karate-dō*, "the way of
  the empty hand") draws itself in the hero. 基本 / 形 / 組手 head the three
  foundations of training. Each inner page has one faint character
  (師 teacher, 試合 match, 写 picture, 記 record, 迷 lost). Only these
  characters are downloaded from the Japanese font.
- **One red circle.** A restrained nod to the rising-sun motif that runs
  through karate culture. It appears in the mark, the hero and the coach
  monogram, and is never used as a gradient or glow.
- **Rhythm through alternation.** Ink and paper sections alternate so long
  pages read as distinct chapters.
- **Honest by construction.** Unconfirmed facts are tagged. Placeholder photos
  say "PLACEHOLDER" in the image itself. Empty states explain what will appear
  rather than faking content.

## 3. Design system

All tokens live in `src/styles/global.css` under `:root`.

### Colour

| Token | Value | Use |
| --- | --- | --- |
| `--ink` / `-2` / `-3` / `-4` | `#0c0c0d` → `#26262a` | Dark backgrounds and surfaces |
| `--paper` / `-2` | `#f3f0ea` / `#e8e4dc` | Light sections (warm off-white, like a gi) |
| `--red` | `#c8102e` | Accent fills, rules, primary buttons (white text 5.9:1) |
| `--red-on-dark` | `#ff5a6a` | Red *text* on ink (5.6:1) |
| `--muted-on-dark` / `--muted-on-light` | `#a8a49c` / `#57534d` | Secondary text (7.6:1 / 6.9:1) |
| `--review` | `#f2b705` | "To confirm" tags (review mode only) |

The contextual tokens `--muted`, `--line` and `--accent-text` flip
automatically inside `.on-light` sections, so components work on either
background.

### Type

Fluid scale `--step--1` … `--step-5` (via `clamp()`), from 14px up to about 93px.
Utility classes: `.display` (hero/page titles), `.h2`, `.h3`, `.lead`,
`.eyebrow` (small caps label with a red rule), `.jp` (kanji).

### Space and layout

8px rhythm: `--s-1` (4px) … `--s-9` (96px). Sections use `--section`
(72–144px). Pages use `.container` (max width 1280px plus a fluid gutter).
Corners are nearly square (`--radius: 2px`), and borders are 1px hairlines.

### Components

| Component | Notes |
| --- | --- |
| Buttons | `.btn-primary` (red), `.btn-secondary` (outline that inverts on hover); 52px tall, uppercase, tracked. Arrow icons slide 4px on hover. |
| Text link | `.text-link`: uppercase, red underline rule |
| Header | Sticky; transparent over the hero, solid with blur after 24px of scroll. Desktop nav from 1040px; below that, a full-height menu with focus trap and Esc to close. |
| Section head | Eyebrow + large uppercase title, optional aside |
| Event card | Big date block, type + status badges, facts row, optional result and details |
| Coach feature | Editorial split: 4:5 portrait or monogram, name set huge, credentials list, bio. Alternates sides. |
| Gallery | Dense grid with tall/wide spans from aspect ratio; `<dialog>` lightbox |
| Enquiry form | Large fields; inline errors plus a focused error summary; explicit preview/sending/success/failure states |
| CTA band | Full-bleed red, white button, faint 道 |
| Empty state | `.empty`: bordered panel that says what will appear here |

### Motion

- Scroll reveal: 18px rise and fade, 800ms, `cubic-bezier(0.22, 1, 0.36, 1)`,
  staggered 90ms (`data-reveal`, `--reveal-i`).
- Hero: headline lines rise in sequence; kanji strokes draw (2.6s), then fill;
  the red circle settles.
- Hovers: 160–320ms colour and transform only.
- `prefers-reduced-motion: reduce` disables all of the above, and content is
  visible immediately.
