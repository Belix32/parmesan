document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('featured-grid');
  if (!list) return;

  const categoryLabels = {
    pizza: 'Пицца',
    breakfast: 'Завтраки',
    salads: 'Салаты',
    hot: 'Горячее',
    soups: 'Супы',
    pasta: 'Пасты',
    kids: 'Детское',
    drinks: 'Напитки'
  };

  Promise.all([
    fetch('data/menu.json').then(r => r.json()),
    fetch('data/business.json').then(r => r.json())
  ]).then(([menuData, business]) => {
    const featured = business.featured || [];
    list.innerHTML = featured.map(f => {
      const item = findMenuItem(menuData, f.name);
      const name = item ? item.name : f.name;
      const price = item ? formatPrice(item) : '';
      const cat = categoryLabels[f.category] || f.category;
      const image = f.image || (item && item.image) || '';

      return `
        <article class="featured-card fade-up">
          <div class="featured-card-image">
            ${image ? `<img src="${image}" alt="${name}" loading="lazy">` : ''}
          </div>
          <div class="featured-card-body">
            <span class="featured-category">${cat}</span>
            <h3>${name}</h3>
            ${price ? `<span class="featured-price">${price}</span>` : ''}
          </div>
        </article>
      `;
    }).join('');

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
  }).catch(err => console.error('Featured load error:', err));
});
