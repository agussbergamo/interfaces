"use strict";

class Tablero {

    //Constructor de la clase 
    constructor(canvas,ctx,cuadrilla,verificar){
          this.canvas = canvas;
          this.ctx = ctx;
          this.cuadrilla = cuadrilla;
          this.numAVerificar = verificar;    
    }

    //Crea un tablero según el juego seleccionado (4, 5, 6 o 7 en línea)
    inicializar(filas){
        let xInit;
        let yInit;
        switch(filas){
            case 5:
                xInit = 280;
                yInit = 200;
            break;
            case 6:
                xInit = 250;
                yInit = 200;
            break;
            case 7:  
                xInit = 230;
                yInit = 200;
            break;
            case 8:
                xInit = 205;
                yInit = 200;
            break;
        }
        for (let i = filas; i >= -1; i--) {
            this.cuadrilla[i] = [];
             for (let j = filas+1; j >= 0; j--) {
                let x = xInit + j*50;
                let y = yInit + i*50;
                let img = new Image();
                img.src =  "./img/4-in-a-row.png";
                cuadrilla[i][j] = new tableroSpot(x,y,img,this.ctx);   
             }     
      } 
    }

    //Dibuja el tablero
    //La primera fila queda no visible, es donde se van a soltar las fichas
    dibujar(n,filas){
        for (let i = filas; i >= -1; i--) {
             for (let j = filas+1; j >= 0; j--) {

                if(i<0){
                    cuadrilla[i][j].draw();
                }else{
                    cuadrilla[i][j].drawImage(n);
                }       
             }  
      } 
    }

    //Determina si la posición donde fue soltada la ficha es válida para colocarla en el tablero
    verificarColocable(ficha){
        if(!ficha.colocada && ficha.selected){
            ficha.selected =false;
            let fila = this.cuadrilla[-1];
            for (let i = 0; i < fila.length; i++) {
                let box = fila[i];
                if(box.getX() < ficha.x+22 && box.getX() + box.width > ficha.x+22 && box.getY() < ficha.y+22 && box.getY() + box.height > ficha.y+22 ){
                    ficha.colocada = true;
                    this.completarColumna(i,ficha);
                    break;
                }  
            }
            ficha.x = ficha.xInicial;
            ficha.y = ficha.yInicial;           
        }
    }

    //Determina la posición donde debe quedar colocada la ficha
    completarColumna(col,ficha){
        for (let i = cuadrilla.length-1; i >=0 ; i--) {
            const fila = cuadrilla[i];
            if(!fila[col].ocupado){
                ficha.x = fila[col].x +3/*+ fila[col].width/2;*/
                ficha.y = fila[col].y +3 /*+ fila[col].width/2;*/
                ficha.xInicial = ficha.x;
                ficha.yInicial = ficha.y;
                fila[col].ocupado = true;
                fila[col].jugador = ficha.jugador;
                console.log(fila[col].jugador)
                this.verificarGanador(i,col);
                cambiarDeTurno();
                break;
            }else{
                ficha.colocada=false;
            }
        }
    }

    //Verifica si la ficha colocada completa el "x en línea"
    //Se verifica de manera horizontal, vertical y diagonal 
    verificarGanador(i,n){
        if(this.verifH(i,n) || this.verifV(i,n) || this.verifD(i,n)){
            console.log("gano" + jugadorDeTurno.nombre)
        }
    }

    //Verifica de manera horizontal si se acumularon x en línea
    //Se recorre hacia izquierda y derecha a partir de la posición de la ficha, y se suman 
    verifH(i,n){
        let fichasEnLinea = 1;
        let fila = cuadrilla[i];
        for (let index = n+1; index < fila.length; index++) {
            if(fila[index].jugador ==jugadorDeTurno.nombre){
                fichasEnLinea++;
            }else{
                break;
            }  
        }

        for (let index = n-1; index >=0 ; index--) {
            if(fila[index].jugador ==jugadorDeTurno.nombre){
                fichasEnLinea++;
            }else{
                break;
            }
            
        }
        if(fichasEnLinea>=this.numAVerificar){
            return true;
        }else{
            return false;
        }

    }

    //Verifica de manera vertical si se acumularon x en línea
    //Se recorre hacia arriba y abajo a partir de la posición de la ficha, y se suman 
    verifV(i,n){
        let fichasEnLinea = 1;
        for (let index = i+1; index < cuadrilla.length; index++) {
            if(cuadrilla[index][n].jugador ==jugadorDeTurno.nombre){
                fichasEnLinea++;
            }else{
                break;
            }   
        }
        for (let index = i-1; index >=0 ; index--) {
            if(cuadrilla[index][n].jugador ==jugadorDeTurno.nombre){
                fichasEnLinea++;
            }else{
                break;
            }
            
        }
        if(fichasEnLinea>=this.numAVerificar){
            return true;
        }else{
            return false;
        }
    }

    //Verifica de manera diagonal si se acumularon x en línea
    //Se recorren las dos diagonales y se suman
    verifD(i,n){
        let fichasEnLinea = 1;
        fichasEnLinea+= this.verifDiagUno(i,n);
        console.log("diag 1 : " + fichasEnLinea)
        if(fichasEnLinea>=this.numAVerificar){
           return true;
        }else{
            fichasEnLinea = 1;
            fichasEnLinea+= this.verifDiagDos(i,n);
            console.log(" diag 2 :" +fichasEnLinea)
            if(fichasEnLinea>=this.numAVerificar){
                return true;
            }
        }
    }

    //Recorre la diagonal 1
    //Suma las fichas iguales hacia abajo-derecha y hacia arriba-izquierda a partir de la posición de la ficha
    verifDiagUno(i,n){
        let fichas = this.verifDAbajoDer(i+1,n+1);
        fichas+= this.verifDArribaIzq(i-1,n-1);
        return fichas;
    }

    verifDAbajoDer(i,n){
        if(i >=this.cuadrilla.length || n >= this.cuadrilla[0].length){
            return 0;
        }else if(cuadrilla[i][n].jugador != jugadorDeTurno.nombre){
            return 0;
        }else{
            return 1 + this.verifDAbajoDer(i+1,n+1)
        }   
    }

    verifDArribaIzq(i,n){
        if(i < 0 || n < 0){
            return 0;
        }else if(cuadrilla[i][n].jugador != jugadorDeTurno.nombre){
            return 0;
        }else{
            return 1 + this.verifDArribaIzq(i-1,n-1)
        }
    }

    //Recorre la diagonal 1
    //Suma las fichas iguales hacia arriba-derecha y hacia abajo-izquierda a partir de la posición de la ficha
    verifDiagDos(i,n){
        let fichas = this.verifDArribaoDer(i-1,n+1);
        fichas+= this.verifDAbajoIzq(i+1,n-1);
        return fichas; 
    }

    verifDArribaoDer(i,n){
        if(i < 0 || n >= this.cuadrilla[0].length){
            return 0;
        }else if(cuadrilla[i][n].jugador != jugadorDeTurno.nombre){
            return 0;
        }else{
            return 1 + this.verifDArribaoDer(i-1,n+1)
        }
    }

    verifDAbajoIzq(i,n){
        if(i >=this.cuadrilla.length || n < 0){
            return 0;
        }else if(cuadrilla[i][n].jugador != jugadorDeTurno.nombre){
            return 0;
        }else{
            return 1 + this.verifDAbajoIzq(i+1,n-1)
        } 
    }
}