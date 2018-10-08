var mic;
var fft;
var spectrum;
var side;

var vertexCount = 512;
function setup() {
	side = min(windowWidth, windowHeight);
	createCanvas(side,side);
	rectMode(CENTER);
	colorMode(HSB, 255,255,255, 100);
	fft = new p5.FFT();
	mic = new p5.AudioIn();
	fft.setInput(mic);
	mic.start();
}

function draw() {
	spectrum = fft.analyze();
	background(0);
	noFill();
	stroke(255);
	translate(side/2, side/2);
	var angleStep = TWO_PI/vertexCount;
	for(var r = side/60; r < side * .4; r += side / 20){
		beginShape();
		for (a = 0; a<TWO_PI; a+=angleStep) {
			var i = floor(map(abs(PI-a), 0, TWO_PI, 0, spectrum.length/2));
			var fftOffset = spectrum[i];
			var finalR = r + fftOffset/4;
			var x = finalR*sin(a);
			var y = finalR*cos(a);
			vertex(x,y);
		}
		endShape();
	}
	var energyOffset = fft.getEnergy("treble")/255*r;
}
