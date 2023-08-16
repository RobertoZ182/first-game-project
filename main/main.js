class Player{
    constructor(){
        this.width = 20;
        this.height = 10;
        this.positionX = 40 - (this.width / 2);
        this.positionY = 10;
        this.domElement = null;
        this.createDomElement();
        this.coins = 0;
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
        this.domElement.style.objectFit = "cover"
        if(this.positionY >= 13){
          this.domElement.style.zIndex = "0";
        }
        const board = document.getElementById("board");
        board.appendChild(this.domElement);
    }
    moveLeft(){
        if(this.positionX !== 0){
            this.positionX -= 1; 
            this.domElement.style.left = this.positionX + "vw";  
        }
    }
    moveRight(){
        if(this.positionX !== 70){
            this.positionX += 1;
            this.domElement.style.left = this.positionX + "vw";   
        }

    }
    moveUp(){
        if(this.positionY !== 26){
            this.positionY += 1;
            this.domElement.style.bottom = this.positionY + "vh";
         }
    }

    moveDown(){
        if(this.positionY !== 0){
            this.positionY -= 1;
            this.domElement.style.bottom = this.positionY + "vh";
        }
    }            
}

class Obstacles{
    constructor(){
        this.height = 10;
        this.width = 20;
        this.positionX = 70;
        this.positionY = Math.floor(Math.random() * 24);
        this.domElement = null;
        this.createDomElement();
    }
    createDomElement(){
        const cars = ["images/imgbin-lamborghini-gallardo-car-2012-lamborghini-aventador-lamborghini-engine-6GzEa3QyjneP9J6rULuv0NH7V-removebg-preview.png","images/lovepik-car-3d-model-png-image_401910823_wh300-removebg-preview.png"];
        this.domElement = document.createElement("img");
        this.domElement.setAttribute("src", cars[Math.floor(Math.random() * 2)]);
        this.domElement.className = "obstacle";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.bottom = this.positionY + "vh";
        this.domElement.style.left = this.positionX + "vw";
        this.domElement.style.objectFit = "cover"
        if(this.positionY >= 13){
          this.domElement.style.zIndex = "1";
        }

        const board = document.getElementById("board");
        board.appendChild(this.domElement);
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
        this.domElement.style.objectFit = "cover"

        const board = document.getElementById("board");
        board.appendChild(this.domElement);
    }
    moveToLeft(){
        this.positionX -= 2;
        this.domElement.style.left = this.positionX + "vw";
    }
}

class Game {
  constructor() {
    this.player = new Player();
    this.obstacles = [];
    this.coins = [];
    this.backgroundX = 0;
    this.background = document.getElementById("board");
    this.main = null;
    this.secondary = null;
    this.score = null;
  }
  start() {
    this.attachEventListeners();

    
    this.showScore();

    this.secondary = setInterval(() => {
      const obstacle = new Obstacles();
      this.obstacles.push(obstacle);
      const coin = new Coins();
      this.coins.push(coin);
      this.updateCar();
    }, 4000);

    this.main = setInterval(() => {
      // move obstacles
      this.obstacles.forEach((elem) => {
        elem.moveToLeft();
        this.removeElementIfOutside(elem, this.obstacles);
        this.detectCollision(elem, "obstacle");
      });

      // move coins
      this.coins.forEach((coi) => {
        coi.moveToLeft();
        this.removeElementIfOutside(coi, this.coins);
        this.detectCollision(coi, "coin");
      });

      //move background
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
      } else if (event.code === "ArrowUp") {
        this.player.moveUp();
      } else if (event.code === "ArrowDown") {
        this.player.moveDown();
      }
    });
  }
  removeElementIfOutside(elementInstance, arrayOfElements) {
    if (elementInstance.positionX <= 0) {
      elementInstance.domElement.style.zIndex = "-5";
      elementInstance.domElement.remove();
      arrayOfElements.shift();
    }
  }

  detectCollision(obstacleInstance, element) {
    if (
      this.player.positionX <
        obstacleInstance.positionX + obstacleInstance.width &&
      this.player.positionX + this.player.width > obstacleInstance.positionX &&
      this.player.positionY <
        obstacleInstance.positionY + 6 && //+ obstacleInstance.height
      this.player.positionY + 6 > obstacleInstance.positionY //+ this.player.height
    ) {

      if(element === "coin"){
          this.player.coins++;
          console.log(this.player.coins);
          obstacleInstance.domElement.remove();
      } else if(element === "obstacle"){
          console.log(null);
          clearInterval(this.main);
          clearInterval(this.secondary);
          const gameOver = document.createElement("div");
          gameOver.style.width = "50vw";
          gameOver.style.height = "40vh";
          gameOver.style.borderRadius = "30px";
          gameOver.style.border = "3px solid red";
          gameOver.style.backgroundColor = "white";
          gameOver.style.margin = "0 auto";
          gameOver.style.display = "flex";
          gameOver.style.justifyContent = "space-around";
          gameOver.style.flexDirection = "column";
          gameOver.style.alignItems = "center";
          this.background.appendChild(gameOver);
          const gameOverText = document.createElement("h1");
          gameOverText.style.fontSize = "50px";
          gameOverText.style.color = "red";
          gameOverText.style.margin = "0 auto 20px";
          gameOverText.innerText = "GameOver!!";
          gameOver.appendChild(gameOverText);
          const button = document.createElement("button");
          button.style.width = "8vw";
          button.style.height = "3vh";
          button.style.backgroundColor = "red";
          button.style.border = "none";
          button.style.margin = "0 auto";
          button.style.color = "white";
          button.style.borderRadius = "10px";
          button.innerText = "Try again";
          button.addEventListener("click", () =>{
            location.href = "index.html";
          })
          gameOver.appendChild(button);
          
     }
    }
  }
  stop(){

  }
  updateCar() {

    if (this.player.coins++) {
      const arr = ["./images/2343.png_300-removebg-preview.png","./images/b28111e7702dbaa633a1bb3a11a5b549.png_wh300-removebg-preview.png","./images/lovepik-sports-car-3d-model-png-image_401910830_wh300-removebg-preview.png","./images/lovepik-cool-sports-car-png-image_401180390_wh300-removebg-preview.png"];
      this.player.domElement.setAttribute("src", arr[Math.floor(Math.random() * arr.length)]);
    }
  }
  showScore(){
    this.score = document.createElement("div");
    this.score.style.width = "50vw";
    this.score.style.height = "5vh";
    this.score.style.border = "3px solid white";
    this.score.style.backgroundColor = "black";
    this.score.style.margin = "5vh auto";
    this.score.style.borderRadius = "20px";
    this.score.style.display = "flex";
    this.score.style.flexDirection = "row";
    this.score.style.justifyContent = "center";
    this.score.style.alignItems = "center";
    document.body.appendChild(this.score);
      if(this.player.coins >= 10){
        const star = document.createElement("img");
        star.setAttribute("src", "../images/pngtree-vector-complex-star-icon-png-image_4183954-removebg-preview.png");
        star.style.width = "5vw";
        star.style.height = "5vh";
        this.score.appendChild(star);
      }
  }
}


const myGame = new Game();
myGame.start();
