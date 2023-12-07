
let num =500 ;
let lastNum;
let agents = [];
let ellipses = [];
let circles = [];
let player = { x: 0, y: 0, size: 20 };
let numcircle = 10;



// 第一个实例
let sketch1 = function(p) {
  p.setup = function() {
    p.createCanvas(1600, 800);

    lastNum = num;
    for (let i = 0; i < lastNum; i++) {
      agents.push( new Agent(p) );
    }

  };

  p.draw = function() {

    for(let i of agents){ i.update() }

  //background(0);
 
  p.fill(0, 60);
  p.noStroke();
  p.rect(0, 0, p.width, p.height);
  for(let i of agents){ i.update() }

  // draw a circle for visualization
  player.x = p.mouseX;
  player.y = p.mouseY;
  p.fill("#AD0000");
  p.noStroke();
  p.circle(player.x, player.y, player.size);

   for(let i = 0; i < circles.length; i++) {
    ellipse(circles[i].x, circles[i].y, circles[i].size); 
   }
   

  //check the agents in the circle or not
    for (let i = agents.length - 1; i >= 0; i--) {
    agents[i].update();
    //if agents visit all the circles ,the agents should be deleted ,add new agent
    if (agents[i].completedTask()) {
        agents.splice(i, 1); // 移除完成任务的 agent
        agents.push(new Agent());
      }
  }
}

  p.mousePressed = function() {
    circles.push({ x: p.mouseX, y: p.mouseY, size: player.size });
  }

  p.keyPressed = function() {
    if (p.keyCode === p.UP_ARROW) {
      player.size += 10;
    } else if (p.keyCode === p.DOWN_ARROW) {
      if (player.size > 10) {
        player.size -= 10;
      }
  }
}

class Agent{
  constructor(p) {
    this.p = p;
    this.pos = p.createVector(p.width / 2, p.height / 2);
    this.vel = p.createVector(p.random(-1, 1), p.random(-1, 1));
    this.acc = p.createVector();
    this.acc_limit = p.random(0.23, 0.5);
    this.speed_limit = p.random(2, 6);
  
    this.cohesion = p.createVector();
    this.repulsion = p.createVector();
    this.visitedCircles = []; 
  }
  

  update(){
    this.move();
    this.checkEdge();
    this.display();

    let closestCircleIndex = this.checkCircleCollision();
    if (closestCircleIndex != -1) {
      this.applyForce(this.p.createVector(circles[closestCircleIndex].x, circles[closestCircleIndex].y));
    }
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
      if(dist_v < 1 && other != this){
        let f = this.p.map(dist_v, 0, 20, 1, 0); 
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
      if(dist_v < 1 && other != this){
        this.cohesion.add(dist);
        count++;
      }
    }
    if(count>0){
      this.cohesion.mult(1/count);
      this.acc.add(this.cohesion)
    }
  }

  display() {
    this.p.stroke(255);
    this.p.strokeWeight(3);
    this.p.point(this.pos.x, this.pos.y);
  }
  
  checkEdge() {
    if (this.pos.x < 0) {
      this.pos.x = this.p.width;
    }
    if (this.pos.x > this.p.width) {
      this.pos.x = 0;
    }
    if (this.pos.y < 0) {
      this.pos.y = this.p.height;
    }
    if (this.pos.y > this.p.height) {
      this.pos.y = 0;
    }
  }
  

  applyForce(target) {
    let force = p5.Vector.sub(target, this.pos);
    //force.setMag(9); 
    this.acc.add(force);
  }
  



//distance founction, find circle never visit
findClosestCircle() {
    let closestDist = Infinity;
    let closestIndex = -1;

    for (let i = 0; i < circles.length; i++) {
    //check if the circle included in the visitcircle or not
      if (!this.visitedCircles.includes(i)) { 
        //calulate the distance
        let d = dist(this.pos.x, this.pos.y, circles[i].x, circles[i].y);
        //comapre it with the closest distance
        if (d < closestDist) {
          closestDist = d;
          closestIndex = i;
        }
      }
    }
    return closestIndex;
}

// the check function
checkCircleCollision() {
    let closestCircleIndex = this.findClosestCircle();
    if (closestCircleIndex != -1) {
      let d = dist(this.pos.x, this.pos.y, circles[closestCircleIndex].x, circles[closestCircleIndex].y);
      if (d < circles[closestCircleIndex].size / 2) {
        this.visitedCircles.push(closestCircleIndex);
      }
      return closestCircleIndex;
    }
    return -1;
  }

  //check all the circle be visited or not
  completedTask() {
    if (this.visitedCircles.length == circles.length) {
      return true; 
    } else {
      return false; 
    }
  }
}

}





// 第二个实例
let sketch2 = function(p) {
  p.setup = function() {
    p.createCanvas(200, 200);
  };

  p.draw = function() {
    p.background(255);
    p.fill(0);
  };
};


new p5(sketch1, 'container1');
new p5(sketch2, 'container2');


