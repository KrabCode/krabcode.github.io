var mic;
var fft;
var side;
var rectW;
var maxGenerations;
var normalizedGeneration;
var normalizedGenerationNext;

function setup() {
	side = max(windowWidth, windowHeight);
	rectMode(CENTER);
	colorMode(HSB, 360,100,100,100);
	createCanvas(side,side);
	fft = new p5.FFT();
	mic = new p5.AudioIn();
	fft.setInput(mic);
	mic.start();
}

function draw() {
	background(0);
	var spectrum = fft.analyze();
  translate(side/2, side/2);
	drawSpectrum(0, spectrum);
}

function drawSpectrum(generation, spectrum){
	var rectW = 5;
	for(var x = 0; x < side/2; x++){
		var i = floor(map(x, 0, side/2, 0, spectrum.length));
		var hue = map(spectrum[i], 0, 255, 0, 360);
		hue = (hue+d/2+frameCount/4)%360;
		var rectH = map(spectrum[i], 0, 255, 0, side/2);
		var d = abs(spectrum.length/2-i);
		var x0 = map(d, 0, spectrum.length, -width/2, width/2);
		fill(hue, 100, 100, 75);
	  noStroke();
		if(hue > 0){
			rect(x0, 0, rectW, rectH);
			rect(-x0,0,-rectW, rectH);
		}
	}
}
