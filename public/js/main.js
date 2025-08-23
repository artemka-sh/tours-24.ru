// ===== ЛОГИКА ТУРОВ =====
import { tours } from './tours.js';

function renderTours(toursToRender, container) {
    toursToRender.forEach(tour => {
        const cardHtml = `
            <div class="tour-cards">
                <div class="image-box">
                    <img src="/${tour.path}/images/img1.webp" alt="${tour.title}">
                    <div class="overlay"></div>
                    <div class="image-box-text">
                        <h2>${tour.image_h2}</h2>
                        <p>${tour.image_p}</p>
                    </div>
                </div>
                <div class="tour-cards-text">
                    <a href="/${tour.path}"><h1>${tour.title}</h1></a>
                    <div class="spacer"></div>
                    <a href="/${tour.path}">
                        <div class="price">
                            <p><span>${tour.price}</span><span>За человека</span></p>
                            <h2>${tour.duration}</h2>
                        </div>
                    </a>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', cardHtml);
    });
}

function showAllTours(container, viewMoreBtn) {
    container.innerHTML = '';
    renderTours(tours, container);
    if (viewMoreBtn) viewMoreBtn.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.tour .main-container');
    const viewMoreBtn = document.querySelector('.btn-view-all');
    const toursLink = document.querySelector('a[href="/#tour"]');

    if (container) {
        container.innerHTML = '';
        renderTours(tours.slice(0, 7), container);

        if (viewMoreBtn) {
            viewMoreBtn.addEventListener('click', function() {
                showAllTours(container, viewMoreBtn);
            });
        }

        if (toursLink) {
            toursLink.addEventListener('click', function(event) {
                event.preventDefault();
                showAllTours(container, viewMoreBtn);
                document.querySelector('#tour')?.scrollIntoView({ behavior: 'smooth' });
            });
        }

        if (window.location.hash === '#tour') {
            showAllTours(container, viewMoreBtn);
        }
    }

    // ===== ЛОГИКА МЕНЮ =====
    const ham = document.querySelector('.ham-menu');
    const nav = document.querySelector('.navbar');

    if (ham && nav) {
        ham.addEventListener("click", () => {
            ham.classList.toggle('active');
            nav.classList.toggle('active');
        });

        document.onmousedown = () => {
            nav.classList.contains("active") && nav.classList.remove("active")
            ham.classList.contains("active") && ham.classList.remove("active")
        }
    }

    // ===== ТЕКУЩИЙ ГОД =====
    const yearEl = document.getElementById("current-year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // ===== ПРЕЛОАДЕР =====
    const loader = document.getElementById('preloadder');
    if (loader) {
        loader.style.display = "none";
        window.addEventListener("load", () => {
            loader.style.display = "none";
        });
    }
});
