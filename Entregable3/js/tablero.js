"use strict";

class Tablero {

    constructor(canvas,ctx,cuadrilla,verificar){
          this.canvas = canvas;
          this.ctx = ctx;
          this.cuadrilla = cuadrilla;
          this.numAVerificar = verificar;    
    }

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

    verificarGanador(i,n){
        if(this.verifH(i,n) || this.verifV(i,n) || this.verifD(i,n)){
            console.log("gano" + jugadorDeTurno.nombre)
        }
    }

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