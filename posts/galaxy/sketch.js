var maxGen = 100;


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
    var t = .4+.2*sin(frameCount/500);
    var m = gen*t;
    var c = gen*2;
    var x = (width/4-c)*(sin(t+m));
    var y = (width/4-c)*(cos(t-m));
    //fill(map(gen, 0, maxGen, 0, 1), 1,1, .5f);
    noFill();
    stroke(1,0,1);
    strokeWeight(2);
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
