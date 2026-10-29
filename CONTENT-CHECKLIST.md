# Content checklist — for the academy to confirm

The rebuild could not read the existing Wix site
(`attharvaagarwal20.wixsite.com/vsa-karate`): the build environment's network
policy blocked it, along with web.archive.org and Wix's image CDN. The site
therefore only states what was **certain**:

- the academy is **Vishwa Sports Academy (VSA)**, a karate academy;
- **Sensei Preetam Ichake** is its president;
- the academy runs **belt examinations** and **tournaments** (the old site has a
  "Next Tournament / Belt Exam" page);
- the old site has Register, Our Coaches, Gallery, About Us and Blog pages.

Everything else below either came from **third-party listings** found by web
search (shown on the preview site with a yellow **To confirm** tag) or is
**missing** and needs supplying. Nothing has been invented.

When an item is done, update the file named in the right-hand column. Then set
`PUBLIC_CONTENT_REVIEW = "false"` in `netlify.toml`, which removes every
remaining unconfirmed item and placeholder from the live site.

## 1. Contact details — needed before launch

| # | Item | Status | Where to edit |
| --- | --- | --- | --- |
| 1 | **Email address.** The Wix site shows **two different email addresses**. Confirm which one the academy checks, and remove the other from anywhere it is published. | Not added (conflict) | `src/data/site.ts` → `contact.email` |
| 2 | **Phone number** (international format, e.g. `+91 98xxx xxxxx`) | Not found | `contact.phone` |
| 3 | **WhatsApp number.** Is the phone number on WhatsApp? Every WhatsApp button appears once this is set. | Not found | `contact.whatsapp` |
| 4 | **Instagram:** `@vishwasports` (instagram.com/vishwasports). Is this the academy's account? | From web search | `socials` |
| 5 | Any other social profiles (Facebook, YouTube) | Unknown | `socials` |

## 2. Academy facts

| # | Item | Source | Where to edit |
| --- | --- | --- | --- |
| 6 | Based in **Pimpri-Chinchwad (PCMC), Pune** | Instagram bio, Justdial, mydvc.in | `academy.area` |
| 7 | **Chikhali** location: Sonawane Wasti Road, More Wasti, Chikhali, Pune 412114 | Bookmyplayer, Justdial | `locations` |
| 8 | **Yamunanagar Dojo, Nigdi** (exact address needed) | Justdial | `locations` |
| 9 | **Full list of branches.** Public listings disagree ("15+ branches" vs "30+ branches"), so no number is shown anywhere. | Conflicting | `locations` |
| 10 | Year founded. Listings disagree (January 2018 vs 2022), so it is not shown. | Conflicting | `src/pages/about.astro` |
| 11 | The academy's own **About Us** text: history, philosophy, approach | Missing | `src/pages/about.astro` → `story` |
| 12 | **Official logo** (SVG or high-resolution PNG). A temporary wordmark is used now. | Missing | `src/components/Logo.astro`, `public/favicon.svg` |
| 13 | Brand colours, if the academy has them (the site uses black, white and a karate red) | Unknown | `src/styles/global.css` `:root` |

## 3. Coaches

| # | Item | Source | Where to edit |
| --- | --- | --- | --- |
| 14 | Sensei Preetam Ichake: **"Chief Instructor, TSSKO Pimpri Chinchwad"** | mydvc.in profile | `src/data/coaches.ts` |
| 15 | Sensei Ichake's **rank / dan grade** and other qualifications | Missing | `src/data/coaches.ts` |
| 16 | Sensei Ichake's **biography** | Missing | `src/data/coaches.ts` |
| 17 | Sensei Ichake's **portrait photo** | Missing | `src/assets/coaches/` + `coaches.ts` |
| 18 | **Other coaches** on the Wix "Our Coaches" page: name, role, qualifications, photo, bio | Missing | `src/data/coaches.ts` |

## 4. Training

| # | Item | Where to edit |
| --- | --- | --- |
| 19 | **Programmes / batches**: names, age groups, days and times, locations | `src/data/training.ts` → `programmes` |
| 20 | **Fees**, if the academy wants them published (otherwise the site asks people to enquire) | `programmes[].description` |
| 21 | Karate **style** taught, and any **association** the academy belongs to (e.g. what TSSKO is) | `src/pages/about.astro` |
| 22 | Whether a **free trial class** is offered (not mentioned anywhere yet) | `src/components/CtaBand.astro` |

## 5. Events

| # | Item | Source | Where to edit |
| --- | --- | --- | --- |
| 23 | **2nd Maharashtra Champions Karate League, February 2020 — 29 medals.** Confirm the date and result. | News page of Vishwa Kalyan School | `src/content/events/2020-02-…md` → set `confirmed: true` |
| 24 | The **next belt exam / tournament** from the Wix "Next Tournament / Belt Exam" page (date, venue, eligibility, how to register) | Missing | new file in `src/content/events/` (copy `_template.md`) |
| 25 | Other past events and results worth listing | Missing | `src/content/events/` |

## 6. Photos

| # | Item | Where to add |
| --- | --- | --- |
| 26 | **Hero photo**: one wide, sharp action shot of the academy's own students or coaches | `src/assets/` + `src/data/media.ts` |
| 27 | **Gallery photos** from the Wix gallery: training, belt exams, tournaments, group photos. Replace the 8 labelled placeholders. | `src/assets/gallery/` + `src/data/gallery.ts` |
| 28 | **Permission** to publish photos of students, especially children (parents' consent) | — |

## 7. Blog

| # | Item | Where to add |
| --- | --- | --- |
| 29 | Posts from the Wix blog worth carrying over (title, date, text, photo) | `src/content/blog/` (copy `_example-post.md`) |

## 8. Launch

- [ ] Items 1–3 done, so the academy can be reached directly as well as through the form
- [ ] Netlify form detection enabled, with an email notification to the confirmed address (README → "Enquiry form")
- [ ] A test enquiry sent from the live site and received
- [ ] `PUBLIC_CONTENT_REVIEW = "false"` in `netlify.toml`, then redeploy
- [ ] Custom domain connected (optional), and the Wix site pointed or linked to the new one
