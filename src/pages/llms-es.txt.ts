/*
  llms-es.txt : le site résumé en ESPAGNOL pour les assistants IA, avec les seules
  pages qui existent en espagnol (src/lib/plan.ts, planEs). Même texte que
  llms.txt, traduit ; les chiffres viennent des mêmes constantes. Une page
  restée en français n'y figure pas : elle est dans llms.txt.
*/
import { planEs } from '../lib/plan'
import { OFFRES, EMAIL, MISE_EN_ROUTE, ACCROCHE } from '../data/site'
import { TOTAL, ADHERENTS_REFERENCE } from '../data/temps'
import { traducteur } from '../i18n/ui'
import { local } from '../i18n/liens'

export async function GET() {
  const t = traducteur('es')
  const pages = await planEs()
  const groupes = [...new Set(pages.map((p) => p.groupe))]
  const offres = OFFRES.map((o) => `- ${o.nom}: ${o.taux} de las cuotas cobradas en línea${o.tauxBoutique ? ` (+ ${o.tauxBoutique} sobre la tienda)` : ''}, unas ${o.heures} h recuperadas por temporada (estimación para ${ADHERENTS_REFERENCE} socios).`).join('\n')
  const txt = `# OnClub

> ${t(ACCROCHE)} OnClub es una plataforma francesa para las asociaciones que inscriben socios: clubes deportivos, escuelas de música, de danza, de teatro y de idiomas. Inscripciones y cuotas en línea, seguimiento del dinero, recordatorio de pago con un botón, justificantes, temporada siguiente, convocatorias, web y tienda de la asociación.

El tiempo: estimación de OnClub (no un estudio) para una asociación de ${ADHERENTS_REFERENCE} socios, unas ${TOTAL.avant} de papeleo por temporada hoy frente a unas ${TOTAL.apres} con OnClub, es decir, unas ${TOTAL.gain} que recuperan los voluntarios. Método: https://onclub.app${local('/temps-gagne', 'es')}

Los planes (una suscripción en porcentaje, sin cuota fija, nada sobre los cheques ni el efectivo; las comisiones de tarjeta corren a cargo de la asociación):
${offres}

Puesta en marcha: ${t(MISE_EN_ROUTE)} Contacto: ${EMAIL}.

Las páginas que siguen están en español. El resto del sitio, en francés: https://onclub.app/llms.txt

${groupes.map((g) => `## ${g}\n\n${pages.filter((p) => p.groupe === g).map((p) => `- [${p.nom}](${p.url})${p.ligne ? `: ${p.ligne}` : ''}`).join('\n')}`).join('\n\n')}
`
  return new Response(txt, { headers: { 'content-type': 'text/plain; charset=utf-8' } })
}
