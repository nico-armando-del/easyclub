/* Écran animé « boutique », repris de /presentation. Données fictives. */
(function(){
var RM=!!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches);
var tous=document.querySelectorAll('.ec-boutique');
for(var n=0;n<tous.length;n++)monter(tous[n]);
function monter(R){
if(R.getAttribute('data-ecb'))return;
R.setAttribute('data-ecb','1');
var $=function(s){return R.querySelector(s);},$$=function(s){return [].slice.call(R.querySelectorAll(s));};
var E=$('.b-ecran'),T=$('.b-tel'),C=$('.b-cadre'),D=$('.b-doigt'),pB=$('.b-v-bout .b-page'),pC=$('.b-v-cmd .b-page'),fd=$('.b-fd'),act=$('.b-act'),champs=$$('.b-in');
var TXT=['Claire Martin','claire.martin@exemple.fr','06 39 98 12 34'];
// Les trois en-têtes du club, la seconde photo du maillot et les tailles : écrits une fois.
$$('.b-page').forEach(function(p,i){p.insertAdjacentHTML('afterbegin','<div class="b-tete"><div class="b-marque"><span class="b-sigle">VC</span><div><div class="b-nom">Volley Club Démo</div><div class="b-sais">Saison 2026 · 2027</div></div></div><span class="b-lien'+(i?'':' b-lb')+'">'+p.getAttribute('data-l')+'</span></div>');});
$('.b-gal').insertBefore($('.b-a1 svg').cloneNode(true),$('.b-gal').firstChild);
$('.b-tls').innerHTML=[['10 ans'],['12 ans','Plus que 2 disponibles',1],['14 ans','Épuisé',2],['S'],['M'],['L','Plus que 1 disponible'],['XL']].map(function(t){
return '<div class="b-tl'+(t[2]==2?' b-tz':'')+'"><div><div class="b-tn">'+t[0]+'</div>'+(t[1]?'<div class="b-tm">'+t[1]+'</div>':'')+'</div>'+(t[2]==2?'':'<span class="b-btn b-out'+(t[2]?' b-aj':'')+'">Ajouter</span>')+(t[2]==1?'<span class="b-cpt"><i>−</i><b>1</b><i>+</i></span>':'')+'</div>';}).join('');
function echelle(){var w=C.clientWidth;if(w)T.style.setProperty('--k',Math.min(1,w/300));}
echelle();
if(window.ResizeObserver)new ResizeObserver(echelle).observe(C);else addEventListener('resize',echelle);
var vu=false,file=[];
// N'avance que pendant que l'écran est visible : hors écran, l'animation attend.
function att(ms){return new Promise(function(fin){var reste=ms;(function pas(){if(reste<=0)return fin();(vu?Promise.resolve():new Promise(function(r){file.push(r);})).then(function(){var t=Date.now();setTimeout(function(){reste-=Date.now()-t;pas();},Math.min(reste,100));});})();});}
function defile(el,y){el.style.transform='translateY('+(-y)+'px)';}
async function touche(el){
var r=el.getBoundingClientRect(),e=E.getBoundingClientRect(),k=e.width/280||1;
D.classList.add('on');D.style.transform='translate('+(r.left+r.width/2-e.left)/k+'px,'+(r.top+r.height/2-e.top)/k+'px)';
await att(700);D.classList.add('tap');await att(280);D.classList.remove('tap');await att(120);}
async function tape(c,txt){var s=c.firstChild;c.classList.add('f');for(var i=0;i<txt.length;i++){s.textContent+=txt.charAt(i);await att(25+Math.random()*25);}await att(200);c.classList.remove('f');}
function initial(fin){
E.classList.add('b-net');
E.setAttribute('data-vue',fin?'cmd':'site');E.setAttribute('data-etape',fin?'coord':'rayon');
E.classList.remove('fiche','ajoute','plein','paie');
if(fin)E.classList.add('ajoute','plein');
defile(pB,0);defile(pC,fin?176:0);defile(fd,0);pB.classList.remove('b-cache');
champs.forEach(function(c,i){c.classList.remove('f');c.firstChild.textContent=fin?TXT[i]:'';});
act.textContent='Continuer';act.classList.remove('b-off');
D.classList.remove('on','tap');D.style.transform='';
void E.offsetWidth;E.classList.remove('b-net');}
async function boucle(){
for(;;){
initial();E.classList.remove('b-fondu');await att(600);
await touche($('.b-lb'));E.setAttribute('data-vue','bout');await att(1600);
defile(pB,132);await att(1000);
await touche($('.b-a1 .b-img'));E.classList.add('fiche');await att(1000);
defile(fd,205);await att(1500);
await touche($('.b-aj'));E.classList.add('ajoute','plein');await att(1200);
await touche($('.b-fini'));E.classList.remove('fiche');await att(1100);
await touche(act);pB.classList.add('b-cache');await att(220);
E.setAttribute('data-etape','coord');act.textContent='Commander';
pB.style.transition='none';defile(pB,0);void pB.offsetWidth;pB.style.transition='';
pB.classList.remove('b-cache');await att(1800);
defile(pB,192);await att(900);
for(var i=0;i<3;i++){if(i==2){defile(pB,240);await att(800);}await touche(champs[i]);await tape(champs[i],TXT[i]);}
await att(200);await touche(act);
act.textContent='Enregistrement…';act.classList.add('b-off');await att(900);
D.classList.remove('on');E.classList.add('paie');await att(2000);
E.setAttribute('data-vue','cmd');E.classList.remove('paie');await att(2300);
defile(pC,176);await att(3200);
await att(2000);E.classList.add('b-fondu');await att(450);}}
if(RM){initial(1);return;}
var parti=false;
function vois(v){vu=v;R.classList.toggle('b-pause',!v);if(v){var a=file;file=[];a.forEach(function(f){f();});if(!parti){parti=true;boucle();}}}
if(!window.IntersectionObserver){vois(true);return;}
new IntersectionObserver(function(x){x.forEach(function(y){vois(y.isIntersecting&&y.intersectionRatio>=.34);});},{threshold:[0,.35]}).observe(R);
}
})();
