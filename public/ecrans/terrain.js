/* Écran animé « terrain », repris de /presentation. Données fictives. */
(function () {
  var RM = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var racines = document.querySelectorAll('.ec-terrain');
  for (var i = 0; i < racines.length; i++) monter(racines[i]);

  function monter(r) {
    if (r.getAttribute('data-ec-pret')) return;
    r.setAttribute('data-ec-pret', '1');
    var $ = function (s) { return r.querySelector(s); };
    var cadre = $('.ec-t-cadre'), tel = $('.ec-t-tel'), ecran = $('.ec-t-ecran'), doigt = $('.ec-t-doigt'),
      fant = $('.ec-t-fant'), pion = $('.ec-t-ines'), av = $('.ec-t-ines .ec-t-av'), lib = $('.ec-t-lib .ec-t-rond'), rot = $('.ec-t-rot');
    var ETATS = ['ec-t-choix', 'ec-t-part', 'ec-t-pose', 'ec-t-enreg', 'ec-t-tourne', 'ec-t-fondu'];

    // Le téléphone garde ses 300 px dessinés ; plus étroit, il se réduit d'un bloc.
    function echelle() { var k = Math.min(1, cadre.clientWidth / 300) || 1; tel.style.transform = k < 1 ? 'scale(' + k + ')' : ''; }
    echelle();
    if (window.ResizeObserver) new ResizeObserver(echelle).observe(cadre);
    else window.addEventListener('resize', echelle);

    // Mouvement réduit : l'état final, la libéro posée et la rotation 2/6.
    if (RM) { r.classList.add('ec-t-part', 'ec-t-pose', 'ec-t-tourne'); return; }

    // Une attente qui se suspend quand l'écran sort de la vue, et reprend où elle en était.
    var visible = false, enCours = null, lance = false;
    function armer(w) { w.debut = Date.now(); w.t = setTimeout(function () { if (enCours === w) enCours = null; w.fin(); }, w.reste); }
    function attendre(ms) { return new Promise(function (ok) { var w = { reste: ms, fin: ok, t: 0 }; enCours = w; if (visible) armer(w); }); }
    function pause() { var w = enCours; if (w && w.t) { clearTimeout(w.t); w.t = 0; w.reste = Math.max(0, w.reste - (Date.now() - w.debut)); } }
    function reprendre() { var w = enCours; if (w && !w.t) armer(w); }

    function reflow(el) { return el.offsetWidth; }
    function centre(el) {
      var a = el.getBoundingClientRect(), b = ecran.getBoundingClientRect(), k = b.width / ecran.offsetWidth || 1;
      return [(a.left + a.width / 2 - b.left) / k, (a.top + a.height / 2 - b.top) / k];
    }
    function placer(el, p, s) { el.style.transform = 'translate(' + p[0] + 'px,' + p[1] + 'px)' + (s ? ' scale(' + s + ')' : ''); }
    function doigtVers(p, entree) {
      if (entree) { doigt.style.transition = 'none'; placer(doigt, [p[0] + 70, p[1] + 110]); reflow(doigt); doigt.style.transition = ''; }
      doigt.style.opacity = '1';
      placer(doigt, p);
    }
    function toucher() {
      doigt.classList.remove('ec-t-onde'); reflow(doigt);
      doigt.classList.add('ec-t-presse', 'ec-t-onde');
      return attendre(200).then(function () { doigt.classList.remove('ec-t-presse'); });
    }
    function remettre() {
      r.classList.add('ec-t-sans');
      for (var j = 0; j < ETATS.length - 1; j++) r.classList.remove(ETATS[j]);
      doigt.style.opacity = '0'; doigt.classList.remove('ec-t-onde', 'ec-t-presse');
      fant.style.opacity = '0'; rot.classList.remove('ec-t-appui');
      reflow(r);
      r.classList.remove('ec-t-sans');
    }

    async function scene() {
      remettre();
      reflow(r);
      r.classList.remove('ec-t-fondu');
      await attendre(900);
      // 1. Toucher la libéro sur le banc : elle s'illumine, sa fiche s'ouvre en bas.
      doigtVers(centre(pion), true);
      await attendre(750);
      await toucher();
      r.classList.add('ec-t-choix');
      await attendre(1800);
      // 2. Toucher la place du libéro : la pastille y glisse.
      var cible = centre(lib);
      doigtVers(cible);
      await attendre(750);
      await toucher();
      var de = centre(av);
      fant.style.transition = 'none'; placer(fant, de, 0.82); fant.style.opacity = '1'; reflow(fant);
      fant.style.transition = 'transform .55s cubic-bezier(.3,.7,.2,1)'; placer(fant, cible, 1);
      r.classList.remove('ec-t-choix');
      r.classList.add('ec-t-part', 'ec-t-enreg');
      await attendre(560);
      r.classList.add('ec-t-pose'); fant.style.opacity = '0';
      await attendre(900);
      r.classList.remove('ec-t-enreg');
      await attendre(500);
      // 3. « Rotation » : les six tournent d'un cran, le libéro reste.
      doigtVers(centre(rot));
      await attendre(750);
      rot.classList.add('ec-t-appui');
      await toucher();
      rot.classList.remove('ec-t-appui');
      r.classList.add('ec-t-tourne');
      await attendre(900);
      doigt.style.opacity = '0';
      await attendre(2600);
      await attendre(2000);
      r.classList.add('ec-t-fondu');
      await attendre(400);
    }
    async function boucle() { for (;;) await scene(); }

    function voir(v) {
      visible = v;
      if (!v) { pause(); return; }
      if (!lance) { lance = true; boucle(); } else reprendre();
    }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        var e = es[es.length - 1];
        voir(e.isIntersecting && e.intersectionRatio >= 0.34);
      }, { threshold: [0, 0.35] }).observe(r);
    } else voir(true);
  }
})();
