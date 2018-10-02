var maxGen = 400;


function setup() {
	createCanvas(800,800);
	colorMode(HSB,1,1,1,1);
	rectMode(CENTER);
}

function draw() {
		background(0);
    translate(width/2, height/2);
    recursive(0);
}

function recursive( gen ){
		if(gen > maxGen) return;
		var t = frameCount/1000;
		var m = gen*t;
		var c = gen/2;
		var x = (width/4-c)*(sin(t+m));
		var y = (width/4-c)*(cos(t-m));
		stroke(1);
		strokeWeight(1);
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
