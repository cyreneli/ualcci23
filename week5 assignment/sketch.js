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
}

function drawGrid() {
  for (let y = 0; y < gridHeight; y += tileHeight*2) {
      for (let x = 0; x < gridWidth; x += tileWidth*2) {
          drawTile1(x, y, tileWidth, tileHeight);
          drawTile2(x, y, tileWidth, tileHeight);
          drawTile3(x, y, tileWidth, tileHeight);
          drawTile4(x, y, tileWidth, tileHeight);
      }
  }
}

function drawTile1(x, y, tileWidth, tileHeight) {
  fill(255);
  ellipse(x+tileWidth/2, y+tileWidth/2, tileWidth, tileHeight);
}

function drawTile2(x, y, tileWidth, tileHeight) {
  fill(0);
  ellipse(x+tileWidth/2, y+tileWidth*1.5, tileWidth, tileHeight);
}

function drawTile3(x, y, tileWidth, tileHeight) {
  fill(0);
  ellipse(x+tileWidth*1.5, y+tileWidth/2, tileWidth, tileHeight);
}

function drawTile4(x, y, tileWidth, tileHeight) {
  fill(255);
  ellipse(x+tileWidth*1.5, y+tileWidth*1.5, tileWidth, tileHeight);
}