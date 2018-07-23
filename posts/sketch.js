function setup() {
	createCanvas(windowWidth, windowHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
	background(0);	
	translate(width/2, height/2);
	drawDotSphere(100, 100);	
}

function drawDotSphere(scl, r) {
	var scl = 20;
    var step = 1;
        noFill();
        stroke(255);
        var i = 0;
        for (var x = 0; x < scl; x+=step) {
            for (var y = 0; y <= scl; y+=step) {
                var myR = r;
                var n = noise(abs(x/2-x)*.1, y*.1, radians(frameCount/8));
                myR += n*50;
                stroke(255,100);
                var v0 = getPointOnSphere(x, y, scl, scl, myR);                
                point(v0.x, v0.y, v0.z);
            }
        }
    }
	
function getPointOnSphere(x, y, xMax, yMax, r){
        var s = map(x, 0, xMax, 0, TWO_PI);
        var t = map(y, 0, yMax, 0, PI);
        var resultX = r * cos(s) * sin(t);
        var resultY = r * sin(s) * sin(t);
        var resultZ = r * cos(t);
        return createVector(resultX, resultY, resultZ);
    }
	
function xyz(size) {
	colorMode(RGB);
	strokeWeight(1);
	stroke(255,0,0);
	fill(255,0,0);
	line(0,0,0,size, 0,0);
	stroke(0,255,0);
	fill(0,255,0);
	line(0,0,0,0, size,0);
	stroke(0,0,255);
	fill(0,0,255);
	line(0,0,0,0, 0,size);
	colorMode(HSB);
}