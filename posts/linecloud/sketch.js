function setup() {
	createCanvas(800,800);
}

var input = 0;
var scl = 10;

function draw() {
  background(0);
	input += pmouseX - mouseX;
	scl = map(mouseY, 0, height, 8, 12);
  translate(width/2, height/2);
  stroke(255);
  fill(255);
  strokeWeight(1);
  recursiveMain(0);
}

function recursiveMain(i) {
  var r = i * scl;
  if (r > min(height,width)/2) {
    return;
  }
  recursiveRing(0, i, r);
  recursiveMain(++i);
}

function recursiveRing(i, j, r) {
  if (i>j) {
    return;
  }
  var n = map(i, 0, j, 0, TWO_PI);
  n+= j*10*cos(radians((input+frameCount)/35));
  n = n%TWO_PI;
  var x = r*sin(n);
  var y = r*cos(n);
	push();
	translate(x,y);
	rotate(-n+HALF_PI);
	line(-scl/2, 0, scl/2, 0);
	pop();
  recursiveRing(++i, j, r);
}
