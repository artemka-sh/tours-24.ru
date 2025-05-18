window.onload = () => {
    fetch(`${window.location.pathname}/images/`).then(r => r.text()).then(html => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const links = [...doc.querySelectorAll('a')];
    const images = links.map(a => a.getAttribute('href')).filter(href => href.match(/\.(jpg|png|webp|jpeg|gif)$/i));
    const gallery = document.getElementById('gallery');
    images.forEach(src => {
      const block = document.createElement('div');
      block.classList.add("swiper-slide")
      block.style.textAlign = "center"
      block.innerHTML = `
        <img src="${window.location.pathname}/images/${src}">
      `
      gallery.appendChild(block);
    });
    const swiper = new Swiper('.swiper', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,

        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // And if we need scrollbar
        scrollbar: {
            el: '.swiper-scrollbar',
        },
    });
  });
}