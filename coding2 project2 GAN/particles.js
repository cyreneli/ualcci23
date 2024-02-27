// Adapted from Daniel Shiffman, Nature of Code (https://nature-of-code-2nd-edition.netlify.app/particles/)

class Particle {
  constructor(x, y, points) { // 添加一个points参数用于接收目标点的数组
    this.position = createVector(x, y);
    this.velocity = createVector(0, random(-2, 0));
    this.acceleration = createVector(0, 0);
    this.lifespan = 255.0;
    this.maxspeed = 0.08;
  }

  moveTowards(targetX, targetY) {
    let target = createVector(targetX, targetY);
    this.acceleration = p5.Vector.sub(target, this.position);
    this.acceleration.setMag(0.1); // 控制移动速度
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.velocity.limit(2); // 限制最大速度
    this.lifespan -= 2;
  }

  // Draw the particle
  show() {
	  noStroke(0);
    fill(255,0,0,this.lifespan);
    circle(this.position.x, this.position.y, 4);
  }

  // simulate a force on this particle (like gravity)
  applyForce(force) {
    this.acceleration.add(force);
  }


  // Is the particle alive or dead?
  isDead() {	
    return this.lifespan < 0.0;
  }
}