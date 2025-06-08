const mainImages = [];
const thumbnails = [];
const dots = [];
var currentIndex = 0;

fetch(`${window.location.pathname}/images/`).then(r => r.text()).then(html => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const links = [...doc.querySelectorAll('a')].map(
    a => a.getAttribute('href')
  ).filter(href => href.match(/\.(jpg|png|webp|jpeg|gif)$/i));

  const track = document.querySelector('.main-slide-track');
  const thumbsTrack = document.querySelector('.thumbs-track');

  links.forEach((link, index) => {
    const img = document.createElement('img');
    img.src = `${window.location.pathname}/images/${link}`;
    track.appendChild(img);
    mainImages.push(img);

    const thumb = img.cloneNode();
    thumb.setAttribute('data-index', index);
    if (index === 0) thumb.classList.add('active');
    thumbsTrack.appendChild(thumb);
    thumbnails.push(thumb);
  });

  function updateSlider(index) {
    const slideWidth = 100;
    track.style.transform = `translateX(-${index * slideWidth}%)`;
  
    thumbnails.forEach((thumb, i) => {
      thumb.classList.toggle('active', i === index);
    });
  
    // === Новая логика автоцентрирования превью ===
    const thumbWidth = 25; // ширина превью + gap (100px + 10px)
    const thumbsPerView = 4;
  
    // Центрировать так, чтобы выбранный был посередине окна
    let scrollIndex = index - Math.floor(thumbsPerView / 2);
    scrollIndex = Math.max(0, scrollIndex);
    const maxScroll = thumbnails.length - thumbsPerView;
    scrollIndex = Math.min(scrollIndex, maxScroll);

    thumbsTrack.style.transform = `translateX(calc(${scrollIndex * -thumbWidth}% + ${scrollIndex > 0 ? 10 : 0}px))`
    currentIndex = index;
  }

  // Слайдер: кнопки
  document.querySelector('.nav.left').addEventListener('click', () => {
    const index = (currentIndex - 1 + mainImages.length) % mainImages.length;
    updateSlider(index);
  });

  document.querySelector('.nav.right').addEventListener('click', () => {
    const index = (currentIndex + 1) % mainImages.length;
    updateSlider(index);
  });

  // Клик по миниатюре
  thumbnails.forEach(thumb => {
    thumb.addEventListener('click', () => {
      updateSlider(+thumb.dataset.index);
    });
  });
});
