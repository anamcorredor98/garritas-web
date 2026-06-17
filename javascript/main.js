/* =============================================
   GARRITAS – main.js v4
   SPA-style navigation · Tabs · Animations
   ============================================= */

// =============================================
// 1. NAV: HAMBURGUESA + SCROLL ACTIVO
// =============================================
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('navMobile');
const header    = document.getElementById('header');
const overlay = document.getElementById('navOverlay');

const openMenu  = () => { hamburger.classList.add('is-open'); navMobile.classList.add('is-open'); overlay.classList.add('is-open'); };
const closeMenu = () => { hamburger.classList.remove('is-open'); navMobile.classList.remove('is-open'); overlay.classList.remove('is-open'); };
overlay.addEventListener('click', closeMenu);

hamburger.addEventListener('click', () => hamburger.classList.contains('is-open') ? closeMenu() : openMenu());
document.querySelectorAll('[data-close]').forEach(l => l.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

// Header shadow on scroll
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });


// =============================================
// 2. NAVEGACIÓN SPA-STYLE
//    Scroll suave a sección + activa el link
// =============================================
function scrollToPage(id) {
  const target = document.getElementById(id);
  if (!target) return;
  const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 70;
  const top = target.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

// Todos los links de nav
document.querySelectorAll('[data-page]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('data-page');
    if (!id) return;
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      closeMenu();
      scrollToPage(id);
    }
  });
});

// Active nav link on scroll (Intersection Observer)
const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('.nav-links-desktop a[data-page]');

const pageObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(l => {
        l.classList.toggle('active', l.getAttribute('data-page') === id);
      });
    }
  });
}, { threshold: 0.4 });

pages.forEach(p => pageObserver.observe(p));


// =============================================
// 3. TABS DE SERVICIOS
// =============================================
const tabBtns   = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-tab');
    tabBtns.forEach(b => b.classList.remove('active'));
    tabPanels.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const panel = document.getElementById(`tab-${target}`);
    if (panel) panel.classList.add('active');
  });
});


// =============================================
// 4. DATOS DE SERVICIOS
// =============================================
const petsitting = [
  { icon:"🌅", titulo:"Medio día", sub:"Hasta ~6 horas", precio:"$35.000 – $40.000",
    incluye:["1–2 paseos cortos","Comida y agua","Fotos y actualizaciones","Ambiente cálido y seguro"], top:false },
  { icon:"☀️", titulo:"Día completo", sub:"6–12 horas (sin noche)", precio:"$55.000 – $65.000",
    incluye:["2–3 paseos incluidos","Comida y agua","Fotos y actualizaciones","Medicamentos si aplica"], top:true },
  { icon:"🌙", titulo:"Pernocta", sub:"Tarde + noche + mañana siguiente", precio:"$70.000 – $80.000",
    incluye:["Todos los paseos del bloque","Comida y agua","Fotos y actualizaciones","Medicamentos si aplica","Hasta mediodía aprox."], top:false }
];

const visitas = [
  { icon:"🐶", titulo:"Visita para perros", sub:"En la casa del peludo", precio:"$25.000",
    incluye:["Abrir y cerrar la casa","Paseo corto","Comida y agua","Dejarlo cómodo"], top:false },
  { icon:"🐱", titulo:"Visita básica gatos", sub:"En la casa del michi", precio:"$25.000",
    incluye:["Comida y agua fresca","Limpieza del arenero","Verificar que esté bien"], top:false },
  { icon:"😻", titulo:"Visita completa gatos", sub:"Con interacción y mimos", precio:"$35.000",
    incluye:["Todo lo de la visita básica","Cepillado","Juego interactivo","Caricias y calidad"], top:true }
];

const paseos = [
  { icon:"⚡", titulo:"Paseo corto", sub:"30 minutos", precio:"$15.000",
    incluye:["Olfateo y exploración","Grupos pequeños","Foto del recorrido"], top:false },
  { icon:"🏃", titulo:"Paseo largo", sub:"1 hora", precio:"$25.000",
    incluye:["Recorrido más extenso","Socialización","Grupos pequeños","Fotos en WhatsApp"], top:true }
];


// =============================================
// 5. DATOS DE TREATS
//    ↓ Cambia img:"" por la ruta de tu foto
// =============================================
const helados = [
  { nombre:"Helado de Pollo y Zanahoria",
    ingredientes:"🍗 Pollo · 🥕 Zanahoria · 🫙 Yogur griego (probiótico)",
    precio:"$5.000", unidad:"c/u", emoji:"🍦", bg:"#FAD4B8", img:"img/helados-pollo.png" },
  { nombre:"Helado de Carne y Remolacha",
    ingredientes:"🥩 Carne · 🫚 Remolacha · 🫙 Yogur griego (probiótico)",
    precio:"$5.000", unidad:"c/u", emoji:"🍦", bg:"#F5C0C0", img:"img/helados-carne.png" }
];

const galletas = [
  { nombre:"Galletas de Pollo y Zanahoria",
    ingredientes:"🍗 Pollo · 🥕 Zanahoria · 🌾 Avena · 🌿 Apio · 🥚 Huevo",
    precio:"$6.000", unidad:"paquete × 7", emoji:"🍪", bg:"#E8DCFF", img:"img/galletas-pollo.png" },
  { nombre:"Galletas de Carne y Remolacha",
    ingredientes:"🥩 Carne · 🫚 Remolacha · 🌾 Avena · 🌿 Apio · 🥚 Huevo",
    precio:"$6.000", unidad:"paquete × 7", emoji:"🍪", bg:"#D0BBFF", img:"img/galletas-carne.png" }
];


// =============================================
// 6. RENDERIZADORES
// =============================================
function priceCard(item) {
  const checks = item.incluye.map(i =>
    `<li><span class="check">✓</span>${i}</li>`).join('');
  return `
  <div class="price-card ${item.top ? 'price-card--featured' : ''}">
    ${item.top ? '<div class="featured-ribbon">Popular</div>' : ''}
    <div class="price-card-top">
      <div class="price-card-icon">${item.icon}</div>
      <div class="price-card-title">${item.titulo}</div>
      <div class="price-card-sub">${item.sub}</div>
    </div>
    <div class="price-card-body">
      <div class="price-amount">${item.precio}</div>
      <ul class="price-list">${checks}</ul>
    </div>
  </div>`;
}

function productCard(p) {
  const media = p.img
    ? `<img src="${p.img}" alt="${p.nombre}" loading="lazy" />`
    : `<div class="product-img-bg" style="background:${p.bg}">
         <span class="emoji">${p.emoji}</span>
         <span>Agrega tu foto</span>
       </div>`;
  return `
  <article class="product-card">
    <div class="product-img">${media}</div>
    <div class="product-body">
      <p class="product-name">${p.nombre}</p>
      <p class="product-ingredients">${p.ingredientes}</p>
      <div class="product-footer">
        <div>
          <div class="product-price">${p.precio}</div>
          <div class="product-unit">${p.unidad}</div>
        </div>
        <a href="https://wa.me/573245243535?text=Hola%2C%20quiero%20pedir%20${encodeURIComponent(p.nombre)}%20%F0%9F%90%BE"
           target="_blank" rel="noopener" class="btn-order">Pedir</a>
      </div>
    </div>
  </article>`;
}

function render(data, id, fn) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = data.map(fn).join('');
}

render(petsitting, 'grid-petsitting', priceCard);
render(visitas,    'grid-visitas',    priceCard);
render(paseos,     'grid-paseos',     priceCard);
render(helados,    'grid-helados',    productCard);
render(galletas,   'grid-galletas',   productCard);


// =============================================
// 7. ANIMACIONES DE ENTRADA
// =============================================
const animCSS = document.createElement('style');
animCSS.textContent = `
  .anim { opacity:0; transform:translateY(32px); transition:opacity .6s ease, transform .6s ease; }
  .anim.anim--left  { transform:translateX(-32px); }
  .anim.anim--right { transform:translateX(32px); }
  .anim.anim--scale { transform:scale(.95); }
  .anim.in { opacity:1; transform:none; }
  @media (prefers-reduced-motion:reduce) { .anim { opacity:1; transform:none; transition:none; } }
`;
document.head.appendChild(animCSS);

const animEl = [
  ...document.querySelectorAll('.hero-text'),
  ...document.querySelectorAll('.hero-visual'),
  ...document.querySelectorAll('.about-visual'),
  ...document.querySelectorAll('.about-text'),
  ...document.querySelectorAll('.value-item'),
  ...document.querySelectorAll('.price-card'),
  ...document.querySelectorAll('.product-card'),
  ...document.querySelectorAll('.contact-channel'),
  ...document.querySelectorAll('.services-header'),
  ...document.querySelectorAll('.treats-header'),
];

animEl.forEach((el, i) => {
  el.classList.add('anim');
  el.style.transitionDelay = `${(i % 4) * 20}ms`;
});

// Left/right for about section
document.querySelectorAll('.about-visual').forEach(el => el.classList.add('anim--left'));
document.querySelectorAll('.about-text').forEach(el => el.classList.add('anim--right'));

const animObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); animObserver.unobserve(e.target); }
  });
}, { rootMargin: 0.12, rootMargin: '0px 0px -40px 0px' });

animEl.forEach(el => animObserver.observe(el));


// =============================================
// PERSONALIZACIÓN RÁPIDA
// =============================================
/*
  📱 WHATSAPP: Busca "573000000000" y cambia por tu número real
  📸 FOTOS: En helados[] y galletas[], cambia img:"" por "../imagenes/foto.jpg"
  🖼️ LOGO: En el HTML descomenta la línea del logo
  👤 FOTOS DEL EQUIPO: Agrega img en .team-avatar o cambia las iniciales "A" / "M"
  🗺️ MAPA: En el HTML reemplaza .contact-map-placeholder por un iframe de Google Maps
*/
// ============================================
// CARRUSEL HERO
// ============================================
(function() {
  const slides = document.querySelectorAll('.carousel-slide');
  const dots   = document.querySelectorAll('.carousel-dot');
  if (!slides.length) return;

  let current  = 0;
  let timer    = null;
  const DELAY  = 4000; // 4 segundos

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = index;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function next() {
     if (!isPaused) {
    goTo((current + 1) % slides.length);
  }
}

  function startAuto() {
    timer = setInterval(next, DELAY);
  }

  function stopAuto() {
    clearInterval(timer);
  }

  // Puntitos
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      stopAuto();
      goTo(parseInt(dot.dataset.index));
      startAuto(); // reinicia el timer desde ese punto
    });
  });

  // Pausa con mouse encima
  const carousel = document.querySelector('.hero-carousel');
  let isPaused = false;

  carousel.addEventListener('mouseenter', () => {
    isPaused = true;
    stopAuto();
  });

  carousel.addEventListener('mouseleave', () => {
    isPaused = false;
    startAuto();
  });

  // Arrancar
  startAuto();
})();