// @ts-check
import { defineConfig } from 'astro/config'

/**
 * Absolute site URL, used for canonical links, social images and the sitemap.
 * Netlify sets `URL` to the site's primary address during builds; set
 * SITE_URL to override it (e.g. once a custom domain is connected).
 */
const site = (process.env.SITE_URL || process.env.URL || 'http://localhost:4321').replace(/\/$/, '')

export default defineConfig({
  site,
  trailingSlash: 'always',
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  devToolbar: { enabled: false },
})
