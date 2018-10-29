
var m;
var locked;

function mouseClicked(){
	locked = !locked;
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	m = createVector(0,0);
	colorMode(HSB,1,1,1,1);
	rectMode(CENTER);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
	background(0);
	if(!locked){
		m.x = map(mouseX, 0, width, 1, 3.0);
		m.y = map(mouseY, 0, height,1.8, .5);
	}

	stroke(.8);
	noFill();
	translate(windowWidth/2, windowHeight/2);
	var s = max(height,width);

	squiggle(-s/2, -s/2, s/2, s/2);
	squiggle(-s/2, s/2, s/2, -s/2);

}

    function squiggle(x0, y0, x1,  y1){
        var d = dist(x0,y0,x1,y1);
        var freq = 200*m.x;
        var amp = 200*m.y;
        var t = frameCount/50;
        beginShape();
        for(var i = 0; i < d; i+=2){
            var iN = map(i, 0, d, 0, 1);
            var lineX = lerp(x0,x1,iN);
            var lineY = lerp(y0,y1,iN);
//            vertex(lineX,lineY);
            var aX = lineX + amp*cos(iN*freq*TWO_PI+t);
            var aY = lineY + amp*sin(iN*freq*TWO_PI+t);
            vertex(aX,aY);

        }
        endShape();
    }
