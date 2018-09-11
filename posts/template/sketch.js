function setup() {

	createCanvas(windowWidth, windowHeight, WEBGL);
	easycam = new Dw.EasyCam(this._renderer);
	background(.7);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
	background(0);
	pointLight(250, 250, 250, 0,0, 250);
	fill(30);
	stroke(255);
	ambientMaterial(250);
	rotateX(radians(frameCount/4));
	rotateY(radians(frameCount/3));
	rotateZ(radians(frameCount/2));
	box(150);
}
