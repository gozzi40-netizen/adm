// A.d.M. S.r.l. — menu mobile e contatti; video locali.
document.documentElement.classList.replace('no-js','js');

(function(){
  var btn=document.querySelector('.menu-toggle'), nav=document.getElementById('nav');
  if(btn&&nav){
    function setMenu(open){
      nav.classList.toggle('aperto',open);
      btn.setAttribute('aria-expanded',String(open));
      btn.setAttribute('aria-label',open?(document.documentElement.lang==='en'?'Close menu':'Chiudi il menu'):(document.documentElement.lang==='en'?'Open menu':'Apri il menu'));
    }
    btn.addEventListener('click',function(){setMenu(btn.getAttribute('aria-expanded')!=='true');});
    nav.addEventListener('click',function(e){if(e.target.closest('a')) setMenu(false);});
    document.addEventListener('keydown',function(e){
      if(e.key==='Escape'&&btn.getAttribute('aria-expanded')==='true'){
        setMenu(false);btn.focus();
      }
    });
  }

  var y=document.getElementById('anno'); if(y){y.textContent=new Date().getFullYear();}
})();

// Popup contatti via email.
(function(){
  var d=document.getElementById('popup-contatto');
  if(!d||typeof d.showModal!=='function') return; // senza supporto: i link restano mailto normali
  d.querySelectorAll('.servizio').forEach(function(s){
    var msg=s.getAttribute('data-msg'), ogg=s.getAttribute('data-oggetto');
    s.querySelector('[data-canale="email"]').href='mailto:info@admsrl.eu?subject='+encodeURIComponent(ogg)+'&body='+encodeURIComponent(msg);
  });
  var opener=null;
  document.querySelectorAll('[data-contatto]').forEach(function(b){
    b.addEventListener('click',function(e){ e.preventDefault(); opener=b; d.showModal(); });
  });
  d.querySelector('.popup-chiudi').addEventListener('click',function(){ d.close(); });
  d.addEventListener('close',function(){if(opener) opener.focus({preventScroll:true});});
  d.addEventListener('click',function(e){var r=d.getBoundingClientRect();if(e.target===d&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)) d.close();});
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

(function(){document.querySelectorAll('.language-switch a').forEach(function(a){a.addEventListener('click',function(){if(location.hash && document.querySelector('.hero-plasma')) a.hash=location.hash;});});})();
