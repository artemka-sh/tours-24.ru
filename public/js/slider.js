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
  const toursCount = 9;
  const toursPerView = document.body.clientWidth < 1200 ? (
    document.body.clientWidth < 800 ? 1 : 2
  ) : 3;
  const tourWidth = 100 / toursPerView;

  function mod(n, m) {
    return ((n % m) + m) % m;
  }

  function updateSlider(index) {

    toursTrack.style.transform = `translateX(calc(${index * -tourWidth}% + ${index > 0 ? 10 : 0}px))`
    tourIndex = index;
  }

  let startX = 0;
  let currentX = 0;
  let isSwiping = false;
  let initialOffset = 0;

  const maxIndex = toursCount - toursPerView;

  toursTrack.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    currentX = startX;
    isSwiping = true;

    // текущий смещение в %, которое мы будем дополнять
    initialOffset = -tourIndex * tourWidth;
    toursTrack.style.transition = 'none'; // отключаем анимацию для живого свайпа
  }, { passive: true });

  toursTrack.addEventListener('touchmove', e => {
    if (!isSwiping) return;
    currentX = e.touches[0].clientX;
    const deltaX = currentX - startX;

    const percentDelta = (deltaX / window.innerWidth) * 100;
    const offset = initialOffset + percentDelta;

    toursTrack.style.transform = `translateX(${offset}%)`;
  }, { passive: true });

  toursTrack.addEventListener('touchend', () => {
    if (!isSwiping) return;

    const deltaX = currentX - startX;
    const threshold = window.innerWidth * 0.15; // свайп должен быть хотя бы на 15% ширины экрана

    toursTrack.style.transition = 'transform 0.3s ease'; // вернём плавность

    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0 && tourIndex > 0) {
        updateSlider(tourIndex - 1);
      } else if (deltaX < 0 && tourIndex < maxIndex) {
        updateSlider(tourIndex + 1);
      } else {
        updateSlider(tourIndex); // свайп за край — откат
      }
    } else {
      updateSlider(tourIndex); // слишком короткий свайп — откат
    }

    isSwiping = false;
    startX = 0;
    currentX = 0;
  });

  for (let i = 0; i < toursCount; i++) {
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
    const element = document.getElementById(tour.path);

    element.style.width = `calc(${tourWidth}% - 10px)`
    tournails.push(element)
  }

  document.querySelector('.nav.left.block').addEventListener('click', () => {
    const index = mod((tourIndex - 1), (tournails.length - toursPerView));
    updateSlider(index);
  });

  document.querySelector('.nav.right.block').addEventListener('click', () => {
    const index = mod((tourIndex + 1), (tournails.length - toursPerView));
    updateSlider(index);
  });
}
