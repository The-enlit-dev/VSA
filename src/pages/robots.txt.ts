import type { APIRoute } from 'astro'
import { REVIEW_MODE } from '../lib/review'

// While content is under review the site asks search engines not to index it.
export const GET: APIRoute = ({ site }) => {
  const body = REVIEW_MODE
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', site).href}\n`
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
