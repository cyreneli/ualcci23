let rows = 6;
let cols = 6;
let squarePatterns = []; // 用于存储图案对象的数组

class SquarePatterns { // 注意这里是大写的首字母
	constructor(x, y, shapeType) {
		this.x = x;
		this.y = y;
		this.shapeType = shapeType;
	}

	display() {
		if (this.shapeType === 'square1') {
      noStroke();
			fill(random(0, 255), random(0, 255), random(0, 255),random(125, 255));
			rect(this.x, this.y, 50, 50);
		} else if (this.shapeType === 'square2') {
      noStroke();
			fill(random(0, 255), random(0, 255), random(0, 255),random(125, 255));
			rect(this.x - 10, this.y - 10, 50, 50);
		} else if (this.shapeType === 'square3') {
      noStroke();
			fill(0);
			let sideLength = random(10, 30); // 正确的变量名
			rect(this.x + 20 - sideLength/2, this.y + 20 - sideLength/2 , sideLength, sideLength); // 正确的变量名
		}
	}
}

function setup() {
	createCanvas(600, 600);
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) { 
			let x = 100*j+20; 
			let y = 100*i+20; 
			squarePatterns.push(new SquarePatterns(x, y, 'square1')); 
			squarePatterns.push(new SquarePatterns(x, y, 'square2'));
			squarePatterns.push(new SquarePatterns(x, y, 'square3'));
		}
	}
  noLoop();
}

function draw() {
	background('#FFF8F8');
	for (let sq of squarePatterns) {
		sq.display();
	}
}