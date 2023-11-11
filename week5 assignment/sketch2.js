let gridHeight = 400;
let gridWidth = 400;
let tileHeight = 40;
let tileWidth = 40;


function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  drawGrid();
  noLoop();
}

function drawGrid() {
  for (let y = 0; y < gridHeight; y += tileHeight*2) {
      for (let x = 0; x < gridWidth; x += tileWidth*2) {
          drawTile1(x, y, tileWidth, tileHeight);
          drawTile2(x+tileWidth, y+tileHeight, tileWidth, tileHeight);
          drawTile3(x+tileWidth, y, tileWidth, tileHeight);
          drawTile4(x, y+tileHeight, tileWidth, tileHeight);
      }
  }
}

function drawLine1(x, y, tileWidth, tileHeight) {
    line(x, y, x + tileWidth, y + tileHeight);
  }
function drawLine2(x, y, tileWidth, tileHeight) {
    line(x, y + tileHeight, x + tileWidth, y);
  }

function drawTile1(x, y, tileWidth, tileHeight) {
    let array = [drawLine1, drawLine2];
    fill(255);
    array[int(random(2))](x, y, tileWidth, tileHeight);
}

function drawTile2(x, y, tileWidth, tileHeight) {
    let array = [drawLine1, drawLine2];
    fill(255);
    array[int(random(2))](x, y, tileWidth, tileHeight);
}

function drawTile3(x, y, tileWidth, tileHeight) {
    let array = [drawLine1, drawLine2];
    fill(255);
    array[int(random(2))](x, y, tileWidth, tileHeight);
}

function drawTile4(x, y, tileWidth, tileHeight) {
    let array = [drawLine1, drawLine2];
    fill(255);
    array[int(random(2))](x, y, tileWidth, tileHeight);
}