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
	background(.7);
  line(-width,-height,width,height);
	line(width,-width,-height,height);
}
