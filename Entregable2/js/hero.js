"use strict";

let cards_personajes = document.querySelectorAll(".personaje");

for (const card of cards_personajes) {
    card.addEventListener("mouseover", mostrarHabilidades);
    card.addEventListener("mouseout", mostrarHabilidades);
}

function mostrarHabilidades(){
    let habilidades = this.querySelector(".habilidades");
    habilidades.classList.toggle("ocultar");
    let card_personaje = this.querySelector(".card");
    card_personaje.classList.toggle("blur");
}
