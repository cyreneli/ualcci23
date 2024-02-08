class mypacmon {
  constructor(x, y) {
      this.x = x;
      this.y = y;
  }

  draw() {
    this.x += random(-1, 1);
    this.y += random(-1, 1);
    fill(0,100,0);
    ellipse(this.x, this.y, 30);
  }

}

class food {
  constructor(x, y) {
      this.x = x;
      this.y = y;
  }

  draw() {
    this.x += random(-1, 1);
    this.y += random(-1, 1);
    rect(this.x, this.y, this.x+5, this.y+5, 2);
  }

}

class ghost {
  constructor(x, y) {
      this.x = x;
      this.y = y;
  }

  draw() {
    this.x += random(-1, 1);
    this.y += random(-1, 1);
    fill(100,0,0);
    ellipse(this.x, this.y, 30);
  }

}

let mypacmon;

function setup() {
  createCanvas(400, 400);
  let initialX = random(0, width);
  let initialY = random(0, height);

  mypacmon = new mypacmon(initialX, initialY);
}

function draw() {
  background(220);
  mypacmon.draw();
}

