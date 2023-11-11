let gridHeight = 400;
let gridWidth = 400;
let tileHeight = 40; 
let tileWidth = 40;  

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);
  drawGrid();
  noLoop();
}

function drawGrid() {
    for (let y = 0; y < gridHeight; y += tileHeight) {
        for (let x = 0; x < gridWidth; x += tileWidth) {
            drawTile(x, y, tileWidth, tileHeight);
        }
    }
  }

function drawTile(x, y, tileWidth, tileHeight) {
    let array = [ellipse1, ellipse2,ellipse3,ellipse4];
    fill(255);
    array[int(random(4))](x, y, tileWidth, tileHeight);
}

function ellipse1(x, y, tileWidth, tileHeight){
    for(let i = 0; i < 40; i += 6){
        ellipse(x + tileWidth / 2-i/3, y + tileHeight / 2, tileWidth - i, tileHeight - i);
      }
}

function ellipse2(x, y, tileWidth, tileHeight){
    for(let i = 0; i < 40; i += 6){
        ellipse(x + tileWidth/2, y + tileHeight / 2-i/3, tileWidth - i, tileHeight - i);
      }
}

function ellipse3(x, y, tileWidth, tileHeight){
    for(let i = 0; i < 40; i += 6){
        ellipse(x + tileWidth / 2, y + tileHeight / 2+i/3, tileWidth - i, tileHeight - i);
      }
}

function ellipse4(x, y, tileWidth, tileHeight){
    for(let i = 0; i < 40; i += 6){
        ellipse(x + tileWidth / 2+i/3, y + tileHeight / 2, tileWidth - i, tileHeight - i);
      }
}





