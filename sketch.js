function setup() {
	colorMode(HSB, 255,255,255);
	createCanvas(windowWidth, windowHeight);
	background(150);
	noSmooth();
	rectMode(CENTER);
	noStroke();
	fill(255);
	rect(width/2, height/2, width*.6, height);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
