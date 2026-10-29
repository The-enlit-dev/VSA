/**
 * Generates the clearly labelled placeholder photos in src/assets/placeholders/.
 * They stand in for academy photography in review mode only and are left out
 * of the build once PUBLIC_CONTENT_REVIEW=false.
 *
 *   node scripts/make-placeholders.mjs
 */
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'

const out = new URL('../src/assets/placeholders/', import.meta.url)
await mkdir(out, { recursive: true })

const items = [
  ['training-1', 1600, 1067, 'Training session'],
  ['training-2', 1067, 1600, 'Kata practice'],
  ['events-1', 1600, 1067, 'Belt examination'],
  ['competition-1', 1600, 1200, 'Tournament day'],
  ['competition-2', 1200, 1600, 'Medal presentation'],
  ['life-1', 1600, 1067, 'Academy group photo'],
  ['training-3', 1600, 1200, 'Kumite drills'],
  ['life-2', 1067, 1600, 'Students and coaches'],
]

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')

for (const [name, w, h, label] of items) {
  const s = Math.min(w, h) / 1067
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <defs>
      <pattern id="p" width="${28 * s}" height="${28 * s}" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="${28 * s}" stroke="#2a2a2e" stroke-width="${2 * s}"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="#1a1a1d"/>
    <rect width="100%" height="100%" fill="url(#p)"/>
    <rect x="${48 * s}" y="${48 * s}" width="${w - 96 * s}" height="${h - 96 * s}" fill="none" stroke="#3a3a3f" stroke-width="${2 * s}" stroke-dasharray="${10 * s} ${8 * s}"/>
    <rect x="${w / 2 - 40 * s}" y="${h / 2 - 118 * s}" width="${80 * s}" height="${4 * s}" fill="#c8102e"/>
    <text x="50%" y="${h / 2 - 50 * s}" text-anchor="middle" font-family="Inter" font-weight="700" font-size="${26 * s}" letter-spacing="${6 * s}" fill="#8a8780">PLACEHOLDER</text>
    <text x="50%" y="${h / 2 + 20 * s}" text-anchor="middle" font-family="Inter" font-weight="600" font-size="${56 * s}" fill="#e9e5dd">${esc(label)}</text>
    <text x="50%" y="${h / 2 + 80 * s}" text-anchor="middle" font-family="Inter" font-size="${26 * s}" fill="#8a8780">Replace with an academy photo</text>
  </svg>`
  await sharp(Buffer.from(svg)).jpeg({ quality: 82, mozjpeg: true }).toFile(new URL(`${name}.jpg`, out).pathname)
  console.log(`✓ ${name}.jpg`)
}
