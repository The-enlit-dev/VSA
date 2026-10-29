import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'

const staticPaths = ['/', '/about/', '/coaches/', '/events/', '/gallery/', '/blog/', '/register/']

export const GET: APIRoute = async ({ site }) => {
  const posts = (await getCollection('blog')).filter((p) => !p.data.draft)
  const urls = [
    ...staticPaths.map((path) => ({ loc: new URL(path, site).href })),
    ...posts.map((p) => ({ loc: new URL(`/blog/${p.id}/`, site).href, lastmod: p.data.date.toISOString().slice(0, 10) })),
  ]
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc>${'lastmod' in u ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`).join('\n')}
</urlset>
`
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } })
}
