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


/* Sticky header */

window.onscroll = function() {stickyHeader()};

let header = document.querySelector("#header");
let logo = document.querySelector(".logo");
let texto_header = document.querySelector(".texto-header");
let icono_redes = document.querySelectorAll(".icono-redes");

let sticky = header.offsetTop;

function stickyHeader() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
    logo.classList.add("sticky");
    texto_header.classList.add("sticky");
    icono_redes.forEach(element => {
      element.classList.add("sticky");
    });
  } else {
    header.classList.remove("sticky");
    logo.classList.remove("sticky");
    texto_header.classList.remove("sticky");
    icono_redes.forEach(element => {
      element.classList.remove("sticky");
    });
  }
}