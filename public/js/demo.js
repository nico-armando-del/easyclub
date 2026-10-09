/*
  LE PARCOURS DE DÉMO (/demo). Une étape à la fois ; à l'étape 4, le temps est
  recalculé par le calculateur de la page (public/js/calculateur.js) ; à
  l'étape 5, les liens WhatsApp et e-mail sont préremplis avec les réponses.
  Rien n'est envoyé ni stocké par ce script : le message ne part que si la
  personne l'envoie elle-même depuis WhatsApp ou sa messagerie.
*/
(function () {
  'use strict'
  var form = document.querySelector('[data-parcours]')
  if (!form) return
  var EMAIL = 'onclub.contact@gmail.com'
  var WA = '33645049227'
  var OFFRES = { mini: 'OnClub Mini', pro: 'OnClub Pro', max: 'OnClub Pro Max IA' }
  var etapes = Array.prototype.slice.call(form.querySelectorAll('[data-etape]'))
  var fil = Array.prototype.slice.call(form.querySelectorAll('[data-etapes-fil] li'))
  var champN = form.querySelector('[data-adherents]')
  var calc = document.getElementById('calc-demo')
  var courant = 1
  var gain = null

  // Paramètres d'adresse : ?type=musique&offre=pro
  var params = new URLSearchParams(location.search)
  var offre = OFFRES[params.get('offre')] || ''
  var typeVoulu = params.get('type')
  if (typeVoulu) {
    var r = form.querySelector('[data-type="' + typeVoulu.replace(/[^a-z]/g, '') + '"]')
    if (r) r.checked = true
  }

  function montre(n, focus) {
    courant = Math.max(1, Math.min(etapes.length, n))
    etapes.forEach(function (e) { e.classList.toggle('active', +e.getAttribute('data-etape') === courant) })
    fil.forEach(function (li) {
      var p = +li.getAttribute('data-pas')
      li.classList.toggle('fait', p < courant)
      li.classList.toggle('en-cours', p === courant)
      if (p === courant) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current')
    })
    if (courant === 4) calcule()
    if (courant >= 4) majMessage()
    if (focus) {
      var lg = etapes[courant - 1].querySelector('legend')
      if (lg) { lg.setAttribute('tabindex', '-1'); lg.focus({ preventScroll: true }) }
      var haut = form.getBoundingClientRect().top + window.scrollY - 16
      if (window.scrollY > haut) window.scrollTo({ top: haut, behavior: 'smooth' })
    }
  }

  function adherents() {
    var n = Math.round(+champN.value)
    if (!(n >= 10)) n = 250
    return Math.min(5000, n)
  }
  function pese() {
    return Array.prototype.slice.call(form.querySelectorAll('[data-pese]:checked'))
  }
  function calcule() {
    var n = adherents()
    champN.value = n
    if (calc && calc.calculer) calc.calculer(n)
    var resume = form.querySelector('[data-resume-n]')
    if (resume) resume.textContent = 'Calcul pour ' + n + ' adhérents. Estimation, pas une promesse.'
    // Les fonctionnalités qui répondent à ce qui pèse (toutes si rien n'est coché).
    var cles = pese().map(function (c) { return c.getAttribute('data-pese') })
    form.querySelectorAll('[data-pour]').forEach(function (li) {
      var pour = li.getAttribute('data-pour').split(' ')
      li.hidden = cles.length > 0 && !pour.some(function (k) { return cles.indexOf(k) >= 0 })
    })
  }
  if (calc) calc.addEventListener('calcul', function (e) { gain = e.detail.gain })

  function texte() {
    var type = form.querySelector('input[name="type"]:checked')
    var asso = (form.querySelector('[data-asso]').value || '').trim()
    var ville = (form.querySelector('[data-ville]').value || '').trim()
    var lignes = ['Bonjour, je voudrais une démo d’OnClub pour notre association.', '']
    lignes.push('Association : ' + (asso || 'non précisé') + (type ? ' (' + type.value + ')' : ''))
    if (ville) lignes.push('Ville : ' + ville)
    lignes.push('Adhérents : environ ' + adherents())
    var p = pese().map(function (c) { return c.value.toLowerCase() })
    if (p.length) lignes.push('Ce qui pèse le plus : ' + p.join(', '))
    if (gain !== null) lignes.push('Temps rendu estimé par le site : ≈ ' + Math.round(gain / 60) + ' h par saison')
    if (offre) lignes.push('Offre qui nous intéresse : ' + offre)
    return lignes.join('\n')
  }
  function majMessage() {
    var t = texte()
    var wa = form.querySelector('[data-lien-wa]')
    var mail = form.querySelector('[data-lien-mail]')
    var ap = form.querySelector('[data-apercu]')
    if (wa) wa.href = 'https://wa.me/' + WA + '?text=' + encodeURIComponent(t)
    if (mail) mail.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent('Démo OnClub') + '&body=' + encodeURIComponent(t)
    if (ap) ap.textContent = t
  }

  form.addEventListener('click', function (e) {
    var b = e.target.closest('button')
    if (!b) return
    if (b.hasAttribute('data-suivant')) { e.preventDefault(); montre(courant + 1, true) }
    else if (b.hasAttribute('data-retour')) { e.preventDefault(); montre(courant - 1, true) }
    else if (b.hasAttribute('data-n')) { e.preventDefault(); champN.value = b.getAttribute('data-n') }
  })
  form.addEventListener('input', function () { if (courant >= 4) majMessage() })
  form.addEventListener('submit', function (e) { e.preventDefault(); montre(courant + 1, true) })
  // Entrée dans le champ nombre : étape suivante, pas d'envoi du formulaire.
  champN.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); montre(3, true) } })
  document.addEventListener('onclub:ville', function () { if (courant >= 4) majMessage() })

  var r2 = form.querySelector('[data-raccourcis]')
  if (r2) r2.hidden = false
  montre(1, false)
})()
