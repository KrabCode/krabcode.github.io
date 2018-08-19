var damping = 0.95;
var w, h;
var wdtl;
var hdtl;
var wscl, hscl;
var b1;
var b2;
var b3;

function setup() {
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB, 1, 1, 1);
	rectMode(CENTER);
	w = width;
	h = height;
	wdtl = round(w/35);
	hdtl = round(h/35);
	wscl = (w+2*(w/wdtl))/wdtl;
	hscl = (h+2*(h/hdtl))/hdtl;

	b1 = new Array();
	for(var i = 0; i < wdtl; i++){
		b1[i] = new Array(hdtl);
		for(var j = 0; j < hdtl; j++){
			b1[i][j] = 0;
		}
	}

	b2 = new Array();
	for(var i = 0; i < wdtl; i++){
		b2[i] = new Array(hdtl);
		for(var j = 0; j < hdtl; j++){
			b2[i][j] = 0;
		}
	}
}

function draw() {
  background(0);
  updateGrid();
}

function updateGrid() {
  for (var x = 0; x < wdtl; x++) {
    for (var y = 0; y < hdtl; y++) {
      if (x == 0 || x == wdtl-1 ||
        y == 0 || y == hdtl-1 ) {
        b2[x][y] *= damping;
        continue;
      }
      b2[x][y]=  (
        ( b1[x+1][y]
        + b1[x-1][y]
        + b1[x][y+1]
        + b1[x][y-1]
        ) / 2
        - b2[x][y]
        ) * damping;
    }
  }
  drawGrid();
  b3 = b1;
  b1 = b2;
  b2 = b3;
}

function drawGrid() {
  translate(-wscl/2, -hscl/2);
  noFill();
  for (var x = 0; x < wdtl; x++) {
    for (var y = 0; y < hdtl; y++) {
	  push();
      var v = b2[x][y];
      stroke(.47+v, 1, v*20);
	  translate(x*wscl, y*hscl);
    line(-wscl/4,0, wscl/4, 0);
	  line(0,-hscl/4,0, hscl/4);
	  pop();
    }
  }
}

function mousePressed() {
  input();
}

function mouseDragged() {
  input();
}

function input() {
  var ix = -wscl/2+mouseX;
  var iy = -hscl/2+mouseY;
  var mx = round(map(ix, 0, w, 0, wdtl));
  var my = round(map(iy, 0, h, 0, hdtl));
  if (mx>0&&mx<wdtl&&my>0&&my<hdtl) {
    b1[mx][my] = 1;
  }
}
