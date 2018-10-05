function setup() {
	createCanvas(800,800);
}

var input = 0;
var scl = 10;

function draw() {
  background(0);
	input += pmouseX - mouseX;
	scl = map(mouseY, 0, height, 12, 20);
  translate(width/2, height/2);
  stroke(255);
  fill(255);
  strokeWeight(scl/2);
  recursiveMain(0);
}

function recursiveMain(i) {
  var r = i * scl;
  if (r > min(height,width)/2) {
    return;
  }
  recursiveRing(0, i*2, r);
  recursiveMain(++i);
}

function recursiveRing(i, j, r) {
  if (i>j) {
    return;
  }
  var n = map(i, 0, j, 0, TWO_PI);
  n+= j*5*cos(radians((input+frameCount)/20));
  n = n%TWO_PI;
  var x = r*sin(n);
  var y = r*cos(n);
  point(x, y);
  recursiveRing(++i, j, r);
}
