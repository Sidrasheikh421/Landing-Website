const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

const menuToggle = $('#menuToggle');
const mainNav = $('#mainNav');
menuToggle?.addEventListener('click', () => {
  mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', mainNav.classList.contains('open'));
});
$$('.main-nav a').forEach(a => a.addEventListener('click', () => mainNav.classList.remove('open')));

const searchModal = $('#searchModal');
$('#searchBtn')?.addEventListener('click', () => {
  searchModal.classList.add('open');
  searchModal.setAttribute('aria-hidden','false');
  setTimeout(()=>$('#searchInput').focus(),50);
});
$('#closeSearch')?.addEventListener('click', closeSearch);
searchModal?.addEventListener('click', e => { if(e.target === searchModal) closeSearch(); });
function closeSearch(){ searchModal.classList.remove('open'); searchModal.setAttribute('aria-hidden','true'); }
$('#searchInput')?.addEventListener('input', e => {
  const q = e.target.value.toLowerCase().trim();
  $('#searchResult').textContent = !q ? '' : `Sweet search: ${q}. Browse our Menu section for available treats.`;
});

let cart = 0;
$$('.add-btn').forEach(btn => btn.addEventListener('click', () => {
  cart++;
  $('#cartCount').textContent = cart;
  const toast = $('#toast');
  toast.textContent = `${btn.dataset.product} added to your sweet cart! 🍰`;
  toast.classList.add('show');
  setTimeout(()=>toast.classList.remove('show'),1800);
}));

$('#contactForm')?.addEventListener('submit', e => {
  e.preventDefault();
  $('#formMessage').textContent = 'Thanks! Your message is ready to be sent to Sweet Haven. ♥';
  e.target.reset();
});

const backTop = $('#backTop');
window.addEventListener('scroll', () => {
  backTop.classList.toggle('show', window.scrollY > 450);
  const sections = $$('main section[id]');
  let current = 'home';
  sections.forEach(sec => {
    if(window.scrollY >= sec.offsetTop - 150) current = sec.id;
  });
  $$('.main-nav a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#'+current));
});
backTop?.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

document.addEventListener('keydown', e => { if(e.key === 'Escape') closeSearch(); });
