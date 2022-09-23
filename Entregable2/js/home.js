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

    if(fila.scrollLeft>500){
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