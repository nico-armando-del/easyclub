// LES IMAGES DE PARTAGE (Open Graph), une par page.
//
// Lit chaque page construite dans dist/ : son titre (le h1), sa langue et sa
// première photo. Dessine une carte 1200 × 630 aux couleurs du site, et l'écrit
// dans public/og/<chemin>.jpg. Le gabarit (src/layouts/Layout.astro) prend
// cette image quand elle existe, sinon le logo.
//
// Usage : npm run build, puis node scripts/og.mjs, puis npm run build à nouveau
// pour que les pages pointent sur leurs images. Chrome doit être installé
// (Playwright le pilote, sans télécharger de navigateur).
//   node scripts/og.mjs            toutes les pages
//   node scripts/og.mjs sport/foot seulement les chemins qui contiennent ce texte

import fs from 'node:fs'
import path from 'node:path'
import { chromium } from 'playwright-core'

const RACINE = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const DIST = path.join(RACINE, 'dist')
const SORTIE = path.join(RACINE, 'public', 'og')
const filtre = process.argv[2] ?? ''

const SURTITRES = {
  fr: { sport: 'Clubs de sport', activites: 'Activités artistiques', fonctionnalites: 'Fonctionnalité', articles: 'Article', guides: 'Guide', pour: 'Pour le bureau', comparatif: 'Comparatif', defaut: 'Inscriptions et cotisations en ligne' },
  es: { sport: 'Clubes deportivos', activites: 'Actividades artísticas', fonctionnalites: 'Funcionalidad', articles: 'Artículo', guides: 'Guía', pour: 'Para la directiva', comparatif: 'Comparativa', defaut: 'Inscripciones y cuotas en línea' },
}
const PIED = {
  fr: 'Inscriptions · cotisations · relances',
  es: 'Inscripciones · cuotas · recordatorios',
}
// Pages sans intérêt à partager : on garde le logo.
const EXCLUES = /^(es\/)?(404|mentions-legales|confidentialite|conditions|credits-photos|en)$/

function pages(dossier, base = '') {
  const liste = []
  for (const nom of fs.readdirSync(dossier)) {
    const plein = path.join(dossier, nom)
    const rel = base ? `${base}/${nom}` : nom
    if (fs.statSync(plein).isDirectory()) {
      if (['_astro', 'img', 'polices', 'og'].includes(nom)) continue
      liste.push(...pages(plein, rel))
    } else if (nom.endsWith('.html')) liste.push(rel)
  }
  return liste
}

const texte = (html) => html.replace(/<[^>]+>/g, '').replace(/&nbsp;|&#160;/g, ' ').replace(/&amp;/g, '&')
  .replace(/&#39;|&apos;/g, '’').replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim()
const echapper = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function lire(rel) {
  const html = fs.readFileSync(path.join(DIST, rel), 'utf8')
  if (/<meta name="robots" content="[^"]*noindex/.test(html)) return null
  const chemin = rel.replace(/\.html$/, '').replace(/(^|\/)index$/, '')
  if (EXCLUES.test(chemin)) return null
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)
  if (!h1) return null
  const langue = /<html[^>]*lang="es/.test(html) ? 'es' : 'fr'
  const section = chemin.replace(/^es\/?/, '').split('/')[0]
  const enfant = chemin.replace(/^es\/?/, '').includes('/')
  const surtitre = enfant ? (SURTITRES[langue][section] ?? SURTITRES[langue].defaut) : SURTITRES[langue].defaut
  let photo = null
  // L'accueil parle de toutes les associations : pas une photo de foot, le chiffre.
  const accueil = chemin === '' || chemin === 'es'
  const p = html.match(/src="\/img\/photos\/([a-z0-9-]+)-\d+\.webp"/)
  if (p && !accueil) {
    // La plus grande déclinaison de la photo (1200 ou 1280 selon les sports).
    const dossier = path.join(RACINE, 'public/img/photos')
    const variantes = fs.readdirSync(dossier)
      .map((f) => f.match(new RegExp(`^${p[1]}-(\\d+)\\.webp$`)))
      .filter(Boolean).sort((a, b) => Number(b[1]) - Number(a[1]))
    if (variantes.length) photo = path.join(dossier, variantes[0][0])
  }
  return { chemin, langue, titre: texte(h1[1]), surtitre, photo }
}

const logo = fs.readFileSync(path.join(RACINE, 'public/img/logo.svg'), 'utf8')
  .replace(/fill="#[0-9A-Fa-f]{6}"/g, 'fill="#5DE88F"')
const POLICES = `
@font-face{font-family:"Bricolage Grotesque";src:url("file://${RACINE}/public/polices/bricolage-grotesque.woff2") format("woff2");font-weight:600 800}
@font-face{font-family:"Instrument Sans";src:url("file://${RACINE}/public/polices/instrument-sans.woff2") format("woff2");font-weight:400 700}`

function carte({ titre, surtitre, photo, langue }) {
  const taille = titre.length > 70 ? 54 : titre.length > 45 ? 62 : 72
  const droite = photo
    ? `<div class="photo" style="background-image:url('file://${photo}')"></div>`
    : `<div class="panneau"><b>${langue === 'es' ? '80&nbsp;a&nbsp;90&nbsp;%' : '80&nbsp;à&nbsp;90&nbsp;%'}</b><span>${langue === 'es' ? 'menos papeleo para la directiva' : 'd’administratif en moins pour le bureau'}</span></div>`
  return `<!doctype html><html><head><meta charset="utf-8"><style>${POLICES}
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;background:#0B0F14;color:#fff;font-family:"Instrument Sans",sans-serif;display:flex;overflow:hidden}
.gauche{flex:1;padding:56px 56px 52px 64px;display:flex;flex-direction:column}
.marque{display:flex;align-items:center;gap:14px;font:700 26px "Bricolage Grotesque";letter-spacing:-.01em}
.marque svg{width:64px;height:32px}
.sur{margin-top:auto;color:#5DE88F;font:600 22px "Instrument Sans";letter-spacing:.02em}
h1{margin-top:14px;font:800 ${taille}px/1.04 "Bricolage Grotesque";letter-spacing:-.02em;text-wrap:balance;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden}
.pied{margin-top:36px;display:flex;justify-content:space-between;align-items:center;font-size:21px;color:#AEB4BE}
.pied b{color:#fff;font-weight:600}
.photo{width:430px;height:630px;background-size:cover;background-position:center;border-left:10px solid #5DE88F}
.panneau{width:400px;height:630px;background:#5DE88F;color:#0B0F14;display:flex;flex-direction:column;justify-content:flex-end;padding:56px 48px}
.panneau b{white-space:nowrap;font:800 76px/1 "Bricolage Grotesque";letter-spacing:-.03em}
.panneau span{margin-top:12px;font:600 26px/1.25 "Instrument Sans"}
</style></head><body>
<div class="gauche">
  <div class="marque">${logo}OnClub</div>
  <div class="sur">${echapper(surtitre)}</div>
  <h1>${echapper(titre)}</h1>
  <div class="pied"><b>onclub.app</b><span>${PIED[langue]}</span></div>
</div>${droite}</body></html>`
}

const liste = pages(DIST).map(lire).filter(Boolean).filter((p) => p.chemin.includes(filtre))
const navigateur = await chromium.launch({ channel: 'chrome' })
const page = await navigateur.newPage({ viewport: { width: 1200, height: 630 } })
const brouillon = path.join(RACINE, 'node_modules', '.og-carte.html')
let n = 0
for (const p of liste) {
  fs.writeFileSync(brouillon, carte(p))
  await page.goto(`file://${brouillon}`)
  await page.evaluate(() => document.fonts.ready)
  const cible = path.join(SORTIE, `${p.chemin || 'index'}.jpg`)
  fs.mkdirSync(path.dirname(cible), { recursive: true })
  await page.screenshot({ path: cible, type: 'jpeg', quality: 80 })
  n++
}
fs.rmSync(brouillon, { force: true })
await navigateur.close()
console.log(`images de partage : ${n} écrites dans public/og/`)
