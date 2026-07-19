function initNav(){
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.sidebar nav');

  if(!toggle || !nav) return;

  var current = location.pathname.split('/').pop() || 'index.html';

  nav.querySelectorAll('a').forEach(function(link){
    if(link.getAttribute('href') === current) link.classList.add('active');

    link.addEventListener('click', function(){
      nav.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  toggle.addEventListener('click', function(){
    var isOpen = nav.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}

document.addEventListener('DOMContentLoaded', function(){
  var placeholder = document.getElementById('sidebar-placeholder');

  if(!placeholder){
    initNav();
    return;
  }

  fetch('partials/sidebar.html')
    .then(function(res){ return res.text(); })
    .then(function(html){
      placeholder.outerHTML = html;
      initNav();
    })
    .catch(function(){
      console.error('Impossibile caricare la sidebar. Se hai aperto il file direttamente (file://), avvia un server locale, es. "python3 -m http.server".');
    });
});
