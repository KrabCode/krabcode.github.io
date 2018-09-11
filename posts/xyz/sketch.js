let scl = 150;
let xg, yg, zg;
var rSlider, gSlider, bSlider;

function setup() {
	colorMode(RGB, 1,1,1,1);
	createCanvas(windowWidth, windowHeight, WEBGL);
	easycam = createEasyCam();
	rSlider = createSlider(0, 200, 100);
	rSlider.position(20, 200);
	gSlider = createSlider(0, 200, 100);
	gSlider.position(20, 250);
	bSlider = createSlider(0, 200, 100);
	bSlider.position(20, 300);
}

function draw() {
	background(0);
	stroke(1);
	rotateX(.1);
	rotateY(.1);
	rotateZ(.1);

	//x is red
	stroke(1, 0, 0);
  line(rSlider.value(),0,0,0,0,0);
	//y is blue
  stroke(0, 1, 0);
	line(0,gSlider.value(),0,0,0,0);
  //z is green
	stroke(0, 0, 1);
	line(0,0,bSlider.value(),0,0,0);
}
