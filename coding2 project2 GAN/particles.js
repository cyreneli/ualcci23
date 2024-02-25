// Adapted from Daniel Shiffman, Nature of Code (https://nature-of-code-2nd-edition.netlify.app/particles/)

class Particle {
  constructor(x, y, points) { // 添加一个points参数用于接收目标点的数组
    this.position = createVector(x, y);
    this.velocity = createVector(random(-1, 1), random(-2, 0));
    this.acceleration = createVector(0, 0);
    this.lifespan = 255.0;
    this.points = points; // 保存传入的点数组
    this.currentPointIndex = 0; // 当前目标点的索引
    this.target = points[this.currentPointIndex]; // 初始化当前目标点
    this.maxspeed = 0.05;
  }

  update() {
    let distance = p5.Vector.dist(this.position, this.target);

    if (distance > 40) {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.acceleration.mult(0);

      let force = p5.Vector.sub(this.target, this.position);
      force.setMag(this.maxspeed);
      this.acceleration = force;
    } else {
      this.velocity.mult(0);
      // 更新目标点为下一个点
      this.currentPointIndex = (this.currentPointIndex + 1) % this.points.length;
      this.target = this.points[this.currentPointIndex];
    }

    this.lifespan -= 2.0;
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