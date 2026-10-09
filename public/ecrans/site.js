/* Écran animé « site », repris de /presentation. Données fictives. */
(function(){
var DEMANDE='Change le grand titre par “Le volley, une famille”';
var AVANT='Servir. Bloquer. Gagner.',APRES='Le volley, une famille';
var reduit=!!(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches);

function monter(root){
if(root.getAttribute('data-es-pret'))return;
root.setAttribute('data-es-pret','1');
var el={},visible=false,actifs=[],parti=false;
Array.prototype.forEach.call(root.querySelectorAll('[data-es]'),function(n){el[n.getAttribute('data-es')]=n;});
if(!el.fil||!el.mots||!el.curseur)return;

function etat(c,oui){root.classList.toggle(c,!!oui);}
function voir(n,oui){n.classList.toggle('es-la',!!oui);}
function compte(n){el.compte.textContent=n+' / 1200 · ⌘⏎ pour envoyer';}
function titre(t,neuf){
var b=el.mots,m=t.split(/\s+/),vif=m.length>=3?1:-1;
b.classList.remove('es-neuf');b.textContent='';
m.forEach(function(x,i){var s=document.createElement('span');s.textContent=x;if(i===vif)s.className='es-lime';s.style.animationDelay=i*.07+'s';b.appendChild(s);});
if(neuf){void b.offsetWidth;b.classList.add('es-neuf');}
}
function attendre(ms){
return new Promise(function(ok){
var reste=ms,debut=0,t=null,o={
pause:function(){if(t){clearTimeout(t);t=null;reste-=Date.now()-debut;}},
reprise:function(){if(!t){debut=Date.now();t=setTimeout(fin,Math.max(0,reste));}}
};
function fin(){t=null;var i=actifs.indexOf(o);if(i>=0)actifs.splice(i,1);ok();}
actifs.push(o);
if(visible)o.reprise();
});
}
function viser(n,fx,fy){
var r=n.getBoundingClientRect(),R=root.getBoundingClientRect();
el.curseur.style.transform='translate('+Math.round(r.left-R.left+r.width*fx)+'px,'+Math.round(r.top-R.top+r.height*fy)+'px)';
}
function clic(n){
var c=el.curseur;c.classList.remove('es-clic');void c.offsetWidth;c.classList.add('es-clic');
if(n){n.classList.add('es-appui');setTimeout(function(){n.classList.remove('es-appui');},160);}
}
function defiler(y){
var f=el.fil;y=Math.max(0,Math.min(y,f.scrollHeight-f.clientHeight));
if(Math.abs(y-f.scrollTop)<2)return false;
if(f.scrollTo)f.scrollTo({top:y,behavior:'smooth'});else f.scrollTop=y;
return true;
}
async function montrer(n,haut){
var F=el.fil.getBoundingClientRect(),r=n.getBoundingClientRect(),y=null;
if(haut)y=el.fil.scrollTop+r.top-F.top-8;
else if(r.bottom>F.bottom-6)y=el.fil.scrollTop+r.bottom-F.bottom+10;
else if(r.top<F.top)y=el.fil.scrollTop+r.top-F.top-8;
if(y!==null&&defiler(y))await attendre(520);
}
function depart(){
['dem','attente','relu','fait'].forEach(function(k){voir(el[k],false);});
['es-tape','es-focus','es-occupe'].forEach(function(c){etat(c,false);});
el.saisie.textContent='';compte(0);
el.envoyer.textContent='Envoyer';
el.c1.classList.remove('es-coche');el.c2.classList.remove('es-coche');
el.badge.textContent='0 / 1 à appliquer';el.badge.classList.remove('es-accent');
el.publier.textContent='Publier 0 retouche';el.publier.classList.add('es-off');
el.cadre.classList.remove('es-recharge');
titre(AVANT);
el.fil.scrollTop=0;
el.curseur.style.opacity='0';
var R=root.getBoundingClientRect();
el.curseur.style.transform='translate('+Math.round(R.width*.6)+'px,'+Math.round(R.height*.75)+'px)';
}
function etatFinal(){
depart();
voir(el.dem,true);voir(el.fait,true);
titre(APRES);
el.fil.scrollTop=el.fil.scrollHeight;
}
async function tour(){
depart();
await attendre(800);
el.curseur.style.opacity='1';
viser(el.zone,.8,.85);await attendre(900);
clic();etat('es-focus',true);await attendre(350);
for(var i=1;i<=DEMANDE.length;i++){
el.saisie.textContent=DEMANDE.slice(0,i);compte(i);
if(i===1)etat('es-tape',true);
await attendre(DEMANDE.charAt(i-1)===' '?70:36);
}
await attendre(450);
viser(el.envoyer,.5,.55);await attendre(800);
clic(el.envoyer);await attendre(180);
el.saisie.textContent='';compte(0);
etat('es-tape',false);etat('es-focus',false);etat('es-occupe',true);
el.envoyer.textContent='En cours…';
voir(el.dem,true);voir(el.attente,true);
await montrer(el.attente);
await attendre(1900);
voir(el.attente,false);voir(el.relu,true);
etat('es-occupe',false);el.envoyer.textContent='Envoyer';
await attendre(60);
await montrer(el.relu,true);
await montrer(el.table);
await attendre(1800);
await montrer(el.c1);
viser(el.c1,.1,.35);await attendre(800);
clic(el.c1);el.c1.classList.add('es-coche');
el.badge.textContent='1 / 1 à appliquer';el.badge.classList.add('es-accent');
el.publier.textContent='Publier 1 retouche';
await attendre(600);
await montrer(el.publier);
viser(el.c2,.1,.45);await attendre(700);
clic(el.c2);el.c2.classList.add('es-coche');el.publier.classList.remove('es-off');
await attendre(550);
viser(el.publier,.5,.55);await attendre(700);
clic(el.publier);await attendre(150);
el.publier.textContent='En cours…';etat('es-occupe',true);
await attendre(950);
voir(el.relu,false);voir(el.fait,true);etat('es-occupe',false);
el.cadre.classList.add('es-recharge');
await montrer(el.fait);
await attendre(380);
titre(APRES,true);el.cadre.classList.remove('es-recharge');
await attendre(450);
viser(el.mots,.62,1.4);
await attendre(3400);
el.curseur.style.opacity='0';
await attendre(2000);
}
async function boucle(){for(;;)await tour();}
function bascule(v){
visible=v;
actifs.slice().forEach(function(o){if(v)o.reprise();else o.pause();});
if(v&&!parti){parti=true;boucle().catch(function(){});}
}
if(reduit){etatFinal();return;}
depart();
if('IntersectionObserver' in window){
new IntersectionObserver(function(es){es.forEach(function(e){bascule(e.isIntersecting&&e.intersectionRatio>=.35);});},{threshold:[0,.35,.6]}).observe(root);
}else bascule(true);
}
function tout(){Array.prototype.forEach.call(document.querySelectorAll('.ec-site'),monter);}
tout();
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',tout);
})();
