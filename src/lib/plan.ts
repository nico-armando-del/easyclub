/*
  LE PLAN DU SITE, CONSTRUIT À PARTIR DES COLLECTIONS. Sert au sitemap
  (src/pages/sitemap.xml.ts) et à llms.txt (src/pages/llms.txt.ts).
  Une page ajoutée hors collection (un nouveau hub) s'ajoute à PAGES_FIXES.
*/
import { liste, url, type NomCollection } from './collections'
import { SITE } from '../data/site'
import { PAGES_FIXES_ES, cheminEs, existeEs } from '../i18n/liens'
import { traducteur } from '../i18n/ui'

export type PagePlan = { url: string; nom: string; ligne?: string; maj: string; groupe: string }

const AUJOURDHUI = new Date().toISOString().slice(0, 10)

export const PAGES_FIXES: { chemin: string; nom: string; ligne: string; groupe: string }[] = [
  { chemin: '/', nom: 'Accueil', ligne: 'Ce que fait OnClub, le temps rendu aux bénévoles, les offres.', groupe: 'Essentiel' },
  { chemin: '/fonctionnalites', nom: 'Fonctionnalités', ligne: 'Toutes les fonctionnalités, en six familles.', groupe: 'Essentiel' },
  { chemin: '/tarifs', nom: 'Tarifs', ligne: '2,90 %, 4,90 % ou 6,90 % des cotisations encaissées en ligne, rien de fixe ; exemple chiffré.', groupe: 'Essentiel' },
  { chemin: '/temps-gagne', nom: 'Le temps gagné', ligne: 'Le calculateur, la méthode et les hypothèses de l’estimation.', groupe: 'Essentiel' },
  { chemin: '/pour-qui', nom: 'Pour qui', ligne: 'Sports, autres activités, rôles dans l’association.', groupe: 'Essentiel' },
  { chemin: '/ressources', nom: 'Ressources', ligne: 'Guides, articles et comparatifs pour le bureau.', groupe: 'Essentiel' },
  { chemin: '/demo', nom: 'Demander une démo', ligne: 'Cinq questions, puis WhatsApp ou e-mail.', groupe: 'Essentiel' },
  { chemin: '/recommander', nom: 'Transmettre à mon club', ligne: 'Pour l’adhérent ou le parent : un message prêt pour le bureau.', groupe: 'Essentiel' },
  { chemin: '/presentation', nom: 'Présentation', ligne: 'OnClub en écrans animés.', groupe: 'Essentiel' },
  { chemin: '/mentions-legales', nom: 'Mentions légales', ligne: 'Éditeur, hébergeur, contact.', groupe: 'Informations légales' },
  { chemin: '/confidentialite', nom: 'Confidentialité', ligne: 'Données, localisation avec consentement, droits.', groupe: 'Informations légales' },
  { chemin: '/conditions', nom: 'Conditions', ligne: 'Conditions d’utilisation et de service.', groupe: 'Informations légales' },
  { chemin: '/credits-photos', nom: 'Crédits photos', ligne: 'Les photographes Unsplash dont les images illustrent le site.', groupe: 'Informations légales' },
]
/** La page en anglais (l'accueil seul, src/pages/en.astro) : dans le sitemap, pas dans llms.txt. */
export const PAGES_LANGUES = ['/en']

const GROUPES: Record<NomCollection, string> = {
  fonctionnalites: 'Fonctionnalités', sports: 'Sports', activites: 'Autres activités', profils: 'Rôles',
  guides: 'Guides', articles: 'Articles', comparatifs: 'Comparatifs',
}

export const absolue = (chemin: string) => (chemin === '/' ? `${SITE}/` : `${SITE}${chemin}`)

/** Une page et sa jumelle : `fr` toujours, `es` si la page espagnole existe (hreflang du sitemap). */
export type Paire = { fr: string; es: string | null }
export const paireDe = (cheminFr: string): Paire => ({ fr: absolue(cheminFr), es: existeEs(cheminFr) ? absolue(cheminEs(cheminFr)) : null })

const GROUPES_ES: Record<NomCollection, string> = {
  fonctionnalites: 'Funcionalidades', sports: 'Deportes', activites: 'Otras actividades', profils: 'Funciones',
  guides: 'Guías', articles: 'Artículos', comparatifs: 'Comparativas',
}

/**
 * LE PLAN DES PAGES ESPAGNOLES (sitemap, llms-es.txt) : les pages fixes de src/pages/es/
 * (nom et ligne traduits par t(), src/i18n/ui.ts) et les pages de src/content/es/.
 */
export async function planEs(): Promise<(PagePlan & { cheminFr: string })[]> {
  const t = traducteur('es')
  const res: (PagePlan & { cheminFr: string })[] = []
  for (const p of PAGES_FIXES) {
    if (!PAGES_FIXES_ES.includes(p.chemin)) continue
    res.push({ url: absolue(cheminEs(p.chemin)), nom: t(p.nom), ligne: t(p.ligne), maj: AUJOURDHUI, groupe: t(p.groupe), cheminFr: p.chemin })
  }
  for (const c of Object.keys(GROUPES_ES) as NomCollection[]) {
    for (const e of (await liste(c, 'es')) as any[]) {
      res.push({ url: absolue(url(c, e.id, 'es')), nom: e.data.nom, ligne: e.data.ligne, maj: e.data.maj.toISOString().slice(0, 10), groupe: GROUPES_ES[c], cheminFr: url(c, e.id) })
    }
  }
  return res
}

export async function plan(): Promise<PagePlan[]> {
  const res: PagePlan[] = PAGES_FIXES.map((p) => ({ url: absolue(p.chemin), nom: p.nom, ligne: p.ligne, maj: AUJOURDHUI, groupe: p.groupe }))
  for (const c of Object.keys(GROUPES) as NomCollection[]) {
    for (const e of (await liste(c)) as any[]) {
      res.push({ url: absolue(url(c, e.id)), nom: e.data.nom, ligne: e.data.ligne, maj: e.data.maj.toISOString().slice(0, 10), groupe: GROUPES[c] })
    }
  }
  return res
}
