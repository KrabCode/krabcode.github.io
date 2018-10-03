var mic;
var fft;
var side;
var maxGenerations;
var normalizedGeneration;
var normalizedGenerationNext;
var ranges = ["bass", "lowMid", "mid", "highMid", "treble"]

function setup() {
	side = 800;
	rectMode(CENTER);
	createCanvas(side,side);
	stroke(255);
	fill(0);
	fft = new p5.FFT();
	mic = new p5.AudioIn();
	fft.setInput(mic);
	mic.start();
}

function draw() {
	background(0);
	var spectrum = fft.analyze();
	maxGenerations = 20;
  translate(side/2, side/2);
	recursive(0, spectrum);
}

function recursive(generation, spectrum){
	if(generation > maxGenerations){
		return;
	}
	normalizedGeneration = map(generation,0,maxGenerations,0,1);
	normalizedGenerationNext = map(generation+1,0,maxGenerations,0,1);
	for(var x = 0; x < width; x++){
		var i = floor(map(abs(width/2-x), 0, width/2, 0, spectrum.length));
		var myAudio = spectrum[i];
		var d = abs(spectrum.length/2-i);
		var x0 = map(d, 0, spectrum.length, -width/2, width/2);
		var x1 = map(d+1, 0, spectrum.length, -width/2, width/2);
		noFill();
	  stroke(255);
		if(myAudio>0 && myAudio < height){
			line(x0, -myAudio, x1, myAudio);
			line(-x0, -myAudio, -x1, myAudio);
		}
	}

		print(generation);
}
