/*
  LES FAITS COMMUNS DU SITE, ÉCRITS UNE SEULE FOIS.

  Un taux, une adresse, un numéro : s'il apparaît sur plusieurs pages, il vient
  d'ici. Le contrôle (scripts/controle_seo.py) vérifie que les taux sont les
  mêmes partout. Source des droits par offre : /Users/bertone/Dev/onclub/
  lib/entitlements/index.ts (FORMULE_MINIMALE), lue le 9 octobre 2026.
*/

export const SITE = 'https://onclub.app'
export const NOM = 'OnClub'
export const EMAIL = 'onclub.contact@gmail.com'
export const WHATSAPP = '33645049227'
export const WHATSAPP_AFFICHE = '+33 6 45 04 92 27'
export const ACCROCHE = 'Votre club, tout en un.'
export const PHRASE_BUT = 'Le but d’un club, c’est de créer des moments. Pas de subir l’administratif.'

/** Message par défaut d'une demande de démo. */
export const MESSAGE_DEMO = 'Bonjour, je voudrais une démo d’OnClub pour notre association.'

export const lienWhatsApp = (texte: string = MESSAGE_DEMO) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texte)}`

export const lienEmail = (sujet: string, corps: string) =>
  `mailto:${EMAIL}?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(corps)}`

/** Mise en route, telle que vendue par la présentation. */
export const MISE_EN_ROUTE = 'En ligne en quinze jours, avec une pré-livraison au dixième jour pour tout valider ensemble.'

export type CleOffre = 'mini' | 'pro' | 'max'

export type Offre = {
  cle: CleOffre
  nom: string
  taux: string
  tauxBoutique?: string
  heures: number
  ouvre: string[]
  phare?: boolean
}

/*
  CE QUE CHAQUE OFFRE OUVRE. Une ligne = un droit de FORMULE_MINIMALE, dit en
  mots de bureau. Rien qui ne soit servi aujourd'hui : la billetterie est
  « à venir » dans le produit (A_VENIR), elle n'apparaît donc pas ici.
*/
export const OFFRES: Offre[] = [
  {
    cle: 'mini',
    nom: 'OnClub Mini',
    taux: '2,90 %',
    heures: 51,
    ouvre: [
      'Inscriptions en ligne et séances d’essai',
      'Paiement par carte, en une ou plusieurs fois',
      'Tableau de bord de l’argent',
      'Relance d’un bouton',
      'Pièces justificatives',
      'Exports en tableur',
    ],
  },
  {
    cle: 'pro',
    nom: 'OnClub Pro',
    taux: '4,90 %',
    heures: 75,
    phare: true,
    ouvre: [
      'Tout Mini',
      'Saison suivante et réinscriptions',
      'Liste d’attente',
      'Messages aux familles',
      'Le site de l’association',
      'Cluby, l’assistant : 100 questions par mois',
    ],
  },
  {
    cle: 'max',
    nom: 'OnClub Pro Max IA',
    taux: '6,90 %',
    tauxBoutique: '2 %',
    heures: 97,
    ouvre: [
      'Tout Pro',
      'La boutique, en ligne et au comptoir',
      'Événements et stages',
      'Cluby, sans limite',
    ],
  },
]

export const NOM_OFFRE: Record<CleOffre, string> = { mini: 'Mini', pro: 'Pro', max: 'Pro Max IA' }

/** Frais de carte Stripe, à la charge de l'association. Source consultée le 9 octobre 2026. */
export const FRAIS_CARTE = {
  texte: '1,5 % + 0,25 € par paiement',
  pourcentage: 0.015,
  fixeCents: 25,
  source: 'https://stripe.com/fr/pricing',
  consulte: '9 octobre 2026',
}

export const INJEP = {
  chiffre: '39 %',
  texte: 'des bénévoles des associations sportives citent les tâches administratives parmi ce qu’ils font : c’est leur activité la plus citée.',
  source: 'https://injep.fr/publication/les-benevoles-des-associations-sportives-plus-souvent-des-hommes-jeunes-et-des-parents/',
  titreSource: 'INJEP, Analyses & synthèses n° 71, octobre 2023',
}

/** Les six familles de fonctionnalités, dans l'ordre du menu. */
export const FAMILLES = [
  { cle: 'Inscrire', ancre: 'inscrire', phrase: 'La famille s’inscrit seule, le bureau ne ressaisit rien.' },
  { cle: 'Encaisser', ancre: 'encaisser', phrase: 'L’argent rentre dès l’inscription, chaque euro dû reste visible.' },
  { cle: 'Organiser', ancre: 'organiser', phrase: 'La saison, les groupes et les équipes, sans tout refaire.' },
  { cle: 'Communiquer', ancre: 'communiquer', phrase: 'Les bonnes familles reçoivent le bon message.' },
  { cle: 'Vendre', ancre: 'vendre', phrase: 'Les maillots et les stages, vendus sans cagnotte à part.' },
  { cle: 'Piloter', ancre: 'piloter', phrase: 'Les chiffres, les exports et les licences, prêts quand il faut.' },
] as const

export type Famille = (typeof FAMILLES)[number]['cle']
export const CLES_FAMILLES = FAMILLES.map((f) => f.cle) as [Famille, ...Famille[]]

/** Les types d'association proposés dans le parcours de démo. */
export const TYPES_ASSOCIATION = [
  { cle: 'sport', nom: 'Club de sport' },
  { cle: 'musique', nom: 'École de musique' },
  { cle: 'danse', nom: 'École de danse' },
  { cle: 'theatre', nom: 'Théâtre' },
  { cle: 'langues', nom: 'Langues' },
  { cle: 'autre', nom: 'Autre association' },
] as const

/** Ce qui pèse le plus, étape 3 du parcours de démo. */
export const CE_QUI_PESE = [
  { cle: 'inscriptions', nom: 'Les inscriptions' },
  { cle: 'paiements', nom: 'Les paiements' },
  { cle: 'relances', nom: 'Les relances' },
  { cle: 'pieces', nom: 'Les pièces justificatives' },
  { cle: 'equipes', nom: 'Les équipes et les convocations' },
  { cle: 'boutique', nom: 'La boutique' },
  { cle: 'site', nom: 'Le site' },
] as const
