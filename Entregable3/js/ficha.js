"use strict";

class Ficha  {

    constructor(x,y,img,jugador){
        this.x = x
        this.y = y;
        this.selected = false;
        this.img =img;
        this.colocada = false;
        this.xInicial = x;
        this.yInicial = y;
        this.jugador = jugador.nombre;
    }


    draw(ctx,n){
        let x = this.x;
        let y = this.y;
        let img = this.img;

        if(n==0){
            this.img.onload = function(){
                ctx.save();
                ctx.beginPath();
                ctx.arc(x+22, y+22, 22, 0, Math.PI * 2);
                ctx.closePath();
                ctx.clip();
            
                ctx.drawImage(img, x, y, 45, 45);
        
                ctx.restore();
            }
        }else{
            ctx.save();
            ctx.beginPath();
            ctx.arc(x+22, y+22, 22, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();
        
            ctx.drawImage(img, x, y, 45, 45);
    
            ctx.restore();
        }

        /*
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x,this.y,20 , 0 , 2 * Math.PI);
        ctx.stroke();
        ctx.fill();*/


    }

    verificarSelect(e,x,y){
        if(!this.selected && this.jugador == jugadorDeTurno.nombre){
            let xCursor = e.clientX - x;
            let yCursor = e.clientY - y;
            if(xCursor>this.x && xCursor< this.x+40 && yCursor> this.y && yCursor<this.y + 40){
                this.selected = true;
            }

        /*let xAVerificar = e.clientX - x;
        let yAAverificar = e.clientY - y;
        let Xdiff = this.x - xAVerificar ;
        let Ydiff = this.y - yAAverificar;
        let dist = Math.sqrt(Math.pow(Xdiff,2)+Math.pow(Ydiff,2));
        if(dist <=20){
           this.selected = true;
        }else{
            this.selected = false;
        }*/
        }
        
    }

    actualizarPos(x,y){
        if(this.selected && !this.colocada){
            this.x= x-22;
            this.y =y-22;
        }
    }
}