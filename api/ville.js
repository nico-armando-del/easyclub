/*
  /api/ville — LA SEULE FONCTION SERVEUR DU SITE.

  Appelée par public/js/site.js UNIQUEMENT après « Accepter » dans le bandeau
  de consentement. Elle lit les en-têtes de géolocalisation que Vercel ajoute
  à chaque requête (x-vercel-ip-city, x-vercel-ip-country-region,
  x-vercel-ip-country) et renvoie la ville approximative.

  Rien n'est journalisé (aucun console.*), rien n'est stocké, aucun service
  tiers n'est appelé. La réponse n'est jamais mise en cache (no-store) : une
  ville ne doit pas être servie à quelqu'un d'autre.

  Déploiement : Vercel déploie tout fichier de api/ comme une fonction, à côté
  du dossier statique dist/ produit par Astro (aucun adaptateur nécessaire).
*/
const propre = (v, max) => {
  if (!v) return null
  let s = v
  try { s = decodeURIComponent(v) } catch {}
  s = s.replace(/[^\p{L}\p{M}\s'’\-.]/gu, '').trim().slice(0, max)
  return s || null
}

export default {
  fetch(request) {
    const h = request.headers
    const corps = {
      ville: propre(h.get('x-vercel-ip-city'), 60),
      region: propre(h.get('x-vercel-ip-country-region'), 10),
      pays: propre(h.get('x-vercel-ip-country'), 2),
    }
    return new Response(JSON.stringify(corps), {
      status: 200,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'private, no-store, max-age=0',
        'x-robots-tag': 'noindex',
      },
    })
  },
}
