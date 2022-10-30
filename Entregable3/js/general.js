"use strict";

//Dibuja la imagen de fondo del canvas
//Setea imagen, posición, ancho y alto
let imageFondo = new Image();
   imageFondo.src = "./img/fondo4.jpg";
   imageFondo.onload = function(){
      ctx.drawImage(imageFondo,0,0,canvas.width,canvas.height)
   }

//Declara variables 
let tiempo = 60;
let intervalo;
let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext('2d');
let tablero;
let cuadrilla;
let fichas; 
let fichas2; 
let filas;
let totalfichas;
let jugador1 = new Jugador("Jugador 1");
let jugador2 = new Jugador("Jugador 2");
let jugadores;
let jugadorDeTurno;
let ganador;
let botones = document.querySelectorAll(".btn-modalidad");

//Llama a la función inicializarEventos, que declara los eventos del mouse
inicializarEventos();

//Carga el contenido del canvas según la opción de juego elegida (tablero, fichas, jugadores para 4, 5, 6 o 7 en línea)
//Setea un intervalo de juego de 300 segundos
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
   tablero = new Tablero (canvas,ctx,cuadrilla,filas-1); 
   tablero.inicializar(filas);
   tablero.dibujar(0,filas);
   totalfichas = (filas+1) * (filas+2);
   crearFichas(totalfichas);
   dibujarFichas(0);
   tiempo = 60;
   ganador="";
   if(intervalo){
      clearInterval(intervalo);
   }
   intervalo = setInterval(disminuirTiempo,1000);
})
})

//Realiza la cuenta regresiva de lo que dura el juego
function disminuirTiempo(){
   if(tiempo>0){
      tiempo--;
      actualizar();
   }
}

//Convierte la cuenta regresiva a formato "minutos : segundos"
function mostrarTiempoTransformado(){
   if(tiempo>0){
      let minutes = Math.floor(tiempo/60);
      let segundos = tiempo % 60;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      segundos = segundos < 10 ? "0" + segundos : segundos;
      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.fillText(`${minutes} : ${segundos}`, 405, 100); 
   }else{
      mostrarMensajeFinPartida();
   }  
}

//Muestra el jugador que tiene que jugar
function mostrarJugadorDeTurno() {
   if(!ganador && tiempo>0){
      ctx.font = "30px Mohave";
      ctx.fillStyle = "white";
      ctx.fillText(`Turno del ${jugadorDeTurno.nombre}`,345,50);
   }
}

//Muestra un mensaje con el resultado del juego
function mostrarMensajeFinPartida() {
      ctx.font = "30px Mohave";
      ctx.fillStyle = "white";
   if(ganador){
      ctx.fillText(`¡Dracarys! ¡El ${ganador}`,320,80);
      ctx.fillText(`ha reducido a cenizas a su oponente!`,240,130);
   }else{
      ctx.fillText("¡Empate!",400,80);
      ctx.fillText("¡El trono de hierro sigue sin heredero!",240,130);  
   }
   jugadorDeTurno="";
}

//Actualiza el renderizado del canvas
//Borra y dibuja todo de nuevo
function actualizar(){
   ctx.clearRect(0,0,canvas.width,canvas.height);
   ctx.drawImage(imageFondo,0,0,canvas.width,canvas.height)
   mostrarNombreJugadores();
   tablero.dibujar(1,filas);
   dibujarFichas(1);
   mostrarTiempoTransformado();
   mostrarJugadorDeTurno();
}

//Muestra el nombr del jugador arriba del set de fichas que le corresponden
function mostrarNombreJugadores(){
   ctx.font = "30px Mohave";
   ctx.fillStyle = "white";
   ctx.fillText(`Jugador 1`,30,50);
   ctx.fillText(`Jugador 2`,765,50);
}

//Carga los jugadores en el arreglo de jugadores
//Setea aleatoriamente quien inicia la partida
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

//Alterna el jugador turno
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

//Crea las fichas
//Setea el fondo de la ficha según la imagen seleccionada, y las ubica en la posición del canvas 
//según jugador y tamaño del tablero a renderizar  
function crearFichas(totalfichas) {

   for (let i = 0; i < totalfichas/2; i++) {
      let x;
      let y;
      let img = new Image();
      img.src = `./${imageSelected}`;
      if(i<12){
          x = 15;
          y = i*50 + 80;
         
      }else if(i<24){
          x = 60;
          y = (i - 12) * 50 + 80;
         
      }else if(i<36){
         x = 105;
         y = (i-24) * 50 + 80;
      }else{
         x = 149;
         y = (i-36) * 50 + 80;
      }
      fichas[i] = new Ficha (x,y,img,jugador1);          
   }

   for (let i = 0; i < totalfichas/2; i++) {
      let x;
      let y;
      let img = new Image();
      img.src = `./${imageSelected2}`;
      if(i<12){
          x = canvas.offsetWidth - 55;
          y = i* 50 + 80;
         
      }else if(i<24){
          x = canvas.offsetWidth - 100;
          y = (i - 12)* 50 + 80;
         
      }else if(i<36){
         x = canvas.offsetWidth - 145;
         y = (i-24)*50 + 80;
      }else{
         x = canvas.offsetWidth - 190;
         y = (i-36) * 50 + 80;
      }
      fichas2[i] = new Ficha (x,y,img,jugador2);
   }
}

//Renderiza las fichas de ambos jugadores
function dibujarFichas(n) {
   fichas.forEach(f=>f.draw(ctx,n));
   fichas2.forEach(f=>f.draw(ctx,n));
}

//Declara los eventos del mouse
function inicializarEventos(params) {
   canvas.onmousedown = mouseDown;
   canvas.onmouseup = mouseUp;
   canvas.onmousemove = mouseMove;
}

//Verifica qué ficha fue seleccionada cuando el botón del mouse es presionado
function mouseDown() {
   fichas.forEach(f=>f.verificarSelect(event,canvas.offsetLeft,canvas.offsetTop));
   fichas2.forEach(f=>f.verificarSelect(event,canvas.offsetLeft,canvas.offsetTop));
}

//Verifica si la ficha puede colocarse a partir del lugar donde el botón del mouse es soltado 
function mouseUp(params) {
   fichas.forEach(f=>tablero.verificarColocable(f));
   fichas2.forEach(f=>tablero.verificarColocable(f)); 
}

//Mueve la ficha siguiendo la trayectoria del mouse
function mouseMove(params) {
   if(fichas){
      let x = event.pageX - canvas.offsetLeft;
   let y = event.pageY - canvas.offsetTop;
   fichas.forEach(f=>f.actualizarPos(x,y));
   fichas2.forEach(f=>f.actualizarPos(x,y));
   actualizar();
   }   
}

//Trae del DOM las posibles fichas con las que se puede jugar 
let ficha1 = document.querySelectorAll(".ficha1ASelec");
let ficha2 = document.querySelectorAll(".ficha2ASelec");
let imageSelected;
let imageSelected2;

//Selecciona la ficha con la que va a jugar el jugador1
ficha1.forEach(f => f.addEventListener("click", ()=>{
   ficha1.forEach(fi=> fi.classList.remove("selected"))
   f.classList.add("selected");
   imageSelected = f.dataset.src;
   verificarSeleccionadas(ficha2,imageSelected);
}))

//Selecciona la ficha con la que va a jugar el jugador2
ficha2.forEach(f => f.addEventListener("click", ()=>{
   ficha2.forEach(fi=> fi.classList.remove("selected"))
   f.classList.add("selected");
   imageSelected2 = f.dataset.src;
   verificarSeleccionadas(ficha1,imageSelected2);
}))

//Oculta la ficha seleccionada por el jugador contrario, para que no pueda ser elegida por los dos
function verificarSeleccionadas(fichas,image) {
   fichas.forEach(function(f){
      if(f.dataset.src == image){
         f.style.visibility = "hidden";
      }else{
         f.style.visibility ="visible";
      }
   })
}

//Oculta la descripción del juego al clickear el botón "jugar"
//Muestra el contenedor de fichas para elegir color
let btnDesc = document.querySelector("#btn-descripcion");
btnDesc.addEventListener("click",() =>{
   contenedorDescripcion.classList.add("ocultar");
   contenedorFichas.classList.remove("ocultar");
})

//Oculta la imagen y la configuración de fichas al clickear el botón "¡Listo!"
//Muestra el canvas con el juego
let btnJugar = document.querySelector("#btn-jugar");
btnJugar.addEventListener("click",() =>{
   if(imageSelected && imageSelected2){
      contenedorJuego.classList.add("ocultar");
      canvasContainer.classList.remove("ocultar");
   }
})

let contenedorFichas = document.querySelector("#contenedor-fichas");
let contenedorDescripcion = document.querySelector("#contenedor-descripcion");
let canvasContainer = document.querySelector(".canva-container");
let contenedorJuego = document.querySelector(".contenedor-juego");