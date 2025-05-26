var swiperUI = null;
var links = [];

function createSwiperUI(slideTo = 0) {
  if (swiperUI !== null) return;

  const cross = document.createElement('span')
  cross.classList.add("swiper-cross")
  cross.addEventListener("click", destroySwiperUI)

  document.querySelector(
    ".swiper-wrapper"
  ).classList.add("swiper-wrapper_flex")
  document.querySelector(
    ".swiper"
  ).appendChild(cross)

  swiperUI = new Swiper('.swiper', {
      // Optional parameters
      direction: 'horizontal',
      loop: true,

      // If we need pagination
      pagination: {
          el: '.swiper-pagination',
      },

      // And if we need scrollbar
      scrollbar: {
          el: '.swiper-scrollbar',
      },
  });
  swiperUI.slideTo(slideTo);
}

function destroySwiperUI(event) {
  if (swiperUI === null) return;
  document.querySelector(
    ".swiper-wrapper"
  ).classList.remove("swiper-wrapper_flex")
  event.target.remove();
  swiperUI.destroy();
  swiperUI = null;
  setSwiperGrid(document.querySelectorAll(".swiper-slide"))
}

function setSwiperGrid(images) {
  const swiper = document.querySelector(".swiper")
  images.forEach((image, index) => {
    image.style.textAlign = "center"
    image.style.backgroundImage = `url("${window.location.pathname}/images/${links[index]}")`
    image.style.backgroundSize = "cover"
  });
  swiper.style.height = Math.ceil(images.length / 3) * 200 + "px"
  swiper.style.margin = "40px 0"
}

window.onload = () => {
    fetch(`${window.location.pathname}/images/`).then(r => r.text()).then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      links = [...doc.querySelectorAll('a')].map(
        a => a.getAttribute('href')).filter(href => href.match(/\.(jpg|png|webp|jpeg|gif)$/i)
      );
      const gallery = document.getElementById('gallery');
      const images = links.map((_, index) => {
        const block = document.createElement('div');
        block.classList.add("swiper-slide")
        block.addEventListener("click", () => {
          createSwiperUI(index)
        })
        gallery.appendChild(block);
        return block;
      });
      setSwiperGrid(images)
  });
}