class Agent{
  constructor(p) {
      this.p = p; 
      this.pos = this.p.createVector(p.width / 2, p.height / 2);
      this.vel = p.createVector(p.random(-1, 1), p.random(-1, 1));
      this.acc = p.createVector();
      this.acc_limit = p.random(0.23, 0.5);
      this.speed_limit = p.random(2, 6);
  
      this.cohesion = p.createVector();
      this.repulsion = p.createVector();
      this.visitedCircles = [];
    }

  update(p){
    this.move(p);
    this.checkEdge(p);
    this.display(p);

    let closestCircleIndex = this.checkCircleCollision(p);
    if (closestCircleIndex != -1) {
      this.applyForce(p.createVector(circles[closestCircleIndex].x, circles[closestCircleIndex].y));
    }
  }

  move(p){
    this.keepCohesion(p);
    this.keepRepulsion(p);

    this.acc.limit(this.acc_limit);
    this.vel.add(this.acc);
    this.vel.limit(this.speed_limit);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  display(p){
    p.stroke(255);
    p.strokeWeight(3);
    p.point(this.pos.x, this.pos.y);
  }
  checkEdge(p){
    if(this.pos.x < 0){this.pos.x = p.width}
    if(this.pos.x > p.width){this.pos.x = 0}
    if(this.pos.y < 0){this.pos.y = p.height}
    if(this.pos.y > p.height){this.pos.y = 0}
  }

  keepRepulsion(p){
    for(let other of agents){
      let dist = p5.Vector.sub(other.pos, this.pos);
      let dist_v = dist.mag();
      if(dist_v < 1 && other != this){
        let f = this.p.map(dist_v, 0,5, 1,0)
        dist.mult(-f);
        this.repulsion.add(dist);
      }
    }
    this.acc.add(this.repulsion)
  }
  keepCohesion(p) {
      let count = 0;
      for (let other of agents) {
          let dist = p5.Vector.sub(other.pos, this.pos);
        let dist_v = dist.mag();
        if (dist_v < 1 && other != this) {
          this.cohesion.add(dist);
          count++;
        }
      }
      if (count > 0) {
        this.cohesion.div(count); // 使用 div 方法平均凝聚力
        this.acc.add(this.cohesion);
      }
    }
  
  applyForce(target) {
    let force = p5.Vector.sub(target, this.pos);
    //force.setMag(9); 
    this.acc.add(force);
  }
  



//distance founction, find circle never visit
findClosestCircle(p) {
    let closestDist = Infinity;
    let closestIndex = -1;

    for (let i = 0; i < circles.length; i++) {
    //check if the circle included in the visitcircle or not
      if (!this.visitedCircles.includes(i)) { 
        //calulate the distance
        let d = this.p.dist(this.pos.x, this.pos.y, circles[i].x, circles[i].y);
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
checkCircleCollision(p) {
    let closestCircleIndex = this.findClosestCircle(p);
    if (closestCircleIndex != -1) {
      let d = p.dist(this.pos.x, this.pos.y, circles[closestCircleIndex].x, circles[closestCircleIndex].y);
      if (d < circles[closestCircleIndex].size / 2) {
        this.visitedCircles.push(closestCircleIndex);
      }
      return closestCircleIndex;
    }
    return -1;
  }

  //check all the circle be visited or not
  completedTask(p) {
    if (this.visitedCircles.length == circles.length) {
      return true; 
    } else {
      return false; 
    }
  }
}

// 全局变量来存储点击的位置，现在存储 SharedCircle 实例
let sharedCircles = [];
let player = { x: 0, y: 0, size: 20 };
let num =500 ;
let lastNum;
let ellipses = [];
let circles = [];
let agents = [];
let agentsCounts = [];


function sketch1(p) {

p.setup = function() {
  p.createCanvas(1600, 400);
  lastNum = num;
  for(let i = 0; i < lastNum ; i++){
      agents.push( new Agent(p) );
    }
};
p.draw = function() {
  //draw a circlr with little tail
  p.fill(0, 90);
  p.noStroke()
  p.rect(0,0,p.width,p.height) 
  player.x = p.mouseX;
  player.y = p.mouseY;
  p.fill("#AD0000");
  p.noStroke();
  p.circle(player.x, player.y, player.size);
  
  //save circle - visualization
  for (let i = 0; i < circles.length; i++) {
      p.ellipse(circles[i].x, circles[i].y, circles[i].size);
    }    
  
  for (let i = agents.length - 1; i >= 0; i--) {
      agents[i].update(p);
      //if agents visit all the circles ,the agents should be deleted ,add new agent
      if (agents[i].completedTask(p)) {
          agents.splice(i, 1); // 移除完成任务的 agent
          agents.push(new Agent(p));
        }
    }

    p.calculateAgents();

};

p.mousePressed = function() {
  if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
      p.fill(100); 
      p.noStroke(); 
      //here only two parameters , can't change 
      ellipses.push(p.createVector(p.mouseX, p.mouseY));
     // new circle
      let newCircle = {
        x: p.mouseX,
        y: p.mouseY,
        size: player.size,
      }
      circles.push(newCircle);

    }
};
p.keyPressed = function() {
  if (p.keyCode === p.UP_ARROW) {
      // if up_arrow plus size
      player.size += 10;
    } else if (p.keyCode === p.DOWN_ARROW) {
      // if down_arrow 
      if (player.size > 10) {
        player.size -= 10;
      }
    }
};

p.calculateAgents = function() {
  let mindistance = 30;
  // every circle has a new agentsCounts
  agentsCounts = new Array(circles.length).fill(0);
  for (let j = 0; j < circles.length; j++) {
      for (let i = 0; i < agents.length; i++) {
          // calculate

          let d = p.dist(agents[i].pos.x, agents[i].pos.y, circles[j].x, circles[j].y);
          // if < 20, add one in agentsCounts
          if (d < mindistance) {

              agentsCounts[j]++;
          }
      }
  }
  for (let i = 0; i < agentsCounts.length; i++) {
    console.log(agentsCounts[i]);
  } 
  return agentsCounts;
};

}









function sketch2(p) {
let rotateX = 0;
let rotateY = 0;
let angleY = 0;
let angleX = 0;
let lastMouseX = 0;
let lastMouseY = 0;
let dragging = false;
let scaleFactor = 0.5; // 缩放因子
let minScale = 0.3; // 最小缩放比例
let maxScale = 2.0; // 最大缩放比例

p.setup = function() {
  p.createCanvas(1600, 400, p.WEBGL);
  p.background(100);
};

p.draw = function() {
  p.scale(scaleFactor);
  p.background(0);//must have this 
  // light
  p.directionalLight(255, 255, 255, 0.25, 0.25, -1);

  // how to drag
  if (dragging) {
      angleY += (p.mouseX - lastMouseX) * 0.01;
      angleX += (p.mouseY - lastMouseY) * 0.01;
    }
    // change the position of mouse 
    lastMouseX = p.mouseX;
    lastMouseY = p.mouseY;
    p.rotateX(angleX);
    p.rotateY(angleY);


  // create X,Y,Z  - can be hided
  // p.stroke(255, 0, 0);
  // p.line(0, 0, 0, 100, 0, 0); // X
  // p.stroke(0, 255, 0);
  // p.line(0, 0, 0, 0, -100, 0); // Z
  // p.stroke(0, 0, 255);
  // p.line(0, 0, 0, 0, 0, 100); // Y

  

  // cube - link the size with circle in sketch one 
  for (let i = 0; i < circles.length; i++) {
    p.push();
    p.translate(circles[i].x - p.width / 2, 0, circles[i].y - p.height / 2);
    p.rotateX(p.PI / 2);
    p.noStroke();
    p.fill(255, 0, 0); // change color
  
    // the hight of cube
    let heightIncrement = 5; //make the change more large
    let boxHeight = agentsCounts[i] * heightIncrement;
  
    // change the original point
    p.translate(0, 0, boxHeight / 2); //same with the height
    p.box(circles[i].size, circles[i].size,boxHeight);
  
    p.pop();
  }
  

// mousePressed - how to interact
p.mousePressed = function() {
// make sure the mouse is in the skecth2
if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
  dragging = true;
}
};

p.mouseReleased = function() {
  dragging = false;
};

p.mouseWheel = function(event) {
  // check the mouse in the sktech2 or not
  if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
    // 根据滚轮事件来调整缩放因子
    scaleFactor += event.delta * 0.01;
    // 限制缩放范围在[minScale, maxScale]之间
    scaleFactor = p.constrain(scaleFactor, minScale, maxScale);
  }
}

};


}








new p5(sketch1, 'container1');
new p5(sketch2, 'container2');