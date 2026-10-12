/*
  LA BANDE DES ASSOCIATIONS DE L'ACCUEIL (fr, en, es) : LES CLUBS DE SPORT D'ABORD
  (Nico, 10 oct. 2026 : « faut mettre beaucoup plus en avant les clubs sportifs
  que artistiques »). Au moins 8 sports, puis 1 ou 2 activités artistiques à la fin.

  Rien n'est codé en dur côté pages : un sport qui a sa page publiée (avec une
  photo de src/data/photos.ts) y mène ; tant que la page n'existe pas, la carte
  mène à /pour-qui#sports (jamais un lien mort). L'ordre ci-dessous ne sert qu'à
  choisir les premiers ; les autres pages sport publiées suivent.
*/
import { liste, url, catalogue } from '../lib/collections'
import { photoDe } from '../data/photos'

type L = 'fr' | 'en' | 'es'
/** fr : depuis une page espagnole, la carte mène à une page restée en français (étiquette « FR »). */
export type CarteBande = { nom: string; ligne: string; href: string; photo: string; fr?: boolean }

/** Les sports montrés d'abord, avec leur nom dans chaque langue (les pages publiées gardent leur nom en français). */
const PREMIERS: { id: string; fr: string; en: string; es: string }[] = [
  { id: 'football', fr: 'Football', en: 'Football', es: 'Fútbol' },
  { id: 'basket', fr: 'Basket-ball', en: 'Basketball', es: 'Baloncesto' },
  { id: 'volley', fr: 'Volley-ball', en: 'Volleyball', es: 'Voleibol' },
  { id: 'handball', fr: 'Handball', en: 'Handball', es: 'Balonmano' },
  { id: 'rugby', fr: 'Rugby', en: 'Rugby', es: 'Rugby' },
  { id: 'judo', fr: 'Judo', en: 'Judo', es: 'Judo' },
  { id: 'tennis', fr: 'Tennis', en: 'Tennis', es: 'Tenis' },
  { id: 'natation', fr: 'Natation', en: 'Swimming', es: 'Natación' },
  { id: 'gymnastique', fr: 'Gymnastique', en: 'Gymnastics', es: 'Gimnasia' },
  { id: 'athletisme', fr: 'Athlétisme', en: 'Athletics', es: 'Atletismo' },
]
const NB_SPORTS = 10
const LIGNE: Record<L, string> = {
  fr: 'Inscriptions et cotisations en ligne',
  en: 'Registrations and fees online',
  es: 'Inscripciones y cuotas en línea',
}
const ARTS = ['ecole-de-musique', 'theatre']

/** Les cartes sport (10 par défaut ; 9 sur /pour-qui, pour une mosaïque sans trou), dans l'ordre : pages publiées d'abord parmi les premiers, puis les autres pages, puis les photos seules. */
export async function cartesSports(l: L, nb = NB_SPORTS): Promise<CarteBande[]> {
  const pages = (await liste('sports')).filter((e) => photoDe(e.id))
  /* Espagnol : le nom et la ligne de la page espagnole si elle existe, sinon le nom de src/i18n/noms.ts. */
  const fiches = l === 'es' ? new Map((await catalogue('sports', 'es')).map((f) => [f.id, f])) : null
  const href = (id: string) => (l === 'es' ? fiches!.get(id)!.url : url('sports', id))
  const ligneDe = (id: string, ligneFr: string) => (l === 'fr' ? ligneFr : l === 'es' && !fiches!.get(id)!.fr ? fiches!.get(id)!.ligne ?? LIGNE.es : LIGNE[l])
  const frDe = (id: string) => (l === 'es' ? fiches!.get(id)!.fr : undefined)
  const fichier = (id: string) => photoDe(id)?.fichier ?? id
  const vus = new Set<string>()
  const out: CarteBande[] = []
  const ajoute = (c: CarteBande) => { const f = fichier(c.photo); if (vus.has(f) || out.length >= nb) return; vus.add(f); out.push(c) }
  const nomDe = (id: string, nomFr: string) => { if (l === 'es') return fiches!.get(id)!.nom; const p = PREMIERS.find((x) => fichier(x.id) === fichier(id)); return l === 'fr' ? nomFr : (p?.[l] ?? nomFr) }
  for (const p of PREMIERS) {
    const e = pages.find((x) => fichier(x.id) === fichier(p.id))
    if (e) ajoute({ nom: nomDe(e.id, e.data.nom), ligne: ligneDe(e.id, e.data.ligne), href: href(e.id), photo: e.id, fr: frDe(e.id) })
  }
  for (const e of pages) ajoute({ nom: nomDe(e.id, e.data.nom), ligne: ligneDe(e.id, e.data.ligne), href: href(e.id), photo: e.id, fr: frDe(e.id) })
  for (const p of PREMIERS) if (photoDe(p.id)) ajoute({ nom: p[l], ligne: LIGNE[l], href: l === 'es' ? '/es/pour-qui#sports' : '/pour-qui#sports', photo: p.id })
  return out
}

/** Les activités artistiques, à la fin (pages publiées seulement). */
export async function cartesArts(l: 'fr' | 'es' = 'fr'): Promise<CarteBande[]> {
  const acts = await catalogue('activites', l)
  return ARTS.flatMap((id) => acts.filter((e) => e.id === id && photoDe(e.id)).map((e) => ({ nom: e.nom, ligne: e.ligne ?? '', href: e.url, photo: e.id, fr: e.fr || undefined })))
}
