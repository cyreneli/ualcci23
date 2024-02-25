let stage = 1;
//let particle;
let particles = [];
let points = [];
let particle;

function setup() {
  createCanvas(640, 360);
  points.push(createVector(100, 100));
  points.push(createVector(540, 100));
  points.push(createVector(540, 260));
  points.push(createVector(100, 260));

  for (let i = 0; i < 50; i++) {
    particle = new Particle(200, 200,points); 
    particles.push(particle);
  }
}

function draw() {
  background(255);
  stroke(0);
  strokeWeight(8);
  for (let p of points) {
    point(p.x, p.y);
  }

switch(stage){
  case 1 :
      // Operate and display each particle
  particles.forEach(function(particle) {
    particle.run();
  });

  // Iterate through particles backward to remove dead ones

 }
}

function mousePressed(){
  stage++;
  if (stage > 1){
      stage = 1;
  }
}
