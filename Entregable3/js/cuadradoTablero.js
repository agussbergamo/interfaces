class tableroSpot{
    
    
    constructor(x,y,img,ctx){
        this.ocupado = false;
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.img = img;
        this.ctx = ctx;
        this.jugador;
    }
    

    getX(){
        return this.x;
    }
    getY(){
        return this.y;
    }
    
    draw(){
        this.ctx.beginPath();
        this.ctx.arc(this.x+this.width/2,this.y+this.width/2,this.width/2,0.34,2.79)
        this.ctx.stroke();

        /* opcion */
        
        /*ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(this.x+this.width/2,this.y+this.width/2,32,0.34,2.79);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(imageFondo,0,0,canvas.width,canvas.height);
        ctx.restore();*/
    }

    drawImage(n){
        let ctx = this.ctx;
        let img = this.img;
        let x = this.x;
        let y = this.y;
        if(n==0){
            this.img.onload = function (){
                ctx.drawImage(img,x,y,50,50);
            }
        }else{
            ctx.drawImage(img,x,y,50,50); 
        }
        
    }

   
}




