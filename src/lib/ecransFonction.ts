/*
  LES ÉCRANS PAR FONCTIONNALITÉ : src/ecrans/fonctions/<nom>.html.

  Un écran fixe, fidèle au vrai produit (mêmes libellés, mêmes colonnes, mêmes
  états), données fictives. Le fichier ne contient que le CONTENU de l'écran ;
  le cadre (fenêtre de bureau avec le menu du club, ou téléphone) et le style
  commun sont posés par src/components/EcranFonction.astro.

  Le fichier commence par sa racine, qui porte ses réglages :
    <div class="ef-vue"
         data-forme="fenetre"                     fenetre | telephone (obligatoire)
         data-description="Ce qu'on voit…"         l'aria-label de l'écran (obligatoire, 40 caractères au moins)
         data-menu="Liste d’attente"              fenêtre : l'entrée du menu allumée ; absent = pas de menu (page publique)
         data-hauteur="560">                      facultatif : hauteur de la fenêtre ou de la vue, en px
  Une erreur arrête le build si un réglage manque : jamais d'écran muet.
*/
const FICHIERS = import.meta.glob('../ecrans/fonctions/*.html', { query: '?raw', import: 'default', eager: true }) as Record<string, string>
/*
  LES ÉCRANS ESPAGNOLS : src/ecrans/es/fonctions/<nom>.html, le MÊME fichier
  traduit (mêmes classes, même style ; data-forme, data-hauteur et data-menu
  inchangés : data-menu reste l'entrée FRANÇAISE du menu, une clé, que le
  composant affiche traduite). Seuls les textes visibles et data-description
  changent. Une page espagnole n'affiche jamais un écran français : sans son
  fichier espagnol, le build s'arrête et dit lequel créer.
*/
const FICHIERS_ES = import.meta.glob('../ecrans/es/fonctions/*.html', { query: '?raw', import: 'default', eager: true }) as Record<string, string>
export const existeEcranFonctionEs = (nom: string) => Boolean(FICHIERS_ES[`../ecrans/es/fonctions/${nom}.html`])

export type FormeEcran = 'fenetre' | 'telephone'
export interface EcranFonctionLu {
  nom: string
  html: string
  forme: FormeEcran
  description: string
  menu?: string
  hauteur?: number
}

const ENTITES: Record<string, string> = { '&amp;': '&', '&quot;': '"', '&#39;': "'", '&lt;': '<', '&gt;': '>', '&nbsp;': ' ' }
const decoder = (s: string) => s.replace(/&(amp|quot|#39|lt|gt|nbsp);/g, (e) => ENTITES[e] ?? e)

export const NOMS_ECRANS_FONCTION = Object.keys(FICHIERS).map((f) => f.replace(/^.*\/(.+)\.html$/, '$1')).sort()

export function lireEcranFonction(nom: string, langue: 'fr' | 'es' = 'fr'): EcranFonctionLu {
  const es = langue === 'es'
  const html = es ? FICHIERS_ES[`../ecrans/es/fonctions/${nom}.html`] : FICHIERS[`../ecrans/fonctions/${nom}.html`]
  const ou = es ? `src/ecrans/es/fonctions/${nom}.html` : `src/ecrans/fonctions/${nom}.html`
  if (!html && es && FICHIERS[`../ecrans/fonctions/${nom}.html`]) throw new Error(`${ou} n’existe pas : une page espagnole montre l’écran traduit. Copiez src/ecrans/fonctions/${nom}.html dans src/ecrans/es/fonctions/ et traduisez ses textes et data-description.`)
  if (!html) throw new Error(`${ou} n’existe pas. Écrans disponibles : ${NOMS_ECRANS_FONCTION.join(', ') || 'aucun'}.`)
  const racine = html.match(/^\s*(?:<!--[\s\S]*?-->\s*)*<div\b([^>]*)>/)
  if (!racine || !/\bclass="[^"]*\bef-vue\b/.test(racine[1])) throw new Error(`${ou} : la racine doit être <div class="ef-vue" data-forme=… data-description=…>.`)
  const attr = (n: string) => {
    const m = racine[1].match(new RegExp(`\\b${n}="([^"]*)"`))
    return m ? decoder(m[1]).trim() : undefined
  }
  const forme = attr('data-forme')
  if (forme !== 'fenetre' && forme !== 'telephone') throw new Error(`${ou} : data-forme vaut « fenetre » ou « telephone ».`)
  const description = attr('data-description') ?? ''
  if (description.length < 40) throw new Error(`${ou} : data-description décrit l’écran pour un lecteur d’écran (40 caractères au moins).`)
  const interdit = html.replace(/@exemple\.fr/g, '').match(es ? /\b(ejemplo|software)\b/i : /\b(exemple|logiciel)\b/i)
  if (interdit) throw new Error(`${ou} : le mot « ${interdit[1]} » est interdit dans un écran.`)
  /* Un numéro de téléphone fictif reste dans la tranche réservée à la fiction (06 39 98 xx xx, Arcep) :
     tout autre numéro peut appartenir à quelqu'un. */
  const numero = html.match(/(?<!\d)0[1-9](?:[ .\u00a0\u202f]?\d{2}){4}(?!\d)/g)?.find((n) => !n.replace(/\D/g, '').startsWith('063998'))
  if (numero) throw new Error(`${ou} : le numéro « ${numero} » n’est pas dans la tranche de fiction 06 39 98 xx xx.`)
  const h = attr('data-hauteur')
  return { nom, html, forme, description, menu: attr('data-menu') || undefined, hauteur: h ? Number(h) : undefined }
}
