// A.d.M. S.r.l. — menu mobile e contatti; video locali.
document.documentElement.classList.replace('no-js','js');

(function(){
  var btn=document.querySelector('.menu-toggle'), nav=document.getElementById('nav');
  if(btn&&nav){
    btn.addEventListener('click',function(){
      var aperto=nav.classList.toggle('aperto');
      btn.setAttribute('aria-expanded',aperto?'true':'false');
    });
    nav.addEventListener('click',function(e){
      if(e.target.closest('a')){nav.classList.remove('aperto');btn.setAttribute('aria-expanded','false');}
    });
  }

  var y=document.getElementById('anno'); if(y){y.textContent=new Date().getFullYear();}
})();

// Popup contatti: argomenti con messaggio precompilato (email e WhatsApp).
// NUMERO WHATSAPP: inserire in formato internazionale senza + né spazi, es. '393331234567'.
// Finché è vuoto, i pulsanti WhatsApp restano nascosti.
(function(){
  var WHATSAPP='';
  var d=document.getElementById('popup-contatto');
  if(!d||typeof d.showModal!=='function') return; // senza supporto: i link restano mailto normali
  d.querySelectorAll('.servizio').forEach(function(s){
    var msg=s.getAttribute('data-msg'), ogg=s.getAttribute('data-oggetto');
    s.querySelector('[data-canale="email"]').href='mailto:info@admsrl.eu?subject='+encodeURIComponent(ogg)+'&body='+encodeURIComponent(msg);
    var wa=s.querySelector('[data-canale="wa"]');
    if(WHATSAPP){ wa.href='https://wa.me/'+WHATSAPP+'?text='+encodeURIComponent(msg); wa.hidden=false; }
  });
  document.querySelectorAll('[data-contatto]').forEach(function(b){
    b.addEventListener('click',function(e){ e.preventDefault(); d.showModal(); });
  });
  d.querySelector('.popup-chiudi').addEventListener('click',function(){ d.close(); });
  d.addEventListener('click',function(e){ if(e.target===d) d.close(); });
})();

// Dialog nativi: focus confinato, Escape e ritorno alla scheda di partenza.
(function(){
 document.querySelectorAll('[data-linea]').forEach(function(link){
  var dialog=document.getElementById(link.dataset.linea);
  if(!dialog||typeof dialog.showModal!=='function') return;
  link.addEventListener('click',function(event){event.preventDefault();dialog.showModal();dialog.scrollTop=0;});
  dialog.querySelector('.linea-chiudi').addEventListener('click',function(){dialog.close();});
  dialog.addEventListener('click',function(event){
   var r=dialog.getBoundingClientRect();
   if(event.target===dialog&&(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)) dialog.close();
  });
  dialog.addEventListener('close',function(){link.focus({preventScroll:true});});
 });
})();
