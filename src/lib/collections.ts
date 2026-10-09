/*
  TOUT CE QUI SE CONSTRUIT À PARTIR DES COLLECTIONS : adresses, menu, hubs,
  maillage croisé. Ajouter un fichier .mdx suffit pour qu'il apparaisse partout.
*/
import { getCollection, type CollectionEntry } from 'astro:content'
import { FAMILLES } from '../data/site'

export type NomCollection =
  | 'fonctionnalites' | 'sports' | 'activites' | 'profils' | 'comparatifs' | 'guides' | 'articles'

export const BASE: Record<NomCollection, string> = {
  fonctionnalites: '/fonctionnalites/',
  sports: '/sport/',
  activites: '/activites/',
  profils: '/pour/',
  comparatifs: '/comparatif/',
  guides: '/guides/',
  articles: '/articles/',
}

/** Le hub de chaque collection, pour le fil d'Ariane. */
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

export const url = (c: NomCollection, id: string) => BASE[c] + id

type Entree = CollectionEntry<NomCollection>

const cache = new Map<NomCollection, Entree[]>()

/** Les entrées publiées d'une collection, triées. */
export async function liste<C extends NomCollection>(c: C): Promise<CollectionEntry<C>[]> {
  if (!cache.has(c)) {
    const tout = (await getCollection(c, (e: any) => !e.data.brouillon)) as Entree[]
    tout.sort((a: any, b: any) => {
      if (a.data.publie && b.data.publie) return b.data.publie.getTime() - a.data.publie.getTime()
      return (a.data.ordre ?? 50) - (b.data.ordre ?? 50) || a.data.nom.localeCompare(b.data.nom, 'fr')
    })
    cache.set(c, tout)
  }
  return cache.get(c) as CollectionEntry<C>[]
}

/** Les fonctionnalités rangées par famille, dans l'ordre du menu. */
export async function parFamille() {
  const f = await liste('fonctionnalites')
  return FAMILLES.map((fam) => ({ ...fam, items: f.filter((e) => e.data.famille === fam.cle) }))
}

export type Lien = { nom: string; url: string; ligne?: string; etiquette: string }

const COLLECTIONS: NomCollection[] = ['fonctionnalites', 'sports', 'activites', 'profils', 'guides', 'comparatifs', 'articles']

const enLien = (c: NomCollection, e: any): Lien => ({ nom: e.data.nom, url: url(c, e.id), ligne: e.data.ligne, etiquette: ETIQUETTE[c] })

/**
 * LE « VOIR AUSSI » D'UNE PAGE : les liens qu'elle déclare, ceux qui pointent
 * vers elle (calculés), puis des voisines de la même collection pour arriver à
 * `min` liens. Jamais un lien vers une page qui n'existe pas : les références
 * sont vérifiées par Astro au build, les brouillons sont écartés.
 */
export async function voirAussi(c: NomCollection, id: string, min = 6): Promise<Lien[]> {
  const tout = new Map<NomCollection, Entree[]>()
  for (const k of COLLECTIONS) tout.set(k, (await liste(k)) as Entree[])
  const moi = tout.get(c)!.find((e) => e.id === id) as any
  const vus = new Set<string>([url(c, id)])
  const res: Lien[] = []
  const ajoute = (k: NomCollection, e: any) => {
    const u = url(k, e.id)
    if (e && !vus.has(u)) { vus.add(u); res.push(enLien(k, e)) }
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
