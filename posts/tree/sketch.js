var stems = 4;
var maxGen = 4;
var brcount = 4;
var stemStrokeWeight = 3;
var endStrokeWeight = .2;
var lineSize = 40;
var range = 0;

function setup() {
	createCanvas(windowWidth, windowHeight, P2D);
	colorMode(HSB, 1,1,1,1);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
	background(0);
  stroke(1);
	lineSize = width / 20;
  range = map(sin(radians(frameCount/4)),-1,1,0,TWO_PI*2);
  var c = createVector(width/2, height/2);
  for (var ang = 0; ang < TWO_PI; ang += TWO_PI/stems) {
    var tar = getPointAtAngle(c.x, c.y, lineSize, ang);
    strokeWeight(stemStrokeWeight);
    line(c.x, c.y, tar.x, tar.y);
    drawLines(c.x, c.y, tar.x, tar.y, 0);
  }
}

function drawLines(x0, y0, x1, y1, gen) {
  if (gen++ < maxGen) {
    var tars = new Array();
    var weight = map(gen, 0, maxGen, stemStrokeWeight, endStrokeWeight);
    strokeWeight(weight);
    var midA = getAngle(x0, y0, x1, y1);
    var angleStep = range / brcount;
    for (var i = 0; i <= brcount; i++) {
      var a = midA-range/2 + i*angleStep;
      var tar = getPointAtAngle(x1, y1, lineSize, a);
      tars.push(tar);
      line(x1, y1, tar.x, tar.y);
    }
    for (var i = 0; i < tars.length; i++)
      drawLines(x1, y1, tars[i].x, tars[i].y, gen);
    }
  }


function getPointAtAngle(cx, cy, radius, angle) {
   return createVector(cx + radius * cos(angle), cy + radius * sin(angle));
}

function getAngle(x0, y0, x1, y1) {
   return atan2(y1 - y0, x1 - x0);
}
