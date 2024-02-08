// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Demonstration of Craig Reynolds' "Flocking" behavior
// See: http://www.red3d.com/cwr/
// Rules: Cohesion, Separation, Alignment

// Click mouse to add boids into the system

let flock;
let lightEnabled = false;
let lightPosition = null; 


function setup() {
  createCanvas(800, 800);
  flock = new Flock();
  // Add an initial set of boids into the system
  for (let i = 0; i < 120; i++) {
    let boid = new Boid(width / 2, height / 2);
    flock.addBoid(boid);
  }
  select('#lightButton').mousePressed(toggleLight);
  
}

function draw() {
  background(255);
  noFill();
  ellipse(width/2,height/2,600,600);
  stroke(0, 0, 0); 
  strokeWeight(5);  

  flock.run();
  if (lightEnabled) {
    noStroke();
    fill(255, 235, 54,70); // 设置椭圆的填充色为黄色
    ellipse(mouseX, mouseY,40,40); // 绘制椭圆
  }
 
}

// use mouse control the booids
function mouseDragged() {
  lightPosition = createVector(mouseX, mouseY);
}
function toggleLight() {
  // change the condition of light
  lightEnabled = !lightEnabled;
  if (lightEnabled) {
    select('#lightButton').addClass('button-on').removeClass('button-off');
  } else {
    select('#lightButton').addClass('button-off').removeClass('button-on');
  }
}




