let dotSize = 3;
let angleOffsetA;
let angleOffsetB;
let Slider;
let state = true;
let defaultRandomSeed = 0;
let randomSeedRange = 1000;
let randomSeedSlider;
let colorSlider;

function setup() {
  createCanvas(600, 400);
  noStroke();
  fill(0);

  angleOffsetA = radians(1.9); 
  angleOffsetB = radians(40); 
  
  Slider = createSlider(0, 100, 90,1);
  Slider.position(10, height + 10);
  Slider.input(() =>{loop()}); // when use slider, use loop again
  randomSeedSlider = createSlider(0, randomSeedRange, defaultRandomSeed, 1);
  randomSeedSlider.position(10,height+30);
  colorSlider = createSlider(0,255,30,1);
  colorSlider.position(190,height+30);
}

function draw() {
  let randomSeedValue = randomSeedSlider.value();
  let colorValue = colorSlider.value();
  background(250);
//   fill(240);
//   ellipse(400,400,width-20,height-20);
  translate(width/2, height/2);
  fill(colorValue);
  let maxDepth=map(Slider.value(),0,100,0,100);
  randomSeed(randomSeedValue);
  seed1(dotSize, radians(0), 0, 0,0,maxDepth);
  randomSeed(randomSeedValue);
  seed2(dotSize,radians(60),0,0,0,maxDepth);
  randomSeed(randomSeedValue);
  seed3(dotSize,radians(110),0,0,0,maxDepth);
  randomSeed(randomSeedValue);
  seed4(dotSize,radians(150),0,0,0,maxDepth);
  randomSeed(randomSeedValue);
  seed5(dotSize,radians(200),0,0,0,maxDepth);
  randomSeed(randomSeedValue);
  seed6(dotSize,radians(250),0,0,0,maxDepth);
  randomSeed(randomSeedValue);
  seed7(dotSize,radians(270),0,0,0,maxDepth);
  randomSeed(randomSeedValue);
  seed8(dotSize,radians(320),0,0,0,maxDepth);
  randomSeed(randomSeedValue);
  seed9(dotSize,radians(360),0,0,0,maxDepth);

}

function seed1(dotSize, angle, x, y,currentDepth,maxDepth) {
    if (dotSize > 0.2 && currentDepth < maxDepth) {
      let r = random(1); 
      ellipse(x, y, dotSize, dotSize);
      let newx = x + cos(angle) * dotSize;
      let newy = y + sin(angle) * dotSize;

      if (r > 0.1) {
        seed1(dotSize * 0.99, angle - angleOffsetA, newx, newy,currentDepth+1,maxDepth);   
      } else {
        randomSeed(2);
        seed2(dotSize * 0.99, angle + angleOffsetA, newx, newy,currentDepth+1,maxDepth);
        randomSeed(34);
        seed1(dotSize * 0.60, angle + angleOffsetB, newx, newy,currentDepth+1,maxDepth);
        randomSeed(99);
        seed1(dotSize * 0.50, angle - angleOffsetB, newx, newy,currentDepth+1,maxDepth);
      } 
    }
  }
  
  function seed2(dotSize, angle, x, y,currentDepth,maxDepth) {
    if (dotSize > 0.1 && currentDepth < maxDepth) {
      let r = random(1);
      
      if (r > 0.1) {
        ellipse(x, y, dotSize, dotSize);
        let newx = x + cos(angle) * dotSize;
        let newy = y + sin(angle) * dotSize;
        seed2(dotSize * 0.99, angle + angleOffsetA, newx, newy,currentDepth+1,maxDepth);
      } else {
        ellipse(x, y, dotSize, dotSize);
        let newx = x + cos(angle) * dotSize;
        let newy = y + sin(angle) * dotSize;
        randomSeed(2);
        seed1(dotSize * 0.99, angle + angleOffsetA, newx, newy,currentDepth+1,maxDepth);  
        randomSeed(90);
        seed2(dotSize * 0.60, angle + angleOffsetB, newx, newy,currentDepth+1,maxDepth);
        randomSeed(345);
        seed2(dotSize * 0.50, angle - angleOffsetB, newx, newy,currentDepth+1,maxDepth);
      }
    }
  }

  function seed3(dotSize, angle, x, y,currentDepth,maxDepth) {
    if (dotSize > 0.2 && currentDepth < maxDepth) {
        let r = random(1);
        
        if (r > 0.5) {
          ellipse(x, y, dotSize, dotSize);
          let newx = x + cos(angle) * dotSize;
          let newy = y + sin(angle) * dotSize;
          seed2(dotSize * 0.99, angle + angleOffsetA, newx, newy,currentDepth+1,maxDepth);
        } else {
          ellipse(x, y, dotSize, dotSize);
          let newx = x + cos(angle) * dotSize;
          let newy = y + sin(angle) * dotSize;
          randomSeed(2);
          seed1(dotSize * 0.99, angle + angleOffsetA, newx, newy,currentDepth+1,maxDepth); 
          seed2(dotSize * 0.60, angle + angleOffsetB, newx, newy,currentDepth+1,maxDepth);
          seed3(dotSize * 0.50, angle - angleOffsetB, newx, newy,currentDepth+1,maxDepth);
        }
      }
    }
  
    function seed4(dotSize, angle, x, y,currentDepth,maxDepth) {
      if (dotSize > 0.2 && currentDepth < maxDepth) {
        let r = random(1); 
        ellipse(x, y, dotSize, dotSize);
        let newx = x + cos(angle) * dotSize;
        let newy = y + sin(angle) * dotSize;
        if (r > 0.4) {
          seed4(dotSize * 0.96, angle + angleOffsetA, newx, newy,currentDepth+1,maxDepth);   
        } else {
          seed1(dotSize * 0.95, angle + angleOffsetB, newx, newy,currentDepth+1,maxDepth);
          randomSeed(5);
          seed4(dotSize * 0.6, angle - angleOffsetB, newx, newy,currentDepth+1,maxDepth);
          randomSeed(6);
          seed5(dotSize * 0.5, angle + angleOffsetB, newx, newy,currentDepth+1,maxDepth);
        } 
      }
    }
  
    function seed5(dotSize, angle, x, y,currentDepth,maxDepth) {
      if (dotSize > 0.2 && currentDepth < maxDepth) {
        let r = random(1); 
        ellipse(x, y, dotSize, dotSize);
        let newx = x + cos(angle) * dotSize;
        let newy = y + sin(angle) * dotSize;
        if (r > 0.3) {
          seed5(dotSize * 0.96, angle - angleOffsetA, newx, newy,currentDepth+1,maxDepth);   
        } else {
          seed1(dotSize * 0.95, angle + angleOffsetB, newx, newy,currentDepth+1,maxDepth);
          randomSeed(2);
          seed2(dotSize * 0.5, angle - angleOffsetB, newx, newy,currentDepth+1,maxDepth);
          randomSeed(4);
          seed3(dotSize * 0.6, angle + angleOffsetB, newx, newy,currentDepth+1,maxDepth);
        } 
      }
    }
  
    function seed6(dotSize, angle, x, y,currentDepth,maxDepth) {
      if (dotSize > 0.2 && currentDepth < maxDepth) {
        let r = random(1); 
        ellipse(x, y, dotSize, dotSize);
        let newx = x + cos(angle) * dotSize;
        let newy = y + sin(angle) * dotSize;
        if (r > 0.3) {
          seed6(dotSize * 0.96, angle + angleOffsetA, newx, newy,currentDepth+1,maxDepth);   
        } else {
          seed1(dotSize * 0.95, angle + angleOffsetB, newx, newy,currentDepth+1,maxDepth);
          randomSeed(2);
          seed2(dotSize * 0.6, angle + angleOffsetB, newx, newy,currentDepth+1,maxDepth);
    
          randomSeed(6);
          seed5(dotSize * 0.8, angle - angleOffsetB, newx, newy,currentDepth+1,maxDepth);
        } 
      }
    }
  
    function seed7(dotSize, angle, x, y,currentDepth,maxDepth) {
      if (dotSize > 0.1 && currentDepth < maxDepth) {
        let r = random(1); 
        ellipse(x, y, dotSize, dotSize);
        let newx = x + cos(angle) * dotSize;
        let newy = y + sin(angle) * dotSize;
        if (r > 0.3) {
          seed7(dotSize * 0.96, angle - angleOffsetA, newx, newy,currentDepth+1,maxDepth);   
        } else {
          seed1(dotSize * 0.95, angle + angleOffsetB, newx, newy,currentDepth+1,maxDepth);
          randomSeed(2);
          seed6(dotSize * 0.6, angle - angleOffsetB, newx, newy,currentDepth+1,maxDepth);
    
          randomSeed(6);
          seed5(dotSize * 0.8, angle + angleOffsetB, newx, newy,currentDepth+1,maxDepth);
        } 
      }
    }
  
    function seed8(dotSize, angle, x, y,currentDepth,maxDepth) {
      if (dotSize > 0.2 && currentDepth < maxDepth) {
        let r = random(1); 
        ellipse(x, y, dotSize, dotSize);
        let newx = x + cos(angle) * dotSize;
        let newy = y + sin(angle) * dotSize;
        if (r > 0.2) {
          seed8(dotSize * 0.96, angle - angleOffsetA, newx, newy,currentDepth+1,maxDepth);   
        } else {
          seed1(dotSize * 0.95, angle + angleOffsetB, newx, newy,currentDepth+1,maxDepth);
          randomSeed(2);
          seed6(dotSize * 0.6, angle + angleOffsetB, newx, newy,currentDepth+1,maxDepth);
    
          randomSeed(6);
          seed5(dotSize * 0.8, angle - angleOffsetB, newx, newy,currentDepth+1,maxDepth);
        } 
      }
    }
  
    function seed9(dotSize, angle, x, y,currentDepth,maxDepth) {
      if (dotSize > 0.2 && currentDepth < maxDepth) {
        let r = random(1); 
        ellipse(x, y, dotSize, dotSize);
        let newx = x + cos(angle) * dotSize;
        let newy = y + sin(angle) * dotSize;
        if (r > 0.2) {
          seed9(dotSize * 0.96, angle + angleOffsetA, newx, newy,currentDepth+1,maxDepth);   
        } else {
          seed1(dotSize * 0.95, angle - angleOffsetB, newx, newy,currentDepth+1,maxDepth);
          randomSeed(2);
          seed6(dotSize * 0.6, angle + angleOffsetB, newx, newy,currentDepth+1,maxDepth);
          randomSeed(6);
          seed5(dotSize * 0.8, angle + angleOffsetB, newx, newy,currentDepth+1,maxDepth);
        } 
      }
    }
  
  
