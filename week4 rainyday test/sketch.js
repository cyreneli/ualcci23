//i don't use array at this time 
let yPos = 0;
let targety = 300;
let fade;
let h;
let yPositions = []; // 用于存储每次点击的Y位置

function setup() {
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100, 1.0);
  h = random(0, 360);
}

function draw() {
  background(220, 10, 100, 0.1);
  for (let i = 0; i < yPositions.length; i++) {
    drawrain(yPositions[i]);
  }
}

function drawrain(y) {
  yPos = lerp(yPos, targety, 0.01);
  // when yPos becomes bigger,
  fade = map(yPos, 0, targety, 1, 0);
  // leave the track
  fill(h, 20, 70, fade);
  // leave the track
  noStroke();
  ellipse(mouseX, y, 10, 10);
}

function mousePressed() {
  if (mouseX < width && mouseY > 0 && mouseY < height) {
    yPositions.push(mouseY); // 存储每次点击的Y位置
  }
}
