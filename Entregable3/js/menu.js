"use strict";

/* overlay y menu hamburguesa */

let overlay = document.querySelector("#overlay");
let menu = document.querySelector("#menu-hamburguesa");
overlay.addEventListener("click",()=>{
    overlay.classList.toggle("ocultar");
    menu.classList.toggle("aumentar");
    setTimeout(ocultar,400);
})

let btnHamburguesa = document.querySelector("#btn-hamburguesa");
btnHamburguesa.addEventListener("click", desplegarMenu);

function desplegarMenu(params) {
    menu.classList.toggle("ocultar");
    setTimeout(aumentar, 1);
    overlay.classList.toggle("ocultar");
}

function aumentar(params) {
    menu.classList.toggle("aumentar");
}

function ocultar(params) {
    menu.classList.toggle("ocultar");
}