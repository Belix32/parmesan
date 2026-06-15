async function loadMenuData() {
  try {
    const res = await fetch('data/menu.json');
    if (!res.ok) throw new Error('Failed to load menu');
    return await res.json();
  } catch (err) {
    console.error('Menu load error:', err);
    return null;
  }
}

function formatPrice(item) {
  if (item.priceFrom) return `от ${item.price} ₽`;
  return `${item.price} ₽`;
}

function renderMenuItem(item) {
  const tagMap = {
    new: 'Новинка',
    recommended: 'Выбор гостей',
    kids: 'Детское',
    spicy: 'Острое'
  };
  const tags = item.tags || [];
  const tagsHtml = tags.map(t => {
    const label = tagMap[t] || t;
    return `<span class="tag ${t}">${label}</span>`;
  }).join('');

  const desc = item.description ? `<p class="card-text">${item.description}</p>` : '';
  const weight = item.weight ? `<span class="menu-item-weight">${item.weight}</span>` : '';
  const image = item.image
    ? `<div class="menu-item-image"><img src="${item.image}" alt="${item.name}" loading="lazy"></div>`
    : '';

  return `
    <article class="menu-item card">
      ${image}
      <div class="card-body">
        <div class="menu-item-header">
          <h3 class="card-title">${item.name}</h3>
          <span class="menu-item-price">${formatPrice(item)}</span>
        </div>
        ${desc}
        <div class="menu-item-meta">
          ${weight}
          ${tags.length ? `<div class="menu-item-tags">${tagsHtml}</div>` : ''}
        </div>
      </div>
    </article>
  `;
}

function renderSubcategory(subcat) {
  const title = subcat.name
    ? `<h4 class="menu-subcategory-title">${subcat.name}</h4>`
    : '';
  const itemsHtml = subcat.items.map(renderMenuItem).join('');
  return `
    <div class="menu-subcategory">
      ${title}
      <div class="menu-items">${itemsHtml}</div>
    </div>
  `;
}

function renderCategory(category) {
  const subcatsHtml = category.subcategories.map(renderSubcategory).join('');
  return `
    <section class="menu-category" id="cat-${category.slug}">
      <h3 class="menu-category-title">${category.name}</h3>
      ${subcatsHtml}
    </section>
  `;
}

function renderMenu(containerId, filterCategory) {
  const container = document.getElementById(containerId);
  if (!container) return;
  loadMenuData().then(data => {
    if (!data) {
      container.innerHTML = '<p class="text-center">Меню временно недоступно. Попробуйте позже.</p>';
      return;
    }
    let cats = data.categories;
    if (filterCategory) {
      cats = cats.filter(c => c.slug === filterCategory);
    }
    container.innerHTML = cats.map(renderCategory).join('');
  });
}

function findMenuItem(data, name) {
  for (const cat of data.categories) {
    for (const sub of cat.subcategories) {
      const item = sub.items.find(i =>
        i.name.toLowerCase().includes(name.toLowerCase()) ||
        name.toLowerCase().includes(i.name.toLowerCase())
      );
      if (item) return { ...item, category: cat.name, categorySlug: cat.slug };
    }
  }
  return null;
}
