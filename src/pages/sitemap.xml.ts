/* Le plan du site pour les moteurs, construit à partir des collections (src/lib/plan.ts). */
import { plan, PAGES_LANGUES, absolue } from '../lib/plan'

export async function GET() {
  const pages = await plan()
  const aujourdhui = new Date().toISOString().slice(0, 10)
  const toutes = [...pages.map((p) => ({ url: p.url, maj: p.maj })), ...PAGES_LANGUES.map((c) => ({ url: absolue(c), maj: aujourdhui }))]
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${toutes.map((p) => `  <url><loc>${p.url}</loc><lastmod>${p.maj}</lastmod></url>`).join('\n')}
</urlset>
`
  return new Response(xml, { headers: { 'content-type': 'application/xml; charset=utf-8' } })
}
