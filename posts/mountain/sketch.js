
var res = 80;
var s = 450;
var globalCircleAngleOffset;
var shapes;
var locked = false;
var mx = 0;
function mouseReleased(){
	locked = !locked;
}

function setup() {
	shapes = new Array();
	smooth(8);
	globalCircleAngleOffset = PI + HALF_PI / 2;
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB, 1,1,1,1);
	shapes.push(makeHorizontalLine());
	shapes.push(makeCircle());
}

function draw() {
		background(0);
		if(!locked){
			mx = map(mouseX, 0, width, 0, 1);
		}
		s = windowHeight/2 - windowHeight*mx;
		translate(width / 2, height / 2);
		rotate(PI);
		globalCircleAngleOffset = (PI + HALF_PI / 2) + radians(frameCount / 4);
		shapes[1] = makeCircle();
		drawShape();

}

function drawShape() {
		beginShape();
		for (var i = 0; i < res - 1; i++) {
				var x0 = shapes[0][i].x;
				var y0 = shapes[0][i].y;
				var x1 = shapes[1][i].x;
				var y1 = shapes[1][i].y;
				var a = atan2(y1-y0, x1-x0);
				var aN = map(a, -PI, PI, 0, 1);
        strokeWeight(2);
        stroke(.5+abs(.5-aN), 1, 1);
        line(x0, y0, x1, y1);
		}
}

function makeCircle() {
		var vertices = new Array(res);
		for (var i = 0; i < res; i++) {
				var x, y;
				var a = map(i, 0, res - 3, 0, TWO_PI);
				a += globalCircleAngleOffset;
				x = s * cos(a);
				y = s * sin(a);
				vertices[i] = createVector(x, y);
		}
		return vertices;
}

function makeHorizontalLine() {
		var vertices = new Array(res);
		for (var i = 0; i < vertices.length; i++) {
				var x = map(i, 0, vertices.length, -s, s);
				vertices[i] = createVector(x, 0);
		}
		return vertices;
}
