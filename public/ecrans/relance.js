/* Écran animé « relance », repris de /presentation. Données fictives. */
(function(){
var STOP={},NB=String.fromCharCode(160),TIT={a:'Accueil',l:'Inscriptions',f:'Sophie Lambert'};
var rm=window.matchMedia?matchMedia('(prefers-reduced-motion: reduce)'):{matches:false};
/* Horloge suspendable et annulable : chaque attente garde le temps qu'il lui reste. */
function Horloge(){this.p=1;this.t=[];}
Horloge.prototype={
att:function(ms){var h=this;return new Promise(function(res,rej){var o={r:ms,res:res,rej:rej};h.t.push(o);if(!h.p)h.go(o);});},
go:function(o){var h=this;o.d=Date.now();o.id=setTimeout(function(){h.t.splice(h.t.indexOf(o),1);o.res();},Math.max(0,o.r));},
pause:function(){if(this.p)return;this.p=1;var n=Date.now();this.t.forEach(function(o){clearTimeout(o.id);o.r-=n-o.d;});},
reprise:function(){if(!this.p)return;this.p=0;this.t.forEach(this.go,this);},
annule:function(){this.t.forEach(function(o){clearTimeout(o.id);o.rej(STOP);});this.t=[];}
};
function init(root){
if(root.getAttribute('data-ec'))return;
root.setAttribute('data-ec','1');
var q=function(s){return root.querySelector(s);},qa=function(s){return[].slice.call(root.querySelectorAll(s));};
var fen=q('.r-fen'),cur=q('.r-cur'),onde=q('.r-onde'),tit=q('.r-tit'),sc={a:q('[data-sc=a]'),l:q('[data-sc=l]'),f:q('[data-sc=f]')};
var def=sc.f.firstElementChild,pan=q('.r-pan'),jo=q('.r-jo'),sr=q('[data-r]'),tf=q('.r-tf'),vise=q('.r-vise'),qui=q('.r-qui'),pct=q('[data-p]'),bi=q('.r-bi');
var cA=q('[data-c=a]'),cL=q('[data-c=l]'),cR=q('[data-c=r]'),cE=q('[data-c=e]'),nums=qa('[data-v]'),liens=qa('[data-m]');
var h=new Horloge(),att=h.att.bind(h),vu=0,tourne=0,larg=0,mt=0,cx=0,cy=0;
function cl(e,a,c){e.classList[a?'add':'remove'].apply(e.classList,c.split(' '));}
function scene(k){
for(var n in sc)cl(sc[n],n==k,'r-on');
liens.forEach(function(l){cl(l,l.getAttribute('data-m')==(k=='a'?'a':'i'),'r-act');});
tit.textContent=TIT[k]+' — Volley Club Démo';
}
function defile(y,sec){
if(sec)def.style.transition='none';
def.style.transform='translateY('+-y+'px)';
if(sec){void def.offsetWidth;def.style.transition='';}
}
function haut(el){var y=el.getBoundingClientRect().top-def.getBoundingClientRect().top-12;return Math.max(0,Math.min(def.offsetHeight-sc.f.clientHeight,y));}
function place(x,y,ms){cur.style.transitionDuration=ms+'ms,300ms';cur.style.transform='translate('+x+'px,'+y+'px)';cx=x;cy=y;}
function va(el,ms){var r=el.getBoundingClientRect(),w=fen.getBoundingClientRect();place(r.left-w.left+Math.min(r.width/2,60),r.top-w.top+r.height*.6,ms);return att(ms+80);}
async function clic(el){
cl(el,1,'r-sv');await att(320);
cl(el,1,'r-pr');cl(cur,1,'r-clic');
onde.style.left=cx+'px';onde.style.top=cy+'px';cl(onde,0,'r-go');void onde.offsetWidth;cl(onde,1,'r-go');
await att(180);
cl(cur,0,'r-clic');cl(el,0,'r-pr r-sv');
}
function remplir(p){
nums.forEach(function(e){e.textContent=Math.round(e.getAttribute('data-v')*p/100).toLocaleString('fr-FR')+NB+'€';});
pct.textContent=Math.round(71*p);bi.style.width=p*100+'%';
}
function vide(){
cl(vise,0,'r-on');cl(pan,0,'r-vu r-ok');cl(jo,0,'r-vu');
cE.textContent='Envoyer ce message';cl(cE,0,'r-off');cl(qui,0,'r-off');
sr.textContent='Aucune relance';cl(sr,0,'r-fl');defile(0,1);
}
/* Mouvement réduit : l'écran le plus parlant, le mail prêt à partir. */
function fige(){cl(cur,0,'r-vis');vide();remplir(1);scene('f');cl(pan,1,'r-vu r-ok');defile(haut(pan),1);}
async function tour(){
cl(cur,0,'r-vis');scene('a');remplir(0);place(fen.clientWidth-40,fen.clientHeight+10,0);
await att(460);vide();await att(240);
for(var i=1;i<=42;i++){remplir(1-Math.pow(1-i/42,3));await att(40);}
await att(700);cl(cur,1,'r-vis');
await va(cA,950);await clic(cA);await att(120);
scene('l');await att(700);cl(vise,1,'r-on');await att(900);
await va(cL,800);await clic(cL);await att(120);
scene('f');await att(900);
await va(cR,850);await clic(cR);cl(pan,1,'r-vu');await att(150);
defile(haut(pan));await att(950);cl(pan,1,'r-ok');await att(3600);
await va(cE,800);await clic(cE);
cE.textContent='Enregistrement…';cl(cE,1,'r-off');cl(qui,1,'r-off');await att(1000);
cl(pan,0,'r-vu r-ok');cl(jo,1,'r-vu');sr.textContent='1 relance envoyée';cl(sr,1,'r-fl');
defile(haut(tf));await att(600);cl(cur,0,'r-vis');await att(3000);
}
async function lance(){tourne=1;try{for(;;){await tour();await att(2000);}}catch(e){if(e!==STOP)throw e;}}
function relance(){h.annule();tourne=0;if(rm.matches)return fige();if(vu){lance();h.reprise();}}
if(rm.matches)fige();
if(window.IntersectionObserver)new IntersectionObserver(function(es){es.forEach(function(e){
vu=e.isIntersecting&&e.intersectionRatio>=.35;
if(rm.matches)return;
if(!vu)return h.pause();
if(!tourne)lance();
h.reprise();
});},{threshold:[0,.35,.7]}).observe(root);
if(window.ResizeObserver)new ResizeObserver(function(){
var w=root.clientWidth;
if(!larg||Math.abs(w-larg)<2){larg=larg||w;return;}
larg=w;clearTimeout(mt);mt=setTimeout(relance,250);
}).observe(root);
if(rm.addEventListener)rm.addEventListener('change',relance);
if(document.fonts)document.fonts.ready.then(function(){if(rm.matches)fige();});
}
function tout(){[].forEach.call(document.querySelectorAll('.ec-relance'),init);}
if(document.readyState=='loading')document.addEventListener('DOMContentLoaded',tout);else tout();
})();
