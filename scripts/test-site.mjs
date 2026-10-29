/**
 * End-to-end checks against the built site.
 *
 *   npm run build && npm test
 *
 * Serves dist/ the way Netlify does (directory indexes, custom 404), then uses Playwright (with Chromium) to check every
 * page at phone and desktop sizes: console errors, broken links and images,
 * horizontal overflow, SEO tags, WCAG A/AA issues (axe-core), the mobile menu,
 * the enquiry form (validation, success, failure, preview mode) and the
 * gallery lightbox.
 *
 * Playwright is not a project dependency: install it globally
 * (`npm i -g playwright && npx playwright install chromium`) or set NODE_PATH.
 */
import { createServer } from 'node:http'
import { createRequire } from 'node:module'
import { existsSync, readFileSync, statSync } from 'node:fs'
import { extname, join, normalize } from 'node:path'

const require = createRequire(import.meta.url)
const { chromium } = require('playwright')
const axeSource = readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8')

// Set TEST_URL to test a server that is already running (e.g. a Netlify deploy preview).
const PORT = 4329
const BASE = (process.env.TEST_URL || `http://localhost:${PORT}`).replace(/\/$/, '')
const PAGES = ['/', '/about/', '/coaches/', '/events/', '/gallery/', '/blog/', '/register/', '/register/thanks/']

let failures = 0
const fail = (msg) => {
  failures++
  console.log(`  ✗ ${msg}`)
}
const ok = (msg) => console.log(`  ✓ ${msg}`)
const check = (cond, msg) => (cond ? ok(msg) : fail(msg))

// ---------------------------------------------------------------- server
const DIST = new URL('../dist/', import.meta.url).pathname
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.xml': 'application/xml', '.txt': 'text/plain' }
let server = null
if (!process.env.TEST_URL) {
  if (!existsSync(join(DIST, 'index.html'))) {
    console.error('No build found. Run `npm run build` first.')
    process.exit(1)
  }
  server = createServer((req, res) => {
    const path = normalize(decodeURIComponent(new URL(req.url, BASE).pathname)).replace(/^(\.\.[/\\])+/, '')
    let file = join(DIST, path)
    if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html')
    if (req.method === 'POST' || !existsSync(file)) {
      res.writeHead(404, { 'Content-Type': TYPES['.html'] })
      return res.end(readFileSync(join(DIST, '404.html')))
    }
    res.writeHead(200, { 'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream' })
    res.end(readFileSync(file))
  }).listen(PORT)
}
const stop = () => server?.close()

const browser = await chromium.launch()

// ---------------------------------------------------------------- pages
const linkStatus = new Map()
for (const [label, viewport] of [
  ['mobile', { width: 375, height: 812 }],
  ['desktop', { width: 1440, height: 900 }],
]) {
  console.log(`\nPages (${label})`)
  const page = await browser.newPage({ viewport })
  for (const path of PAGES) {
    const problems = []
    page.removeAllListeners('console')
    page.removeAllListeners('pageerror')
    page.removeAllListeners('requestfailed')
    page.on('console', (m) => m.type() === 'error' && problems.push(`console: ${m.text()}`))
    page.on('pageerror', (e) => problems.push(`pageerror: ${e.message}`))
    page.on('requestfailed', (r) => problems.push(`request failed: ${r.url()}`))

    const res = await page.goto(BASE + path, { waitUntil: 'networkidle' })
    if (res?.status() !== 200) problems.push(`status ${res?.status()}`)

    // Scroll through so lazy images load, then check they all decoded.
    await page.evaluate(async () => {
      // Bring each image into view and wait (up to 3s) for it to finish loading.
      for (const img of document.images) {
        if (!img.getAttribute('src') || img.closest('dialog')) continue
        img.scrollIntoView({ block: 'center' })
        const started = Date.now()
        while (!img.complete && Date.now() - started < 3000) await new Promise((r) => setTimeout(r, 50))
      }
      window.scrollTo(0, 0)
      // Show scroll-reveal content immediately so contrast checks see final colours.
      document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-visible'))
    })
    await page
      .waitForFunction(() => [...document.images].every((i) => !i.getAttribute('src') || i.complete), null, { timeout: 10000 })
      .catch(() => {})
    await page.waitForTimeout(900)

    const info = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      h1: document.querySelectorAll('h1').length,
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.getAttribute('content') ?? '',
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? '',
      ogImage: document.querySelector('meta[property="og:image"]')?.getAttribute('content') ?? '',
      brokenImages: [...document.images].filter((i) => i.getAttribute('src') && (!i.complete || i.naturalWidth === 0)).map((i) => i.src),
      missingAlt: [...document.images].filter((i) => !i.hasAttribute('alt')).length,
      links: [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')),
    }))

    if (info.overflow) problems.push('horizontal overflow')
    if (info.h1 !== 1) problems.push(`${info.h1} <h1> elements`)
    if (!info.title || !info.description) problems.push('missing title or description')
    if (!info.canonical.startsWith('http')) problems.push('canonical URL is not absolute')
    if (!info.ogImage.startsWith('http')) problems.push('og:image is not absolute')
    if (info.brokenImages.length) problems.push(`broken images: ${info.brokenImages.join(', ')}`)
    if (info.missingAlt) problems.push(`${info.missingAlt} images without alt`)
    for (const href of info.links) {
      if (href.startsWith('/') && !linkStatus.has(href)) linkStatus.set(href, (await fetch(BASE + href)).status)
      if (href.startsWith('#') && href.length > 1 && !(await page.$(href))) problems.push(`missing anchor ${href}`)
      if (href.startsWith('tel:') && !/^tel:\+\d{10,15}$/.test(href)) problems.push(`malformed ${href}`)
    }

    if (label === 'desktop') {
      await page.addScriptTag({ content: axeSource })
      const violations = await page.evaluate(async () => {
        // eslint-disable-next-line no-undef
        const r = await axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'] })
        return r.violations
          .filter((v) => v.impact === 'serious' || v.impact === 'critical')
          .map((v) => `${v.id} (${v.nodes.length}): ${v.nodes[0]?.target}`)
      })
      problems.push(...violations.map((v) => `axe: ${v}`))
    }

    problems.length ? fail(`${path}\n      ${problems.join('\n      ')}`) : ok(path)
  }
  await page.close()
}

console.log('\nInternal links')
const broken = [...linkStatus].filter(([, s]) => s !== 200)
check(broken.length === 0, `${linkStatus.size} unique internal links return 200${broken.length ? `: ${broken.map(([h, s]) => `${h} → ${s}`).join(', ')}` : ''}`)

console.log('\n404 page')
{
  const res = await fetch(`${BASE}/this-page-does-not-exist/`)
  const html = await res.text()
  check(res.status === 404 && html.includes('Off the mat'), 'unknown URLs return the custom 404 page')
}

// ---------------------------------------------------------------- keyboard + menu
console.log('\nKeyboard & mobile menu')
{
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } })
  await page.goto(BASE + '/')
  await page.keyboard.press('Tab')
  check((await page.evaluate(() => document.activeElement?.className)) === 'skip-link', 'first Tab focuses the skip link')
  const toggle = page.locator('[data-menu-toggle]')
  await toggle.click()
  check(await page.locator('#mobile-menu').isVisible(), 'menu opens')
  check((await toggle.getAttribute('aria-expanded')) === 'true', 'toggle reports aria-expanded="true"')
  await page.keyboard.press('Escape')
  check(await page.locator('#mobile-menu').isHidden(), 'Escape closes the menu')
  check(await toggle.evaluate((el) => el === document.activeElement), 'focus returns to the toggle')
  await toggle.click()
  await page.locator('#mobile-menu a', { hasText: 'Gallery' }).click()
  await page.waitForURL('**/gallery/')
  ok('menu links navigate')
  await page.close()
}

// ---------------------------------------------------------------- form
console.log('\nEnquiry form')
{
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
  await page.goto(BASE + '/register/')
  const form = page.locator('form[name="enquiry"]')
  check((await form.getAttribute('data-netlify')) === 'true', 'form is marked for Netlify Forms')

  await page.click('[data-submit]')
  const summary = page.locator('[data-error-summary]')
  check(await summary.isVisible(), 'empty submit shows an error summary')
  check(await summary.evaluate((el) => el === document.activeElement), 'error summary receives focus')
  const invalid = await page.locator('[aria-invalid="true"]').count()
  check(invalid === 4, `required fields are flagged (${invalid}: name, guardian, phone, consent)`)

  await page.check('input[name="enquiry_for"][value="Myself"]')
  check(await page.locator('[data-guardian]').isHidden(), 'guardian field hides for adult students')

  await page.fill('#student_name', 'Test Student')
  await page.fill('#phone', '12345')
  await page.fill('#email', 'not-an-email')
  await page.fill('#student_age', '2')
  await page.click('[data-submit]')
  check((await page.textContent('[data-error-for="phone"]'))?.includes('10 to 15 digits'), 'short phone number is rejected')
  check((await page.textContent('[data-error-for="email"]'))?.includes('email address'), 'malformed email is rejected')
  check((await page.textContent('[data-error-for="student_age"]'))?.includes('between 3 and 99'), 'out-of-range age is rejected')

  await page.fill('#phone', '+91 98765 43210')
  await page.fill('#email', 'parent@example.com')
  await page.fill('#student_age', '12')
  await page.check('input[name="consent"]')
  check((await page.locator('[aria-invalid="true"]').count()) === 0, 'errors clear once fixed')

  if ((await form.getAttribute('data-forms-live')) === 'true') {
    ok('build is a Netlify build: form is live')
  } else {
    // Outside Netlify the form must say it cannot send, and send nothing.
    let posted = 0
    await page.route('**/', (route) => (route.request().method() === 'POST' ? (posted++, route.fulfill({ status: 200 })) : route.continue()))
    await page.click('[data-submit]')
    check(
      (await page.textContent('[data-status]'))?.includes('can’t send') && posted === 0,
      'non-Netlify build says it cannot send and makes no request',
    )
    await page.unroute('**/')
    // Simulate the deployed site for the checks below.
    await form.evaluate((el) => (el.dataset.formsLive = 'true'))
  }

  // Failure keeps the data, success confirms.
  let body = ''
  await page.route('**/', (route) => (route.request().method() === 'POST' ? route.fulfill({ status: 500 }) : route.continue()))
  await page.click('[data-submit]')
  await page
    .waitForFunction(() => document.querySelector('[data-status]')?.textContent?.includes('couldn’t send'), null, { timeout: 5000 })
    .catch(() => {})
  check(
    (await page.textContent('[data-status]'))?.includes('couldn’t send') && (await page.inputValue('#student_name')) === 'Test Student',
    'server error shows a failure message and keeps the entered data',
  )
  await page.unroute('**/')
  await page.route('**/', (route) => {
    if (route.request().method() !== 'POST') return route.continue()
    body = route.request().postData() ?? ''
    return route.fulfill({ status: 200, body: 'ok' })
  })
  await page.click('[data-submit]')
  await page.waitForSelector('[data-success]:not([hidden])', { timeout: 5000 }).catch(() => {})
  check(await page.locator('[data-success]').isVisible(), 'accepted submission shows the success message')
  const params = new URLSearchParams(body)
  check(
    params.get('form-name') === 'enquiry' && params.get('student_name') === 'Test Student' && params.get('consent') === 'Yes',
    'payload is URL-encoded with form-name and field values',
  )
  await page.close()
}

// ---------------------------------------------------------------- lightbox
console.log('\nGallery lightbox')
{
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
  await page.goto(BASE + '/gallery/')
  const tiles = page.locator('.gallery__open')
  const total = await tiles.count()
  if (total === 0) {
    ok('no photos in this build — empty state shown instead')
  } else {
    await tiles.first().click()
    const dialog = page.locator('[data-lightbox]')
    check(await dialog.isVisible(), 'clicking a photo opens the viewer')
    await page.waitForFunction(() => {
      const img = document.querySelector('[data-lightbox] [data-image]')
      return img && img.complete && img.naturalWidth > 0
    })
    ok('full-size image loads')
    check((await page.textContent('[data-counter]')) === `1 / ${total}`, 'counter shows position')
    await page.keyboard.press('ArrowRight')
    check((await page.textContent('[data-counter]')) === `2 / ${total}`, 'ArrowRight shows the next photo')
    await page.keyboard.press('ArrowLeft')
    await page.keyboard.press('ArrowLeft')
    check((await page.textContent('[data-counter]')) === `${total} / ${total}`, 'navigation wraps around')
    await page.keyboard.press('Escape')
    check(await dialog.isHidden(), 'Escape closes the viewer')
    check(await tiles.first().evaluate((el) => el === document.activeElement), 'focus returns to the photo')
    const filter = page.locator('[data-filter]:not([data-filter="all"])').first()
    if (await filter.count()) {
      const cat = await filter.getAttribute('data-filter')
      await filter.click()
      const visible = await page.$$eval('.gallery__item:not([hidden])', (els) => els.map((e) => e.dataset.category))
      check(visible.length > 0 && visible.every((c) => c === cat), `filter shows only “${cat}” photos`)
    }
  }
  await page.close()
}

// ---------------------------------------------------------------- reduced motion
console.log('\nReduced motion')
{
  const page = await browser.newPage({ reducedMotion: 'reduce' })
  await page.goto(BASE + '/')
  const anim = await page.$eval('.hero__glyph', (el) => getComputedStyle(el).animationName)
  const hidden = await page.$$eval('[data-reveal]', (els) => els.filter((e) => getComputedStyle(e).opacity === '0').length)
  check(anim === 'none' && hidden === 0, 'animations are off and all content is visible')
  await page.close()
}

await browser.close()
stop()
console.log(failures ? `\n${failures} check(s) failed.` : '\nAll checks passed.')
process.exit(failures ? 1 : 0)
