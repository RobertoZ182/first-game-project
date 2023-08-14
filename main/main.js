
class Player{
    constructor(){
        this.width = 20;
        this.height = 10;
        this.positionX = 40 - (this.width / 2);
        this.positionY = 10;
        this.domElement = null;
        this.createDomElement();
    }
    createDomElement(){
        
        this.domElement = document.createElement("img");
        
        this.domElement.setAttribute("src", "./images/7014.png_300-removebg-preview.png");
        this.domElement.setAttribute("alt", "player-image");
        this.domElement.setAttribute("id", "player-car");
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.bottom = this.positionY + "vh";
        this.domElement.style.left = this.positionX + "vw";
        
        const board = document.getElementById("board");
        board.appendChild(this.domElement);
    }
    moveLeft(){
        this.positionX--; 
        this.domElement.style.left = this.positionX + "vw";

    }
    moveRight(){
        this.positionX++;
        this.domElement.style.left = this.positionX + "vw";
    }
    moveUp(){
        if(this.positionY !== 26){
            this.positionY++;
            this.domElement.style.bottom = this.positionY + "vh";
         }
    }

    moveDown(){
        if(this.positionY !== 0){
            this.positionY--;
            this.domElement.style.bottom = this.positionY + "vh";
        }
    }            
}


class Obstacles{
    constructor(){
        this.height = 20;
        this.width = 15;
        this.positionX = 75;
        this.positionY = Math.floor(Math.random() * 24);
        this.domElement = null;
        this.createDomElement();
    }
    createDomElement(){
        this.domElement = document.createElement("img");
        this.domElement.setAttribute("src", "images/lovepik-car-3d-model-png-image_401910823_wh300-removebg-preview.png");
        this.domElement.className = "obstacle";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.bottom = this.positionY + "vh";
        this.domElement.style.left = this.positionX + "vw";
        const board = document.getElementById("board");
        board.appendChild(this.domElement);
        this.moveToLeft();
    }
    moveToLeft(){
        this.positionX -= 2;
        this.domElement.style.left = this.positionX + "vw";
    }
}

class Coins{
    constructor(){
        this.height = 4;
        this.width = 4;
        this.positionX = 80;
        this.positionY = Math.floor(Math.random() * 26);
        this.domElement = null;
        this.createDomElement();
    }
    createDomElement(){
        this.domElement = document.createElement("img");
        this.domElement.setAttribute("src", "images/360_F_194672016_pf5HYgLlm6XlSwuL7JE4Pqvdq0RFqK7V-removebg-preview.png");
        this.domElement.className = "coins";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.bottom = this.positionY + "vh";
        this.domElement.style.left = this.positionX + "vw";
        const board = document.getElementById("board");
        board.appendChild(this.domElement);
    }
}

class Game{
    constructor(){
        this.player = new Player();
        this.obstacles = [];
        this.coins = [];
        this.backgroundX = 0;
        this.background = document.getElementById("board");
        this.main = null;
    }
    start(){
        this.attachEventListeners();
        

         setInterval(() =>{
            const obstacle = new Obstacles();
            this.obstacles.push(obstacle);
        }, 3000);

         setInterval(() => {
          this.obstacles.forEach((elem) => {
            elem.moveToLeft();
            this.removeObstacleIfOutside(elem);
            this.detectCollision(elem);
          });

          this.backgroundX -= 1;
          this.background.style.backgroundPosition = this.backgroundX + "vw 0";
        }, 100);
       
    }
    attachEventListeners() {
        document.addEventListener("keydown", (event) => {
            if (event.code === "ArrowLeft") {
                this.player.moveLeft();
            } else if (event.code === "ArrowRight") {
                this.player.moveRight();
            } else if(event.code === "ArrowUp"){
                this.player.moveUp();
            } else if(event.code === "ArrowDown"){
                this.player.moveDown();
            }
        });
    }
    removeObstacleIfOutside(obstacleInstance){
        if (obstacleInstance.positionX <= 0) {
            obstacleInstance.domElement.style.zIndex = "-5";
            obstacleInstance.domElement.remove(); 
            this.obstacles.shift(); 
        }
    }

    detectCollision(obstacleInstance){
        if (
            this.player.positionX < obstacleInstance.positionX + obstacleInstance.width &&
            this.player.positionX + this.player.width > obstacleInstance.positionX &&
            this.player.positionY < obstacleInstance.positionY + obstacleInstance.height &&
            this.player.positionY + this.player.height > obstacleInstance.positionY
        ) {
            // Collision detected!

            //location.href = "./gameover.html";
        }
    }
}


const myGame = new Game();
myGame.start();