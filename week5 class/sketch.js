let tileWidth = 50;
let tileHeight = 50;
let tileWidthslider;
let tileHeightslider;
let tileSizeMinimum = 5;
let randomSeedslider;
let randomSeedrange = 1000;



function setup() {
  createCanvas(400, 400);
  tileWidthSlider = createSlider(tileSizeMinimum, width, 50, 1);
  tileHeightSlider = createSlider(tileSizeMinimum, height, 50, 1);
  randomSeedslider = createSlider(0,randomSeedrange,50,1);
}

function draw(){
  background(233);
  let tileWidth = tileWidthSlider.value();
  let tileHeight= tileHeightSlider.value();
 
  drawGrid(400,400, tileWidth, tileHeight);
}

function drawGrid(x, y, tileWidth, tileHeight){
  let randomSeedvalue = randomSeedslider.value();
  for(let y=0; y<height; y+=tileHeight){
    for(let x=0; x<width; x+=tileWidth){
     drawTile(x,y,tileWidth,tileHeight);
    }
  }
}


function drawTile(x, y, tileWidth, tileHeight) {
    fill(randomSeedvalue);
    rect(x, y, tileWidth, tileHeight);
}
