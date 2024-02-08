let stage = 1;


function setup() {
  createCanvas(600, 600);
  background(255);
  frameRate(8); 
  }
  


function draw() {

  switch (stage) {
	case 1:

		animationPlaying1 = true;
		play1();
		break;
	case 2:
		animationPlaying2 = true;
		play2();	
		break;
	case 3:
		animationPlaying3 = true;
		play3();
		break;

	case 4:
			animationPlaying4 = true;
			play4();
			break;
	case 5:
		animationPlaying5 = true;
		play5();
		break;

	case 6:
		animationPlaying6 = true;
		play6();
		break;
	} 

}

function mousePressed() {
	stage++;
	if (stage > 6) {
		stage = 6; 
	  }
	}


