/* Écran animé « reinscription », repris de /presentation. Données fictives. */
(function(){
var ARRET={};
function init(root){
if(root.getAttribute('data-ec-pret'))return;
root.setAttribute('data-ec-pret','1');
var q=function(k){return root.querySelector('[data-k="'+k+'"]');};
var tous=function(k,f){Array.prototype.forEach.call(root.querySelectorAll('[data-k="'+k+'"]'),f);};
var fen=root.querySelector('.ri-fen'),corps=root.querySelector('.ri-corps'),vc=root.querySelector('.ri-vc'),
defil=root.querySelector('.ri-defil'),cur=root.querySelector('.ri-cur');
var mq=window.matchMedia?window.matchMedia('(prefers-reduced-motion: reduce)'):null;
var S,gen=0,vu=false,lance=false,reprise=null,cx=0,cy=0;
function pl(n,a,b){return n+' '+(n>1?b:a);}
function txt(k,t){var e=q(k);if(e&&e.textContent!==t)e.textContent=t;}
function cl(e,c,on){if(e)e.classList.toggle(c,!!on);}
function depart(){S={volet:false,n:0,garde:false,msg:0,envoi:0,attente:false,bas:false};}
function rendre(){
var n=S.n,g=S.garde,off=!n||S.attente;
cl(fen,'ri-ouvert',S.volet);
txt('sous',g?'1 ancien sans nouvelles · 1 place libre':'3 anciens sans nouvelles · 3 places libres');
txt('nsn',g?'1':'3');
cl(q('l1'),'ri-parti',g);
cl(q('l2'),'ri-parti',g);
cl(q('c1'),'ri-coche',n>0);
cl(q('c2'),'ri-coche',n>1);
tous('sel',function(e){e.textContent='M15 Filles · '+(g?'1 place':'3 places');});
cl(q('gs'),'ri-cache',!g);
txt('st',n?pl(n,'coché','cochés'):'Cochez les joueurs que vous gardez.');
cl(q('mt'),'ri-cache',!n);
txt('mtt','Mettre les '+pl(n,'coché','cochés')+' en');
txt('gar',S.attente?'Un instant…':n?'Garder '+pl(n,'joueur','joueurs'):'Garder');
txt('lien',n?'Envoyer le lien ('+pl(n,'famille','familles')+')':'Envoyer le lien');
txt('ecr',n?'Écrire un message ('+pl(n,'famille cochée','familles cochées')+')':'Écrire un message');
cl(q('gar'),'ri-off',off);
cl(q('lien'),'ri-off',off);
cl(q('ecr'),'ri-off',off);
cl(q('msg'),'ri-cache',!S.msg);
txt('al',S.msg===2?'2 liens envoyés.':'2 places gardées jusqu’au 5 juillet : 2 en M15 Filles.');
cl(q('env'),'ri-cache',S.msg!==1||S.envoi>1);
txt('env',S.envoi===1?'Un instant…':'Envoyer le lien à ces 2 familles');
cl(q('env'),'ri-off',S.envoi===1);
cl(q('ap'),'ri-cache',S.msg!==1||S.envoi<2);
txt('apb',S.envoi===3?'Envoi…':'Envoyer à 2 familles');
cl(q('apb'),'ri-off',S.envoi===3);
descendre();
}
function descendre(){
var d=S.bas?Math.max(0,defil.offsetHeight-vc.clientHeight):0;
defil.style.transform=d?'translateY('+-d+'px)':'';
}
function set(o){for(var k in o)S[k]=o[k];rendre();}
function actif(){return vu&&!document.hidden;}
function w(ms){
var g=gen;
return new Promise(function(ok,ko){
var t=performance.now();
function tic(){
if(g!==gen){ko(ARRET);return;}
if(!actif()){reprise=function(){t=performance.now();tic();};return;}
var n=performance.now();
ms-=n-t;t=n;
if(ms<=0)ok();else setTimeout(tic,Math.min(ms,120));
}
setTimeout(tic,Math.min(ms,120));
});
}
function viser(el,fx,fy){
var a=corps.getBoundingClientRect(),b=el.getBoundingClientRect();
var x=b.left-a.left+b.width*(fx==null?0.5:fx),y=b.top-a.top+b.height*(fy==null?0.55:fy);
var d=Math.sqrt((x-cx)*(x-cx)+(y-cy)*(y-cy)),t=Math.round(Math.min(900,Math.max(420,d*1.5)));
cur.style.transitionDuration=t+'ms, 300ms';
cur.style.transform='translate('+x+'px,'+y+'px)';
cur.classList.add('ri-vis');
cx=x;cy=y;
return w(t+60);
}
function cliquer(el){
cur.classList.remove('ri-clic');
void cur.offsetWidth;
cur.classList.add('ri-clic');
el.classList.add('ri-presse');
return w(170).then(function(){el.classList.remove('ri-presse');return w(110);});
}
async function geste(k,avant){
var el=q(k);
await viser(el);
if(avant)await w(avant);
await cliquer(el);
}
async function boucle(){
try{
for(;;){
root.classList.add('ri-sec');
depart();rendre();
cur.classList.remove('ri-vis','ri-clic');
cx=corps.clientWidth*0.7;cy=corps.clientHeight*0.9;
cur.style.transform='translate('+cx+'px,'+cy+'px)';
void root.offsetWidth;
root.classList.remove('ri-sec');
corps.classList.remove('ri-fondu');
await w(1000);
await geste('cbt',200);
set({volet:true});await w(950);
await geste('c1');set({n:1});await w(500);
await geste('c2');set({n:2});await w(900);
await geste('gar',150);set({attente:true});await w(750);
set({attente:false,n:0,garde:true,msg:1});await w(1400);
set({bas:true});await w(2200);
set({bas:false});await w(800);
await geste('env',150);set({envoi:1});await w(650);
set({envoi:2});await w(1900);
await geste('apb',150);set({envoi:3});await w(900);
set({envoi:0,msg:2});await w(500);
cur.classList.remove('ri-vis');
await w(2600);
corps.classList.add('ri-fondu');await w(400);
}
}catch(e){if(e!==ARRET)throw e;}
}
function fin(){
gen++;reprise=null;lance=false;
root.classList.add('ri-sec');
S={volet:true,n:0,garde:true,msg:2,envoi:0,attente:false,bas:false};
rendre();
cur.classList.remove('ri-vis','ri-clic');
corps.classList.remove('ri-fondu');
}
function bouger(){
if(mq&&mq.matches)return;
if(!actif())return;
if(!lance){lance=true;boucle();}
else if(reprise){var f=reprise;reprise=null;f();}
}
function moins(){
if(mq&&mq.matches){fin();return;}
gen++;reprise=null;lance=false;
root.classList.remove('ri-sec');
depart();rendre();
bouger();
}
depart();rendre();
if(mq&&mq.matches)fin();
if(mq){if(mq.addEventListener)mq.addEventListener('change',moins);else if(mq.addListener)mq.addListener(moins);}
if(window.ResizeObserver)new ResizeObserver(function(){if(S)descendre();}).observe(root);
document.addEventListener('visibilitychange',bouger);
if('IntersectionObserver' in window){
new IntersectionObserver(function(es){
es.forEach(function(e){vu=e.isIntersecting&&e.intersectionRatio>=0.349;});
bouger();
},{threshold:0.35}).observe(root);
}else{vu=true;bouger();}
}
function tout(){Array.prototype.forEach.call(document.querySelectorAll('.ec-reinscription'),init);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',tout);else tout();
})();
