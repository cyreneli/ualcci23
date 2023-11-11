//this project is create an environment of chinese water town 
//if u see carefully , u can notice the track of water on the screen
//class is a good way to focus on object
let img;
let sound;
let soundButton;

class Raindrop{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.hue = random(360);
    this.fade = 1;
    //change the size of rainball
    this.size = random(10,30);
  }

  update(){
    // let rainball drop
    this.y +=2 ;
    //let rainball has some track
    this.fade = map(this.y,0,height,1,0);
  }

  display(){
    //different color
    fill(this.hue,10,70,this.fade);
    noStroke();
    ellipse(this.x,this.y,this.size,this.size);
  }
}

// set a array to contain raindrop
let raindrops = [];

//canvas and colormode
function setup() {
  createCanvas(800, 400);
  colorMode(HSB, 360, 100, 100, 1.0);
  
//set image and sound
  img = loadImage('bg.png');
  // set a sound of white noise
  sound = loadSound('rainy_day_sound.mp3');
  sound.setVolume(0.4);
  // set the button to valid the sound
  soundButton = createButton('listen the rain');
  soundButton.style('border-radius', '20px');
  soundButton.style('border', '3px solid #FFF');
  soundButton.style('background', '#D8DDE4');
  soundButton.position(20,20);
  soundButton.mousePressed(playsound);
}

//focus on the logic , how to use array!
function draw() {
  background(220, 10, 100, 0.1);
  tint(360,1,100,0.1);
  image(img, 0, 0);

  
  for(let i = raindrops.length -1;i>=0;i--){
    let raindrop = raindrops[i];
    raindrop.update();
    raindrop.display();

    if(raindrop.y>height){
      raindrops.splice(i,1);
    }
  }
}


function mousePressed() {
  if (mouseX < width && mouseY > 0 && mouseY < height) {
   let raindrop = new Raindrop(mouseX,mouseY);
   raindrops.push(raindrop);
  }
}

function playsound(){
  sound.play();
}
