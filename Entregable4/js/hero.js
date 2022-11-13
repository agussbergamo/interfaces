"use strict";

//Agrega el blur y la lista de habilidades al hacer hover en las tarjetas de los personajes
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


//Agrega el fondo de matrix y la cuenta regresiva en el div de info de nuevo lanzamiento

//Fondo matrix
let canvas = document.getElementById("fondo-matrix");
let context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const katakana = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン";
const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numeros = "0123456789";
const alfabeto = katakana + letras + numeros;
const tamanioFuente = 20;
const numColumnas = canvas.width/tamanioFuente;
const columnas = [];

for( let x = 0; x < numColumnas; x++ ) {
	columnas[x] = 1;
}

const draw = () => {
	context.fillStyle = "rgba(0, 0, 0, 0.05)";
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	context.fillStyle = "#0F0";
	context.font = tamanioFuente + "px monospace";

	for(let i = 0; i < columnas.length; i++)
	{
		let text = alfabeto.charAt(Math.floor(Math.random() * alfabeto.length));
		context.fillText(text, i*tamanioFuente, columnas[i]*tamanioFuente);
		
		if(columnas[i]*tamanioFuente > canvas.height && Math.random() > 0.975){
			columnas[i] = 0;
        }
		columnas[i]++;
	}
};

setInterval(draw, 30);


//Cuenta regresiva

var fechaLimite = new Date("Dec 12, 2022 15:37:25").getTime();
var x = setInterval(function() {
  var hoy = new Date().getTime();
  var distancia = fechaLimite - hoy;
  var dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
  var horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
  var segundos = Math.floor((distancia % (1000 * 60)) / 1000);
  document.getElementById("cuenta-regresiva").innerHTML = dias + " Días | " + horas + " Horas | "
  + minutos + " Minutos | " + segundos + " Segundos ";
  if (distancia < 0) {
    clearInterval(x);
    document.getElementById("cuenta-regresiva").innerHTML = "¡YA ESTÁ DISPONIBLE!";
  }
}, 1000);