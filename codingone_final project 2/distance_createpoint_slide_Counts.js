
let num =500 ;
let lastNum;
let agents = [];
let ellipses = [];
let circles = [];
let player = { x: 0, y: 0, size: 20 };
let numcircle = 10;
let slider;

// let ellipsePos;
// let vectorArray = [];



function setup() {
  createCanvas(1600, 800);

  slider = createSlider(0, 1000, 10, 1);
  slider.position(10,height+10);

  lastNum = num;
  for(let i = 0; i < lastNum ; i++){
    agents.push( new Agent() );
  }
}

function draw() {
    calculateAgents();
    // num = slider.value();
    // console.log(num);
    // for(let i of agents){ i.update() }

  //background(0);
 
  fill(0, 60);
  noStroke()
  rect(0,0,width,height) 
  for(let i of agents){ i.update() }

  // draw a circle for visualization
  player.x = mouseX;
  player.y = mouseY;
  fill("#AD0000");
  noStroke();
  circle(player.x, player.y, player.size);

   for(let i = 0; i < circles.length; i++) {
    ellipse(circles[i].x, circles[i].y, circles[i].size); 
   }
   
//ellipse for adding the force, i need delete this founction because that will effect the agents run

//   for(let i=0;i<ellipses.length;i++){
//     ellipse(circles[i].x,circles[i].y,1,1);
//     for (let agent of agents) {
//       agent.applyForce(ellipses[i]);
//     }
//   }

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


class Agent{
    constructor(){
      this.pos = createVector(width/2, height/2);
      //this.pos = createVector(random(width), random(height));
      this.vel = createVector(random(-1,1), random(-1,1));
      this.acc = createVector();
      this.acc_limit = random(0.23,0.5);
      this.speed_limit = random(2,6);
  
      this.cohesion = createVector();
      this.repulsion = createVector();
  //remenber the circle have visited
      this.visitedCircles = [];
    }
  
    update(){
      this.move();
      this.checkEdge();
      this.display();
  
      let closestCircleIndex = this.checkCircleCollision();
      if (closestCircleIndex != -1) {
        this.applyForce(createVector(circles[closestCircleIndex].x, circles[closestCircleIndex].y));
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
  
    display(){
      stroke(255);
      strokeWeight(3);
      point(this.pos.x, this.pos.y);
    }
    checkEdge(){
      if(this.pos.x < 0){this.pos.x = width}
      if(this.pos.x > width){this.pos.x = 0}
      if(this.pos.y < 0){this.pos.y = height}
      if(this.pos.y > height){this.pos.y = 0}
    }
  
    keepRepulsion(){
      for(let other of agents){
        let dist = p5.Vector.sub(other.pos, this.pos);
        let dist_v = dist.mag();
        if(dist_v < 1 && other != this){
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



//calculate distance between circle and agents
function calculateAgents() {
  let mindistance = 20;
  // every circle has a new agentsCounts
  let agentsCounts = new Array(circles.length).fill(0);
  console.log("test 1");
  for (let j = 0; j < circles.length; j++) {
      console.log("test 2");
      for (let i = 0; i < agents.length; i++) {
          // calculate
          console.log("test 3");
          let d = dist(agents[i].pos.x, agents[i].pos.y, circles[j].x, circles[j].y);
          // if < 20, add one in agentsCounts
          if (d < mindistance) {
             console.log("test 4");
              agentsCounts[j]++;
          }
      }
  }
  console.log("test 5");
  for (let i = 0; i < agentsCounts.length; i++) {
    console.log(agentsCounts[i]);
  } 

  console.log("test 6");

return agentsCounts;
}




    