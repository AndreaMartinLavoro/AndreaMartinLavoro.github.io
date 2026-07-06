document.addEventListener('DOMContentLoaded', function () {

var toggle = document.querySelector('.menu-toggle');
var nav = document.querySelector('.sidebar nav');

if (!toggle || !nav) return;

toggle.addEventListener('click', function () {

var isOpen = nav.classList.toggle('open');

toggle.classList.toggle('open', isOpen);
toggle.setAttribute('aria-expanded', String(isOpen));

});

nav.querySelectorAll('a').forEach(function (link) {

link.addEventListener('click', function () {

nav.classList.remove('open');
toggle.classList.remove('open');
toggle.setAttribute('aria-expanded', 'false');

});

});

});
