"use strict"; 


let fila = document.querySelector(".carrusel");
console.log(fila);
let derecha = document.querySelector(".flecha-sig");
console.log(derecha);
let izquierda = document.querySelector(".flecha-ant");
console.log(izquierda);

verificarScroll();

//ver de cambiar el style en linea con classList.add etc.
function verificarScroll(params) {
    console.log(fila.scrollLeft);
    if(fila.scrollLeft==0){
        izquierda.style.visibility = "hidden";
    }else{
        izquierda.style.visibility = "visible";
    }

    if(fila.scrollLeft==(fila.scrollWidth-fila.offsetWidth)){
        derecha.style.visibility = "hidden";
    }else{
        derecha.style.visibility = "visible";
    }
}

derecha.addEventListener("click", () =>{
    fila.scrollLeft += fila.offsetWidth;
    setTimeout(verificarScroll,500);
})

izquierda.addEventListener("click", () =>{
    fila.scrollLeft -= fila.offsetWidth;
    setTimeout(verificarScroll,500)
})

/* menu categorias desplegable */ 

let categorias = document.querySelector("#categorias");
categorias.addEventListener("click",mostrarCategorias);

function mostrarCategorias(params) {
    let listaCategorias = document.querySelector("#lista-categorias");
    listaCategorias.classList.toggle("ocultar");
}

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