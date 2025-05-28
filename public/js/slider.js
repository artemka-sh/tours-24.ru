var swiperUI = null;
var links = [];

function getImagePerRow() {
  return document.body.clientWidth > 1615 ? 5 : (
    document.body.clientWidth > 1015 ? 4 : (
      document.body.clientWidth > 615 ? 3 : (
        document.body.clientWidth > 415 ? 2 : 1
      )
    )
  )
}

function createSwiperUI(slideTo = 0) {
  if (swiperUI !== null) return;
  const image_per_row = getImagePerRow()

  const cross = document.createElement('span')
  const swiper = document.querySelector(".swiper")
  const swiperBlock = document.querySelector(".swiper-wrapper")
  cross.classList.add("swiper-cross")
  cross.addEventListener("click", destroySwiperUI)

  swiperBlock.classList.add("swiper-wrapper_flex")
  swiper.appendChild(cross)

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
  swiper.style.height = image_per_row * 200 + "px"
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
  const image_per_row = getImagePerRow()
  
  images.forEach((image, index) => {
    console.log(image_per_row, index)
    image.style.textAlign = "center"
    image.style.backgroundImage = `url("${window.location.pathname}/images/${links[index]}")`
    image.style.backgroundSize = "contain"
    image.style.gridColumn = `${index % image_per_row + 1}`
  });
  swiper.style.height = Math.ceil(images.length / image_per_row) * 200 + "px"
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