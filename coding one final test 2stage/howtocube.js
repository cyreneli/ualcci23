function setup() {
    createCanvas(400, 400, WEBGL);
  }
  
  function draw() {
    background(200);
  
    // 设置光源
    ambientLight(60);
    directionalLight(255, 255, 255, 0, 0, -1);
  
    // 设置一个固定的旋转角度
    rotateX(PI / 4);
    rotateY(PI / 4);
  
    // 绘制 3 个堆叠的盒子
    for (let i = 0; i < 3; i++) {
      push();
      translate(0, 0, i * 10); // 在 Z 轴上移动
      box(20, 20, 10); // 绘制盒子
      pop();
    }
  }
  