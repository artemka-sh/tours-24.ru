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

