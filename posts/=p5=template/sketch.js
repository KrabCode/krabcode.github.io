function setup() {
	createCanvas(windowWidth, windowHeight);
	background(.7);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
	background(0);
	pointLight(255,255,255, 500, 0, 0);
	pointLight(255,255,255, 0, 500,0);
	pointLight(255,255,255, 0,0, 500);

	rotateX(radians(frameCount/4));
	rotateY(radians(frameCount/3));
	rotateZ(radians(frameCount/2));

	stroke(255);
	ambientMaterial(255);
	box(150);
}
