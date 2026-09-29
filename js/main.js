document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  var topbar = document.querySelector('.topbar');
  var header = document.querySelector('.site-header');

  function syncTopOffset() {
    var h = (topbar ? topbar.offsetHeight : 0) + (header ? header.offsetHeight : 0);
    document.documentElement.style.setProperty('--dyn-top', h + 'px');
  }

  syncTopOffset();
  window.addEventListener('resize', syncTopOffset);

  if (!toggle || !nav) return;
  toggle.addEventListener('click', function () {
    syncTopOffset();
    nav.classList.toggle('open');
    var expanded = nav.classList.contains('open');
    toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  });

  // Cierra el menú si el usuario navega desde un enlace dentro de él
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Cierra los desplegables "Servicios" del escritorio al hacer clic afuera
  document.querySelectorAll('.nav-drop').forEach(function (drop) {
    document.addEventListener('click', function (e) {
      if (!drop.contains(e.target)) drop.removeAttribute('open');
    });
  });
});
