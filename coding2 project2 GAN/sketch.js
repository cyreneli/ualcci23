let stage = 1;
let particle;
let particles = [];
let positions = [
  { x: 100, y: 100 }, // 位置 1
  { x: 300, y: 100 }, // 位置 2
  { x: 500, y: 100 }  // 位置 3
];

function setup() {
  createCanvas(640, 360);
  for (let i = 0; i < 100; i++) {
    let pos = positions[0]; // 假设positions数组已经定义
    particles.push(new Particle(pos.x, pos.y, pos.x, pos.y));
  }
}

function draw() {
  background(255);

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
