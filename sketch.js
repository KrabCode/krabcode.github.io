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
	rectMode(CENTER);
	noStroke();
	var scl = width / 50;
	for(var x = -scl+frameCount%scl; x < width+scl; x += scl){
		for(var y = 0; y < height; y += scl){
			var d = dist(mouseX, mouseY, x, y);
			//var size = map(d, 0, width, scl, 0);
			fill(d%255, 50, 255);
			rect(x, y, scl, scl);
		}
	}
}
