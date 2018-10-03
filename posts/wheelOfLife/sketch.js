// var mic;
// var fft;
var side;
var maxGenerations;
var normalizedGeneration;
var normalizedGenerationNext;

function setup() {
	side = 800;

	createCanvas(side,side);
	rectMode(CENTER);
	stroke(255);
	fill(0);
	// fft = new p5.FFT();
	// mic = new p5.AudioIn();
	// fft.setInput(mic);
	// mic.start();
}

function draw() {
	background(0);
	// var spectrum = fft.analyze();
	maxGenerations = 10;
  translate(side/2, side/2);
	rotate(-PI/2);
	recursive(0);
}

function recursive(generation, spectrum){
	if(generation > maxGenerations){
		return;
	}
	normalizedGeneration = map(generation,0,maxGenerations,0,1);
	normalizedGenerationNext = map(generation+1,0,maxGenerations,0,1);
	noFill();
	// rotate(radians(gen));
	push();
	if(generation>2){
		rotate(radians(generation*frameCount/8));
	}

	polygon(0,0,normalizedGeneration*200,normalizedGeneration*20);
	pop();
	recursive(++generation, spectrum);
}

function polygon(x, y, radius, npoints) {
  var angle = TWO_PI / npoints;
	strokeWeight(5);
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius;
    var sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
