function setup() {
	colorMode(HSB, 1,1,1,1);
	createCanvas(windowWidth, windowHeight);
	background(.7);
	noSmooth();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
	background(.7);
  line(0,0,width,height);
	line(width,0,0,height);
}
