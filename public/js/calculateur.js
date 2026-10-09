/* Le calculateur du temps gagné. Même méthode que calculer() dans src/data/temps.ts. */
(function () {
  'use strict'
  var BASE = 250
  function duree(min) {
    var m = Math.round(min)
    if (m === 0) return '0 h'
    if (m < 60) return m + ' min'
    var h = Math.floor(m / 60), r = m % 60
    return r ? h + ' h ' + (r < 10 ? '0' + r : r) : h + ' h'
  }
  function heures(min) { return '≈ ' + Math.round(min / 60) + ' h' }
  function brancher(root) {
    if (root.getAttribute('data-calc-pret')) return
    root.setAttribute('data-calc-pret', '1')
    var taches = JSON.parse(root.getAttribute('data-calculateur'))
    var champ = root.querySelector('[data-calc-n]'), curseur = root.querySelector('[data-calc-curseur]')
    function maj(n) {
      n = Math.max(10, Math.min(5000, Math.round(n) || BASE))
      var k = n / BASE, av = 0, ap = 0
      taches.forEach(function (t) {
        var f = t.prop ? k : 1, a = t.avant * f, b = t.apres * f
        av += a; ap += b
        var l = root.querySelector('[data-calc-ligne="' + t.cle + '"]')
        if (l) { l.querySelector('[data-avant]').textContent = duree(a); l.querySelector('[data-apres]').textContent = duree(b) }
      })
      root.querySelector('[data-calc-avant]').textContent = heures(av)
      root.querySelector('[data-calc-apres]').textContent = heures(ap)
      root.querySelector('[data-calc-gain]').textContent = heures(av - ap)
      root.dispatchEvent(new CustomEvent('calcul', { bubbles: true, detail: { adherents: n, avant: av, apres: ap, gain: av - ap } }))
      return n
    }
    champ.addEventListener('input', function () { var v = +champ.value; if (v >= 10) { curseur.value = Math.min(1500, v); maj(v) } })
    champ.addEventListener('change', function () { champ.value = maj(+champ.value) })
    curseur.addEventListener('input', function () { champ.value = curseur.value; maj(+curseur.value) })
    root.calculer = function (n) { champ.value = n; curseur.value = Math.min(1500, n); return maj(n) }
  }
  function tout() { document.querySelectorAll('[data-calculateur]').forEach(brancher) }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', tout); else tout()
})()
