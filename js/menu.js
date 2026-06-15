document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const activeCat = params.get('cat') || 'all';

  const filters = document.querySelectorAll('.menu-filter');
  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      renderMenu('menu-container', cat === 'all' ? null : cat);
      if (cat !== 'all') {
        history.replaceState(null, '', `?cat=${cat}`);
      } else {
        history.replaceState(null, '', 'menu.html');
      }
    });
  });

  const initialFilter = activeCat === 'all' ? null : activeCat;
  if (activeCat !== 'all') {
    filters.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.cat === activeCat);
    });
  }
  renderMenu('menu-container', initialFilter);
});
