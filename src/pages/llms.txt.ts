/* llms.txt : le site résumé pour les assistants IA, construit à partir des collections (src/lib/plan.ts). */
import { plan } from '../lib/plan'
import { OFFRES, EMAIL, MISE_EN_ROUTE, ACCROCHE } from '../data/site'
import { TOTAL } from '../data/temps'

export async function GET() {
  const pages = await plan()
  const groupes = [...new Set(pages.map((p) => p.groupe))]
  const offres = OFFRES.map((o) => `- ${o.nom} : ${o.taux} des cotisations encaissées en ligne${o.tauxBoutique ? ` (+ ${o.tauxBoutique} sur la boutique)` : ''}, environ ${o.heures} h rendues par saison (estimation pour 250 adhérents).`).join('\n')
  const txt = `# OnClub

> ${ACCROCHE} OnClub est une plateforme française pour les associations qui inscrivent des adhérents : clubs de sport, écoles de musique, de danse, de théâtre, de langues. Inscriptions et cotisations en ligne, suivi de l’argent, relance d’un bouton, pièces justificatives, saison suivante, convocations, site et boutique de l’association.

Le temps : estimation OnClub (pas une étude) pour une association de 250 adhérents, environ ${TOTAL.avant} d’administratif par saison aujourd’hui contre environ ${TOTAL.apres} avec OnClub, soit environ ${TOTAL.gain} rendues aux bénévoles. Méthode : https://onclub.app/temps-gagne

Les offres (un abonnement au pourcentage, rien de fixe, rien sur les chèques et les espèces ; frais de carte bancaire à la charge de l’association) :
${offres}

Mise en route : ${MISE_EN_ROUTE} Contact : ${EMAIL}.

${groupes.map((g) => `## ${g}\n\n${pages.filter((p) => p.groupe === g).map((p) => `- [${p.nom}](${p.url})${p.ligne ? ` : ${p.ligne}` : ''}`).join('\n')}`).join('\n\n')}
`
  return new Response(txt, { headers: { 'content-type': 'text/plain; charset=utf-8' } })
}
