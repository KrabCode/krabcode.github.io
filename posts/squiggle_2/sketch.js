var m;
var locked;

function mousePressed(){
	locked = !locked;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
	m = createVector();
}

function draw() {
  background(0);
  translate(width/2, height/2);
  var t = frameCount/12;
  var s = min(width, height)*.6;

if(!locked){
	m.x = map(mouseX, 0, width, -1, 1);
  m.y = map(mouseY, 0, height, -1, 1);
	if(mouseX == 0 && mouseY == 0){
		m.x = .2;
		m.x = .2;
	}
}

  noFill();
  stroke(255);
	strokeWeight(1);
  var cols = round(2+abs(m.x)*30);
  for (var colX = 0; colX <= cols; colX++) {
    var canvasX = map(colX, 0, cols, -s/2, s/2);
    squiggle(canvasX, -s/2, canvasX, s/2, colX%2==0?t:-t);
  }
  var rows = cols;
  for (var colY = 0; colY <= rows; colY++) {
    var canvasY = map(colY, 0, rows, -s/2, s/2);
    squiggle(-s/2, canvasY, s/2, canvasY, colY%2==0?t:-t);
  }
}

function squiggle(x0, y0, x1, y1, t) {
  var a = atan2(y1-y0, x1-x0);
  var d = dist(x0, y0, x1, y1);
  var freq = m.y*500;
  push();
  translate(x0, y0);
  rotate(a);
  beginShape();
  for (var x = 0; x < d; x+=10) {
    var xN = map(x, 0, d, 0, 1);
    var y = 20*sin(xN*freq+t);
    curveVertex(x, y);
  }
  endShape();
  pop();
}
