//let particle;
let particles = [];
let particle;

let particles2 = [];
let particle2;

let particles3 = [];
let particle3;

let particles4 = [];
let particle4;
//img
let img1;
let img2;
let img3;

let currentY1 = 45;
let currentY2 = 150;
let currentY3 = 230;

//where particles begin
const point1 = { x: 170, y: 90 };
const point2 = { x: 400, y: 210 };
const point3 = { x: 600, y: 180 };
const point4 = { x: 170, y: 280 };

//animation
let animate1 = false;
let animate2 = false;
let animate3 = false;





function setup() {
  createCanvas(800, 500);
//for real data
  for (let i = 0; i < 20; i++) {
    particle = new Particle(point1.x,point1.y); 
    particles.push(particle);
  }
//for fake data
  for (let i = 0; i < 20; i++) {
    particle2 = new Particle2(point4.x,point4.y); 
    particles2.push(particle2);
  }
//for discriminator
  for (let i = 0; i < 10; i++) {
    particle3 = new Particle3(point2.x,point2.y); 
    particles3.push(particle3);
  }

  for (let i = 0; i < 10; i++) {
    particle4 = new Particle4(point2.x,point2.y); 
    particles4.push(particle4);
  }

}

function draw() {
  background(245,245,245);
  stroke(0);
  strokeWeight(8);
  fill(12,12,12);

  strokeWeight(2);
  line(50,400,750,400);

  strokeWeight(2);
  fill(245,245,245);
  circle(600,180,160);
//put it here because can't effect strokeweight()
  moveimg1();
  moveimg2();
  moveimg3();
  circletext();

//animation
  if (animate1) {
    // Remove dead particles
    particles = particles.filter(particle => !particle.isDead());
    // Add a new particle
    particles.push(new Particle(point1.x,point1.y));
    // Move, update, and show particles
    for (let particle of particles) {
      particle.moveTowards(point2.x, point2.y);
      particle.update();
      particle.show();
    }
  }

  if (animate2) {
    // Remove dead particles
    particles2 = particles2.filter(particle2 => !particle2.isDead());
    // Add a new particle
    particles2.push(new Particle2(point4.x,point4.y));
    // Move, update, and show particles
    for (let particle2 of particles2) {
      particle2.moveTowards(point2.x, point2.y);
      particle2.update();
      particle2.show();
    }
  }

  if (animate3) {
        // Remove dead particles
        particles3 = particles3.filter(particle3 => !particle3.isDead());
        particles4 = particles4.filter(particle4 => !particle4.isDead());
        // Add a new particle
        particles3.push(new Particle3(point2.x,point2.y));
        particles4.push(new Particle4(point2.x,point2.y));
        // Move, update, and show particles
        for (let particle3 of particles3) {
          particle3.moveTowards(point3.x, point3.y);
          particle3.update();
          particle3.show();
        }
        for (let particle4 of particles4) {
          particle4.moveTowards(point3.x, point3.y);
          particle4.update();
          particle4.show();
        }
  }

}



