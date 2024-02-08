let snowflakes = [];

// Define the Snowflake class
class Snowflake {
  constructor() {
    this.position = createVector(random(width), -100);
    this.velocity = createVector(random(-1, 2), random(1, 3));
    this.size = random(2, 15);
  }
  
  // Update position based on velocity
  update() {
    this.position.add(this.velocity);
    // Remove the snowflake if it's off the screen
    for (let i = snowflakes.length - 1; i >= 0; i--) {
      if (snowflakes[i].position.y > height) {
        //remove the particle from the array
        snowflakes.splice(i, 1);
      }
    }
  }
  
  display() {
    ellipse(this.position.x, this.position.y, this.size);
  }
}

// Create a different type of Snowflake that inherits from the Snowflake class
class FancySnowflake extends Snowflake {
  constructor() {
    // Inherit everything from the Snowflake class
    super();
    this.color = color(random(100, 255), random(100, 255), random(100, 255));
  }
  // Override the display function to use this snowflake's color
  display() {
    fill(this.color);
    super.display();
  }
}





function setup() {
  createCanvas(windowWidth, windowHeight);
  fill(240);
  noStroke();
}

function draw() {
  background('black');
  
  // Possibly add a new snowflake
  if (random(1) < 0.1) {
    snowflakes.push(new Snowflake()); // Add a regular snowflake
  }
  
  for (let flake of snowflakes) {
    flake.update(); // Update snowflake position
    flake.display(); // Draw snowflake
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


