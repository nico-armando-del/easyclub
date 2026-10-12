/*
  QUELLES PAGES EXISTENT EN ESPAGNOL, ET OÙ MÈNE UN LIEN.

  Une page espagnole existe si, et seulement si, son fichier existe :
  - une page fixe : src/pages/es/<chemin>.astro (l'accueil : src/pages/es.astro) ;
  - une page de collection : src/content/es/<collection>/<slug>.mdx, publiée
    (pas `brouillon: true`) et dont la page française est publiée aussi.
  Rien d'autre à déclarer : ajouter le fichier suffit, et tous les liens du
  site (menus, cartes, « Voir aussi », sélecteur de langue, hreflang,
  sitemap) basculent d'eux-mêmes vers la page espagnole.

  Lu au build par import.meta.glob : aucune liste tenue à la main.
*/
import type { Langue } from './ui'

/** Le dossier de chaque collection dans l'adresse. */
export const BASE = {
  fonctionnalites: '/fonctionnalites/',
  sports: '/sport/',
  activites: '/activites/',
  profils: '/pour/',
  comparatifs: '/comparatif/',
  guides: '/guides/',
  articles: '/articles/',
} as const
export type Collection = keyof typeof BASE

const PAGES_ES = import.meta.glob(['../pages/es.astro', '../pages/es/**/*.astro'], { query: '?raw', import: 'default' })
const CONTENUS_FR = import.meta.glob('../content/*/*.mdx', { query: '?raw', import: 'default', eager: true }) as Record<string, string>
const CONTENUS_ES = import.meta.glob('../content/es/*/*.mdx', { query: '?raw', import: 'default', eager: true }) as Record<string, string>

const brouillon = (src: string) => /^brouillon:\s*true\s*$/m.test(src.split(/^---\s*$/m)[1] ?? '')

/** Les pages fixes espagnoles, par chemin FRANÇAIS (« / », « /tarifs »). */
const FIXES_ES = new Set(
  Object.keys(PAGES_ES)
    .filter((k) => !k.includes('['))
    .map((k) => (k === '../pages/es.astro' ? '/' : k.replace('../pages/es', '').replace(/\.astro$/, '').replace(/\/index$/, ''))),
)

/** Les pages de collection espagnoles publiées, par chemin français (« /sport/football »). */
const CONTENUS_ES_PUBLIES = new Set(
  Object.entries(CONTENUS_ES).flatMap(([k, src]) => {
    const m = k.match(/^\.\.\/content\/es\/([^/]+)\/(.+)\.mdx$/)
    if (!m) return []
    const [, c, id] = m
    const fr = CONTENUS_FR[`../content/${c}/${id}.mdx`]
    if (!(c in BASE) || !fr || brouillon(fr) || brouillon(src)) return []
    return [BASE[c as Collection] + id]
  }),
)

/** Le chemin sans ancre ni paramètres, et ce qui suit. */
const couper = (h: string) => {
  const i = h.search(/[?#]/)
  return i < 0 ? [h, ''] : [h.slice(0, i), h.slice(i)]
}

/** Le chemin français d'une adresse (retire /es). */
export function cheminFr(chemin: string): string {
  if (chemin === '/es' || chemin === '/es/') return '/'
  return chemin.startsWith('/es/') ? chemin.slice(3) : chemin
}

/** Le chemin espagnol d'un chemin français (sans vérifier qu'il existe). */
export const cheminEs = (fr: string) => (fr === '/' ? '/es' : `/es${fr}`)

/** La page française `fr` existe-t-elle en espagnol ? */
export function existeEs(fr: string): boolean {
  const [p] = couper(fr)
  return FIXES_ES.has(p) || CONTENUS_ES_PUBLIES.has(p)
}

/** L'adresse à mettre dans un lien, pour une page dans la langue `langue`. */
export function local(fr: string, langue: Langue): string {
  if (langue === 'fr' || !fr.startsWith('/') || fr.startsWith('//')) return fr
  const [p, suite] = couper(fr)
  if (p.startsWith('/es/') || p === '/es') return fr
  return existeEs(p) ? cheminEs(p) + suite : fr
}

/** Le lien reste-t-il en français alors que la page est en espagnol ? */
export function versFr(fr: string, langue: Langue): boolean {
  if (langue === 'fr' || !fr.startsWith('/') || fr.startsWith('//')) return false
  const [p] = couper(fr)
  if (p === '' || p.startsWith('/es')) return false
  return !existeEs(p)
}

/** Les deux adresses d'une page : la française, et l'espagnole si elle existe. */
export function jumelles(chemin: string): { fr: string; es: string | null } {
  const fr = cheminFr(chemin)
  return { fr, es: existeEs(fr) ? cheminEs(fr) : null }
}

/** Les pages fixes qui existent en espagnol (chemins français), pour le sitemap et llms-es.txt. */
export const PAGES_FIXES_ES = [...FIXES_ES].sort()
/** Les pages de collection qui existent en espagnol (chemins français). */
export const PAGES_COLLECTIONS_ES = [...CONTENUS_ES_PUBLIES].sort()
