let xRotation = 0;
let yRotation = 0;
let zRotation = 0;
let rotationStep = PI / 64; // 每次按键旋转的角度

let myFont;

function setup() {
  createCanvas(400, 400, WEBGL);
}

function draw() {
  background(200);

  // 设置光源
  ambientLight(60);
  directionalLight(255, 255, 255, 0, 0, -1);

  // 应用旋转
  rotateX(xRotation);
  rotateY(yRotation);
  rotateZ(zRotation);

  // 绘制 3 个堆叠的盒子
  for (let i = 0; i < 3; i++) {
    push();
    translate(0, 0, i * 10); // 在 Z 轴上移动
    box(20, 20, 10); // 绘制盒子
    pop();
  }

  // 显示旋转值
  fill(0);
  textSize(12);
  text("rotateX: " + xRotation.toFixed(2), -190, -180);
  text("rotateY: " + yRotation.toFixed(2), -190, -160);
  text("rotateZ: " + zRotation.toFixed(2), -190, -140);
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    xRotation += rotationStep;
  } else if (keyCode === DOWN_ARROW) {
    xRotation -= rotationStep;
  } else if (keyCode === RIGHT_ARROW) {
    yRotation += rotationStep;
  } else if (keyCode === LEFT_ARROW) {
    yRotation -= rotationStep;
  }

  // 限制旋转角度在 0 和 TWO_PI 之间
  xRotation = constrain(xRotation, 0, TWO_PI);
  yRotation = constrain(yRotation, 0, TWO_PI);
  zRotation = constrain(zRotation, 0, TWO_PI);
}
