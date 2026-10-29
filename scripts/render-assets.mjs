/**
 * Renders the social image and PNG icons into public/.
 *
 *   node scripts/render-assets.mjs
 *
 * Needs Playwright with Chromium (see scripts/test-site.mjs) and network
 * access to Google Fonts.
 */
import { createRequire } from 'node:module'
import sharp from 'sharp'

const require = createRequire(import.meta.url)
const { chromium } = require('playwright')
const root = new URL('..', import.meta.url)
const out = (name) => new URL(`public/${name}`, root).pathname

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
await page.goto(new URL('scripts/og-image.html', root).href, { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)
await page.screenshot({ path: out('og-image.png') })
await browser.close()
console.log('✓ og-image.png')

const svg = new URL('public/favicon.svg', root).pathname
for (const [name, size] of [['favicon-32.png', 32], ['apple-touch-icon.png', 180], ['favicon-512.png', 512]]) {
  await sharp(svg, { density: 72 * (size / 64) * 2 }).resize(size, size).png().toFile(out(name))
  console.log(`✓ ${name}`)
}
