/* Écran animé « inscription », repris de /presentation. Données fictives. */
(function () {
'use strict';
var REDUIT = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
function brancher(root) {
if (root.getAttribute('data-eci')) return;
root.setAttribute('data-eci', '1');
var $ = function (k) { return root.querySelector('[data-k="' + k + '"]'); };
var ecran = root.querySelector('.eci-ecran');
var doigt = $('doigt'), defile = $('defile'), dy = 0;
var dansVue = false, actif = false, demarre = false, attente = null;
function arme() {
attente.t0 = Date.now();
attente.id = setTimeout(function () { var a = attente; attente = null; a.ok(); }, attente.reste);
}
function dors(ms) {
return new Promise(function (ok) { attente = { ok: ok, reste: ms, id: 0 }; if (actif) arme(); });
}
function suspend() {
actif = false;
root.classList.add('is-pause');
if (attente && attente.id) {
clearTimeout(attente.id);
attente.reste = Math.max(0, attente.reste - (Date.now() - attente.t0));
attente.id = 0;
}
}
function reprend() {
actif = true;
root.classList.remove('is-pause');
if (attente && !attente.id) arme();
if (!demarre) { demarre = true; boucle(); }
}
function maj() { if (dansVue && !document.hidden) reprend(); else suspend(); }
function cl(k, c, on) { var e = $(k); if (e) e.classList.toggle(c, !!on); }
function tx(k, s) { var e = $(k); if (e) e.textContent = s; }
function rejoue(e, c) { e.classList.remove(c); void e.offsetWidth; e.classList.add(c); }
function entre(k) { var e = $(k); e.classList.remove('eci-cache'); rejoue(e, 'eci-entre'); }
function haut(e, fin) { var y = 0; while (e && e !== fin) { y += e.offsetTop; e = e.offsetParent; } return y; }
function vise(k) {
var e = $(k), x = e.offsetWidth / 2, y = e.offsetHeight / 2 + (defile.contains(e) ? -dy : 0);
while (e && e !== ecran) { x += e.offsetLeft; y += e.offsetTop; e = e.offsetParent; }
doigt.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px)';
doigt.style.opacity = '1';
}
async function touche(k) { vise(k); await dors(620); rejoue(doigt, 'is-tap'); await dors(200); }
function defiler(y) { dy = Math.max(0, y); defile.style.transform = dy ? 'translateY(' + (-dy) + 'px)' : ''; }
async function tape(k, mot, pas, suite) {
for (var i = 1; i <= mot.length; i++) {
tx(k, mot.slice(0, i));
if (suite) suite(mot.slice(0, i));
await dors(pas);
}
}
function etatInitial() {
root.classList.remove('is-ouvert', 'is-libre', 'is-fini');
['prenom', 'nom', 'date'].forEach(function (k) { tx('v-' + k, ''); cl('c-' + k, 'is-focus', false); });
tx('t-prenom', '');
['alerte', 'sexe', 'm15f', 'm15g'].forEach(function (k) { var e = $(k); e.classList.add('eci-cache'); e.classList.remove('eci-entre'); });
tx('alerte', '2 cours ouverts à une naissance en 2013');
tx('sous', 'Renseignez la date de naissance pour voir les cours ouverts.');
cl('f', 'is-on', false); cl('m15g', 'eci-plie', false); cl('m15f', 'is-choisi', false);
tx('total', '0 €'); tx('mention', ''); cl('mention', 'eci-cache', true);
tx('voir', 'Voir le détail');
cl('valider0', 'is-off', true); cl('err', 'eci-cache', false);
tx('choix', 'En une fois'); cl('options', 'is-vu', false); cl('o1', 'is-on', true); cl('o10', 'is-on', false);
cl('regle', 'eci-cache', true); tx('valider', 'Valider ma demande'); cl('valider', 'is-off', false);
defiler(0); $('cdef').style.transform = '';
doigt.style.opacity = '0'; doigt.style.transform = '';
}
async function scenario() {
await dors(800);
await touche('c-prenom'); cl('c-prenom', 'is-focus', true);
await tape('v-prenom', 'Léa', 140, function (s) { tx('t-prenom', ' : ' + s); });
await dors(250); cl('c-prenom', 'is-focus', false);
await touche('c-nom'); cl('c-nom', 'is-focus', true);
await tape('v-nom', 'Martin', 95);
await dors(250); cl('c-nom', 'is-focus', false);
defiler(90);
await dors(700);
await touche('c-date'); cl('c-date', 'is-focus', true);
await tape('v-date', '14/03/2013', 85);
await dors(300); cl('c-date', 'is-focus', false);
entre('alerte');
tx('sous', 'Plusieurs cours possibles : la réduction s’applique toute seule.');
await dors(150); entre('sexe');
await dors(150); entre('m15f');
await dors(120); entre('m15g');
await dors(500);
defiler(haut($('alerte'), defile) - 10);
await dors(1300);
await touche('f'); cl('f', 'is-on', true);
await dors(300);
cl('m15g', 'eci-plie', true);
tx('alerte', '1 cours ouvert à une naissance en 2013'); rejoue($('alerte'), 'eci-entre');
await dors(1100);
await touche('m15f'); cl('m15f', 'is-choisi', true);
tx('total', '180 €'); rejoue($('total'), 'eci-pop');
tx('mention', 'ou 3 × 60 € sans frais'); entre('mention');
cl('valider0', 'is-off', false); cl('err', 'eci-cache', true);
await dors(1500);
await touche('voir');
root.classList.add('is-ouvert'); tx('voir', 'Masquer le détail');
await dors(650); root.classList.add('is-libre');
await dors(700);
await touche('select'); cl('options', 'is-vu', true);
await dors(650);
await touche('o10'); cl('o1', 'is-on', false); cl('o10', 'is-on', true);
await dors(300);
cl('options', 'is-vu', false); tx('choix', 'En 10 fois, sans frais');
entre('regle'); rejoue($('regle'), 'eci-surligne');
tx('mention', 'ou 27 € puis 9 × 17 € sans frais'); rejoue($('mention'), 'eci-entre');
doigt.style.opacity = '0';
await dors(3000);
await touche('valider'); tx('valider', 'Enregistrement…'); cl('valider', 'is-off', true);
await dors(900);
doigt.style.opacity = '0';
root.classList.add('is-fini');
await dors(2600);
var c = $('cdef'), ecart = c.offsetHeight - $('conf').clientHeight;
if (ecart > 0) { c.style.transform = 'translateY(' + (-ecart) + 'px)'; await dors(2400); }
await dors(2000);
}
async function boucle() {
var premier = true;
for (;;) {
if (!premier) { root.classList.add('is-voile'); await dors(400); }
root.classList.add('is-fixe');
etatInitial();
void root.offsetWidth;
root.classList.remove('is-fixe');
if (!premier) { root.classList.remove('is-voile'); }
premier = false;
await scenario();
}
}
if (REDUIT) {
root.classList.add('is-fixe');
etatInitial();
root.classList.add('is-fini');
return;
}
if ('IntersectionObserver' in window) {
new IntersectionObserver(function (entrees) {
entrees.forEach(function (e) { dansVue = e.isIntersecting && e.intersectionRatio >= 0.35; });
maj();
}, { threshold: [0, 0.35, 0.6, 1] }).observe(root);
} else {
dansVue = true; maj();
}
document.addEventListener('visibilitychange', maj);
}
function tout() { Array.prototype.forEach.call(document.querySelectorAll('.ec-inscription'), brancher); }
tout();
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', tout);
})();
