var m;
var rotPos = 0;
var rotSpd = 0;
var rotDamp = .98;
var tDamp = .9;

function setup() {
	createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 1, 1, 1, 1);
}

function draw() {
  background(0);
  stroke(1);
  translate(width/2, height/2);
  mouseRotation();
  var t = frameCount*.05;
  ring(12, 2, 20, t);
}

function ring(size, freq, res, t) {
  if (size > height/2 || size < 0) {
    return;
  }
  push();
  rotate(t);
  var lastX = 0;
  var lastY = 0;
  for (var i = 0; i <= res; i++) {
    var a = map(i, 0, res, 0, TWO_PI);
    var x = size*sin(a);
    var y = size*cos(a);
    var d = map(dist(x, y, 0, 0), 0, height/2, 0, 1);
    stroke(1-d);
    if (i > 0 && i%freq==0) {
      line(x, y, lastX, lastY);
    }
    lastX = x;
    lastY = y;
  }
  pop();
  ring(size+20, freq, res+freq, -t*tDamp);
}

function mouseRotation() {
  if (mouseIsPressed) {
    var a0 = getAngle(width/2, height/2, pmouseX, pmouseY);
    var a1 = getAngle(width/2, height/2, mouseX, mouseY);
    var delta = (a1 - a0)/4;
    //if (abs(delta) > abs(rotSpd))
    {
      rotSpd = delta;
    }
  }
  rotSpd *= rotDamp;
  rotPos += rotSpd;
  rotate(rotPos);
}

function getAngle(x, y, cx, cy) {
  return atan2(cy-y, cx-x);
}
