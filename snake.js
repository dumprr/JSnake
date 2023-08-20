function varsQ() {
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

    update();
}


// set all variables and stuff
var blocksize = 25;
var board;
var context;


function update() {
    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);
}