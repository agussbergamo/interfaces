"use strict"; 

inicializar();

/* pantalla de carga */
let segundos = 0;
function inicializar(params) {
    setTimeout(cargaPagina,1000);
    setTimeout(cargaPagina,2000);
    setTimeout(cargaPagina,3000);
    setTimeout(cargaPagina,4000);
    setTimeout(cargaPagina,5000);
    setTimeout(quitarPantallaCarga,5500); 
}  
function cargaPagina() {
    segundos++;
    let porcentaje = document.querySelector("#porcentaje");
    porcentaje.innerHTML= segundos * 20;
}

function quitarPantallaCarga(params) {
    let divInicio = document.querySelector(".inicio");
    divInicio.classList.toggle("ocultar");
}

let filas = document.querySelectorAll(".carrusel");
let derechas = document.querySelectorAll(".flecha-sig");
let izquierdas = document.querySelectorAll(".flecha-ant");
asignarFuncionFlechas();
verificarScroll();


function verificarScroll(elem) {
    if(elem){
        let flechaIzq = elem.querySelector(".flecha-ant");
        let flechaDer = elem.querySelector(".flecha-sig");
        console.log(elem.scrollLeft)
        if(elem.scrollLeft==0){
            flechaIzq.classList.add("disabled");
        }  else if(elem.scrollLeft+elem.offsetWidth >= elem.scrollWidth){
            flechaDer.classList.add("disabled");
        }
        else{
            flechaDer.classList.remove("disabled");
            flechaIzq.classList.remove("disabled");
        }
    }else{
        for (const izq of izquierdas) {
            izq.classList.add("disabled");
        }
    } 
}

function asignarFuncionFlechas(params) {
    for (const flecha of derechas) {
        flecha.addEventListener("click",moverCarruselDer);
    }
    for (const flecha of izquierdas) {
        flecha.addEventListener("click",moverCarruselIzq)
    }
}

function moverCarruselDer(params) {
    let ul = this.parentElement;
    if(!this.classList.contains("disabled")){
        this.parentElement.scrollLeft += 530;
        setTimeout(verificarScroll,450, ul);
    } 
   
}
function moverCarruselIzq(params) {
    let ul = this.parentElement;
    if(!this.classList.contains("disabled")){
        this.parentElement.scrollLeft -= 530;
   setTimeout(verificarScroll, 450, ul);
    }
    
}

/* menu categorias desplegable */ 

let categorias = document.querySelector("#categorias");
categorias.addEventListener("click",mostrarCategorias);

function mostrarCategorias(params) {
    let listaCategorias = document.querySelector("#lista-categorias");
    listaCategorias.classList.toggle("ocultar");
}

/*hover card*/

let cards = document.querySelectorAll(".card");

for (const card of cards) {
    card.addEventListener("mouseover",mostrarBoton)
    card.addEventListener("mouseout",mostrarBoton);
}

function mostrarBoton(params){
    if(window.innerWidth> 600){
        let info = this.querySelector(".contenedor-info");
        info.classList.toggle("ocultar");
        let boton = this.querySelector(".btn-card")
        boton.classList.toggle("ocultar");
    }
    
}


/* hover btn card*/ 

let botonesCard = document.querySelectorAll(".btn-card");


for (const boton of botonesCard) {
    boton.addEventListener("mousemove",asignarHover)
}

function asignarHover(e) {
    let chords = this.getBoundingClientRect();
    let chorX = chords.left;
    let chorY = chords.top;
    let x = e.clientX - chorX;
    let y = e.clientY - chorY;
    this.style.setProperty('--x',x+'px');
    this.style.setProperty('--y',y+'px');
}

/* href cambio */
let btn4EnLineas = document.querySelector("#cuatroEnLineas");
btn4EnLineas.addEventListener("click",()=> {
    location.href = './dragones-en-linea.html';

})