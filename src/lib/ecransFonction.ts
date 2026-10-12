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

export function lireEcranFonction(nom: string): EcranFonctionLu {
  const html = FICHIERS[`../ecrans/fonctions/${nom}.html`]
  const ou = `src/ecrans/fonctions/${nom}.html`
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
  const interdit = html.replace(/@exemple\.fr/g, '').match(/\b(exemple|logiciel)\b/i)
  if (interdit) throw new Error(`${ou} : le mot « ${interdit[1]} » est interdit dans un écran.`)
  const h = attr('data-hauteur')
  return { nom, html, forme, description, menu: attr('data-menu') || undefined, hauteur: h ? Number(h) : undefined }
}
