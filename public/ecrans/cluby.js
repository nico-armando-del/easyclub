/* Écran animé « cluby », repris de /presentation. Données fictives. */
(function(){
  var RM=false;
  try{RM=window.matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){}
  var T1='Ouvre quatre places de plus chez les M15 filles.';
  var T2='Relance les familles des M13 qui sont en retard.';
  var PH1='Ouvre quatre places sur le cours d’éveil…';
  var PH2='Continuez la conversation…';

  function init(root){
    if(root.getAttribute('data-ec-anime'))return;
    root.setAttribute('data-ec-anime','1');
    /* Mouvement réduit : la page montre déjà l'état le plus parlant, la proposition à valider. */
    if(RM)return;
    var $=function(s){return root.querySelector('.ec-cluby-'+s)};
    var pan=$('pan'),fil=$('fil'),champ=$('champ'),zone=$('zone'),lig=$('lig'),saisie=$('saisie'),ph=$('ph'),car=$('car'),env=$('env'),app=$('app'),cur=$('cur'),g1a=$('g1a'),g1b=$('g1b');
    if(!pan||!cur)return;
    var it={};
    Array.prototype.forEach.call(root.querySelectorAll('[data-k]'),function(n){it[n.getAttribute('data-k')]=n});
    var vu=false,parti=false,reprises=[];

    /* Une attente qui ne compte que le temps passé à l'écran. */
    function dort(ms){
      return new Promise(function(ok){
        var reste=ms,der=Date.now();
        function tic(){
          if(!vu){reprises.push(function(){der=Date.now();tic()});return}
          var n=Date.now();reste-=n-der;der=n;
          if(reste<=0)ok();else setTimeout(tic,Math.min(reste,80));
        }
        setTimeout(tic,Math.min(ms,80));
      });
    }
    function montre(k,oui){if(it[k])it[k].classList.toggle('ec-cluby-off',!oui)}
    function cache(n,oui){n.classList.toggle('ec-cluby-cache',oui)}
    function texte(t){
      saisie.textContent=t;
      cache(ph,t!=='');
      env.classList.toggle('ec-cluby-dis',t==='');
      var d=lig.offsetHeight-zone.clientHeight;
      lig.style.transform=d>0?'translateY('+(-d)+'px)':'';
    }
    function vers(n,fx,fy){
      var p=pan.getBoundingClientRect(),r=n.getBoundingClientRect();
      var x=r.left-p.left+r.width*fx,y=r.top-p.top+r.height*fy;
      cur.style.opacity='1';
      cur.style.transform='translate('+Math.round(x-5)+'px,'+Math.round(y-3)+'px)';
    }
    async function clic(n,fx,fy){
      vers(n,fx||.5,fy||.55);
      await dort(850);
      cur.classList.add('ec-cluby-clic','ec-cluby-rond');
      n.classList.add('ec-cluby-presse');
      setTimeout(function(){cur.classList.remove('ec-cluby-rond')},520);
      await dort(170);
      cur.classList.remove('ec-cluby-clic');
      n.classList.remove('ec-cluby-presse');
      await dort(150);
    }
    async function tape(t){
      champ.classList.add('ec-cluby-foc');
      cache(car,false);
      for(var i=1;i<=t.length;i++){
        texte(t.slice(0,i));
        await dort(t.charAt(i-1)===' '?80:36+Math.random()*42);
      }
    }
    function envoie(){
      texte('');
      champ.classList.remove('ec-cluby-foc');
      champ.classList.add('ec-cluby-dis');
      cache(car,true);
      env.textContent='En cours…';
      env.classList.add('ec-cluby-dis');
    }
    function repond(){
      env.textContent='Envoyer';
      champ.classList.remove('ec-cluby-dis');
      ph.textContent=PH2;
    }
    function remet(){
      pan.classList.add('ec-cluby-net');
      for(var k in it)montre(k,k==='intro'||k==='vide');
      cache(g1a,false);cache(g1b,true);
      app.textContent='Appliquer';
      app.classList.remove('ec-cluby-dis','ec-cluby-presse');
      ph.textContent=PH1;
      champ.classList.remove('ec-cluby-foc','ec-cluby-dis');
      texte('');
      cache(car,true);
      env.textContent='Envoyer';
      cur.className='ec-cluby-cur';
      cur.style.opacity='0';
      var p=pan.getBoundingClientRect();
      cur.style.transform='translate('+Math.round(p.width*.7)+'px,'+Math.round(p.height*.45)+'px)';
      void pan.offsetHeight;
      pan.classList.remove('ec-cluby-net');
    }

    async function scene(){
      await dort(1000);
      await clic(champ,.9,.72);
      await tape(T1);
      await dort(300);
      await clic(env);
      envoie();
      montre('vide',false);montre('d1',true);montre('pense1',true);
      await dort(1700);
      montre('pense1',false);montre('m1',true);repond();
      await dort(700);
      montre('p1',true);
      await dort(2800);
      await clic(app);
      app.textContent='Application…';
      app.classList.add('ec-cluby-dis');
      await dort(900);
      montre('p1',false);montre('c1',true);
      cache(g1a,true);cache(g1b,false);
      await dort(2600);
      await clic(champ,.9,.72);
      await tape(T2);
      await dort(300);
      await clic(env);
      envoie();
      montre('d2',true);montre('pense2',true);
      await dort(1700);
      montre('pense2',false);montre('l2',true);repond();
      await dort(600);
      montre('f2',true);
      await dort(800);
      montre('m2',true);
      cur.style.opacity='0';
      await dort(4200);
    }
    async function boucle(){
      for(;;){
        remet();
        fil.style.opacity='';
        await scene();
        await dort(2000);
        fil.style.opacity='0';
        cur.style.opacity='0';
        await dort(450);
      }
    }
    function regle(v){
      vu=v;
      if(!v)return;
      var r=reprises;reprises=[];
      r.forEach(function(f){f()});
      if(!parti){parti=true;boucle()}
    }

    remet();
    if('IntersectionObserver' in window){
      new IntersectionObserver(function(es){
        es.forEach(function(e){regle(e.isIntersecting&&e.intersectionRatio>=.345)});
      },{threshold:[0,.2,.35,.6,1]}).observe(root);
    }else regle(true);
  }

  function tout(){Array.prototype.forEach.call(document.querySelectorAll('.ec-cluby'),init)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',tout);else tout();
})();
