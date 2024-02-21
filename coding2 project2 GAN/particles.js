// Adapted from Daniel Shiffman, Nature of Code (https://nature-of-code-2nd-edition.netlify.app/particles/)

class Particle {
  constructor(x,y) {
    this.position =  createVector(x, y);
	// start with a random velocity
    this.velocity = createVector(random(-1, 1), random(-2, 0));
    this.acceleration = createVector(0, 0);
    this.lifespan = 255.0;

  }

  // Update the particle speed, position and lifespan
  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 2.0;
    this.acceleration.mult(0);

    
  }

  // Draw the particle
  show() {
	// use lifespan to control alpha of fill
    fill(255,0,0);
	  stroke(0, this.lifespan);

    circle(this.position.x, this.position.y, 8);
  }

  // simulate a force on this particle (like gravity)
  applyForce(force) {
    this.acceleration.add(force);
  }

  // run the update and draw function in one step
  run() {
    this.update();
    this.show();
  }

  // Is the particle alive or dead?
  isDead() {	
    return this.lifespan < 0.0;
  }
}