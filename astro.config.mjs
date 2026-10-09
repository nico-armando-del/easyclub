// @ts-check
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

/*
  LE SITE VITRINE D'ONCLUB, EN SORTIE ENTIÈREMENT STATIQUE.

  - build.format 'file' : /tarifs devient dist/tarifs.html. Avec cleanUrls et
    trailingSlash: false (vercel.json), les adresses restent celles du site
    d'avant : /sport/football, /fonctionnalites, sans barre finale.
  - Aucune page n'est rendue à la demande. La seule fonction serveur est
    api/ville.js, à la racine du dépôt, déployée par Vercel à côté du dossier
    dist/ (voir REDIGER.md, « Consentement et ville »).
  - typographie() : après le build, une espace insécable est posée avant
    « : ; ? ! » et à l'intérieur des guillemets, et entre un nombre et son
    unité (25 h, 4,90 %, 45 €), dans le TEXTE des pages seulement (jamais dans
    un script, un style ou un attribut). Un titre ne commence donc jamais une
    ligne par « : ». Les rédacteurs tapent des espaces ordinaires.
*/

const NBSP = ' '
function corrige(texte) {
  return texte
    .replace(/[  ]+([:;?!»])/g, `${NBSP}$1`)
    .replace(/«[  ]+/g, `«${NBSP}`)
    .replace(/(\d) (?=(?:h|min|€|%|heures|adhérents|familles|ans)(?![\p{L}\d]))/gu, `$1${NBSP}`)
    .replace(/(\d) (\d{3})(?!\d)/g, `$1${NBSP}$2`)
}
function typographieHtml(html) {
  const morceaux = html.split(/(<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<textarea[\s\S]*?<\/textarea>|<!--[\s\S]*?-->|<[^>]+>)/)
  return morceaux.map((m, i) => (i % 2 === 1 ? m : corrige(m))).join('')
}
async function fichiersHtml(dossier) {
  const res = []
  for (const e of await readdir(dossier, { withFileTypes: true })) {
    const p = join(dossier, e.name)
    if (e.isDirectory()) res.push(...(await fichiersHtml(p)))
    else if (e.name.endsWith('.html')) res.push(p)
  }
  return res
}
/** Les pages laissées telles quelles (anciens fichiers recopiés depuis public/). */
const INTOUCHABLES = new Set(['presentation.html', 'en.html', 'es.html'])
const typographie = () => ({
  name: 'onclub-typographie',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      const racine = fileURLToPath(dir)
      for (const f of await fichiersHtml(racine)) {
        if (INTOUCHABLES.has(f.slice(racine.length).replace(/^\//, ''))) continue
        const avant = await readFile(f, 'utf8')
        const apres = typographieHtml(avant)
        if (apres !== avant) await writeFile(f, apres)
      }
    },
  },
})

export default defineConfig({
  site: 'https://onclub.app',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'auto' },
  integrations: [mdx(), typographie()],
  prefetch: false,
  devToolbar: { enabled: false },
})
