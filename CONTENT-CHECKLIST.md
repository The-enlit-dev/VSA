# Content checklist — for the academy to confirm

## What has been verified, and how

The academy's Wix site (**Vsa Karate**, `attharvaagarwal20.wixsite.com/vsa-karate`)
was inspected **read-only** through the Wix connector on 30 October 2026.
Nothing on Wix was changed. The Wix API exposes the site's business info, blog
posts, forms, media library, store and bookings, but **not the text or images
of Classic Editor pages** (Home, About Us, Our Coaches, Gallery and so on).

| Wix source | What it confirmed | Used on the new site |
| --- | --- | --- |
| Business info | Business name "VSA Karate"; area **Pimpri-Chinchwad, Maharashtra**; motto "Empower yourself with VSA Karate! Unleash your inner strength." | Area (confirmed), motto on the About page |
| Business info | Email `info@mysite.com`, phone `123-456-7890` | **Not used.** These are Wix template placeholders. |
| Blog post, 21 Jan 2025 | New class at **EuroKids Preschool, Aundh** from 1 Feb 2025, Mon/Wed/Fri 6:30–7:30 pm, ages 4+; contact **Mr. Sanket Shewale, +91 88051 48722**; what the academy offers (national-medallist coaches, free demo week, tournament preparation, diet plans) | Classes section, Aundh location, phone contact, "What VSA offers", blog post |
| Blog post, 5 Dec 2024 | **Vishwa Cup 4**, 21–22 Dec 2024, Minatai Thakrey Skating Hall, Yamunanagar, Nigdi, hosted in affiliation with the **Traditional Shotokan and Sports Karate Organisation (TSSKO)** | Past event, About page, blog post |
| "Registration form" | Fields: name, email, phone, address, enrol?, days/times, gender, rating | Added "preferred days and times"; left out gender and home address as unnecessary |
| Media Manager, Stores, Bookings, CMS | No files, no products, no services, CMS not installed | Nothing to import |

Everything below is either still unverified (shown on the preview with a
yellow **To confirm** tag and hidden at launch) or missing. When an item is
done, update the file named in the right-hand column. Then set
`PUBLIC_CONTENT_REVIEW = "false"` in `netlify.toml`.

## 1. Contact details

| # | Item | Status | Where to edit |
| --- | --- | --- | --- |
| 1 | **Email address.** The Wix pages show two different addresses, which the API can't read, and the business info only has the placeholder `info@mysite.com`. Tell us which address the academy checks. | Missing | `src/data/site.ts` → `contact.email` |
| 2 | Phone **+91 88051 48722 (Mr. Sanket Shewale)**. Confirmed from the Wix blog. Is it still the right general number, or should another be listed? | Confirmed (Wix) | `contact.phone` |
| 3 | **WhatsApp:** is +91 88051 48722 on WhatsApp? WhatsApp buttons show only in the preview until confirmed. | To confirm | `contact.whatsapp` |
| 4 | **Instagram `@vishwasports`:** is this the academy's account? | From web search | `socials` |
| 5 | Any other social profiles (Facebook, YouTube) | Unknown | `socials` |
| 6 | Fix the template placeholders in the **Wix** business info too (optional, done by you in Wix, not by us) | — | Wix dashboard |

## 2. Academy facts

| # | Item | Status | Where to edit |
| --- | --- | --- | --- |
| 7 | Is the **Aundh** batch (EuroKids Preschool) still running, and are Mon/Wed/Fri 6:30–7:30 pm still the timings? | Confirmed for Feb 2025 | `src/data/training.ts`, `locations` |
| 8 | **Yamunanagar, Nigdi** training location: Justdial lists a dojo there; Wix only confirms the Vishwa Cup venue | To confirm | `locations` |
| 9 | **Chikhali** location (Sonawane Wasti Road, More Wasti, 412114) | From listings | `locations` |
| 10 | **Full list of branches and batches** with timings. Listings disagree (15+ vs 30+ branches), so no number is shown. | Missing | `locations`, `programmes` |
| 11 | **Fees**, if they should be published | Missing | `programmes` |
| 12 | Is the **one-week free demo class** offered for all new students, or was it only for the Aundh launch? | Confirmed for Feb 2025 | `offers` in `training.ts` |
| 13 | The **About Us** page text from Wix (history, philosophy) | Not readable via API | `src/pages/about.astro` → `story` |
| 14 | Year founded (listings say January 2018 or 2022) | Conflicting | `src/pages/about.astro` |
| 15 | **Official logo** (SVG or large PNG). A temporary wordmark is in place. | Missing | `src/components/Logo.astro`, `public/favicon.svg` |
| 16 | Is VSA itself affiliated with **TSSKO**, or was that only for Vishwa Cup 4? | Partly confirmed | `src/pages/about.astro` |

## 3. Coaches

| # | Item | Status | Where to edit |
| --- | --- | --- | --- |
| 17 | Sensei Preetam Ichake: **"Chief Instructor, TSSKO Pimpri Chinchwad"** | From mydvc.in | `src/data/coaches.ts` |
| 18 | Sensei Ichake's **rank / dan grade**, **biography** and **portrait** (the Wix "Our Coaches" page isn't readable via the API) | Missing | `coaches.ts`, `src/assets/coaches/` |
| 19 | **Mr. Sanket Shewale:** confirmed as the class contact ("Sanket Sir"). Is he a coach? Role, rank, bio, photo. | Role to confirm | `coaches.ts` |
| 20 | **Other coaches** listed on the Wix "Our Coaches" page | Missing | `coaches.ts` |

## 4. Events

| # | Item | Source | Where to edit |
| --- | --- | --- | --- |
| 21 | Vishwa Cup 4, Dec 2024 | Confirmed (Wix) | — |
| 22 | Vishwa Cup 4 **results**, and any earlier Vishwa Cups (1–3) | Missing | `src/content/events/` |
| 23 | **2nd Maharashtra Champions Karate League, Feb 2020 — 29 medals.** Confirm the date and result. | Vishwa Kalyan School news page | `src/content/events/2020-02-…md` |
| 24 | The **next belt exam / tournament** (date, venue, eligibility, registration) | Missing | new file from `_template.md` |

## 5. Photos

The Wix Media Manager API returned **no files**. The photos sit on the Classic
Editor pages, which the API doesn't expose, and this environment can't reach
`static.wixstatic.com` to download them.

| # | Item | How to supply |
| --- | --- | --- |
| 25 | **Gallery and hero photos** from the Wix site: download them in the Wix Editor (select image → Settings → download), or allow `static.wixstatic.com` in this environment's network settings so they can be fetched directly | Add to `src/assets/gallery/`, list in `src/data/gallery.ts`; hero in `src/data/media.ts` |
| 26 | **Permission** to publish photos of students, especially children | — |
| 27 | Cover images for the two migrated blog posts (optional) | `src/content/blog/` `cover:` |

## 6. Launch

- [ ] Items 1 and 3 done, so visitors can email or WhatsApp the academy
- [ ] Netlify form detection on, with an email notification to the confirmed address (README → "Enquiry form")
- [ ] A test enquiry sent from the live site and received
- [ ] `PUBLIC_CONTENT_REVIEW = "false"` in `netlify.toml`, then redeploy
- [ ] Custom domain connected (optional), and the Wix site linked to the new one
