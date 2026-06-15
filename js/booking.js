document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('booking-form');
  const formContent = document.querySelector('.booking-form-content');
  const successEl = document.querySelector('.form-success');

  if (!form) return;

  const dateInput = document.getElementById('booking-date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('guest-name').value.trim();
    const phone = document.getElementById('guest-phone').value.trim();
    const guests = document.getElementById('guest-count').value;
    const date = document.getElementById('booking-date').value;
    const time = document.getElementById('booking-time').value;
    const comment = document.getElementById('booking-comment').value.trim();

    if (!name || !phone || !guests || !date || !time) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }

    const message = encodeURIComponent(
      `Бронирование столика в Пармезан\n` +
      `Имя: ${name}\n` +
      `Телефон: ${phone}\n` +
      `Гостей: ${guests}\n` +
      `Дата: ${date}\n` +
      `Время: ${time}` +
      (comment ? `\nПожелания: ${comment}` : '')
    );

    window.open(`https://wa.me/79065056858?text=${message}`, '_blank');

    formContent.style.display = 'none';
    successEl.classList.add('show');
  });
});
