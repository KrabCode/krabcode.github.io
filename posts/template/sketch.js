function setup() {
	colorMode(HSB, 1,1,1,1);
	createCanvas(windowWidth, windowHeight, WEBGL);
	easycam = new Dw.EasyCam(this._renderer);
	background(.7);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
	background(.2);
	fill(0);
	stroke(1);
	rotateY(radians(frameCount));
	rotateZ(PI/4);
	rotateX(PI/2);
	box(150);
}
