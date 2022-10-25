"use strict";

let imageFondo = new Image();
   imageFondo.src = "./img/fondo4.jpg";
   imageFondo.onload = function(){
      ctx.drawImage(imageFondo,0,0,canvas.width,canvas.height)
   }

let tiempo = 300;
let intervalo;
let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext('2d');
let tablero;
let cuadrilla; //varia segun tamaño => OK!
let fichas; //varia segun tamaño => OK!
let fichas2; //varia segun tamaño => OK!
let filas;
let totalfichas;
let jugador1 = new Jugador("lauta");
let jugador2 = new Jugador("leonela");
let jugadores;
let jugadorDeTurno;
let botones = document.querySelectorAll(".btn-modalidad");



inicializarEventos();




botones.forEach(b=>{
b.addEventListener("click",event=>{
   ctx.clearRect(0,0,canvas.width,canvas.height);
   ctx.drawImage(imageFondo,0,0,canvas.width,canvas.height)
   jugadores =[];
   cargarJugadores();
   filas = Number(b.value);
   cuadrilla = [];
   fichas = [];
   fichas2 =[];
   tablero = new Tablero (canvas,ctx,cuadrilla,filas-1); //varia segun tamaño
   tablero.inicializar(filas);
   tablero.dibujar(0,filas);
   totalfichas = (filas+1) * (filas+2);
   crearFichas(totalfichas);
   dibujarFichas(0);
   tiempo = 300;
   if(intervalo){
      clearInterval(intervalo);
   }
   intervalo = setInterval(DisminuirTiempo,1000);
})
})


function DisminuirTiempo(){
   if(tiempo>0){
      tiempo--;
      actualizar();
      
   }
}


function mostrarTiempoTransformado(){
   let minutes = Math.floor(tiempo/60);
   let segundos = tiempo % 60;
   minutes = minutes < 10 ? "0" + minutes : minutes;
   segundos = segundos < 10 ? "0" + segundos : segundos;
   ctx.font = "30px Arial";
   ctx.fillStyle = "white";
   ctx.fillText(`${minutes} : ${segundos}`, 410, 50); 
}


function actualizar(){
   ctx.clearRect(0,0,canvas.width,canvas.height);
   ctx.drawImage(imageFondo,0,0,canvas.width,canvas.height)
   tablero.dibujar(1,filas);
   dibujarFichas(1);
   mostrarTiempoTransformado()
   /*ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.fillText(`${tiempo}`, 450, 50);*/
}

function cargarJugadores(){
   jugadores.push(jugador1);
   jugadores.push(jugador2);
   jugador1.puedeJugar=false;
   jugador2.puedeJugar=false;
   let jugador = jugadores[Math.floor(Math.random()*2)];
   jugador.puedeJugar = true;
   jugadorDeTurno = jugador;
   console.log(jugadorDeTurno)

}

function cambiarDeTurno(){

   jugadores.forEach(function(j){
      j.puedeJugar=!j.puedeJugar;
   })

   jugadores.forEach(function(ju){
      if(ju.puedeJugar){
         jugadorDeTurno = ju;
      }
   })
}


//varia segun tamaño => OK!
function crearFichas(totalfichas) {

   for (let i = 0; i < totalfichas/2; i++) {
      let x;
      let y;
      let img = new Image();
      img.src = `./${imageSelected}`;
      if(i<13){
          x = 15;
          y = i* 50 + 30;
         
      }else if(i<26){
          x = 60;
          y = (i - 13)* 50 + 30;
         
      }else if(i<39){
         x = 105;
         y = (i-26) *50 + 30;
      }else{
         x = 150;
         y = (i-39) * 50 + 30;
      }
      fichas[i] = new Ficha (x,y,img,jugador1);
         
      
   }

   for (let i = 0; i < totalfichas/2; i++) {
      let x;
      let y;
      let img = new Image();
      img.src = `./${imageSelected2}`;
      if(i<13){
          x = canvas.offsetWidth - 55;
          y = i* 50 + 30;
         
      }else if(i<26){
          x = canvas.offsetWidth - 100;
          y = (i - 13)* 50 + 30;
         
      }else if(i<39){
         x = canvas.offsetWidth - 145;
         y = (i-26)*50 + 30;
      }else{
         x = canvas.offsetWidth - 190;
         y = (i-39) * 50 + 30;
      }
      fichas2[i] = new Ficha (x,y,img,jugador2);
         
      
   }

   
   
}

function dibujarFichas(n) {
   fichas.forEach(f=>f.draw(ctx,n));
   fichas2.forEach(f=>f.draw(ctx,n));
}

function inicializarEventos(params) {
   canvas.onmousedown = mouseDown;
   canvas.onmouseup = mouseUp;
   canvas.onmousemove = mouseMove;
}



function mouseDown() {
   fichas.forEach(f=>f.verificarSelect(event,canvas.offsetLeft,canvas.offsetTop));
   fichas2.forEach(f=>f.verificarSelect(event,canvas.offsetLeft,canvas.offsetTop));
   
}

function mouseUp(params) {
   fichas.forEach(f=>tablero.verificarColocable(f));
   fichas2.forEach(f=>tablero.verificarColocable(f)); 
}

function mouseMove(params) {
   if(fichas){
      let x = event.clientX - canvas.offsetLeft;
   let y = event.clientY - canvas.offsetTop;
   fichas.forEach(f=>f.actualizarPos(x,y));
   fichas2.forEach(f=>f.actualizarPos(x,y));
   actualizar();
   }
   
   
}

/*  Seleccion de fichas   */ 

let ficha1 = document.querySelectorAll(".ficha1ASelec");
let ficha2 = document.querySelectorAll(".ficha2ASelec");
let imageSelected = "img/dragon1.png";
let imageSelected2 = "img/dragon2.png";


ficha1.forEach(f => f.addEventListener("click", ()=>{
   ficha1.forEach(fi=> fi.classList.remove("selected"))
   f.classList.add("selected");
   imageSelected = f.dataset.src;
   verificarSeleccionadas(ficha2,imageSelected);
}))

ficha2.forEach(f => f.addEventListener("click", ()=>{
   ficha2.forEach(fi=> fi.classList.remove("selected"))
   f.classList.add("selected");
   imageSelected2 = f.dataset.src;
   verificarSeleccionadas(ficha1,imageSelected2);
}))

function verificarSeleccionadas(fichas,image) {
   fichas.forEach(function(f){
      if(f.dataset.src == image  ){
         f.style.visibility = "hidden";
      }else{
         f.style.visibility ="visible";
      }
   })
}


/* ocultamiento y mostrar canva*/ 


let btnDesc = document.querySelector("#btn-descripcion");
btnDesc.addEventListener("click",() =>{
   contenedorDescripcion.classList.add("ocultar");
   contenedorFichas.classList.remove("ocultar");
})

let btnJugar = document.querySelector("#btn-jugar");
btnJugar.addEventListener("click",() =>{
   contenedorJuego.classList.add("ocultar");
   canvasContainer.classList.remove("ocultar");
})

let contenedorFichas = document.querySelector("#contenedor-fichas");
let contenedorDescripcion = document.querySelector("#contenedor-descripcion");
let canvasContainer = document.querySelector(".canva-container");
let contenedorJuego = document.querySelector(".contenedor-juego");