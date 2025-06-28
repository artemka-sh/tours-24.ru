const tours = [
    { path: 'white-island-luxury-boat-2', title: 'Белый остров. Заповедник Рас-Мохаммед на яхте', price: '€25 <del>€40</del>', duration: '8 Часов', image_h2: 'Белый остров', image_p: 'Лодка' },
    { path: 'super-safari-atv-camel-show', title: 'Катание на квадроциклах и на верблюде, остановки с бидуинами', price: '€35 <del>€45</del>', duration: '5 Часов', image_h2: 'Сафари', image_p: 'Культура' },
    { path: 'cairo-2day-bus-from-sharm', title: 'Каир на автобусе 2 день из Шарм эль шейха', price: '€100 <del>€120</del>', duration: '2 Дня', image_h2: 'Каир', image_p: 'Пирамиды' },
    { path: 'albatros-aqua-park-day-use', title: 'Дневное посещение аквапарка Альбатрос', price: '€20 <del>€30</del>', duration: '4 Часа', image_h2: 'Аквапарк', image_p: 'Водные горки' },
    { path: 'atv-desert-safari', title: 'Сафари по пустыне на квадроциклах ATV', price: '€15 <del>€25</del>', duration: '3 Часа', image_h2: 'Пустыня', image_p: 'ATV Сафари' },
    { path: 'buggy-safari', title: 'Сафари на багги', price: '€25 <del>€35</del>', duration: '3 Часа', image_h2: 'Пустыня', image_p: 'Багги' },
    { path: 'cairo-alex-2day-from-sharm', title: 'Каир и Александрия: 2 дня из Шарма', price: '€120 <del>€140</del>', duration: '2 Дня', image_h2: 'Александрия', image_p: 'Город' },
    { path: 'cairo-bus-pyramids-museum-day', title: 'Каир: пирамиды и музей на автобусе', price: '€80 <del>€100</del>', duration: '1 День', image_h2: 'Пирамиды', image_p: 'Музей' },
    { path: 'cairo-plane-1day-from-sharm', title: 'Каир: 1 день на самолёте из Шарма', price: '€150 <del>€180</del>', duration: '1 День', image_h2: 'Каир', image_p: 'Пирамиды' },
    { path: 'catherine-monastery-dahab-from-sharm', title: 'Монастырь Св. Екатерины и Дахаб', price: '€40 <del>€50</del>', duration: '8 Часов', image_h2: 'Монастырь', image_p: 'Дахаб' },
    { path: 'colored-canyon-jeep-blue-hole-dahab', title: 'Цветной каньон и Голубая дыра', price: '€35 <del>€45</del>', duration: '6 Часов', image_h2: 'Каньон', image_p: 'Дахаб' },
    { path: 'dolphin-show-and-swim', title: 'Шоу дельфинов и плавание', price: '€30 <del>€40</del>', duration: '2 Часа', image_h2: 'Дельфины', image_p: 'Шоу' },
    { path: 'extreme-safari-6x1', title: 'Экстремальное сафари 6 в 1', price: '€50 <del>€60</del>', duration: '6 Часов', image_h2: 'Сафари', image_p: 'Экстрим' },
    { path: 'glass-bottom-boat', title: 'Лодка с прозрачным дном', price: '€20 <del>€30</del>', duration: '2 Часа', image_h2: 'Море', image_p: 'Кораллы' },
    { path: 'horse-riding-desert', title: 'Конная прогулка по пустыне', price: '€25 <del>€35</del>', duration: '2 Часа', image_h2: 'Пустыня', image_p: 'Лошади' },
    { path: 'jerusalem-from-sharm', title: 'Иерусалим из Шарма', price: '€120 <del>€140</del>', duration: '1 День', image_h2: 'Иерусалим', image_p: 'Святыни' },
    { path: 'luxor-plane-from-sharm', title: 'Луксор на самолёте из Шарма', price: '€180 <del>€200</del>', duration: '1 День', image_h2: 'Луксор', image_p: 'Храмы' },
    { path: 'moses-catherine-monastery-tour', title: 'Гора Моисея и монастырь Св. Екатерины', price: '€40 <del>€50</del>', duration: '8 Часов', image_h2: 'Гора', image_p: 'Монастырь' },
    { path: 'parasailing-banana-sofa-water-sports', title: 'Парасейлинг и водные аттракционы', price: '€30 <del>€40</del>', duration: '2 Часа', image_h2: 'Море', image_p: 'Спорт' },
    { path: 'petra-day-trip-from-sharm', title: 'Петра: однодневная поездка из Шарма', price: '€150 <del>€170</del>', duration: '1 День', image_h2: 'Петра', image_p: 'Иордания' },
    { path: 'private-yacht-ras-mohammed', title: 'Частная яхта на Рас-Мохаммед', price: '€400 <del>€450</del>', duration: '15 Дней', image_h2: 'Яхта', image_p: 'Рас-Мохаммед' },
    { path: 'ras-mohammed-by-bus', title: 'Рас-Мохаммед на автобусе', price: '€25 <del>€35</del>', duration: '6 Часов', image_h2: 'Рас-Мохаммед', image_p: 'Кораллы' },
    { path: 'scuba-diving', title: 'Подводное плавание с аквалангом', price: '€50 <del>€60</del>', duration: '4 Часа', image_h2: 'Море', image_p: 'Дайвинг' },
    { path: 'semi-submarine-seascope', title: 'Полуподводная лодка Seascope', price: '€25 <del>€35</del>', duration: '2 Часа', image_h2: 'Море', image_p: 'Кораллы' },
    { path: 'sina-dream-yacht', title: 'Яхта Sina Dream', price: '€60 <del>€80</del>', duration: '8 Часов', image_h2: 'Яхта', image_p: 'Море' },
    { path: 'tiran-island-snorkeling', title: 'Сноркелинг на острове Тиран', price: '€30 <del>€40</del>', duration: '6 Часов', image_h2: 'Тиран', image_p: 'Сноркелинг' },
    { path: 'turkish-bath-hammam-2', title: 'Турецкая баня Хаммам', price: '€20 <del>€30</del>', duration: '2 Часа', image_h2: 'Хаммам', image_p: 'Релакс' }    
];


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
                                <p><span>${tour.price}</span><span>Per person</span></p>
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
    container.innerHTML = ''; // Очищаем текущие карточки
    renderTours(tours, container); // Рендерим все туры
    viewMoreBtn.style.display = 'none'; // Скрываем кнопку
}

document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.tour .main-container');
    const viewMoreBtn = document.querySelector('.btn-view-all');
    const toursLink = document.querySelector('a[href="/#tour"]');

    // Рендерим первые 4 тура изначально
    container.innerHTML = ''; // Очищаем контейнер
    renderTours(tours.slice(0, 4), container);

    // Обработчик для кнопки "View More"
    viewMoreBtn.addEventListener('click', function() {
        showAllTours(container, viewMoreBtn);
    });

    // Обработчик для ссылки "Туры" в хедере
    toursLink.addEventListener('click', function(event) {
        event.preventDefault(); // Предотвращаем стандартное поведение якоря
        showAllTours(container, viewMoreBtn);
        // Прокручиваем к секции туров
        document.querySelector('#tour').scrollIntoView({ behavior: 'smooth' });
    });

    // Обработчик для хеша в URL при загрузке страницы
    if (window.location.hash === '#tour') {
        showAllTours(container, viewMoreBtn);
    }
});

const ham = document.querySelector('.ham-menu')
const nav = document.querySelector('.navbar')

ham.addEventListener("click",()=>{
    ham.classList.toggle('active')
    nav.classList.toggle('active')
})

document.getElementById("current-year").textContent = new Date().getFullYear();


const loadder = document.getElementById('preloadder')
loadder.style.display = "none";

window.addEventListener("load",()=>{
    loadder.style.display = "none";
});
