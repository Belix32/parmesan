const COMPONENTS = {
  header: `
    <header class="header" id="header">
      <div class="header-inner">
        <a href="index.html" class="logo">
          <img src="images/brand/logo.png" alt="Пармезан" class="logo-img" width="120" height="40">
        </a>
        <button class="menu-toggle" aria-label="Меню">
          <span></span><span></span><span></span>
        </button>
        <nav class="nav" id="nav">
          <ul class="nav-list">
            <li><a href="index.html" class="nav-link" data-page="home">Главная</a></li>
            <li><a href="menu.html" class="nav-link" data-page="menu">Меню</a></li>
            <li><a href="delivery.html" class="nav-link" data-page="delivery">Доставка</a></li>
            <li><a href="booking.html" class="nav-link" data-page="booking">Бронирование</a></li>
            <li><a href="contacts.html" class="nav-link" data-page="contacts">Контакты</a></li>
          </ul>
        </nav>
      </div>
    </header>
  `,
  footer: `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <div class="footer-brand">Пармезан</div>
            <p class="footer-desc">Неаполитанская пицца из дровяной печи в центре Клинцов. Завтраки, салаты, пасты и авторские блюда.</p>
          </div>
          <div>
            <h4 class="footer-heading">Меню</h4>
            <ul class="footer-links">
              <li><a href="menu.html?cat=pizza">Пицца</a></li>
              <li><a href="menu.html?cat=breakfast">Завтраки</a></li>
              <li><a href="menu.html?cat=salads">Салаты</a></li>
              <li><a href="menu.html?cat=hot">Горячее</a></li>
              <li><a href="menu.html?cat=drinks">Напитки</a></li>
            </ul>
          </div>
          <div>
            <h4 class="footer-heading">Режим</h4>
            <ul class="footer-links">
              <li>Ежедневно 10:00–23:00</li>
              <li>Доставка с 11:00</li>
            </ul>
          </div>
          <div>
            <h4 class="footer-heading">Связь</h4>
            <ul class="footer-links">
              <li><a href="contacts.html">ул. Октябрьская, 68</a></li>
              <li><a href="tel:+79065056858">+7 (906) 505-68-58</a></li>
            </ul>
            <div class="social-links" style="margin-top:16px">
              <a href="https://wa.me/79065056858" class="social-link" aria-label="WhatsApp" target="_blank" rel="noopener">Wa</a>
              <a href="tel:+79065056858" class="social-link" aria-label="Телефон">Tel</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          © <span id="current-year">2026</span> Пармезан
        </div>
      </div>
    </footer>
  `
};

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const currentPage = location.pathname.split('/').pop() || 'index.html';

  if (currentPage === 'index.html') {
    body.classList.add('page-home');
  }

  const headerPlaceholder = document.createElement('div');
  headerPlaceholder.innerHTML = COMPONENTS.header;
  body.prepend(headerPlaceholder.firstElementChild);
  body.insertAdjacentHTML('beforeend', COMPONENTS.footer);

  const pageMap = {
    'index.html': 'home',
    'menu.html': 'menu',
    'booking.html': 'booking',
    'delivery.html': 'delivery',
    'contacts.html': 'contacts'
  };
  const activePage = pageMap[currentPage];
  const activeLink = document.querySelector(`.nav-link[data-page="${activePage}"]`);
  if (activeLink) activeLink.classList.add('active');

  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('nav');
  const header = document.getElementById('header');

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    nav.classList.toggle('open');
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
  });

  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      nav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  document.querySelectorAll('.fade-up').forEach(el => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    observer.observe(el);
  });
});
