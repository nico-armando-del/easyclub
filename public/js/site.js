/*
  LE SEUL SCRIPT COMMUN DU SITE (aucune dépendance).
  1. Menus : un <details> ouvert se referme au clic ailleurs ou sur Échap.
  2. Consentement : bandeau CNIL, refus par défaut, choix gardé 180 jours.
  3. Ville : SEULEMENT après « Accepter », un appel à /api/ville (fonction du
     site, rien n'est journalisé ni stocké côté serveur). La ville reste dans
     sessionStorage, sur l'appareil, le temps de la visite.
*/
(function () {
  'use strict'
  var NOM = 'onclub_consentement'
  var DUREE = 180 * 24 * 3600 // 6 mois au plus (CNIL)

  /* ---------- 1. Menus ---------- */
  document.addEventListener('click', function (e) {
    document.querySelectorAll('details.deroulant[open], details.menu-tel[open]').forEach(function (d) {
      if (!d.contains(e.target)) d.removeAttribute('open')
    })
  })
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return
    document.querySelectorAll('details.deroulant[open], details.menu-tel[open]').forEach(function (d) {
      d.removeAttribute('open'); var s = d.querySelector('summary'); if (s) s.focus()
    })
  })
  document.querySelectorAll('details.deroulant').forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (!d.open) return
      document.querySelectorAll('details.deroulant[open]').forEach(function (o) { if (o !== d) o.removeAttribute('open') })
    })
  })

  /* ---------- 2. Consentement ---------- */
  function lire() {
    var m = document.cookie.match(new RegExp('(?:^|; )' + NOM + '=([^;]*)'))
    return m ? decodeURIComponent(m[1]) : null
  }
  function ecrire(v) {
    document.cookie = NOM + '=' + v + '; Max-Age=' + DUREE + '; Path=/; SameSite=Lax' + (location.protocol === 'https:' ? '; Secure' : '')
  }
  var bandeau = document.querySelector('[data-consentement]')
  function ouvrir() {
    if (!bandeau) return
    bandeau.hidden = false
    document.documentElement.classList.add('consentement-ouvert')
    // Une marge sous la page, de la hauteur du bandeau : il ne cache jamais la fin du contenu.
    document.body.style.paddingBottom = (bandeau.offsetHeight + 8) + 'px'
  }
  function fermer() {
    if (!bandeau) return
    bandeau.hidden = true
    document.documentElement.classList.remove('consentement-ouvert')
    document.body.style.paddingBottom = ''
  }
  if (bandeau) {
    bandeau.querySelectorAll('[data-consentement-choix]').forEach(function (b) {
      b.addEventListener('click', function () {
        var v = b.getAttribute('data-consentement-choix')
        ecrire(v)
        fermer()
        if (v === 'accepte') chercherVille()
        else oublierVille()
      })
    })
  }
  document.querySelectorAll('[data-consentement-ouvrir]').forEach(function (b) {
    b.addEventListener('click', ouvrir)
  })
  var choix = lire()
  if (choix !== 'accepte' && choix !== 'refuse') {
    // Sur l'accueil, le bandeau ne couvre jamais la scène : il s'ouvre quand la scène a quitté
    // l'écran, ou au bout de 5,6 s si le visiteur n'a pas encore défilé.
    var scene = document.querySelector('[data-scene]')
    if (scene) {
      var ouvert = false, defile = false
      var une = function () { if (ouvert) return; ouvert = true; ouvrir() }
      window.addEventListener('scroll', function () { defile = true }, { passive: true, once: true })
      setTimeout(function () { if (!defile) une() }, 5600)
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (es, o) {
          es.forEach(function (e) { if (!e.isIntersecting && defile) { o.disconnect(); une() } })
        }).observe(scene)
      } else window.addEventListener('scroll', une, { passive: true, once: true })
    } else ouvrir()
  }

  /* ---------- 3. Ville ---------- */
  var CLE = 'onclub_ville'
  function memo(v) { try { if (v) sessionStorage.setItem(CLE, v); else sessionStorage.removeItem(CLE) } catch (e) {} }
  function souvenir() { try { return sessionStorage.getItem(CLE) } catch (e) { return null } }

  function appliquer(ville) {
    window.onclubVille = ville || null
    document.querySelectorAll('[data-ville-phrase]').forEach(function (el) {
      if (!el.hasAttribute('data-ville-defaut')) el.setAttribute('data-ville-defaut', el.textContent)
      el.textContent = ville ? el.getAttribute('data-ville-phrase').replace('{ville}', ville) : el.getAttribute('data-ville-defaut')
    })
    document.querySelectorAll('[data-ville-champ]').forEach(function (el) {
      if (ville && !el.value) { el.value = ville; el.setAttribute('data-ville-auto', '1') }
      if (!ville && el.getAttribute('data-ville-auto')) { el.value = ''; el.removeAttribute('data-ville-auto') }
      el.dispatchEvent(new Event('input', { bubbles: true }))
    })
    document.dispatchEvent(new CustomEvent('onclub:ville', { detail: { ville: ville || null } }))
  }
  function oublierVille() { memo(null); appliquer(null) }
  function chercherVille() {
    var connue = souvenir()
    if (connue) { appliquer(connue); return }
    if (!window.fetch) return
    fetch('/api/ville', { headers: { accept: 'application/json' }, credentials: 'omit', cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null })
      .then(function (d) {
        var v = d && typeof d.ville === 'string' ? d.ville.trim().slice(0, 60) : ''
        if (v) { memo(v); appliquer(v) }
      })
      .catch(function () {})
  }
  if (choix === 'accepte') chercherVille()
})()
