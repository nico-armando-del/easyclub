/*
  TOUT CE QUI SE CONSTRUIT À PARTIR DES COLLECTIONS : adresses, menu, hubs,
  maillage croisé. Ajouter un fichier .mdx suffit pour qu'il apparaisse partout.

  EN DEUX LANGUES. Chaque fonction prend la langue de la page (« fr » par
  défaut) :
  - liste(c, 'es') : les pages espagnoles publiées (src/content/es/<c>/), dans
    l'ordre des françaises ;
  - url(c, id, 'es') : /es/… si la page espagnole existe, sinon l'adresse
    française (jamais de lien vers une page espagnole absente) ;
  - catalogue(c, 'es') : TOUTES les pages françaises publiées, chacune avec
    son nom dans la langue (fichier espagnol, sinon src/i18n/noms.ts), son
    adresse et `fr: true` quand le lien reste en français (étiquette « FR »).
*/
import { getCollection, type CollectionEntry } from 'astro:content'
import { FAMILLES } from '../data/site'
import { BASE, existeEs, cheminEs } from '../i18n/liens'
import { NOMS_ES } from '../i18n/noms'
import { traducteur, type Langue } from '../i18n/ui'

export type NomCollection =
  | 'fonctionnalites' | 'sports' | 'activites' | 'profils' | 'comparatifs' | 'guides' | 'articles'

export { BASE }

/** Le hub de chaque collection, pour le fil d'Ariane (nom français ; t() le traduit). */
export const HUB: Record<NomCollection, { nom: string; url: string }> = {
  fonctionnalites: { nom: 'Fonctionnalités', url: '/fonctionnalites' },
  sports: { nom: 'Pour qui', url: '/pour-qui' },
  activites: { nom: 'Pour qui', url: '/pour-qui' },
  profils: { nom: 'Pour qui', url: '/pour-qui' },
  comparatifs: { nom: 'Ressources', url: '/ressources' },
  guides: { nom: 'Ressources', url: '/ressources' },
  articles: { nom: 'Ressources', url: '/ressources' },
}

export const ETIQUETTE: Record<NomCollection, string> = {
  fonctionnalites: 'Fonctionnalité',
  sports: 'Sport',
  activites: 'Activité',
  profils: 'Profil',
  comparatifs: 'Comparatif',
  guides: 'Guide',
  articles: 'Article',
}

/** L'adresse d'une page, dans la langue demandée si elle y existe. */
export const url = (c: NomCollection, id: string, langue: Langue = 'fr') => {
  const fr = BASE[c] + id
  return langue === 'es' && existeEs(fr) ? cheminEs(fr) : fr
}

type Entree = CollectionEntry<NomCollection>

const cache = new Map<string, Entree[]>()

/** Les entrées publiées d'une collection, triées (en espagnol : celles qui ont leur fichier, dans l'ordre français). */
export async function liste<C extends NomCollection>(c: C, langue: Langue = 'fr'): Promise<CollectionEntry<C>[]> {
  const cle = `${c}:${langue}`
  if (!cache.has(cle)) {
    if (langue === 'fr') {
      const tout = (await getCollection(c, (e: any) => !e.data.brouillon)) as Entree[]
      tout.sort((a: any, b: any) => {
        if (a.data.publie && b.data.publie) return b.data.publie.getTime() - a.data.publie.getTime()
        return (a.data.ordre ?? 50) - (b.data.ordre ?? 50) || a.data.nom.localeCompare(b.data.nom, 'fr')
      })
      cache.set(cle, tout)
    } else {
      const fr = await liste(c, 'fr')
      const rang = new Map(fr.map((e, i) => [e.id, i]))
      const es = ((await getCollection(`${c}_es` as any)) as any[]).filter((e) => !e.data.brouillon && rang.has(e.id))
      es.sort((a, b) => rang.get(a.id)! - rang.get(b.id)!)
      cache.set(cle, es as Entree[])
    }
  }
  return cache.get(cle) as CollectionEntry<C>[]
}

/** Une page du catalogue, dans la langue de la page qui la cite. */
export type Fiche = { id: string; nom: string; ligne?: string; url: string; fr: boolean; data: any }

/**
 * TOUTES les pages publiées d'une collection, dans l'ordre français, avec leur
 * nom dans la langue : la page espagnole si elle existe, sinon le nom de
 * src/i18n/noms.ts et le lien vers la page française (`fr: true`).
 */
export async function catalogue(c: NomCollection, langue: Langue = 'fr'): Promise<Fiche[]> {
  const fr = (await liste(c, 'fr')) as any[]
  if (langue === 'fr') return fr.map((e) => ({ id: e.id, nom: e.data.nom, ligne: e.data.ligne, url: url(c, e.id), fr: false, data: e.data }))
  const es = new Map(((await liste(c, langue)) as any[]).map((e) => [e.id, e]))
  return fr.map((e) => {
    const x = es.get(e.id)
    if (x) return { id: e.id, nom: x.data.nom, ligne: x.data.ligne, url: url(c, e.id, langue), fr: false, data: x.data }
    const n = NOMS_ES[c]?.[e.id]
    if (!n) console.warn(`[es] nom manquant : ${c}/${e.id} (src/i18n/noms.ts)`)
    return { id: e.id, nom: n?.nom ?? e.data.nom, ligne: n?.ligne, url: url(c, e.id), fr: true, data: e.data }
  })
}

/** Les fonctionnalités rangées par famille, dans l'ordre du menu. */
export async function parFamille(langue: Langue = 'fr') {
  const f = await catalogue('fonctionnalites', langue)
  return FAMILLES.map((fam) => ({ ...fam, items: f.filter((e) => e.data.famille === fam.cle) }))
}

export type Lien = { nom: string; url: string; ligne?: string; etiquette: string; fr?: boolean }

const COLLECTIONS: NomCollection[] = ['fonctionnalites', 'sports', 'activites', 'profils', 'guides', 'comparatifs', 'articles']

/**
 * LE « VOIR AUSSI » D'UNE PAGE : les liens qu'elle déclare, ceux qui pointent
 * vers elle (calculés), puis des voisines de la même collection pour arriver à
 * `min` liens. Jamais un lien vers une page qui n'existe pas : les références
 * sont vérifiées par Astro au build, les brouillons sont écartés. Le graphe est
 * celui des pages françaises (une page espagnole a les mêmes liens) ; en
 * espagnol, une voisine non traduite garde son lien français (`fr: true`).
 */
export async function voirAussi(c: NomCollection, id: string, min = 6, langue: Langue = 'fr'): Promise<Lien[]> {
  const t = traducteur(langue)
  const tout = new Map<NomCollection, Entree[]>()
  const fiches = new Map<string, Fiche>()
  for (const k of COLLECTIONS) {
    tout.set(k, (await liste(k)) as Entree[])
    for (const f of await catalogue(k, langue)) fiches.set(`${k}/${f.id}`, f)
  }
  const moi = tout.get(c)!.find((e) => e.id === id) as any
  const vus = new Set<string>([`${c}/${id}`])
  const res: Lien[] = []
  const ajoute = (k: NomCollection, e: any) => {
    const cle = `${k}/${e.id}`
    const f = fiches.get(cle)
    if (e && f && !vus.has(cle)) { vus.add(cle); res.push({ nom: f.nom, url: f.url, ligne: f.ligne, etiquette: t(ETIQUETTE[k]), fr: f.fr }) }
  }
  // 1. déclarés
  for (const k of COLLECTIONS) {
    for (const ref of (moi?.data?.[k] ?? []) as { id: string }[]) {
      const e = tout.get(k)!.find((x) => x.id === ref.id)
      if (e) ajoute(k, e)
    }
  }
  // 2. inverses : les pages qui me citent
  for (const k of COLLECTIONS) {
    for (const e of tout.get(k)! as any[]) {
      if ((e.data[c] ?? []).some((r: { id: string }) => r.id === id)) ajoute(k, e)
    }
  }
  // 3. voisines : même famille d'abord pour une fonctionnalité, puis même collection
  if (res.length < min) {
    const soeurs = (tout.get(c)! as any[]).filter((e) => e.id !== id)
    const memeFamille = moi?.data?.famille ? soeurs.filter((e) => e.data.famille === moi.data.famille) : []
    for (const e of [...memeFamille, ...soeurs]) { if (res.length >= min) break; ajoute(c, e) }
  }
  return res
}
