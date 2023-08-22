

// set all variables and stuff
var blocksize = 25;
var board;
var context;

// snake parts
var SnakeX = blocksize * 5;
var SnakeY = blocksize * 5;

var Xvel = 0;
var Yvel = 0;

// snek food !
var FoodX = blocksize * 10;
var FoodY = blocksize * 10;

window.onload = function() {
  let askednumberR = prompt("Number of rows?", "20");
   if (askednumberR != null) {
    var rows = parseInt(askednumberR);
    console.log(`Rows: ${rows}.`)
  } else {
    varsQ()
  }
  let askednumberC = prompt("Number of columns?", "20");
   if (askednumberC != null) {
    var cols = parseInt(askednumberC);
    console.log(`Columns: ${cols}.`)
  } else {
    varsQ()
  }
  board = document.getElementById("board");
  board.height = blocksize * rows;
  board.width = blocksize * cols;
  context = board.getContext("2d");

  foodPosition(rows, cols);
  document.addEventListener("keyup", changeDirection);
  setInterval(update(rows, cols), 150);
}

function update(rows, cols) {
    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle="red";
    context.fillRect(FoodX, FoodY, blocksize, blocksize)

    if (SnakeX == FoodX && SnakeY == FoodY) {
      foodPosition(rows, cols);
    }

    context.fillStyle="lime";
    SnakeX += Xvel * blocksize;
    SnakeY += Yvel * blocksize;
    context.fillRect(SnakeX, SnakeY, blocksize, blocksize);
}

function changeDirection(e) {
  if (e.code == "ArrowUp") {
    Xvel = 0;
    Yvel = -1;
  } else if (e.code == "ArrowDown") {
    Xvel = 0;
    Yvel = 1;
  } else if (e.code == "ArrowLeft") {
    Xvel = -1;
    Yvel = 0;
  } else if (e.code == "ArrowRight") {
    Xvel = 1;
    Yvel = 0;
  } else if (e.code == "W") {
    Xvel = 0;
    Yvel = -1;
  } else if (e.code == "S") {
    Xvel = 0;
    Yvel = 1;
  } else if (e.code == "A") {
    Xvel = -1;
    Yvel = 0;
  } else if (e.code == "D") {
    Xvel = 1;
    Yvel = 0;
  }
}

function foodPosition(rows, cols) {
  FoodX = Math.floor(Math.random() * cols) * blocksize;
  FoodY = Math.floor(Math.random() * rows) * blocksize;
}