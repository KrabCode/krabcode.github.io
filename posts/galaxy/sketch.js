var maxGen = 400;
var mx, my;

function setup() {
	createCanvas(800,800);
	colorMode(HSB,1,1,1,1);
	rectMode(CENTER);
	mx = .5;
	my = .5;
}

function draw() {
		background(0);
    translate(width/2, height/2);
		if((mouseX>0 || mouseY>0) && mouseIsPressed){
			mx = map(mouseX, 0, width, 0, 2);
			my = map(mouseY, 0, height, 0, 2);
		}
    recursive(0);
}

function recursive( gen ){
		if(gen > maxGen) return;
		var t = .5+.5*frameCount/5000;
		var x = (maxGen-gen)*(sin(gen*t*mx));
		var y = (maxGen-gen)*(cos(gen*t*my));
		stroke(1);
		strokeWeight(5);
		point(x,y);
		recursive(++gen);
}

function backgroundGradient(){
    strokeWeight(1);
    for(var y = 0; y < height; y++){
        stroke(1-map(y, 0, height, .5, .85));
        line(0,y,width,y);
    }
}
