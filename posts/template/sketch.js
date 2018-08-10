function setup() {
	colorMode(HSB, 255,255,255);
	createCanvas(windowWidth, windowHeight);
	background(150);
	noSmooth();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
	background(150);
  line(0,0,width,height);
	line(width,0,0,height);
}
