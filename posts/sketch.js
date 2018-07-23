function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
	background(0);	
	
	drawDotSphere(50, 400, 2);	
}

function drawDotSphere(scl, r, step) {
        noFill();
        stroke(255);
        var i = 0;
        for (var x = 0; x < scl; x+=step) {
			beginShape(TRIANGLE_STRIP);
            for (var y = 0; y <= scl; y+=step) {
                var myR = r;
				var myR1 = r;
                var n = noise(x*.1, 		y*.1, radians(frameCount/8.0));
				var n1 = noise(x+step*.1, y*.1, radians(frameCount/8.0));
                myR += n*50;
				myR1 += n1*50;
                stroke(255);				
				noFill();
				strokeWeight(1);
                var v0 = getPointOnSphere(x, y, scl, scl, myR);                
                var v1 = getPointOnSphere(x+step, y, scl, scl, myR1);                
                vertex(v0.x, v0.y, v0.z);
                vertex(v1.x, v1.y, v1.z);
            }
			endShape();
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