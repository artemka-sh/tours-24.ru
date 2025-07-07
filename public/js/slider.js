import {tours} from './tours.js'


const mainImages = [];
const thumbnails = [];
const tournails = [];
var tourIndex = 0;
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
  document.querySelector('.nav.left.image').addEventListener('click', () => {
    const index = (currentIndex - 1 + mainImages.length) % mainImages.length;
    updateSlider(index);
  });

  document.querySelector('.nav.right.image').addEventListener('click', () => {
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

window.onload = () => {
  const toursTrack = document.querySelector(".tours-track")
  const toursPerView = 3;
  const tourWidth = 33;

  function updateSlider(index) {

    toursTrack.style.transform = `translateX(calc(${index * -tourWidth}% + ${index > 0 ? 10 : 0}px))`
    tourIndex = index;
  }

  for (let i = 0; i < 9; i++) {
    let tour = tours[i];
    toursTrack.innerHTML += `
    <div class="tour-cards" id="${tour.path}" onclick="window.location.href = '/${tour.path}'">
      <div class="image-box" style='z-index: 0'>
          <img src="/${tour.path}/images/img1.webp" alt="${tour.title}">
          
          <div class="overlay"></div>
          <div class="image-box-text">
              <h2 style='color: white'>${tour.image_h2}</h2>
              <p style='color: white'>${tour.image_p}</p>
          </div>
      </div>
    </div>
    `
    tournails.push(document.getElementById(tour.path))
  }

  document.querySelector('.nav.left.block').addEventListener('click', () => {
    const index = (tourIndex - 1) % (tournails.length - toursPerView);
    updateSlider(index);
  });

  document.querySelector('.nav.right.block').addEventListener('click', () => {
    const index = (tourIndex + 1) % (tournails.length - toursPerView);
    updateSlider(index);
  });
}
