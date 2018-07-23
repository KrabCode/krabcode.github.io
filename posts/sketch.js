function setup() {
	createCanvas(windowWidth, windowHeight);
	cnv.style('display', 'block');
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
	background(0);
  ellipse(mouseX, mouseY, 80, 80);
}