/* Contrôle des écrans animés repris de /presentation, SANS toucher à leurs fichiers :
   1. Un écran « inactif » (dans un [data-inactif]) ou mis en pause est vu comme hors de
      l'écran par son propre IntersectionObserver : il s'arrête, et reprend où il en était.
      Ce script doit être chargé AVANT les scripts des écrans.
   2. [data-echelle] : un écran de taille fixe (--l × --h) mis à l'échelle de son cadre,
      éventuellement recadré (--cx, --cy, --cw, --ch : la zone gardée, en pixels de l'écran).
   3. [data-pause-ecrans] : le bouton « Mettre en pause » (critère 2.2.2 des WCAG) ;
      ses deux libellés viennent de data-pause et data-reprise (pages traduites).
   Chargé par SceneAccueil.astro (script synchrone, avant les écrans en différé). */
(function () {
  var IO = window.IntersectionObserver
  window.IONatif = IO
  var regs = [], pause = false
  if (IO) {
    var bloque = function (t) { return pause || !!(t.closest && t.closest('[data-inactif]')) }
    var hors = function (t) { return { target: t, isIntersecting: false, intersectionRatio: 0, boundingClientRect: t.getBoundingClientRect(), intersectionRect: null, rootBounds: null, time: performance.now() } }
    var Faux = function (cb, opt) {
      var reg = { cb: cb, cibles: [], der: new Map() }
      var o = new IO(function (es, ob) {
        es.forEach(function (e) { reg.der.set(e.target, e) })
        cb(es.map(function (e) { return bloque(e.target) ? hors(e.target) : e }), ob)
      }, opt)
      var obs = o.observe.bind(o)
      o.observe = function (t) { reg.cibles.push(t); obs(t) }
      reg.o = o; regs.push(reg); return o
    }
    Faux.prototype = IO.prototype
    window.IntersectionObserver = Faux
  }
  window.ecransRafraichir = function () {
    regs.forEach(function (r) {
      var es = r.cibles.map(function (t) { var d = r.der.get(t); if (!d) return null; return bloque(t) ? hors(t) : d }).filter(Boolean)
      if (es.length) r.cb(es, r.o)
    })
  }
  window.ecransPause = function (p) { pause = !!p; window.ecransRafraichir() }

  function echelle(el) {
    var cs = getComputedStyle(el)
    var l = parseFloat(cs.getPropertyValue('--cw')) || parseFloat(cs.getPropertyValue('--l')) || 880
    var w = el.clientWidth
    if (w) el.style.setProperty('--k', (w / l).toFixed(4))
  }
  function pret() {
    var els = [].slice.call(document.querySelectorAll('[data-echelle]'))
    els.forEach(echelle)
    if ('ResizeObserver' in window) { var ro = new ResizeObserver(function (es) { es.forEach(function (e) { echelle(e.target) }) }); els.forEach(function (e) { ro.observe(e) }) }
    else window.addEventListener('resize', function () { els.forEach(echelle) })
    ;[].forEach.call(document.querySelectorAll('[data-pause-ecrans]'), function (b) {
      b.addEventListener('click', function () {
        var p = b.getAttribute('aria-pressed') !== 'true'
        ;[].forEach.call(document.querySelectorAll('[data-pause-ecrans]'), function (x) {
          x.setAttribute('aria-pressed', String(p))
          var t = x.querySelector('[data-texte]'); if (t) t.textContent = p ? (x.getAttribute('data-reprise') || 'Relancer l’animation') : (x.getAttribute('data-pause') || 'Mettre en pause')
        })
        document.documentElement.classList.toggle('ecrans-en-pause', p)
        window.ecransPause(p)
      })
    })
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', pret); else pret()
})()
