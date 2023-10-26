let xo;
let yo;
let r;
let angle;
let segment;
let anglestep = 360;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  noStroke();
  colorMode(HSB, 360, width, height);
}

function draw() {
  background(244);
  translate(width / 2, height / 2);
  if (mouseX < width && mouseX > 0 && mouseY > 0 && mouseY < height) {
    r = dis(200, 200, mouseX, mouseY);
  }

  let segment = 360 / anglestep;
  beginShape(TRIANGLE_FAN);
  vertex(0, 0);
  for (let angle = 0; angle <= 360; angle += segment) {
     fill(angle, mouseX, mouseY);
    
    xo = r * cos(angle);
    yo = r * sin(angle);
   
    // point(xo,yo);
    vertex(xo, yo);
  }
  endShape();
}

function dis(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}
