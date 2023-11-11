let dotSize = 9;
let angleOffsetA;
let angleOffsetB;

function setup() {
  createCanvas(900, 900);
  noStroke();
  fill(0);
  frameRate(1); // Redraw the tree once a second
  
  angleOffsetA = radians(1.5); // Convert 1.5 degrees to radians in p5.js
  angleOffsetB = radians(50); // Convert 50 degrees to radians in p5.js
}

function draw() {
  background(255);
  translate(width/2, height/2);
  seed1(dotSize, radians(270), 0, 0);
  seed2(dotSize,radians(120),0,0);
  seed3(dotSize,radians(360),0,0);
  noLoop();
}

function seed1(dotSize, angle, x, y) {
  if (dotSize > 1.0) {
    let r = random(1); // p5.js uses random(1) for a number between 0 and 1
    
    if (r > 0.1) {
      ellipse(x, y, dotSize, dotSize);
      let newx = x + cos(angle) * dotSize;
      let newy = y + sin(angle) * dotSize;
      seed1(dotSize * 0.99, angle - angleOffsetA, newx, newy);   
    } else {
      ellipse(x, y, dotSize, dotSize);
      let newx = x + cos(angle) * dotSize;
      let newy = y + sin(angle) * dotSize;
      seed2(dotSize * 0.99, angle + angleOffsetA, newx, newy);
      seed1(dotSize * 0.60, angle + angleOffsetB, newx, newy);
      seed2(dotSize * 0.50, angle - angleOffsetB, newx, newy);
    } 
  }
}

function seed2(dotSize, angle, x, y) {
  if (dotSize > 1.0) {
    let r = random(1);
    
    if (r > 0.05) {
      ellipse(x, y, dotSize, dotSize);
      let newx = x + cos(angle) * dotSize;
      let newy = y + sin(angle) * dotSize;
      seed2(dotSize * 0.99, angle + angleOffsetA, newx, newy);
    } else {
      ellipse(x, y, dotSize, dotSize);
      let newx = x + cos(angle) * dotSize;
      let newy = y + sin(angle) * dotSize;
      seed1(dotSize * 0.99, angle + angleOffsetA, newx, newy);  
      seed2(dotSize * 0.60, angle + angleOffsetB, newx, newy);
      seed3(dotSize * 0.50, angle - angleOffsetB, newx, newy);
    }
  }
}

function seed3(dotSize, angle, x, y) {
    if (dotSize > 1.0) {
      let r = random(1);
      
      if (r > 0.05) {
        ellipse(x, y, dotSize, dotSize);
        let newx = x + cos(angle) * dotSize;
        let newy = y + sin(angle) * dotSize;
        seed2(dotSize * 0.99, angle + angleOffsetA, newx, newy);
      } else {
        ellipse(x, y, dotSize, dotSize);
        let newx = x + cos(angle) * dotSize;
        let newy = y + sin(angle) * dotSize;
        seed1(dotSize * 0.99, angle + angleOffsetA, newx, newy);  
        seed2(dotSize * 0.60, angle + angleOffsetB, newx, newy);
        seed3(dotSize * 0.50, angle - angleOffsetB, newx, newy);
      }
    }
  }
