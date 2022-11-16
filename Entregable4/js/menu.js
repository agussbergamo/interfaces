"use strict";

//Despliega el menú hamburguesa y oscurece el fondo del resto de la página

let overlay = document.querySelector("#overlay");
let menu = document.querySelector("#menu-hamburguesa");
let lis = menu.querySelectorAll(".animated-button");
overlay.addEventListener("click",()=>{
    spans.forEach(function(s){
        s.classList.toggle("open");
    })
    lis.forEach(function(li){
        li.classList.toggle("aumentado");
    })
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
    lis.forEach(function(li){
        li.classList.toggle("aumentado");
    })
}

function ocultar(params) {
    menu.classList.toggle("ocultar");
}

/* animacion menu hamburguesa*/ 

let spans = btnHamburguesa.querySelectorAll(".capas-hamburguesa");
btnHamburguesa.addEventListener("click",function(){
    spans.forEach(function(s){
        s.classList.toggle("open");
    })
})