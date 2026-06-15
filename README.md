# Пармезан — сайт кафе

Маркетинговый сайт кафе «Пармезан» в Клинцах. Неаполитанская пицца из дровяной печи.

## Стек

- HTML5, CSS3 (custom properties, flexbox, grid)
- Vanilla JavaScript (ES6+, fetch, IntersectionObserver)
- Google Fonts: Playfair Display + Source Sans 3
- Данные меню: `data/menu.json` (выгружено с [parmesan-klintsy.ru](https://parmesan-klintsy.ru))

## Страницы

| Страница | Описание |
|----------|----------|
| `index.html` | Главная: hero, о кафе, услуги, популярные блюда |
| `menu.html` | Полное меню с фильтрами по категориям |
| `delivery.html` | Условия доставки и самовывоза |
| `booking.html` | Бронирование столика (WhatsApp) |
| `contacts.html` | Адрес, телефон, карта |

## Локальный запуск

```bash
cd parmesan-klintsy
python3 -m http.server 8080
```

Откройте [http://localhost:8080](http://localhost:8080)

## Контакты заведения

- **Адрес:** г. Клинцы, ул. Октябрьская, 68
- **Телефон:** +7 (906) 505-68-58
- **Часы:** пн–вс 10:00–23:00
- **Заказ онлайн:** [parmesan-klintsy.ru](https://parmesan-klintsy.ru)

## Медиа с parmesan-klintsy.ru

Скачаны и подключены реальные материалы заведения:

| Папка | Содержимое |
|-------|------------|
| `images/products/` | 105+ фото блюд (все позиции меню) |
| `images/hero/` | 9 хитов с главной страницы |
| `images/brand/` | Логотип, favicon, иконки, баннер пиццы |

Каталог изображений: `data/image-catalog.json`  
У каждой позиции в `data/menu.json` есть поля `image` и `slug`.

```
parmesan-klintsy/
├── index.html, menu.html, delivery.html, booking.html, contacts.html
├── css/          — стили (итальянская палитра)
├── js/           — компоненты, меню, формы
├── data/         — menu.json, business.json
└── images/       — медиа (placeholder)
```
