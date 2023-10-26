let rows = 6;
let cols = 6;
let squarePatterns = []; // 用于存储图案对象的数组


class SquarePatterns {
    constructor(x, y, shapeType) {
        this.x = x;
        this.y = y;
        this.shapeType = shapeType;
        this.angle = 0; // 添加一个角度属性来存储旋转的状态
		this.color = color(random(0, 255), random(0, 255), random(0, 255), random(125, 255));
		this.possibleTexts = ["A black cube", "One will find death，the other enlightenment ", "Our memories belong to the lake"];  // 可能的文本数组
        this.currentText = "";  // 当前要显示的文本
		const randomIndex = floor(random(this.possibleTexts.length));
		this.currentText = this.possibleTexts[randomIndex];
        if (this.shapeType === 'square3') {
            this.sideLength = random(10, 30);
        }
    }

    display() {
        push();

     if (this.shapeType === 'square1') {
			noStroke();
            fill(this.color);
            rect(this.x, this.y, 50, 50);
        } else if (this.shapeType === 'square2') {
			noStroke();
            fill(this.color);
            rect(this.x - 10, this.y - 10, 50, 50);
        }  else if (this.shapeType === 'square3') {
			noStroke();
            translate(this.x + 20, this.y + 20);
            if (this.isMouseOver()) {
                this.angle += 0.05; // 增加角度值使方块持续旋转
				textSize(14);
				fill(0); // 黑色
				textFont('Nunito');
				text(this.currentText, 0, -40);
            }
            rotate(this.angle);
            fill(0);
            rect(-this.sideLength / 2, -this.sideLength / 2, this.sideLength, this.sideLength);
        } 

        pop();
    }

    isMouseOver() {
        if (this.shapeType === 'square3') {
            let left = this.x + 20 - this.sideLength / 2;
            let right = left + this.sideLength;
            let top = this.y + 20 - this.sideLength / 2;
            let bottom = top + this.sideLength;
            return mouseX > left && mouseX < right && mouseY > top && mouseY < bottom;
        }
        return false;
    }
}

function setup() {
    createCanvas(600, 600);
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
            let x = 100 * j + 20;
            let y = 100 * i + 20;
            squarePatterns.push(new SquarePatterns(x, y, 'square1'));
            squarePatterns.push(new SquarePatterns(x, y, 'square2'));
            squarePatterns.push(new SquarePatterns(x, y, 'square3'));
        }
    }
}

function draw() {
    background(85, 85, 85);;
    for (let sq of squarePatterns) {
        sq.display();
    }
}
