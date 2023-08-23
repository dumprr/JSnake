// audio

var foodsound = new sound("assets/food.mp3");
var gameoversound = new sound("assets/gameover.mp3");

// set all variables and stuff
var blocksize = 20;
var board;
var context;
var gameOver = false;

// snake parts
var SnakeX = blocksize * 5;
var SnakeY = blocksize * 5;

var Xvel = 0;
var Yvel = 0;

var SnakeBod = [];

// snek food !
var FoodX = blocksize * 10;
var FoodY = blocksize * 10;

window.onload = function() {
  let askednumberR = prompt("Number of rows?", "20");
   if (askednumberR != null) {
    var rows = parseInt(askednumberR);
    console.log(`Rows: ${rows}.`)
  } else {
    location.reload()
  }
  let askednumberC = prompt("Number of columns?", "20");
   if (askednumberC != null) {
    var cols = parseInt(askednumberC);
    console.log(`Columns: ${cols}.`)
  } else {
    location.reload()
  }
  let askednumberT = prompt("Milliseconds per update?", "100");
   if (askednumberT != null) {
    var time = parseInt(askednumberT);
    console.log(`Update MS: ${time}.`)
  } else {
    location.reload()
  }
  board = document.getElementById("board");
  board.height = blocksize * rows;
  board.width = blocksize * cols;
  context = board.getContext("2d");

  GlobalRows = rows;
  GlobalCols = cols;
  GlobalTime = time;
  foodPosition(rows, cols);
  document.addEventListener("keyup", changeDirection);
  setInterval(update, time);
}

function update() {
  console.log(`Update in ${GlobalTime}ms`)
  if (gameOver) {
    location.reload()
    return;
  }
    context.fillStyle="#190e2c";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle="red";
    context.fillRect(FoodX, FoodY, blocksize, blocksize)

    if (SnakeX == FoodX && SnakeY == FoodY) {
      foodsound.stop();
      SnakeBod.push([FoodX, FoodY])
      foodPosition(GlobalRows, GlobalCols);
      console.log("Got Food")
      foodsound.play();
    }

    for (let i = SnakeBod.length-1; i > 0; i--) {
      SnakeBod[i] = SnakeBod[i-1];
    }
    if (SnakeBod.length) {
      SnakeBod[0] = [SnakeX, SnakeY];
    }

    context.fillStyle="lime";
    SnakeX += Xvel * blocksize;
    SnakeY += Yvel * blocksize;
    context.fillRect(SnakeX, SnakeY, blocksize, blocksize);
    for (let i = 0; i < SnakeBod.length; i++) {
      context.fillRect(SnakeBod[i][0], SnakeBod[i][1], blocksize, blocksize);
    }

    if (SnakeX < 0 || SnakeX > GlobalCols*blocksize || SnakeY < 0 || SnakeY > GlobalRows*blocksize) {
      gameoversound.play();
      gameOver = true;
      console.log("Game Over")
      alert(`Game Over... Your Score: ${SnakeBod.length}`);
      alert("Click OK to reload...");
    }

    for (let i = 0; i < SnakeBod.length; i++) {
      if (SnakeX == SnakeBod[i][0] && SnakeY == SnakeBod[i][1]) {
        gameoversound.play();
        gameOver = true;
        console.log("Game Over")
        alert(`Game Over... Your Score: ${SnakeBod.length}`);
        alert("Click OK to reload...");
      }
    }
}

function changeDirection(e) {
  console.log(`Keypress | ${e.code}`)
  if (e.code == "ArrowUp" && Yvel != 1) {
    Xvel = 0;
    Yvel = -1;
  } else if (e.code == "ArrowDown" && Yvel != -1) {
    Xvel = 0;
    Yvel = 1;
  } else if (e.code == "ArrowLeft" && Xvel != 1) {
    Xvel = -1;
    Yvel = 0;
  } else if (e.code == "ArrowRight" && Xvel != -1) {
    Xvel = 1;
    Yvel = 0;
  } else if (e.code == "KeyW" && Yvel != 1) {
    Xvel = 0;
    Yvel = -1;
  } else if (e.code == "KeyS" && Yvel != -1) {
    Xvel = 0;
    Yvel = 1;
  } else if (e.code == "KeyA" && Xvel != 1) {
    Xvel = -1;
    Yvel = 0;
  } else if (e.code == "KeyD" && Xvel != -1) {
    Xvel = 1;
    Yvel = 0;
  }
}

function foodPosition(rows, cols) {
  FoodX = Math.floor(Math.random() * cols) * blocksize;
  FoodY = Math.floor(Math.random() * rows) * blocksize;
}

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  this.play = function(){
      this.sound.play();
  }
  this.stop = function(){
      this.sound.pause();
  }    
}