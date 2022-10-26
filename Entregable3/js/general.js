"use strict";

//Dibuja la imagen de fondo del canvas
//Setea imagen, posición, ancho y alto
let imageFondo = new Image();
   imageFondo.src = "./img/fondo4.jpg";
   imageFondo.onload = function(){
      ctx.drawImage(imageFondo,0,0,canvas.width,canvas.height)
   }

//Declara variables 
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

//Realiza la cuenta regresiva de lo que dura el juego
function DisminuirTiempo(){
   if(tiempo>0){
      tiempo--;
      actualizar();
      
   }
}

//Convierte la cuenta regresiva a formato "minutos : segundos"
function mostrarTiempoTransformado(){
   let minutes = Math.floor(tiempo/60);
   let segundos = tiempo % 60;
   minutes = minutes < 10 ? "0" + minutes : minutes;
   segundos = segundos < 10 ? "0" + segundos : segundos;
   ctx.font = "30px Arial";
   ctx.fillStyle = "white";
   ctx.fillText(`${minutes} : ${segundos}`, 410, 50); 
}

//Actualiza el renderizado del canvas
//Borra y dibuja todo de nuevo
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

//Oculta la imagen y la configuración de fichas al clickear el botón "todo listo!"
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