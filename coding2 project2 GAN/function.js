function preload() {
    img1 = loadImage('assets/traindata.png');
    img2 = loadImage('assets/discriminator.png');
    img3 = loadImage('assets/generator.png');
  }

// get the buttons from html
var button1 = document.getElementById('button1');
var button2 = document.getElementById('button2');
var button3 = document.getElementById('button3');
var button4 = document.getElementById('button4');

// add console.log to make sure they all worked very well
button1.addEventListener('click', function() {
  console.log('train data was clicked!');
  animate1 = !animate1;
  
});

button2.addEventListener('click', function() {
    console.log('generator was clicked!');
    animate2 = !animate2;
  });

button3.addEventListener('click', function() {
  console.log('discriminator was clicked!');
  animate3 = !animate3;
});

button4.addEventListener('click', function() {
    console.log('circle was clicked!');
  });

//

function moveimg1(){
    let targetY = 45;
    if (mouseX > 125 && mouseX < 205 && mouseY > 40 && mouseY < 120) {
      // 如果鼠标悬停在图像上方，则稍微提升图像位置
      targetY = 25;
  
      fill(0); 
      textSize(12); 
      noStroke();
      text("Training data: Real data samples to train model.", 120, 420);
  
    } 
  
    currentY1 = lerp(currentY1, targetY, 0.05); 
    image(img1, 125, currentY1, 80, 80);
  }
  
  function moveimg2(){
    let targetY = 150;
    if (mouseX > 350 && mouseX < 430 && mouseY > 150 && mouseY < 230) {
      // 如果鼠标悬停在图像上方，则稍微提升图像位置
      targetY = 130;
      fill(0); 
      textSize(12); 
      noStroke();
      text("Discriminator: Distinguishes real from fake data.", 120, 420);
    } 
    currentY2 = lerp(currentY2, targetY, 0.05); 
    image(img2, 350, currentY2, 80, 80);
  }
  
  function moveimg3(){
    let targetY = 230;
    if (mouseX > 120 && mouseX < 200 && mouseY > 230 && mouseY < 310) {
      // 如果鼠标悬停在图像上方，则稍微提升图像位置
      targetY = 210;
      fill(0); 
      textSize(12); 
      noStroke();
      text("Generator: Creates fake data mimicking training data.", 120, 420);
    } 
    currentY3 = lerp(currentY3, targetY, 0.05); 
    image(img3, 120, currentY3, 80, 80);
  }

  function circletext(){
    if (mouseX > 520 && mouseX < 680 && mouseY > 100 && mouseY < 260) {
        // 如果鼠标悬停在图像上方，则稍微提升图像位置
        fill(0); 
        textSize(12); 
        noStroke();
        text("The circle represents an ideal state where the fake and real data are each 50%, ", 120, 420);
        text("meaning the discriminator cannot distinguish between real and fake data. ", 120, 435);
        text("In this scenario, the generator produces data that closely resembles real data indefinitely", 120, 450);
      } 
  }