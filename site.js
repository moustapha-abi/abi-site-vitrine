(function(){
  var top=document.getElementById('top');
  function onScroll(){ if(top) top.classList.toggle('scrolled', window.scrollY>10); }
  window.addEventListener('scroll', onScroll, {passive:true}); onScroll();

  var burger=document.querySelector('.burger'), menu=document.getElementById('menu');
  if(burger&&menu){
    burger.addEventListener('click',function(){var o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o);});
    menu.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){menu.classList.remove('open');burger.setAttribute('aria-expanded',false);});});
  }

  var items=document.querySelectorAll('.rv');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12});
    items.forEach(function(el){io.observe(el);});
  } else { items.forEach(function(el){el.classList.add('in');}); }

  // Présélection du produit depuis un bouton de démo
  var besoin=document.getElementById('besoin');
  document.querySelectorAll('[data-produit]').forEach(function(a){
    a.addEventListener('click',function(){ if(besoin) besoin.value=a.getAttribute('data-produit'); });
  });

  // Formulaire : prépare un e-mail vers contact@
  var f=document.getElementById('form-contact');
  if(f){
    f.addEventListener('submit',function(ev){
      ev.preventDefault();
      if(!f.checkValidity()){ f.reportValidity(); return; }
      var v=function(id){return (document.getElementById(id).value||'').trim();};
      var sujet='Demande site web — '+v('besoin')+(v('structure')?' — '+v('structure'):'');
      var corps='Nom : '+v('nom')+'\nStructure : '+v('structure')+'\nE-mail : '+v('email')+'\nBesoin : '+v('besoin')+'\n\n'+v('message');
      window.location.href='mailto:contact@africa.blue-interaction.com?subject='+encodeURIComponent(sujet)+'&body='+encodeURIComponent(corps);
      document.getElementById('ok').style.display='block';
    });
  }
})();
