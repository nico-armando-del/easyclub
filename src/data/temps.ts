/*
  LES SEULS CHIFFRES DE TEMPS DU SITE.

  Ils viennent tous de /presentation (public/presentation.html, sections « Le
  temps » et « Est-ce vraiment rentable ? ») : une ESTIMATION OnClub pour une
  association de 250 adhérents, pas une étude. Un rédacteur ne tape jamais un
  chiffre de temps : il choisit une clé ci-dessous (champ `temps.cles` d'une
  page, ou <BlocTemps cles={[...]} /> dans le texte), et le chiffre, son calcul
  et son hypothèse s'affichent ensemble. Sans chiffre, on écrit le GESTE
  (« en un clic », « depuis son téléphone ») avec `temps.geste`.
*/

export const ADHERENTS_REFERENCE = 250

export type Tache = {
  tache: string
  /** Le calcul, tel qu'affiché. */
  calcul: string
  /** Minutes par saison, aujourd'hui et avec OnClub (null si seul le gain est publié). */
  avantMin: number | null
  apresMin: number | null
  /** Minutes rendues par saison. */
  gainMin: number
  /** Ce qui fait la différence, en quelques mots. */
  comment: string
  /** L'offre qui compte cette tâche dans son temps rendu. */
  offre: 'mini' | 'pro' | 'max'
  /** Proportionnelle au nombre d'adhérents ? (sinon fixe) */
  proportionnelle: boolean
}

export const TACHES = {
  fiches: {
    tache: 'Recopier les fiches d’inscription',
    calcul: '250 dossiers × 6 min',
    avantMin: 1500, apresMin: 0, gainMin: 1500,
    comment: 'la famille saisit elle-même',
    offre: 'mini', proportionnelle: true,
  },
  paiements: {
    tache: 'Suivre les paiements dans un tableur',
    calcul: '250 dossiers × 3 min',
    avantMin: 750, apresMin: 60, gainMin: 690,
    comment: 'la carte s’y inscrit seule, le chèque se note au dossier',
    offre: 'mini', proportionnelle: true,
  },
  relances: {
    tache: 'Relancer les retards',
    calcul: '40 familles × 3 relances × 5 min',
    avantMin: 600, apresMin: 40, gainMin: 560,
    comment: 'une relance en un clic',
    offre: 'mini', proportionnelle: true,
  },
  pieces: {
    tache: 'Réclamer les pièces manquantes',
    calcul: '80 pièces × 5 min',
    avantMin: 400, apresMin: 90, gainMin: 310,
    comment: 'contrôle en photo, relance en un clic',
    offre: 'mini', proportionnelle: true,
  },
  rentree: {
    tache: 'Préparer la rentrée suivante',
    calcul: 'listes, équipes, places',
    avantMin: 720, apresMin: 120, gainMin: 600,
    comment: 'la saison suivante s’ouvre, les groupes sont repris',
    offre: 'pro', proportionnelle: false,
  },
  messages: {
    tache: 'Écrire aux familles',
    calcul: '10 messages, 45 min → 5 min chacun',
    avantMin: 450, apresMin: 50, gainMin: 400,
    comment: 'la liste des destinataires est déjà faite',
    offre: 'pro', proportionnelle: false,
  },
  attente: {
    tache: 'Gérer la liste d’attente',
    calcul: '20 places, 10 min → 1 min chacune',
    avantMin: 200, apresMin: 20, gainMin: 180,
    comment: 'la place libérée est proposée au suivant d’un clic',
    offre: 'pro', proportionnelle: false,
  },
  site: {
    tache: 'Mettre le site à jour',
    calcul: 'sans attendre un prestataire',
    avantMin: null, apresMin: null, gainMin: 240,
    comment: 'vous demandez le changement, vous relisez, vous publiez',
    offre: 'pro', proportionnelle: false,
  },
  boutique: {
    tache: 'Vendre les maillots',
    calcul: '150 commandes, 6 min → 1 min au retrait',
    avantMin: 900, apresMin: 150, gainMin: 750,
    comment: 'commande et paiement en ligne, retrait au club',
    offre: 'max', proportionnelle: false,
  },
  evenements: {
    tache: 'Organiser les événements',
    calcul: '4 événements, 3 h → 30 min chacun',
    avantMin: 720, apresMin: 120, gainMin: 600,
    comment: 'chaque stage a sa page d’inscription',
    offre: 'max', proportionnelle: false,
  },
} satisfies Record<string, Tache>

export type CleTemps = keyof typeof TACHES
export const CLES_TEMPS = Object.keys(TACHES) as [CleTemps, ...CleTemps[]]

/** Les cinq tâches de l'estimation principale (66 h → 5 h). */
export const CINQ_TACHES: CleTemps[] = ['fiches', 'paiements', 'relances', 'pieces', 'rentree']

/* Décision de Nico (12 oct. 2026) : la part rendue se dit « 80 à 90 % », arrondi prudent (le calcul détaillé donne 61 h sur 66 h). */
export const PART_RENDUE = { fr: '80 à 90 %', en: '80–90%', es: '80 a 90 %' }
export const TOTAL = { avant: '66 h', apres: '5 h', gain: '61 h', avantMin: 3970, apresMin: 310 }

export const HYPOTHESES =
  'Estimation OnClub, pas une étude : 250 adhérents, 6 minutes pour recopier une fiche, 3 minutes de suivi par dossier, 40 familles relancées trois fois, 80 pièces à réclamer, 12 heures pour préparer la rentrée.'

export const HYPOTHESES_OFFRES =
  'Mini couvre les fiches, le suivi des paiements, les relances et les pièces (51 h). Pro ajoute la rentrée suivante (10 h), les messages aux familles (10 messages de 45 min ramenés à 5 min, 6 h 40), la liste d’attente (20 places de 10 min ramenées à 1 min, 3 h) et le site mis à jour sans prestataire (4 h). Pro Max IA ajoute la boutique (150 commandes de 6 min ramenées à 1 min au retrait, 12 h 30) et les événements (4 événements de 3 h ramenés à 30 min, 10 h).'

/** « 12 h 30 », « 40 min », « 0 h ». */
export function duree(min: number): string {
  const m = Math.round(min)
  if (m === 0) return '0 h'
  if (m < 60) return `${m} min`
  const h = Math.floor(m / 60)
  const r = m % 60
  return r ? `${h} h ${String(r).padStart(2, '0')}` : `${h} h`
}

/**
 * LE CALCULATEUR. Les quatre premières tâches sont proportionnelles au nombre
 * d'adhérents (base 250), la rentrée suivante ne l'est pas : 12 h → 2 h.
 * Le même calcul est réécrit dans public/js/calculateur.js : un test de
 * cohérence est fait par scripts/controle_seo.py (valeurs pour 250).
 */
export function calculer(adherents: number) {
  const k = adherents / ADHERENTS_REFERENCE
  const lignes = CINQ_TACHES.map((c) => {
    const t = TACHES[c]
    const f = t.proportionnelle ? k : 1
    return { cle: c, tache: t.tache, avant: (t.avantMin ?? 0) * f, apres: (t.apresMin ?? 0) * f }
  })
  const avant = lignes.reduce((s, l) => s + l.avant, 0)
  const apres = lignes.reduce((s, l) => s + l.apres, 0)
  return { lignes, avant, apres, gain: avant - apres }
}
