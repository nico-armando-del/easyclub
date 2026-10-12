/*
  LES COLLECTIONS DU SITE. Une page = un fichier .mdx dans src/content/<collection>/.
  Le menu, les hubs, le plan du site, llms.txt et les liens « Voir aussi » sont
  construits à partir d'ici : un rédacteur n'a aucun fichier commun à toucher.

  Le guide complet, avec un exemple de frontmatter par collection : REDIGER.md.
*/
import { defineCollection, reference, z } from 'astro:content'
import { glob } from 'astro/loaders'
import { CLES_FAMILLES } from './data/site'
import { CLES_TEMPS } from './data/temps'

const ECRANS = ['inscription', 'reinscription', 'relance', 'site', 'boutique', 'terrain', 'cluby'] as const

const mots = (s: string) => s.trim().split(/\s+/).filter(Boolean).length

/** Le temps gagné, en tête de chaque page : des clés de src/data/temps.ts, ou le geste. */
const temps = z.union([
  z.object({
    cles: z.array(z.enum(CLES_TEMPS)).min(1).max(5),
    titre: z.string().max(80).optional(),
  }),
  z.object({
    geste: z.string().min(10).max(140),
    titre: z.string().max(80).optional(),
  }),
])

const faq = z
  .array(z.object({ question: z.string().min(10).max(160), reponse: z.string().min(30).max(700) }))
  .max(8)
  .optional()

/** Un fait extérieur (fédération, loi, prix d'un concurrent) : un lien et la date de consultation. */
const source = z.object({
  titre: z.string(),
  url: z.url(),
  consulte: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date de consultation au format AAAA-MM-JJ'),
})

/** Ce que toute page porte. */
const base = {
  /** Le <title> : 30 à 65 caractères, le besoin d'abord. */
  titreSeo: z.string().min(30).max(65),
  /** La meta description : 110 à 160 caractères. */
  description: z.string().min(110).max(160),
  /** Le h1 de la page. */
  titre: z.string().min(8).max(70),
  /** Le chapô sous le h1 : une ou deux phrases. */
  chapo: z.string().min(40).max(220),
  temps,
  faq,
  sources: z.array(source).default([]),
  /** Date de dernière mise à jour du contenu (AAAA-MM-JJ). */
  maj: z.coerce.date(),
  /** Un écran animé repris de /presentation, affiché sous le bloc temps. */
  ecran: z.enum(ECRANS).optional(),
  /**
   * L'écran FIXE de cette page, fidèle au vrai produit (src/ecrans/fonctions/<nom>.html,
   * réglages : src/lib/ecransFonction.ts). `true` : le fichier qui porte le nom de la page ;
   * un nom : un autre fichier du dossier (une page sport peut reprendre l'écran d'une fonctionnalité).
   * Il passe AVANT `ecran` et avant l'écran de famille, au même endroit et au même format
   * (fenêtre de bureau sous la ligne du temps, téléphone dans le héros). Fichier absent : le build s'arrête.
   */
  ecranFonction: z.union([z.literal(true), z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'Le nom d’un fichier de src/ecrans/fonctions/, sans .html')]).optional(),
  /** Liens croisés déclarés ; les liens inverses se calculent tout seuls. */
  fonctionnalites: z.array(reference('fonctionnalites')).default([]),
  sports: z.array(reference('sports')).default([]),
  activites: z.array(reference('activites')).default([]),
  profils: z.array(reference('profils')).default([]),
  guides: z.array(reference('guides')).default([]),
  comparatifs: z.array(reference('comparatifs')).default([]),
  articles: z.array(reference('articles')).default([]),
  /** Brouillon : la page n'est pas construite. */
  brouillon: z.boolean().default(false),
}

const fonctionnalites = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/fonctionnalites' }),
  schema: z.object({
    ...base,
    /** Le nom de la tuile : 2 ou 3 mots. */
    nom: z.string().refine((s) => mots(s) >= 2 && mots(s) <= 3, 'Le nom d’une fonctionnalité fait 2 ou 3 mots.'),
    /** La ligne de la tuile : à quoi ça sert, ou le temps gagné. 70 caractères au plus. */
    ligne: z.string().min(12).max(70),
    famille: z.enum(CLES_FAMILLES),
    /** L'offre la plus basse qui l'ouvre (lib/entitlements/index.ts du produit). */
    offre: z.enum(['mini', 'pro', 'max']),
    /** Ordre dans sa famille. */
    ordre: z.number().int().default(50),
  }),
})

const discipline = {
  ...base,
  /** Le nom court : « Football », « École de musique ». */
  nom: z.string().min(3).max(40),
  /** Une ligne pour les cartes des hubs. */
  ligne: z.string().min(12).max(90),
  ordre: z.number().int().default(50),
}

const sports = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/sports' }),
  schema: z.object({ ...discipline }),
})

const activites = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/activites' }),
  schema: z.object({ ...discipline }),
})

const profils = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/profils' }),
  schema: z.object({ ...discipline }),
})

const comparatifs = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/comparatifs' }),
  schema: z.object({
    ...base,
    nom: z.string().min(3).max(40),
    ligne: z.string().min(12).max(90),
  }),
})

const editorial = {
  ...base,
  nom: z.string().min(3).max(60),
  ligne: z.string().min(12).max(120),
  publie: z.coerce.date(),
  /** Minutes de lecture, affichées. */
  lecture: z.number().int().min(1).max(40),
  /** « À retenir », en tête du texte : 3 à 5 phrases de 20 à 140 caractères (remplace la section « En bref »). */
  aRetenir: z.array(z.string().min(20).max(140)).min(3).max(5).optional(),
  /**
   * La couverture typographique : une donnée TIRÉE DU TEXTE (« 50 € »), une sous-ligne,
   * et `apres` pour la variante compteur (« 66 h » → « 5 h », valeurs de TOTAL dans src/data/temps.ts).
   */
  couverture: z
    .object({ donnee: z.string().max(12), sous: z.string().max(60).optional(), apres: z.string().max(12).optional() })
    .optional(),
  /** À la une de /ressources (une seule entrée ; sinon la plus récente). */
  une: z.boolean().default(false),
}

const guides = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/guides' }),
  schema: z.object({ ...editorial }),
})

const articles = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/articles' }),
  schema: z.object({ ...editorial, rubrique: z.string().min(3).max(30) }),
})

export const collections = { fonctionnalites, sports, activites, profils, comparatifs, guides, articles }
