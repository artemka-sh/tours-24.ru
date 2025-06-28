// function renderTours(toursToRender, container) {
//     toursToRender.forEach(tour => {
//         const cardHtml = `
           
//                 <div class="tour-cards">
//                     <div class="image-box">
                        
//                         <img src="/${tour.path}/images/img1.webp" alt="${tour.title}">
                        
//                         <div class="overlay"></div>
//                         <div class="image-box-text">
//                             <h2>${tour.image_h2}</h2>
//                             <p>${tour.image_p}</p>
//                         </div>
                        
//                     </div>
                    
//                     <div class="tour-cards-text">
//                         <a href="/${tour.path}"><h1>${tour.title}</h1></a>
//                         <div class="spacer"></div>
//                         <a href="/${tour.path}">
//                             <div class="price">
//                                 <p><span>${tour.price}</span><span>Per person</span></p>
//                                 <h2>${tour.duration}</h2>
//                             </div>
//                         </a>
//                     </div>
//                 </div>
            
//         `;
//         container.insertAdjacentHTML('beforeend', cardHtml);
//     });
// }

// function showAllTours(container, viewMoreBtn) {
//     container.innerHTML = ''; // Очищаем текущие карточки
//     renderTours(tours, container); // Рендерим все туры
//     viewMoreBtn.style.display = 'none'; // Скрываем кнопку
// }

// document.addEventListener('DOMContentLoaded', function() {
//     const container = document.querySelector('.tour .main-container');
//     const viewMoreBtn = document.querySelector('.btn-view-all');
//     const toursLink = document.querySelector('a[href="/#tour"]');


//     container.innerHTML = ''; // Очищаем контейнер
//     renderTours(tours, container);



//     // Обработчик для ссылки "Туры" в хедере
//     toursLink.addEventListener('click', function(event) {
//         event.preventDefault(); // Предотвращаем стандартное поведение якоря

//         // Прокручиваем к секции туров
//         document.querySelector('#tour').scrollIntoView({ behavior: 'smooth' });
//     });


// });

// const ham = document.querySelector('.ham-menu')
// const nav = document.querySelector('.navbar')

// ham.addEventListener("click",()=>{
//     ham.classList.toggle('active')
//     nav.classList.toggle('active')
// })

// document.getElementById("current-year").textContent = new Date().getFullYear();


// const loadder = document.getElementById('preloadder')
// loadder.style.display = "none";

// window.addEventListener("load",()=>{
//     loadder.style.display = "none";
// });
