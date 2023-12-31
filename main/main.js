class Player{
    constructor(){
        this.width = 20;
        this.height = 10;
        this.positionX = 40 - (this.width / 2);
        this.positionY = 10;
        this.domElement = null;
        this.createDomElement();
        this.coins = 0;
        this.meters = 0;
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
            this.positionX -= 2; 
            this.domElement.style.left = this.positionX + "vw";  
        }
    }
    moveRight(){
        if(this.positionX !== 70){
            this.positionX += 2;
            this.domElement.style.left = this.positionX + "vw";   
        }

    }
    moveUp(){
        if(this.positionY !== 26){
            this.positionY += 2;
            this.domElement.style.bottom = this.positionY + "vh";
         }
    }

    moveDown(){
        if(this.positionY !== 0){
            this.positionY -= 2;
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
        this.domElement.setAttribute("src", cars[Math.floor(Math.random() * cars.length)]);
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

class TrafficObstacle{
  constructor(){
  this.height = 10;
  this.width = 10;
  this.positionX = 80;
  this.positionY = Math.floor(Math.random() * 26);
  this.domElement = null;
  this.createDomElement();
  }
  createDomElement(){
    this.domElement = document.createElement("img");
    this.domElement.setAttribute("src", "images/pngtree-cartoon-anti-collision-column-png-download-image_1257142-removebg-preview.png");
    this.domElement.className = "trafficObs";
    this.domElement.style.height = this.height + "vh";
    this.domElement.style.width = this.width + "vw";
    this.domElement.style.bottom = this.positionY + "vh";
    this.domElement.style.left = this.positionX + "vw";
    this.domElement.style.objectFit = "contain"

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
    this.trafficOb = []
    this.backgroundX = 0;
    this.background = document.getElementById("board");
    this.bar = null;
    this.main = null;
    this.secondary = null;
    this.third = null;
    this.fourth = null;
    this.score = null;
    this.metersScore = null;
    this.gameIsOver = false;
  }
  start() {
    this.attachEventListeners();

    this.gameIsOver = false;

    this.bar = document.getElementById("bar");

    this.metersScore = document.createElement("div");
    this.metersScore.className = "viewer";
    this.bar.appendChild(this.metersScore);

    this.score = document.createElement("div");
    this.score.className = "viewer";
    this.bar.appendChild(this.score);

    this.third = setInterval(() => {
      const coin = new Coins();
      this.coins.push(coin);
    }, 2000);

    this.secondary = setInterval(() => {
      const obstacle = new Obstacles();
      this.obstacles.push(obstacle);
    }, 6000);

    this.fourth = setInterval(() => {
      const traffic = new TrafficObstacle();
      this.trafficOb.push(traffic);
    }, 5000)

    this.main = setInterval(() => {
      // move obstacles
      this.obstacles.forEach((elem) => {
        elem.moveToLeft();
        this.removeElementIfOutside(elem, this.obstacles);
        this.detectCollision(elem, "obstacle");
      });

      //move traffic
      this.trafficOb.forEach((obs) => {
        obs.moveToLeft();
        this.removeElementIfOutside(obs, this.trafficOb);
        this.detectCollision(obs, "traffic");
      })

      // move coins
      this.coins.forEach((coi) => {
        coi.moveToLeft();
        this.removeElementIfOutside(coi, this.coins);
        this.detectCollision(coi, "coin");
        
      });

      //move background
      this.backgroundX -= 1;
      this.background.style.backgroundPosition = this.backgroundX + "vw 0";

      //other features
      this.showMeters();
      this.showCollCoins();
      
    }, 50);
  }
  attachEventListeners() {  

    let keys = {
      up: false,
      down: false,
      left: false,
      right: false
    }; 

    document.addEventListener("keydown", (event) => {
    if(this.gameIsOver === false){
          if (event.code === "ArrowLeft") {
          this.player.moveLeft();
        } else if (event.code === "ArrowRight") {
          this.player.moveRight();
        } else if (event.code === "ArrowUp") {
          this.player.moveUp();
        } else if (event.code === "ArrowDown") {
          this.player.moveDown();
        }
      }
    
    });

    if(keys.up && keys.right){
      this.player.moveUp();
      this.player.moveRight();
    } else if(keys.up && keys.left){
      this.player.moveUp();
      this.player.moveLeft();
    } else if(keys.down && keys.left){
      this.player.moveDown();
      this.player.moveLeft();
    } else if(keys.down && keys.right){
      this.player.moveDown();
      this.player.moveRight();
    }
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
          obstacleInstance.domElement.remove();
          this.coins.shift();
          this.updateCar();
          let mySoundCoin = new Audio('./sound/mixkit-bonus-earned-in-video-game-2058.wav');
          mySoundCoin.play();
      } else if(element === "obstacle"){
          clearInterval(this.main);
          clearInterval(this.secondary);
          clearInterval(this.third);
          clearInterval(this.fourth);
          this.gameIsOver = true;

          let mySound = new Audio('./sound/car-accident-with-squeal-and-crash-6054.mp3')
          mySound.play()
          const gameOver = document.createElement("div");
          gameOver.id = "game-over-frame";
          this.background.appendChild(gameOver);

          const gameOverText = document.createElement("h1");
          gameOverText.id = "game-over-heading";
          gameOverText.innerText = "GameOver!!";
          gameOver.appendChild(gameOverText);
          
          const button = document.createElement("button");
          button.id = "game-over-button";
          button.innerText = "Try again";
          button.addEventListener("click", () =>{
            location.href = "game.html";
          });
          gameOver.appendChild(button);

          this.metersScore = document.createElement("div");
          this.metersScore.className = "viewer";
          const scoreMeters = document.createElement("h1");
          const heading1 = document.createElement("h1");          
          this.metersScore.appendChild(heading1);
          this.metersScore.appendChild(scoreMeters);
          heading1.style.fontSize = "50px";
          heading1.style.color = "red";
          heading1.style.fontFamily = "Poppins";
          heading1.innerText = "Distance";
          scoreMeters.innerText =  this.player.meters;
          gameOver.appendChild(this.metersScore);
      
          this.score = document.createElement("div");
          this.score.className = "viewer";
          const scoreCoins = document.createElement("h1");
          const heading2 = document.createElement("h1");
          this.score.appendChild(heading2);
          this.score.appendChild(scoreCoins);
          heading2.style.fontSize = "50px";
          heading2.style.color = "red";
          heading2.style.fontFamily = "Poppins";
          heading2.innerText = "Coins:"
          scoreCoins.innerText =  this.player.coins;
          gameOver.appendChild(this.score);

     } else if(element === "traffic"){
        this.player.coins -= 3;
        obstacleInstance.domElement.remove();
        this.trafficOb.shift();
        const mySoundTraffic = new Audio("./sound/mixkit-8-bit-lose-2031.wav");
        mySoundTraffic.play();
     }
    }
  }
  updateCar() {
    if (this.player.coins === 10) {
      this.player.domElement.setAttribute("src", "./images/2343.png_300-removebg-preview.png");
      let mySoundCar = new Audio("./sound/mixkit-arcade-retro-jump-223.wav");
      mySoundCar.play();
    } else if(this.player.coins === 20){
      this.player.domElement.setAttribute("src", "./images/b28111e7702dbaa633a1bb3a11a5b549.png_wh300-removebg-preview.png");
      let mySoundCar = new Audio("./sound/mixkit-arcade-retro-jump-223.wav");
      mySoundCar.play();
    } else if(this.player.coins === 30){
      this.player.domElement.setAttribute("src", "./images/lovepik-sports-car-3d-model-png-image_401910830_wh300-removebg-preview.png");
      let mySoundCar = new Audio("./sound/mixkit-arcade-retro-jump-223.wav");
      mySoundCar.play();
    } else if(this.player.coins === 40){
      this.player.domElement.setAttribute("src", "./images/lovepik-cool-sports-car-png-image_401180390_wh300-removebg-preview.png");
      let mySoundCar = new Audio("./sound/mixkit-arcade-retro-jump-223.wav");
      mySoundCar.play();
    } else if(this.player.coins === 50){
      clearInterval(this.main);
      clearInterval(this.secondary);
      clearInterval(this.third);
      clearInterval(this.fourth);
      this.gameIsOver = true;
      const gameOver = document.createElement("div");
      gameOver.id = "finished-frame";
      this.background.appendChild(gameOver);

      const gameOverText = document.createElement("h1");
      gameOverText.id = "finished-heading";
      gameOverText.innerText = "Well Done!";
      gameOver.appendChild(gameOverText);

      const button = document.createElement("button");
      button.id = "finished-button";
      button.innerText = "Go back home";
      button.addEventListener("click", () =>{
        location.href = "index.html";
      })
      gameOver.appendChild(button);

      let mySoundCar = new Audio("./sound/mixkit-casino-bling-achievement-2067.wav");
      mySoundCar.play();
    }
  }
  showCollCoins(){
      this.score.innerText = this.player.coins;
  }
  showMeters(){
    this.player.meters += 1;
    this.metersScore.innerText = this.player.meters + "m";
  }
}


const myGame = new Game();
myGame.start();
