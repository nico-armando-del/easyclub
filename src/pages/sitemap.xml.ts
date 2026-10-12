/*
  Le plan du site pour les moteurs, construit à partir des collections (src/lib/plan.ts).
  Chaque page qui a une jumelle (français ↔ espagnol) porte ses alternates hreflang
  fr, es et x-default (= le français), les mêmes que les <link rel="alternate"> de la
  page ; l'accueil ajoute /en.
*/
import { plan, planEs, PAGES_LANGUES, absolue, paireDe } from '../lib/plan'
import { cheminFr } from '../i18n/liens'

const xhtml = (lang: string, href: string) => `<xhtml:link rel="alternate" hreflang="${lang}" href="${href}"/>`

export async function GET() {
  const pages = await plan()
  const es = await planEs()
  const aujourdhui = new Date().toISOString().slice(0, 10)
  const alternates = (url: string) => {
    const chemin = url.replace('https://onclub.app', '') || '/'
    /* /en est une traduction de l'accueil : ses alternates sont ceux de l'accueil. */
    const p = paireDe(chemin === '/en' ? '/' : cheminFr(chemin))
    if (!p.es) return ''
    const liens = [xhtml('fr', p.fr), ...(p.fr === absolue('/') ? [xhtml('en', absolue('/en'))] : []), xhtml('es', p.es), xhtml('x-default', p.fr)]
    return '\n    ' + liens.join('\n    ')
  }
  const toutes = [
    ...pages.map((p) => ({ url: p.url, maj: p.maj })),
    ...PAGES_LANGUES.map((c) => ({ url: absolue(c), maj: aujourdhui })),
    ...es.map((p) => ({ url: p.url, maj: p.maj })),
  ]
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${toutes.map((p) => `  <url><loc>${p.url}</loc><lastmod>${p.maj}</lastmod>${alternates(p.url)}</url>`).join('\n')}
</urlset>
`
  return new Response(xml, { headers: { 'content-type': 'application/xml; charset=utf-8' } })
}
