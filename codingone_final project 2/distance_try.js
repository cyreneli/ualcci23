let num = 10;
let agents = [];
let ellipses = [];
let circles = [];
let player = { x: 0, y: 0, size: 20 };

// let ellipsePos;
// let vectorArray = [];

function setup() {
  createCanvas(800, 800);
  for(let i = 0; i < num ; i++){
    agents.push( new Agent() );
  }
}

function draw() {
  //background(0);
  fill(0, 60);
  noStroke()
  rect(0,0,width,height) 

  // draw a circle for visualization
  player.x = mouseX;
  player.y = mouseY;
  fill(123);
  circle(player.x, player.y, player.size);
   for(let i = 0; i < circles.length; i++) {
    ellipse(circles[i].x, circles[i].y, circles[i].size); 
   }
   
//ellipse for adding the force
  for(let i of agents){ i.update() }
  for(let i=0;i<ellipses.length;i++){
    ellipse(ellipses[i].x,ellipses[i].y,1,1);
    for (let agent of agents) {
      agent.applyForce(ellipses[i]);
    }
  }

  //check the agents in the circle or not
    for (let agent of agents) {
    agent.checkCircleCollision(); 
    agent.update();
  }
   
}



class Agent{
  constructor(){
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(random(-1,1), random(-1,1));
    this.acc = createVector();
    this.acc_limit = random(0.23,0.35);
    this.speed_limit = random(2,3.5);

    this.cohesion = createVector();
    this.repulsion = createVector();
  }

  update(){
    this.move();
    this.checkEdge();
    this.display();
  }

  move(){
    this.keepCohesion();
    this.keepRepulsion();

    this.acc.limit(this.acc_limit);
    this.vel.add(this.acc);
    this.vel.limit(this.speed_limit);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  keepRepulsion(){
    for(let other of agents){
      let dist = p5.Vector.sub(other.pos, this.pos);
      let dist_v = dist.mag();
      if(dist_v < 5 && other != this){
        let f = map(dist_v, 0,5, 1,0)
        dist.mult(-f);
        this.repulsion.add(dist);
      }
    }
    this.acc.add(this.repulsion)
  }
  keepCohesion(){
    let count = 0;
    for(let other of agents){
      let dist = p5.Vector.sub(other.pos, this.pos);
      let dist_v = dist.mag();
      if(dist_v < 80 && other != this){
        this.cohesion.add(dist);
        count++;
      }
    }
    if(count>0){
      this.cohesion.mult(1/count);
      this.acc.add(this.cohesion)
    }
  }

  display(){
    stroke(255);
    strokeWeight(4);
    point(this.pos.x, this.pos.y);
  }
  checkEdge(){
    if(this.pos.x < 0){this.pos.x = width}
    if(this.pos.x > width){this.pos.x = 0}
    if(this.pos.y < 0){this.pos.y = height}
    if(this.pos.y > height){this.pos.y = 0}
  }

  applyForce(target) {
    let force = p5.Vector.sub(target, this.pos);
    //force.setMag(9); 
    this.acc.add(force);
  }
  
// the check function
    checkCircleCollision() {
    for (let i = ellipses.length - 1; i >= 0; i--) {
      for (let a = circles.length - 1; a >= 0; a--){
      let d = dist(this.pos.x, this.pos.y, circles[a].x, circles[a].y);
      if (d < circles[a].size / 2) {
        ellipses.splice(i, 1);
        circles.splice(a, 1);  // 如果agent在圆内，移除该圆
      }
    }
    }
  }
  
}

function mousePressed() {
  fill(100); 
  noStroke(); 
  //here only two parameters , can't change 
  ellipses.push(createVector(mouseX, mouseY));
 // new circle
  let newCircle = {
    x: mouseX,
    y: mouseY,
    size: player.size,
  }
  circles.push(newCircle);
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
      // if up_arrow plus size
      player.size += 10;
    } else if (keyCode === DOWN_ARROW) {
      // if down_arrow 
      if (player.size > 10) {
        player.size -= 10;
      }
    }
  }