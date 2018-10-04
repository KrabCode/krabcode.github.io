var maxGen = 400;
var mx, my;

function setup() {
	createCanvas(windowWidth,windowHeight);
	colorMode(RGB,100,100,100);
	rectMode(CENTER);
	mx = .99;
	my = .98;
}

function draw() {
		background(0);
    translate(width/2, height/2);
		if((mouseX>0 || mouseY>0) && mouseIsPressed){
			mx = map(mouseX, 0, width, -.5, .5);
			my = map(mouseY, 0, height, -.5, .5);
		}
    recursive(0);
}

function recursive( gen ){
		if(gen > maxGen) return;
		var t = .5+.5*frameCount/5000;
		var x = (maxGen-gen)*(sin(gen*t*mx));
		var y = (maxGen-gen)*(cos(gen*t*my));
		stroke(50+gen/8);
		strokeWeight(3);
		point(x,y);
		recursive(++gen);
}
